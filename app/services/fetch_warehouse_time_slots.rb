# frozen_string_literal: true

class FetchWarehouseTimeSlots
  class << self
    def call(warehouse:, time_range:, slot_duration_in_minutes:, increment: TimeSlot::INCREMENT)
      new(
        warehouse: warehouse,
        time_range: time_range,
        slot_duration_in_minutes: slot_duration_in_minutes,
        increment: increment
      ).call
    end
  end

  def initialize(warehouse:, time_range:, slot_duration_in_minutes:, increment: TimeSlot::INCREMENT)
    @warehouse = warehouse
    @time_range = time_range
    @slot_duration_in_minutes = slot_duration_in_minutes.to_i.minutes
    @increment = increment
  end

  def call
    time_range_in_ranges(increment: increment, duration: slot_duration_in_minutes).map do |tr|
      overlaps = scheduled_slots.any? { |scheduled_slot| tr.overlaps?(scheduled_slot.to_tr) }
      TimeSlot.new(time_range: tr, warehouse: warehouse, free: !overlaps)
    end
  end

  private

  attr_reader :warehouse, :time_range, :slot_duration_in_minutes, :increment

  delegate :scheduled_slots, to: :warehouse
  delegate :in_ranges, to: :time_range, prefix: true
end
