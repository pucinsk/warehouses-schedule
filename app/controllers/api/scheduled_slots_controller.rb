# frozen_string_literal: true

module Api
  class ScheduledSlotsController < BaseController
    def index
      @scheduled_slots = warehouse.scheduled_slots
    end

    def show
    end

    def create
      @scheduled_slot = warehouse.scheduled_slots.new(scheduled_slot_params)

      if @scheduled_slot.save
        respond_to do |format|
          format.json { render :show, status: :created, location: api_warehouse_scheduled_slot_url(id: @scheduled_slot) }
        end
      else
        render json: { errors: @scheduled_slot.errors }, status: :bad_request
      end
    end

    private

    def warehouse
      @warehouse ||= Warehouse.find(params[:warehouse_id])
    end

    def scheduled_slot_params
      Time.use_zone(timezone) do
        start_time = Time.zone.parse(params[:start_time])

        {
          start_time: start_time,
          end_time: start_time + params[:duration].to_i.minutes
        }
      end
    end
  end
end
