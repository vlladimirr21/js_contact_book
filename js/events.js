// events.js
import { openModal, closeModal, closeModalOnClickOutside } from './modal.js'
import { saveContact } from './contacts.js'
import { addGroup } from './groups.js'
import { validateFullName, validatePhoneNumber } from './validation.js'

export function setupEventListeners() {
  document
    .getElementById('addContactBtn')
    .addEventListener('click', () => openModal('addContactModal'))
  document
    .getElementById('manageGroupsBtn')
    .addEventListener('click', () => openManageGroupsModal())
  document
    .getElementById('closeAddContactModal')
    .addEventListener('click', () => closeModal('addContactModal'))
  document
    .getElementById('closeManageGroupsModal')
    .addEventListener('click', () => closeModal('manageGroupsModal'))

  document
    .getElementById('addContactModal')
    .addEventListener('click', event =>
      closeModalOnClickOutside(event, 'addContactModal')
    )
  document
    .getElementById('manageGroupsModal')
    .addEventListener('click', event =>
      closeModalOnClickOutside(event, 'manageGroupsModal')
    )

  document
    .getElementById('saveContactBtn')
    .addEventListener('click', saveContact)
  document.getElementById('addGroupBtn').addEventListener('click', addGroup)

  document
    .getElementById('fullName')
    .addEventListener('input', validateFullName)
  document
    .getElementById('phoneNumber')
    .addEventListener('input', validatePhoneNumber)
}
