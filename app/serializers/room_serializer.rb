class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name, :user, :messages, :motd, :description
  has_many :messages
  has_one :user
end
