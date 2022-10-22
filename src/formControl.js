import { showToast } from './toast.js'

const formEl = document.querySelector('form')

formEl.addEventListener('submit', e => {
  e.preventDefault()
  clearInputs()
  showToast()
})

function clearInputs() {
  const inputEl = document.querySelectorAll('input')
  inputEl.forEach(itemValue => (itemValue.value = ''))
}

export { formEl, clearInputs }
