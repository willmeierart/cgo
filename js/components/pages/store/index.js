import '../../../../scss/pages/store.scss'
import logo from '../../../../assets/cgo-logo' 

jQuery(document).ready($ => {
  // const rowEl = $('tbody').children('tr').last().children('td').first()
  // if (rowEl.children('.checkout-btn').length < 1) {
  //   rowEl.append(`
  //     <button type='submit' class='checkout-btn button'>Checkout</button>
  //   `)
  // }
  // $('.checkout-btn').click(e => {
  //   e.preventDefault()
  //   window.location = '/checkout'
  // })

  const transformSearchFilters = () => { // grab widgets from the footer and put them at the top of the page
    const firstTheFilters = (() => {
      const categoryList = $('#header-secondary-outer').find('.sf-menu').clone()
      $('.nectar-shop-header').append($('<div id="az-cat-list"></div>').append(categoryList))
      $('#header-secondary-outer').remove()
      $('#az-cat-list').find('.menu-item-has-children > a').removeAttr('href').prepend('<i class="fas fa-chevron-down"></i>')
    })()
    const thenTheSearchBar = (() => {
      const searchBar = $('[id^=aws_widget]').children('.aws-container').clone()
      $('#az-cat-list').before($('<div class="az-searchbar"></div>').append(searchBar))
      $('[id^=aws_widget]').remove()
    })()
  }

  const addContinueShopping = () => {
    const el = `
      <a href='/store'>Store</a>
      <i class='fa fa-angle-right'></i> 
    `
    if (window.location.pathname.indexOf('cart') !== -1 ||
      window.location.pathname.indexOf('product') !== -1
    ) {
      $('.woocommerce-breadcrumb').children('i:first-of-type').after(el)
    } else if (window.location.pathname.indexOf('store') !== -1) {
      $('.woocommerce-breadcrumb').html($('.woocommerce-breadcrumb').html().replace('Shop', 'Store'))
    }

  }

  const formatFeatured = () => { // make featured products box
    $('.woocommerce-products-header').prepend(`
      <div class='featured-tag'>
        <div class='wrapper'>
          <div class='featured-content' data-txt="FEATURED CONTENT">
            <img src="https://test.centerofthegoldenone.com/wp-content/uploads/2018/06/cgoStoreBgSwatch.jpg" />
          </div>
          <div class='angle-mask'></div>
          <div class='cgo-logo-small'>${logo}</div>
        </div>
      </div>
    `)
  }

  const makeBreadcrumbsFirst = () => {
    const bcClone = $('.woocommerce-breadcrumb').clone()
    const titleClone = $('h1.page-title').clone()
    const parent = $('.woocommerce-breadcrumb').parent()
    $('h1.page-title').remove()
    $('.woocommerce-breadcrumb').remove()
    parent.prepend(bcClone)
    $('.woocommerce-breadcrumb').after(titleClone)
  }

  const handleCart = () => {
    const icon = $('<a id="shopping-cart-nav" href="/cart"><i class="fas fa-shopping-cart"></i></a>')
    if (window.location.pathname.indexOf('cart') === -1) {
      $('.nav-btn-wrapper').prepend(icon)
    }
  }

  const handleFeaturedHeader = () => {
    const el = $('.page-description p:first-of-type')
  }

  const init = (() => {
    transformSearchFilters()
    addContinueShopping()
    formatFeatured()
    if ($('.woocommerce-products-header').find('ul').length === 0) {
      $('.woocommerce-products-header').hide()
    }
    makeBreadcrumbsFirst()
    if (window.location.pathname.indexOf('store') !== -1) {
      $('h1.page-title').text('Store')
    }

    handleCart()
    handleFeaturedHeader()

    $('.related.products').prepend(`<div class='related-products-break'></div>`)
  })()
})
