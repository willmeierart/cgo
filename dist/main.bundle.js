webpackJsonp([1],{

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(123);

__webpack_require__(124);

__webpack_require__(125);

__webpack_require__(126);

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


jQuery(document).ready(function ($) {
  $('#search-btn, .cart-outer').remove();
  // $('.cart-outer').remove()

  var getTitleFromPath = function getTitleFromPath() {
    var pathname = window.location.pathname;

    var headerEl = $('#top row');
    var headerTitle = '';
    var exists = function exists(str) {
      return pathname.indexOf(str) !== -1;
    };
    switch (true) {
      case exists('offerings'):
        headerTitle = 'OUR OFFERINGS TO THE WORLD';
        break;
      default:
        headerTitle = '';
        break;
    }
    $('<div class=\'az-page-title\'><h1>' + headerTitle + '</h1></div>').insertAfter('#top .row .span_3');
  };

  var initHeader = function () {
    getTitleFromPath();
  }();
});

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('footer');

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })

},[122]);