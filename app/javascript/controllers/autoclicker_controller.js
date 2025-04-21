// app/javascript/controllers/autoclicker_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    rate: Number, // auto_click_rate in clicks per second
    userId: Number
  }

  connect() {
    this.startAutoclicking()
  }

  disconnect() {
    clearInterval(this.interval)
    clearInterval(this.syncInterval)

  }

  startAutoclicking() {
    this.localPokemon = 0

    const intervalMs = 1000 / this.rateValue
    this.interval = setInterval(() => {
      this.incrementCatchCountLocally()
    }, intervalMs)

    this.syncInterval = setInterval(() => {
      if (this.localPokemon > 0) {
        this.syncCatchCountWithServer()
      }
    }, 1000)
  }

  incrementCatchCountLocally() {
    this.localPokemon += 1
  }

  syncCatchCountWithServer() {
    fetch(`/encounters/increment_catch_count`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ catch_count: this.localPokemon })
    })
  }
}
