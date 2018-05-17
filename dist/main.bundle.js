webpackJsonp([2],{

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

/***/ 130:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var normalizeHeaderName = __webpack_require__(151);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(138);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(138);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(137)))

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _axios = __webpack_require__(147);

var _axios2 = _interopRequireDefault(_axios);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready($ => {
  // const agreementEndpoint = url + '/wp-json/wp/v2/pages/236'
  // let UAContent = ''

  // $('body').prepend('<div id="user-agreement-modal"></div>')

  // const fetchContent = async () => {
  //   const response = await axios.get(agreementEndpoint)
  //   const agreement = await response.data.content.rendered
  //   UAContent = agreement

  //   $('#user-agreement-modal').append(UAContent)

  //   $('#side-nav ul a').each((i, a) => {
  //     if($(a).text() === 'User Agreement'){
  //       $(a).click(e => {
  //         e.preventDefault()
  //         $('#user-agreement-modal').toggle()
  //         // alert(UAContent)
  //       })
  //     }
  //   })
  // }

  // const initDoc = async () => {
  //   await fetchContent()
  // }
  // initDoc()
});

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ 137:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(2);
var settle = __webpack_require__(152);
var buildURL = __webpack_require__(154);
var parseHeaders = __webpack_require__(155);
var isURLSameOrigin = __webpack_require__(156);
var createError = __webpack_require__(139);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(157);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(158);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(137)))

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(153);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ 140:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(130);

var _utils = __webpack_require__(1);

__webpack_require__(144);

__webpack_require__(145);

__webpack_require__(135);

__webpack_require__(166);

var _cgoLogo = __webpack_require__(5);

var _cgoLogo2 = _interopRequireDefault(_cgoLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready($ => {

  const ditchThemeImgAnimations = () => {
    $('.img-with-aniamtion-wrap').removeClass('img-with-aniamtion-wrap');
    $('.img-with-animation').removeClass('img-with-animation');
  };

  const addSmallLogos = () => {
    $('.logo-append-to').removeClass('logo-append-to').addClass('append-logo');
    $('.append-logo').each((i, sec) => {
      if ($(sec).children().length < 1) {
        $(sec).parent().append(`<div class='append-wrapper-${i}'></div>`);
        const sec2 = $(sec).clone();
        $(sec).remove();
        $(`.append-wrapper-${i}`).css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }).append(`<div class="cgo-logo-small">${_cgoLogo2.default}</div>`);
      } else {
        $(sec).append(`<div class="cgo-logo-small">${_cgoLogo2.default}</div>`);
      }
    });

    $('.prepend-logo').each((i, sec) => {
      if ($(sec).children().length < 1) {
        $(sec).parent().append(`<div class='prepend-wrapper-small-${i}'></div>`);
        const sec2 = $(sec).clone();
        $(sec).remove();
        $(`.prepend-wrapper-small-${i}`).css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }).append(`<div class="cgo-logo-small">${_cgoLogo2.default}</div>`);
      } else {
        $(sec).prepend(`<div class="cgo-logo-small">${_cgoLogo2.default}</div>`);
      }
    });

    $('.prepend-logo-medium').each((i, sec) => {
      if ($(sec).children().length < 1) {
        $(sec).parent().append(`<div class='prepend-wrapper-medium-${i}'></div>`);
        const sec2 = $(sec).clone();
        $(sec).remove();
        $(`.prepend-wrapper-medium-${i}`).css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }).append(`<div class="cgo-logo-medium">${_cgoLogo2.default}</div>`);
      } else {
        $(sec).prepend(`<div class="cgo-logo-medium">${_cgoLogo2.default}</div>`);
      }
    });
  };

  const flipMiddleSecOnMobile = () => {
    const pageNeedsFlippedMiddleSection = _utils.thisPage === 'spiritual-lineage';
    if (pageNeedsFlippedMiddleSection && _utils.isThin) {
      $('.middle-template-section .span_12').children('.vc_col-sm-6').each((i, sec) => {
        $('.middle-template-section .span_12').prepend(sec);
      });
    }
  };

  const handleLocalSrcSets = () => {
    if ($('img').length > 0) {
      $('img').each((i, img) => {
        if ($(img).attr('src') !== undefined && $(img).attr('src') !== '') {
          $(img).attr('src').indexOf('localhost') !== -1 && $(img).attr('src', $(img).attr('src').replace(/\/\/localhost:300\d/, _utils.url));
        }
        if ($(img).attr('srcset') !== undefined && $(img).attr('srcset') !== '') {
          $(img).attr('srcset').indexOf('localhost') !== -1 && $(img).attr('srcset', $(img).attr('srcset').replace(/\/\/localhost:300\d/, _utils.url));
        }
      });
    }
  };

  const formatGoldFirstLetter = () => {
    $('.gold-first-letter').addClass('gilded-first-letter');
    $('.gilded-first-letter').each((i, par) => {
      const pars = $(par).find('p');
      const firstPar = $(pars).first();
      const txtContent = firstPar.text();
      const firstLetter = txtContent.substring(0, 1);
      const rest = txtContent.substring(1, txtContent.length);
      $(firstPar).addClass('first-par').empty().append(`<span class='first-letter'>${firstLetter}</span><span class='rest'>${rest}</span>`);
    });
  };

  const prependAudioBtn = () => {
    $('.prepend-audio').css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }).prepend(`
      <a><img class='audio-btn' src='${_utils.url}/wp-content/uploads/2018/05/icon-audio.png' /></a>
    `);
    $('.audio-btn').css({
      maxWidth: '30px'
    }).hover(btn => {
      $(btn).css({
        filter: 'hue-rotate(90deg)'
      });
    });
  };

  const initDoc = (() => {
    ditchThemeImgAnimations();
    addSmallLogos();
    flipMiddleSecOnMobile();
    handleLocalSrcSets();
    prependAudioBtn();
    formatGoldFirstLetter();
  })();
}); // MASTER JS FILE - USE TO COMPILE OTHER MODULAR SCRIPTS
// (remember to run `webpack --watch` for changes to update live)

/***/ }),

/***/ 144:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _facebookIcon = __webpack_require__(214);

var _facebookIcon2 = _interopRequireDefault(_facebookIcon);

var _instagramIcon = __webpack_require__(215);

var _instagramIcon2 = _interopRequireDefault(_instagramIcon);

var _twitterIcon = __webpack_require__(216);

var _twitterIcon2 = _interopRequireDefault(_twitterIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready(function ($) {
  // const isThin = $(window).width() <= 1000
  // const clonedMenu = isThin ? $({
  //       ...$('.mobile-only .menu').clone()
  //     }) : $({ ...$('nav .sf-menu').clone() })

  $('#footer-outer h4').remove();

  // $('a').filter((x, b) => {
  //   return $(b).attr('href') === '/learn/spiritual-masters'
  // }).each((i, a) => {
  //     console.log(a);
  //     if (i !== 0) {
  //       // $(a).replaceWith($('a').children())
  //       console.log($(a).children());
  //     }
  //   })

  // $('#text-3 p').each((i, social) => {
  //   let className = ''
  //   const txtContent = $(social).text()
  //   switch (true) {
  //     case (txtContent.indexOf('facebook') !== -1) :
  //       className = 'facebook'
  //       break
  //     case (txtContent.indexOf('linkedin') !== -1) :
  //       className = 'linkedin'
  //       break
  //     default:
  //       break
  //   }
  //   $(social).replaceWith(`<a href='${txtContent}' target='_blank'><i class="fas fa-${className}"></i></a>`)

  // })

  const shuffleList = () => {
    const items = $('#footer-outer').find('li.menu-item');
    console.log(items);
    let twoGifts;
    let firstList;
    items.each((i, item) => {
      const txtContent = $(item).children('a').text();
      if (txtContent === 'Two Gifts') twoGifts = $(item);
      if (i === 0) firstList = item;
      if (txtContent === 'Shop' || txtContent === 'Gourasana' || txtContent === 'Kalindi' || txtContent === 'The Lady') $(item).remove();
      if (txtContent === 'Connect') $(item).addClass('top-lvl');
      if (txtContent === 'Spiritual Lineage') $(item).children('a').attr('href', '/explore/spiritual-lineage');
      // if (txtContent === 'Explore' || txtContent === 'Participate') {
      //   $(item).css({ cursor: 'default', pointerEvents: 'none' }).children({ cursor: 'pointer', pointerEvents: 'all' })
      // }
      if (txtContent === 'Participate') $(item).children('a').attr('href', '/participate/meditation');
      if (txtContent === 'Explore') $(item).children('a').attr('href', '/explore/purpose');
    });
    console.log(firstList);
    items.last().append(`
      <li class='menu-item top-marg'>
        <a href='#'>User Agreement</a>
      </li>
      <li class='menu-item'>
        <a href='#'>Privacy Policy</a>
      </li>
    `);
    const TGClone = twoGifts.clone().addClass('top-marg');
    $(firstList).append(TGClone);
    twoGifts.remove();
    items.first().parent().prepend(`
      <li class='menu-item top-lvl'>
        <a href='/'>Home</a>
      </li>
    `);
    $('#footer-outer').find('.top-marg').css({ marginTop: '2em' });
  };

  const appendSocialsAndCopyright = () => {
    const footer = $('#footer-widgets').find('.row');
    footer.append(`
      <div class='bottom-section'>
        <div class='socials-container'>
          <div class='facebook'></div>
          <div class='twitter'></div>
          <div class='instagram'></div>
        </div>
        <div class='copyright'>© Center of the Golden One, 2018</div>
      </div>
    `);
    $('.bottom-section').children('.socials-container').children('div').each((i, icon) => {
      if ($(icon).hasClass('facebook')) {
        $(icon).append(`
          <a>${_facebookIcon2.default}</a>
        `);
      } else if ($(icon).hasClass('twitter')) {
        $(icon).append(`
          <a>${_instagramIcon2.default}</a>
        `);
      } else if ($(icon).hasClass('instagram')) {
        $(icon).append(`
          <a>${_twitterIcon2.default}</a>
        `);
      }
    });
  };

  const init = (() => {
    shuffleList();
    appendSocialsAndCopyright();
  })();
});

/***/ }),

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cgoLogo = __webpack_require__(5);

var _cgoLogo2 = _interopRequireDefault(_cgoLogo);

var _cgoHeaderLogo = __webpack_require__(146);

var _cgoHeaderLogo2 = _interopRequireDefault(_cgoHeaderLogo);

var _utils = __webpack_require__(1);

__webpack_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready(function ($) {
  let menuIsOpen = false;

  const breakpoints = [1000];
  const isThin = $(window).width() <= 1000;
  console.log(menuIsOpen);

  const giveHeaderGradient = () => {
    $('body').prepend("<div class='header-gradient'></div>");
  };

  const clonedMenu = isThin ? $(_extends({}, $('.mobile-only .menu').clone())) : $(_extends({}, $('nav .sf-menu').clone()));

  console.log(clonedMenu);

  const handleCartDropdown = () => {
    let isWooCommercePg = false;
    console.log(window.location.pathname);
    const { pathname } = window.location;
    const path = pathname.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const pages = ['shop', 'cart', 'checkout', 'order', 'product'];
    const cartEl = $('#header-outer').children('.cart-outer');
    cartEl.hide(0);
    pages.forEach(pg => {
      if (path.indexOf(pg) !== -1) {
        isWooCommercePg = true;
      }
    });
    if (isWooCommercePg) {
      cartEl.show(0);
      cartEl.css({
        marginTop: '30px',
        position: 'relative'
      });
      cartEl.children('.cart-menu-wrap').css({
        width: '100px',
        height: '100px'
      });
      cartEl.find('.cart-menu').css({
        borderLeft: 'none'
      });
    }
    console.log(isWooCommercePg);
  };

  const makeWholeNewMenu = () => {
    const newMainList = $('<ul class="new-main-list"></ul>');
    // const subList = $('<ul class="new-sub-list"></ul>')
    const subLists = $('<div class="sub-lists"></div>');
    const tertList = $('<ul class="new-tert-list"></ul>');
    clonedMenu.children('li').each((i, li) => {
      const txtContent = $(li).children('a').text();
      const href = $(li).children('a').attr('href');
      const newListItem = $(`<li class="item"><a href="${href}">${txtContent}</a></li>`);
      newMainList.append(newListItem);
      if ($(li).children('ul').length > 0) {
        newListItem.addClass('has-children');
        const title = $(li).children('a').text();
        const subList = $(`<ul class="new-sub-list ${title}"></ul>`);
        subLists.append(subList);
        // const newSubmenu = $('<ul class="submenu-list"></ul>')
        // newListItem.append(newSubmenu)
        $(li).children('ul').children('li').each((j, subLi) => {
          const txtContent2 = $(subLi).children('a').text();
          const href2 = $(subLi).children('a').attr('href');
          const newSubListItem = $(`<li class='submenu-item'><a href="${href2}">${txtContent2}</a></li>`);
          subList.append(newSubListItem);
          if ($(subLi).children('ul').length > 0) {
            newSubListItem.addClass('has-children');
            // const newTertMenu = $('<ul class="tert-menu-list"></ul>')
            // newSubListItem.append(newTertMenu)
            $(subLi).children('ul').children('li').each((k, tertLi) => {
              const txtContent3 = $(tertLi).children('a').text();
              const href3 = $(tertLi).children('a').attr('href');
              const newTertListItem = $(`<li class='tert-menu-item'><a href="${href3}">${txtContent3}</a></li>`);
              tertList.append(newTertListItem);
            });
          }
        });
      }
    });
    return {
      main: newMainList,
      sub: subLists,
      tert: tertList
    };
  };

  const newMenu = makeWholeNewMenu();

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
          <div class='side-nav-inner'>
            <div class="inner-grid">
              <div class="col-1"></div>
              <div class="col-2"></div>
              <div class="col-3"></div>
            </div>
          </div>
        </div>
      </div>
    `);
    // .append(clonedMenu))
    $('#side-nav').css('display', 'none');
  };

  replaceEntireHeader();

  $('#top').find('.col-1').append(newMenu.main);
  $('#top').find('.col-2').append(newMenu.sub);
  $('#top').find('.col-3').append(newMenu.tert);

  const formatLogo = () => {
    const titleSection = $('.az-header-container .header-title');
    titleSection.empty();
    // titleSection.append(`
    //   <div id='cgo-logo'>${logo}</div>
    // `)
    // titleSection.append(`
    //   <div class='title-wrapper'>
    //     <a href='/'>
    //       <div class='center-of'>CENTER OF</div>
    //       <div class='the-golden-one'>THE GOLDEN ONE</div>
    //     </a>
    //   </div>
    // `)
    titleSection.append(`<a href='/' style='width: 200px;'>${_cgoHeaderLogo2.default}</a>`);
  };

  const handleNavClick = () => {
    $('#nav-btn').click(() => {
      menuIsOpen = !menuIsOpen;
      $('#nav-btn').toggleClass('open');
      menuIsOpen ? $('#side-nav').addClass('active') : $('#side-nav').removeClass('active');
      $('#side-nav').slideToggle();
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
    giveHeaderGradient();

    // replaceEntireHeader()
    handleNavClick();
    formatLogo();
    handleCartDropdown();
  })();
});

/***/ }),

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
const headerLogo = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 386 66.1" style="enable-background:new 0 0 386 66.1;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#D5A112;}
</style>
<g>
	<path class="st0" d="M7.6,16.1c3.9-5.4,5-16.1,5-16.1s1.1,10.8,5,16.1c3.6,5,7.7,6.5,7.7,6.5L12.6,35.3L0,22.6
		C0,22.6,4,21.1,7.6,16.1"/>
</g>
<polygon points="287.6,41.6 287.6,57.4 287.8,60.5 277.3,41.6 271.5,41.6 271.5,65.6 276.1,65.6 276.1,50.4 275.9,47.4 286.2,65.6 
	292.2,65.6 292.2,41.6 "/>
<polygon points="249.4,41.6 249.4,65.6 265,65.6 265,62 253.9,62 253.9,55.3 263.4,55.3 263.4,51.9 253.9,51.9 253.9,45.2 
	264.2,45.2 264.2,41.6 "/>
<polygon points="370.4,41.2 370.4,65.2 386,65.2 386,61.6 375,61.6 375,54.9 384.5,54.9 384.5,51.5 375,51.5 375,44.8 385.2,44.8 
	385.2,41.2 "/>
<polygon points="357.7,41.2 357.7,57 357.9,60 347.4,41.2 341.7,41.2 341.7,65.2 346.2,65.2 346.2,50 346.1,46.9 356.4,65.2 
	362.3,65.2 362.3,41.2 "/>
<g>
	<path d="M330.5,53.2c0,5-2.3,8.7-8,8.7c-5.3,0-7.7-4-7.7-8.8c0-4.9,2.4-8.6,7.9-8.6C327.9,44.6,330.5,48.3,330.5,53.2 M335.1,53.3
		c0-7.3-3.8-12.4-12.2-12.4c-7.9,0-12.9,4.4-12.9,12.3c0,7.6,4.2,12.5,12.2,12.5C330.6,65.6,335.1,61,335.1,53.3"/>
	<path d="M238.3,53.9c0,5.3-2.8,8.1-8.6,8.1h-3.8V45.3h3.1C235,45.3,238.3,48.1,238.3,53.9 M242.8,53.6c0-8.4-5.7-11.9-13.7-11.9
		h-7.7v24h7.9C237.7,65.7,242.8,61.9,242.8,53.6"/>
</g>
<polygon points="201.1,41.7 201.1,65.7 216.1,65.7 216.1,61.9 205.7,61.9 205.7,41.7 "/>
<g>
	<path d="M189.9,53.6c0,5-2.3,8.7-8,8.7c-5.3,0-7.7-4-7.7-8.8c0-4.9,2.4-8.6,7.9-8.6C187.4,45,189.9,48.7,189.9,53.6 M194.6,53.7
		c0-7.3-3.8-12.4-12.2-12.4c-7.9,0-12.9,4.4-12.9,12.3c0,7.6,4.2,12.5,12.2,12.5C190,66.1,194.6,61.4,194.6,53.7"/>
</g>
<polygon points="182,18.1 189.8,18.1 189.8,16.6 180.2,16.6 180.2,33 182,33 182,26 189.3,26 189.3,24.5 182,24.5 "/>
<g>
	<path d="M173.5,24.8c0,3.9-2,6.9-6.4,6.9c-4.1,0-6.2-3.2-6.2-6.9c0-3.8,2.1-6.8,6.3-6.8C171.3,18,173.5,20.9,173.5,24.8
		 M175.4,24.8c0-4.8-2.7-8.5-8-8.5c-5,0-8.4,3.2-8.4,8.4c0,5,2.9,8.5,8,8.5C172.3,33.3,175.4,29.9,175.4,24.8"/>
	<path d="M163.4,42.7c-1.4-0.5-3.3-1.3-7.1-1.3c-8.4,0-13,4.2-13,12.4c0,7.8,4.9,12.2,12.9,12.2c3,0,5.2-0.4,7.6-1.3V53h-4.6v9
		c-0.6,0.1-1.4,0.1-2.4,0.1c-4.9,0-8.8-2.7-8.8-8.7c0-6,3.7-8.2,8.2-8.2c2.9,0,4.1,0.4,5.9,0.9L163.4,42.7z"/>
	<path d="M142.2,25.2h-2.4v-7.1h2.9c2.6,0,3.8,1.1,3.8,3.6C146.6,24.3,144.7,25.2,142.2,25.2 M147.9,30.2l-2.6-4
		c2.2-0.8,3.2-2.6,3.2-4.6c0-3.4-2-5-5.3-5h-5.3V33h1.9v-6.3h2.2c0.5,0,0.9,0,1.3-0.1l3.4,5c1.6,2,3.1,2.4,3.9,2.5l0.4-1.6
		C150.5,32.4,149,31.6,147.9,30.2"/>
</g>
<polygon points="123.6,33 133.3,33 133.3,31.5 125.5,31.5 125.5,25.5 132.2,25.5 132.2,24 125.5,24 125.5,18.1 132.7,18.1 
	132.7,16.6 123.6,16.6 "/>
<polygon points="114.5,18.2 120.1,18.2 120.1,16.6 107,16.6 107,18.2 112.7,18.2 112.7,33 114.5,33 "/>
<polygon points="100.4,41.7 100.4,51.8 89,51.8 89,41.7 84.4,41.7 84.4,65.7 89,65.7 89,55.4 100.4,55.4 100.4,65.7 104.9,65.7 
	104.9,41.7 "/>
<polygon points="100.5,33 103.6,33 103.6,16.6 101.7,16.6 101.7,29.5 101.9,32 93.5,16.6 90.6,16.6 90.6,33 92.5,33 92.5,20 
	92.3,18.1 "/>
<polygon points="76.3,33 86,33 86,31.5 78.1,31.5 78.1,25.5 84.9,25.5 84.9,24 78.1,24 78.1,18.1 85.4,18.1 85.4,16.6 76.3,16.6 "/>
<g>
	<path d="M61.1,24.7c0-4.8,3.1-6.6,6.5-6.6c2.5,0,3.6,0.4,4.2,0.7l0.5-1.5c-0.3-0.1-1.7-0.8-4.7-0.8c-5.4,0-8.4,3.3-8.4,8.5
		c0,4.7,3.1,8.3,8.5,8.3c2.9,0,4.3-0.5,4.7-0.6l-0.5-1.5c-0.5,0.2-1.4,0.5-3.7,0.5C64.3,31.6,61.1,29.4,61.1,24.7"/>
</g>
<polygon points="59.2,41.6 59.2,45.3 67,45.3 67,65.6 71.6,65.6 71.6,45.3 79.4,45.3 79.4,41.6 "/>
<polygon points="113.1,41.6 113.1,65.6 128.7,65.6 128.7,62 117.6,62 117.6,55.3 127.1,55.3 127.1,51.9 117.6,51.9 117.6,45.2 
	127.9,45.2 127.9,41.6 "/>
</svg>
`;
exports.default = headerLogo;

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(148);

/***/ }),

/***/ 148:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var bind = __webpack_require__(136);
var Axios = __webpack_require__(150);
var defaults = __webpack_require__(131);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(141);
axios.CancelToken = __webpack_require__(164);
axios.isCancel = __webpack_require__(140);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(165);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ 149:
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(131);
var utils = __webpack_require__(2);
var InterceptorManager = __webpack_require__(159);
var dispatchRequest = __webpack_require__(160);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ 151:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(139);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
var transformData = __webpack_require__(161);
var isCancel = __webpack_require__(140);
var defaults = __webpack_require__(131);
var isAbsoluteURL = __webpack_require__(162);
var combineURLs = __webpack_require__(163);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(141);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(1);

jQuery(document).ready(function ($) {
  let initial = true;
  const test = false;
  let mobileMenuView = 0;

  const hardCodedVals = {
    col1w: 500,
    col2w: 390.2,
    col3w: 165.8,
    margin1: (window.innerWidth - 500) / 2,
    margin2: (window.innerWidth - 890.2) / 2,
    margin3: (window.innerWidth - 1051) / 2,
    test: true
  };

  const dynamicVals = {
    col1w: 0,
    col2w: 0,
    col3w: 0,
    margin1: 0,
    margin2: 0,
    margin3: 0
  };
  const dynamicValsReady = () => {
    let retVal = true;
    Object.keys(dynamicVals).forEach(key => {
      if (dynamicVals[key] === 0) {
        retVal = false;
      }
    });
    return retVal;
  };

  let VALS = !test && dynamicValsReady() ? dynamicVals : hardCodedVals;

  const adjustDynamicMarginsOnResize = () => {
    const { col1w, col2w, col3w } = VALS;
    VALS.margin1 = col1w === 0 ? 0 : (window.innerWidth - col1w) / 2;
    VALS.margin2 = col1w === 0 || col2w === 0 ? 0 : (window.innerWidth - (col1w + col2w)) / 2, VALS.margin3 = col1w === 0 || col2w === 0 || col3w === 0 ? 0 : (window.innerWidth - (col1w + col2w + col3w)) / 2;
  };

  const setDynamicVal = (propName, val) => {
    console.log('using Dynamic Vals:', dynamicValsReady() && !VALS.test);
    if (!dynamicValsReady()) {
      dynamicVals[propName] = val;
      switch (propName) {
        case 'col1w':
          dynamicVals.margin1 = (window.innerWidth - val) / 2;
          break;
        case 'col2w':
          dynamicVals.margin2 = (window.innerWidth - (dynamicVals.col1w + val)) / 2;
          break;
        case 'col3w':
          dynamicVals.margin3 = (window.innerWidth - (dynamicVals.col1w + dynamicVals.col2w + val)) / 2;
          break;
        default:
          console.log('invalid propName');
          break;
      }
      console.log('dynamicVals changed', dynamicVals);
      VALS = !test && dynamicValsReady() ? dynamicVals : hardCodedVals;
      return;
    } else {
      console.log('dynamicVals ready');
      return;
    }
  };

  $('#nav-btn').click(() => {
    setDynamicVal('col1w', getCol1Width());
  });

  const getCol1Width = () => $('#top').find('.inner-grid').children('.col-1').width();
  const getCol2Width = () => $('#top').find('.inner-grid').children('.col-2').width();
  const getCol3Width = () => $('#top').find('.inner-grid').children('.col-3').width();

  const col2isShown = () => $('#top').find('.inner-grid').children('.col-2').find('.new-sub-list').css('display') !== 'none';
  const col3isShown = () => $('#top').find('.inner-grid').children('.col-3').find('.new-tert-list').css('display') !== 'none';

  const handleInitialsDesktop = () => {
    $('#side-nav').css({ display: 'none' });
    $('#top').find('.inner-grid').children('.col-2').find('.new-sub-list').css({ display: 'none' });
    $('#top').find('.inner-grid').children('.col-3').children('.new-tert-list').css({ display: 'none' });
  };

  const handleAnimatingPos = amt => {
    const transform = `translate3d(${amt}px, 0, 0)`;

    const containerEl = $('#top').find('.inner-grid');
    if (initial) {
      initial = false;
      containerEl.css({ transform: `translate3d(${VALS.margin1}px, 0, 0)`, willChange: 'transform' });
    } else {
      containerEl.css({ transform, transition: 'transform 500ms ease-in' });
    }
    return;
  };

  const enableNewMenuClickFunctionality = () => {
    $('#side-nav li').each((i, li) => {
      const a = $(li).children('a');
      if ($(li).hasClass('has-children')) {
        $(li).children('a').first().append('<i class="fas fa-plus"></i>');
      }

      if ($(a).text() === 'Explore' || $(a).text() === 'Participate') {
        $(a).addClass('disable');
        $(li).click(e => {
          const thisIsOpen = $(li).hasClass('isOpen');
          const siblingIsOpen = $(li).siblings().hasClass('isOpen');
          const txt = $(li).text();
          const txt2 = txt === 'Explore' ? 'Participate' : 'Explore';

          e.preventDefault();
          $(li).siblings('.has-children').removeClass('isOpen').find('i').removeClass('fa-minus').addClass('fa-plus');
          $('.inner-grid').children('.col-2').find(`.${txt2}`).hide(0).siblings(`.${txt}`).slideToggle({
            duration: 200,
            complete: () => {
              setDynamicVal('col2w', getCol2Width());
            }
          });
          $('.inner-grid').children('.col-3').children('ul').hide(200);
          $('.inner-grid').children('.col-2').find('.has-children').removeClass('isOpen').find('i').removeClass('fa-minus').addClass('fa-plus');
          $(li).toggleClass('isOpen');
          $(li).find('i').toggleClass('fa-plus fa-minus');
          $(li).siblings().children('i').removeClass('fa-minus').addClass('fa-plus');
          const thisAmt = thisIsOpen ? VALS.margin1 : VALS.margin2;
          handleAnimatingPos(thisAmt);
        });
      }
    });
    $('.col-2').find('.submenu-item').each((i, subLi) => {
      if ($(subLi).hasClass('has-children')) {
        $(subLi).children('a').addClass('disable');
        $(subLi).click(e => {
          e.preventDefault();
          e.stopPropagation();
          const thisIsOpen = $(subLi).hasClass('isOpen');

          $(subLi).toggleClass('isOpen');
          $(subLi).find('i').toggleClass('fa-plus fa-minus');
          const tertList = $('.inner-grid').children('.col-3').children('ul');
          tertList.slideToggle({
            duration: 200,
            complete: () => {
              setDynamicVal('col3w', getCol3Width());
            }
          });
          const thisVal = thisIsOpen ? VALS.margin2 : VALS.margin3;
          handleAnimatingPos(thisVal);
        });
      }
    });
    $('.col-3').find('.tert-menu-item').click(e => {
      $('#side-nav').slideUp(200);
      $('#nav-btn').removeClass('open');
    });
  };

  const initAnimation = () => {
    $('#nav-btn').click(() => {
      if ($('#nav-btn').hasClass('open')) {
        handleAnimatingPos();
      }
    });
    $('#');
  };

  const handleMobileMenu = (newIdx, oldIdx) => {
    const w = window.innerWidth / 2;
    const views = [$('#top').find('.col-1'), $('#top').find('.col-2'), $('#top').find('.col-3')];
    const thisView = views[mobileMenuView];
    views.forEach(view => {
      if (view === thisView) {
        view.show();
      }
      const fadeOut = () => {
        if (view !== thisView) {
          view.fadeOut(150);
        }
      };
      //   view.show()
      // if (newIdx < oldIdx) {
      view.animate({ transform: `translate3d(${newIdx < oldIdx ? -w : w}, 0, 0)` }, {
        duration: '500ms',
        complete: fadeOut()
      });
      // } else if (newIdx > oldIdx) {

      // }
      // } else {

      // }
    });
  };

  const setMobileView = idx => {
    let oldIdx = mobileMenuView;
    mobileMenuView = idx;
    handleMobileMenu(mobileMenuView, oldIdx);
  };

  const initMobileMenu = () => {
    $('#side-nav li').each((i, li) => {
      const a = $(li).children('a');
      if ($(li).hasClass('has-children')) {
        $(li).children('a').first().append('<i class="fas fa-plus"></i>');
      }

      if ($(a).text() === 'Explore' || $(a).text() === 'Participate') {
        $(a).addClass('disable');
        $(li).click(e => {
          const thisIsOpen = $(li).hasClass('isOpen');
          const siblingIsOpen = $(li).siblings().hasClass('isOpen');
          const txt = $(li).text();
          const txt2 = txt === 'Explore' ? 'Participate' : 'Explore';

          e.preventDefault();
          $(li).siblings('.has-children').removeClass('isOpen').find('i').removeClass('fa-minus').addClass('fa-plus');
          $('.inner-grid').children('.col-2').find(`.${txt2}`).hide(0).siblings(`.${txt}`).slideToggle({
            duration: 200,
            complete: () => {
              setDynamicVal('col2w', getCol2Width());
            }
          });
          $('.inner-grid').children('.col-3').children('ul').hide(200);
          $('.inner-grid').children('.col-2').find('.has-children').removeClass('isOpen').find('i').removeClass('fa-minus').addClass('fa-plus');
          $(li).toggleClass('isOpen');
          $(li).find('i').toggleClass('fa-plus fa-minus');
          $(li).siblings().children('i').removeClass('fa-minus').addClass('fa-plus');
          const thisAmt = thisIsOpen ? VALS.margin1 : VALS.margin2;
          handleAnimatingPos(thisAmt);
        });
      }
    });
  };

  const initDoc = () => {
    let isLarge = window.innerWidth >= 1000;
    window.addEventListener('resize', () => {
      isLarge = window.innerWidth >= 1000;
      if (isLarge) {
        adjustDynamicMarginsOnResize();
      }
    });
    if (isLarge) {
      handleInitialsDesktop();
      enableNewMenuClickFunctionality();
      initAnimation();
    } else {
      handleMobileMenu();
    }
  };
  initDoc();
});

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(136);
var isBuffer = __webpack_require__(149);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 27 48" style="enable-background:new 0 0 27 48;" xml:space="preserve">
    <path d="M25.5,26.1l1.2-8.5h-9.2v-5.4c0-2.5,0.7-4.2,4.6-4.2L27,8V0.3C26.2,0.2,23.3,0,19.9,0C12.8,0,8,4,8,11.3v6.3H0v8.5h8V48h9.6
      V26.1H25.5z" style='fill: "gold";'/>
  </svg>
`;

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 42 42" style="enable-background:new 0 0 42 42;" xml:space="preserve">
    <path d="M21,12.7c-4.7,0-8.4,3.7-8.4,8.2c0,4.5,3.8,8.2,8.4,8.2c4.7,0,8.4-3.7,8.4-8.2C29.5,16.4,25.7,12.7,21,12.7 M37.3,17.8h-3.7
      c0.3,1.1,0.5,2.4,0.5,3.6c0,7-5.8,12.6-13.1,12.6C13.8,34,8,28.4,8,21.4c0-1.3,0.2-2.5,0.5-3.6H4.7v17.7c0,0.9,0.8,1.7,1.7,1.7h29.3
      c0.9,0,1.7-0.7,1.7-1.7V17.8z M30.6,4.7c-1,0-1.9,0.9-1.9,1.9v4.5c0,1,0.8,1.9,1.9,1.9h4.7c1,0,1.9-0.9,1.9-1.9V6.6
      c0-1-0.9-1.9-1.9-1.9H30.6z M5.4,0h31.2c3,0,5.4,2.4,5.4,5.4v31.2c0,3-2.4,5.4-5.4,5.4H5.4c-3,0-5.4-2.4-5.4-5.4V5.4
      C0,2.4,2.4,0,5.4,0" style='fill: "gold";'/>
  </svg>
`;

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 49.2 40" style="enable-background:new 0 0 49.2 40;" xml:space="preserve">
    <path d="M49.2,4.7c-1.8,0.8-3.8,1.3-5.8,1.6c2.1-1.2,3.7-3.2,4.4-5.6c-1.9,1.2-4.1,2-6.4,2.5C39.6,1.2,37,0,34.1,0
      C28.5,0,24,4.5,24,10.1c0,0.8,0.1,1.6,0.3,2.3C15.8,12,8.4,8,3.4,1.8C2.6,3.3,2.1,5.1,2.1,6.9c0,3.5,1.8,6.6,4.5,8.4
      c-1.7-0.1-3.2-0.5-4.6-1.3v0.1c0,4.9,3.5,9,8.1,9.9c-0.8,0.2-1.7,0.4-2.7,0.4c-0.7,0-1.3-0.1-1.9-0.2c1.3,4,5,6.9,9.4,7
      c-3.5,2.7-7.8,4.3-12.5,4.3c-0.8,0-1.6,0-2.4-0.1C4.5,38.3,9.8,40,15.5,40c18.6,0,28.7-15.4,28.7-28.7c0-0.4,0-0.9,0-1.3
      C46.2,8.5,47.9,6.8,49.2,4.7" style='fill: "gold";'/>
  </svg>
`;

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

},[143]);