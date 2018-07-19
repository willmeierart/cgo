const splitPath = window.location.pathname.split('/')
export const thisPage = splitPath[splitPath.length - 2]

export const isThin = jQuery(window).width() <= 1000

export const isMobile = typeof window.orientation !== 'undefined'

export const url = 'https://test.centerofthegoldenone.com'

export const isIE = window.navigator.userAgent.indexOf('indows') !== -1

export const API_PROXY = 'http://104.131.7.39/data/'
export const API_BASE = 'http://104.130.1.140/data/'
export const REAL_API = 'https://apps.centerofthegoldenone.com/data/'
