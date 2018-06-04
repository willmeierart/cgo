import '../../../../scss/pages/connect.scss'
import queries from '../../../queries'

jQuery(document).ready($ => {
  $('.first-name').attr('placeholder', 'FIRST NAME')
  $('.last-name').attr('placeholder', 'LAST NAME')
  $('.email').attr('placeholder', 'EMAIL ADDRESS')
  $('textarea').attr('placeholder', 'MESSAGE')
  $('option').first().prop('disabled', true)
})
