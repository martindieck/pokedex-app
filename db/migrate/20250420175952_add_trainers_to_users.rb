class AddTrainersToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :trainers, :integer
  end
end
