const splitPath = window.location.pathname.split('/')
export const thisPage = splitPath[splitPath.length - 2]

export const isThin = jQuery(window).width() <= 1000

export const isMobile = typeof window.orientation !== 'undefined'

export const url = window.location.hostname.indexOf('centerofthegoldenone') === -1 ? 'https://test.centerofthegoldenone.com' : ''

export const API_PROXY = 'http://104.131.7.39/data/'
export const API_BASE = 'http://104.130.1.140/data/'
export const REAL_API = 'https://apps.centerofthegoldenone.com/data/'

// export const clonedMenu = () => jQuery(document).ready($ => {
//   isThin 
//     ? jQuery({ ...jQuery('.mobile-only .menu').clone() })
//     : jQuery({ ...jQuery('nav .sf-menu').clone() })
// })
