class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @caught_pokemons = current_user.pokemons
    @caught_count = @caught_pokemons.count
    @total_pokemon = 151  # Total number of original Pokémon
  end
end
