Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :create]
  get '/login', to: 'users#login'

  resources :channels, only: [:index, :create, :update, :destroy] do
    resources :messages, :users, only: [:index]
  end
end
