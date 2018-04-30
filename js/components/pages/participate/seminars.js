import '../../../../scss/pages/seminars.scss'
import '../../../../scss/pages/participate.scss'
import { setActiveItemFilter } from './utils'
import queries from './queries'

jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Seminars')

  const allLocations = queries.allLocations()
  console.log(allLocations)

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a')
    setActiveItemFilter(subheadLinks, 'seminars')
  }

  const initDoc = () => {
    setTopMenuActiveItem()
  }
  initDoc()
})
