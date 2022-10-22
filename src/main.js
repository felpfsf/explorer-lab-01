import './css/index.css'
import IMask from 'imask'

import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const cardHolder = document.querySelector('#card-holder')
const formEl = document.querySelector('form')

function setCardType(cardType) {
  const ccBgColor01 = document.querySelector(
    '.cc-bg svg > g g:nth-child(1) path'
  )
  const ccBgColor02 = document.querySelector(
    '.cc-bg svg > g g:nth-child(2) path'
  )
  const ccLogo = document.querySelector('.cc-logo > span:nth-child(2) > img')
  const colors = {
    visa: ['#FFED4D', '#436D99'],
    mastercard: ['#C69347', '#DF6F29'],
    javascript: ['#EFF30A', '#CBC88C'],
    typescript: ['#2D57F2', '#436D99'],
    default: ['black', 'gray']
  }

  ccBgColor01.setAttribute('fill', colors[cardType][0])
  ccBgColor02.setAttribute('fill', colors[cardType][1])
  ccLogo.setAttribute('src', `cc-${cardType}.svg`)
}

/*
 * IMask Instruções
 *
 * Acessar o elemento e armazenar em uma variável
 * Criar uma mask com o padrão desejado,
 * no exemplo do security-code ele está limitando a apenas números com limite de 4 caracteres
 * No outro exemplo, expiration-date, a máscara está limitando a apenas o mês e o ano em 2
 * chars
 * Para o MM (mês) e YY (ano) foi utilizado o blocks para limitar os valores, no caso do MM
 * foi usado um limite de alcance (MaskedRange) de 1 até 12, e o ano foi de um intervalo de
 * 10 anos
 *
 */
const cardNum = document.querySelector('#card-number')
const cardNumPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardType: 'visa'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,2}\d{0,12}/,
      cardType: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardType: 'javascript'
    },
    {
      mask: '0000 000000 00000',
      regex: /^3[47]\d{0,13}/,
      cardType: 'typescript'
    },
    {
      mask: '0000 0000 0000 0000',
      cardType: 'default'
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')
    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    )
    return foundMask
  }
}
const cardNumMasked = IMask(cardNum, cardNumPattern)

const expDate = document.querySelector('#expiration-date')
const expDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getUTCFullYear()).substring(2),
      to: String(new Date().getFullYear() + 10).substring(2)
    }
  }
}
const expDateMasked = IMask(expDate, expDatePattern)

const secCode = document.querySelector('#security-code')
const secPattern = {
  mask: '0000'
}
const secCodeMasked = IMask(secCode, secPattern)

formEl.addEventListener('submit', e => {
  e.preventDefault()
  clearInputs()
  showToast()
})

function showToast() {
  Toastify({
    text: 'Cartão adicionado com sucesso',
    duration: 3000,
    // close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    style: {
      background: 'linear-gradient(to right, #314755, #26a0da)',
      borderRadius: '25px',
      width: '300px',
      padding: '2rem'
    },
    offset: {
      x: '1/2' // horizontal axis - can be a number or a string indicating unity. eg: '2em'
    }
  }).showToast()
}

function clearInputs() {
  const inputEl = document.querySelectorAll('input')
  inputEl.forEach(itemValue => (itemValue.value = ''))
}

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
