import moment from 'moment'
import flatten from 'lodash.flatten'
import '../../../../scss/pages/participate.scss'
import { setActiveItemFilter, textMatcher, textMatches } from './utils'
import queries from '../../../queries'
import { detailInner, descriptionTxtBlock } from './templateElements'

jQuery(document).ready(function($) {
  const { pathname } = window.location
  const splitPath = pathname.split('/')
  const path = splitPath[splitPath.length - 2]

  const IS_SEMINARS_PAGE = path === 'seminars'
  const IS_MEDITATIONS_PAGE = path === 'meditations'
  const IS_INTRODUCTIONS_PAGE = path === 'introductions'
  const IS_OTHER_PAGE = path === 'other-opportunities'

  let LOCAL_EVENTS
  let RECURRING_EVENTS

  let activeLocation = 'Denver'
  let activeTypeFilter = 'all'

  const months = ['recurring', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const getFirstMonth = (currentLow, month) => Math.min(currentLow, months.indexOf(month))
  const monthsExpanded = {}

  const handleExpandingMonths = () => {
    const monthKeys = Object.keys(monthsExpanded)
    monthKeys.forEach(month => {
      $(`.${month}`).click(e => {
        console.log(e.target)
        monthsExpanded[month] = !monthsExpanded[month]
        $(`.${month}`).children('*:not(i, svg)').toggle(300)
        $(`.${month}`).children('i').toggleClass('fa-angle-down fa-angle-up')
      })
    })
  }

  // const ditchDescriptionBlockThemeWrappers = async () => {
  //   const eachWrapper = $('.az-offerings-types-description-container .wpb_wrapper').children('.wpb_raw_code')
  //   await $(eachWrapper).each((i, wrapper) => {
  //     const actualContent = $(wrapper).children('txt-block')
  //     $('.az-offerings-types-description-container').prepend(actualContent)
  //   })
  //   await $('.az-offerings-types-description-container').children().each((i, child) => {
  //     if (!$(child).hasClass('txt-block')) {
  //       $(child).remove()
  //     }
  //   })
  // }
  
  const filterByLocation = eventList =>
    eventList.filter(event => event.slug === activeLocation)

  const filterByType = eventList => {
    const filteredList = activeTypeFilter === 'all'
      ? eventList : eventList.filter(event => event.type === activeTypeFilter.replace(' ', '-').toLowerCase())
    return filteredList
  }

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


    const detailsWrapper = $('.az-offerings-location-detail-wrapper')
    if (detailsWrapper.children('.recurring').length < 1) {
      detailsWrapper.append(`<div class='date-category recurring'>Recurring</div>`)
    }

    const recurAngle = IS_SEMINARS_PAGE ? 'up' : 'down'

    const recurringWrapper = $(`.recurring`)
    if (recurringWrapper.children().length < 1) {
      recurringWrapper.append(`<i class='fas fa-angle-${recurAngle}'></i>`)
      recurringEvents.forEach((event, i) => {
        const { id } = event
        $(recurringWrapper.append(detailInner(event)))
      })
      if (IS_SEMINARS_PAGE) {
        monthsExpanded.recurring = true
        recurringWrapper.children('*:not(i, svg)').show()
      } else {
        monthsExpanded.recurring = false
        recurringWrapper.children('*:not(i, svg)').hide()
      }
    }
    
    
    
    events.forEach((event, i) => {
      const { id, month } = event
      if (detailsWrapper.find(`#${id}`).length < 1) {
        if (detailsWrapper.children(`.${month}`).length < 1) {
          detailsWrapper.append(`<div class='date-category ${month}'>${month}</div>`)
          $(`.${month}`).append(`<i class='fas fa-angle-down'></i>`)
        }
        if ($(`.${month}`).children(`#${id}`).length < 1) {
          $(`.${month}`).append(detailInner(event))
        }
        if (IS_SEMINARS_PAGE) {
          monthsExpanded[month] = true
          $(`.${month}`).children('*:not(i, svg)').show()
        } else {
          monthsExpanded[month] = false
          $(`.${month}`).children('*:not(i, svg)').hide()
        }
      }
      
    })

    console.log(monthsExpanded)
  }

  const transformEvents = (events, centers) => {
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

    return events.map(event => {
      const { id, title, course_id, center_id, description, end_time, is_streaming, price, price_notes, registration_link, start_time, day, time, time_notes } = event 
      const month = start_time ? moment(preMonth(event)).format('MMMM') : null
      const start =  start_time ? formatTime(event.start_time) : null
      const end = end_time ? formatTime(event.end_time) : null
      const center = centers.filter(center => center.id === center_id)[0]
      // const course = courses.filter(course => course.id === course_id)[0]
      const endsSameDay = start_time && end_time
        ? formatTime(start_time).date === formatTime(end_time).date : false
      if (endsSameDay) {
        start.time = `${start.time} - ${end.time}`
        end.time = null
        end.date = null
      }
      return {
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
        location: { title: center.title, address: center.address, phone: center.phone },
        // course
      }
    })
  }

  function filterEventsData () {
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditation, seminar, introduction, other_opportunities }, locations: { cities, centers } } = cachedData

    const allTheseCourses = (() => {
      switch (true) {
        case IS_SEMINARS_PAGE:
          return seminar
        case IS_MEDITATIONS_PAGE:
          return meditation
        case IS_INTRODUCTIONS_PAGE:
          return introduction
        case IS_OTHER_PAGE:
          return other_opportunities
        default:
          return meditation
      }
    })()

    const { events, courses } = allTheseCourses

    const thisCity = cities.filter(city =>
      textMatches(city.title, activeLocation)
    )[0]
    const thisCourseType = courses.filter(course =>
      textMatches(course.title, activeTypeFilter)
    )[0]


    const thisLocationCenters = centers.filter(center => center.city_id === thisCity.id)

    const recurringEvents = thisLocationCenters.reduce(
      (list, center) => {
        list = list.concat(center.recurring_events)
        return list
      },
      []
    )

    const localEvents = events.filter(event => {
      const courseMatches = thisCourseType ? event.course_id === thisCourseType.id : false
      let ret1 = false
      let ret2 = false
      thisLocationCenters.forEach(center => {
        if (center.id === event.center_id) {
          ret1 = true
        }
      })
      if (activeTypeFilter === 'all' || activeTypeFilter === 'ALL' || courseMatches) {
        ret2 = true
      }
      if (ret1 && ret2) return event
    })

    LOCAL_EVENTS = transformEvents(localEvents, thisLocationCenters)
    RECURRING_EVENTS = transformEvents(recurringEvents, thisLocationCenters)

    renderEventData(LOCAL_EVENTS, RECURRING_EVENTS)
    handleExpandingMonths()
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
    console.log('cached refreshed:', conds)
    const cachedData = JSON.parse(localStorage.getItem('CGOdata'))
    const { course_types: { meditation, seminar, introduction, other_opportunities }, locations: { cities, centers } } = cachedData

    const allTheseCourses = (() => {
      switch (true) {
        case IS_SEMINARS_PAGE:
          return seminar
        case IS_MEDITATIONS_PAGE:
          return meditation
        case IS_INTRODUCTIONS_PAGE:
          return introduction
        case IS_OTHER_PAGE:
          return other_opportunities
        default:
          return meditation
      }
    })()

    const { events, courses } = allTheseCourses

    filterEventsData()
    renderTypesFilter(courses)    
    renderLocationsMenu(cities)
    // renderEventData(LOCAL_EVENTS, RECURRING_EVENTS)
  }

  renderDoc()
})
