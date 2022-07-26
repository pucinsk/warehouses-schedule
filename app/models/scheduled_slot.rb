# frozen_string_literal: true

class ScheduledSlot < ApplicationRecord
  belongs_to :warehouse

  before_create :calculate_duration

  private

  def calculate_duration
    self.duration_in_seconds = end_time - start_time
  end
end
