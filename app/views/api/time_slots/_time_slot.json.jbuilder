# frozen_string_literal: true

json.call(time_slot, :start_time, :end_time, :warehouse_id, :duration_in_minutes)
json.is_free time_slot.free
