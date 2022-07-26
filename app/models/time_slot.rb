# frozen_string_literal: true

class TimeSlot
  INCREMENT = 15.minutes

  attr_reader :time_range, :warehouse_id, :free

  delegate :start_time, :end_time, :duration_in_minutes, to: :time_range

  def initialize(time_range:, warehouse_id:, free: true)
    @time_range = time_range
    @warehouse_id = warehouse_id
    @free = free
  end
end
