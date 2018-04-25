import '../../../../scss/pages/meditation.scss'
import '../../../../scss/pages/participate.scss'
import { setActiveItemFilter } from './utils'

jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Upcoming Meditation Events')

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a')
    setActiveItemFilter(subheadLinks, 'meditation')
  }

  const initDoc = () => {
    setTopMenuActiveItem()
  }
  initDoc()
})
