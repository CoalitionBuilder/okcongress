class Legislator < ActiveRecord::Base
  has_many :ratings
  has_many :positions, through: :ratings

  validates_presence_of :name, :office, :state, :party, :votesmart_url, :img_url
end