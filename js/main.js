// main.js
import { renderGroups } from './groups.js'
import { renderContacts } from './contacts.js'
import { setupEventListeners } from './events.js'

document.addEventListener('DOMContentLoaded', () => {
  renderGroups()
  renderContacts()
  setupEventListeners()
})
