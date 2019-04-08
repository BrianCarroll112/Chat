class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  def create
    user = User.create(user_params)
    render json: {user: user}
  end

  private

  def user_params
    params.require(:user).permit(:username, :picture, :password, :email, :password_confirmation)
  end
end
