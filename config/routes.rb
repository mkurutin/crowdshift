Crowdshift::Application.routes.draw do

  resources :events do
    resources :commitments
  end

end
