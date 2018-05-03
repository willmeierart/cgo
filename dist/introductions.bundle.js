webpackJsonp([7],{

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(190);

__webpack_require__(4);

var _utils = __webpack_require__(6);

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

/***/ 190:
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
const textMatches = exports.textMatches = (str1, str2) => str1 === str2 || str1.toLowerCase() === str2.toLowerCase() || str1.toUpperCase() === str2.toUpperCase() || str1.replace(/[^a-zA-Z]/g, '_') === str2.replace(/[^a-zA-Z]/g, '_') || str1.replace(/[^a-zA-Z]/g, '-') === str2.replace(/[^a-zA-Z]/g, '-') || str1.replace(/[^a-zA-Z]/g, '_').toUpperCase() === str2.replace(/[^a-zA-Z]/g, '_').toUpperCase() || str1.replace(/[^a-zA-Z]/g, '_').toLowerCase() === str2.replace(/[^a-zA-Z]/g, '_').toLowerCase() || str1.replace(/[^a-zA-Z]/g, '-').toUpperCase() === str2.replace(/[^a-zA-Z]/g, '-').toUpperCase() || str1.replace(/[^a-zA-Z]/g, '-').toLowerCase() === str2.replace(/[^a-zA-Z]/g, '-').toLowerCase();

const setActiveItemFilter = exports.setActiveItemFilter = (element, matchedString) => {
  element.each((i, item) => {
    const itemText = jQuery(item).text();
    textMatches(itemText, matchedString) ? jQuery(item).addClass('active') : jQuery(item).removeClass('active');
  });
};

/***/ })

},[189]);