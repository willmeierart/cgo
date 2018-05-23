# Center of the Golden One

## VC Archive of custom 'CGO' theme for wordpress build

uses Webpack build tools to enable:
+ SASS styling
+ modular code-splitting of both js/css files for optimum performance
+ babel transpilation of ES6 code for cross-browser compatibility in modern syntax


developed by Will Meier at Agency Zero 2018 🤑

------------------

# FOR BEN:

**keep in mind that this is all written in ES6 and Sass, transpiled with webpack to traditional css. you can run `npm run webpack` to generate a `dist` folder that will have traditional js and css in it, but it will be minified/uglified beyond legibility... hopefully Sass isn't a problem to translate from...**

*at the time of writing this (3:15PM 05/23/18) the mobile footer styling is still not done*

*also, sorry about all the `!important` rules -- if you've worked with wordpress you know what it's like*


## Relevant files (maybe more, but most likely for sure these):

### JS (because some of the styling is dynamically applied):
* /js/components/index.js 
* /js/components/common/footer.js
* /js/components/common/header.js
* /js/components/common/menu.js

### SCSS:
* /scss/main.scss -- has footer and header scss
* /scss/_base.scss -- UI kit
* /scss/_menu.scss -- animated dropdown menu etc
* /scss/_variables.scss -- colors and fonts
* /scss/_normalize.scss -- maybe not relevant but it's underneath everything else
