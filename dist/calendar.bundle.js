webpackJsonp([11],{

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(196);

__webpack_require__(4);

jQuery(document).ready($ => {
  const { hash } = window.location;
  const a = $('.az-offerings-submenu-wrapper.calendar').find('a');
  a.click(e => {
    a.removeClass('active');
    $(e.target).addClass('active');
  });
  a.each((i, A) => {
    if ($(A).hasClass('active')) {
      if (hash.toLowerCase().replace(/[^a-z]/g, '') !== $(A).text().toLowerCase().replace(/[^a-z]/g, '')) {
        $(A).removeClass('active');
      }
    } else {
      if (hash.toLowerCase().replace(/[^a-z]/g, '') === $(A).text().toLowerCase().replace(/[^a-z]/g, '')) {
        $(A).addClass('active');
      }
    }
  });
});

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[195]);