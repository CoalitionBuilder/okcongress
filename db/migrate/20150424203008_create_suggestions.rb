class CreateSuggestions < ActiveRecord::Migration
  def change
    create_table :suggestions do |t|
      t.references :sig
      t.string :position, null: false, limit: 200
      t.text :reasoning, null: false, limit: 500

      t.timestamps null: false
    end
  end
end
