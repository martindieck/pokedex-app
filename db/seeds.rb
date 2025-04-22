# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'httparty'

(1..1025).each do |i|
  response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/#{i}")
  data = response.parsed_response

  puts "Processing ##{i} - #{data['name'].capitalize}"

  pokemon = Pokemon.find_or_initialize_by(pokedex_number: i)  # <─ key line

  # always (re‑)assign the latest data
  pokemon.assign_attributes(
    name:  data['name'].capitalize,
    type1: data['types'][0]['type']['name'].capitalize,
    type2: (data['types'][1]&.dig('type', 'name') || data['types'][0]['type']['name']).capitalize,
    sprite:        data['sprites']['other']['home']['front_default'],
    shiny_sprite:  data['sprites']['other']['home']['front_shiny']
  )

  pokemon.save!   # creates or updates as needed
end

require 'csv'

CSV.foreach(Rails.root.join('db/data/pokemon_rarity.csv'), headers: true) do |row|
  pokemon = Pokemon.find_by(pokedex_number: row['pokedex_number'].to_i)
  if pokemon
    pokemon.update(rarity: row['probability'])
  else
    puts "Pokemon ##{row['pokedex_number']} not found"
  end
end
