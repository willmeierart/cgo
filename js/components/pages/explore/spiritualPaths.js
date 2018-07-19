import '../../../../scss/pages/spiritualPaths.scss'
import '../../../../scss/pages/explore.scss'
import '../../../../scss/main.scss'
import { url, isIE } from '../../../utils'

jQuery(document).ready($ => {
  $('.header-text').css({
    backgroundImage: `url('${url}/wp-content/uploads/2018/07/spiritual-paths-header-2.0.jpg')`
  })
  const setColMargins = () => {
    if (window.innerWidth < 1000) {
      $('.vc_col-sm-6').each((i, col) => {
        if ($(col).find('img').length < 1) {
          $(col).css({ margin: '2em', width: 'calc(100vw - 4em)' })
        }
      })
    }
  }

  if (isIE) {
    $('.glyph').removeAttr('width')
  }

  const initDoc = () => {
    setColMargins()
    window.addEventListener('resize', setColMargins)
  }
})
