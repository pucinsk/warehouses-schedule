# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TimeRange do
  subject(:time_range) { described_class.new(start_time, end_time) }

  let(:start_time) { Time.zone.today.at_beginning_of_day }
  let(:end_time) { start_time + 1.day }

  describe '#in_ranges' do
    subject(:sub_ranges) { time_range.in_ranges(duration: duration, increment: increment) }

    let(:duration) { 1.hour }
    let(:increment) { 1.hour }

    it 'returns time ranges split by duration' do
      expect(sub_ranges).to all(be_a(described_class))
    end

    it 'returns 24 ranges' do
      expect(sub_ranges.count).to eq(24)
    end
  end

  describe '#next_range' do
    subject(:next_range) { time_range.next_range(increment: increment, duration: duration) }

    let(:duration) { 1.hour }
    let(:increment) { 1.hour }

    it 'returns next range with incremented start time' do
      expect(next_range.start_time).to eq(start_time + increment)
    end

    it 'return next rage with given duration' do
      expect(next_range.end_time).to eq(start_time + increment + duration)
    end
  end

  # rubocop:disable RSpec/MissingExampleGroupArgument
  describe '#overlaps?' do
    subject(:overlaps) { time_range.overlaps?(time_range1) }

    let(:time_range1) { described_class.new(start_time1, end_time1) }

    context 'when two ranges are exactly the same' do
      #  ──────────────────────────
      #  ──────────────────────────

      let(:start_time1) { start_time }
      let(:end_time1) { end_time }

      it { is_expected.to be(true) }
    end

    context do
      # ─────────────────────────────────────
      #      ──────────────────────────

      let(:start_time1) { start_time + 1.hour }
      let(:end_time1) { end_time - 1.hour }

      it { is_expected.to be(true) }
    end

    context do
      #      ──────────────────────────
      # ─────────────────────────────────────

      let(:start_time1) { start_time - 1.hour }
      let(:end_time1) { end_time + 1.hour }

      it { is_expected.to be(true) }
    end

    context do
      # ──────────────────────────
      #            ──────────────────────────

      let(:start_time1) { start_time + 1.hour }
      let(:end_time1) { end_time + 1.hour }

      it { is_expected.to be(true) }
    end

    context do
      #            ──────────────────────────
      # ──────────────────────────

      let(:start_time1) { start_time - 1.hour }
      let(:end_time1) { end_time - 1.hour }

      it { is_expected.to be(true) }
    end

    context do
      # ───────────
      #            ───────────

      let(:start_time1) { end_time }
      let(:end_time1) { end_time + 1.hour }

      it { is_expected.to be(false) }
    end

    context do
      #            ───────────
      # ───────────

      let(:start_time1) { start_time - 1.hour }
      let(:end_time1) { start_time }

      it { is_expected.to be(false) }
    end

    context do
      # ───────────
      #               ───────────

      let(:start_time1) { end_time + 1.hour }
      let(:end_time1) { start_time1 + 1.hour }

      it { is_expected.to be(false) }
    end
  end
  # rubocop:enable RSpec/MissingExampleGroupArgument
end
