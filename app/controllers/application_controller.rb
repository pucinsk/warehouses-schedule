# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def timezone
    @timezone ||= cookies['timezone']
  end
end
