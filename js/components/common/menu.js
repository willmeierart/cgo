import { isThin } from '../../utils'


jQuery(document).ready(function($) {

  const enableNewMenuClickFunctionality = () => {
    $('#side-nav li').each((i, li) => {
      const a = $(li).children('a')
      if ($(a).text() === 'Learn' || $(a).text() === 'Offerings') {
        $(a).addClass('disable')
        $(li).click(e => {
          e.preventDefault()
          $(li).children('ul').slideToggle(300)
          $(li).siblings().children('ul').slideUp(300)
        })
        $(li).find('.submenu-item').each((j, subLi) => {
          if ($(subLi).children('ul').length > 0 ) {
          $(subLi).click(e => {
            e.preventDefault()
            e.stopPropagation()
            $(subLi).children('ul').slideToggle(300)
          })
        }
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
    enableNewMenuClickFunctionality()
  }
  initDoc()
})
