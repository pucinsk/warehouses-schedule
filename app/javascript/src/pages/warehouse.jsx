import React, { useEffect, useState } from 'react'
import { fetchWarehouse } from '../api'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import { formatISO, lastDayOfYear } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.min.css'
import TimeSlotsSearchResult from './time_slots_search_result'
import { useQuery } from '../utils'

const AvailableTimeSlotsForm = () => {
  const query = useQuery()
  const [date, setDate] = useState(query.get('date') ? new Date(query.get('date')) : new Date())
  const [duration, setDuration] = useState(query.get('duration') || 0)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchQuery = new URLSearchParams({ date: formatISO(date, { representation: 'date' }), duration })
    navigate(`time-slots/result?${searchQuery.toString()}`)
  }

  return (
    <div className='row m-e-auto'>
      <form className='col-md-7 border p-2' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='date' className='form-label'>Date</label>
          <ReactDatePicker
            name='date'
            selected={date}
            onChange={setDate}
            minDate={new Date()}
            maxDate={lastDayOfYear(new Date())}
            className='form-control'
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='duration' className='form-label'>
            Duration
          </label>
          <br/>
          <input
            htmlFor='duration'
            type='number'
            min='0'
            className='form-control'
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  )
}

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
    <div className='row'>
      <p className='col-12'>Book time at <i>Warehouse {warehouse.id}</i></p>
      <AvailableTimeSlotsForm />
      <Routes>
        <Route path='time-slots/result' element={<TimeSlotsSearchResult />} />
      </Routes>
    </div>
  )
}

export default Warehouse
