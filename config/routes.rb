Rails.application.routes.draw do
  root "welcome#index"
  get '/issues', to: 'welcome#issues'
end
