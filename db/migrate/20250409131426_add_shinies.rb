class AddShinies < ActiveRecord::Migration[8.0]
  def change
    add_column :user_pokemons, :shiny, :boolean
  end
end
