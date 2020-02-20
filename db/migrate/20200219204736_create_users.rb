class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table "users", force: :cascade do |t|
      t.string "email"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end
  end
end
