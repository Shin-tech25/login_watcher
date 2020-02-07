class ModifiedStatusToUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :status, :bool
    add_column :users, :status, :bool, null: false, default: true
  end
end
