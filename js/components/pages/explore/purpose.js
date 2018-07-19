import '../../../../scss/pages/purpose.scss'
import '../../../../scss/pages/explore.scss'
import logo from '../../../../assets/cgo-logo'
import { url } from '../../../utils'

jQuery(document).ready(($) => {
  const formatHeaderText = () => {
    $('.header-title-text').css({
      background: `url('${url}/wp-content/uploads/2018/05/purpose-header.jpg')`,
    })
    $('.header-logo').css({
      height: '50px'
    }).children('svg').css({
      height: '2px'
    })
  }

  const initDoc = (() => {
    formatHeaderText()
  })()
})
