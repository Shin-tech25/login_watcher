class CreateMarks < ActiveRecord::Migration[5.2]
  def change
    create_table :marks do |t|
      t.boolean :mark, defualt: false
      t.references :user, foreign_key: true
      t.references :message, foreign_key: true
      t.timestamps
    end
    
  end
end
