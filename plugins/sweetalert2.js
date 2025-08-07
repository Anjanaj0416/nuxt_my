import Swal from 'sweetalert2'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('swal', Swal) ; // Make SweetAlert2 available globally  
  // nuxtApp.provide('showToast', (message, type) => {
  //   Swal.fire({
  //     icon: type,
  //     title: type,
  //     text: message,
  //     timer: 3000,
  //     showConfirmButton: false,
  //     toast: true,
  //     position: 'top-end',
  //   })
  // })
})