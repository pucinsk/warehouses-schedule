# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  describe '#index' do
    before do
      get :index
    end

    it 'renders index template' do
      expect(response).to render_template(:index)
    end

    it 'returns successful response code' do
      expect(response).to have_http_status(:success)
    end
  end
end
