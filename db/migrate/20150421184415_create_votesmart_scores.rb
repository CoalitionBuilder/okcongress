class CreateVotesmartScores < ActiveRecord::Migration
  def change
    create_table :votesmart_scores do |t|
      t.references :sig
      t.integer :votesmart_sig_id
      t.integer :year
      t.string :votesmart_issues
      t.integer :pages
    end
  end
end
