class AddMarkcountToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :markcounts, :integer, default: 0
  end
end
