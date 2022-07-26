import { formatDuration, intervalToDuration } from 'date-fns'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export const useQuery = () => {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export const customFormatDuration = ({ start, end }) => {
  const durations = intervalToDuration({ start, end })
  return formatDuration(durations)
}
