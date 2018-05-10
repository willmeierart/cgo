import { url } from '../../../utils'

jQuery(document).ready(function($) {
  const formatTypesDescriptionBlocks = () => {
    const wrapper = $('.az-offerings-types-description-container')
    const innerWrapper = $(wrapper.find('.wpb_wrapper')[0])
    const txtBlocks = innerWrapper.children()
    const numChildren = txtBlocks.length
    const isOdd = numChildren % 2 === 1
    const numRows = isOdd ? numChildren / 2 + 1 : numChildren / 2
    innerWrapper.css({
      gridTemplateRows: `repeat(${numRows}, 1fr)`
    })
  }

  const setHeaderBG = () => {
    $('.top-banner').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/participate-header.png')`
    })
  }

  const initDoc = (() => {
    formatTypesDescriptionBlocks()
    setHeaderBG()
  })()
})