export const textMatches = (str1, str2) =>
  str1 === str2 ||
  str1.toLowerCase() === str2.toLowerCase() ||
  str1.toUpperCase() === str2.toUpperCase() ||
  str1.replace(/[^a-zA-Z0-9]/g, '_') === str2.replace(/[^a-zA-Z0-9]/g, '_') ||
  str1.replace(/[^a-zA-Z0-9]/g, '-') === str2.replace(/[^a-zA-Z0-9]/g, '-') ||
  str1.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase() === str2.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase() ||
  str1.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() === str2.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() ||
  str1.replace(/[^a-zA-Z0-9]/g, '-').toUpperCase() === str2.replace(/[^a-zA-Z0-9]/g, '-').toUpperCase() ||
  str1.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === str2.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()

export const setActiveItemFilter = (element, matchedString) => {
  element.each((i, item) => {
    const itemText = jQuery(item).text()
    textMatches(itemText, matchedString) ? jQuery(item).addClass('active') : jQuery(item).removeClass('active')
  })
}