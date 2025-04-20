// app/javascript/controllers/buy_trainer_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "money", "trainers"]

  async buyTrainer() {
    this.buttonTarget.disabled = true

    const response = await fetch("/trainers/buy", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })

    if (response.ok) {
      const data = await response.json()
      this.moneyTarget.textContent = data.money
      document.getElementById("balance").textContent = parseInt(document.getElementById("balance").textContent) - data.cost
      this.trainersTarget.textContent = data.trainers
      this.buttonTarget.textContent = `Hire Trainer (Cost: ${data.next_cost})`
    } else {
      alert("Not enough money or an error occurred.")
    }

    this.buttonTarget.disabled = false
  }
}
