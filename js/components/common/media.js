import { url } from '../../utils'
import audioIcon from '../../../assets/audioIcon'

jQuery(document).ready($ => {
  let audio
  $('audio-link').css({ display: 'none' })
  
  const audioModal = $(`
    <div id='audio-modal-bg'>
      <div class='audio-wrapper'>
        <div class='audio-screen'></div>
        <div class='player-wrapper'>
          <audio class='audio-player' controls />
        </div>
      </div>
    </div>
  `)
  jQuery('body').append(audioModal)
  $('#audio-modal-bg').children().click(e => {
    console.log(e.target)
    if (!$(e.target).hasClass('audio-player')) {
      $('#audio-modal-bg').hide(200)
      if (audio[0]) {
        audio[0].pause()
      }
    }
  })


  const handleBtnClick = () => {
    $('.audio-btn').click(e => {
      const SRC = $(e.target).closest('.wpb_wrapper').find('.audio-link').text()
      audio = $('#audio-modal-bg').find('audio')
      audio.attr('src', url + SRC)
      $('#audio-modal-bg').show(200)
      audio[0].play()
    })
  }

  const prependAudioBtn = () => {
    $('.prepend-audio').css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }).prepend(`
      <a class='audio-btn'>${audioIcon}</a>
    `)
    $('.audio-btn')
      .css({ maxWidth: '30px' })
      .hover(btn => {
        $(btn).css({ filter: 'hue-rotate(90deg)' })
      })
  }

  const initDoc = () => {
    prependAudioBtn()
    handleBtnClick()    
  }

  setTimeout(initDoc, 1000)
})
