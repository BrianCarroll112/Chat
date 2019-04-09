class MessagesController < ApplicationController
  before_action :set_user

  def create
    room = Room.find(params[:room_id])
    message = room.messages.new(message_params)
    message << @user
    
    if message.save!
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
      MessageSerializer.new(message)
      ).serializable_hash
      MessagesChannel.broadcast_to room, serialized_data
      head :ok
    end
  end

  private

  def set_user
    @user = User.find(message_params[:user_id])
  end

  def message_params
    params.require(:message).permit(:text, :room_id, :user_id)
  end
end
