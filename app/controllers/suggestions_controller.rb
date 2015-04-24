class SuggestionsController < ApplicationController
  def new
    @suggestion = Suggestion.new
    @sigs = Sig.all
  end

  def create
  end
end
