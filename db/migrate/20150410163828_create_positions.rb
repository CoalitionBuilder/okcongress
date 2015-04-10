class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.references :issue
      t.string :description, null: false

      t.timestamps
    end
  end
end
