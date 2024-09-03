// modal.js
import { currentContact } from './state.js'

export function openModal(modalId) {
  const modal = document.getElementById(modalId)
  const closeButton = document.getElementById('closeAddContactModal')

  if (closeButton) {
    closeButton.style.display = 'inline'
  }

  modal.style.display = 'flex'
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  modal.style.display = 'none'

  if (modalId === 'addContactModal') {
    document.getElementById('fullName').value = ''
    document.getElementById('phoneNumber').value = ''
    document.getElementById('groupSelect').value = ''
    document.getElementById('modalTitle').innerText = 'Добавление контакта'
    currentContact = null
  }
}

export function closeModalOnClickOutside(event, modalId) {
  const modalContent = document.querySelector(`#${modalId} .modal-content`)
  if (!modalContent.contains(event.target)) {
    closeModal(modalId)
  }
}
