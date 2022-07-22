import axios from 'axios'

export const fetchWarehouses = () => axios.get('api/warehouses')
