class AddFavocountsToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :favocounts, :integer, null: false, default: 0
  end
end
