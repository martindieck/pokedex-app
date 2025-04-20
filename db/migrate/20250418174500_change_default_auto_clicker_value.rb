class ChangeDefaultAutoClickerValue < ActiveRecord::Migration[8.0]
  def change
    change_column_default :users, :auto_click_rate, from: nil, to: 0.0
  end
end
