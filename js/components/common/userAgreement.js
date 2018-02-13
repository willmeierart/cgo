import axios from 'axios'
import { url } from '../../utils'

jQuery(document).ready(($) => {
  const agreementEndpoint = url + '/wp-json/wp/v2/pages/236'
  let content = ''

  const fetchContent = async () => {
    const response = await axios.get(agreementEndpoint)
    const agreement = await response.data.content.rendered
    content = agreement
    $('#side-nav ul a').each((i, a) => {
      if($(a).text() === 'User Agreement'){
        $(a).click(e => {
          e.preventDefault()
          alert(content)
        })
      }
    })
  }

  const initDoc = async () => {
    await fetchContent()
  }
  initDoc()
})
