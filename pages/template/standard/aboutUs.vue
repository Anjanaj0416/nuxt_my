<template>
  
    <section class="bg-center bg-cover">
      <nav :class="[`fixed top-0 left-0 z-50 w-full bg-${store.pageData.css.navbar.navbarColor}`,'bg-blue-900']">
        <div class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <a href="/template/standard/standard" class="flex items-center space-x-3">
          <span class="self-center text-2xl font-semibold text-white">{{ store.pageData.css.logo || 'Logo' }}</span>
        </a>
  
          <!-- Mobile Menu Button -->
          <button @click="toggleMenu" class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="purple" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
  
          <!-- Desktop Navbar -->
          <div class="hidden md:block md:w-auto">
            <ul class="flex space-x-8 font-medium">
              <li><a href="#" class="text-white hover:text-gray-300">Home</a></li>
              <li><a href="#service" class="text-white hover:text-gray-300">Services</a></li>
              <li><a href="#product" class="text-white hover:text-gray-300">Product</a></li>
              <li><a href="#about" class="text-white hover:text-gray-300">About</a></li>
              <li><a href="#contact" class="text-white hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
  
      <!-- Mobile Side Drawer -->
      <div v-if="isMenuOpen" @click="closeMenu" class="fixed inset-0 z-40 bg-black bg-opacity-50"></div>
  
      <div
        :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
        class="fixed top-0 right-0 z-50 w-64 h-full p-5 transition-transform transform bg-white shadow-lg"
      >
        <button @click="closeMenu" class="absolute text-gray-600 top-4 right-4 hover:text-black">
          ✖
        </button>
        <ul class="mt-10 space-y-4 font-medium">
          <li><a href="#" class="text-gray-800 hover:text-gray-300">Home</a></li>
          <li><a href="#service" class="text-gray-800 hover:text-gray-300">Services</a></li>
          <li><a href="#product" class="text-gray-800 hover:text-gray-300">Product</a></li>
          <li><a href="#about" class="text-gray-800 hover:text-gray-300">About</a></li>
          <li><a href="#contact" class="text-gray-800 hover:text-gray-300">Contact</a></li>
        </ul>
      </div>
    </section>
  
    <!-- <div>
     data:{{store.pageData.css}}
    </div> -->
      
    <section id="contact" class="mt-16 ">
      <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <!-- Text Content -->
        <div class="mr-auto place-self-center lg:col-span-7">
          <h2 class="text-4xl font-bold leading-none ">{{store.pageData.css.aboutParagraph.title}}</h2>
          <p class="max-w-lg mt-4 text-base leading-relaxed text-gray-600">
            {{store.pageData.css.aboutParagraph.Paragraph1}}
          </p>
          <p class="max-w-lg mt-4 text-base leading-relaxed text-gray-600">
           {{store.pageData.css.aboutParagraph.Paragraph2}}
  
          </p>
        </div>
  
      <!-- Image -->
  
      <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img 
          :src="store.pageData.css.aboutParagraph.aboutImg" 
          class="relative w-full h-[25vh] object-cover"
          alt="Team or Company Image"
          style="border-radius: 85vw 0 85vw 85vw; object-fit: cover; object-position: center;"
        >
      </div>
  
      </div>
    </section>
  
    <footer class="fixed left-0 w-full py-4 mt-auto bg-white border-t-4 border-purple-800 lg:bottom-0 sm:p-6">
      <div class="max-w-screen-xl mx-auto">
          <div class="md:flex md:justify-between">
              <div class="mb-6 md:mb-0">
                  <a href="https://flowbite.com" class="flex items-center">
                      <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="FlowBite Logo" /> -->
                      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Logo</span>
                  </a>
              </div>
              <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Our Resources</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <a href="https://your-clothing-store.com" class="hover:underline">Our Clothing Collection</a>
                        </li>
                        <li class="mb-4">
                            <a href="https://your-clothing-store.com/blog" class="hover:underline">Fashion Blog</a>
                        </li>
                        <li class="mb-4">
                            <a href="https://your-clothing-store.com/size-guide" class="hover:underline">Size Guide</a>
                        </li>
                        <li>
                            <a href="https://your-clothing-store.com/contact" class="hover:underline">Contact Us</a>
                        </li>
                    </ul>
                </div>
  
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                      <ul class="text-gray-600 dark:text-gray-400">
                          <li class="mb-4">
                              <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Facebook</a>
                          </li>
                          <li>
                              <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Instagram</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul class="text-gray-600 dark:text-gray-400">
                          <li class="mb-4">
                              <a href="#" class="hover:underline">Privacy Policy</a>
                          </li>
                          <li>
                              <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" class="hover:underline">DigitalTechLab™</a>. All Rights Reserved.
              </span>
              <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
                  </a>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
                  </a>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                  </a>
              </div>
          </div>
      </div>
    </footer>
  
    <div>
      <button
        @click="handleSideButton"
        class="fixed p-4 text-white transition-all duration-300 transform bg-blue-900 rounded-full shadow-xl bottom-16 right-4 hover:scale-105 hover:from-green-500 hover:to-blue-600"
      >
        <span class="text-lg font-semibold">💬</span>
      </button>
  
      <!-- Chat Box -->
      <div
        v-if="showChatBox"
        class="fixed bottom-0 right-0 z-50 w-full max-w-md p-4 transition-all duration-500 ease-in-out transform translate-x-full bg-white rounded-tl-lg shadow-2xl"
        :style="{ transform: showChatBox ? 'translateX(0)' : 'translateX(100%)' }"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-700">Chat Support</h3>
          <button
            @click="closeChat"
            class="text-xl text-gray-600 transition-colors hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div class="p-2 py-6 space-y-3 overflow-y-auto border border-gray-200 rounded-lg max-h-56 bg-gray-50">
          <div v-for="(msg, index) in messages" :key="index" class="py-1 text-sm text-gray-800">
            <p :class="{'text-right': msg.isUser, 'text-left': !msg.isUser}">
              <span :class="{'bg-blue-100 p-2 rounded-lg': msg.isUser, 'bg-gray-200 p-2 rounded-lg': !msg.isUser}">{{ msg.text }}</span>
            </p>
          </div>
        </div>
        <div class="flex mt-4">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type a message..."
            class="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            @click="sendMessage"
            class="px-6 py-2 text-white transition-all duration-200 bg-blue-900 rounded-r-lg shadow-md hover:to-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  
    
  </template>
    
  <script>
    import { ref, computed } from "vue";
    import { useStandpageStore } from '~/stores/modules/dtlStore';
  

   definePageMeta({
      layout: 'standard',   
     // middleware: 'auth',
     });
     
    export default {
      
      components: {},
      props:[''],
      data() {
        return {
          imageroot: process.env.Assets_83,
          isMenuOpen: false,
          isSidebarOpen: false,
          isDropdownOpen: false,
          showChatBox: false,  // Ensures the chat box starts hidden
          newMessage: '',
          messages: [],
          autoReplied: false,
          backendMessageShown: false, 
        }
  
      },
      async mounted() {
       
      },
      async created() {     
         this.store = useStandpageStore();
        //  console.log('color:',store);
         
       },
      watch: {},
      computed: {
  
      },
      methods: {
        toggleMenu() {
          this.isMenuOpen = !this.isMenuOpen;
        },
        closeMenu() {
          this.isMenuOpen = false;
        },
        closeAll(event) {
          if (
            this.isSidebarOpen &&
            !this.$el.querySelector('aside')?.contains(event.target) &&
            window.innerWidth < 768
          ) {
            this.isSidebarOpen = false;
          }
          if (
            this.isDropdownOpen &&
            !this.$el.querySelector('.relative.ml-3')?.contains(event.target)
          ) {
            this.isDropdownOpen = false;
          }
        },
        handleSideButton() {
          this.showChatBox = !this.showChatBox;
          if (this.showChatBox) {
            // Initially, show the welcome message
            this.messages = [{ text: "Hi! Please wait, we're preparing to assist you.", isUser: false }];
          }
        },
        sendMessage() {
          if (this.newMessage.trim()) {
            // Add the customer's message
            this.messages.push({ text: this.newMessage, isUser: true });
  
            // Clear input field
            this.newMessage = "";
  
            // If the auto-reply hasn't been sent yet, send it
            if (!this.autoReplied) {
              this.autoReplied = true;
              // Send the auto-reply message
              setTimeout(() => {
                this.messages.push({ text: "Thank you for your message! We'll get back to you shortly.", isUser: false });
                
                // Simulate receiving backend messages only once
                this.getBackendMessages();
              }, 1000);
            }
          }
        },
        getBackendMessages() {
          // Ensure the backend message only shows once
          if (!this.backendMessageShown) {
            this.backendMessageShown = true;
            // Simulate a backend message (you can replace this with an actual API call)
            setTimeout(() => {
              this.messages.push({ text: "How can I assist you further?", isUser: false });
            }, 2000);
          }
        },
        closeChat() {
          this.showChatBox = false;
        },
      },
      mounted() {
        document.addEventListener('click', this.closeAll);
      },
      beforeUnmount() {
        document.removeEventListener('click', this.closeAll);
      },
      async beforeMount() {
      },
      head() {
        return {
          title: 'Starter Package',
        }
      },
    }
  
    </script>
    
    <style scoped>
    .csscmd{
      @apply p-2 text-center bg-blue-200 rounded;
    }
    .csscmd:hover{
      @apply bg-blue-200 cursor-pointer;
    }
    
    .cssBox {
      border: 1px solid;
      @apply border-gray-500 rounded p-2;
    }
  
    @keyframes slideInFromRight {
      0% { transform: translateX(100%); }
      100% { transform: translateX(0); }
    }
  
    .chat-box-enter-active {
      animation: slideInFromRight 0.5s ease-in-out;
    }
  
    .chat-box-leave-active {
      animation: slideInFromRight 0.5s reverse ease-in-out;
    }
    </style>
    
    
    