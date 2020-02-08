class AddCheckmarkToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :checkmark, :boolean, default: true
  end
end
