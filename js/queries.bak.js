import { API_PROXY, API_BASE } from './utils'
const ops = { mode: 'cors', credentials: 'include' }

const local = true

export default {
  allLocations: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}locationareas`, ops)
    const response = await fetcher.json()
    return response.data
  },
  location: async id => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}locations/?area=${id}`, ops)
    const response = await fetcher.json()
    return response.data
  },
  allCourseTypes: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}coursetypes`, ops)
    const response = await fetcher.json()
    return response.data
  },
  allCoursesOfType: async type => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}courses/?type=${type}`, ops)
    const response = await fetcher.json()
    return response.data
  },
  allRecurringEvents: async id => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}/courses/?event=${id}`, ops)
    const response = await fetcher.json()
    return response.data
  },
  allEvents: async () => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}events`, ops)
    const response = await fetcher.json()
    return response.data
  },
  allEventsAtLocation: async locationId => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}events/?loc=${locationId}`, ops)
    const response = await fetcher.json()
    return response.data
  },
  allEventsOfCourseType: async courseTypeId => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}events/?type=${courseTypeId}`, ops)
    const response = await fetcher.json()
    return response.data
  },
  allEventsOfCourseTypeAtLocation: async (locationId, courseTypeId) => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}events/?loc=${locationId}&type=${courseTypeId}`, ops)
    const response = await fetcher.json()
    return response.data
  },
  fullEventQuery: async (locationId, specCourseId) => {
    const fetcher = await fetch(`${local ? API_PROXY : API_BASE}events/?loc=${locationId}&course=${specCourseId}`, ops)
    const response = await fetcher.json()
    return response.data
  }
}