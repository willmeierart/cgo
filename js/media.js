import { url } from './utils'
jQuery(document).ready($ => {
  // const mediaEl = $('body').find('.media-url')
  // const url = mediaEl.text()
  // mediaEl.replace(`<audio src="${url}"></audio>`)
  $('audio-link').css({ display: 'none' })
  
  const audioModal = $(`
    <div id='audio-modal-bg'>
      <div class='audio-wrapper'>
        <div class='audio-screen'></div>
        <div class='player-wrapper'>
          <audio controls />
        </div>
      </div>
    </div>
  `)
  jQuery('body').append(audioModal)
  $('#audio-modal-bg').click(e => {
    $('#audio-modal-bg').hide(200)
  })


  const handleBtnClick = () => {
    $('.audio-btn').click(e => {
      console.log(e)
      const SRC = $(e.target).closest('.wpb_wrapper').find('.audio-link').text()
      console.log(SRC)    
      $('#audio-modal-bg').find('audio').attr('src', url + SRC)
      $('#audio-modal-bg').show(200)
    })
  }

  const initDoc = () => {
    handleBtnClick()    
  }

  setTimeout(initDoc, 1000)
})
