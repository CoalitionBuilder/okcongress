class Legislator < ActiveRecord::Base
  has_many :ratings
  has_many :positions, through: :ratings

  validates_presence_of :name
end