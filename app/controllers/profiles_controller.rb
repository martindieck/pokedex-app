class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @caught_pokemons = current_user.pokemons.joins(:user_pokemons).where(user_pokemons: { shiny: false }).distinct
    @caught_count = @caught_pokemons.count
    @total_pokemon = 151  # Total number of original Pokémon

    @caught_shinies = current_user.pokemons.joins(:user_pokemons).where(user_pokemons: { shiny: true }).distinct
    @shiny_count = @caught_shinies.count
  end
end
