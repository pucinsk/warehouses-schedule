# frozen_string_literal: true

json.array! @time_slots, partial: 'api/time_slots/time_slot', as: :time_slot
