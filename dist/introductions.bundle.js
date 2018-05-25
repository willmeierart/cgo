webpackJsonp([11],{

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(193);

__webpack_require__(4);

var _utils = __webpack_require__(6);

jQuery(document).ready(function ($) {
  $('.az-upcoming-category').text('Upcoming Introductory Events');

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a');
    (0, _utils.setActiveItemFilter)(subheadLinks, 'introductory');
  };

  const initDoc = () => {
    // setTopMenuActiveItem()
  };
  initDoc();
});

/***/ }),

/***/ 193:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const textMatches = exports.textMatches = (str1, str2) => {
  return str1 === str2 || str1.toLowerCase() === str2.toLowerCase() || str1.toUpperCase() === str2.toUpperCase() || str1.replace(/[^a-zA-Z0-9]/g, '_') === str2.replace(/[^a-zA-Z0-9]/g, '_') || str1.replace(/[^a-zA-Z0-9]/g, '-') === str2.replace(/[^a-zA-Z0-9]/g, '-') || str1.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase() === str2.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase() || str1.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() === str2.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() || str1.replace(/[^a-zA-Z0-9]/g, '-').toUpperCase() === str2.replace(/[^a-zA-Z0-9]/g, '-').toUpperCase() || str1.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() === str2.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
};

const setActiveItemFilter = exports.setActiveItemFilter = (element, matchedString) => {
  element.each((i, item) => {
    const itemText = jQuery(item).text();
    textMatches(itemText, matchedString) ? jQuery(item).addClass('active') : jQuery(item).removeClass('active');
  });
};

/***/ })

},[192]);