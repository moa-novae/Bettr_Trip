class JoinTableFix < ActiveRecord::Migration[5.2]
  def up
    create_table :trips_users, id: false do |t|
      t.bigint :user_id
      t.bigint :trip_id
    end
    add_index :trips_users, :user_id
    add_index :trips_users, :trip_id

    drop_table :trip_users
  end

  def down
    drop_table :trips_users
    
    create_join_table :trip, :users do |t|
      t.index [:trip_id, :user_id]
      t.index [:user_id, :trip_id]
    end
  end
end
