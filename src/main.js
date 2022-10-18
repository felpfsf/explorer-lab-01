import './css/index.css'

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo > span:nth-child(2) > img')

console.log(ccLogo.src);

function setCardType(cardType) {
  const colors = {
    visa: ['#2D57F2', '#436D99'],
    mastercard: ['#C69347', '#DF6F29'],
    javascript:['#EFF30A','#CBC88C'],
    default: ['black', 'gray']
  }
  
  ccBgColor01.setAttribute('fill', colors[cardType][0])
  ccBgColor02.setAttribute('fill', colors[cardType][1])
  ccLogo.setAttribute('src', `cc-${cardType}.svg`)
}

setCardType('javascript')