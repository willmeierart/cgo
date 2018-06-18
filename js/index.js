// MASTER JS FILE - USE TO COMPILE OTHER MODULAR SCRIPTS
// (remember to run `webpack --watch` for changes to update live)
import '../scss/main.scss'
import { url, thisPage, isThin } from './utils'
import './components/common/footer'  
import './components/common/header'
import './components/common/menu'
import './components/common/media'
import logo from '../assets/cgo-logo.js' 

jQuery(document).ready(($) => { 
  const ditchThemeImgAnimations = () => {
    $('.img-with-aniamtion-wrap').removeClass('img-with-aniamtion-wrap')
    $('.img-with-animation').removeClass('img-with-animation')
  }

  const addSmallLogos = () => {
    $('.logo-append-to').removeClass('logo-append-to').addClass('append-logo')  
    $('.append-logo').each((i, sec) => {
      if ($(sec).children().length < 1) {
        $(sec).parent().append(`<div class='append-wrapper-${i}'></div>`)
        const sec2 = $(sec).clone()
        $(sec).remove()
        $(`.append-wrapper-${i}`).css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }).append(`<div class="cgo-logo-small">${logo}</div>`)
      } else {
        $(sec).append(`<div class="cgo-logo-small">${logo}</div>`)
      }
    })

    $('.prepend-logo').each((i, sec) => {
      if ($(sec).children().length < 1) {
        $(sec).parent().append(`<div class='prepend-wrapper-small-${i}'></div>`)
        const sec2 = $(sec).clone()
        $(sec).remove()
        $(`.prepend-wrapper-small-${i}`).css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }).append(`<div class="cgo-logo-small">${logo}</div>`)
      } else {
        $(sec).prepend(`<div class="cgo-logo-small">${logo}</div>`)
      }
    })

    $('.prepend-logo-medium').each((i, sec) => {
      if ($(sec).children().length < 1) {
        $(sec).parent().append(`<div class='prepend-wrapper-medium-${i}'></div>`)
        const sec2 = $(sec).clone()
        $(sec).remove()
        $(`.prepend-wrapper-medium-${i}`).css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }).append(`<div class="cgo-logo-medium">${logo}</div>`)
      } else {
        $(sec).prepend(`<div class="cgo-logo-medium">${logo}</div>`)
      }
    })
  }

  const flipMiddleSecOnMobile = () => {
    const pageNeedsFlippedMiddleSection = thisPage === 'spiritual-lineage'
    if (pageNeedsFlippedMiddleSection && isThin) {
      $('.middle-template-section .span_12')
        .children('.vc_col-sm-6')
        .each((i, sec) => {
          $('.middle-template-section .span_12').prepend(sec)
        })
    }
  }
  
  const handleLocalSrcSets = () => {
    console.log(url);
    if ($('img').length > 0) {
      $('img').each((i, img) => {
        const path = `/wp-content${$(img).attr('src').split('/wp-content')[1]}`
        if ($(img).attr('src') !== undefined && $(img).attr('src') !== '') {
          $(img).attr('src').indexOf('centerofthegoldenone') === -1 && $(img).attr('src', `${url}${path}`) 
        }
        if ($(img).attr('srcset') !== undefined && $(img).attr('srcset') !== '') {
          $(img).attr('srcset').indexOf('centerofthegoldenone') === -1 && $(img).attr('srcset', `${url}${path}`) 
        }
      })
    }
  }

  const formatGoldFirstLetter = () => {
    $('.gold-first-letter').addClass('gilded-first-letter')
    $('.gilded-first-letter').each((i, par) => {
      const pars = $(par).find('p') 
      const firstPar = $(pars).first() 
      const txtContent = firstPar.text()
      const firstLetter = txtContent.substring(0, 1)
      const rest = txtContent.substring(1, txtContent.length)
      $(firstPar).addClass('first-par').empty().append(`<span class='first-letter'>${firstLetter}</span><span class='rest'>${rest}</span>`)
    })
  }

  const removeWoocommerceMenu = () => {
    const { pathname } = window.location
    const conds = pathname.indexOf('cart') !== -1 ||
      pathname.indexOf('checkout') !== -1 ||
      pathname.indexOf('shop') !== -1 ||
      pathname.indexOf('product') !== -1
    console.log(conds)
    if (!conds) {
      $('#header-secondary-outer').remove()
    }
  }

  const initDoc = (() => {
    ditchThemeImgAnimations()
    addSmallLogos()
    flipMiddleSecOnMobile()
    handleLocalSrcSets()
    formatGoldFirstLetter()
    removeWoocommerceMenu()
    window.addEventListener('resize', () => {
      $('.cart-outer').css({ display: 'none' })
    })
  })()
})
