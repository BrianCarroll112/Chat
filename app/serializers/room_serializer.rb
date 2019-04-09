class RoomSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :messages
  has_one :user
end
