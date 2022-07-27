import axios from 'axios'

axios.defaults.baseURL = '/api/'
axios.defaults.withCredentials = true
const csfrToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
axios.defaults.headers.post['X-CSRF-Token'] = csfrToken

export const fetchWarehouses = () => axios.get('warehouses')
export const fetchWarehouse = (warehouseId) => axios.get(`warehouses/${warehouseId}`)
export const fetchTimeSlots = (warehouseId, date, duration) =>
  axios.get(`warehouses/${warehouseId}/time_slots`, { params: { date, duration } })
export const fetchScheduledSlots = (warehouseId) => axios.get(`warehouses/${warehouseId}/scheduled_slots`)
export const scheduleTimeSlot = (warehouseId, startTime, duration) =>
  axios.post(`warehouses/${warehouseId}/scheduled_slots`, { start_time: startTime, duration })
