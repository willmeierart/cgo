import '../../../../scss/pages/twoGifts.scss'
import '../../../../scss/pages/explore.scss'
import { url, isIE } from '../../../utils'
import logo from '../../../../assets/cgo-logo'

jQuery(document).ready(function($) {
  const setHeaderImgs = () => {
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
    $('.seminar-btn').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/06/CGO-Button-MoreAboutTheSeminars-1.0.jpg')`
    })
    $('.meditate-btn').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/06/CGO-Button-MeditateWithUs-1.0.jpg')`
    })
  }

  if (isIE) {
    $('.blue-sun').css({ width: '50%' })
    $('.squiggle').css({ width: '30%' })
    $('.left-text h1')
      .parent().css({ width: '100%' })
  }

  const initDoc = () => {
    setHeaderImgs()
    setButton()
  }
  initDoc()
})
