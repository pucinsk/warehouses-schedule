import axios from 'axios'
import { differenceInMinutes } from 'date-fns'

axios.defaults.baseURL = '/api/'

export const fetchWarehouses = () => axios.get('warehouses')
export const fetchWarehouse = (warehouseId) => axios.get(`warehouses/${warehouseId}`)
export const fetchTimeSlots = (warehouseId, date, duration) => axios.get(`warehouses/${warehouseId}/time_slots`, { params: { date, duration } })

export const scheduleTimeSlot = (warehouseId, startTime, endTime) => Promise.resolve({
  data: {
    id: 'abc123',
    warehouseId,
    startTime,
    endTime,
    durationInMinutes: differenceInMinutes(new Date(startTime), new Date(endTime))
  }
})
