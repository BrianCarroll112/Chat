class RoomsController < ApplicationController
  before_action :authenticate_user, :set_user, except: [:index]

  def index
    roomData = Room.all
    rooms = []

    roomData.each do |room|
      serialized_room = ActiveModelSerializers::Adapter::Json.new(
      RoomSerializer.new(room)
      ).serializable_hash
      rooms << room
    end

    render json: rooms

  end

  def create
    room = Room.new(room_params.merge(:user_id => @user[:user][:id]))
    if room.save!
      serialized_room = ActiveModelSerializers::Adapter::Json.new(
      RoomSerializer.new(room)
      ).serializable_hash
      ActionCable.server.broadcast 'rooms_channel', serialized_room
      head :ok
    end
  end

  private

  def set_user
    @user = ActiveModelSerializers::Adapter::Json.new(
      UserSerializer.new(current_user)
    ).serializable_hash
  end

  def room_params
    params.require(:room).permit(:name, :description, :motd)
  end
end
