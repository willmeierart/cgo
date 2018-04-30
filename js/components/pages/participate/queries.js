const API_BASE = 'http://104.130.1.140/data/'
const ops = { mode: 'cors', credentials: 'include' }

export default {
  allLocations: () => {
    fetch(`${API_BASE}locationareas`, ops)
      .then(res => {
        console.log(res.json())
        return res.json()
      })
      .catch(err => { console.warn(err) })
      .then(res => res)
  },
  location: id => {
    fetch(`${API_BASE}locations/?area=${id}`, ops)
      .then(res => res.json())
      .catch(err => { console.warn(err) })
      .then(res => res)
  },
  allEvents: () => {
    fetch(`${API_BASE}events`, ops)
      .then(res => res.json())
      .catch(err => { console.warn(err) })
      .then(res => res)
  },
  allEventsAtLocation: locationId => {
    fetch(`${API_BASE}events/?loc=${locationId}`, ops)
      .then(res => res.json())
      .catch(err => { console.warn(err) })
      .then(res => res)
  },
  allEventsOfCourseType: courseTypeId => {
    fetch(`${API_BASE}events/?type=${courseTypeId}`, ops)
      .then(res => res.json())
      .catch(err => { console.warn(err) })
      .then(res => res)
  },
  allEventsOfCourseTypeAtLocation: (locationId, courseTypeId) => {
    fetch(`${API_BASE}events/?loc=${locationId}&type=${courseTypeId}`, ops)
      .then(res => res.json())
      .catch(err => { console.warn(err) })
      .then(res => res)
  }
}