class MakeBerriesInteger < ActiveRecord::Migration[8.0]
  def change
    change_column :users, :berries, :integer
  end
end
