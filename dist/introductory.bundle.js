webpackJsonp([5],{

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(183);

__webpack_require__(3);

var _utils = __webpack_require__(5);

jQuery(document).ready(function ($) {
  $('.az-upcoming-category').text('Upcoming Introductory Events');

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a');
    (0, _utils.setActiveItemFilter)(subheadLinks, 'introductory');
  };

  const initDoc = () => {
    setTopMenuActiveItem();
  };
  initDoc();
});

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const setActiveItemFilter = exports.setActiveItemFilter = (element, matchedString) => {
  element.each((i, item) => {
    jQuery(item).text() === matchedString || jQuery(item).text() === matchedString.toUpperCase() || jQuery(item).text() === matchedString.replace('_', ' ') ? jQuery(item).addClass('active') : jQuery(item).removeClass('active');
  });
};

/***/ })

},[182]);