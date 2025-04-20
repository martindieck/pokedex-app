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
    this.localEarnings = 0

    const intervalMs = (1000 / this.rateValue) * this.catch_countValue
    this.interval = setInterval(() => {
      this.incrementBalanceLocally()
    }, intervalMs)

    this.syncInterval = setInterval(() => {
      if (this.localEarnings > 0) {
        this.syncBalanceWithServer()
      }
    }, 1000)
  }

  incrementBalanceLocally() {
    const balanceElement = document.getElementById("balance")
    balanceElement.textContent = parseInt(document.getElementById("balance").textContent) + 1
    this.localEarnings += 1
  }

  syncBalanceWithServer() {
    fetch(`/encounters/increment_balance`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({earnings: this.localEarnings})
  })
    this.localEarnings = 0
  }
}