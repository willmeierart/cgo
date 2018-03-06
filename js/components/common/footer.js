jQuery(document).ready(function($) { 
  // const isThin = $(window).width() <= 1000
  // const clonedMenu = isThin ? $({
  //       ...$('.mobile-only .menu').clone()
  //     }) : $({ ...$('nav .sf-menu').clone() })

  $('#footer-outer h4').remove()

  // $('a').filter((x, b) => {
  //   return $(b).attr('href') === '/learn/spiritual-masters'
  // }).each((i, a) => {
  //     console.log(a);
  //     if (i !== 0) {
  //       // $(a).replaceWith($('a').children())
  //       console.log($(a).children());
  //     }
  //   })

  // $('#text-3 p').each((i, social) => {
  //   let className = ''
  //   const txtContent = $(social).text()
  //   switch (true) {
  //     case (txtContent.indexOf('facebook') !== -1) :
  //       className = 'facebook'
  //       break
  //     case (txtContent.indexOf('linkedin') !== -1) :
  //       className = 'linkedin'
  //       break
  //     default:
  //       break
  //   }
  //   $(social).replaceWith(`<a href='${txtContent}' target='_blank'><i class="fas fa-${className}"></i></a>`)
  // })
})
