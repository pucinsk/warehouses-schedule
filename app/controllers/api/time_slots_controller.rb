# frozen_string_literal: true

module Api
  class TimeSlotsController < BaseController
    def index
      time_slots
    end

    private

    def time_slots
      @time_slots ||=
        FetchWarehouseTimeSlots
        .call(
          time_range: TimeRange.new(date, date.tomorrow),
          warehouse: warehouse,
          slot_duration_in_minutes: params[:duration]
        )
    end

    def warehouse
      @warehouse ||= Warehouse.find(params[:warehouse_id])
    end

    def date
      @date ||=
        Time.use_zone(timezone) do
          parsed_time = Time.zone.parse(params[:date])
          parsed_time.today? ? Time.zone.now : parsed_time.at_beginning_of_day
        end
    end
  end
end
