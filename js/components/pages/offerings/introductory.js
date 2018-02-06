import '../../../../scss/pages/introductory.scss'
import { setActiveItemFilter } from './utils'

jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Upcoming Introductory Events')

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a')
    setActiveItemFilter(subheadLinks, 'introductory')
  }
  
  const initDoc = () => {
    setTopMenuActiveItem()
  }
  initDoc()
})
