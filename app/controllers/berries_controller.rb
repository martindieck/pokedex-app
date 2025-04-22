class BerriesController < ApplicationController
  before_action :authenticate_user!

  def buy
    base_cost = 1000
    cost = (base_cost * (1.15 ** current_user.berries)).to_i

    if current_user.money >= cost
      current_user.update!(
        money: current_user.money - cost,
        berries: current_user.berries + 1,
        earn_rate: (current_user.berries + 1) * 0.1
      )

      new_cost = (base_cost * (1.15 ** current_user.berries)).to_i

      render json: {
        money: current_user.money,
        cost: cost,
        berries: current_user.berries,
        next_cost: new_cost
      }
    else
      render json: { error: "Not enough money" }, status: :unprocessable_entity
    end
  end
end
