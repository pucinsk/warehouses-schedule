# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: { message: e.to_s }, status: :not_found
    end
  end
end
