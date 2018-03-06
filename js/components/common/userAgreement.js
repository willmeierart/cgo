import axios from 'axios'
import { url } from '../../utils'

jQuery(document).ready(($) => {
  const agreementEndpoint = url + '/wp-json/wp/v2/pages/236'
  let UAContent = ''

  $('body').prepend('<div id="user-agreement-modal"></div>')

  const fetchContent = async () => {
    const response = await axios.get(agreementEndpoint)
    const agreement = await response.data.content.rendered
    UAContent = agreement

    $('#user-agreement-modal').append(UAContent)

    $('#side-nav ul a').each((i, a) => {
      if($(a).text() === 'User Agreement'){
        $(a).click(e => {
          e.preventDefault()
          $('#user-agreement-modal').toggle()
          // alert(UAContent)
        })
      }
    })
  }

  const initDoc = async () => {
    await fetchContent()
  }
  initDoc()
})
