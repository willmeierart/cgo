import '../../../../scss/pages/twoGifts.scss'
import { url } from '../../../utils'

jQuery(document).ready(function($) {
  const setHeaderImgs = () => {
    $('.top-banner').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-headerstandardized.jpg')`
    })
    $('.breaker-1').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-la-banner-02.jpg')`
    })
    $('.breaker-2').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-la-banner-03.jpg')`
    })
    
  }
  const setButton = () => {
    $('.two-gifts-button').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-button.png')`
    })
  }

  const initDoc = () => {
    setHeaderImgs()
    setButton()
  }
  initDoc()
})
