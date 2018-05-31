import moment from 'moment'
import flatten from 'lodash.flatten'
import '../../../../scss/pages/participate.scss'
import dynamicLayout from './dynamicLayout'
import { detailInner, descriptionTxtBlock, mobileFilterModule } from './templateElements'
import { setActiveItemFilter, textMatcher, textMatches } from './utils'
import { url } from '../../../utils'
import queries from '../../../queries'

jQuery(document).ready(function($) {
  const { pathname, hash } = window.location
  const splitPath = pathname.split('/')
  const path = splitPath[splitPath.length - 2]

  const IS_SEMINARS_PAGE = path === 'seminars'
  const IS_MEDITATIONS_PAGE = path === 'meditations'
  const IS_INTRODUCTIONS_PAGE = path === 'introductions'
  const IS_OTHER_PAGE = path === 'other-opportunities'
  const IS_CALENDAR_PAGE = path === 'calendar'

  let LOCAL_EVENTS
  let RECURRING_EVENTS
  let ALL_EVENTS

  let hashFilter = hash.replace('#', '').replace('-', '_')
  let activeLocation = 'Denver'
  let activeTypeFilter = 'All'
  const dateFilters = []
  let activeMobileDateFilter = 'recurring'
  let openCards = []
  const hasBeenActivated = {
    location: false,
    type: false,
    date: false
  }
  let allEventEls

  const mobileCards = ['location', 'type', 'date']
  let mobileCardStateIdx = 0
  let mobileCardState = mobileCards[mobileCardStateIdx]
  let shouldShowEvents = false
  let mobileHasBeenTransformed = false
  

  const months = ['recurring', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const getFirstMonth = (currentLow, month) => Math.min(currentLow, months.indexOf(month))
  const monthsExpanded = {}

  const handleExpandingMonths = () => {
    $('.month-name').off('click')
    const monthKeys = Object.keys(monthsExpanded)
    monthKeys.forEach(month => {
      $(`.${month}`).children('.month-name').css({ display: 'inline-block' }).click(e => {
        e.stopPropagation()
        monthsExpanded[month] = !monthsExpanded[month]
        $(`.${month}`).children('*:not(i, svg, .month-name)').toggle(300)
        $(`.${month}`).children('.month-name').toggleClass('active')
        $(`.${month}`).children('i').toggleClass('fa-angle-down fa-angle-up')
      })
      if (window.innerWidth < 1000) {
        if (dateFilters.indexOf(month) === -1) {
          dateFilters.push(month)
        }
      }
      // $(`.${month}`).children().click(e => { e.preventDefault() })
    })
  }

  $('.sort-by').text('Sort by:')

  const topLvlEls = $('.az-upcoming-category').closest('.col.span_12').closest('.wpb_wrapper')
  const typeFilter = $(topLvlEls.children()[0])
  const locFilter = $(topLvlEls.children()[1]).find('.vc_col-sm-3')
  const dataBody = $('.az-offerings-location-detail-wrapper').closest('.vc_col-sm-9')

  typeFilter.addClass('sticky-el-1')
  locFilter.addClass('sticky-el-2')
  dataBody.addClass('sticky-el-3')

  // const filterByLocation = eventList =>
  //   eventList.filter(event => event.slug === activeLocation)

  // const filterByType = eventList => {
  //   const filteredList = activeTypeFilter === 'all'
  //     ? eventList : eventList.filter(event => event.type === activeTypeFilter.replace(' ', '-').toLowerCase())
  //   return filteredList
  // }

  const refreshEventList = () => { // updates state of page on click
    filterEventsData()
  }

  // this function will do more, deal with splitting and truncation of top description text
  const formatHeaderTypeDescription = () => {
    $('.az-offerings-header-description-text')
      .append(`<div class='read-more'>Read More...</div>`) // this will need to do more also
  }

  const renderTypesFilter = async courseList => {
    courseList.forEach(item => {
      if ($('#az-offerings-filter-focus').children(`#${item.id}`).length < 1) {
        $('#az-offerings-filter-focus').append($(`
          <li id='${item.id}' class='az-offerings-filter-item'>
            <a>${item.title}</a>
          </li>
        `)
        )
      }
    })
    const thisChild = $('.az-offerings-filter-item').children('a')
    setActiveItemFilter(thisChild, activeTypeFilter)
    thisChild.click(e => {
      activeTypeFilter = $(e.target).text()
      setActiveItemFilter(thisChild, activeTypeFilter)
      $('.az-offerings-location-detail-wrapper').empty()
      refreshEventList()
    })
  }

  const renderLocationsMenu = locations => {
    const menuWrapper = $('.az-offerings-locations-menu-wrapper ul')
    locations.forEach(location => {
      if (menuWrapper.children(`#${location.id}`).length < 1) {
        menuWrapper.append(`
          <li id='${location.id}' class='az-offerings-locations-menu-item'>
            <a>${location.title}</a>
          </li>
        `)
      }
    })
    if (menuWrapper.children(`#streaming`).length < 1) {
      menuWrapper.append(`
        <li id='streaming-menu-item' class='az-offerings-locations-menu-item'>
          <a>STREAMING</a>
        </li>
      `)
    }

    const menuItems = $('.az-offerings-locations-menu-item a')
    setActiveItemFilter(menuItems, activeLocation)

    menuItems.each((i, item) => {
      $(item).append($(`<div class='active-line'></div>`))
      if (!$(item).hasClass('active')) {
        $(item).children('.active-line').hide()
      }
    })

    menuItems.click(e => {
      activeLocation = $(e.target).text().toUpperCase().replace(' ', '-')
      setActiveItemFilter(menuItems, activeLocation)
      $('.az-offerings-location-detail-wrapper').empty()
      refreshEventList()
      menuItems.children('.active-line').hide()
      $(e.target).children('.active-line').show(250)
    })
  }

  const renderEventData = (events, recurringEvents) => {
    const formatTime = D => {
      const dateParts = D.split('-')
      const dateTimeSplit = dateParts[dateParts.length - 1].split('T')
      const timeParts = dateTimeSplit[1].split(':')
      const isPM = timeParts[0] > 12
      const formatDate = `${dateParts[1]}/${dateTimeSplit[0]}/${dateParts[0]}`
      const formatTime = isPM ? `${timeParts[0] % 12}:${timeParts[1]} PM` : `${timeParts[0]}:${timeParts[1]} AM`
      return { date: formatDate, time: formatTime }
    }
    const PMsplitter = course => course.StartTime.split('T')[0].split('-')
    const preMonth = course => `${PMsplitter(course)[1]}-${PMsplitter(course)[2]}-${PMsplitter(course)[0]}`

    // if ($('body').find('.az-offerings-location-detail-wrapper').length === 0) {
    //   console.log('offerings wrapper doesnt exist')
    //   $('body').append($('<div class="az-offerings-location-detail-wrapper"></div>').css({ display: 'none' }))
    // }

    const detailsWrapper = $('.az-offerings-location-detail-wrapper')
    if (detailsWrapper.children('.recurring').length < 1) {
      detailsWrapper.append(`<div class='date-category recurring'><div class='month-name'>Recurring</div></div>`)
    }
    detailsWrapper.children('.recurring-section').remove()

    const recurAngle = IS_SEMINARS_PAGE ? 'up' : 'down'

    const recurringWrapper = $(`.recurring`)
    if (recurringWrapper.children().length < 2) {
      // recurringWrapper.append(`<i class='fas fa-angle-${recurAngle}'></i>`)
      recurringEvents.forEach((event, i) => {
        const { id } = event
        $(recurringWrapper.append(detailInner(event)))
      })
      if (IS_SEMINARS_PAGE) {
        monthsExpanded.recurring = true
        recurringWrapper.children('*:not(i, svg)').show()
        $('.recurring').children('.month-name').addClass('active')
      } else {
        monthsExpanded.recurring = false
        recurringWrapper.children('*:not(i, svg)').hide()
      }
    }
    if (recurringEvents.length < 1) {
      recurringWrapper.hide()
    } else {
      recurringWrapper.show()
    }
    
    
    
    events.forEach((event, i) => {
      const { id, month } = event
      if (detailsWrapper.find(`#${id}`).length < 1) {
        if (detailsWrapper.children(`.${month}`).length < 1) {
          detailsWrapper.append(`<div class='date-category ${month}'><div class='month-name'>${month}</div></div>`)
          // $(`.${month}`).append(`<i class='fas fa-angle-down'></i>`)
        }
        if ($(`.${month}`).children(`#${id}`).length < 1) {
          $(`.${month}`).append(detailInner(event))
        }
        if (IS_SEMINARS_PAGE) {
          monthsExpanded[month] = true
          $(`.${month}`).children('.month-name').addClass('active')
          $(`.${month}`).children('*:not(i, svg)').show()
        } else {
          monthsExpanded[month] = false
          $(`.${month}`).children('*:not(i, svg)').hide()
        }
      }
      
    })

    // console.log('eventEls 1', allEventEls)
    allEventEls = detailsWrapper.clone()
    // console.log('eventEls 2', allEventEls)
  }

  
  const transformEvents = (events, centers, transformAll) => {
    const formatTime = D => {
      const dateParts = D.split('-')
      const dateTimeSplit = dateParts[dateParts.length - 1].split('T')
      const timeParts = dateTimeSplit[1].split(':')
      const isPM = timeParts[0] > 12
      const formatDate = `${dateParts[1]}/${dateTimeSplit[0]}/${dateParts[0]}`
      const formatTime = isPM ? `${timeParts[0] % 12}:${timeParts[1]} PM` : `${timeParts[0]}:${timeParts[1]} AM`
      return { date: formatDate, time: formatTime }
    }
    const PMsplitter = event => event.start_time.split('T')[0].split('-')
    const preMonth = event => `${PMsplitter(event)[1]}-${PMsplitter(event)[2]}-${PMsplitter(event)[0]}`

    // console.log(events)
    

    const transformer = CENTER => events.map(event => {
      const { id, title, course_id, center_id, location_id, description, end_time, is_streaming, price, price_notes, registration_link, start_time, day, time, time_notes } = event 

      const month = start_time ? moment(preMonth(event)).format('MMMM') : null
      const start =  start_time ? formatTime(event.start_time) : null
      const end = end_time ? formatTime(event.end_time) : null
      const center = CENTER ? CENTER : centers.filter(center => center.id === center_id || center.id === location_id)[0]
      const endsSameDay = start_time && end_time
        ? formatTime(start_time).date === formatTime(end_time).date : false
      if (endsSameDay) {
        start.time = `${start.time} - ${end.time}`
        end.time = null
        end.date = null
      }
      const isStreaming = activeLocation.toUpperCase() === 'STREAMING'
      // console.log(center, isStreaming, event)
      const locTitle = center ? center.title : isStreaming ? 'Streaming' : ''
      const address = center ? center.address : ''
      const phone = center ? center.phone : ''

      // console.log('month: ', month, 'start_time: ', start_time, 'start: ', start, 'end_time: ', end_time, 'end: ', end, 'center: ', center, 'event: ', event)
      
      const retObj = {
        id,
        title,
        description,
        day,
        month,
        start: start || time,
        end,
        time_notes,
        price,
        price_notes,
        streaming: is_streaming,
        link: registration_link,
        location: { title: locTitle, address, phone }
      }
      return retObj
    })

    const sendAll = centers.map(center => {
      return transformer(center)
    })

    return !transformAll ? transformer() : sendAll
  }

  function filterEventsData () {
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditations, seminars, introductions, other_opportunities }, locations: { cities, centers } } = cachedData
    const matcherObj = {
      seminars,
      meditation: meditations,
      introductions,
      other_opportunities: other_opportunities
    }

    // console.log(hashFilter, matcherObj, matcherObj[hashFilter])

    const allTheseCourses = (() => {
      switch (true) {
        case IS_SEMINARS_PAGE:
          return seminars
        case IS_MEDITATIONS_PAGE:
          return meditations
        case IS_INTRODUCTIONS_PAGE: {
          const publicMeditations = meditations.events.filter(event => event.title.includes('Public Meditation'))
          const syntheticCourseType = {
            id: publicMeditations[0].course_id,
            title: 'Evenings of Meditation'
          }
          const INTROS = { ...introductions }
          INTROS.events = [...INTROS.events, ...publicMeditations]
          INTROS.courses.push(syntheticCourseType)
          return INTROS
        }
        case IS_OTHER_PAGE:
          return other_opportunities
        case IS_CALENDAR_PAGE:
          return matcherObj[hashFilter]
        default:
          return meditations
      }
    })()

    const { events, courses } = allTheseCourses
    const ACTIVE_LOCATION = activeLocation.toUpperCase()
    const streamingActive = ACTIVE_LOCATION === 'STREAMING'


    const thisCity = cities.filter(city =>
      textMatches(city.title, activeLocation)
    )[0]
    const thisCourseType = courses.filter(course =>
      textMatches(course.title, activeTypeFilter)
    )[0]



    const thisLocationCenters = streamingActive ? centers : centers.filter(center => center.city_id === thisCity.id)

    // console.log('these things', thisCity, thisCourseType, activeTypeFilter, thisLocationCenters)
    

    const recurringEvents = thisLocationCenters.reduce(
      (list, center) => {
        list = list.concat(center.recurring_events)
        return list
      },
      []
    ).filter(event => {
      const courseMatches = thisCourseType ? event.course_id === thisCourseType.id : false
      let ret1 = false
      let ret2 = false
      thisLocationCenters.forEach(center => {
        if (center.id === event.center_id || center.id === event.location_id) {
          ret1 = true
        }
      })
      if (activeTypeFilter.toLowerCase() === 'all' || courseMatches) {
        ret2 = true
      }
      if (ret1 && ret2) return event
    })

    // console.log(recurringEvents)

    const localEvents = events.filter(event => {
      // console.log(event)
      const { is_streaming } = event
      const retStream = is_streaming === 'both' || is_streaming === 'not'
      const courseMatches = thisCourseType ? event.course_id === thisCourseType.id : false
      let ret1 = false
      let ret2 = false
      if (!streamingActive) {
        thisLocationCenters.forEach(center => {
          if ((center.id === event.center_id || center.id === event.location_id) && retStream) {
            ret1 = true
          }
        })
      } else {
        if (is_streaming === 'both' || 'only') {
          ret1 = true
        }
      }
      if (activeTypeFilter.toLowerCase() === 'all' || courseMatches) {
        ret2 = true
      }
      if (ret1 && ret2) return event
    })

    LOCAL_EVENTS = transformEvents(localEvents, thisLocationCenters)
    RECURRING_EVENTS = transformEvents(recurringEvents, thisLocationCenters)
    ALL_EVENTS = transformEvents(events, centers)
    

    renderEventData(LOCAL_EVENTS, RECURRING_EVENTS)
    handleExpandingMonths()
  }

  const handleCalendarTypeFilter = () => {
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditations, seminars, introductions, other_opportunities }, locations: { cities, centers } } = cachedData
    const matcherObj = {
      seminars,
      meditation: meditations,
      introductions,
      other_opportunities: other_opportunities
    }
    const a = $('.az-offerings-submenu-wrapper.calendar').find('a')
    a.click(e => {
      hashFilter = $(e.target).text().toLowerCase().replace(/[^a-z]/g, '_')
      const allTheseCourses = (() => {
        switch (true) {
          case IS_SEMINARS_PAGE:
            return seminars
          case IS_MEDITATIONS_PAGE:
            return meditations
          case IS_INTRODUCTIONS_PAGE: {
            const publicMeditations = meditations.events.filter(event => event.title.includes('Public Meditation'))
            const syntheticCourseType = {
              id: publicMeditations[0].course_id,
              title: 'Evenings of Meditation'
            }
            const INTROS = { ...introductions }
            INTROS.courses.push(syntheticCourseType)
            INTROS.events = [...INTROS.events, ...publicMeditations]
            return INTROS
          }
          case IS_OTHER_PAGE:
            return other_opportunities
          case IS_CALENDAR_PAGE:
            return matcherObj[hashFilter]
          default:
            return meditations
        }
      })()
      const { courses } = allTheseCourses
      $('#az-offerings-filter-focus').empty()
      renderTypesFilter(courses)
      filterEventsData()
    })
  }

  const handleStickyNav = () => {
    let scrollTop = 0

    $('body').scroll(() => {
      const { top } = typeFilter.offset()
      if (top <= 98 && scrollTop === 0) {
        if (scrollTop === 0) {
          scrollTop = $('body').scrollTop()
        }
        const locHeight = `${typeFilter.height() + 98}px`
        typeFilter.addClass('sticky-nav-1')
        locFilter.addClass('sticky-nav-2')
        if (locFilter.siblings('.vc_col-sm-3').length < 1) {
          locFilter.parent().prepend('<div class="vc_col-sm-3"></div>').css({ marginRight: '2.1%' })
        }
        dataBody.addClass('sticky-nav-3')
      } else if ($('body').scrollTop() <= scrollTop) {
        typeFilter.removeClass('sticky-nav-1')
        locFilter.removeClass('sticky-nav-2')
        locFilter.siblings('.vc_col-sm-3').remove()
        dataBody.removeClass('sticky-nav-3')
        scrollTop = 0
      }
    })
  }

  const advanceMobileCardState = cmd => {
    if (mobileCardStateIdx < 3 && cmd !== 'no-advance') {
      mobileCardStateIdx += 1
      if (mobileCardStateIdx !== 3) {
        mobileCardState = mobileCards[mobileCardStateIdx]
      }
    }
  }

  const filterLocationsOnMobile = locations => {

    // const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    // const { course_types: { meditations, seminars, introductions, other_opportunities }, locations: { cities, centers } } = cachedData
    const returnedEvents = []
    $(locations[0]).children().each((a, locChild) => {
      const locTxt = $(locChild).find('a').text().toLowerCase()
      ALL_EVENTS.forEach(event => {
        const txt = event.location.address.toLowerCase()
        if (txt.indexOf(locTxt) !== -1 && returnedEvents.indexOf(locTxt) === -1) returnedEvents.push(locTxt)
      })
      // $(events[0]).children().each((i, child) => {
      //   console.log(child);
      //   $(child).children().each((j, grandChild) => {
      //     const txt = $(grandChild).find('.address').text().toLowerCase()
      //     // if (txt.toLowerCase() === )
      //     console.log(txt)
      //     if (txt.indexOf(locTxt) !== -1) {
      //       returnedEvents.push(locTxt)
      //     }
      //   })
      // })
    })
    // console.log(returnedEvents);
    return returnedEvents
  }

  const createMobileFilters = () => {
    const allFiltersCompleted = mobileCardStateIdx === 3
    const reload = allEventEls !== undefined

    const locationList = $('.az-offerings-locations-menu-wrapper').children('ul')
    const locationListClone = mobileHasBeenTransformed
      ? $('.mobile-locations-list')
      : locationList.clone().addClass('mobile-locations-list mobile-list')
    const typeList = $('.az-offerings-type-filter-wrapper').children('ul')
    const typeListClone = mobileHasBeenTransformed
      ? $('.mobile-type-list')
      : typeList.clone().addClass('mobile-list mobile-type-list')


    // console.log('reload?: ', reload);

    const allEventsClone = !reload ? $('.az-offerings-location-detail-wrapper').clone() : allEventEls.clone()

    const locationsWithEvents = filterLocationsOnMobile(locationListClone)

    $(locationListClone[0]).children().each((i, li) => {
      const txt = $(li).children().text().toLowerCase()
      if (locationsWithEvents.indexOf(txt) === -1) {
        $(li).css({ display: 'none' })
      }
      // console.log(locationsWithEvents, txt)
    })

    
    

    // console.log('eventEls inside createMobileFilters:', allEventEls)

    const dateFilterList = $('<ul class="date-filter-list mobile-list"></ul>').append(dateFilters.map((date, i) => `<li class='date-filter'><a>${date}</a></li>`))
    const cardTitles = {
      location: 'Choose a location',
      type: 'Event Type',
      date: 'Event Date'
    }
    const lists = [locationListClone, typeListClone, dateFilterList]
    const activeMobileFilterProps = [activeLocation, activeTypeFilter, activeMobileDateFilter]

    

    const slicedCards = mobileCards.slice(0, mobileCardStateIdx + 1)
    const cards = mobileCards.map((cardType, i) => {
      const title = cardTitles[cardType]
      const list = lists[i][0].outerHTML
      const filterObj = {
        isOpen: (i === slicedCards.length - 1 && !allFiltersCompleted) || openCards.indexOf(cardType.toLowerCase()) !== -1,
        title,
        list,
        activeProp: activeMobileFilterProps[i] || '',
        class: cardType,
        isVisible: i < slicedCards.length
      }
      return mobileFilterModule(filterObj)
    })
    const returnElsObj =  {
      events: allEventsClone,
      filters: cards
    }

    // $('')
    
    return returnElsObj
  }

  const handleMobileStyling = () => {
    const { filters, events } = createMobileFilters()
    if (!mobileHasBeenTransformed) {
      const wholeBottomSec = $('.az-offerings-types-description-container').siblings().last()
      wholeBottomSec.replaceWith('<div class="mobile-dynamic-section"></div>')
    }
    const allFiltersCompleted = mobileCardStateIdx === 3

    if ($('.mobile-dynamic-section').children().length === 0) {
      $('.mobile-dynamic-section').append(`
        <div class="mobile-filters-section"></div>
        <div class="mobile-events-section"></div>
      `)
    }

    $('.mobile-filters-section').empty().append(filters)

    $('.mobile-events-section').css({
      display: allFiltersCompleted ? 'flex' : 'none'
    }).empty()


    mobileHasBeenTransformed = true
  }

  const renderMobileEvents = events => {
    const formatTime = D => {
      const dateParts = D.split('-')
      const dateTimeSplit = dateParts[dateParts.length - 1].split('T')
      const timeParts = dateTimeSplit[1].split(':')
      const isPM = timeParts[0] > 12
      const formatDate = `${dateParts[1]}/${dateTimeSplit[0]}/${dateParts[0]}`
      const formatTime = isPM ? `${timeParts[0] % 12}:${timeParts[1]} PM` : `${timeParts[0]}:${timeParts[1]} AM`
      return { date: formatDate, time: formatTime }
    }
    const PMsplitter = course => course.StartTime.split('T')[0].split('-')
    const preMonth = course => `${PMsplitter(course)[1]}-${PMsplitter(course)[2]}-${PMsplitter(course)[0]}`
    const detailsWrapper = $('.mobile-events-section')

    Object.keys(monthsExpanded).forEach(month => monthsExpanded[month] = true)
    $('.date-category').children('*:not(i, svg)').show()

    const dateFilter = activeMobileDateFilter ? activeMobileDateFilter.toLowerCase() : ''


    events.forEach((event, i) => {
      const { id, month } = event
      const MONTH = month ? month.toLowerCase() : ''
      if (MONTH === dateFilter || (!month && dateFilter === 'recurring')) {
        if (detailsWrapper.find(`#${id}`).length < 1) {
          if (detailsWrapper.children(`.${month}`).length < 1) {
            detailsWrapper.append(`<div class='date-category ${month}'></div>`)
            // $(`.${month}`).append(`<i class='fas fa-angle-down'></i>`)
          }
          if ($(`.${month}`).children(`#${id}`).length < 1) {
            $(`.${month}`).append(detailInner(event))
          }
        }
      }

    })

  }

  const reloadErthang = cmd => {
    const isRecurring = activeMobileDateFilter.toLowerCase() === 'recurring'
    if (mobileCardStateIdx === 3) {
      refreshEventList()
    }
    advanceMobileCardState(cmd)
    handleMobileStyling()
    handleMobileFiltering()
    // console.log(RECURRING_EVENTS, LOCAL_EVENTS)
    renderMobileEvents(isRecurring ? RECURRING_EVENTS : LOCAL_EVENTS)
    // $('.date-category').children('.month-name').css({ visibility: 'hidden' })
  }

  var handleMobileFiltering = () => {
    const locLIs = $('.mobile-filter-module.location').find('li')
    const typeLIs = $('.mobile-filter-module.type').find('li')
    const dateLIs = $('.mobile-filter-module.date').find('li')

    locLIs.off('click')
    typeLIs.off('click')
    dateLIs.off('click')

    locLIs.click(e => {
      let trigger = ''
      const txt = $(e.target).children('a').length !== 0
        ? $(e.target).children('a').text().toLowerCase()
        : $(e.target).text().toLowerCase()
      activeLocation = txt
      openCards = openCards.filter(card => card !== 'location')
      if (hasBeenActivated.location) {
        trigger = 'no-advance'
      }
      reloadErthang(trigger)
      hasBeenActivated.location = true
    })
    typeLIs.click(e => {
      let trigger = ''
      const txt = $(e.target).children('a').length !== 0
        ? $(e.target).children('a').text().toLowerCase()
        : $(e.target).text().toLowerCase()
      activeTypeFilter = txt
      openCards = openCards.filter(card => card !== 'type')
      if (hasBeenActivated.type) {
        trigger = 'no-advance'
      }
      reloadErthang(trigger)
      hasBeenActivated.type = true
    })
    dateLIs.click(e => {
      let trigger = ''
      const txt = $(e.target).children('a').length !== 0
        ? $(e.target).children('a').text().toLowerCase()
        : $(e.target).text().toLowerCase()
      activeMobileDateFilter = txt
      openCards = openCards.filter(card => card !== 'date')
      if (hasBeenActivated.date) {
        trigger = 'no-advance'
      }
      reloadErthang(trigger)
      hasBeenActivated.date = true
    })

    $('.mobile-filter-module.closed').children('.title-block').click(e => {
      const txt = $(e.target).attr('data-title').toLowerCase()
      if (openCards.indexOf(txt) === -1) {
        openCards.push(txt)
      } 
      reloadErthang('no-advance')
    })
  }

  async function renderDoc () {
    activeTypeFilter = 'all'
    const forceRefresh = false
    const { localStorage } = window
    const data = await queries.events()
    const shouldRefresh = localStorage.lastUpdated + 60000000 <= Date.now()
    const conds = !localStorage.data || !localStorage.lastUpdated || shouldRefresh || forceRefresh
    if (conds) {
      localStorage.setItem('CGOdata', JSON.stringify(data))
      localStorage.setItem('lastUpdated', Date.now())
    }
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditations, seminars, introductions, other_opportunities }, locations: { cities, centers } } = cachedData

    console.log('cached refreshed:', conds)
    // console.log('cachedData: ', cachedData)

    const allTheseCourses = (() => {
      switch (true) {
        case IS_SEMINARS_PAGE:
          return seminars
        case IS_MEDITATIONS_PAGE:
          return meditations
        case IS_INTRODUCTIONS_PAGE: {
          const publicMeditations = meditations.events.filter(event => event.title.includes('Public Meditation'))
          const syntheticCourseType = {
            id: publicMeditations[0].course_id,
            title: 'Evenings of Meditation'
          }
          const INTROS = { ...introductions }
          INTROS.courses.push(syntheticCourseType)
          INTROS.events = [...INTROS.events, ...publicMeditations]
          return INTROS
        }
        case IS_OTHER_PAGE:
          return other_opportunities
        case IS_CALENDAR_PAGE:
          return seminars
        default:
          return meditations
      }
    })()

    const { courses } = allTheseCourses

    filterEventsData()
    renderTypesFilter(courses)    
    renderLocationsMenu(cities)
    if (IS_CALENDAR_PAGE) {
      handleCalendarTypeFilter()
    }

    allEventEls = $('.az-offerings-location-detail-wrapper').clone()

    if (window.innerWidth > 1000) {
      handleStickyNav()
    } else {
      handleMobileStyling()
      handleMobileFiltering()
      $('.date-category').children('.month-name').css({ visibility: 'hidden' })
    }
  }
  renderDoc()
})
