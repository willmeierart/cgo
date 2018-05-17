webpackJsonp([3],{

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

/***/ 142:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(142);

__webpack_require__(168);

var _utils = __webpack_require__(1);

jQuery(document).ready($ => {

  const setBtnBGs = () => {
    // const btnColors = ['purple', 'orange', 'yellow', 'blue']
    // const mediaURL = url + '/wp-content/uploads/2018/02/btn_bg_'
    const mediaURL = _utils.url + '/wp-content/uploads/2018/04/home-button-0';
    $('.home-nav-btn').each((i, btn) => {
      $(btn).css('background-image', `url('${mediaURL}${i + 1}.png')`);
    });
  };

  const formatSectionTitle = () => {
    const h2el = $('.section-title').children('h2');
    h2el.text(h2el.text().split('?')[0]).append('<span class="gold-letter-normal">?</span>');
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
    formatSectionTitle();
  };
  initDoc();
});

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(1);

var _cgoLogo = __webpack_require__(5);

var _cgoLogo2 = _interopRequireDefault(_cgoLogo);

__webpack_require__(169);

__webpack_require__(142);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready($ => {

  const rosePfx = _utils.url + '/wp-content/uploads/2018/05/home-header-rose';
  const imgSize = 788;
  const imgWPix = `${imgSize}px`;
  const imgEl = $('.each-rose').children('img')[0];
  const roseRect = imgEl.getBoundingClientRect();
  console.log(roseRect);
  let roseRealWidth = roseRect.width;
  let roseMargin = (window.innerWidth - roseRealWidth) / 2;

  console.log(roseRealWidth);

  window.addEventListener('resize', () => {
    if (window.innerWidth < imgSize) {
      console.log('reeval roseRealWidth');
      roseRealWidth = imgEl.getBoundingClientRect().width;
      $('.each-rose').children('img').css({ maxWidth: imgWPix, maxHeight: imgWPix /*marginLeft: roseMargin*/ });
    }
    roseMargin = (window.innerWidth - roseRealWidth) / 2;
  });

  console.log(window.location);
  const isLocal = window.location.host.includes('localhost');

  if (isLocal) {
    console.log('isLocal');
    const rawSrc = $('.rose-5 img').attr('src');
    $('.rose-5 img').attr('src', _utils.url + rawSrc);
    console.log($('.rose-5 img').attr('src'));
  }

  const createRosettas = () => {
    let i = 4;
    let j = 3;
    const slots = [0, 0, 0, 0];
    slots.forEach((x, k) => {
      console.log(x, k);
      const num = k + 1;
      $('#rosetta-container').append($(`
        <div class='each-rose rose-${num}' >
          <img src='${rosePfx}0${num}.jpg' />
        </div>
      `).css({
        zIndex: num,
        opacity: num > 3 ? 1 : 0,
        willChange: 'opacity'
      }));
    });

    $('#rosetta-container').append(`
      <div class='rose-logo-wrapper'>
        <div id='rosetta-logo'>${_cgoLogo2.default}</div>
      </div>
    `);

    $('.rose-logo-wrapper').css({
      zIndex: 10,
      position: 'absolute',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      color: '#CDA33A',
      bottom: 0
    }).children('#rosetta-logo').css({
      height: `${Math.min($('#rosetta-container').width(), imgSize)}px`,
      display: 'flex',
      alignItems: 'center'
    });

    $('#rosetta-container').css({
      height: '100%'
    });

    i = 5;
    j = 4;

    $('.each-rose').children('img').css({
      maxWidth: imgWPix,
      maxHeight: imgWPix /*marginLeft: roseMargin*/
      , height: '100%'
    });

    const animateFunc = () => {
      // console.log('animaterose')
      if (i === 0) i = 5;
      if (j === 0) j = 5;
      $(`.rose-${j}`).css({
        opacity: 1,
        zIndex: j < i ? j : i
        // backgroundBlendMode: 'normal'
      });
      $(`.rose-${i}`).css({
        zIndex: i > j ? i : j
        // mixBlendMode: 'difference'
        // mixBlendMode: i % 2 === 0 ? 'overlay' : 'multiply'
      }).delay(200).animate({ opacity: 0 }, {
        duration: 5000,
        specialEasing: 'ease-in',
        clearQueue: true,
        complete: () => {
          i--;
          j--;
          setTimeout(() => {
            animateFunc();
          }, 160);
          // window.requestAnimationFrame(animateFunc)            
        }
      });
    };
    window.requestAnimationFrame(animateFunc);
    // animateFunc()
  };

  const initDoc = () => {
    $('.rose-5 img').load(() => {
      createRosettas();
    });
  };
  initDoc();
  window.addEventListener('resize', () => {
    // $('#rosetta-container').css({
    //   height: $('#rosetta-container').width()
    // })
    // $('.rose-logo-wrapper').css({
    //   height: $('#rosetta-container').width()
    // })
    // $('.each-rose').children('img').css({
    //   height: $('#rosetta-container').width()
    // })
    $('#rosetta-logo').css({
      height: `${Math.min($('#rosetta-container').width(), imgSize)}px`
    });
  });
});

/***/ }),

/***/ 169:
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

},[167]);