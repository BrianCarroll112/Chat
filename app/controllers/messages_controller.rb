class MessagesController < ApplicationController
  def create
    room = Room.find(params[:room_id])
    message = room.messages.new(message_params)
    if message.save!
      MessagesChannel.broadcast_to room, message
      head :ok
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :room_id)
  end
end
