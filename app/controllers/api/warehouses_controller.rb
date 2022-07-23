# frozen_string_literal: true

module Api
  class WarehousesController < BaseController
    def index
      @warehouses = Warehouse.all
    end

    def show
      @warehouse = Warehouse.find(params[:id])
    end
  end
end
