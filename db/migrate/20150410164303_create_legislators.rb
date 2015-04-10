class CreateLegislators < ActiveRecord::Migration
  def change
    create_table :legislators do |t|
      t.string :name, null: false
      t.string :office, null: false
      t.string :state, null: false
      t.string :party, null: false
      t.string :votesmart_url, null: false
      t.string :img_url, null: false

      t.timestamps
    end
  end
end
