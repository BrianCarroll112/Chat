class Room < ApplicationRecord
  validates :name, presence: true
  validates :motd, presence: true
  validates :description, presence: true
  belongs_to :user, optional: true
  has_many :messages, dependent: :destroy
end
