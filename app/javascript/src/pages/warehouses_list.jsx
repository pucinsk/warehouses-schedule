import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchWarehouses } from '../api'

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    const getWarehouses = async () => (
      await fetchWarehouses()
        .then(({ data }) => setWarehouses(data))
        .catch((e) => {
          if (e.response) {
            console.error(e.response.data)
          } else {
            console.error(e)
          }
        })
    )

    getWarehouses()
  }, [])

  if (!warehouses || warehouses.length === 0) {
    return (
      <div>
        Warehouses list is empty
      </div>
    )
  }

  return (
    <div>
      <ul>
        {warehouses.map(({ id }) => (
          <li key={id}><Link to={`/warehouses/${id}`}>Warehouse {id}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default WarehouseList
