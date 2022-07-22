Rails.application.routes.draw do
  root "pages#index"

  namespace 'api', defaults: { format: :json } do
    resources :warehouses, only: :index
  end
end
