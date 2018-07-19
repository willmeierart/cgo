import { isThin, isIE } from '../../utils'
import throttle from 'lodash.throttle'

jQuery(document).ready(function($) {
  let initial = true  
  const test = false
  let mobileMenuView = 0
  let mobileInitialized = false

  const hardCodedVals = { // this is brittle, yeah, but as long as menu text doesn't change, it works.
  // basically the deal is that we have to init menu at a certain location to center it,
  // and we need to have widths of hidden elements to animate them in
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
  const dynamicValsReady = () => { // in case hard-coded vals change, once menu has been inited, use real dynamic widths
    let retVal = true
    Object.keys(dynamicVals).forEach(key => {
      if (dynamicVals[key] === 0) {
        retVal = false
      }
    })
    return retVal
  }

  let VALS = !test && dynamicValsReady() ? dynamicVals : hardCodedVals

  const adjustDynamicMarginsOnResize = () => { // of course these margins will change on resize
    const { col1w, col2w, col3w } = VALS
    VALS.margin1 = col1w === 0 ? 0 : (window.innerWidth - col1w) / 2
    VALS.margin2 = col1w === 0 || col2w === 0 ? 0 : (window.innerWidth - (col1w + col2w)) / 2,
    VALS.margin3 = col1w === 0 || col2w === 0 || col3w === 0 ? 0 : (window.innerWidth - (col1w + col2w + col3w)) / 2
  }

  const setDynamicVal = (propName, val) => {
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
          dynamicVals.margin1 = (window.innerWidth - val) / 2
          break
      }
      VALS = !test && dynamicValsReady() ? dynamicVals : hardCodedVals
      return
    } else {
      return
    }
  }

  $('#nav-btn').click(() => { setDynamicVal('col1w', getCol1Width()) })

  const getCol1Width = () => $('#top').find('.inner-grid.desktop').children('.col-1').width()
  const getCol2Width = () => $('#top').find('.inner-grid.desktop').children('.col-2').width()
  const getCol3Width = () => $('#top').find('.inner-grid.desktop').children('.col-3').width()

  const handleInitialsDesktop = () => {
    $('#side-nav').css({ display: 'none', visibility: isIE ? 'hidden' : 'visible' })
    $('#top').find('.inner-grid.desktop').children('.col-2').find('.new-sub-list').css({ display: 'none' })
    $('#top').find('.inner-grid.desktop').children('.col-3').children('.new-tert-list').css({ display: 'none' })
  }

  const handleAnimatingPos = amt => {
    const transform = `translate3d(${amt}px, 0, 0)`

    const containerEl = $('#top').find('.inner-grid.desktop')
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
      if ($(a).text() === 'Explore' || $(a).text() === 'Participate') {
        $(a).addClass('disable')
        $(li).click(e => {
          const thisIsOpen = $(li).hasClass('isOpen')
          const siblingIsOpen = $(li).siblings().hasClass('isOpen')
          const txt = $(li).text()
          const txt2 = txt === 'Explore' ? 'Participate' : 'Explore'

          e.preventDefault()
          if ($(li).closest('.desktop').length > 0) {
            $(li).siblings('.has-children').removeClass('isOpen')
              .find('i').removeClass('fa-minus').addClass('fa-plus')

            $('.inner-grid.desktop').children('.col-2').find(`.${txt2}`)
              .hide(0)
              .siblings(`.${txt}`)
                .slideToggle({
                  duration: 200,
                  complete: () => { setDynamicVal('col2w', getCol2Width()) }
                })
            $('.inner-grid.desktop').children('.col-3').children('ul')
              .hide(200)
            $('.inner-grid.desktop').children('.col-2').find('.has-children')
              .removeClass('isOpen')
              .find('i')
                .removeClass('fa-minus').addClass('fa-plus')
            $(li).toggleClass('isOpen')
            $(li).find('i')
              .toggleClass('fa-plus fa-minus')
          }
          
          const thisAmt = thisIsOpen ? VALS.margin1 : VALS.margin2          
          handleAnimatingPos(thisAmt)
        })
      }
      if ($(li).closest('.desktop').length > 0) {
        if ($(li).hasClass('has-children')) {
          if ($(li).children('a').first().children('i').length < 1) {
            $(li).children('a').first().append('<i class="fas fa-plus"></i>')
          }
          $(li).siblings().children('i').removeClass('fa-minus').addClass('fa-plus')
        }
      } else if ($(li).closest('.mobile').length > 0) {
        if ($(li).siblings('i.back').length < 1) {
          $(li).parent().prepend('<i class="fas fa-chevron-left back"></i>')
        }
        if ($(li).hasClass('has-children')) {
          $(li).children('a').first().each((i, fA) => {
            if ($(fA).children('i.forward').length < 1) {
              $(fA).append('<i class="fas fa-chevron-right forward"></i>')
            }
          })
          $('i.back').css({ display: 'none' })
        }
      }
    })
    $('.desktop .col-2').find('.submenu-item').each((i, subLi) => {
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
    $('.desktop .col-3').find('.tert-menu-item').click(e => {
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
  }

  const handleMobileMenu = (newIdx, oldIdx, txt) => {
    const cols = $('#top').find('.inner-grid.mobile').children('.col-2').find('.new-sub-list')
    const views = [
      $('#top').find('.mobile .col-1'),
      $('#top').find('.mobile .col-2'),
      $('#top').find('.mobile .col-3')
    ]

    const neg = newIdx < oldIdx
    const w = window.innerWidth
    const val = `${neg ? -w : w}px` 

    const b1 = $('.border-line.b1')
    const b2 = $('.border-line.b2')

    const thisView = views[newIdx]
    views.forEach(async (view, i) => {
      const isPrevView = neg ? views.indexOf(view) > newIdx : views.indexOf(view) < newIdx
      const isNextView = neg ? views.indexOf(view) < newIdx : views.indexOf(view) > newIdx
      const isToTheRight = isPrevView && neg || isNextView && !neg
      const isToTheLeft = isNextView && neg || isPrevView && !neg


      if (!mobileInitialized && i === 1) {
        view.css({
          transform: `translate3d(${window.innerWidth}px, 0, 0)`,
          opacity: 0,
          transition: 'transform .5s, opacity .5s'
        })
      }
      
      if (view === thisView) {
        view.show()           
        view.css({
          transform: `translate3d(0, 0, 0)`,
          opacity: 1,
          transition: 'transform .5s, opacity .5s'
        })
        
        if (txt) {
          if (txt === 'Explore') {
            $($(view).find('ul')[0]).show()
            $($(view).find('ul')[1]).hide()
          } else {
            $($(view).find('ul')[0]).hide()
            $($(view).find('ul')[1]).show()
            
          }
        }
      } else if (isToTheRight) {
        view.css({
          transform: `translate3d(${window.innerWidth}px, 0, 0)`,
          opacity: 0,
          transition: 'transform .5s, opacity .5s'
        })
          setTimeout(() => { view.hide() })
      } else {
        view.css({
          transform: `translate3d(-${window.innerWidth}px, 0, 0)`,
          opacity: 0,
          transition: 'transform .5s, opacity .5s'
        })
        setTimeout(() => { view.hide() })
      }

      if (neg) {
        if (oldIdx === 2) {
          b1.css({
            transform: `translate3d(0, 0, 0)`,
            transition: 'transform .5s'
          })
        } else {
          b2.css({
            transform: `translate3d(0, 0, 0)`,
            transition: 'transform .5s'
          })
        }
      } else {
        if (oldIdx === 0) {
          b2.css({
            transform: `translate3d(-${window.innerWidth + 3}px, 0, 0)`,
            transition: 'transform .5s'
          })
        } else {
          b1.css({
            transform: `translate3d(-${window.innerWidth + 3}px, 0, 0)`,
            transition: 'transform .5s'
          })
        }
      }

      if (newIdx > 0) {
        thisView.find('i.back').show()
      }
    })
    mobileInitialized = true
  }

  const setMobileView = (idx, txt) => {
    let oldIdx = mobileMenuView
    mobileMenuView = idx
    handleMobileMenu(mobileMenuView, oldIdx, txt ? txt : null)
  }

  const initMobileMenu = () => {
    $('#top').find('.inner-grid.mobile').children('.col-2').css({ display: 'none' })
    $('#top').find('.inner-grid.mobile').children('.col-3').css({ display: 'none' })
    
    if ($('#top').find('.side-nav-inner.mobile').children('.border-line').length === 0) {
      $('#top').find('.side-nav-inner.mobile').append('<div class="border-line b1"></div><div class="border-line b2"></div>')
    }

    let LI
      $('#top').find('.mobile .col-2, .col-3').css({ textAlign: 'left!important' })
      $('#top').find('.mobile .col-1').css({ textAlign: 'right!important' })
          .children('ul').css({ alignItems: 'flex-end' })
    
    $('#side-nav .mobile li').each((i, li) => {
      const a = $(li).children('a')
      if ($(a).text() === 'Explore' || $(a).text() === 'Participate') {
        $(a).addClass('disable')
        $(li).click(e => {
          e.preventDefault()
          if ($(li).hasClass('has-children')) {
            (throttle(() => setMobileView(mobileMenuView + 1, $(li).text()), 200, { trailing: false, leading: true }))()
          }
        })
      }
    })

    $('.mobile .col-2').find('.submenu-item').each((i, subLi) => {
      if ($(subLi).hasClass('has-children')) {
        $(subLi).children('a').addClass('disable')
        $(subLi).click(e => {
          (throttle(() => setMobileView(mobileMenuView + 1), 200, { trailing: false, leading: true}))()
        })
      }
    })
    $('.mobile i.back').css({ cursor: 'pointer', fontSize: '2em' }).click(e => {
      e.preventDefault()
      setMobileView(mobileMenuView - 1)
    })
  }
  
  const initDoc = () => {
    let isLarge = window.innerWidth >= 1000
    window.addEventListener('resize', () =>  { // so basically, both menus exist, and we toggle each set of structure/behavior depending on screen size
      isLarge = window.innerWidth >= 1000
      if (isLarge) {
        adjustDynamicMarginsOnResize()
        $('#top .side-nav-inner.mobile').css({ display: 'none' })
        $('#top .side-nav-inner.desktop').css({ display: 'flex' })
      } else {
        $('#top .side-nav-inner.desktop').css({ display: 'none' })
        $('#top .side-nav-inner.mobile').css({ display: 'flex' })
      }
    })
    if (isLarge) {
      $('#top .side-nav-inner.mobile').css({ display: 'none' })
      $('#top .side-nav-inner.desktop').css({ display: 'flex' })
    } else {
      $('#top .side-nav-inner.desktop').css({ display: 'none' })
      $('#top .side-nav-inner.mobile').css({ display: 'flex' })
    }
    handleInitialsDesktop()
    enableNewMenuClickFunctionality()
    initAnimation()
    initMobileMenu()
  }
  initDoc()
})
