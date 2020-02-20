class AddTripRefToPoints < ActiveRecord::Migration[5.2]
  def change
    add_reference :points, :trip, foreign_key: true
  end
end
