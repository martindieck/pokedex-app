class EncountersController < ApplicationController
  before_action :authenticate_user!

  def new
    pokemons = Pokemon.all

    # Extract the rarities (probabilities) for each Pokémon
    rarities = pokemons.map(&:rarity)

    # Calculate the total sum of rarities
    total_rarity = rarities.sum

    # Generate a random float between 0 and total_rarity
    random_value = rand * total_rarity

    # Find the Pokémon based on the random value and rarity distribution
    cumulative_rarity = 0
    @pokemon = pokemons.find do |pokemon|
      cumulative_rarity += pokemon.rarity
      cumulative_rarity >= random_value
    end

    # If no Pokémon was selected (although rare), fallback to the first Pokémon
    @pokemon ||= pokemons.first
  end

  def create
    # Find the Pokémon based on the ID passed in the form
    pokemon = Pokemon.find(params[:pokemon_id])

    # Check if the user has already caught this Pokémon
    user_pokemon = current_user.user_pokemons.find_or_create_by(pokemon: pokemon)

    # Mark the Pokémon as caught if not already
    user_pokemon.update(caught: true) unless user_pokemon.caught?

    redirect_to new_encounter_path, notice: "You caught a #{pokemon.name}!"
  end
end
