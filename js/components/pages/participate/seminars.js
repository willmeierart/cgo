import { url } from '../../../utils'

jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Upcoming Seminars')
  $('.seminars .top-banner').css({
    backgroundImage: `url('${url}/wp-content/uploads/2018/06/participate-header-seminars.jpg')`
  })
})
