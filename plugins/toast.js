// plugins/toast.js
import Swal from 'sweetalert2';

export default defineNuxtPlugin(nuxtApp => {
  // Add showToast globally, available as $showToast
  nuxtApp.provide('showToast', (message, icon = 'success') => {  //success ,error ,warning ,info
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  });
});
