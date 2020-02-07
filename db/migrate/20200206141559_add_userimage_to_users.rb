class AddUserimageToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :userimage, :string
  end
end
