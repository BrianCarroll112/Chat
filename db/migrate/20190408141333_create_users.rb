class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.text :username
      t.text :picture
      t.text :password_digest
      t.integer :in_room, default: 0

      t.timestamps
    end
  end
end
