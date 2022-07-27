# frozen_string_literal: true

json.array! @scheduled_slots, partial: 'api/scheduled_slots/scheduled_slot', as: :scheduled_slot
