class AddAutoClickRateToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :auto_click_rate, :float
  end
end
