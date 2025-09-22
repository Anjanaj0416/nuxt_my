<!-- <template>
    <div>
        <button
        @click="handleSideButton"
        :class="[`fixed p-4 text-white transition-all duration-300 transform bg-${store.pageData.css.btnColor} rounded-full shadow-xl bottom-16 right-4 hover:scale-105 ` ,'bg-blue-900']"
        >
        <span class="text-lg font-semibold">💬</span>
        </button>
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
    import { useDtlStore } from '~/stores/modules/dtlStore';
  
  
   definePageMeta({
      layout: 'standard',   
     });
     
    export default {
      
      components: {},
      props:[''],
      data() {
        return {
          newMessage: '',
          messages: [],
          autoReplied: false,
          backendMessageShown: false, 
        }
  
      },
  
      created() {     
        this.store = useDtlStore();
       },
      watch: {},
      computed: {
  
      },
      methods: {
        handleSideButton() {
          this.showChatBox = !this.showChatBox;
          if (this.showChatBox) {
            this.messages = [{ text: "Hi! Please wait, we're preparing to assist you.", isUser: false }];
          }
        },
        sendMessage() {
          if (this.newMessage.trim()) {

            this.messages.push({ text: this.newMessage, isUser: true });
  
            this.newMessage = "";
  
            if (!this.autoReplied) {
              this.autoReplied = true;
              setTimeout(() => {
                this.messages.push({ text: "Thank you for your message! We'll get back to you shortly.", isUser: false });
                this.getBackendMessages();
              }, 1000);
            }
          }
        },
        getBackendMessages() {
          if (!this.backendMessageShown) {
            this.backendMessageShown = true;
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
    
    
     -->


<template>
  <div>
    <!-- WhatsApp Chat Button -->
    <button @click="handleSideButton" :class="[
      `fixed p-4 text-white transition-all duration-300 transform bg-${store.pageData.standard.btnColor} rounded-full shadow-xl bottom-16 right-4 hover:scale-105`,
      'bg-blue-900'
    ]">
      <!-- WhatsApp Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="white" viewBox="0 0 24 24">
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.67-1.611-.916-2.211-.242-.579-.487-.501-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.007-1.412.248-.694.248-1.29.173-1.412-.074-.123-.272-.198-.57-.347zm-5.421 6.259h-.002a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.823 9.823 0 012.893 6.991c-.003 5.45-4.437 9.884-9.889 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .167 5.328.163 11.888a11.82 11.82 0 001.607 5.977L0 24l6.306-1.654a11.84 11.84 0 005.717 1.458h.005c6.554 0 11.884-5.328 11.888-11.888a11.82 11.82 0 00-3.487-8.472z" />
      </svg>
    </button>
  </div>
</template>

<script>
import { useDtlStore } from '~/stores/modules/dtlStore';

definePageMeta({
  layout: 'standard',
});

export default {
  data() {
    return {};
  },
  created() {
    this.store = useDtlStore();
  },
  methods: {
    handleSideButton() {
      const phoneNumber = '94771234567';
      const defaultMessage = "Hi! Please wait, we're preparing to assist you.";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
      window.open(whatsappUrl, '_blank');
    }
  },
  head() {
    return {
      title: 'Starter Package',
    };
  }
}
</script>

<style scoped>
/* Optional custom styles */
</style>