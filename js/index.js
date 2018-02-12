// MASTER JS FILE - USE TO COMPILE OTHER MODULAR SCRIPTS
// (remember to run `webpack --watch` for changes to update live)
import '../scss/main.scss'
import './components/common/header'
import './components/common/footer'
import './components/common/userAgreement'
import url from './url'

jQuery(document).ready(($) => {

  $('img').each((i, img) => {
    $(img).attr('src').indexOf('localhost') !== -1 && $(img).attr('src', $(img).attr('src').replace('//localhost:3000', url)) 
    $(img).attr('srcset').indexOf('localhost') !== -1 && $(img).attr('srcset', $(img).attr('srcset').replace('//localhost:3000', url)) 
  })


  $('.gilded-first-letter').each((i, par) => {
    const pars = $(par).find('p')
    const firstPar = $(pars).first()
    console.log(firstPar);
    const txtContent = firstPar.text()
    const firstLetter = txtContent.substring(0, 1)
    const rest = txtContent.substring(1, txtContent.length)
    $(firstPar).addClass('first-par').empty().append(`<span class='first-letter'>${firstLetter}</span><span class='rest'>${rest}</span>`)
  })

})
