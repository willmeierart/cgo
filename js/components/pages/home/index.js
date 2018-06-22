import '../../../../scss/pages/home.scss'
import './rosettaHeader'
import { url } from '../../../utils'

jQuery(document).ready(($) => { 
  const setBtnBGs = () => {
    const mediaURL = url + '/wp-content/uploads/2018/06/CGO-Button'
    const teachingsExt = '-Teachings-1.0.jpg'
    const meditationExt = '-Meditation-1.0.jpg'
    const seminarsExt = '-Seminars-1.0.jpg'
    const lineageExt = '-SpiritualLineage-1.0.jpg'

    // const mediaURL = url + '/wp-content/uploads/2018/04/home-button-0'
    // $('.home-nav-btn').each((i, btn) => {
    //   $(btn).css('background-image', `url('${mediaURL}${i + 1}.png')`)
    // })
    $('.meditation-btn').css('background-image', `url('${mediaURL}${meditationExt}')`)
    $('.seminars-btn').css('background-image', `url('${mediaURL}${seminarsExt}')`)
    $('.teachings-btn').css('background-image', `url('${mediaURL}${teachingsExt}')`)
    $('.lineage-btn').css('background-image', `url('${mediaURL}${lineageExt}')`)


  }

  const formatSectionTitle = () => {
    const h2el = $('.section-title').children('h2')
    h2el.text(h2el.text().split('?')[0]).append('<span class="gold-letter-normal">?</span>')
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
    formatSectionTitle()
  }
  initDoc()
})
