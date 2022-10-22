import './css/index.css'
import { setCardType } from './setCardType.js'
import { formEl, clearInputs } from './formControl.js'
import { cardNumMasked, expDateMasked, secCodeMasked } from './masks'

const cardHolder = document.querySelector('#card-holder')

formEl
clearInputs

cardHolder.addEventListener('input', e => {
  const cardNameEl = document.querySelector('.cc-holder .value')
  cardNameEl.textContent = e.target.value.length
    ? e.target.value
    : 'FULANO DA SILVA'
})

cardNumMasked.on('accept', () => {
  const cardType = cardNumMasked.masked.currentMask.cardType
  const cardNumEl = document.querySelector('.cc-number')
  cardNumEl.textContent = cardNumMasked.value.length
    ? cardNumMasked.value
    : '1234 5678 9012 3456'
  console.log(cardType)

  setCardType(cardType)
})

secCodeMasked.on('accept', () => {
  const ccSecCodeEl = document.querySelector('.cc-security .value')
  ccSecCodeEl.textContent = secCodeMasked.value.length
    ? secCodeMasked.value
    : '123'
})

expDateMasked.on('accept', () => {
  const ccSecCodeEl = document.querySelector('.cc-expiration .value')
  ccSecCodeEl.textContent = expDateMasked.value.length
    ? expDateMasked.value
    : '02/32'
})
