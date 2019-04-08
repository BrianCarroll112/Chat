class User < ApplicationRecord
  has_secure_password
  has_many :messages
  has_many :channels

  def to_token_payload
        {
            sub: id,
            username: username
        }
  end
end
