export const setActiveItemFilter = (element, matchedString) => {
  element.each((i, item) => {
    jQuery(item).text() === matchedString ||
    jQuery(item).text() === matchedString.toUpperCase() ||
    jQuery(item).text() === matchedString.replace('_', ' ')
      ? jQuery(item).addClass('active')
      : jQuery(item).removeClass('active')
  })
}
