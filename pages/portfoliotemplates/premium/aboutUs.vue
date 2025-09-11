<template>

  <mainHeader />
  <section id="contact" class="mt-28">
    <div class="grid max-w-screen-xl gap-8 px-4 py-8 mx-auto lg:py-16 lg:grid-cols-12">
      <!-- Text Content -->
      <div class="place-self-center lg:col-span-7">
        <h2 class="text-4xl font-bold leading-none">
          {{ store.pageData.standard.aboutParagraph.title }}
        </h2>
        <p class="max-w-lg mt-4 text-base leading-relaxed text-gray-600">
          {{ store.pageData.standard.aboutParagraph.Paragraph1 }}
        </p>
        <p class="max-w-lg mt-4 text-base leading-relaxed text-gray-600">
          {{ store.pageData.standard.aboutParagraph.Paragraph2 }}
        </p>
      </div>

      <!-- Image -->
      <div class="flex justify-center mt-8 lg:mt-0 lg:col-span-5 lg:justify-end">
        <img :src="store.pageData.standard.aboutParagraph.aboutImg" class="w-full max-w-sm h-[40vh] object-cover"
          alt="Team or Company Image" style="border-radius: 85vw 0 85vw 85vw; object-position: center;">
      </div>
    </div>
  </section>

  <footers />

  <whatsappChats />

</template>

<script>
import { ref, computed } from "vue";
import { useDtlStore } from '~/stores/modules/dtlStore';
import whatsappChats from '../chat/whatsappChat.vue';
import mainHeader from "./header.vue";
import footers from "./footer.vue"

definePageMeta({
  layout: 'standard',
  // middleware: 'auth',
});

export default {

  components: {
    whatsappChats,
    mainHeader,
    footers,
  },
  props: [''],
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
    this.store = useDtlStore();
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
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.chat-box-enter-active {
  animation: slideInFromRight 0.5s ease-in-out;
}

.chat-box-leave-active {
  animation: slideInFromRight 0.5s reverse ease-in-out;
}

/* Navbar Specific */
nav a {
  @apply px-3 rounded-lg transition-colors;
}
</style>