webpackJsonp([5],{

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(129);

var _utils = __webpack_require__(197);

jQuery(document).ready($ => {

  const setBtnBGs = () => {
    const btnColors = ['purple', 'orange', 'yellow', 'blue'];
    const mediaURL = _utils.url + '/wp-content/uploads/2018/02/btn_bg_';
    $('.home-nav-btn').each((i, btn) => {
      $(btn).css('background-image', `url('${mediaURL}${btnColors[i]}.jpg')`);
    });
  };
  const formatEndStatement = () => {
    const pars = $('.come-within p');
    const par = pars[pars.length - 1];
    const splitPar = $(par).text().split('. ');
    const newLinePar = splitPar.join('.\n');
    $(par).text(newLinePar);
  };

  const initDoc = () => {
    setBtnBGs();
    formatEndStatement();
  };
  initDoc();
});

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 197:
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

// export const clonedMenu = () => jQuery(document).ready($ => {
//   isThin 
//     ? jQuery({ ...jQuery('.mobile-only .menu').clone() })
//     : jQuery({ ...jQuery('nav .sf-menu').clone() })
// })

/***/ })

},[128]);