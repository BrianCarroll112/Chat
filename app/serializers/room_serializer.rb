class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name, :user, :messages
  has_many :messages
  has_one :user
end
