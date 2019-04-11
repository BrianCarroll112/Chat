class RoomsController < ApplicationController
  before_action :authenticate_user
  # try hitting with axios header bearer auth to avoid passing in user id from front
  # (login only returns token)


  def index
    rooms = Room.all
    render json: rooms
  end

  def create
    room = Room.new(room_params)
    if room.save!
      serialized_room = ActiveModelSerializers::Adapter::Json.new(
      RoomSerializer.new(room)
      ).serializable_hash
      ActionCable.server.broadcast 'rooms_channel', serialized_room
      head :ok
    end
  end

  private

  def room_params
    params.require(:room).permit(:name, :description, :motd, :user_id)
  end
end
