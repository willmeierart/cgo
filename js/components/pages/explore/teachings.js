import '../../../../scss/pages/teachings.scss'
import '../../../../scss/pages/explore.scss'
import '../../../../scss/main.scss'
import { url } from '../../../utils'
import logo from '../../../../assets/cgo-logo'

jQuery(document).ready(function($) {
  const formatHeaderText = () => {
    $('.header-title-text').prepend(`
      <div id='cgo-logo' class='header-logo'>${ logo }</div>
    `).css({
      background: `url('${url}/wp-content/uploads/2018/05/teachings-banner.jpg')`
    }).append()
    $('.header-logo').css({
      height: '50px'
    }).children('svg').css({
      height: '2px'
    })
  }
  
  const initDoc = () => {
    formatHeaderText()
  }
  initDoc()
})
