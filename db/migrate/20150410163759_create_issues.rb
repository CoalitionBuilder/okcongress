class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.string :description, null: false

      t.timestamps
    end
  end
end
