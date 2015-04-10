class Issue < ActiveRecord::Base
  has_many :positions

  validates_presence_of :description
end