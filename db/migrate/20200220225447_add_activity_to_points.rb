class AddActivityToPoints < ActiveRecord::Migration[5.2]
  def change
    add_column :points, :activity, :string
  end
end
