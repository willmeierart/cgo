webpackJsonp([5],{

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const splitPath = window.location.pathname.split('/');
const thisPage = exports.thisPage = splitPath[splitPath.length - 2];

const isThin = exports.isThin = jQuery(window).width() <= 1000;

const isMobile = exports.isMobile = typeof window.orientation !== 'undefined';

const url = exports.url = 'https://test.centerofthegoldenone.com';

const API_PROXY = exports.API_PROXY = 'http://104.131.7.39/data/';
const API_BASE = exports.API_BASE = 'http://104.130.1.140/data/';

// export const clonedMenu = () => jQuery(document).ready($ => {
//   isThin 
//     ? jQuery({ ...jQuery('.mobile-only .menu').clone() })
//     : jQuery({ ...jQuery('nav .sf-menu').clone() })
// })

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(181);

__webpack_require__(2);

__webpack_require__(7);

var _utils = __webpack_require__(1);

jQuery(document).ready(function ($) {
  const setHeaderImg = () => {
    $('.spiritual-lineage').find('.header-title-text').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/spiritual-lineage-header.jpg')`
    });
  };

  const initDoc = (() => {
    setHeaderImg();
  })();
});

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[180]);