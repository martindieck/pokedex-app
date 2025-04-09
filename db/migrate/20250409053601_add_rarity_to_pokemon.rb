class AddRarityToPokemon < ActiveRecord::Migration[8.0]
  def change
    add_column :pokemons, :rarity, :integer
  end
end
