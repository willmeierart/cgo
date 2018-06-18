import { API_PROXY, API_BASE, REAL_API } from './utils'
const ops = { mode: 'cors' }
// const ops = { mode: 'cors', credentials: 'include' }

// const local = true
const local = window.location.hostname === 'localhost'

export default {
  events: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : REAL_API}events`, ops)
    // const fetcher = await fetch(`${REAL_API}events`, ops)
    // const fetcher = await fetch(`http://104.130.1.140/data/events`, ops)
    const response = await fetcher.json()
    return response.data
  },
  cache: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}cache`, ops)
    const response = await fetcher.json()
    return response.data
  }
}
