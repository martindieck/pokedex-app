import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    rate: Number, // Money generation in dollars per second per pokemon
    userId: Number,
    catchCount: Number
  }

  connect() {
    this.startEarning()
  }

  disconnect() {
    clearInterval(this.syncInterval)
  }

  startEarning() {
    this.syncInterval = setInterval(() => {
        this.syncBalanceWithServer()
    }, 1000)
  }


  syncBalanceWithServer() {
    const localEarnings = this.rateValue * this.catchCountValue
    fetch(`/encounters/increment_balance`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ earnings: localEarnings })
    }).then(() => {
      this.refreshStats()
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