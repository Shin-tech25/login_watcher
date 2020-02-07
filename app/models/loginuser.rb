class Loginuser < ApplicationRecord
  belongs_to :user
  validates :login, presence: true
end
