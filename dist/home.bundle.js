webpackJsonp([5],{1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=window.location.pathname.split("/");t.thisPage=i[i.length-2],t.isThin=jQuery(window).width()<=1e3,t.isMobile=void 0!==window.orientation,t.url=-1===window.location.hostname.indexOf("centerofthegoldenone")?"https://test.centerofthegoldenone.com":"",t.API_PROXY="http://104.131.7.39/data/",t.API_BASE="http://104.130.1.140/data/",t.REAL_API="https://apps.centerofthegoldenone.com/data/"},142:function(e,t,n){"use strict";n(7),n(143);var i=n(1);jQuery(document).ready(function(e){var t,n,o,s,a;t=i.url+"/wp-content/uploads/2018/06/CGO-Button",e(".meditation-btn").css("background-image","url('"+t+"-Meditation-1.0.jpg')"),e(".seminars-btn").css("background-image","url('"+t+"-Seminars-1.0.jpg')"),e(".teachings-btn").css("background-image","url('"+t+"-Teachings-1.0.jpg')"),e(".lineage-btn").css("background-image","url('"+t+"-SpiritualLineage-1.0.jpg')"),n=e(".come-within p"),o=n[n.length-1],s=e(o).text().split(". ").join(".\n"),e(o).text(s),(a=e(".section-title").children("h2")).text(a.text().split("?")[0]).append('<span class="gold-letter-normal">?</span>')})},143:function(e,t,n){"use strict";var i,o=n(1),s=n(2);(i=s)&&i.__esModule;n(7),jQuery(document).ready(e=>{const t=o.url+"/wp-content/uploads/2018/06/home-header-rose",n=e(".each-rose").children("img")[0];let i=n.getBoundingClientRect().width,s=(window.innerWidth-i)/2;window.addEventListener("resize",()=>{window.innerWidth<788&&(i=n.getBoundingClientRect().width,e(".each-rose").children("img").css({maxWidth:"788px",maxHeight:"788px"})),console.log(e(".rose-5 img").css("padding")),s=(window.innerWidth-i)/2});window.location.host.includes("localhost");(()=>{let n=4,i=3;[0,0,0,0].forEach((n,i)=>{const o=i+1;e("#rosetta-container").append(e(`\n        <div class='each-rose rose-${o}' >\n          <img src='${t}0${o}.jpg' />\n        </div>\n      `).css({zIndex:o,opacity:o>3?1:0,willChange:"opacity"}))}),e(".rose-logo-wrapper").css({zIndex:10,position:"absolute",display:"flex",alignItems:"flex-end",justifyContent:"center",width:"100%",height:"100%",color:"#CDA33A",bottom:0}).children("#rosetta-logo").css({height:`${Math.min(e("#rosetta-container").width(),788)}px`,display:"flex",alignItems:"center"}),n=5,i=4,e(".each-rose").children("img").css({maxWidth:"788px",maxHeight:"788px",height:"100%"});const o=()=>{0===n&&(n=5),0===i&&(i=5),e(`.rose-${i}`).css({opacity:1,zIndex:i<n?i:n}),e(`.rose-${n}`).css({zIndex:n>i?n:i}).delay(200).animate({opacity:0},{duration:5e3,specialEasing:"ease-in",clearQueue:!0,complete:()=>{n--,i--,setTimeout(()=>{o()},160)}})};window.requestAnimationFrame(o)})(),window.addEventListener("resize",()=>{e("#rosetta-logo").css({height:`${Math.min(e("#rosetta-container").width(),788)}px`})})})},2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default='<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 78"><defs></defs><title>CGO_LogoMark</title><path class="cls-1" d="M169.2,356.93C255.52,238.13,279.93,0,279.93,0s24.42,238.13,110.72,356.93C471.28,468.07,560.44,500,560.44,500L279.93,780.89,0,500s88.56-32,169.2-143.11"/></svg>'},7:function(e,t){}},[142]);