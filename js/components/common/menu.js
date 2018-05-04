import { isThin } from '../../utils'

jQuery(document).ready(function($) {

  const enableNewMenuClickFunctionality = () => {
    $('#side-nav li').each((i, li) => {
      const a = $(li).children('a')
      if ($(li).hasClass('has-children')) {
        $(li).children('a').first().append('<i class="fas fa-plus"></i>')
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
      if ($(a).text() === 'Explore' || $(a).text() === 'Participate') {
        $(a).addClass('disable')
        $(li).click(e => {
          console.log($(e.target))
          e.preventDefault()
          $(li).children('ul').slideToggle(300)
          $(li).toggleClass('isOpen')
          // $(e.target).parent().addClass('isOpen')
          $(li).find('i').toggleClass('fa-plus fa-minus')
          $(li).siblings().children('ul').slideUp(300)
          $(li).siblings().children('i').removeClass('fa-minus').addClass('fa-plus')
          
        })
        $(li).find('.submenu-item').each((j, subLi) => {
          if ($(subLi).children('ul').length > 0 ) {
            // $(subLi).prepend('<i class="fas fa-angle-down arrow"></i>')
            $(subLi).click(e => {
              e.preventDefault()
              e.stopPropagation()
              $(subLi).toggleClass('isOpen')
              $(subLi).find('i').toggleClass('fa-plus fa-minus')
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
  }
  initDoc()
})
