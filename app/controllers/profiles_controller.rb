class ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    @caught_pokemons = current_user.pokemons
  end
end
