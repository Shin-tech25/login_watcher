class Message < ApplicationRecord
  belongs_to :user
  has_many :marks
  has_many :favorites
  validates :content, presence: true, unless: :image?
  validates :markcounts, null: false
  mount_uploader :image, ImageUploader
end