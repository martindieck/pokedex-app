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
    clearInterval(this.syncInterval)

  }

  startAutoclicking() {
    this.syncInterval = setInterval(() => {
      this.syncCatchCountWithServer()
    }, 1000)
  }

  syncCatchCountWithServer() {
    const localPokemon = this.rateValue
    fetch(`/encounters/increment_catch_count`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ catch_count: localPokemon })
    })
  }
}
