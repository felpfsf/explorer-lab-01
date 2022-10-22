import IMask from 'imask'
const cardNum = document.querySelector('#card-number')
const expDate = document.querySelector('#expiration-date')
const secCode = document.querySelector('#security-code')

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

const secPattern = {
  mask: '0000'
}
const secCodeMasked = IMask(secCode, secPattern)

export { cardNumMasked, expDateMasked, secCodeMasked }
