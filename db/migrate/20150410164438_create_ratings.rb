class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.references :legislator, null: false
      t.references :position, null: false
      t.float :score, null: false
      t.integer :year, null: false

      t.timestamps
    end
  end
end
