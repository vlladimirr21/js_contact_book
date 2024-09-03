// State
let contacts = JSON.parse(localStorage.getItem('contacts')) || []
let groups = JSON.parse(localStorage.getItem('groups')) || ['Друзья', 'Коллеги']
let currentContact = null
let openGroups = {}
let isAddingGroup = false

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderGroups()
  renderContacts()
  setupEventListeners()
})

function setupEventListeners() {
  document
    .getElementById('addContactBtn')
    .addEventListener('click', () => openModal('addContactModal'))
  document
    .getElementById('manageGroupsBtn')
    .addEventListener('click', openManageGroupsModal)
  document
    .getElementById('closeAddContactModal')
    .addEventListener('click', () => closeModal('addContactModal'))
  document
    .getElementById('closeManageGroupsModal')
    .addEventListener('click', () => closeModal('manageGroupsModal'))

  // Close modal when clicking outside of modal content
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

  document
    .getElementById('addGroupBtn')
    .addEventListener('click', handleAddGroupClick)

  document
    .getElementById('saveGroupsBtn')
    .addEventListener('click', handleSaveGroupClick)
}

// Groups Management
function handleAddGroupClick() {
  if (!isAddingGroup) {
    isAddingGroup = true

    const groupsList = document.getElementById('groupsList')
    const newGroupItem = document.createElement('div')
    newGroupItem.className = 'group-item'
    newGroupItem.innerHTML = `
        <input type="text" placeholder="Введите название группы" id="newGroupNameInput" />
        <button class="btn button-delete button-delete-group" onclick="removeNewGroupInput()">
            <img src="img/delete_button.svg" alt="Delete button" />
        </button>
    `
    groupsList.appendChild(newGroupItem)
  }
}

function handleSaveGroupClick() {
  if (isAddingGroup) {
    const newGroupNameInput = document.getElementById('newGroupNameInput')

    if (newGroupNameInput) {
      const newGroupName = newGroupNameInput.value.trim()

      if (newGroupName && !groups.includes(newGroupName)) {
        groups.push(newGroupName)
        openGroups[newGroupName] = false
        localStorage.setItem('groups', JSON.stringify(groups))
        renderGroups()
        renderContacts()
      }
    }

    isAddingGroup = false
  }
  closeModal('manageGroupsModal')
}

function removeNewGroupInput() {
  const newGroupInput =
    document.getElementById('newGroupNameInput').parentElement
  newGroupInput.remove()
  isAddingGroup = false
}

function renderGroups() {
  const groupSelect = document.getElementById('groupSelect')
  groupSelect.innerHTML = '<option value="">Выберите группу</option>'
  groups.forEach(group => {
    groupSelect.innerHTML += `<option value="${group}">${group}</option>`
    openGroups[group] = false
  })
  renderGroupList()
}

function renderGroupList() {
  const groupsList = document.getElementById('groupsList')
  groupsList.innerHTML = ''
  groups.forEach(group => {
    const groupItem = document.createElement('div')
    groupItem.className = 'group-item'
    groupItem.innerHTML = `
      <input type="text" value="${group}" readonly>
      <button class="btn button-delete button-delete-group" onclick="deleteGroup('${group}')">
        <img
          src="img/delete_button.svg"
          alt="Delete button"
        />
      </button>
    `
    groupsList.appendChild(groupItem)
  })
}

// Contacts Management
function renderContacts() {
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
                  <img
                    src="img/edit_button.svg"
                    alt="Edit button"
                    class=""
                  />
                </button>
                <button class="btn button-delete" onclick="deleteContact(${contacts.indexOf(
                  contact
                )})">
                <img
                    src="img/delete_button.svg"
                    alt="Delete button"
                    class=""
                  />
                </button>
            </div>
        </div>
      `
      )
      .join('')

    const groupContainer = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button
            class="accordion-button ${openGroups[group] ? '' : 'collapsed'}"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${index}"
            aria-expanded="${openGroups[group] ? 'true' : 'false'}"
            aria-controls="collapse${index}"
            onclick="toggleGroup('${group}')"
          >
            ${group}
          </button>
        </h2>
        <div
          id="collapse${index}"
          class="accordion-collapse collapse ${openGroups[group] ? 'show' : ''}"
          aria-labelledby="heading${index}"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            ${contactsHtml || '<p>Нет контактов в этой группе</p>'}
          </div>
        </div>
      </div>
    `

    content.innerHTML += groupContainer
  })
}

// Modal Management
function openModal(modalId) {
  const modal = document.getElementById(modalId)
  const closeButton = document.getElementById('closeAddContactModal')

  if (closeButton) {
    closeButton.style.display = 'inline'
  }

  modal.style.display = 'flex'
}

// Validation of name
function validateFullName(event) {
  const input = event.target
  input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
}

// Validation of number
function validatePhoneNumber(event) {
  const input = event.target
  input.value = input.value.replace(/\D/g, '')

  if (input.value.length > 11) {
    input.value = input.value.slice(0, 11)
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)

  modal.style.display = 'none'

  if (modalId === 'addContactModal') {
    document.getElementById('fullName').value = ''
    document.getElementById('phoneNumber').value = ''
    document.getElementById('groupSelect').value = ''

    document.getElementById('modalTitle').innerText = 'Добавление контакта'

    const closeButton = document.getElementById('closeAddContactModal')
    if (closeButton) {
      closeButton.style.display = 'inline'
    }

    currentContact = null
  }
}

// Close modal outside
function closeModalOnClickOutside(event, modalId) {
  const modalContent = document.querySelector(`#${modalId} .modal-content`)
  if (!modalContent.contains(event.target)) {
    closeModal(modalId)
  }
}

function openManageGroupsModal() {
  renderGroupList()
  openModal('manageGroupsModal')
}

// Contact Handling
function saveContact() {
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

function editContact(index) {
  if (index < 0 || index >= contacts.length) {
    console.error('Invalid index:', index)
    return
  }

  currentContact = index
  const contact = contacts[index]
  console.log(contact)

  document.getElementById('fullName').value = contact.fullName
  document.getElementById('phoneNumber').value = contact.phoneNumber
  document.getElementById('groupSelect').value = contact.group
  document.getElementById('modalTitle').innerText = 'Редактирование контакта'
  openModal('addContactModal')
}

function deleteContact(index) {
  contacts.splice(index, 1)
  localStorage.setItem('contacts', JSON.stringify(contacts))
  renderContacts()
}

function addGroup() {
  const newGroup = document.getElementById('newGroupName').value.trim()
  if (newGroup && !groups.includes(newGroup)) {
    groups.push(newGroup)
    openGroups[newGroup] = false
    document.getElementById('newGroupName').value = ''
    localStorage.setItem('groups', JSON.stringify(groups))
    renderGroups()
    renderContacts()
  }
}

function deleteGroup(group) {
  groups = groups.filter(g => g !== group)
  contacts = contacts.filter(contact => contact.group !== group)
  delete openGroups[group]
  localStorage.setItem('groups', JSON.stringify(groups))
  localStorage.setItem('contacts', JSON.stringify(contacts))
  renderGroups()
  renderContacts()
}

function toggleGroup(group) {
  openGroups[group] = !openGroups[group]
  renderContacts()
}
