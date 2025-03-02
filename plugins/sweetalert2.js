import Swal from 'sweetalert2'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('swal', Swal)  // Make SweetAlert2 available globally  
})