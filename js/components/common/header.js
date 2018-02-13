import logo from '../../../assets/cgo-logo.js'
import { clonedMenu } from '../../utils'
import menu from './menu'
import './userAgreement'

jQuery(document).ready(function($) { 
  let menuIsOpen = false
  const breakpoints = [1000]
  const isThin = $(window).width() <= 1000


  const makeWholeNewMenu = () => {
    const clonedMenu = isThin
      ? $({ ...$('.mobile-only .menu').clone() })
      : $({ ...$('nav .sf-menu').clone() })
    const newList = $('<ul class="new-menu-list"></ul>')
    clonedMenu.children('li').each((i, li) => {
      const txtContent = $(li).children('a').text()
      const href = $(li).children('a').attr('href')
      const newListItem = $(`<li class="item"><a href="${href}">${txtContent}</a></li>`)
      console.log($(li).children())
      console.log(txtContent);
      newList.append(newListItem)
      if ($(li).children('ul').length > 0) {
        newListItem.addClass('has-children')
        const newSubmenu = $('<ul class="submenu-list"></ul>')
        newListItem.append(newSubmenu)
        $(li).children('ul').children('li').each((j, subLi) => {
          const txtContent2 = $(subLi).children('a').text()
          const href2 = $(subLi).children('a').attr('href')
          newSubmenu.append(`<li class='submenu-item'><a href="${href2}">${txtContent2}</a></li>`)
        })
      }
    })
    return newList
  }

  const clonedMenu = makeWholeNewMenu()

  console.log(clonedMenu)
  

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
          <div class='side-nav-inner'></div>
        </div>
      </div>
    `)
    $('.side-nav-inner').append(clonedMenu)
  }
  
  
  const formatLogo = () => {
    const titleSection = $('.az-header-container .header-title')
    titleSection.empty()
    titleSection.append(`
      <div id='cgo-logo'>${logo}</div>
    `)
    titleSection.append(`
      <div class='title-wrapper'>
        <a href='/'>
          <div class='center-of'>CENTER OF</div>
          <div class='the-golden-one'>THE GOLDEN ONE</div>
        </a>
      </div>
    `)
  }

  const handleNavClick = () => {
    $('#nav-btn').click(() => {
      menuIsOpen = !menuIsOpen
      const marginVal = menuIsOpen ? 0 : '-200px'
      $('#nav-btn').toggleClass('open')
      // $('#side-nav').toggle(200)
      // $('#side-nav').animate({'margin-right': marginVal}, 200)
      $('#side-nav').slideToggle()
    })
    $('#nav-btn').hover(() => {
      $('#nav-btn .line').css('background-color', '#fab92a')
    }, () => {
      $('#nav-btn .line').css('background-color', 'black')
    })
  }

  // const extraNavIconFormatting = () => {
  //   $('.mobile-icon').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  //   $('.mobile-icon').children('*').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  //   $('.mobile-icon .lines::before, .mobile-icon .lines::after').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  // }

  const initHeader = (() => {
    // getTitleFromPath()
    replaceEntireHeader()
    handleNavClick()
    formatLogo()
  })()
})
