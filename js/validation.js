// validation.js
export function validateFullName(event) {
  const input = event.target
  input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '')
}

export function validatePhoneNumber(event) {
  const input = event.target
  input.value = input.value.replace(/\D/g, '')

  if (input.value.length > 11) {
    input.value = input.value.slice(0, 11)
  }
}
