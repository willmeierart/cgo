jQuery(document).ready($ => {
  const mediaEl = $('body').find('.media-url')
  const url = mediaEl.text()
  mediaEl.replace(`<audio src="${url}"></audio>`)
})