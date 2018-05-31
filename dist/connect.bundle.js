webpackJsonp([19],{

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

const url = exports.url = window.location.hostname === 'localhost' ? 'https://test.centerofthegoldenone.com' : '';

const API_PROXY = exports.API_PROXY = 'http://104.131.7.39/data/';
const API_BASE = exports.API_BASE = 'http://104.130.1.140/data/';

// export const clonedMenu = () => jQuery(document).ready($ => {
//   isThin 
//     ? jQuery({ ...jQuery('.mobile-only .menu').clone() })
//     : jQuery({ ...jQuery('nav .sf-menu').clone() })
// })

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(1);

const ops = { mode: 'cors'
  // const ops = { mode: 'cors', credentials: 'include' }

};const local = true;

exports.default = {
  events: async () => {
    const fetcher = await fetch(`${local ? _utils.API_PROXY : _utils.API_BASE}events`, ops);
    const response = await fetcher.json();
    return response.data;
  },
  cache: async () => {
    const fetcher = await fetch(`${local ? _utils.API_PROXY : _utils.API_BASE}cache`, ops);
    const response = await fetcher.json();
    return response.data;
  }
};

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(209);

var _queries = __webpack_require__(135);

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready($ => {

  const normalizeForm = () => {
    $('.minimal-form-input').each((i, f) => {
      const form = $(f).children();
      // console.log(form)
      $(f).replaceWith(form);
    });
  };

  const getData = async () => {
    const { localStorage } = window;
    if (!window.localStorage.CGOdata) {
      const data = await _queries2.default.events();
      localStorage.setItem('CGOdata', JSON.stringify(data));
    }
    return JSON.parse(localStorage.getItem('CGOdata'));
  };

  // const appendCenters = centers => {
  //   console.log(centers)
  //   centers.forEach(center => {
  //     const { title } = center
  //     $('.connect').find('select').append(`
  //       <option>${title}</option>
  //     `)
  //   })
  // }

  const submitForm = () => {
    let contactEmail = 'willmeierart@gmail.com';
    const form = $('form')[0];
    // const inputs = form.children('input')
    const name = form[0].value + ' ' + form[1].value;
    const email = form[2].value;
    const location = form[3].value;
    const msg = form[4].value;
    // switch (location) {
    //   case 'Denver - USA':
    //     contactEmail = 'michelle@miracle.org'
    //     break
    //   case 'Munich - Europe':
    //     contactEmail = 'karin.theisen@web.de'
    //     break
    //   case 'Latin America':
    //     contactEmail = 'rosa@miracle.org'
    //     break
    //   case 'Perth - Australia':
    //     contactEmail = 'gmpperth@gmail.com'
    //     break
    //   default:
    //     contactEmail = 'michelle@miracle.org'
    // }
    const space = '%20';
    const linebreak = '%0D%0A';
    const emailBody = `Name:${space}${name.replace(' ', space)}${linebreak}Is${space}inquiring${space}about${space}the${space}location:${space}${location.replace(' ', space)}.${linebreak}And${space}can${space}be${space}reached${space}at${space}${email}.${linebreak}Their${space}inquiry${space}is${space}as${space}follows:${linebreak}${msg.replace('', space).replace('\n', linebreak)}`;

    const encodedMsg = encodeURIComponent(emailBody);
    // console.log(name, email, location, msg, contactEmail, $(form), emailBody)

    // $(form).attr('action', `mailto:${contactEmail}?subject=Website Inquiry`)
    $(form).attr('action', `mailto:${contactEmail}?subject=Website${space}Inquiry&body=${emailBody}`);

    // console.log($(form).attr('action'))

    $('form').submit();
  };

  const formatWpcf7 = () => {
    $('.first-name').attr('placeholder', 'FIRST NAME');
    $('.last-name').attr('placeholder', 'LAST NAME');
    $('.email').attr('placeholder', 'EMAIL ADDRESS');
    $('textarea').attr('placeholder', 'MESSAGE');
    $('option').first().prop('disabled', true);
  };

  const init = () => {
    formatWpcf7();
    // setTimeout(() => {
    // normalizeForm()
    // }, 1000)
    $('button').click(e => {
      e.preventDefault();
      submitForm();
    });

    // const data = await getData()
    // const { locations: { centers } } = data
    // appendCenters(centers)


    // $('form').submit(e => {
    //   e.preventDefault()
    //   let contactEmail = 'willmeierart@gmail.com'
    //   const form = e.target
    //   // const inputs = form.children('input')
    //   const name = form[0].value + ' ' + form[1].value
    //   const email = form[2].value
    //   const location = form[3].value
    //   const msg = form[4].value
    //   // switch (location) {
    //   //   case 'Denver - USA':
    //   //     contactEmail = 'michelle@miracle.org'
    //   //     break
    //   //   case 'Munich - Europe':
    //   //     contactEmail = 'karin.theisen@web.de'
    //   //     break
    //   //   case 'Latin America':
    //   //     contactEmail = 'rosa@miracle.org'
    //   //     break
    //   //   case 'Perth - Australia':
    //   //     contactEmail = 'gmpperth@gmail.com'
    //   //     break
    //   //   default:
    //   //     contactEmail = 'michelle@miracle.org'
    //   // }
    //   const emailBody = `
    //     Name: ${name}

    //     Is inquiring about the location: ${location}.

    //     And can be reached at ${email}.

    //     Their inquiry is as follows:

    //     ${msg}
    //   `
    //   const encodedMsg = encodeURIComponent(emailBody)
    //   console.log(name, email, location, msg, contactEmail, $(form))

    //   $(form).attr('action', `mailto:${contactEmail}?subject=Inquiry&body=${encodedMsg}`)

    //   console.log($(form).attr('action'))
    //   $(form).submit()
    //   // switch ()

    // })
  };
  init();
});

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[208]);