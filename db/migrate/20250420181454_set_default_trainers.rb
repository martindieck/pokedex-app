class SetDefaultTrainers < ActiveRecord::Migration[8.0]
  def change
    change_column_default :users, :trainers, 0
  end
end
