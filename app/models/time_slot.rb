# frozen_string_literal: true

class TimeSlot
  INCREMENT = 15.minutes

  attr_reader :time_range, :warehouse, :free
  alias free? free

  delegate :id, to: :warehouse, prefix: true
  delegate :start_time, :end_time, :duration_in_minutes, to: :time_range

  def initialize(time_range:, warehouse:, free: true)
    @time_range = time_range
    @warehouse = warehouse
    @free = free
  end
end
