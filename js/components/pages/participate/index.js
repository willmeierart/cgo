import moment from 'moment'
import '../../../../scss/pages/participate.scss'
import { setActiveItemFilter } from './utils'
import { detailInner, descriptionTxtBlock } from './templateElements'
import { SAMPLE_DATA, meditationTypes, introductoryTypes, seminarTypes } from './SAMPLE_DATA'

jQuery(document).ready(function($) {
  const { pathname } = window.location
  const splitPath = pathname.split('/')
  let path = splitPath[splitPath.length - 2]

  const isOfferingsPage = path === 'offerings'
  const isMeditationsPage = pathname.indexOf('meditation') !== -1
  const isIntroductoryPage = pathname.indexOf('introductory') !== -1
  const isSeminarsPage = pathname.indexOf('seminar') !== -1

  // maybe just for testing purposes, but make top-level 'offerings' behave like 'meditation' page
  if (isOfferingsPage) { path = 'meditation' }

  // global variables modified by filters for sorting events
  let activeLocationSlug = 'denver'
  let activeTypeFilter = 'all'
  const monthsExpanded = {}

  // use sample arrays for meditation data
  let currentList = meditationTypes
  if (path === 'introductory') {
    currentList = introductoryTypes
  } else if (path === 'seminars') {
    currentList = seminarTypes
  }

  // everything above has to do with dynamic page loads


  

  // this function will do more, deal with splitting and truncation of top description text
  const formatHeaderTypeDescription = () => {
    $('.az-offerings-header-description-text')
      .append(`<div class='read-more'>Read More...</div>`) // this will need to do more also
  }


  // replace dumbass wp theme wrappers with the raw html they're supposed to be
  // also dude, probably just like rewrite the css, fuck this...
  const ditchDescriptionBlockThemeWrappers = async () => {
    const eachWrapper = $('.az-offerings-types-description-container .wpb_wrapper').children('.wpb_raw_code')
    await $(eachWrapper).each((i, wrapper) => {
      const actualContent = $(wrapper).children('txt-block')
      console.log(actualContent);
      $('.az-offerings-types-description-container').prepend(actualContent)
    })
    await $('.az-offerings-types-description-container').children().each((i, child) => {
      if (!$(child).hasClass('txt-block')) {
        $(child).remove()
      }
    })
  }


  // these functions sort thru data
  const getCorrectEventSet = eventObj => {
    // get the actual event object
    // could be page-specific
    for (let eventType of Object.keys(eventObj)) {
      if (eventType === path) { return eventObj[eventType] }
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
    const eventsWithLocations = bindEventsToLocations(correctFlatEventSet)
    const thisLocationEvents = filterByLocation(eventsWithLocations)
    const thisTypeEvents = filterByType(thisLocationEvents)
    const splitEventObj = { Recurring: [] }
  
    thisTypeEvents.forEach(event => {
      if (event.recurring) {
        splitEventObj.Recurring.push(event)
      } else {
        const splitDate = event.date.split(' ')
        const month = splitDate[0] + '_' + splitDate[splitDate.length - 1]
        if (!splitEventObj[month]) {
          splitEventObj[month] = []
        }
        splitEventObj[month].push(event)
        monthsExpanded[month] = false
      }
    })
    return splitEventObj
  }

  let fullyTransformedEventSet = { ...fullyTransformTheseEvents(SAMPLE_DATA.events) }

  const refreshEventList = () => {
    const prevSet = { ...fullyTransformedEventSet }
    if (prevSet !== { ...fullyTransformTheseEvents(SAMPLE_DATA.events) }) {
      fullyTransformedEventSet = { ...fullyTransformTheseEvents(SAMPLE_DATA.events) }
      renderEventData()
    }
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
    const thisChild = $('.az-offerings-filter-item').children('a')
    setActiveItemFilter(thisChild, activeTypeFilter)
    thisChild.click(e => {
      activeTypeFilter = $(e.target).text()
      setActiveItemFilter(thisChild, activeTypeFilter)
      $('.az-offerings-location-detail-wrapper').empty()
      refreshEventList()
    })
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
        monthsExpanded[month] = !monthsExpanded[month]
        $(`.${month}`).children('*:not(i, svg)').toggle(300)
        $(`.${month}`).children('i').toggleClass('fa-angle-down fa-angle-up')
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
        detailsWrapper.append($(`<div class='date-category ${type}'>${type.replace('_', ' ')}</div>`))
        const expandIcon = monthsExpanded[type] ? 'down' : 'up'
        if (type !== 'Recurring') {
          $(`.${type}`).append(`<i class='fas fa-angle-down'></i>`)
        }
        fullyTransformedEventSet[type].forEach(event => {
          if ($(`.${type}`).children(`#${event.id}`).length < 1) {
            $(`.${type}`).append(detailInner(event))
          }
        })
        if (type !== 'Recurring') { $(`.${type}`).children('*:not(i, svg)').hide() }
      })
    }

    handleExpandingMonths()
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

    const menuItems = $('.az-offerings-locations-menu-item a')

    setActiveItemFilter(menuItems, activeLocationSlug)

    menuItems.each((i, item) => {
      $(item).append($(`<div class='active-line'></div>`))
      if (!$(item).hasClass('active')) {
        $(item).children('.active-line').hide()
      }
    })

    menuItems.click(e => {
      activeLocationSlug = $(e.target).text().replace(' ', '_')
      setActiveItemFilter(menuItems, activeLocationSlug)
      $('.az-offerings-location-detail-wrapper').empty()
      refreshEventList()
      menuItems.children('.active-line').hide()
      $(e.target).children('.active-line').show(250)
    })

    
  }

  function initDoc () {
    formatHeaderTypeDescription()
    // ditchDescriptionBlockThemeWrappers()
    renderTypesFilter()
    // renderTypesDescriptionBlocks()
    renderEventData()
    renderLocationsMenu()
  }

  initDoc()
})
