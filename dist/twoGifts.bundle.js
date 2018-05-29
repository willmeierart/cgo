webpackJsonp([9],{

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

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(187);

__webpack_require__(2);

var _utils = __webpack_require__(1);

jQuery(document).ready(function ($) {
  const setHeaderImgs = () => {
    $('.top-banner').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-headerstandardized.jpg')`
    });
    $('.breaker-1').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-la-banner-01.jpg')`
    });
    $('.breaker-2').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-la-banner-02.jpg')`
    });
    $('.breaker-3').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-la-banner-03.jpg')`
    });
    $('.breaker-4').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-gmp-banner-01.jpg')`
    });
    $('.breaker-5').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-gmp-banner-02.jpg')`
    });
    $('.breaker-6').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-gmp-banner-03.jpg')`
    });
  };
  const setButton = () => {
    $('.two-gifts-button').css({
      backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/2gifts-button.png')`
    });
  };

  const initDoc = () => {
    setHeaderImgs();
    setButton();
  };
  initDoc();
});

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[186]);