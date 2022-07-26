# frozen_string_literal: true

class TimeRange
  class Duration
    attr_reader :duration_in_seconds
    alias in_seconds duration_in_seconds

    def initialize(duration_in_seconds:)
      @duration_in_seconds = duration_in_seconds
    end

    def duration_in_minutes
      @duration_in_minutes ||= (duration_in_seconds / 60).to_i
    end
    alias in_minutes duration_in_minutes
  end

  attr_reader :start_time, :end_time

  delegate :duration_in_seconds, :duration_in_minutes, :in_seconds, :in_minutes, to: :duration

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

  def duration
    @duration ||= Duration.new(duration_in_seconds: end_time - start_time)
  end
end
