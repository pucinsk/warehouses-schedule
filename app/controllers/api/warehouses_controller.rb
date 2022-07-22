# frozen_string_literal: true

module Api
  class WarehousesController < BaseController
    def index
      @warehouses = Warehouse.all
    end
  end
end
