webpackJsonp([4],{

/***/ 1201:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1202);

var _utils = __webpack_require__(1208);

jQuery(document).ready(function ($) {
  $('.az-upcoming-category').text('Upcoming Introductory Events');

  var setTopMenuActiveItem = function setTopMenuActiveItem() {
    var subheadLinks = $('.az-offerings-submenu-wrapper a');
    (0, _utils.setActiveItemFilter)(subheadLinks, 'introductory');
  };

  var initDoc = function initDoc() {
    setTopMenuActiveItem();
  };
  initDoc();
});

/***/ }),

/***/ 1202:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1208:
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

/***/ })

},[1201]);