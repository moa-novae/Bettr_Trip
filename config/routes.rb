Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'

  resource :home, only: [:index]

  namespace :api, defaults: { format: 'json' } do
    resources :trips, only: [:index, :create] do
      resources :points
    end
  end

  resources :sessions, only: [:create]
  delete :logout, to: 'sessions#logout'
  get :logged_in, to: 'sessions#logged_in'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  # post '/points/create' => 'points#create'
  # get '/points/index' => 'points#index'

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
