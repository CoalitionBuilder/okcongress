class Sig < ActiveRecord::Base
  has_many :votesmart_scorecards
  has_many :sig_positions
  has_many :positions, through: :sig_positions

  validates_presence_of :name, :url, :description
end