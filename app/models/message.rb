class Message < ApplicationRecord
  validates :text, presence: true
  belongs_to :user, optional: true
  belongs_to :room
end
