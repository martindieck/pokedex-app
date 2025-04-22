class SetBerriesDefault < ActiveRecord::Migration[8.0]
  def change
    change_column_default :users, :berries, 0
  end
end
