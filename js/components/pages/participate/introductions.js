import { url } from '../../../utils'

jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Upcoming Introductory Events')
  $('.introductory .top-banner').css({
    backgroundImage: `url('${url}/wp-content/uploads/2018/06/participate-header-introductions.jpg')`
  })
})
