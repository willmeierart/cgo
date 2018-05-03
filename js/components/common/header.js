import logo from '../../../assets/cgo-logo.js'
import headerLogo from '../../../assets/cgo-header-logo'
import { clonedMenu } from '../../utils'
import './userAgreement'

jQuery(document).ready(function($) { 
  let menuIsOpen = false
  const breakpoints = [1000]
  const isThin = $(window).width() <= 1000
  console.log(menuIsOpen);

  const giveHeaderGradient = () => {
    $('body').prepend("<div class='header-gradient'></div>")
  }

  const makeWholeNewMenu = () => {
    const clonedMenu = isThin
      ? $({ ...$('.mobile-only .menu').clone() })
      : $({ ...$('nav .sf-menu').clone() })
    const newList = $('<ul class="new-menu-list"></ul>')
    clonedMenu.children('li').each((i, li) => {
      const txtContent = $(li).children('a').text()
      const href = $(li).children('a').attr('href')
      const newListItem = $(`<li class="item"><a href="${href}">${txtContent}</a></li>`)
      newList.append(newListItem)
      if ($(li).children('ul').length > 0) {
        newListItem.addClass('has-children')
        const newSubmenu = $('<ul class="submenu-list"></ul>')
        newListItem.append(newSubmenu)
        $(li).children('ul').children('li').each((j, subLi) => {
          const txtContent2 = $(subLi).children('a').text()
          const href2 = $(subLi).children('a').attr('href')
          const newSubListItem = $(`<li class='submenu-item'><a href="${href2}">${txtContent2}</a></li>`)
          newSubmenu.append(newSubListItem)
          if ($(subLi).children('ul').length > 0) {
            newSubListItem.addClass('has-children')
            const newTertMenu = $('<ul class="tert-menu-list"></ul>')
            newSubListItem.append(newTertMenu)
            $(subLi).children('ul').children('li').each((k, tertLi) => {
              const txtContent3 = $(tertLi).children('a').text()
              const href3 = $(tertLi).children('a').attr('href')
              const newTertListItem = $(`<li class='tert-menu-item'><a href="${href3}">${txtContent3}</a></li>`)
              newTertMenu.append(newTertListItem)
            })
          }
        })
      }
    })
    return newList
  }

  const clonedMenu = makeWholeNewMenu()
  
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
    $('#side-nav').css('display', 'none')    
  }
  
  
  const formatLogo = () => {
    const titleSection = $('.az-header-container .header-title')
    titleSection.empty()
    // titleSection.append(`
    //   <div id='cgo-logo'>${logo}</div>
    // `)
    // titleSection.append(`
    //   <div class='title-wrapper'>
    //     <a href='/'>
    //       <div class='center-of'>CENTER OF</div>
    //       <div class='the-golden-one'>THE GOLDEN ONE</div>
    //     </a>
    //   </div>
    // `)
    titleSection.append(`<a href='/' style='width: 200px;'>${headerLogo}</a>`)
  }

  const handleNavClick = () => {
    $('#nav-btn').click(() => {
      menuIsOpen = !menuIsOpen
      console.log(menuIsOpen)      
      $('#nav-btn').toggleClass('open')
      menuIsOpen ? $('#side-nav').addClass('active') : $('#side-nav').removeClass('active')
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
    giveHeaderGradient()

    replaceEntireHeader()
    handleNavClick()
    formatLogo()
  })()
})
