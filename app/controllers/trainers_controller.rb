class TrainersController < ApplicationController
  before_action :authenticate_user!

  def buy
    base_cost = 100
    cost = (base_cost * (1.15 ** current_user.trainers)).to_i

    if current_user.money >= cost
      current_user.update!(
        money: current_user.money - cost,
        trainers: current_user.trainers + 1,
        auto_click_rate: current_user.trainers * 0.1
      )

      new_cost = (base_cost * (1.15 ** current_user.trainers)).to_i

      render json: {
        money: current_user.money,
        cost: cost,
        trainers: current_user.trainers,
        next_cost: new_cost
      }
    else
      render json: { error: "Not enough money" }, status: :unprocessable_entity
    end
  end
end
