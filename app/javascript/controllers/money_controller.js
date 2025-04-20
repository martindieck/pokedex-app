import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    rate: Number, // Money generation in dollars per second per pokemon
    userId: Number,
    catch_count: Number
  }

  connect() {
    this.startEarning()
  }

  disconnect() {
    clearInterval(this.interval)
  }

  startEarning() {
    const intervalMs = (1000 / this.rateValue) * this.catch_countValue

    this.interval = setInterval(() => {
      this.incrementBalance()
    }, intervalMs)
  }

  incrementBalance() {
    fetch(`/encounters/increment_balance`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      }
    }).then(
      document.getElementById("balance").textContent = parseInt(document.getElementById("balance").textContent) + 1
    )
  }
}
