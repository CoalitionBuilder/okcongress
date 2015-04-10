class Position < ActiveRecord::Base
  belongs_to :issue
  has_many :ratings
  has_many :legislators, through: :ratings
  has_many :sigs, through: :ratings

  validates_presence_of :description, :issue_id
end