# frozen_string_literal: true

module Api
  class ScheduledSlotsController < BaseController
    def index
      @scheduled_slots = warehouse.scheduled_slots
    end

    private

    def warehouse
      @warehouse ||= Warehouse.find(params[:warehouse_id])
    end
  end
end
