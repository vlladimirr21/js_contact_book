// contacts.js
import { contacts, currentContact, groups, openGroups } from './state.js'
import { renderContacts, renderGroups } from './groups.js'
import { openModal } from './modal.js'

export function renderContacts() {
  const content = document.getElementById('accordionExample')
  content.innerHTML = ''

  groups.forEach((group, index) => {
    const contactsHtml = contacts
      .filter(contact => contact.group === group)
      .map(
        contact => `
        <div class="contact-item">
            <div class="contact-info">
                <span class="contact-name">${
                  contact.fullName || 'Фамилия Имя Отчество'
                }</span>
            </div>
            <div class="contact-actions">
                <span class="contact-phone">${
                  contact.phoneNumber || '+7 (ХХХ) ХХХ - ХХ - ХХ'
                }</span>
                <button class="btn button-edit" onclick="editContact(${contacts.indexOf(
                  contact
                )})">
                  <img src="img/edit_button.svg" alt="Edit button" />
                </button>
                <button class="btn button-delete" onclick="deleteContact(${contacts.indexOf(
                  contact
                )})">
                  <img src="img/delete_button.svg" alt="Delete button" />
                </button>
            </div>
        </div>
      `
      )
      .join('')

    const groupContainer = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button ${
            openGroups[group] ? '' : 'collapsed'
          }" type="button"
            data-bs-toggle="collapse" data-bs-target="#collapse${index}"
            aria-expanded="${openGroups[group] ? 'true' : 'false'}"
            aria-controls="collapse${index}" onclick="toggleGroup('${group}')">
            ${group}
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse ${
      openGroups[group] ? 'show' : ''
    }"
          aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            ${contactsHtml || '<p>Нет контактов в этой группе</p>'}
          </div>
        </div>
      </div>
    `

    content.innerHTML += groupContainer
  })
}

export function editContact(index) {
  if (index < 0 || index >= contacts.length) {
    console.error('Invalid index:', index)
    return
  }

  currentContact = index
  const contact = contacts[index]

  document.getElementById('fullName').value = contact.fullName
  document.getElementById('phoneNumber').value = contact.phoneNumber
  document.getElementById('groupSelect').value = contact.group
  document.getElementById('modalTitle').innerText = 'Редактирование контакта'
  openModal('addContactModal')
}

export function deleteContact(index) {
  contacts.splice(index, 1)
  localStorage.setItem('contacts', JSON.stringify(contacts))
  renderContacts()
}

export function saveContact() {
  const fullName =
    document.getElementById('fullName').value || 'Фамилия Имя Отчество'
  const phoneNumber =
    document.getElementById('phoneNumber').value || '+7 (ХХХ) ХХХ - ХХ - ХХ'
  const group = document.getElementById('groupSelect').value

  if (currentContact !== null) {
    contacts[currentContact] = { fullName, phoneNumber, group }
    currentContact = null
  } else {
    contacts.push({ fullName, phoneNumber, group })
  }

  localStorage.setItem('contacts', JSON.stringify(contacts))
  renderContacts()
  closeModal('addContactModal')
}
