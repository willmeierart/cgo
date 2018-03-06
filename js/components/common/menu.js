import { isThin } from '../../utils'

jQuery(document).ready(function($) {

  const enableNewMenuClickFunctionality = () => {
    $('#side-nav li').each((i, li) => {
      const a = $(li).children('a')
      if ($(li).hasClass('has-children')) {
        $(li).prepend('<i class="fas fa-angle-down arrow"></i>')
      }

  // const dealWithMobileSubmenus = () => {
  //   if (isThin) {
  //     $('#side-nav .menu-item-has-children').prepend(')
  //     $('#side-nav .menu-item-has-children').hover(e => {
  //       e.preventDefault()
  //       $(e.target).children('.arrow')
  //         .toggleClass('fa-angle-right fa-angle-down')
  //       $(e.target).children('ul')
  //         .show()
  //     })
  //   }
  // }
      if ($(a).text() === 'Learn' || $(a).text() === 'Offerings') {
        $(a).addClass('disable') 
        $(li).click(e => {
          e.preventDefault()
          $(li).children('ul').slideToggle(300)
          $(li).toggleClass('isOpen')
          $(li).children('i').toggleClass('fa-angle-down fa-angle-up')
          $(li).siblings().children('ul').slideUp(300)
          $(li).siblings().children('i').removeClass('fa-angle-up').addClass('fa-angle-down')
          
        })
        $(li).find('.submenu-item').each((j, subLi) => {
          if ($(subLi).children('ul').length > 0 ) {
            // $(subLi).prepend('<i class="fas fa-angle-down arrow"></i>')
            $(subLi).click(e => {
              e.preventDefault()
              e.stopPropagation()
              $(subLi).toggleClass('isOpen')
              $(subLi).children('i').toggleClass('fa-angle-down fa-angle-up')
              $(subLi).children('ul').slideToggle(300)
            })
          }
        }) 
      }
    })
  }
  
  const initDoc = () => {
    // dealWithMobileSubmenus()
    enableNewMenuClickFunctionality()
    console.log('new');
  }
  initDoc()
})
