// MASTER JS FILE - USE TO COMPILE OTHER MODULAR SCRIPTS
// (remember to run `webpack --watch` for changes to update live)
import '../scss/main.scss'
import { url, thisPage, isThin } from './utils'
import './components/common/footer'  
import './components/common/header'
import './components/common/userAgreement'
import './components/common/menu'
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
    if ($('img').length > 0) {
      $('img').each((i, img) => {
        if ($(img).attr('src') !== undefined && $(img).attr('src') !== '') {
          $(img).attr('src').indexOf('localhost') !== -1 && $(img).attr('src', $(img).attr('src').replace(/\/\/localhost:300\d/, url)) 
        }
        if ($(img).attr('srcset') !== undefined && $(img).attr('srcset') !== '') {
          $(img).attr('srcset').indexOf('localhost') !== -1 && $(img).attr('srcset', $(img).attr('srcset').replace(/\/\/localhost:300\d/, url)) 
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

  const prependAudioBtn = () => {
    $('.prepend-audio').css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }).prepend(`
      <a><img class='audio-btn' src='${url}/wp-content/uploads/2018/05/icon-audio.png' /></a>
    `)
    $('.audio-btn').css({
      maxWidth: '30px'
    }).hover(btn => {
      $(btn).css({
        filter: 'hue-rotate(90deg)'
      })
    })
  }

  const initDoc = (() => {
    ditchThemeImgAnimations()
    addSmallLogos()
    flipMiddleSecOnMobile()
    handleLocalSrcSets()
    prependAudioBtn()
    formatGoldFirstLetter()
  })()
})
