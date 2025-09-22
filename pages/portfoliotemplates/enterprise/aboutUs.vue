<template>

  <heder />

  <section id="contact" class="mt-28">
    <div class="grid max-w-screen-xl gap-8 px-4 py-8 mx-auto lg:py-16 lg:grid-cols-12">
      <!-- Text Content -->
      <div class="place-self-center lg:col-span-7">
        <h2 class="text-4xl font-bold leading-none">
          {{ store.pageData.css.aboutParagraph.title }}
        </h2>
        <p class="max-w-lg mt-4 text-base leading-relaxed text-gray-600">
          {{ store.pageData.css.aboutParagraph.Paragraph1 }}
        </p>
        <p class="max-w-lg mt-4 text-base leading-relaxed text-gray-600">
          {{ store.pageData.css.aboutParagraph.Paragraph2 }}
        </p>
      </div>

      <!-- Image -->
      <div class="flex justify-center mt-8 lg:mt-0 lg:col-span-5 lg:justify-end">
        <img :src="store.pageData.css.aboutParagraph.aboutImg" class="w-full max-w-sm h-[40vh] object-cover"
          alt="Team or Company Image" style="border-radius: 85vw 0 85vw 85vw; object-position: center;">
      </div>
    </div>
  </section>

  <whatsappChats />
  <mainFooter />

</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useDtlStore } from '~/stores/modules/dtlStore';
import whatsappChats from '../chat/whatsappChat.vue';
import heder from "./heder.vue";
import mainFooter from "./footer.vue";


</script>

<script>
definePageMeta({
  layout: 'bst',
});

export default {
  data() {
    return {
      imageroot: process.env.Assets_83,
      isMenuOpen: false,
      isSidebarOpen: false,
      isDropdownOpen: false,
    };
  },
  async mounted() {

  },
  async created() {
    this.store = useDtlStore();

  },
  watch: {},
  computed: {
    // ...mapState({
    //   //loggeduser: (state) => state.loggeduser,
    // }),
  },
  methods: {
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
  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    };
  },
};
</script>

<style scoped>
/* Utility Classes */
.html {
  scroll-behavior: smooth;
}

.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}

/* Navbar Specific */
nav a {
  @apply px-3 rounded-lg transition-colors;
}
</style>