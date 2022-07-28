# frozen_string_literal: true

Warehouse.create

Warehouse.last.scheduled_slots.create(
  [
    {
      start_time: Time.parse('2022-08-01T20:00:00.000Z'),
      end_time: Time.parse('2022-08-01T22:30:00.000Z'),
      booked_by: 'anon'
    },
    {
      start_time: Time.parse('2022-07-31T23:00:00.000Z'),
      end_time: Time.parse('2022-08-01T06:00:00.000Z'),
      booked_by: 'anon'
    },
    {
      start_time: Time.parse('2022-08-01T10:15:00.000Z'),
      end_time: Time.parse('2022-08-01T10:45:00.000Z'),
      booked_by: 'anon'
    },
    {
      start_time: Time.parse('2022-08-01T13:55:00.000Z'),
      end_time: Time.parse('2022-08-01T14:30:00.000Z'),
      booked_by: 'anon'
    },
    {
      start_time: Time.parse('2022-08-02T10:00:00.000Z'),
      end_time: Time.parse('2022-08-02T20:00:00.000Z'),
      booked_by: 'anon'
    },
    {
      start_time: Time.parse('2022-08-01T09:00:00.000Z'),
      end_time: Time.parse('2022-08-01T10:00:00.000Z'),
      booked_by: 'anon'
    },
    {
      start_time: Time.parse('2022-08-01T11:30:00.000Z'),
      end_time: Time.parse('2022-08-01T13:00:00.000Z'),
      booked_by: 'anon'
    },
    {
      start_time: Time.parse('2022-08-01T13:00:00.000Z'),
      end_time: Time.parse('2022-08-01T13:10:00.000Z'),
      booked_by: 'anon'
    }
  ]
)
