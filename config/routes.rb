Crowdshift::Application.routes.draw do

  root :to => 'events#new'

  resources :events do
    resources :commitments
  end

end
