class CreateLoginusers < ActiveRecord::Migration[5.2]
  def change
    create_table :loginusers do |t|
      t.references :user, foreign_key: true
      t.boolean  :login, null: false, default: false
      t.timestamps
    end
  end
end
