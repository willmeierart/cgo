import '../../../../scss/pages/home.scss'
import './rosettaHeader'
import { url } from '../../../utils'

jQuery(document).ready(($) => {
  
  const setBtnBGs = () => {
    // const btnColors = ['purple', 'orange', 'yellow', 'blue']
    // const mediaURL = url + '/wp-content/uploads/2018/02/btn_bg_'
    const mediaURL = url + '/wp-content/uploads/2018/04/home-button-0'
    $('.home-nav-btn').each((i, btn) => {
      $(btn).css('background-image', `url('${mediaURL}${i + 1}.png')`)
    })
  }

  const formatSectionTitle = () => {
    const h2el = $('.section-title').children('h2')
    h2el.text(h2el.text().split('?')[0]).append('<span class="gold-letter-normal">?</span>')
  }

  const formatEndStatement = () => {
    const pars = $('.come-within p') 
    const par = pars[pars.length - 1]
    const splitPar = $(par).text().split('. ')
    const newLinePar = splitPar.join('.\n')
    $(par).text(newLinePar)
  }

  const initDoc = () => {
    setBtnBGs()
    formatEndStatement()
    formatSectionTitle()
  }
  initDoc()
})
