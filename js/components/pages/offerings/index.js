import moment from 'moment'
import '../../../../scss/pages/offerings.scss'
import { detailInner, descriptionTxtBlock } from './templateElements'
import { SAMPLE_DATA, meditationTypes, introductoryTypes, seminarTypes } from './SAMPLE_DATA'
import faker from 'faker'

jQuery(document).ready(function($) {
  const splitPath = window.location.pathname.split('/')
  const path = splitPath[splitPath.length - 2]

  let activeLocationSlug = 'denver'
  let activeTypeFilter = 'all'

  let currentList = meditationTypes
  if (path === 'introductory') {
    currentList = introductoryTypes
  } else if (path === 'seminars') {
    currentList = seminarTypes
  }

  const getCorrectEventSet = eventObj => {
    let formatPath = path
    if (path === 'offerings') { formatPath = 'meditation' }
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
      return {
        location_title: eLoc.title,
        address: eLoc.address,
        phone: eLoc.phone,
        slug: eLoc.menu_slug,
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
    const eventsWithLocations = bindEventsToLocations(correctFlatEventSet)
    const thisLocationEvents = filterByLocation(eventsWithLocations)
    const thisTypeEvents = filterByType(thisLocationEvents)
    return thisTypeEvents
  }

  let fullyTransformedEventSet = fullyTransformTheseEvents(SAMPLE_DATA.events)



  const setActiveItemFilter = (element, matchedString) => {
    element.each((i, item) => {
      console.log($(item).text() === matchedString);
      $(item).text() === matchedString || $(item).text() === matchedString.toUpperCase()
        ? $(item).addClass('active')
        : $(item).removeClass('active')
    })
    element.click((e) => {
      e.preventDefault()
      matchedString = $(e.target).text()
      setActiveItemFilter(element, matchedString)
      fullyTransformedEventSet = fullyTransformTheseEvents(SAMPLE_DATA.events)

      // initDoc() << infinite loop
    })
    
    // if (opFunc) {
    //   opFunc()
    // }
  }

  const setActiveMenuItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a')
    let formatPath = path
    if (path === 'introductory') {
      formatPath = path + ' events'
    } else if (path === 'offerings') {
      formatPath = 'meditations'
    }
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

  const renderEventData = () => {
    let formatPath = path
    if (path === ('offerings')) {
      formatPath = 'meditation'
    }
    const detailsWrapper = $('.az-offerings-location-detail-wrapper')

    fullyTransformedEventSet.forEach(event => {
      if (detailsWrapper.children(`#${event.id}`).length < 1) {
        detailsWrapper.append(detailInner(event))
      }
    })
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
