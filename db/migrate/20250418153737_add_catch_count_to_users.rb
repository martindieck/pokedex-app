class AddCatchCountToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :catch_count, :integer
  end
end
