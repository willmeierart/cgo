import moment from 'moment'
import flatten from 'lodash.flatten'
import '../../../../scss/pages/participate.scss'
import { setActiveItemFilter } from './utils'
import queries from './queries'
import { detailInner, descriptionTxtBlock } from './templateElements'

jQuery(document).ready(function($) {
  const { pathname } = window.location
  const splitPath = pathname.split('/')
  let path = splitPath[splitPath.length - 2]
  let activeLocationSlug = 'usa'
  let activeTypeFilter = 'all'
  const monthsExpanded = {}
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const getFirstMonth = (currentLow, month) => Math.min(currentLow, months.indexOf(month))

  const handleExpandingMonths = () => {
    const monthKeys = Object.keys(monthsExpanded)
    monthKeys.forEach(month => {
      $(`.${month}`).click(() => {
        // console.log(month)
        monthsExpanded[month] = !monthsExpanded[month]
        $(`.${month}`).children('*:not(i, svg)').toggle(300)
        $(`.${month}`).children('i').toggleClass('fa-angle-down fa-angle-up')
      })
    })
  }

  const ditchDescriptionBlockThemeWrappers = async () => {
    const eachWrapper = $('.az-offerings-types-description-container .wpb_wrapper').children('.wpb_raw_code')
    await $(eachWrapper).each((i, wrapper) => {
      const actualContent = $(wrapper).children('txt-block')
      $('.az-offerings-types-description-container').prepend(actualContent)
    })
    await $('.az-offerings-types-description-container').children().each((i, child) => {
      if (!$(child).hasClass('txt-block')) {
        $(child).remove()
      }
    })
  }
  
  const filterByLocation = eventList =>
    eventList.filter(event => event.slug === activeLocationSlug)

  const filterByType = eventList => {
    const filteredList = activeTypeFilter === 'all'
      ? eventList : eventList.filter(event => event.type === activeTypeFilter.replace(' ', '-').toLowerCase())
    return filteredList
  }
  
  const fetchAllRecurringEvents = async () => {}

  const collateAllLocations = async locationAreas => {
    const allLocationData = locationAreas.reduce(async (flatList, locArea) => {
      const collection = await flatList
      const location = await queries.location(locArea.Id)
      location.forEach(indLoc => { indLoc.Area = locArea})
      collection.push(location)
      return collection
    }, Promise.resolve([]))
    return allLocationData
  }

  const getAllCoursesOfAllTypes = async () => {
    const courseTypes = await queries.allCourseTypes()
    const allCoursesAllTypes = courseTypes.map(async type => {
      const courses = await queries.allCoursesOfType(type.Id)
      courses.forEach(course => { course.type = type })
      return courses
    })
    const res = Promise.all(allCoursesAllTypes)
    return res
  }

  const formatEventData = async (courseData, location) => {
    const allCoursesOfAllTypes = flatten(await getAllCoursesOfAllTypes())
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
    const relevantData = courseData.map(course => {

      return {
        id: course.Id,
        title: course.Title,
        url: course.RegUrl,
        time: {
          month: moment(preMonth(course)).format('MMMM'),
          start: formatTime(course.StartTime),
          end: formatTime(course.EndTime),
          notes: course.TimeNote
        },
        cost: {
          price: course.Price,
          notes: course.PriceNotes
        },
        notes: course.OtherNotes,
        location
      }
    })
    return relevantData
  }

  const loadInEvents = async () => {
    const courseTypes = await queries.allCourseTypes()
    const locationAreas = await queries.allLocations()
    const locations = await collateAllLocations(locationAreas)
    const thisLocation = locations.reduce((wrapper, locs) => {
      locs.forEach(loc => {
        const formatArea = loc.Area.Title.toLowerCase().replace(/[^a-zA-Z]/g, '-')
        if (formatArea === activeLocationSlug) {
          wrapper.push(loc)
        }
      })
      return wrapper
    }, [])[0]
    const thisType = courseTypes.filter(c => c.Title.toLowerCase() === path)[0]
    const theseCourses = await queries.allEventsOfCourseTypeAtLocation(thisLocation.Id, thisType.id)
    return formatEventData(theseCourses, thisLocation)
  }

  const refreshEventList = async () => { // updates state of page on click
    const eventData = await loadInEvents()
    renderEventData(eventData)
  }

  // this function will do more, deal with splitting and truncation of top description text
  const formatHeaderTypeDescription = () => {
    $('.az-offerings-header-description-text')
      .append(`<div class='read-more'>Read More...</div>`) // this will need to do more also
  }

  const renderTypesFilter = async courseList => {
    courseList.forEach(item => {
      if ($('#az-offerings-filter-focus').children(`#${item.Id}`).length < 1) {
        $('#az-offerings-filter-focus').append($(`
          <li id='${item.Id}' class='az-offerings-filter-item'>
            <a>${item.Name}</a>
          </li>
        `)
        ) // THIS STILL NEEDS WORK BELOW
      }
    })
    const thisChild = $('.az-offerings-filter-item').children('a')
    setActiveItemFilter(thisChild, activeTypeFilter)
    thisChild.click(e => {
      activeTypeFilter = $(e.target).text()
      // console.log(thisChild, activeTypeFilter)
      setActiveItemFilter(thisChild, activeTypeFilter)
      $('.az-offerings-location-detail-wrapper').empty()
      // refreshEventList()
    })
  }

  const renderTypesDescriptionBlocks = courseList => {
    const txtContainer = $('.az-offerings-types-description-container')
    courseList.forEach(course => {
      if (txtContainer.children(`#${course.Id}`).length < 1) {
        txtContainer.append(descriptionTxtBlock(course))
      }
    })
    const blockEl = $('.az-offerings-types-description-container .txt-block')
    blockEl.css('width', `${100 / courseList.length}%`)
    const newWidth = blockEl.css('width')
    blockEl.css('height', newWidth)
  }

  const renderLocationsMenu = locations => {
    const menuWrapper = $('.az-offerings-locations-menu-wrapper ul')
    locations.forEach(location => {
      if (menuWrapper.children(`#${location.Id}`).length < 1) {
        menuWrapper.append(`
          <li id='${location.Id}' class='az-offerings-locations-menu-item'>
            <a>${location.Title}</a>
          </li>
        `)
      }
    })

    const menuItems = $('.az-offerings-locations-menu-item a')
    setActiveItemFilter(menuItems, activeLocationSlug)

    menuItems.each((i, item) => {
      $(item).append($(`<div class='active-line'></div>`))
      if (!$(item).hasClass('active')) {
        $(item).children('.active-line').hide()
      }
    })

    menuItems.click(e => {
      activeLocationSlug = $(e.target).text().toLowerCase().replace(' ', '-')
      setActiveItemFilter(menuItems, activeLocationSlug)
      $('.az-offerings-location-detail-wrapper').empty()
      refreshEventList()
      menuItems.children('.active-line').hide()
      $(e.target).children('.active-line').show(250)
    })
  }

  const renderEventData = eventData => {
    const detailsWrapper = $('.az-offerings-location-detail-wrapper')
    detailsWrapper.append(`<div class='date-category recurring'>Recurring</div>`)
    monthsExpanded.recurring = true
    $(`.recurring`).append(`<i class='fas fa-angle-down'></i>`)

    let lowMonthIdx = 11
    
    eventData.forEach((event, i) => {
      const { id, time: { month } } = event
      // console.log(month)
      lowMonthIdx = getFirstMonth(lowMonthIdx, month)

      if (detailsWrapper.find(`#${id}`).length < 1) {
        if (detailsWrapper.children(`.${month}`). length < 1) {
          detailsWrapper.append(`<div class='date-category ${month}'>${month}</div>`)
          const expandIcon = monthsExpanded[month] || i !== 0 ? 'down' : 'up'
          $(`.${month}`).append(`<i class='fas fa-angle-${expandIcon}'></i>`)
        }
        if ($(`.${month}`).children(`#${id}`).length < 1) {
          $(`.${month}`).append(detailInner(event))
        }
        monthsExpanded[month] = false
        $(`.${month}`).children('*:not(i, svg)').hide()
      }
    })
    const lowMonth = months[lowMonthIdx]
    monthsExpanded[lowMonth] = true
    $(`.${lowMonth}`).children('*:not(i, svg)').show()
    
    handleExpandingMonths()
  }

  (async function renderDoc () {
    const eventData = await loadInEvents()
    const allRecurringEvents = await fetchAllRecurringEvents()
    const locationAreas = await queries.allLocations()
    const allLocationData = await collateAllLocations(locationAreas)    
    const courseTypes = await queries.allCourseTypes()
    const thisType = courseTypes.filter(type => type.Title.toLowerCase().replace(/[^a-zA-Z]/g, '-') === path)[0]
    const courseList = await queries.allCoursesOfType(thisType.Id)
    const allCoursesOfAllTypes = flatten(await getAllCoursesOfAllTypes())

    renderTypesDescriptionBlocks(courseList)
    ditchDescriptionBlockThemeWrappers() 
    renderTypesFilter(courseList)    
    renderLocationsMenu(locationAreas)
    renderEventData(eventData)    
  })()

  // let fullyTransformedEventSet = { ...loadInEvents() }
  
  // const getCorrectEventSet = eventObj => {
  //   // get the actual event object
  //   // could be page-specific
  //   console.log(eventObj)
  //   for (let eventType of Object.keys(eventObj)) {
  //     if (eventType === path) { return eventObj[eventType] }
  //   }
  // }
})
