require('es6-promise').polyfill()
import { API_PROXY, API_BASE, REAL_API } from './utils'
const ops = { mode: 'cors' }
const local = window.location.hostname === 'localhost'

export default {
  events: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : REAL_API}events`, ops)
    const response = await fetcher.json()
    return response.data
  },
  cache: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}cache`, ops)
    const response = await fetcher.json()
    return response.data
  }
}
