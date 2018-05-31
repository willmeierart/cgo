import '../../../../scss/pages/teachings.scss'
import '../../../../scss/pages/explore.scss'
// import '../../../../scss/main.scss'
import { url } from '../../../utils'
import logo from '../../../../assets/cgo-logo'

jQuery(document).ready(function($) {
  const formatHeaderText = () => {
    $('.header-title-text').prepend(`
      <div id='cgo-logo' class='header-logo'>${ logo }</div>
    `).css({
      background: `url('${url}/wp-content/uploads/2018/05/teachings-banner.jpg')`
    })
    $('.header-logo').css({
      height: '50px'
    }).children('svg').css({
      height: '2px'
    })

    $('.banner-2').css({
      background: `url('${url}/wp-content/uploads/2018/05/teachings-bigquote-01.jpg')`
    })
    $('.banner-3').css({
      background: `url('${url}/wp-content/uploads/2018/05/teachings-bigquote-02.jpg')`
    })
    $('.banner-4').css({
      background: `url('${url}/wp-content/uploads/2018/05/teachings-bigquote-03.jpg')`
    })
  }

  $('.audio-sample').addClass('prepend-audio')

  const addTopMarginNoTitle = () => {
    $('.vc_col-sm-6').each((i, col) => {
      const conds = $(col).find('h4').length < 1 &&
        $(col).siblings().find('h4').length >= 1 &&
        $(col).find('img').length < 1
      // console.log(conds);
      if (conds) {
        $(col).css({ marginTop: '4.5em' })
      }
    })
  }
  
  const initDoc = () => {
    formatHeaderText()
    addTopMarginNoTitle()
  }
  initDoc()
})
