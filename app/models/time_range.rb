# frozen_string_literal: true

class TimeRange
  include Enumerable

  EndTimeMustBeGreaterError = Class.new(StandardError)
  RangeDurationCannotBeZero = Class.new(StandardError)

  class Duration
    attr_reader :duration_in_seconds
    alias in_seconds duration_in_seconds

    delegate_missing_to :duration_in_seconds

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
    validate
  end

  class << self
    def today
      today_time = Time.zone.today.at_beginning_of_day
      new(today_time, today_time.tomorrow)
    end
  end

  def in_ranges(duration:, increment:, &block)
    return to_enum(__method__, duration: duration, increment: increment) unless block_given?

    Array.new(duration_in_seconds / increment.seconds)
         .each_with_object([]) do |_, sub_ranges|
      sub_range = sub_ranges.last&.next_range(increment: increment, duration: duration) || first(duration: duration)

      if sub_range.end_time <= end_time
        block.call(sub_range)
        sub_ranges << sub_range
      end
    end
  end

  def first(duration: nil)
    return super unless duration

    next_range(increment: 0, duration: duration)
  end

  def next_range(increment:, duration: duration_in_seconds)
    new_start_time = start_time + increment
    new_end_time = new_start_time + duration

    self.class.new(new_start_time, new_end_time)
  end

  def includes?(time_range)
    overlaps_at_beginning?(time_range) && overlaps_at_end?(time_range)
  end

  def covers?(time_range)
    time_range.includes?(self)
  end

  def overlaps?(time_range)
    overlaps_at_beginning?(time_range) || overlaps_at_end?(time_range) || covers?(time_range)
  end

  def overlaps_at_beginning?(time_range)
    (time_range.start_time >= start_time) && (time_range.start_time < end_time)
  end

  def overlaps_at_end?(time_range)
    (time_range.end_time <= end_time) && (time_range.end_time > start_time)
  end

  private

  def validate
    raise RangeDurationCannotBeZero if duration.zero?
    raise EndTimeMustBeGreaterError if duration.negative?
  end

  def duration
    @duration ||= Duration.new(duration_in_seconds: end_time - start_time)
  end
end
