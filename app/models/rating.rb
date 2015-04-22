class Rating < ActiveRecord::Base
  belongs_to :legislator
  belongs_to :position

  validates_presence_of :score, :legislator_id, :position_id
end