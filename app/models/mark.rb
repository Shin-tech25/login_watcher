class Mark < ApplicationRecord
  validates :mark, null: false
  belongs_to :user
  belongs_to :message
end
