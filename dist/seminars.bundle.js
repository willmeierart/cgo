webpackJsonp([2],{

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(187);

__webpack_require__(3);

var _utils = __webpack_require__(5);

var _queries = __webpack_require__(188);

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready(function ($) {
  $('.az-upcoming-category').text('Seminars');

  const allLocations = _queries2.default.allLocations();
  console.log(allLocations);

  const setTopMenuActiveItem = () => {
    const subheadLinks = $('.az-offerings-submenu-wrapper a');
    (0, _utils.setActiveItemFilter)(subheadLinks, 'seminars');
  };

  const initDoc = () => {
    setTopMenuActiveItem();
  };
  initDoc();
});

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const API_BASE = 'http://104.130.1.140/data/';
const ops = { mode: 'cors', credentials: 'include' };

exports.default = {
  allLocations: () => {
    fetch(`${API_BASE}locationareas`, ops).then(res => {
      console.log(res.json());
      return res.json();
    }).catch(err => {
      console.warn(err);
    }).then(res => res);
  },
  location: id => {
    fetch(`${API_BASE}locations/?area=${id}`, ops).then(res => res.json()).catch(err => {
      console.warn(err);
    }).then(res => res);
  },
  allEvents: () => {
    fetch(`${API_BASE}events`, ops).then(res => res.json()).catch(err => {
      console.warn(err);
    }).then(res => res);
  },
  allEventsAtLocation: locationId => {
    fetch(`${API_BASE}events/?loc=${locationId}`, ops).then(res => res.json()).catch(err => {
      console.warn(err);
    }).then(res => res);
  },
  allEventsOfCourseType: courseTypeId => {
    fetch(`${API_BASE}events/?type=${courseTypeId}`, ops).then(res => res.json()).catch(err => {
      console.warn(err);
    }).then(res => res);
  },
  allEventsOfCourseTypeAtLocation: (locationId, courseTypeId) => {
    fetch(`${API_BASE}events/?loc=${locationId}&type=${courseTypeId}`, ops).then(res => res.json()).catch(err => {
      console.warn(err);
    }).then(res => res);
  }
};

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
const setActiveItemFilter = exports.setActiveItemFilter = (element, matchedString) => {
  element.each((i, item) => {
    jQuery(item).text() === matchedString || jQuery(item).text() === matchedString.toUpperCase() || jQuery(item).text() === matchedString.replace('_', ' ') ? jQuery(item).addClass('active') : jQuery(item).removeClass('active');
  });
};

/***/ })

},[186]);