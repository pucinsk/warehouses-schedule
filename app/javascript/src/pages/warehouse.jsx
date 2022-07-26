import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchWarehouse } from '../api'

const Warehouse = () => {
  const { warehouseId } = useParams()
  const [warehouse, setWarehouse] = useState()

  useEffect(() => {
    const getWarehouse = async () => (
      await fetchWarehouse(warehouseId)
        .then(({ data }) => setWarehouse(data))
        .catch((e) => {
          if (e.response) {
            console.error(e.response.data)
          } else {
            console.error(e)
          }
        })
    )

    getWarehouse()
  }, [])

  if (!warehouse) {
    return (
      <div>
        Warehouse not found
      </div>
    )
  }

  return (
    <div>
      Warehouse {warehouse.id}
    </div>
  )
}

export default Warehouse
