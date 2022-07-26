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
    <>
      <div className='col-12 text-center'>
        <h3>Warehouses</h3>
      </div>
      <div className='row'>
          {warehouses.map(({ id }) => (
            <div className='col-md-4 border p-5' key={id}>
              <Link to={`/warehouses/${id}`}>
                Warehouse {id}
              </Link>
            </div>
          ))}
      </div>
    </>
  )
}

export default WarehouseList
