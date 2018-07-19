import logo from '../../../assets/cgo-logo.js'
import headerLogo from '../../../assets/cgo-header-logo'
import { clonedMenu, isIE } from '../../utils'

jQuery(document).ready(function($) { 
  let menuIsOpen = false
  const isThin = $(window).width() <= 1000

  const giveHeaderGradient = () => {
    $('body').prepend("<div class='header-gradient'></div>")
  }

  const clonedMenu = isThin
    ? $({ ...$('.mobile-only .menu').clone() })
    : $({ ...$('nav .sf-menu').clone() }) // hold both menus in state so that window resize doesn't break menu
  
  const handleCartDropdown = () => { // don't show cart stuff unless it's woocommerce page
    let isWooCommercePg = false
    const { pathname } = window.location
    const path = pathname.replace(/[^a-zA-Z]/g, '').toLowerCase()
    const pages = ['shop', 'cart', 'checkout', 'order', 'product', 'store']
    const cartEl = $('#header-outer').children('.cart-outer')
    cartEl.hide(0)
    pages.forEach(pg => {
      if (path.indexOf(pg) !== -1) {
        isWooCommercePg = true
      }
    })
    if (isWooCommercePg) {
      cartEl.show(0)
      cartEl.css({
        marginTop: '30px',
        position: 'relative'
      })
      cartEl.children('.cart-menu-wrap').css({
        width: '100px',
        height: '100px'
      })
      cartEl.find('.cart-menu').css({
        borderLeft: 'none'
      })
    }
  }
  

  const makeWholeNewMenu = () => { // architecture happens here, mechanics of animations etc inside './menu'
    const newMainList = $('<ul class="new-main-list"></ul>')
    const subLists = $('<div class="sub-lists"></div>')
    const tertList = $('<ul class="new-tert-list"></ul>')
    clonedMenu.children('li').each((i, li) => {
      const txtContent = $(li).children('a').text()
      const href = $(li).children('a').attr('href')
      const newListItem = $(`<li class="item"><a href="${href}">${txtContent}</a></li>`)
      if (href.indexOf('product') === -1) {
        newMainList.append(newListItem)
        if ($(li).children('ul').length > 0) {
          newListItem.addClass('has-children')
          const title = $(li).children('a').text()
          const subList = $(`<ul class="new-sub-list ${title}"></ul>`)
          subLists.append(subList)
          $(li).children('ul').children('li').each((j, subLi) => {
            const txtContent2 = $(subLi).children('a').text()
            const href2 = $(subLi).children('a').attr('href')
            const newSubListItem = $(`<li class='submenu-item'><a href="${href2}">${txtContent2}</a></li>`)
            subList.append(newSubListItem)
            if ($(subLi).children('ul').length > 0) {
              newSubListItem.addClass('has-children')
              $(subLi).children('ul').children('li').each((k, tertLi) => {
                const txtContent3 = $(tertLi).children('a').text()
                const href3 = $(tertLi).children('a').attr('href')
                const newTertListItem = $(`<li class='tert-menu-item'><a href="${href3}">${txtContent3}</a></li>`)
                tertList.append(newTertListItem)
              })
            }
          })
        }
      }
    })
    return {
      main: newMainList,
      sub: subLists,
      tert: tertList
    }
  }

  const newMenu = makeWholeNewMenu()  

  const replaceEntireHeader = () => {
    $('#top').children('.container').replaceWith(`
      <div class='az-header-container'>
        <div class='header-title'></div>
        <div class='nav-btn-wrapper'>
          <div id='nav-btn'>
            <span class='line'></span>
            <span class='line'></span>
            <span class='line'></span>
            <span class='line'></span>
          </div>
        </div>
        <div id='side-nav'>
          <div class='side-nav-inner desktop'>
            <div class="inner-grid desktop">
              <div class="col-1"></div>
              <div class="col-2"></div>
              <div class="col-3"></div>
            </div>
          </div>
          <div class='side-nav-inner mobile'>
            <div class="inner-grid mobile">
              <div class="col-1"></div>
              <div class="col-2"></div>
              <div class="col-3"></div>
            </div>
          </div>
        </div>
      </div>
    `)
    $('#side-nav').css('display', 'none')
    $('.inner-grid').css({ display: isIE ? 'flex' : 'grid' })
  }
  
  const formatLogo = () => {
    $('.az-header-container .header-title').empty().append(`
      <a href='/' style='width: 200px;'>${headerLogo}</a>
    `)
  }

  const handleNavClick = () => {
    $('#nav-btn').click(() => {
      menuIsOpen = !menuIsOpen 
      $('#nav-btn').toggleClass('open')
      menuIsOpen ? $('#side-nav').addClass('active') : $('#side-nav').removeClass('active')

      if (isIE) {
        // const conds = $('#side-nav').css('visibility') === 'hidden'
        const visibility = menuIsOpen ? 'visible' : 'hidden'
        const marginLeft = menuIsOpen ? 0 : 'auto'
        $('#side-nav').css({ visibility })
        $('.nav-btn-wrapper').css({ marginLeft })
      }
      $('#side-nav').slideToggle()

      $('.az-header-container').css({ justifyContent: menuIsOpen && isIE ? 'flex-end' : 'space-between' })
    })
    $('#nav-btn').hover(() => {
      $('#nav-btn .line').css('background-color', '#D4A011')
    }, () => {
      $('#nav-btn .line').css('background-color', 'black')
    })
  }

  const formatNativeHeader = () => {
    $('#top').find('.row').css({ width: '100%' })
      .find('#logo').parent().replaceWith(`
        <div class='header-title'>
          <a href='/' style='width: 200px;'>${headerLogo}</a>
        </div>
      `)
  }

  const transformNewHeader = () => {
    replaceEntireHeader()
    $('#top').find('.col-1').append(newMenu.main)
    $('#top').find('.col-2').append(newMenu.sub)
    $('.mobile .sub-lists').children('ul').each((i, sLi) => {
      $(sLi).addClass(`sublist-${i}`)
    })
    $('#top').find('.col-3').append(newMenu.tert)
    handleNavClick()
    formatLogo()
  }

  const initHeader = (() => {
    const replaceHeader = true
    if (replaceHeader) {
      transformNewHeader()
    } else {
      formatNativeHeader()
    }
    giveHeaderGradient()
    handleCartDropdown()
  })()
})
