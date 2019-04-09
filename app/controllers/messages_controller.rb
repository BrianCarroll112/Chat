class MessagesController < ApplicationController
  #before_action :set_user, only: [:show, :update, :destroy]
  def create
    message = Message.create(message_params)
    room = Room.find(params[:room_id])
    if message.save!
      MessagesChannel.broadcast_to room, message
      head :ok
    end
  end

  private

  def message_params
    params.require(:message).permit(:text)
  end
end
