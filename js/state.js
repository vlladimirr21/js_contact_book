// state.js
export let contacts = JSON.parse(localStorage.getItem('contacts')) || []
export let groups = JSON.parse(localStorage.getItem('groups')) || [
  'Друзья',
  'Коллеги',
]
export let currentContact = null
export let openGroups = {}
