class UsersController < ApplicationController
  def create
    user = User.create(user_params)
    serialized_return = ActiveModelSerializers::Adapter::Json.new(
    UserSerializer.new(user)
    ).serializable_hash
    render json: serialized_return
  end

  private

  def user_params
    params.require(:user).permit(:username, :picture, :password, :email, :password_confirmation)
  end
end
