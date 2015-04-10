class CreateSigs < ActiveRecord::Migration
  def change
    create_table :sigs do |t|
      t.string :name, null: false
      t.string :url, null: false
      t.string :description, null: false

      t.timestamps
    end
  end
end
