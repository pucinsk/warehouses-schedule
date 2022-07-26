import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTimeSlots } from '../api'
import { customFormatDuration, useQuery } from '../utils'

const TimeSlotsSearchResult = () => {
  const { warehouseId } = useParams()
  const [timeSlots, setTimeSlots] = useState([])
  const [selectedTime, setSelectedTime] = useState()
  const query = useQuery()
  const date = query.get('date')
  const duration = query.get('duration')

  useEffect(() => {
    if (!date || !duration) return

    fetchTimeSlots(warehouseId, date, duration)
      .then(({ data }) => setTimeSlots(data))
      .catch((e) => {
        if (e.response) {
          console.error(e.response.data)
        } else {
          console.error(e)
        }
      })
  }, [date, duration])

  const formatDate = (dateIsoString) => format(new Date(dateIsoString), 'pp PPP')
  const formatDuration = (durationInMinutes) => customFormatDuration({ start: 0, end: durationInMinutes * 60 * 1000 })

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(selectedTime)
  }

  return (
    <>
      <h3>Available {formatDuration(duration)} slots on {format(new Date(date), 'PPP')}</h3>
      <form className='border p-2' onSubmit={handleSubmit}>
        <div className='col-2 ms-auto'>
          <button type='submit' className='btn btn-primary'>Book Time</button>
        </div>
        <div className='table-wrapper-scroll-y table-scrollbar'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Time</th>
              <th scope="col">Duration</th>
              <th scope="col">Free</th>
              <th scope="col">Book</th>
            </tr>
          </thead>
          <tbody>
          {timeSlots.map(({ startTime, durationInMinutes: minutes, isFree }, idx) => (
            <tr key={`ts-${idx}`}>
              <th scope='row'>{idx + 1}</th>
              <td>{formatDate(startTime)}</td>
              <td>{formatDuration(minutes)}</td>
              <td>{isFree ? 'Free' : 'Booked'}</td>
              <td>
                <input
                  type='radio'
                  name='time_slot_start_time'
                  value={startTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
      </form>
    </>
  )
}

export default TimeSlotsSearchResult
