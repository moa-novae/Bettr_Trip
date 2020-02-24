class CreateJoinTableFix < ActiveRecord::Migration[5.2]
  def up
    create_join_table :trip, :users do |t|
      t.index [:trip_id, :user_id]
      t.index [:user_id, :trip_id]
    end

    drop_table :trips_users
  end
  def down
    drop_table :trip_users
    create_join_table :trips, :users do |t|
      t.index [:trip_id, :user_id]
      t.index [:user_id, :trip_id]
    end
  end
end
