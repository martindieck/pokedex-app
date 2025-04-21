Rails.application.routes.draw do
  get "profiles/show"
  devise_for :users
  root "encounters#new"
  resources :encounters, only: [ :new, :create ]
  get "profile", to: "profiles#show"
  post "/encounters/increment_catch_count", to: "encounters#increment_catch_count"
  post "/encounters/increment_balance", to: "encounters#increment_balance"
  post "/trainers/buy", to: "trainers#buy"
  get "/encounters/stats", to: "encounters#stats"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
