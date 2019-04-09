class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :created_at
  has_one :user
  has_one :conversation
end
