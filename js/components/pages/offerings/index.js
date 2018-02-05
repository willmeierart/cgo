import moment from 'moment'
import '../../../../scss/pages/offerings.scss'
import { detailInner, descriptionTxtBlock } from './templateElements'
import { SAMPLE_DATA, meditationTypes, introductoryTypes, seminarTypes } from './SAMPLE_DATA'
import faker from 'faker'

jQuery(document).ready(function($) {
  const splitPath = window.location.pathname.split('/')
  let path = splitPath[splitPath.length - 2]
  if (path === 'offerings') { path = 'meditation' }

  let activeLocationSlug = 'denver'
  let activeTypeFilter = 'all'
  let shouldUpdateEvents = false
  const monthsExpanded = {}
  // let fullyTransformedEventSet = SAMPLE_DATA.events.meditation

  let currentList = meditationTypes
  if (path === 'introductory') {
    currentList = introductoryTypes
  } else if (path === 'seminars') {
    currentList = seminarTypes
  }

  const getCorrectEventSet = eventObj => {
    let formatPath = path
    let upcomingName = formatPath
    // if (path === 'offerings') { formatPath = 'meditation' }
    if (formatPath === 'meditation') {
      upcomingName = 'Meditations'
    } else if (formatPath === 'introductory') {
      upcomingName= 'Introductory Events'
    }

    $('.az-upcoming-category').text(`Upcoming ${upcomingName}`)
    for (let eventType of Object.keys(eventObj)) {
      if (eventType === formatPath) { return eventObj[eventType] }
    }
  }

  const bindEventsToLocations = eventList => eventList
    .sort((a,b) => moment(a.date, 'X') - moment(b.date, 'X'))
    .map(event => {
      const eventLocation = () => {
        for (let location of SAMPLE_DATA.locations) {
          if (location.place_id === event.location_id) { return location }
        }
      }
      const eLoc = eventLocation()
      const { phone, address } = eLoc
      return {
        location_title: eLoc.title,
        slug: eLoc.menu_slug,
        address,
        phone,
        ...event
      }
    })

  const filterByLocation = eventList => eventList.filter(event => event.slug === activeLocationSlug)

  const filterByType = eventList => {
    const filteredList = activeTypeFilter === 'all'
      ? eventList : eventList.filter(event => event.type === activeTypeFilter.replace(' ', '_').toLowerCase())
    return filteredList
  }

  const fullyTransformTheseEvents = allEvents => {
    const correctFlatEventSet = getCorrectEventSet(allEvents)
    // console.log(correctFlatEventSet);
    const eventsWithLocations = bindEventsToLocations(correctFlatEventSet)
    console.log(eventsWithLocations);
    const thisLocationEvents = filterByLocation(eventsWithLocations)
    console.log(thisLocationEvents);
    const thisTypeEvents = filterByType(thisLocationEvents)
    console.log(thisTypeEvents);
    const splitEventObj = { Recurring: [] }
  
    thisTypeEvents.forEach(event => {
      if (event.recurring) {
        splitEventObj.Recurring.push(event)
      } else {
        console.log(event.date);
        const month = event.date.split(' ')[0]
        if (!splitEventObj[month]) {
          splitEventObj[month] = []
        }
        splitEventObj[month].push(event)
        monthsExpanded[month] = false
      }
    })

    console.log(splitEventObj);

    // fullyTransformedEventSet = thisTypeEvents
    return splitEventObj
    // return thisTypeEvents
  }

  let fullyTransformedEventSet = fullyTransformTheseEvents(SAMPLE_DATA.events)



  const setActiveItemFilter = (element, matchedString) => {
    shouldUpdateEvents = false

    element.each((i, item) => {
      // console.log(item, matchedString);
      // console.log($(item).text() === matchedString);
      $(item).text() === matchedString || $(item).text() === matchedString.toUpperCase()
        ? $(item).addClass('active')
        : $(item).removeClass('active')
      $(item).click(e => {
        e.preventDefault()
        const thisMatchedString = $(e.target).text()
        
        shouldUpdateEvents = true 

        if (shouldUpdateEvents) {
          setActiveItemFilter(element, thisMatchedString)
          $('.az-offerings-location-detail-wrapper').empty()
          fullyTransformedEventSet = fullyTransformTheseEvents(SAMPLE_DATA.events)
          renderEventData()
        }
      })
    })
    // element.click((e) => {
    //   e.preventDefault()
    //   const thisMatchedString = $(e.target).text()
    //   setActiveItemFilter(element, thisMatchedString)
      
    //   // initDoc() << infinite loop
    //   $('.az-offerings-location-detail-wrapper').empty()
    //   fullyTransformedEventSet = fullyTransformTheseEvents(SAMPLE_DATA.events)
    //   renderEventData()
    // })
    
    // if (opFunc) {
    //   opFunc()
    // }
  }

  const setActiveMenuItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a')
    let formatPath = path
    if (path === 'introductory') { formatPath = path + ' events' }
    // console.log(subheadLinks, formatPath);
    setActiveItemFilter(subheadLinks, formatPath)
  }

  const renderTypesFilter = () => {
    currentList.forEach(item => {
      const formatItem = item.replace(/[^a-zA-z]/g, '_')
      if ($('#az-offerings-filter-focus').children(`#${formatItem}`).length < 1) {
        $('#az-offerings-filter-focus').append($(`
          <li id='${formatItem}' class='az-offerings-filter-item'>
            <a>${item}</a>
          </li>
        `)
        )
      }
    })
    setActiveItemFilter($('.az-offerings-filter-item').children('a'), activeTypeFilter)
  }

  const renderTypesDescriptionBlocks = () => {
    const txtContainer = $('.az-offerings-types-description-container')
    currentList.forEach(title => {
      const flatTitle = title.replace(/[^a-zA-z]/g, '_')
      if (txtContainer.children(`#${flatTitle}`).length < 1) {
        txtContainer.append(descriptionTxtBlock(title, flatTitle))
      }
    })
    const blockEl = $('.az-offerings-types-description-container .txt-block')
    blockEl.css('width', `${100 / currentList.length}%`)
    const newWidth = blockEl.css('width')
    blockEl.css('height', newWidth)
  }

  const handleExpandingMonths = () => {
    const monthKeys = Object.keys(monthsExpanded)
    monthKeys.forEach(month => {
      $(`.${month}`).click(() => {
        $(`.${month}`).children().toggle(300)
      })
    })
  }

  const renderEventData = () => {
    let formatPath = path
    if (path === ('offerings')) {
      formatPath = 'meditation'
    }
    const detailsWrapper = $('.az-offerings-location-detail-wrapper')

    if (detailsWrapper.children(`#${event.id}`).length < 1) {
      Object.keys(fullyTransformedEventSet).forEach(type => {
        detailsWrapper.append($(`<div class='${type}'>${type}</div>`))
        fullyTransformedEventSet[type].forEach(event => {
          if ($(`.${type}`).children(`#${event.id}`).length < 1) {
            $(`.${type}`).append(detailInner(event))
          }
        })
        if (type !== 'Recurring') {
          $(`.${type}`).children().hide()
        }
      })
    }

    handleExpandingMonths()

    // fullyTransformedEventSet.forEach(event => {
    //   // console.log(event);
    //   if (detailsWrapper.children(`#${event.id}`).length < 1) {
    //     detailsWrapper.append(detailInner(event))
    //   }
    // })
  }
  
  

  const renderLocationsMenu = () => {
    const menuWrapper = $('.az-offerings-locations-menu-wrapper ul')
    const { locations } = SAMPLE_DATA

    locations.forEach(location => {
      if (menuWrapper.children(`#${location.menu_slug}`).length < 1) {
        menuWrapper.append(`
          <li id='${location.menu_slug}' class='az-offerings-locations-menu-item'>
            <a>${location.menu_slug.replace('_', ' ')}</a>
          </li>
        `)
      }
    })
    setActiveItemFilter($('.az-offerings-locations-menu-item').children('a'), activeLocationSlug)
  }

  function initDoc () {
    setActiveMenuItem()
    renderTypesFilter()
    renderTypesDescriptionBlocks()
    renderEventData()
    renderLocationsMenu()
  }

  initDoc()
})
