import '../../../../scss/pages/spiritualLineage.scss'
import '../../../../scss/pages/explore.scss'
import { url } from '../../../utils'

jQuery(document).ready(function($) {
  const setHeaderImg = () => {
    $('.spiritual-lineage').find('.header-title-text').css({
      backgroundImage: `url('${url}/wp-content/uploads/2018/05/spiritual-lineage-header.png')`
    })
  }

  const initDoc = (() => {
    setHeaderImg()
  })()
})