class AddTimeToPoints < ActiveRecord::Migration[5.2]
  def change
    add_column :points, :travel_method, :string
    add_column :points, :travel_duration, :string
    
  end
end
