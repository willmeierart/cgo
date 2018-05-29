webpackJsonp([4],{

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

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(185);

__webpack_require__(2);

__webpack_require__(7);

var _utils = __webpack_require__(1);

jQuery(document).ready($ => {
  $('.header-text').css({
    backgroundImage: `url('${_utils.url}/wp-content/uploads/2018/05/spiritual-paths-header-full.jpg')`
  });
  const setColMargins = () => {
    if (window.innerWidth < 1000) {
      $('.vc_col-sm-6').each((i, col) => {
        if ($(col).find('img').length < 1) {
          $(col).css({ margin: '2em', width: 'calc(100vw - 4em)' });
        }
      });
    }
  };
  const initDoc = () => {
    setColMargins();
    window.addEventListener('resize', setColMargins);
  };
});

/***/ }),

/***/ 185:
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

},[184]);