class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table "trips", force: :cascade do |t|
      t.date "start_date"
      t.date "end_date"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.string "name"
    end
  end
end
