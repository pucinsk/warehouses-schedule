# frozen_string_literal: true

class CreateWarehouses < ActiveRecord::Migration[7.0]
  def change
    create_table :warehouses, id: :uuid do |t|
      t.timestamps
    end
  end
end
