// app/javascript/controllers/trainers_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  async buyTrainer() {
    this.buttonTarget.disabled = true

    const response = await fetch("/trainers/buy", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    }).then(() => {
      this.refreshFunctions()
    })

    if (response.ok) {
      const data = await response.json()
      this.buttonTarget.textContent = `Hire Trainer (Cost: ${data.next_cost})`
    } else {
      alert("Not enough money or an error occurred.")
    }

    this.buttonTarget.disabled = false
  }

  refreshFunctions() {
    fetch("/encounters/functions")
      .then(response => response.text())
      .then(html => {
        const statsElement = document.getElementById("functions")
        if (statsElement) {
          statsElement.innerHTML = html
        }
      })
  }
}
