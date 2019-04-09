class AddUserToMessage < ActiveRecord::Migration[5.2]
  def change
    add_reference :messages, :user, foreign_key: { to_table: :users }
  end
end
