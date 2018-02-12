webpackJsonp([1],{

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(122);

__webpack_require__(123);

__webpack_require__(124);

__webpack_require__(125);

var _url = __webpack_require__(128);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready($ => {

  $('img').each((i, img) => {
    $(img).attr('src').indexOf('localhost') !== -1 && $(img).attr('src', $(img).attr('src').replace('//localhost:3000', _url2.default));
    $(img).attr('srcset').indexOf('localhost') !== -1 && $(img).attr('srcset', $(img).attr('srcset').replace('//localhost:3000', _url2.default));
  });

  $('.gilded-first-letter').each((i, par) => {
    const pars = $(par).find('p');
    const firstPar = $(pars).first();
    console.log(firstPar);
    const txtContent = firstPar.text();
    const firstLetter = txtContent.substring(0, 1);
    const rest = txtContent.substring(1, txtContent.length);
    $(firstPar).addClass('first-par').empty().append(`<span class='first-letter'>${firstLetter}</span><span class='rest'>${rest}</span>`);
  });
}); // MASTER JS FILE - USE TO COMPILE OTHER MODULAR SCRIPTS
// (remember to run `webpack --watch` for changes to update live)

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cgoLogo = __webpack_require__(163);

var _cgoLogo2 = _interopRequireDefault(_cgoLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready(function ($) {
  const clonedMenu = $('nav .sf-menu').clone();
  let menuIsOpen = false;

  const replaceEntireHeader = () => {
    $('#top').children('.container').replaceWith(`
      <div class='az-header-container'>
        <div class='header-title'></div>
        <div class='nav-btn-wrapper'>
          <div id='nav-btn'>
            <span class='line'></span>
            <span class='line'></span>
            <span class='line'></span>
            <span class='line'></span>
          </div>
        </div>
        <div id='side-nav'>
          <div class='side-nav-inner'></div>
        </div>
      </div>
    `);
    $('.side-nav-inner').append(clonedMenu);
  };

  const formatLogo = () => {
    const titleSection = $('.az-header-container .header-title');
    // const logo = '✧'
    titleSection.empty();
    titleSection.append(`
      <div id='cgo-logo'>${_cgoLogo2.default}</div>
    `);
    titleSection.append(`
      <div class='title-wrapper'>
        <a href='/'>
          <div class='center-of'>CENTER OF</div>
          <div class='the-golden-one'>THE GOLDEN ONE</div>
        </a>
      </div>
    `);
  };

  const handleNavClick = () => {
    $('#nav-btn').click(() => {
      menuIsOpen = !menuIsOpen;
      const marginVal = menuIsOpen ? 0 : '-200px';
      $('#nav-btn').toggleClass('open');
      // $('#side-nav').toggle(200)
      $('#side-nav').animate({ 'margin-right': marginVal }, 200);
    });
    $('#nav-btn').hover(() => {
      $('#nav-btn .line').css('background-color', '#fab92a');
    }, () => {
      $('#nav-btn .line').css('background-color', 'black');
    });
  };

  // const extraNavIconFormatting = () => {
  //   $('.mobile-icon').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  //   $('.mobile-icon').children('*').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  //   $('.mobile-icon .lines::before, .mobile-icon .lines::after').hover(() => {
  //     $('.lines').attr('style', 'background-color: #fab92a !important')
  //   })
  // }

  const initHeader = (() => {
    // getTitleFromPath()
    replaceEntireHeader();
    handleNavClick();
    formatLogo();
  })();
});

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('footer');

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const url = 'http://kp0.60d.myftpupload.com';

exports.default = url;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const logo = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 78"><defs></defs><title>CGO_LogoMark</title><path class="cls-1" d="M169.2,356.93C255.52,238.13,279.93,0,279.93,0s24.42,238.13,110.72,356.93C471.28,468.07,560.44,500,560.44,500L279.93,780.89,0,500s88.56-32,169.2-143.11"/></svg>`;

exports.default = logo;

/***/ })

},[121]);