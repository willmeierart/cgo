import moment from 'moment'
import '../../../../scss/pages/seminars.scss'
import '../../../../scss/pages/participate.scss'
import { setActiveItemFilter } from './utils'
import queries from '../../../queries'

jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Seminars')

  const pageTitle = 'Seminars'

  // const fetchData = async () => {
  //   const courseTypes = await queries.allCourseTypes()
  //   const thisType = courseTypes.filter(c => c.Title === pageTitle)
  //   const id = thisType[0].Id
  //   const theseCourses = await queries.allEventsOfCourseType(id)
  //   console.log(theseCourses)
  //   return theseCourses
  // }

  // const renderData = courseData => {
  //   const formatTime = D => {
  //     const dateParts = D.split('-')
  //     const dateTimeSplit = dateParts[dateParts.length - 1].split('T')
  //     const timeParts = dateTimeSplit[1].split(':')
  //     const isPM = timeParts[0] > 12
  //     console.log(dateParts, timeParts);
  //     const formatDate = `${dateParts[1]}/${dateTimeSplit[0]}/${dateParts[0]}`
  //     const formatTime = isPM
  //       ? `${timeParts[0] % 12}:${timeParts[1]} PM`
  //       : `${timeParts[0]}:${timeParts[1]} AM`
  //     return { date: formatDate, time: formatTime }
  //   }
  //   console.log(courseData)
  //   const relevantData = courseData.map(course => ({
  //     title: course.Title,
  //     url: course.RegUrl,
  //     time: {
  //       start: formatTime(course.StartTime),
  //       end: formatTime(course.EndTime),
  //       notes: course.TimeNote
  //     },
  //     cost: {
  //       price: course.Price,
  //       notes: course.PriceNotes
  //     },
  //     notes: course.OtherNotes
  //     // location: await queries.location(course.LocationId)
  //   }))
  //   console.log(relevantData)
  // }

  

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a')
    setActiveItemFilter(subheadLinks, 'seminars')
  }

  const initDoc = async () => {
    setTopMenuActiveItem()    
    // const courseData = await fetchData()
    // await renderData(courseData)
  }
  initDoc()
})
