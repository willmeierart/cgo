import { url } from '../../../utils'
import logo from '../../../../assets/cgo-logo.js'
import '../../../../scss/_animations.scss'
import '../../../../scss/pages/home.scss'

jQuery(document).ready(($) => {

  const rosePfx = url + '/wp-content/uploads/2018/05/home-header-rose'
  const imgSize = 788
  const imgWPix = `${imgSize}px`
  const imgEl = $('.each-rose').children('img')[0]
  const roseRect = imgEl.getBoundingClientRect()
  console.log(roseRect)
  let roseRealWidth = roseRect.width
  let roseMargin = (window.innerWidth - roseRealWidth) / 2

  console.log(roseRealWidth)

  window.addEventListener('resize', () => {
    if (window.innerWidth < imgSize) {
      console.log('reeval roseRealWidth')
      roseRealWidth = imgEl.getBoundingClientRect().width
      $('.each-rose').children('img').css({ maxWidth: imgWPix, maxHeight: imgWPix /*marginLeft: roseMargin*/ })
    }
    roseMargin = (window.innerWidth - roseRealWidth) / 2
  })

  console.log(window.location)
  const isLocal = window.location.host.includes('localhost')

  if (isLocal) {
    console.log('isLocal')
    const rawSrc = $('.rose-5 img').attr('src')
    $('.rose-5 img').attr('src', url + rawSrc)
    console.log($('.rose-5 img').attr('src'))
  }

  const createRosettas = () => {
    let i = 4
    let j = 3
    const slots = [0, 0, 0, 0]
    slots.forEach((x, k) => {
      console.log(x, k)
      const num = k + 1
      $('#rosetta-container').append($(`
        <div class='each-rose rose-${num}' >
          <img src='${rosePfx}0${num}.png' />
        </div>
      `).css({
        zIndex: num,
        opacity: num > 3 ? 1 : 0,
        willChange: 'opacity'
      }))
    })

    $('#rosetta-container').append(`
      <div class='rose-logo-wrapper'>
        <div id='rosetta-logo'>${ logo }</div>
      </div>
    `)

    $('.rose-logo-wrapper').css({
      zIndex: 10,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: imgWPix,
      color: '#CDA33A',
      bottom: 0
    })

    i = 5
    j = 4

    $('.each-rose').children('img').css({ maxWidth: imgWPix, maxHeight: imgWPix /*marginLeft: roseMargin*/ })

    const animateFunc = () => {
      if (i === 0) i = 5
      if (j === 0) j = 5
      $(`.rose-${j}`).css({
        opacity: 1,
        zIndex: j < i ? j : i,
        // backgroundBlendMode: 'normal'
      })
      $(`.rose-${i}`).css({
        zIndex: i > j ? i : j,
        // mixBlendMode: 'difference'
        // mixBlendMode: i % 2 === 0 ? 'overlay' : 'multiply'
      }).delay(200)
        .animate({ opacity: 0 }, {
          duration: 5000, 
          specialEasing: 'ease-in',
          clearQueue: true,
          complete: () => {
            i--
            j--
            setTimeout(() => { animateFunc() }, 160)
            // window.requestAnimationFrame(animateFunc)            
          }
        })
    }
    window.requestAnimationFrame(animateFunc)
    // animateFunc()
  }

  const initDoc = () => {
    $('.rose-5 img').load(() => {
      createRosettas()
    })
  }
  initDoc()
})
