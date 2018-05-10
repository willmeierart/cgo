webpackJsonp([6],{

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

const url = exports.url = 'http://kp0.60d.myftpupload.com';

const API_PROXY = exports.API_PROXY = 'http://104.131.7.39/data/';
const API_BASE = exports.API_BASE = 'http://104.130.1.140/data/';

// export const clonedMenu = () => jQuery(document).ready($ => {
//   isThin 
//     ? jQuery({ ...jQuery('.mobile-only .menu').clone() })
//     : jQuery({ ...jQuery('nav .sf-menu').clone() })
// })

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(172);

__webpack_require__(3);

var _cgoLogo = __webpack_require__(5);

var _cgoLogo2 = _interopRequireDefault(_cgoLogo);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready($ => {
  const formatHeaderText = () => {
    $('.header-title-text').prepend(`
      <div id='cgo-logo' class='header-logo'>${_cgoLogo2.default}</div>
    `).css({
      background: `url('${_utils.url}/wp-content/uploads/2018/05/purpose-header.jpg')`
    });
    $('.header-logo').css({
      height: '50px'
    }).children('svg').css({
      height: '2px'
    });
  };
  const init = (() => {
    formatHeaderText();
  })();
});

/***/ }),

/***/ 172:
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
const logo = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 78"><defs></defs><title>CGO_LogoMark</title><path class="cls-1" d="M169.2,356.93C255.52,238.13,279.93,0,279.93,0s24.42,238.13,110.72,356.93C471.28,468.07,560.44,500,560.44,500L279.93,780.89,0,500s88.56-32,169.2-143.11"/></svg>`;

exports.default = logo;

/***/ })

},[171]);