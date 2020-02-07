class AddStatusToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :status, :bool, null: false, default: false
  end
end
