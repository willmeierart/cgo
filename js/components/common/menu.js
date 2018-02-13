import { isThin } from '../../utils'


jQuery(document).ready(function($) {

  const disableThemeFunctionality = () => {
    $('#side-nav ul li').each((i, li) => {
      const a = $(li).childen('a')[0]
      if ($(a).text() === 'Learn' || $(a).text() === 'Offerings') {
        $(a).click(e => {
          e.preventDefault()
          $(li).toggleClass('open')
        })
      }
      if($(li).hasClass('has-children')) {
        $(a).on('mouseover', e => {
          e.preventDefault()
          $(li).toggleClass('open')
        })
      }
    })
  }
  
  
  // const dealWithMobileSubmenus = () => {
  //   if (isThin) {
  //     $('#side-nav .menu-item-has-children').prepend('<i class="fas fa-angle-right arrow"></i>')
  //     $('#side-nav .menu-item-has-children').hover(e => {
  //       e.preventDefault()
  //       $(e.target).children('.arrow')
  //         .toggleClass('fa-angle-right fa-angle-down')
  //       $(e.target).children('ul')
  //         .show()
  //     })
  //   }
  // }
  
  const initDoc = () => {
    // dealWithMobileSubmenus()
    disableThemeFunctionality()
  }
  initDoc()
})
