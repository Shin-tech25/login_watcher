class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :userimage, null: false
  mount_uploader :userimage, ImageUploader
  has_many :messages
  has_many :marks
  has_many :favorites
end
