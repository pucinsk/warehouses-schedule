import axios from 'axios'

axios.defaults.baseURL = '/api/'

export const fetchWarehouses = () => axios.get('warehouses')
export const fetchWarehouse = (warehouseId) => axios.get(`warehouses/${warehouseId}`)
