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
  }

  startAutoclicking() {
    const intervalMs = 1000 / this.rateValue

    this.interval = setInterval(() => {
      this.incrementCatchCount()
    }, intervalMs)
  }

  incrementCatchCount() {
    fetch(`/encounters/increment_catch_count`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        "Content-Type": "application/json"
      }
    }).then(
      document.getElementById("catch-count").textContent = parseInt(document.getElementById("catch-count").textContent) + 1
    )
  }
}
