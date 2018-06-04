import { url } from '../../../utils'


jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Upcoming Meditation Events')
  $('.meditation .top-banner').css({
    backgroundImage: `url('${url}/wp-content/uploads/2018/06/participate-header-meditations.jpg')`
  })
})
