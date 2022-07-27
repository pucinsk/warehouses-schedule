# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FetchWarehouseTimeSlots do
  describe '#call' do
    subject(:fetch_time_slots) { time_slots_fetcher.call }

    let(:time_slots_fetcher) do
      described_class.new(
        warehouse: warehouse,
        time_range: time_range,
        slot_duration_in_minutes: slot_duration,
        increment: increment
      )
    end

    let(:warehouse) { Warehouse.create }
    let(:time_range) { TimeRange.today }
    let(:slot_duration) { 60 }
    let(:increment) { 2.hours }

    context 'when warehouse does not have scheduled slots for given day' do
      it 'returns all slots to be free' do
        expect(fetch_time_slots).to all(be_free)
      end

      describe 'slots count' do
        subject(:slots_count) { fetch_time_slots.count }

        it { is_expected.to eq(12) }
      end
    end

    context 'when warehouse has one booked time slot' do
      before do
        warehouse.scheduled_slots.create(
          start_time: time_range.start_time + 5.minutes,
          end_time: time_range.start_time + 30.minutes
        )
      end

      it 'has 1 booked slots' do
        expect(fetch_time_slots.reject(&:free?).count).to eq(1)
      end

      it 'has 11 free slots' do
        expect(fetch_time_slots.select(&:free?).count).to eq(11)
      end

      describe 'scheduled time slot' do
        subject(:scheduled_time_slot) { fetch_time_slots.find { |ts| !ts.free? } }

        it 'contains booked slot' do
          expect(scheduled_time_slot).to be_present
        end

        it 'has correct attributtes', :aggregate_failures do
          start_time = time_range.start_time
          end_time = start_time + slot_duration.minutes

          expect(scheduled_time_slot.start_time).to eq(start_time)
          expect(scheduled_time_slot.end_time).to eq(end_time)
        end
      end
    end
  end
end
