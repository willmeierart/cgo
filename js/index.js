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
  const pageNeedsFlippedMiddleSection = thisPage === 'kalindi' || thisPage === 'gourasana' || thisPage === 'the-lady'
  
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


  $('.gilded-first-letter').each((i, par) => {
    const pars = $(par).find('p') 
    const firstPar = $(pars).first() 
    const txtContent = firstPar.text()
    const firstLetter = txtContent.substring(0, 1)
    const rest = txtContent.substring(1, txtContent.length)
    $(firstPar).addClass('first-par').empty().append(`<span class='first-letter'>${firstLetter}</span><span class='rest'>${rest}</span>`)
  })

  if (pageNeedsFlippedMiddleSection && isThin) {
    $('.middle-template-section .span_12').children('.vc_col-sm-6')
      .each((i, sec) => {
        $('.middle-template-section .span_12').prepend(sec)
      })
  }

  $('.logo-append-to').append(`<div class="cgo-logo">${logo}</div>`)

})
