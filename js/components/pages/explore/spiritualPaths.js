import '../../../../scss/pages/spiritualPaths.scss'
import '../../../../scss/pages/explore.scss'
import '../../../../scss/main.scss'
import { url } from '../../../utils'

jQuery(document).ready($ => {
  $('.header-text').css({
    backgroundImage: `url('${url}/wp-content/uploads/2018/05/spiritual-paths-header-full.jpg')`
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
  const initDoc = () => {
    setColMargins()
    window.addEventListener('resize', setColMargins)
  }
})