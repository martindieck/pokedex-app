class ChangeDefaultEarnRate < ActiveRecord::Migration[8.0]
  def change
    change_column_default :users, :earn_rate, 1.0
  end
end
