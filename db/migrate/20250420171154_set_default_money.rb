class SetDefaultMoney < ActiveRecord::Migration[8.0]
  def change
    change_column_default :users, :money, 0.0
  end
end
