import '../../../scss/pages/home.scss'
import url from '../../url'

jQuery(document).ready(($) => {

  const setBtnBGs = () => {
    const btnColors = ['purple', 'orange', 'yellow', 'blue']
    const mediaURL = url + '/wp-content/uploads/2018/02/btn_bg_'
    $('.home-nav-btn').each((i, btn) => {
      $(btn).css('background-image', `url('${mediaURL}${btnColors[i]}.jpg')`)
    })
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
  }
  initDoc()
})
