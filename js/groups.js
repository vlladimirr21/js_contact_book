// groups.js
import { groups, openGroups } from './state.js'
import { renderContacts } from './contacts.js'

export function renderGroups() {
  const groupSelect = document.getElementById('groupSelect')
  groupSelect.innerHTML = '<option value="">Выберите группу</option>'
  groups.forEach(group => {
    groupSelect.innerHTML += `<option value="${group}">${group}</option>`
    openGroups[group] = false
  })
  renderGroupList()
}

export function renderGroupList() {
  const groupsList = document.getElementById('groupsList')
  groupsList.innerHTML = ''
  groups.forEach(group => {
    const groupItem = document.createElement('div')
    groupItem.className = 'group-item'
    groupItem.innerHTML = `
      <input type="text" value="${group}" readonly>
      <button class="delete-button" onclick="deleteGroup('${group}')">&times;</button>
    `
    groupsList.appendChild(groupItem)
  })
}

export function addGroup() {
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

export function deleteGroup(group) {
  groups = groups.filter(g => g !== group)
  contacts = contacts.filter(contact => contact.group !== group)
  delete openGroups[group]
  localStorage.setItem('groups', JSON.stringify(groups))
  localStorage.setItem('contacts', JSON.stringify(contacts))
  renderGroups()
  renderContacts()
}

export function toggleGroup(group) {
  openGroups[group] = !openGroups[group]
  renderContacts()
}
