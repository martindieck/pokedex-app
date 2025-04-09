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

(1..151).each do |i|
  response = HTTParty.get("https://pokeapi.co/api/v2/pokemon/#{i}")
  data = response.parsed_response
  name = data['name'].capitalize
  types = data['types'].map { |type| type['type']['name'].capitalize }
  type1, type2 = types[0], types[1] || types[0]
  sprite_url = data['sprites']['other']['home']['front_default']
  shiny_sprite_url = data['sprites']['other']['home']['front_shiny']

  Pokemon.create(
    name: name,
    type1: type1,
    type2: type2,
    pokedex_number: i,
    sprite: sprite_url,
    shiny_sprite: shiny_sprite_url
  )
end
