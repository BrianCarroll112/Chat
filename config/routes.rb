Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :create]
  get '/login', to: 'users#login'

  resources :rooms, only: [:index, :create, :update, :destroy] do
    resources :messages, :users, only: [:index, :create]
  end

  mount ActionCable.server => '/cable'
end
