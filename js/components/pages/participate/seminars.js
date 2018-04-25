import '../../../../scss/pages/seminars.scss'
import '../../../../scss/pages/participate.scss'
import { setActiveItemFilter } from './utils'

jQuery(document).ready(function($) {
  $('.az-upcoming-category').text('Seminars')

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a')
    setActiveItemFilter(subheadLinks, 'seminars')
  }

  const initDoc = () => {
    setTopMenuActiveItem()
  }
  initDoc()
})
