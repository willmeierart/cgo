import { url } from '../../../utils'
import logo from '../../../../assets/cgo-logo.js'
import '../../../../scss/pages/home.scss'

jQuery(document).ready(($) => {
  const rosePfx = url + '/wp-content/uploads/2018/06/home-header-rose'
  const imgSize = 788
  const imgWPix = `${imgSize}px`
  const imgEl = $('.each-rose').children('img')[0]
  const roseRect = imgEl.getBoundingClientRect()
  let roseRealWidth = roseRect.width
  let roseMargin = (window.innerWidth - roseRealWidth) / 2

  window.addEventListener('resize', () => {
    if (window.innerWidth < imgSize) {
      roseRealWidth = imgEl.getBoundingClientRect().width
      $('.each-rose').children('img').css({ maxWidth: imgWPix, maxHeight: imgWPix })
    }
    console.log($('.rose-5 img').css('padding'))
    roseMargin = (window.innerWidth - roseRealWidth) / 2
  })

  const isLocal = window.location.host.includes('localhost')

  if (isLocal) {
    // const rawSrc = `/wp-content${$('.rose-5 img').attr('src')}`
    // $('.rose-5 img').attr('src', url + rawSrc)
  }

  const createRosettas = () => {
    let i = 4
    let j = 3
    const slots = [0, 0, 0, 0]
    slots.forEach((x, k) => {
      const num = k + 1
      $('#rosetta-container').append($(`
        <div class='each-rose rose-${num}' >
          <img src='${rosePfx}0${num}.jpg' />
        </div>
      `).css({
        zIndex: num,
        opacity: num > 3 ? 1 : 0,
        willChange: 'opacity'
      }))
    })

    // $('#rosetta-container').append(`
    //   <div class='rose-logo-wrapper'>
    //     <div id='rosetta-logo'>${ logo }</div>
    //   </div>
    // `)

    $('.rose-logo-wrapper').css({
      zIndex: 10,
      position: 'absolute',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: '#CDA33A',
      bottom: 0
    }).children('#rosetta-logo').css({
      height: `${Math.min($('#rosetta-container').width(), imgSize)}px`,
      display: 'flex',
      alignItems: 'center'
    })

    // $('#rosetta-container').css({
    //   height: '100%'
    // })

    i = 5
    j = 4

    $('.each-rose')
      .children('img')
      .css({
        maxWidth: imgWPix,
        maxHeight: imgWPix,
        height: '100%'
      })

    const animateFunc = () => {
      if (i === 0) i = 5
      if (j === 0) j = 5
      $(`.rose-${j}`).css({
        opacity: 1,
        zIndex: j < i ? j : i
      })
      $(`.rose-${i}`).css({
        zIndex: i > j ? i : j,
      }).delay(200)
        .animate({ opacity: 0 }, {
          duration: 5000, 
          specialEasing: 'ease-in',
          clearQueue: true,
          complete: () => {
            i--
            j--
            setTimeout(() => { animateFunc() }, 160)       
          }
        })
    }
    window.requestAnimationFrame(animateFunc)
  }

  const initDoc = () => {
    createRosettas()
  }
  initDoc()

  window.addEventListener('resize', () => {
    $('#rosetta-logo').css({
      height: `${Math.min($('#rosetta-container').width(), imgSize)}px`
    })
  })
})
