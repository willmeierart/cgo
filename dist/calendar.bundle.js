webpackJsonp([16],{1:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});const o=window.location.pathname.split("/");a.thisPage=o[o.length-2],a.isThin=jQuery(window).width()<=1e3,a.isMobile=void 0!==window.orientation,a.url=-1===window.location.hostname.indexOf("centerofthegoldenone")?"https://test.centerofthegoldenone.com":"",a.API_PROXY="http://104.131.7.39/data/",a.API_BASE="http://104.130.1.140/data/",a.REAL_API="https://apps.centerofthegoldenone.com/data/"},169:function(e,a,t){"use strict";var o=t(1);jQuery(document).ready(e=>{const{hash:a}=window.location,t=e(".az-offerings-submenu-wrapper.calendar").find("a");t.click(a=>{t.removeClass("active"),e(a.target).addClass("active")}),t.each((t,o)=>{e(o).hasClass("active")?a.toLowerCase().replace(/[^a-z]/g,"")!==e(o).text().toLowerCase().replace(/[^a-z]/g,"")&&e(o).removeClass("active"):a.toLowerCase().replace(/[^a-z]/g,"")===e(o).text().toLowerCase().replace(/[^a-z]/g,"")&&e(o).addClass("active")}),e(".calendar .top-banner").css({backgroundImage:`url('${o.url}/wp-content/uploads/2018/05/participate-header.jpg')`})})}},[169]);