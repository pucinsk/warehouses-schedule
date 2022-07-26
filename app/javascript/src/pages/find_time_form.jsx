import { format, formatISO, getUnixTime, lastDayOfYear } from 'date-fns'
import React, { createContext, useContext, useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchTimeSlots, scheduleTimeSlot } from '../api'

const FindTimeContext = createContext()

const FindTimeProvider = (props) => {
  const { warehouseId } = useParams()
  const [timeSlots, setTimeSlots] = useState([])
  const [selectedDate, setSelectedDate] = useState()
  const [duration, setDuration] = useState()

  useEffect(() => {
    if (!selectedDate || !duration) return

    fetchTimeSlots(warehouseId, selectedDate, duration)
      .then(({ data }) => setTimeSlots(data))
      .catch((e) => {
        if (e.response) {
          console.error(e.response.data)
        } else {
          console.error(e)
        }
      })
  }, [selectedDate, duration])

  return (
    <FindTimeContext.Provider
      value={{
        warehouseId,
        timeSlots,
        setTimeSlots,
        selectedDate,
        setSelectedDate,
        duration,
        setDuration
      }}
      {...props}
    />
  )
}

const FindTimeSlotForm = () => {
  const { setSelectedDate, setDuration: setSelectedDuration, duration, selectedDate } = useContext(FindTimeContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const searchQuery = new URLSearchParams({ date: formatISO(selectedDate), duration })
    navigate(`?${searchQuery.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(dt) => setSelectedDate(dt)}
        minDate={new Date()}
        maxDate={lastDayOfYear(new Date())}
      />
      <input type="number" onChange={(e) => setSelectedDuration(e.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  )
}

const SelectTimeSlotForm = () => {
  const { timeSlots, setTimeSlots, warehouseId } = useContext(FindTimeContext)
  const [selectedTime, setSelectedTime] = useState(timeSlots[0])
  const query = useQuery()
  const date = query.get('date')
  const duration = query.get('duration')

  const handleSubmit = (e) => {
    e.preventDefault()

    scheduleTimeSlot(warehouseId, selectedTime)
  }

  const formatDate = (dateIsoString) => format(new Date(dateIsoString), 'pp PPP')

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={setSelectedTime} value={selectedTime}>
        {timeSlots.map((timeSlot) => {
          const startTime = getUnixTime(new Date(timeSlot.startTime))

          return (
            <option
              key={`ts-${startTime}`}
              disabled={!timeSlot.isFree}
              value={startTime}
            >
              {formatDate(timeSlot.startTime)} - {formatDate(timeSlot.endTime)}
            </option>
          )})}
      </select>
      <input type="submit" value="Submit" />
    </form>
  )
}

const TimeForm = () => {
  const { timeSlots } = useContext(FindTimeContext)

  return (
    <>
      <FindTimeSlotForm />
      {timeSlots.length > 0 ? <SelectTimeSlotForm /> : 'No Slots found'}
    </>
  )
}

const FindTimeForm = () => (
  <FindTimeProvider>
    <TimeForm />
  </FindTimeProvider>
)

export default FindTimeForm
