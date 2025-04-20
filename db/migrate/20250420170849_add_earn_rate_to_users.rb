class AddEarnRateToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :earn_rate, :float
  end
end
