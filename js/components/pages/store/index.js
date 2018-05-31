import '../../../../scss/pages/store.scss'

jQuery(document).ready($ => {
  // console.log('shop');
  const rowEl = $('tbody').children('tr').last().children('td')
  // console.log(rowEl);
  rowEl.append(`
    <button type='submit' class='checkout-btn button'>Checkout</button>
  `)
  $('.checkout-btn').click(e => {
    e.preventDefault()
    window.location = '/checkout'
  })
})
