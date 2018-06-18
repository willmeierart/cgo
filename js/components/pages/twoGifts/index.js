import '../../../../scss/pages/twoGifts.scss'
import '../../../../scss/pages/explore.scss'
import { url } from '../../../utils'
import logo from '../../../../assets/cgo-logo'

jQuery(document).ready(function($) {
  const setHeaderImgs = () => {
    $('.header-title-text').prepend(`
      <div id='cgo-logo' class='header-logo'>${ logo }</div>
    `)
    $('.top-banner').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-headerstandardized.jpg')`
    })
    $('.breaker-1').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-la-banner-01.jpg')`
    })
    $('.breaker-2').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-la-banner-02.jpg')`
    })
    $('.breaker-3').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-la-banner-03.jpg')`
    })
    $('.breaker-4').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-gmp-banner-01.jpg')`
    })
    $('.breaker-5').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-gmp-banner-02.jpg')`
    })
    $('.breaker-6').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/2gifts-gmp-banner-03.jpg')`
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
