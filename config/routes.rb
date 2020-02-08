
Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions:      'users/sessions',
  }
  # devise_scope :user do
  #   get '/users/sign_out' => 'devise/sessions#destroy'
  # end
  root "messages#index"
  resources :messages, only: [:create, :index]
  namespace :api do
    resources :messages, only: [:create, :index], defaults: { format: 'json' }
  end
  resources :users, only: [:create, :index, :show], defaults: { format: 'json' }
  resources :marks, only: [:create, :index], defaults: {format: 'json'}
end