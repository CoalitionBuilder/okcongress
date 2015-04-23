Rails.application.routes.draw do
  root "welcome#index"
  get '/issues', to: 'welcome#issues'
  get '/positions', to: 'welcome#positions'
end
