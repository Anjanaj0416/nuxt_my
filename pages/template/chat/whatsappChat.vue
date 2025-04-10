<template>
    <div>
        <button
        @click="handleSideButton"
        :class="[`fixed p-4 text-white transition-all duration-300 transform bg-${store.pageData.css.btnColor} rounded-full shadow-xl bottom-16 right-4 hover:scale-105 ` ,'bg-blue-900']"
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
            :class="[`px-6 py-2 text-white transition-all duration-200 bg-${store.pageData.css.btnColor} rounded-r-lg shadow-md hover:to-blue-600`,'bg-blue-900']"
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
  
  //  const store = useStandpageStore();
  
  
  
  
   definePageMeta({
      layout: 'standard',   
     // middleware: 'auth',
     });
     
    export default {
      
      components: {},
      props:[''],
      data() {
        return {
          showChatBox: false,  // Ensures the chat box starts hidden
          newMessage: '',
          messages: [],
          autoReplied: false,
          backendMessageShown: false, 
        }
  
      },
  
      created() {     
        this.store = useStandpageStore();
        //  console.log('color:',store);
       },
      watch: {},
      computed: {
  
      },
      methods: {
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
    
    
    