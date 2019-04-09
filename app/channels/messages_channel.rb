class MessagesChannel < ApplicationCable::Channel
  def subscribed
    #room = Room.find(params[:room])
    #stream_for room
    stream_from 'messages_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
