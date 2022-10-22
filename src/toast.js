import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

function showToast() {
  Toastify({
    text: 'Cartão adicionado com sucesso !',
    duration: 3000,
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
export { showToast }
