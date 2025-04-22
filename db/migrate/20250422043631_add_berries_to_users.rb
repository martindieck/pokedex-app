class AddBerriesToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :berries, :float, default: 0.0
  end
end
