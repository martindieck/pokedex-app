class CreatePokemons < ActiveRecord::Migration[8.0]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :type1
      t.string :type2
      t.integer :pokedex_number
      t.string :sprite
      t.string :shiny_sprite

      t.timestamps
    end
  end
end
