webpackJsonp([15],{

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(205);

jQuery(document).ready($ => {
  // console.log('shop');
  const rowEl = $('tbody').children('tr').last().children('td');
  // console.log(rowEl);
  rowEl.append(`
    <button type='submit' class='checkout-btn button'>Checkout</button>
  `);
  $('.checkout-btn').click(e => {
    e.preventDefault();
    window.location = '/checkout';
  });
});

/***/ }),

/***/ 205:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[204]);