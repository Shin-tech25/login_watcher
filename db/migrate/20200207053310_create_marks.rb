class CreateMarks < ActiveRecord::Migration[5.2]
  def change
    create_table :marks do |t|
      t.boolean :mark, defualt: false
      t.references :user, foreign_key: true, index: false
      t.references :message, foreign_key: true, index: false
      t.timestamps
    end
    add_index :marks, [:user_id, :message_id], unique: true
  end
end
