class CreatePoints < ActiveRecord::Migration[5.2]
  def change
    create_table "points", force: :cascade do |t|
      t.string "name"
      t.decimal "latitude"
      t.decimal "longitude"
      t.datetime "start_time"
      t.datetime "end_time"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  end
end
