class MessagesController < ApplicationController
  before_action :authenticate_user
# try hitting with axios header bearer auth
# can then take out from permit: user id, also can take out room_id if its always in url params
# need to then build the message params by adding user id
  def create
    room = Room.find(params[:room_id])
    message = room.messages.new(message_params)

    if message.save!
      serialized_message = ActiveModelSerializers::Adapter::Json.new(
      MessageSerializer.new(message)
      ).serializable_hash
      ActionCable.server.broadcast 'messages_channel', serialized_message
      head :ok
    end

    #handle / commands, call other method with a new giphy key in broadcast w img src to conditionally check on front end
  end

  private

  def message_params
    params.require(:message).permit(:text, :room_id, :user_id)
  end
end
