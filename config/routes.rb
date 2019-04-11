Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :create, :show]

  resources :rooms, only: [:index, :create, :update, :destroy]

  resources :messages, only: [:create]

  mount ActionCable.server => '/cable'
end
