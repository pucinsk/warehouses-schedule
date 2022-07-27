# frozen_string_literal: true

class ScheduledSlot < ApplicationRecord
  include TimeRangeable

  belongs_to :warehouse

  before_create :calculate_duration

  private

  def calculate_duration
    self.duration_in_minutes = time_range.duration_in_minutes
  end
end
