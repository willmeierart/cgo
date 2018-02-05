jQuery(document).ready(function($) { 
  $('#search-btn, .cart-outer').remove()
  // $('.cart-outer').remove()

  const getTitleFromPath = () => {
    const { pathname } = window.location
    const headerEl = $('#top row')
    let headerTitle = ''
    const exists = str => pathname.indexOf(str) !== - 1
    switch (true) {
      case (exists('offerings')) :
        headerTitle = 'OUR OFFERINGS TO THE WORLD'
        break;
      default:
        headerTitle = ''
        break;
    }
    $(`<div class='az-page-title'><h1>${headerTitle}</h1></div>`).insertAfter('#top .row .span_3')
  }

  const initHeader = (() => {
    getTitleFromPath()
  })()
})
