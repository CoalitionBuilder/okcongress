class CreateSigPositions < ActiveRecord::Migration
  def change
    create_table :sig_positions do |t|
      t.references :sig, null: :false
      t.references :position, null: :false
    end
  end
end
