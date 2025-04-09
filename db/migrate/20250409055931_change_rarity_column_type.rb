class ChangeRarityColumnType < ActiveRecord::Migration[8.0]
  def change
    change_column :pokemons, :rarity, :float
  end
end
