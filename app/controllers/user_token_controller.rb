controller = Knock::AuthTokenController
class UserTokenController < controller
 skip_before_action :verify_authenticity_token, raise: false
end
