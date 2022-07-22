# frozen_string_literal: true

json.array! @warehouses, partial: 'api/warehouses/warehouse', as: :warehouse
