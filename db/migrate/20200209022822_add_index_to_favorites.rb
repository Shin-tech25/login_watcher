class AddIndexToFavorites < ActiveRecord::Migration[5.2]
  def change
    add_index :favorites, [:user_id, :message_id], unique: true
  end
end
