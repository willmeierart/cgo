import { API_PROXY, API_BASE } from './utils'
const ops = { mode: 'cors' }
// const ops = { mode: 'cors', credentials: 'include' }

const local = false
// const local = window.location.hostname === 'localhost'

export default {
  events: async () => {
    // const fetcher = await fetch(`${local ? API_PROXY : API_BASE}events`, ops)
    const fetcher = await fetch(`https://104.130.1.140/data/events`, ops)
    const response = await fetcher.json()
    return response.data
  },
  cache: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}cache`, ops)
    const response = await fetcher.json()
    return response.data
  }
}
