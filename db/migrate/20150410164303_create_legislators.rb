class CreateLegislators < ActiveRecord::Migration
  def change
    create_table :legislators do |t|
      t.string :name, null: false
      t.string :office
      t.string :state
      t.string :district
      t.string :party
      t.string :votesmart_url
      t.string :img_url

      t.timestamps
    end
  end
end
