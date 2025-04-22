class EncountersController < ApplicationController
  before_action :authenticate_user!

  def new
    pokemons = Pokemon.all

    # Extract the rarities (probabilities) for each Pokémon
    rarities = pokemons.map(&:rarity)

    # Calculate the total sum of rarities
    total_rarity = rarities.sum

    # Generate a random float between 0 and total_rarity
    rarity_selector = rand * total_rarity

    # See if it's shiny or not
    @is_shiny = rand < 0.01

    # Find the Pokémon based on the random value and rarity distribution
    cumulative_rarity = 0
    @pokemon = pokemons.find do |pokemon|
      cumulative_rarity += pokemon.rarity
      cumulative_rarity >= rarity_selector
    end

    # If no Pokémon was selected (although rare), fallback to the first Pokémon
    @pokemon ||= pokemons.first

    @total_catch_count = current_user.catch_count
  end

  def create
    # Find the Pokémon based on the ID passed in the form
    pokemon = Pokemon.find(params[:pokemon_id])
    is_shiny = ActiveModel::Type::Boolean.new.cast(params[:shiny]) # Ensures it's a proper boolean

    # Check if the user has already caught this Pokémon (shiny or not)
    user_pokemon = current_user.user_pokemons.find_or_create_by(pokemon: pokemon, shiny: is_shiny)

    # Mark the Pokémon as caught if not already
    user_pokemon.update(caught: true) unless user_pokemon.caught?

    current_user.increment!(:catch_count)

    adjective = is_shiny ? "shiny " : ""
    redirect_to new_encounter_path, notice: "You caught a #{adjective}#{pokemon.name}!"
  end

  def increment_catch_count
    current_user.increment!(:catch_count, params[:catch_count].to_i)
    head :ok
  end

  def increment_balance
    current_user.increment!(:money, params[:earnings].to_i)
    head :ok
  end

  def stats
    render partial: "stats", locals: { user: current_user }
  end
end
