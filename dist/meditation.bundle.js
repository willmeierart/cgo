webpackJsonp([3],{

/***/ 1:
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

/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(165);

var _utils = __webpack_require__(1);

jQuery(document).ready(function ($) {
  $('.az-upcoming-category').text('Upcoming Meditation Events');

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a');
    (0, _utils.setActiveItemFilter)(subheadLinks, 'meditation');
  };

  const initDoc = () => {
    setTopMenuActiveItem();
  };
  initDoc();
});

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[164]);