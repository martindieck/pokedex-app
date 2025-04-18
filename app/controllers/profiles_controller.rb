class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @caught_pokemons = current_user.pokemons.joins(:user_pokemons).where(user_pokemons: { shiny: false }).distinct.sort_by(&:pokedex_number)
    @caught_count = @caught_pokemons.count
    @total_pokemon = 151  # Total number of original Pokémon

    @caught_shinies = current_user.pokemons.joins(:user_pokemons).where(user_pokemons: { shiny: true }).distinct.sort_by(&:pokedex_number)
    @shiny_count = @caught_shinies.count

    @total_catch_count = current_user.catch_count
  end
end
