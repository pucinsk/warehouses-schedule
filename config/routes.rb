Rails.application.routes.draw do
  root "pages#index"

  namespace 'api', defaults: { format: :json } do
    resources :warehouses, only: %i[index show] do
      resources :time_slots, only: :index
      resources :scheduled_slots, only: %i[index show create]
    end
  end

  get '*path' => 'pages#index'
end
