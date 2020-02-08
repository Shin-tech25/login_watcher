class Message < ApplicationRecord
  belongs_to :user
  has_many :marks
  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end