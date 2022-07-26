# frozen_string_literal: true

class Warehouse < ApplicationRecord
  has_many :scheduled_slots, dependent: :destroy
end
