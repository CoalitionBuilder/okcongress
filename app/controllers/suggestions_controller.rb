class SuggestionsController < ApplicationController
  def new
    @suggestion = Suggestion.new
    @sigs = Sig.all
  end

  def create
    suggestion = Suggestion.new suggestion_params
    if suggestion.save
      flash[:success] = "Thank you for your submission!"
      redirect_to :root
    else
      flash[:failure] = "Your submission wasn't completed."
      redirect_to new_suggestion_path
    end
  end

  private
    def suggestion_params
      params.require(:suggestion).permit(:sig_id, :position, :reasoning)
    end
end
