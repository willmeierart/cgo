export const textMatches = (str1, str2) =>
  str1 === str2 ||
  str1.toLowerCase() === str2.toLowerCase() ||
  str1.toUpperCase() === str2.toUpperCase() ||
  str1.replace(/[^a-zA-Z]/g, '_') === str2.replace(/[^a-zA-Z]/g, '_') ||
  str1.replace(/[^a-zA-Z]/g, '-') === str2.replace(/[^a-zA-Z]/g, '-') ||
  str1.replace(/[^a-zA-Z]/g, '_').toUpperCase() === str2.replace(/[^a-zA-Z]/g, '_').toUpperCase() ||
  str1.replace(/[^a-zA-Z]/g, '_').toLowerCase() === str2.replace(/[^a-zA-Z]/g, '_').toLowerCase() ||
  str1.replace(/[^a-zA-Z]/g, '-').toUpperCase() === str2.replace(/[^a-zA-Z]/g, '-').toUpperCase() ||
  str1.replace(/[^a-zA-Z]/g, '-').toLowerCase() === str2.replace(/[^a-zA-Z]/g, '-').toLowerCase()

export const setActiveItemFilter = (element, matchedString) => {
  element.each((i, item) => {
    const itemText = jQuery(item).text()
    textMatches(itemText, matchedString) ? jQuery(item).addClass('active') : jQuery(item).removeClass('active')
  })
}