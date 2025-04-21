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
    clearInterval(this.syncInterval)
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
    this.localEarnings += 1
  }

  syncBalanceWithServer() {
    fetch(`/encounters/increment_balance`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ earnings: this.localEarnings })
    }).then(() => {
      this.refreshStats()
    })

    this.localEarnings = 0
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