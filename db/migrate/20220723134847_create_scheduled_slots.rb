# frozen_string_literal: true

class CreateScheduledSlots < ActiveRecord::Migration[7.0]
  def change
    create_table :scheduled_slots, id: :uuid do |t|
      t.references :warehouse, null: false, foreign_key: true, type: :uuid
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.integer :duration_in_minutes, null: false
      t.string :booked_by

      t.timestamps
    end
  end
end
