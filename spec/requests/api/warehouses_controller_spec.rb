# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::WarehousesController do
  describe '#index' do
    subject(:index_response) { response }

    let(:request) { get '/api/warehouses' }

    context 'when there are no warehouses' do
      before { request }

      it { is_expected.to be_successful }

      describe '#body' do
        subject(:json_body) { JSON.parse(index_response.body, symbolize_names: true) }

        it { is_expected.to be_empty }
      end
    end

    context 'when there are 1 warehouse' do
      let!(:warehouse) { Warehouse.create }

      before { request }

      it { is_expected.to be_successful }

      describe '#body' do
        subject(:json_body) { JSON.parse(index_response.body, symbolize_names: true) }

        let(:expected_response) do
          [
            {
              id: warehouse.id
            }
          ]
        end

        it { is_expected.to match_array(expected_response) }
      end
    end

    context 'when there are more than 1 warehouse' do
      let!(:warehouse1) { Warehouse.create }
      let!(:warehouse2) { Warehouse.create }

      before { request }

      it { is_expected.to be_successful }

      describe '#body' do
        subject(:json_body) { JSON.parse(index_response.body, symbolize_names: true) }

        let(:expected_response) do
          [
            {
              id: warehouse1.id
            },
            {
              id: warehouse2.id
            }
          ]
        end

        it { is_expected.to match_array(expected_response) }
      end
    end

    context 'when error occurs' do
      let(:exception) { StandardError.new('Boom!') }

      before do
        allow(Warehouse).to receive(:all).and_raise(exception)
        request
      end

      it { is_expected.not_to be_successful }

      it { is_expected.to have_http_status(:internal_server_error) }

      describe '#body' do
        subject(:json_body) { JSON.parse(index_response.body, symbolize_names: true) }

        it { is_expected.to match(message: "Something went wrong. #{exception}") }
      end
    end
  end
end
