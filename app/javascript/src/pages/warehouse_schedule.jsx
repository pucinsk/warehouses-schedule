import React from 'react'
import { Link } from 'react-router-dom'

const WarehouseSchedule = () => {
  const warehouseId = 'abc123'

  return (
    <>
      <Link to='find_time'>Find Time</Link>
      <div>Schedule for Warehouse {warehouseId}</div>
    </>
  )
}

export default WarehouseSchedule
