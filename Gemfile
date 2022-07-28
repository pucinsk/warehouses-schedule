# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.1'

gem 'jbuilder'
gem 'jsbundling-rails'
gem 'pg', '~> 1.4', '>= 1.4.1'
gem 'propshaft'
gem 'puma', '~> 5.0'
gem 'rails', '~> 7.0.3', '>= 7.0.3.1'
# gem "redis", "~> 4.0"
gem 'bootsnap', require: false
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'pry-byebug'
  gem 'rails-controller-testing'
  gem 'rspec-rails', '~> 6.0.0.rc1'
end

group :development do
  gem 'rubocop', '~> 1.32'
  gem 'rubocop-rails', '~> 2.15', '>= 2.15.2'
  gem 'rubocop-rspec', '~> 2.12', '>= 2.12.1'
  gem 'web-console'
end

group :test do
  gem 'simplecov', require: false
end
