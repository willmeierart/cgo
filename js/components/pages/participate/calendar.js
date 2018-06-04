import { url } from '../../../utils'

jQuery(document).ready($ => {
  const { hash } = window.location
  const a = $('.az-offerings-submenu-wrapper.calendar').find('a')
  a.click(e => {
    a.removeClass('active')
    $(e.target).addClass('active')
  })
  a.each((i, A) => {
    if ($(A).hasClass('active')) {
      if (hash.toLowerCase().replace(/[^a-z]/g, '') !== $(A).text().toLowerCase().replace(/[^a-z]/g, '')) {
        $(A).removeClass('active')
      }
    } else {
      if (hash.toLowerCase().replace(/[^a-z]/g, '') === $(A).text().toLowerCase().replace(/[^a-z]/g, '')) {
        $(A).addClass('active')
      }
    }
  })
  $('.calendar .top-banner').css({
    backgroundImage: `url('${url}/wp-content/uploads/2018/05/participate-header.jpg')`
  })
})
