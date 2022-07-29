import { format } from 'date-fns'
import { func, bool } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchTimeSlots, scheduleTimeSlot } from '../api'
import { formatDate, formatDuration, useQuery } from '../utils'

const ConfirmBookModal = ({ show, onClose, onConfirm, ...rest }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm</Modal.Title>
    </Modal.Header>
    <Modal.Body {...rest} />
    <Modal.Footer>
      <Button variant='secondary' onClick={onClose}>Close</Button>
      <Button variant='primary' onClick={onConfirm}>Book Time</Button>
    </Modal.Footer>
  </Modal>
)

ConfirmBookModal.propTypes = {
  show: bool.isRequired,
  onClose: func.isRequired,
  onConfirm: func.isRequired
}

const TimeSlotsSearchResult = () => {
  const { warehouseId } = useParams()
  const [timeSlots, setTimeSlots] = useState([])
  const [selectedTime, setSelectedTime] = useState()
  const [showConfirmModal, setConfirmModalShow] = useState(false)
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

  const handleConfirm = () => {
    scheduleTimeSlot(warehouseId, selectedTime, duration)
      .then(({ data }) => {
        console.log('created', data)
        setConfirmModalShow(false)
        window.location = `warehouses/${warehouseId}`
      })
      .catch((e) => {
        if (e.response) {
          console.error(e.response.data)
        } else {
          console.error(e)
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setConfirmModalShow(true)
  }

  return (
    <>
      <h3>Available {formatDuration(duration)} slots on {format(new Date(date), 'PPP')}</h3>
      <form className='border p-2' onSubmit={handleSubmit}>
        <div className='col-2 ms-auto'>
          <button type='submit' className='btn btn-primary'>Book Time</button>
        </div>
        <div className='wrapper-scroll-y scrollbar scrollbar-table'>
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
          {timeSlots.map(({ startTime, durationInMinutes, isFree }, idx) => (
            <tr key={`ts-${idx}`}>
              <th scope='row'>{idx + 1}</th>
              <td>{formatDate(startTime)}</td>
              <td>{formatDuration(durationInMinutes)}</td>
              <td>{isFree ? 'Free' : 'Booked'}</td>
              <td>
                <input
                  type='radio'
                  name='time_slot_start_time'
                  value={startTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!isFree}
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
      </form>
      {
        duration && selectedTime && (
          <ConfirmBookModal
            show={showConfirmModal}
            onClose={() => setConfirmModalShow(false)}
            onConfirm={handleConfirm}
          >
            Book {formatDuration(duration)} on {formatDate(new Date(selectedTime))}
          </ConfirmBookModal>
        )
      }
    </>
  )
}

export default TimeSlotsSearchResult
