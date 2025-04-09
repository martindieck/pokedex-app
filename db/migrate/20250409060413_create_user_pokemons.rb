class CreateUserPokemons < ActiveRecord::Migration[8.0]
  def change
    create_table :user_pokemons do |t|
      t.references :user, null: false, foreign_key: true
      t.references :pokemon, null: false, foreign_key: true
      t.boolean :caught

      t.timestamps
    end
  end
end
