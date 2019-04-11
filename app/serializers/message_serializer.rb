class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :created_at, :user
  has_one :user
  has_one :room
end
