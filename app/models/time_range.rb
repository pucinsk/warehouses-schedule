# frozen_string_literal: true

class TimeRange
  attr_reader :start_time, :end_time

  def initialize(start_time, end_time)
    @start_time = start_time
    @end_time = end_time
  end

  def in_ranges(duration:, increment:)
    ranges = [self.class.new(start_time, start_time + duration)]

    Array.new(duration_in_seconds / increment.seconds).each_with_object(ranges) do |_, sub_ranges|
      new_range = sub_ranges.last.next_range(increment, duration)
      sub_ranges << new_range if new_range.end_time <= end_time
    end
  end

  def next_range(increment, duration = duration_in_seconds)
    new_start_time = start_time + increment
    new_end_time = new_start_time + duration

    self.class.new(new_start_time, new_end_time)
  end

  private

  def duration_in_seconds
    @duration_in_seconds ||= end_time - start_time
  end
end
