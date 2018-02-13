const splitPath = window.location.pathname.split('/')
export const thisPage = splitPath[splitPath.length - 2]

export const isThin = jQuery(window).width() <= 1000

export const isMobile = typeof window.orientation !== 'undefined'

export const url = 'http://kp0.60d.myftpupload.com'

// export const clonedMenu = () => jQuery(document).ready($ => {
//   isThin 
//     ? jQuery({ ...jQuery('.mobile-only .menu').clone() })
//     : jQuery({ ...jQuery('nav .sf-menu').clone() })
// })
