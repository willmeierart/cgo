import { isThin } from '../../utils'

jQuery(document).ready(function($) {
  console.log('MENU INITD')

  const getGridContainerSize = () => $('#top').find('.inner-grid').width()
  // console.log(getGridContainerSize(), $('#top').find('.inner-grid'))
  let gridContainerSize = getGridContainerSize()
  let initInterval
  let initial = true
  let shouldFireGate = true
  let i = 0  

  const handleAnimatingPos = () => {
    console.log($('#top').find('.inner-grid').css('margin-left'));
    const marginLeft = parseFloat($('#top').find('.inner-grid').css('margin-left').replace(/[a-zA-Z]/g, ''))
    const computedWidth = getGridContainerSize() + (marginLeft * 2)
    const pxPlusChange = getGridContainerSize() < gridContainerSize - 1.5 || getGridContainerSize() > gridContainerSize + 1.5
    const marginsNotSame = window.innerWidth - computedWidth <= Math.abs(3)
    const conds = pxPlusChange || marginsNotSame // || computedWidth !== window.innerWidth

    console.log('pxPlusChange', pxPlusChange, 'marginsNotSame', marginsNotSame, 'getGridContainerSize', getGridContainerSize(), 'marginLeft', marginLeft, 'computedWidth', computedWidth, 'window', window.innerWidth)

      const containerEl = $('#top').find('.inner-grid')
      if (initial) {
        initial = false
        gridContainerSize = getGridContainerSize()
        const marginLeftInit = (window.innerWidth - gridContainerSize) / 2
        containerEl.css({ marginLeft: marginLeftInit })
      } else if (conds) {
        if (initInterval) {
          clearInterval(initInterval)
          initInterval = null
        }
        shouldFireGate = true
        console.log('changed', gridContainerSize, getGridContainerSize())
        // let adjustAmt = gridContainerSize - getGridContainerSize()
        gridContainerSize = getGridContainerSize()
        const marginLeft2 = (window.innerWidth - gridContainerSize) / 2
        // console.log(window.innerWidth, adjustAmt, gridContainerSize, marginLeft)
        containerEl.animate({
          marginLeft: marginLeft2
        }, {
          duration: 500,
          specialEasing: 'ease-in',
          clearQueue: true
        })
      } else {
        console.log('should fire else');
        if (!initInterval) {
          initInterval = setInterval(() => {
            console.log(i);
            i++
            handleAnimatingPos()
            if (conds || i > 50) {
              clearInterval(initInterval)
              initInterval = null
              i = 0
              return
            }
          }, 50)
        }
      }
      // } else {
      //   console.log('was same')
      //   setTimeout(() => {
      //     if (shouldFireGate) {
      //       handleAnimatingPos()
      //       shouldFireGate = false
      //     }
      //   }, 205)
      // }
    return
  }

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
          const txt = $(li).text()
          const txt2 = txt === 'Explore' ? 'Participate' : 'Explore'
          e.preventDefault()
          // console.log('siblings: ', $(li).siblings('.has-children'))
          $(li).siblings('.has-children').removeClass('isOpen')
            .find('i').removeClass('fa-minus').addClass('fa-plus')
          $('.inner-grid').children('.col-2').find(`.${txt2}`)
            .hide(0)
            .siblings(`.${txt}`)
              .slideToggle(200)
          $('.inner-grid').children('.col-3').children('ul')
            .hide(200)
          $('.inner-grid').children('.col-2').find('.has-children')
            .removeClass('isOpen')
            .find('i')
              .removeClass('fa-minus').addClass('fa-plus')
          $(li).toggleClass('isOpen')
          // $(e.target).parent().addClass('isOpen')
          $(li).find('i')
            .toggleClass('fa-plus fa-minus')
          // $(li).siblings().children('ul').slideUp(200)
          $(li).siblings().children('i').removeClass('fa-minus').addClass('fa-plus')
          handleAnimatingPos()
        })
      }
      
    })
    $('.col-2').find('.submenu-item').each((i, subLi) => {
      if ($(subLi).hasClass('has-children')) {
        // $(subLi).prepend('<i class="fas fa-angle-down arrow"></i>')
        $(subLi).children('a').addClass('disable')
        $(subLi).click(e => {
          e.preventDefault()
          e.stopPropagation()
          // e.stopPropagation()
          $(subLi).toggleClass('isOpen')
          $(subLi).find('i')
            .toggleClass('fa-plus fa-minus')
          const tertList = $('.inner-grid').children('.col-3').children('ul')
          tertList.slideToggle(200)
          handleAnimatingPos()
        })
      }
    })
    $('.col-3').find('.tert-menu-item').click(e => {
      $('#side-nav').slideUp(200)
      $('#nav-btn').removeClass('open')
    })
  }

  

  const initAnimation = () => {
    // const els = [
    //   $('#nav-btn')
      // $('#top').find('.col-1').find('.item'),
      // $('#top').find('.col-2').find('.submenu-item'),
      // $('#top').find('.col-3').find('.tert-menu-item')
    // ]
    // els.forEach(el => {
    //   el.click(e => {
    //     if ($('#nav-btn').hasClass('open')) {
    //       handleAnimatingPos()
    //     }
    //   })
    // })
    $('#nav-btn').click(() => {
      if ($('#nav-btn').hasClass('open')) {
        handleAnimatingPos()
      }
    })
    $('#')
  }
  
  const initDoc = () => {
    // dealWithMobileSubmenus()
    const initial = true
    window.addEventListener('resize', handleAnimatingPos)
    enableNewMenuClickFunctionality()
    // handleAnimatingPos(true)
    initAnimation()
  }
  initDoc()
})
