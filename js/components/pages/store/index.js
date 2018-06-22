import '../../../../scss/pages/store.scss'
import logo from '../../../../assets/cgo-logo' 

jQuery(document).ready($ => {
  const rowEl = $('tbody').children('tr').last().children('td')
  rowEl.append(`
    <button type='submit' class='checkout-btn button'>Checkout</button>
  `)
  $('.checkout-btn').click(e => {
    e.preventDefault()
    window.location = '/checkout'
  })

  const transformSearchFilters = () => {
    const firstTheFilters = (() => {
      const categoryList = $('#header-secondary-outer').find('.sf-menu').clone()
      $('.nectar-shop-header').append($('<div id="az-cat-list"></div>').append(categoryList))
      $('#header-secondary-outer').remove()
      // $('#az-cat-list').find('li:not(:first-of-type)').hide()
      $('#az-cat-list').find('.menu-item-has-children > a').prepend('<i class="fas fa-chevron-down"></i>')
    })()
    const thenTheSearchBar = (() => {
      const searchBar = $('#aws_widget-5').children('.aws-container').clone()
      $('.nectar-shop-header').append($('<div class="az-searchbar"></div>').append(searchBar))
      $('#aws_widget-5').remove()
    })()
  }

  const addContinueShopping = () => {
    const el = `<div class='continue-shopping'>
        <i class="fas fa-chevron-left"></i>
        <a href='/shop'>&nbsp; continue shopping</a>
      </div>`
    if (window.location.pathname.indexOf('cart') !== -1) {
      $('.woocommerce').prepend(el)
    } else if (window.location.pathname.indexOf('product') !== -1) {
      $('.main-content').children('.row').prepend(el)
    }
  }

  const formatFeatured = () => {
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

  const init = (() => {
    transformSearchFilters()
    addContinueShopping()
    formatFeatured()
  })()
})
