import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    rate: Number, // Money generation in dollars per second per pokemon
    userId: Number,
    catchCount: Number
  }

  constructor() {
    super()
    this.runningDecimalSum = 0 // To store the sum of decimal parts
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
    const integerPart = Math.floor(localEarnings)
    const decimalPart = localEarnings - integerPart

    // Accumulate the decimal part
    this.runningDecimalSum += decimalPart

    // If the running decimal sum reaches or exceeds 1, add whole integers to the earnings
    let wholeIntegers = Math.floor(this.runningDecimalSum)
    if (wholeIntegers > 0) {
      this.runningDecimalSum -= wholeIntegers // Remove the whole integers from the running sum
    }

    // Add the whole integers from the decimal sum to the integer part of earnings
    const totalEarnings = integerPart + wholeIntegers

    fetch(`/encounters/increment_balance`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ earnings: totalEarnings })
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