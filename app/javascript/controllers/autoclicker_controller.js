// app/javascript/controllers/autoclicker_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    rate: Number, // auto_click_rate in clicks per second
    userId: Number
  }
  
  connect() {
    this.runningDecimalSum = 0
    this.startAutoclicking()
  }

  disconnect() {
    clearInterval(this.syncInterval)
  }

  startAutoclicking() {
    this.syncInterval = setInterval(() => {
      this.syncCatchCountWithServer()
    }, 1000)
  }

  syncCatchCountWithServer() {
    const localPokemon = this.rateValue
    const integerPart = Math.floor(localPokemon)
    const decimalPart = localPokemon - integerPart
    console.log("local ", localPokemon)
    console.log("running ", this.runningDecimalSum)

    // Accumulate the decimal part
    this.runningDecimalSum += decimalPart

    // If the running decimal sum reaches or exceeds 1, add whole integers to the integer part
    let wholeIntegers = Math.floor(this.runningDecimalSum)
    if (wholeIntegers > 0) {
      this.runningDecimalSum -= wholeIntegers // Remove the whole integers from the running sum
    }

    // Send the integer part plus any whole integers from the decimal sum
    const totalCatchCount = integerPart + wholeIntegers

    fetch(`/encounters/increment_catch_count`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ catch_count: totalCatchCount })
    })
  }
}
