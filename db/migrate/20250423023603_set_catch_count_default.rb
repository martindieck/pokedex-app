class SetCatchCountDefault < ActiveRecord::Migration[8.0]
  def change
    change_column_default :users, :catch_count, 0
  end
end
