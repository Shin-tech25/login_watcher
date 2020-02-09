class Favorite < ApplicationRecord
  validates :favorite, null: false
  belongs_to :user
  belongs_to :message
  validates :user_id, :uniqueness => {:scope => :message_id}
end
