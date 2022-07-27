# frozen_string_literal: true

json.call(time_slot, :warehouse_id, :duration_in_minutes)

json.start_time time_slot.start_time.iso8601
json.end_time time_slot.end_time.iso8601
json.is_free time_slot.free?
