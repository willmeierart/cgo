webpackJsonp([9],{1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const o=window.location.pathname.split("/");e.thisPage=o[o.length-2],e.isThin=jQuery(window).width()<=1e3,e.isMobile=void 0!==window.orientation,e.url="localhost"===window.location.hostname?"https://test.centerofthegoldenone.com":"",e.API_PROXY="http://104.131.7.39/data/",e.API_BASE="http://104.130.1.140/data/"},172:function(t,e,a){"use strict";a(173);var o,n=a(6);(o=n)&&o.__esModule;jQuery(document).ready(t=>{t(".first-name").attr("placeholder","FIRST NAME"),t(".last-name").attr("placeholder","LAST NAME"),t(".email").attr("placeholder","EMAIL ADDRESS"),t("textarea").attr("placeholder","MESSAGE"),t("option").first().prop("disabled",!0)})},173:function(t,e){},6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(1);const n={mode:"cors"},i="localhost"===window.location.hostname;e.default={events:async()=>{const t=await fetch(`${i?o.API_PROXY:o.API_BASE}events`,n);return(await t.json()).data},cache:async()=>{const t=await fetch(`${i?o.API_PROXY:o.API_BASE}cache`,n);return(await t.json()).data}}}},[172]);