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

  nuxtApp.provide('showAlert', (message, icon = 'success') => {  //success ,error ,warning ,info
    Swal.fire({      
      icon: icon,
      title: message,
      showConfirmButton: true,    
      toast: false,
    });
  });

//UseCase
// this.$showConfirm('Are you sure you want to delete this item?', 'warning').then((result) => {
//   if (result) {
//     console.log('Item deleted');
//   } else {
//     console.log('Action canceled');
//   }
// });

  nuxtApp.provide('showConfirm', (message, icon = 'warning') => {
    return Swal.fire({
      title: message,
      icon: icon,  // 'warning', 'info', 'question', etc.
      showCancelButton: true, // Shows the Cancel button
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true, // Reverses the order of the buttons (No, Yes)
    });
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     return true; // User clicked 'Yes'
    //   } else {
    //     return false; // User clicked 'No'
    //   }
    // });
  });

  //UseCase
  // this.$showInput('Please enter your name:').then((input) => {
  //   if (input) {
  //     console.log('User input:', input);
  //   } else {
  //     console.log('No input or canceled');
  //   }
  // });

  nuxtApp.provide('showInput', (message, inputPlaceholder = 'Enter here') => {
    return Swal.fire({
      title: message,
      input: 'text', // You can use 'text', 'email', 'password', 'textarea', etc.
      inputPlaceholder: inputPlaceholder,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a value'; // Error message if input is empty
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        return result.value; // Return the input value
      } else {
        return null; // User clicked 'Cancel'
      }
    });
  });

  //UseCase
  // const htmlMessage = `
  //       <h2 style="color: #007bff;">Hello, Welcome to the Custom HTML Alert!</h2>
  //       <p>This is a <strong>custom HTML</strong> message with <a href="https://www.example.com" target="_blank" style="color: #007bff;">links</a>.</p>
  //       <img src="https://via.placeholder.com/150" alt="Sample Image" style="display: block; margin-top: 10px;" />
  //       <p><em>Note: This is a custom alert with rich HTML content.</em></p>
  //     `;
      
  //     this.$showHtmlAlert(htmlMessage);
  
  nuxtApp.provide('showHtmlAlert', (htmlContent) => {
    Swal.fire({
      title: 'Custom HTML',
      html: htmlContent,  // Pass any HTML content here
      showConfirmButton: true,
      confirmButtonText: 'Okay'
    });
  });

  //UseCase
  // const loadingAlert = this.$showLoading('Loading data, please wait...');
  // loadingAlert.close();
  nuxtApp.provide('showLoading', (message = 'Loading..') => {
    return Swal.fire({
      title: message,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false, // Disable closing the modal by clicking outside
      showConfirmButton: false,
      width:100,
      height:100,
    });
  });

  //UseCase
  // this.$showCustomToast('Operation successful!', 'success', 3000); 

  nuxtApp.provide('showCustomToast', (message, icon = 'info', timer = 2000) => {
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: timer,
      toast: true,
      timerProgressBar: true, // Show a progress bar for the timer
      willClose: () => {
        console.log('Toast will close');
      }
    });
  });

  //Usecase
  //const imageUrl = 'https://via.placeholder.com/400x200';  // You can use any image URL
  //this.$showImageAlert('Here is your custom image!', imageUrl);

  nuxtApp.provide('showImageAlert', (message, imageUrl) => {
    Swal.fire({
      title: message,
      imageUrl: imageUrl,  // URL of the image you want to show
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      showConfirmButton: true,
      confirmButtonText: 'Okay'
    });
  });

// UseCase
//   this.$showCustomButtons('Are you sure you want to proceed?', 'warning').then((result) => {
//     if (result === 'Proceed') {
//       console.log('User confirmed to proceed');
//     } else {
//       console.log('User canceled the action');
//     }
//   });
  nuxtApp.provide('showCustomButtons', (message, icon = 'success') => {
    Swal.fire({
      title: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        return 'Confirmed'; // Action for 'Proceed'
      } else {
        return 'Cancelled'; // Action for 'Cancel'
      }
    });
  });
  
});
