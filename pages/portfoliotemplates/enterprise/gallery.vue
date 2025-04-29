<template>

    <heder/>
    
    <section class="px-6 py-16 mx-auto mt-16 bg-gradient-to-b from-gray-50 to-white">
            <aside aria-label="Related articles" class="py-8 lg:py-8 dark:bg-gray-800">
            <div class="max-w-screen-xl px-4 mx-auto">
                <h2 class="mb-8 text-4xl font-bold leading-none ">Gallery</h2>

                <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" class="mb-5 rounded-lg" alt="Image 1">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Our first office</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png" class="mb-5 rounded-lg" alt="Image 2">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Enterprise design tips</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png" class="mb-5 rounded-lg" alt="Image 3">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">We partnered with Google</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                    </article>
                    <article class="max-w-xs">
                        <a href="#">
                            <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png" class="mb-5 rounded-lg" alt="Image 4">
                        </a>
                        <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                            <a href="#">Our first project with React</a>
                        </h2>
                        <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                    </article>
                </div>
            </div>
            </aside>
        </section>

    <whatsappChats />
    <mainFooter/>

  </template>
    
    <script setup>
      import { ref } from "vue";
      import { Swiper, SwiperSlide } from "swiper/vue";
      import "swiper/css";
      import "swiper/css/pagination";
      import "swiper/css/autoplay";
      import { useStandpageStore } from '~/stores/modules/dtlStore';
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
          this.store = useStandpageStore();
      
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
    @apply px-3  rounded-lg transition-colors;
  }
  
  
    </style>
    