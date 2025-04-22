import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  async buyBerry() {
    this.buttonTarget.disabled = true

    const response = await fetch("/berries/buy", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    }).then(() => {
      this.refreshFunctions()
    }).then(() => {
      this.refreshStats()
    })

    if (response.ok) {
      const data = await response.json()
      this.buttonTarget.textContent = `Buy Berry (Cost: ${data.next_cost})`
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

  refreshStats() {
    fetch("/encounters/stats")
      .then(response => response.text())
      .then(html => {
        const statsElement = document.getElementById("stats")
        if (statsElement) {
          statsElement.innerHTML = html
        }
      })
  }
}
