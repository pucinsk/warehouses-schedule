# frozen_string_literal: true

module Api
  class TimeSlotsController < BaseController
    def index
      time_slots
    end

    private

    def time_slots
      @time_slots ||= \
        TimeRange
        .new(1.day.ago, 1.hour.from_now)
        .in_ranges(duration: 90.minutes, increment: 15.minutes)
        .map { |tr| TimeSlot.new(time_range: tr, warehouse_id: warehouse.id) }
    end

    def warehouse
      @warehouse ||= Warehouse.last
    end
  end
end
