import '../../../../scss/pages/home.scss'
// import { TweenMax, TimelineLite } from 'gsap/TweenMax'
import './rosettaHeader'
import { url, isMobile } from '../../../utils'

jQuery(document).ready(($) => { 
  const setBtnBGs = () => {
    const mediaURL = url + '/wp-content/uploads/2018/06/CGO-Button'
    const teachingsExt = '-Teachings-1.0.jpg'
    const meditationExt = '-Meditation-1.0.jpg'
    const seminarsExt = '-Seminars-1.0.jpg'
    const lineageExt = '-SpiritualLineage-1.0.jpg'

    $('.meditation-btn').css('background-image', `url('${mediaURL}${meditationExt}')`)
    $('.seminars-btn').css('background-image', `url('${mediaURL}${seminarsExt}')`)
    $('.teachings-btn').css('background-image', `url('${mediaURL}${teachingsExt}')`)
    $('.lineage-btn').css('background-image', `url('${mediaURL}${lineageExt}')`)
  }

  const animateTitle = () => {
    $('.section-title h2').addClass('cssanimation leBlurInRight sequence')
    const checker = () => {
      if ($('.section-title h2').children().length > 0) {
        $('.section-title h2').css({ opacity: 1 }).children().css({ opacity: 1 }).last().css({ color: '#D4A011' })
      } else {
        setTimeout(checker, 100)
      }
    }
    checker()
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

    if (!isMobile) {
      animateTitle()
    } else {
      $('.section-title h2').css({ opacity: 1 })
    }
  }
  initDoc()
})
