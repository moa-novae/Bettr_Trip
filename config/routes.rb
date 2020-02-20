Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'

  resource :home, only: [:index]
  resources :trips, only: [:index, :create, :update]
  # resource :points, only: [:create, :update, :delete]
  # resources :points, only: [:index, :create, :update]


  namespace :api do # /api/data

    get '/data', to: 'tests#index'
    
    resources :dogs

  end

  get 'login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  post '/points/create' => 'points#create'
  get '/points/index' => 'points#index'

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
