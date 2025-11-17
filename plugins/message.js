// plugins/toast.js
import Swal from 'sweetalert2';
import lodingGif from '~/assets/img/digitalTechLabs/LodingGif.gif'

export default defineNuxtPlugin(nuxtApp => {
  // Add showToast globally, available as $showToast
  nuxtApp.provide('showToast', (message, icon = 'success') => {  //success ,error ,warning ,info
    Swal.fire({
      position: 'top-end',
      icon: icon,
      customClass: {
        popup: 'custom-zindex'
      },
      title: message,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
    });
  });


  // Add showAlert globally, available as $showAlert 
  nuxtApp.provide('showAlert', (message, icon = 'success') => {  //success ,error ,warning ,info
    Swal.fire({      
      icon: icon,
      customClass: {
        popup: 'custom-zindex'
      },
      title: message,
      showConfirmButton: true,    
      toast: false,
    });
  });

//UseCase
// this.$showConfirm('Are you sure you want to delete this item?', 'warning').then((result) => {
//   if (result.isConfirmed) {
//     console.log('Item deleted');
//   } else {
//     console.log('Action canceled');
//   }
// });

  nuxtApp.provide('showConfirm', (message, icon = 'warning') => {
    return Swal.fire({
      title: message,
      icon: icon,  // 'warning', 'info', 'question', etc.
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true, // Reverses the order of the buttons (No, Yes)

      // Custom button colors
      confirmButtonColor: '#3B82F6', // Tailwind blue-500 gradient start
      cancelButtonColor: '#F3F4F6',  // Tailwind gray-200 for "Back"
      
      customClass: {
        popup: 'custom-zindex rounded-xl p-4 sm:p-6 shadow-lg max-w-xs sm:max-w-sm text-center',
        title: 'text-sm sm:text-lg font-semibold text-gray-600 mb-2',
        htmlContainer: 'mt-2 mb-3 sm:mb-4 text-xs sm:text-sm', 
        confirmButton: 'px-10 py-2 text-xs sm:text-sm font-semibold rounded-full shadow text-white hover:scale-[1.03] transition-all bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700',
        cancelButton: 'px-10 py-2 text-xs sm:text-sm font-semibold rounded-full shadow text-gray-600 bg-gray-200 hover:bg-gray-300 hover:scale-[1.03] transition-all',
      },
      background: '#ffffff', // white popup
      backdrop: 'rgba(0,0,0,0.4)', // semi-transparent overlay
    });
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
      customClass: {
        popup: 'custom-zindex'
      },
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
      customClass: {
        popup: 'custom-zindex'
      },
      html: htmlContent,  // Pass any HTML content here 
      showConfirmButton: true,
      confirmButtonText: 'Okay'
    });
  });

  //UseCase
  // const loadingAlert = this.$showLoading('Loading data, please wait...');
  // loadingAlert.close();
  nuxtApp.provide('showLoading', (message = 'Loading...') => {
    return Swal.fire({
      title: '',
      html: `
        <div style="
          padding: 30px 40px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          min-width: 200px;
        ">
          <img src="${lodingGif}" alt="Loading..." style="width: 100px; height: 100px;" />
        </div>
      `,
      // ${lodingGif}
      background: 'transparent', // So Swal's background is transparent; your container sets bg
      backdrop: `
      rgba(55, 65, 81, 0.8)
      url("") /* no pattern image */
      left top
      no-repeat
      fixed
      `,
      backdrop: true, // show backdrop overlay
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        // Optional: Focus on Swal or add any animation here
      },
    });
  });





  //UseCase
  // this.$showCustomToast('Operation successful!', 'success', 3000); 

  nuxtApp.provide('showCustomToast', (message, icon = 'info', timer = 2000) => {
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: message,
      customClass: {
        popup: 'custom-zindex'
      },
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
      customClass: {
        popup: 'custom-zindex'
      },
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
      customClass: {
        popup: 'custom-zindex'
      },
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
