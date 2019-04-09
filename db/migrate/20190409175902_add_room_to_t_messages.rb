class AddRoomToTMessages < ActiveRecord::Migration[5.2]
  def change
    add_reference :messages, :room, foreign_key: { to_table: :rooms}
    add_reference :rooms, :user, foreign_key: { to_table: :users }
  end
end
