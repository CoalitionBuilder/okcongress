class SigPosition < ActiveRecord::Base
  belongs_to :sig
  belongs_to :position

  validates_presence_of :sig_id, :position_id
end