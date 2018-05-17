import { isThin } from '../../utils'
import throttle from 'lodash.throttle'

jQuery(document).ready(function($) {
  let initial = true  
  const test = false
  let mobileMenuView = 0

  const hardCodedVals = {
    col1w: 500,
    col2w: 390.2,
    col3w: 165.8,
    margin1: (window.innerWidth - 500) / 2,
    margin2: (window.innerWidth - 890.2) / 2,
    margin3: (window.innerWidth - 1051) / 2,
    test: true
  }

  const dynamicVals = {
    col1w: 0,
    col2w: 0,
    col3w: 0,
    margin1: 0,
    margin2: 0,
    margin3: 0
  }
  const dynamicValsReady = () => {
    let retVal = true
    Object.keys(dynamicVals).forEach(key => {
      if (dynamicVals[key] === 0) {
        retVal = false
      }
    })
    return retVal
  }

  let VALS = !test && dynamicValsReady() ? dynamicVals : hardCodedVals

  const adjustDynamicMarginsOnResize = () => {
    const { col1w, col2w, col3w } = VALS
    VALS.margin1 = col1w === 0 ? 0 : (window.innerWidth - col1w) / 2
    VALS.margin2 = col1w === 0 || col2w === 0 ? 0 : (window.innerWidth - (col1w + col2w)) / 2,
    VALS.margin3 = col1w === 0 || col2w === 0 || col3w === 0 ? 0 : (window.innerWidth - (col1w + col2w + col3w)) / 2
  }

  const setDynamicVal = (propName, val) => {
    console.log('using Dynamic Vals:', dynamicValsReady() && !VALS.test)
    if (!dynamicValsReady()) {
      dynamicVals[propName] = val
      switch (propName) {
        case 'col1w':
          dynamicVals.margin1 = (window.innerWidth - val) / 2
          break
        case 'col2w': 
          dynamicVals.margin2 = (window.innerWidth - (dynamicVals.col1w + val)) / 2        
          break
        case 'col3w':
          dynamicVals.margin3 = (window.innerWidth - (dynamicVals.col1w + dynamicVals.col2w + val)) / 2    
          break
        default:
          console.log('invalid propName')
          break
      }
      console.log('dynamicVals changed', dynamicVals)
      VALS = !test && dynamicValsReady() ? dynamicVals : hardCodedVals
      return
    } else {
      console.log('dynamicVals ready')
      return
    }
  }

  $('#nav-btn').click(() => { setDynamicVal('col1w', getCol1Width()) })

  const getCol1Width = () => $('#top').find('.inner-grid').children('.col-1').width()
  const getCol2Width = () => $('#top').find('.inner-grid').children('.col-2').width()
  const getCol3Width = () => $('#top').find('.inner-grid').children('.col-3').width()

  const col2isShown = () => $('#top').find('.inner-grid').children('.col-2').find('.new-sub-list').css('display') !== 'none'
  const col3isShown = () => $('#top').find('.inner-grid').children('.col-3').find('.new-tert-list').css('display') !== 'none'

  const handleInitialsDesktop = () => {
    $('#side-nav').css({ display: 'none' })  
    $('#top').find('.inner-grid').children('.col-2').find('.new-sub-list').css({ display: 'none' })
    $('#top').find('.inner-grid').children('.col-3').children('.new-tert-list').css({ display: 'none' })
  }

  const handleAnimatingPos = amt => {
    const transform = `translate3d(${amt}px, 0, 0)`

    const containerEl = $('#top').find('.inner-grid')
    if (initial) {
      initial = false
      containerEl.css({ transform: `translate3d(${VALS.margin1}px, 0, 0)`, willChange: 'transform' })
    } else {
      containerEl.css({ transform, transition: 'transform 500ms ease-in' })
    }
    return
  }

  const enableNewMenuClickFunctionality = () => {
    $('#side-nav li').each((i, li) => {
      const a = $(li).children('a')
      if ($(li).hasClass('has-children')) {
        $(li).children('a').first().append('<i class="fas fa-plus"></i>')
      }

      if ($(a).text() === 'Explore' || $(a).text() === 'Participate') {
        $(a).addClass('disable')
        $(li).click(e => {
          const thisIsOpen = $(li).hasClass('isOpen')
          const siblingIsOpen = $(li).siblings().hasClass('isOpen')
          const txt = $(li).text()
          const txt2 = txt === 'Explore' ? 'Participate' : 'Explore'

          e.preventDefault()
          $(li).siblings('.has-children').removeClass('isOpen')
            .find('i').removeClass('fa-minus').addClass('fa-plus')
          $('.inner-grid').children('.col-2').find(`.${txt2}`)
            .hide(0)
            .siblings(`.${txt}`)
              .slideToggle({
                duration: 200,
                complete: () => { setDynamicVal('col2w', getCol2Width()) }
              })
          $('.inner-grid').children('.col-3').children('ul')
            .hide(200)
          $('.inner-grid').children('.col-2').find('.has-children')
            .removeClass('isOpen')
            .find('i')
              .removeClass('fa-minus').addClass('fa-plus')
          $(li).toggleClass('isOpen')
          $(li).find('i')
            .toggleClass('fa-plus fa-minus')
          $(li).siblings().children('i').removeClass('fa-minus').addClass('fa-plus')
          const thisAmt = thisIsOpen ? VALS.margin1 : VALS.margin2          
          handleAnimatingPos(thisAmt)
        })
      }
      
    })
    $('.col-2').find('.submenu-item').each((i, subLi) => {
      if ($(subLi).hasClass('has-children')) {
        $(subLi).children('a').addClass('disable')
        $(subLi).click(e => {
          e.preventDefault()
          e.stopPropagation()
          const thisIsOpen = $(subLi).hasClass('isOpen')

          $(subLi).toggleClass('isOpen')
          $(subLi).find('i')
            .toggleClass('fa-plus fa-minus')
          const tertList = $('.inner-grid').children('.col-3').children('ul')
          tertList.slideToggle({
            duration: 200,
            complete: () => { setDynamicVal('col3w', getCol3Width()) }
          })
          const thisVal = thisIsOpen ? VALS.margin2 : VALS.margin3          
          handleAnimatingPos(thisVal)
        })
      }
    })
    $('.col-3').find('.tert-menu-item').click(e => {
      $('#side-nav').slideUp(200)
      $('#nav-btn').removeClass('open')
    })
  }

  

  const initAnimation = () => {
    $('#nav-btn').click(() => {
      if ($('#nav-btn').hasClass('open')) {
        handleAnimatingPos()
      }
    })
    // $('#')
  }

  const handleMobileMenu = (newIdx, oldIdx, txt) => {
    const cols = $('#top').find('.inner-grid').children('.col-2').find('.new-sub-list')
    const currentMarg = $()
    const w = window.innerWidth / 2
    const val = `${newIdx < oldIdx ? -w : w}px` 
    // const neg = newIdx < oldIdx ? -1 : 1
    // const val = newIdx === 0 ? VALS.margin1 : newIdx === 1 ? VALS.margin2 : VALS.margin3
    // const VAL = val * neg
    // console.log(w, newIdx, oldIdx, val);
    const views = [
      $('#top').find('.col-1'),
      $('#top').find('.col-2'),
      $('#top').find('.col-3')
    ]
    const thisView = views[newIdx]
    views.forEach(view => {
      if (view === thisView) {
        // console.log(view)
        view.show()
        if (txt) {
          if (txt === 'Explore') {
            console.log($(view).children())
            $($(view).find('ul')[0]).show()
            $($(view).find('ul')[1]).hide()
          } else {
            $($(view).find('ul')[0]).hide()
            $($(view).find('ul')[1]).show()
            
          }
        }
      }
      const fadeOut = () => {
        if (view !== thisView) {
          view.hide()
          console.log(view)      
        } 
      }
      // // view.css({
      // // view.animate({
      // $('#top').find('.inner-grid').css({
      //   transform: `translate3d(${val}, 0, 0)`,
      //   transition: 'transform .5s ease-in'
      //   // marginLeft: val
      // // }, {
      // //   duration: '500ms',
      // //   complete: fadeOut()
      // })
      // setTimeout(() => { fadeOut() },)
      fadeOut()
      if (newIdx > 0) {
        thisView.find('i.back').show()
      }
    })


  }

  const setMobileView = (idx, txt) => {
    let oldIdx = mobileMenuView
    mobileMenuView = idx
    handleMobileMenu(mobileMenuView, oldIdx, txt ? txt : null)
  }

  const initMobileMenu = () => {
    $('#top').find('.inner-grid').children('.col-2').css({ display: 'none' })
    $('#top').find('.inner-grid').children('.col-3').css({ display: 'none' })
    let LI
    // $('i.back').css({ cursor: 'pointer' }).one('click', e => {
      $('#top').find('.col-1, .col-2, .col-3').css({ textAlign: 'left!important' })
    
    $('#side-nav li').each((i, li) => {
      const a = $(li).children('a')
      if ($(li).siblings('i.back').length < 1) {
        $(li).parent().prepend('<i class="fas fa-chevron-left back"></i>')
      }
      
      if ($(li).hasClass('has-children')) {
        $(li).children('a').first().append('<i class="fas fa-chevron-right forward"></i>')
        // $(li).children('a').first().prepend('<i class="fas fa-chevron-left back"></i>')
        
        $('i.back').css({ display: 'none' })
      }

      if ($(a).text() === 'Explore' || $(a).text() === 'Participate') {
        $(a).addClass('disable')
        $(li).click(e => {
        // $(li).one('click', e => {
          e.preventDefault()          
          if ($(li).hasClass('has-children')) {
            (throttle(() => setMobileView(mobileMenuView + 1, $(li).text()), 200, { trailing: false, leading: true }))()
          }
        })
      }
    })

    $('.col-2').find('.submenu-item').each((i, subLi) => {
      if ($(subLi).hasClass('has-children')) {
        $(subLi).children('a').addClass('disable')
        // $(subLi).one('click', e => {
        $(subLi).click(e => {
          // e.preventDefault()
          (throttle(() => setMobileView(mobileMenuView + 1), 200, { trailing: false, leading: true}))()
        })
      }
    })
    $('i.back').css({ cursor: 'pointer' }).click(e => {
      e.preventDefault()
      setMobileView(mobileMenuView - 1)
    })
  }
  
  const initDoc = () => {
    let isLarge = window.innerWidth >= 1000
    window.addEventListener('resize', () =>  {
      isLarge = window.innerWidth >= 1000
      if (isLarge) {
        adjustDynamicMarginsOnResize()
      }
    })
    if (isLarge) {
      // handleInitialsDesktop()
      enableNewMenuClickFunctionality()
      initAnimation()
    } else {
      initMobileMenu()
    }
  }
  initDoc()
})
