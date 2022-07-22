import React, { useEffect, useState } from 'react'
import { fetchWarehouses } from './../api'

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    const getWarehouses = async () => (
      await fetchWarehouses()
        .then(({ data }) => setWarehouses(data))
        .catch((e) => console.error(e))
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
          <li key={id}>Warehouse {id}</li>
        ))}
      </ul>
    </div>
  )
}

export default WarehouseList
