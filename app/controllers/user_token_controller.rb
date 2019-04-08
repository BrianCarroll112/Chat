controller = Knock::AuthTokenController
class UserTokenController < ApplicationController
 skip_before_action :verify_authenticity_token, raise: false
end
