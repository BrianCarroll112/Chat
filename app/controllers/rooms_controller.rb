class RoomsController < ApplicationController
  before_action :authenticate_user, :set_user, except: [:index]
  before_action :set_room, only: [:update, :destroy]

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

  def destroy
    to_send = {delete: true, roomId: @room[:id]}
    ActionCable.server.broadcast 'rooms_channel', to_send
    @room.destroy
  end

  def update
    @room.update!(room_params)
    to_send = {update: true, roomId: @room[:id], motd: @room[:motd]}
    ActionCable.server.broadcast 'rooms_channel', to_send
  end
  private

  def set_user
    @user = ActiveModelSerializers::Adapter::Json.new(
      UserSerializer.new(current_user)
    ).serializable_hash
  end

  def set_room
    @room = Room.find(params[:id])
  end

  def room_params
    params.require(:room).permit(:name, :description, :motd)
  end
end
