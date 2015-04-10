class Sig < ActiveRecord::Base
  has_many :ratings
  has_many :legislators, through: :ratings
  has_many :positions, through: :ratings

  validates_presence_of :name, :url, :description
end