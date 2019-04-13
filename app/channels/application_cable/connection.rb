module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      begin
        header_array = request.headers[:HTTP_SEC_WEBSOCKET_PROTOCOL].split(',')
        token = header_array[header_array.length-1]
        decoded_token = JWT.decode token.strip, '95e750747d929c1d503b409b708fd5ab7e4153a4af8f2a858dd0c151a86df46b485fd8c6b9b1f0cd613982da03c0e4389c1a47e89da060ac932d93374e271afb', true, { :algorithm => 'HS256' }
        if (current_user = User.find((decoded_token[0])['sub']))
          current_user
        else
          reject_unauthorized_connection
        end
      rescue
        reject_unauthorized_connection
      end
    end

  end
end
