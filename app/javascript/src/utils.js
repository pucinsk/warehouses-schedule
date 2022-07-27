import { format, formatDuration as fnsFormatDuration, intervalToDuration } from 'date-fns'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export const customFormatDuration = ({ start, end }) => {
  const durations = intervalToDuration({ start, end })
  return fnsFormatDuration(durations)
}

export const formatDate = (dateIsoString) => format(new Date(dateIsoString), 'pp PPP')
export const formatDuration = (durationInMinutes) => customFormatDuration({ start: 0, end: durationInMinutes * 60 * 1000 })
