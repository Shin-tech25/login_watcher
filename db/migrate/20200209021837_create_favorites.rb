class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.references :user, foreign_key: true, index: false
      t.references :message, foreign_key: true, index: false
      t.boolean :favorite, default: false
      t.timestamps
    end
  end
end
