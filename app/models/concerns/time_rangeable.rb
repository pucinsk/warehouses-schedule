# frozen_string_literal: true

module TimeRangeable
  def time_range
    @time_range ||= TimeRange.new(start_time, end_time)
  end
  alias to_tr time_range
end
