import '../../../../scss/pages/participate.scss'
import { detailInner, descriptionTxtBlock, mobileFilterModule } from './templateElements'
import { setActiveItemFilter, textMatcher, textMatches } from './utils'
import { url, isIE } from '../../../utils'
import queries from '../../../queries'

jQuery(document).ready(function($) {
  const { pathname, hash } = window.location
  const splitPath = pathname.split('/')
  let hashFilter = hash.replace('#', '').replace('-', '_')
  const path = splitPath[splitPath.length - 2]
  const IS_SEMINARS_PAGE = path === 'seminars'
  const IS_MEDITATIONS_PAGE = path === 'meditation'
  const IS_INTRODUCTIONS_PAGE = path === 'introductions'
  const IS_OTHER_PAGE = path === 'other-opportunities' || path === 'other%20opportunities'
  const IS_CALENDAR_PAGE = path.indexOf('calendar') !== -1

  let LOCAL_EVENTS
  let RECURRING_EVENTS
  let ALL_EVENTS
  let LOCATION_IDS_WITH_EVENTS = []
  let COURSE_IDS_WITH_EVENTS = []
  
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
  let mobileHasBeenTransformed = false

  const stdMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const d = new Date()
  const thisMonthIdx = d.getMonth()
  const firstMonths = stdMonths.slice(thisMonthIdx, stdMonths.length + 1)
  const wrapMonths = stdMonths.slice(0, thisMonthIdx)
  const months = firstMonths.concat(wrapMonths)
  const monthsExpanded = {}

  const handleExpandingMonths = () => { // handles toggling of month wrappers
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

  const refreshEventList = () => { // updates state of page on click
    filterEventsData()
  }

  // this function will do more, deal with splitting and truncation of top description text
  const formatHeaderTypeDescription = () => {
    $('.az-offerings-header-description-text')
      .append(`<div class='read-more'>Read More...</div>`) // this will need to do more also
  }

  const renderTypesFilter = courseList => {
    courseList.forEach(item => {
      // use COURSE_IDS_WITH_EVENTS to filter them out if there are no corresponding events
      if (COURSE_IDS_WITH_EVENTS.indexOf(item.id) !== -1) {
        if ($('#az-offerings-filter-focus').children(`#${item.id}`).length < 1) {
          $('#az-offerings-filter-focus').append($(`
            <li id='${item.id}' class='az-offerings-filter-item'>
              <a>${item.title}</a>
            </li>
          `)
          )
        }
      } else {
        if (
          $('#az-offerings-filter-focus').children(`#${item.id}`).length > 0 &&
          $('#az-offerings-filter-focus').find('a').text() !== 'all'
        ) {
          // console.log($('#az-offerings-filter-focus').find('a').text())
          $(`#${item.id}`).remove()
        }
      }
    })
    const thisChild = $('.az-offerings-filter-item').children('a')
    thisChild.off('click')
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
    // use COURSE_IDS_WITH_EVENTS to filter them out if there are no corresponding events
    // console.log(LOCATION_IDS_WITH_EVENTS)
    locations.filter(loc => LOCATION_IDS_WITH_EVENTS.indexOf(loc.id) !== -1)
      .forEach(location => {
        if (menuWrapper.children(`#${location.id}`).length < 1) {
          menuWrapper.append(`
            <li id='${location.id}' class='az-offerings-locations-menu-item'>
              <a>${location.title}</a>
            </li>
          `)
        }
      })

    if (menuWrapper.children(`#streaming`).length < 1 && IS_MEDITATIONS_PAGE) {
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

    menuItems.off('click')
    menuItems.click(e => {
      activeLocation = $(e.target).text().toUpperCase().replace(' ', '-')
      activeTypeFilter = 'All'
      COURSE_IDS_WITH_EVENTS = []

      setActiveItemFilter(menuItems, activeLocation)
      $('.az-offerings-location-detail-wrapper').empty()
      menuItems.children('.active-line').hide()
      $(e.target).children('.active-line').show(250)

      refreshEventList()
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
    const PMsplitter = course => course.StartTime.split('T')[0].split('-') // transforms timestamp to usable time components
    const preMonth = course => `${PMsplitter(course)[1]}-${PMsplitter(course)[2]}-${PMsplitter(course)[0]}`

    const detailsWrapper = $('.az-offerings-location-detail-wrapper')

    // DECIDED IN PHASE 1 NOT TO USE RECURRING EVENTS:

    // if (detailsWrapper.children('.recurring').length < 1) {
    //   detailsWrapper.append(`<div class='date-category recurring'><div class='month-name'>Recurring</div></div>`)
    // }
    // detailsWrapper.children('.recurring-section').remove()

    // const recurAngle = IS_SEMINARS_PAGE ? 'up' : 'down'

    // const recurringWrapper = $(`.recurring`)
    // if (recurringWrapper.children().length < 2) {
    //   recurringEvents.sort((a, b) => {
    //     return a.streaming !== 'both' && a.streaming !== 'only'
    //       ? a.start[0] !== b.start[0]
    //         ? parseInt(a.start[0]) - parseInt(b.start[0])
    //         : a.start[2] !== b.start[2]
    //           ? parseInt(a.start[2]) - parseInt(b.start[2])
    //           : a.start.split(' - ')[1].split(':')[0] !== b.start.split(' - ')[1].split(':')[0]
    //             ? parseInt(a.start.split(' - ')[1].split(':')[0]) - parseInt(b.start.split(' - ')[1].split(':')[0])
    //             : parseInt(a.start.split(' - ')[1].split(':')[0]) - parseInt(b.start.split(' - ')[1].split(':')[0])
    //       : a - b
    //   }).forEach((event, i) => {
    //     const { id } = event
    //     $(recurringWrapper.append(detailInner(event)))
    //   })
    //   if (IS_SEMINARS_PAGE) {
    //     monthsExpanded.recurring = true
    //     recurringWrapper.children('*:not(i, svg)').show()
    //     $('.recurring').children('.month-name').addClass('active')
    //   } else {
    //     monthsExpanded.recurring = false
    //     recurringWrapper.children('*:not(i, svg)').hide()
    //   }
    // }
    // if (recurringEvents.length < 1) {
    //   recurringWrapper.hide()
    // } else {
    //   recurringWrapper.show()
    // }
    
    const dateParts = x => [parseInt(x.start.date.split('/')[0]), parseInt(x.start.date.split('/')[1]), parseInt(x.start.date.split('/')[2][3])]


    events.sort((a, b) => {
      if (dateParts(a)[2] !== dateParts(b)[2]) {
        return dateParts(a)[2] - dateParts(b)[2]
      } else {
        if (dateParts(a)[0] !== dateParts(b)[0]) {
          return dateParts(a)[0] - dateParts(b)[0]
        } else {
          if (dateParts(a)[1] !== dateParts(b)[1]) {
            return dateParts(a) - dateParts(b)
          } else {
            return 0
          }
        }
      }
    })
    .forEach((event, i) => {
      const { id, month } = event
      if (detailsWrapper.find(`#${id}`).length < 1) {
        if (detailsWrapper.children(`.${month}`).length < 1) {
          detailsWrapper.append(`<div class='date-category ${month}'><div class='month-name'>${month}</div></div>`)
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
    allEventEls = detailsWrapper.clone()
  }
  
  const transformEvents = (events, centers, transformAll) => {
    const formatTime = D => {
      const dateParts = D.split('-')
      const dateTimeSplit = dateParts[dateParts.length - 1].split('T')
      const timeParts = dateTimeSplit[1].split(':')
      const isPM = timeParts[0] > 12
      const fDate = `${dateParts[1]}/${dateTimeSplit[0]}/${dateParts[0]}`
      const fTime = isPM ? `${timeParts[0] % 12}:${timeParts[1]} PM` : `${timeParts[0]}:${timeParts[1]} AM`
      return { date: fDate, time: fTime }
    }
    const PMsplitter = event => event.start_time.split('T')[0].split('-')
    const preMonth = event => `${PMsplitter(event)[1]}-${PMsplitter(event)[2]}-${PMsplitter(event)[0]}`

    // console.log(events)

    LOCATION_IDS_WITH_EVENTS = []

    const transformer = CENTER => events.map(event => {
      const { id, title, course_id, center_id, location_id, description, end_time, is_streaming, price, price_notes, registration_link, start_time, day, time, time_notes, email } = event
      
      const LOC_ID = (() => {
        if (center_id) return center_id
        else if (location_id) return location_id
        else return null
      })()
      
      if (LOC_ID && LOCATION_IDS_WITH_EVENTS.indexOf(LOC_ID) === -1) {
        LOCATION_IDS_WITH_EVENTS.push(LOC_ID)
      }
      // console.log(LOCATION_IDS_WITH_EVENTS)

      const getMonth = date => { // because moment.js crashes with webpack version apparently
        const month = date.split('-')[0]
        let retMonth = 'January'
        switch (true) {
          case month === '02':
            retMonth = 'February'
            break;
          case month === '03':
            retMonth = 'March'
            break;
          case month === '04':
            retMonth = 'April'
            break;
          case month === '05':
            retMonth = 'May'
            break;
          case month === '06':
            retMonth = 'June'
            break;
          case month === '07':
            retMonth = 'July'
            break;
          case month === '08':
            retMonth = 'August'
            break;
          case month === '09':
            retMonth = 'September'
            break;
          case month === '10':
            retMonth = 'October'
            break;
          case month === '11':
            retMonth = 'November'
            break;
          case month === '12':
            retMonth = 'December'
            break;
          default:
            retMonth = 'January'
            break
        }
        return retMonth
      }

      const month = start_time ? getMonth(preMonth(event)) : null
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

      const locTitle = center ? center.title : isStreaming ? 'Streaming' : ''
      const address = center ? center.address : ''
      const phone = center ? center.phone : ''
      
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
        email,
        streaming: is_streaming,
        link: registration_link,
        location: {
          title: locTitle,
          address,
          phone,
          id: location_id
            ? location_id
            : center_id
        },
        course_id
      }
      return retObj
    })

    const sendAll = centers.map(center => transformer(center))

    return !transformAll ? transformer() : sendAll
  }

  function filterEventsData () {
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditations, seminars, introductions, other_opportunities }, locations: { cities, centers } } = cachedData
    const matcherObj = {
      seminars,
      meditation: meditations,
      introductions,
      other_opportunities
    }

    const allTheseCourses = (() => {
      switch (true) {
        case IS_SEMINARS_PAGE:
          return seminars
        case IS_MEDITATIONS_PAGE:
          return meditations
        case IS_INTRODUCTIONS_PAGE: {
          const publicMeditations = meditations.events.filter(event => event.title.toLowerCase().indexOf('evening') !== -1)
          const syntheticCourseType = {
            id: publicMeditations[0].course_id,
            title: 'Evenings of Meditation'
          }
          const INTROS = { ...introductions }
          INTROS.events = [...INTROS.events, ...publicMeditations]
          INTROS.courses.push(syntheticCourseType) // we want public meditations to show up in introductions section also
          return INTROS
        }
        case IS_OTHER_PAGE:
          return other_opportunities
        case IS_CALENDAR_PAGE:
          console.log(matcherObj[hashFilter])
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
    const thisCourseType = courses.filter(course => {
      return textMatches(course.title, activeTypeFilter)
    })[0]

    const thisLocationCenters = ACTIVE_LOCATION === 'STREAMING' ? centers : centers.filter(center => center.city_id === thisCity.id)

    const recurringFilter =(() => {
      let courseType = 'meditation'
      switch (true) {
        case IS_INTRODUCTIONS_PAGE :
          courseType = 'intro'
          break
        case IS_SEMINARS_PAGE :
          courseType = 'sem'
          break
        case IS_OTHER_PAGE :
          courseType = 'other'
          break
        default :
          courseType = 'med'
      }
      return courseType
    })()

    // COURSE_IDS_WITH_EVENTS = [] // reset each time
    // console.log(COURSE_IDS_WITH_EVENTS)

    const recurringEvents = thisLocationCenters.reduce(
      (list, center) => {
        const matchedRecurring = center.recurring_events.filter(ev =>
          ev.course_type.indexOf(recurringFilter) !== -1 ||
          IS_CALENDAR_PAGE
        )
        list = list.concat(matchedRecurring)
        return list
      },
      []
    ).filter(event => {
      const { course_id } = event
      const courseMatches = thisCourseType ? event.course_id === thisCourseType.id : false
      let ret1 = false
      let ret2 = false
      thisLocationCenters.forEach(center => {
        if (center.id === event.center_id || center.id === event.location_id) {
          ret1 = true
        }
      })
      if (activeTypeFilter.toLowerCase() === 'all' || courseMatches) { // this is the line that is allowing the pass-thru
        ret2 = true
      }
      if (ret1 && ret2) {
        if (course_id && COURSE_IDS_WITH_EVENTS.indexOf(course_id) === -1) {
          COURSE_IDS_WITH_EVENTS.push(course_id)
        }
        return event
      }
    })

    const localEvents = events.filter(event => {
      const { is_streaming, course_id } = event
      const retStream = is_streaming === 'both' || is_streaming === 'none'
      const courseMatches = thisCourseType ? event.course_id === thisCourseType.id : false
      let ret1 = false
      let ret2 = false
      if (ACTIVE_LOCATION !== 'STREAMING') {
        thisLocationCenters.forEach(center => {
          if ((center.id === event.center_id || center.id === event.location_id) && retStream) {
            ret1 = true
          }
        })
      } else {
        if (is_streaming === 'both' || is_streaming === 'only') {
          ret1 = true
        }
      }
      if (activeTypeFilter.toLowerCase() === 'all' || courseMatches) {
        ret2 = true
      }
      if (ret1 && ret2) {
        if (course_id && COURSE_IDS_WITH_EVENTS.indexOf(course_id) === -1) {
          COURSE_IDS_WITH_EVENTS.push(course_id)
        }
        return event
      }
    })

    LOCAL_EVENTS = transformEvents(localEvents, thisLocationCenters)
    RECURRING_EVENTS = transformEvents(recurringEvents, thisLocationCenters)
    ALL_EVENTS = transformEvents(events, centers)

    renderEventData(LOCAL_EVENTS, RECURRING_EVENTS)
    handleExpandingMonths()
    renderTypesFilter(courses)
  }

  const handleCalendarTypeFilter = () => {
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditations, seminars, introductions, other_opportunities }, locations: { cities } } = cachedData
    const matcherObj = {
      seminars,
      meditation: meditations,
      introductions,
      other_opportunities
    }
    const a = $('.az-offerings-submenu-wrapper.calendar-menu').find('a')
    a.click(e => {
      hashFilter = $(e.target).text().toLowerCase().replace(/[^a-z]/g, '_')
      console.log(LOCATION_IDS_WITH_EVENTS, cities)
      activeLocation = cities.filter(c => c.id === LOCATION_IDS_WITH_EVENTS[0])[0].title
      activeTypeFilter = 'All'
      // const allTheseCourses = (() => {
      //   switch (true) {
      //     case IS_SEMINARS_PAGE:
      //       return seminars
      //     case IS_MEDITATIONS_PAGE:
      //       return meditations
      //     case IS_INTRODUCTIONS_PAGE: {
      //       const publicMeditations = meditations.events.filter(event => event.title.toLowerCase().indexOf('evening') !== -1)
      //       const syntheticCourseType = {
      //         id: publicMeditations[0].course_id,
      //         title: 'Evening of Meditation'
      //       }
      //       const INTROS = { ...introductions }
      //       INTROS.courses.push(syntheticCourseType)
      //       INTROS.events = [...INTROS.events, ...publicMeditations]
      //       return INTROS
      //     }
      //     case IS_OTHER_PAGE:
      //       return other_opportunities
      //     case IS_CALENDAR_PAGE:
      //       return matcherObj[hashFilter]
      //     default:
      //       return meditations
      //   }
      // })()
      // const { courses } = matcherObj[hashFilter]
      $('#az-offerings-filter-focus').children().each((i, li) => {
        if ($(li).children().text() !== 'all') $(li).remove()
      })
      $('.az-offerings-location-detail-wrapper').empty()
      $('.az-offerings-locations-menu-wrapper ul').empty()
    //  console.log($('.az-offerings-locations-menu-wrapper li').length)
      // renderTypesFilter(courses)

      filterEventsData()
      renderLocationsMenu(cities)

      // window.location.reload()
      // renderLocationsMenu(cities)
      // renderTypesFilter(courses)
    })
  }

  const handleStickyNav = () => {
    let scrollTop = 0
    const UA = window.navigator.userAgent.toLowerCase()

    if (
      UA.indexOf('applewebkit') !== -1 &&
      UA.indexOf('chrome') === -1 &&
      window.innerWidth > 999
    ) {
      $('body').css({ overflowX: 'visible' }) // disable stickyNav on safari, since we can't access body.scrolltop or window.pageY
    }

    $('body').scroll(e => {
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
        $('#header-outer').addClass('opaque')
        $('.az-offerings-type-filter-wrapper').css({ marginBottom: '14px' })
      } else if ($('body').scrollTop() <= scrollTop) {
        typeFilter.removeClass('sticky-nav-1')
        locFilter.removeClass('sticky-nav-2')
        locFilter.siblings('.vc_col-sm-3').remove()
        dataBody.removeClass('sticky-nav-3')
        scrollTop = 0
        $('#header-outer').removeClass('opaque')
        $('.az-offerings-type-filter-wrapper').css({ marginBottom: 0 })
      }
    })
  }

  const advanceMobileCardState = cmd => { // this stuff handles how one card then the next etc is shown on mobile
    if (mobileCardStateIdx < 3 && cmd !== 'no-advance') {
      mobileCardStateIdx += 1
      if (mobileCardStateIdx !== 3) {
        mobileCardState = mobileCards[mobileCardStateIdx]
      }
    }
  }

  const filterLocationsOnMobile = locations => {
    const returnedEvents = []
    $(locations[0]).children().each((a, locChild) => {
      const locTxt = $(locChild).find('a').text().toLowerCase()
      ALL_EVENTS.forEach(event => {
        const txt = event.location.address.toLowerCase()
        if (txt.indexOf(locTxt) !== -1 && returnedEvents.indexOf(locTxt) === -1) returnedEvents.push(locTxt)
      })
    })
    return returnedEvents
  }

  const createMobileFilters = () => {
    const allFiltersCompleted = mobileCardStateIdx === 3
    const reload = allEventEls !== undefined

    const locationList = $('.az-offerings-locations-menu-wrapper').children('ul')
    const locationListClone = mobileHasBeenTransformed
      ? $('.mobile-locations-list')
      : locationList.clone().addClass('mobile-locations-list mobile-list')
    const typeList = $('.az-offerings-type-filter-wrapper').find('ul')
    const typeListClone = mobileHasBeenTransformed
      ? $('.mobile-type-list')
      : typeList.clone().addClass('mobile-list mobile-type-list')

    const allEventsClone = !reload ? $('.az-offerings-location-detail-wrapper').clone() : allEventEls.clone()

    const locationsWithEvents = filterLocationsOnMobile(locationListClone)

    $(locationListClone[0]).children().each((i, li) => {
      const txt = $(li).children().text().toLowerCase()
      if (locationsWithEvents.indexOf(txt) === -1) {
        $(li).css({ display: 'none' })
      }
    })

    const dateFilterList = $('<ul class="date-filter-list mobile-list"></ul>').append(
      dateFilters.map((date, i) => `<li class='date-filter'><a>${date}</a></li>`)
    )
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
          }
          if ($(`.${month}`).children(`#${id}`).length < 1) {
            $(`.${month}`).append(detailInner(event))
          }
        }
      }
    })
  }

  const reloadErthangMobile = cmd => {
    const isRecurring = activeMobileDateFilter.toLowerCase() === 'recurring'
    if (mobileCardStateIdx === 3) {
      refreshEventList()
    }
    advanceMobileCardState(cmd)
    handleMobileStyling()
    handleMobileFiltering()
    renderMobileEvents(isRecurring ? RECURRING_EVENTS : LOCAL_EVENTS)
  }

  var handleMobileFiltering = () => { // var so it can hoist
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
      if (hasBeenActivated.location) { // this is the stop that basically switches from initing a card to switching its val
        trigger = 'no-advance'
      }
      reloadErthangMobile(trigger)
      hasBeenActivated.location = true // once it's been inited, trigger that block
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
      reloadErthangMobile(trigger)
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
      reloadErthangMobile(trigger)
      hasBeenActivated.date = true
    })

    $('.mobile-filter-module.closed').children('.title-block').click(e => {
      const txt = $(e.target).attr('data-title').toLowerCase()
      if (openCards.indexOf(txt) === -1) {
        openCards.push(txt)
      } 
      reloadErthangMobile('no-advance')
    })
  }

  async function renderDoc () { // async incase it needs to fetch data
    if (IS_CALENDAR_PAGE && (!hash || hash === '')) {
      window.location.replace('/participate/calendar/#seminars')
      window.location.reload()
    }

    const isWide = window.innerWidth > 1000

    activeTypeFilter = 'all'
    const forceRefresh = false
    const { localStorage } = window
    const data = await queries.events()
    console.log(data);
    const shouldRefresh = localStorage.lastUpdated + 60000000 <= Date.now() // refresh cache if it's been a day
    const conds = !localStorage.data || !localStorage.lastUpdated || shouldRefresh || forceRefresh
    if (conds) {
      localStorage.setItem('CGOdata', JSON.stringify(data))
      localStorage.setItem('lastUpdated', Date.now())
    }
    console.log('cache refreshed: ', conds)
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditations, seminars, introductions, other_opportunities }, locations: { cities, centers } } = cachedData


    const allTheseCourses = (() => {
      switch (true) {
        case IS_SEMINARS_PAGE:
          return seminars
        case IS_MEDITATIONS_PAGE:
          return meditations
        case IS_INTRODUCTIONS_PAGE: {
          const publicMeditations = meditations.events.filter(event => event.title.toLowerCase().indexOf('evening') !== -1)
          // console.log(object);
          const syntheticCourseType = {
            id: publicMeditations[0].course_id,
            title: 'Evenings of Meditation'
          }
          const INTROS = { ...introductions }
          INTROS.courses.push(syntheticCourseType)
          INTROS.events = [...INTROS.events, ...publicMeditations]
          // console.log(INTROS.events)
          return INTROS
        }
        case IS_OTHER_PAGE:
          return other_opportunities
        case IS_CALENDAR_PAGE:
          const matcherObj = {
            seminars,
            meditation: meditations,
            introductions,
            other_opportunities
          }
          return matcherObj[hashFilter]
        default:
          return meditations
      }
    })()

    const { courses } = allTheseCourses

    filterEventsData()
    renderLocationsMenu(cities)
    renderTypesFilter(courses)
    if (IS_CALENDAR_PAGE) {
      handleCalendarTypeFilter()
    }

    allEventEls = $('.az-offerings-location-detail-wrapper').clone()

    if (window.innerWidth > 1000) {
      if (isIE) {
        // const chidrens = $('.az-offerings-types-description-container').find('.wpb_wrapper').first().children()
        // chidrens.each((i, el) => {
        //     $(el).css({
        //       ['-ms-grid-column']: i % 2 === 0 ? 2 : 1,
        //       gridColumn: i % 2 === 0 ? '2/3' : '1/2'
        //     })
        //   })
      } else {
        if (window.innerHeight > 1100) {
          handleStickyNav()
        }
      }
    } else {
      handleMobileStyling()
      handleMobileFiltering()
      $('.date-category').children('.month-name').css({ visibility: 'hidden' })
    }
    window.addEventListener('resize', () => {
      if ((isWide && window.innerWidth < 1000) || (!isWide && window.innerWidth > 1000)) {
        window.location.reload()
      }
    })
  }
  renderDoc()
})
