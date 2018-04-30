import '../../../../scss/pages/home.scss'
import './rosettaHeader'
import { url } from '../../../utils'

jQuery(document).ready(($) => {
  
  const setBtnBGs = () => {
    const btnColors = ['purple', 'orange', 'yellow', 'blue']
    const mediaURL = url + '/wp-content/uploads/2018/02/btn_bg_'
    $('.home-nav-btn').each((i, btn) => {
      $(btn).css('background-image', `url('${mediaURL}${btnColors[i]}.jpg')`)
    })
  }

  const formatSectionTitle = () => {
    $('.section-title').children('h2').text(this.text().split('about')[0]).append('<span class="gold-letter-normal">?</span>')
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
