webpackJsonp([2],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setActiveItemFilter = exports.setActiveItemFilter = function setActiveItemFilter(element, matchedString) {
  element.each(function (i, item) {
    jQuery(item).text() === matchedString || jQuery(item).text() === matchedString.toUpperCase() || jQuery(item).text() === matchedString.replace('_', ' ') ? jQuery(item).addClass('active') : jQuery(item).removeClass('active');
  });
};

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(159);

var _utils = __webpack_require__(1);

jQuery(document).ready(function ($) {
  $('.az-upcoming-category').text('Seminars');

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a');
    (0, _utils.setActiveItemFilter)(subheadLinks, 'seminars');
  };

  const initDoc = () => {
    setTopMenuActiveItem();
  };
  initDoc();
});

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[158]);