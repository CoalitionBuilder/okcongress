class WelcomeController < ApplicationController
  def index
  end

  def issues
    @issues = Issue.all
    render json: @issues
  end
end