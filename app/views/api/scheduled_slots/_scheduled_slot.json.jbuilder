# frozen_string_literal: true

json.call(scheduled_slot, :warehouse_id, :duration_in_minutes)
json.start_time scheduled_slot.start_time.iso8601
json.end_time scheduled_slot.end_time.iso8601
