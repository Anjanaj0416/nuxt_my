<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6"
  >
    <div class="text-center max-w-md animate-fade-in">

      <!-- Big 404 -->
      <h1
        class="text-[120px] font-extrabold text-qbook/20 dark:text-qbook/30 leading-none select-none"
      >
        404
      </h1>

      <!-- Title -->
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Page not found
      </h2>

      <!-- Description -->
      <p class="text-gray-500 dark:text-gray-400 mb-8">
        Oops! The page you’re looking for doesn’t exist or was moved.
      </p>

      <!-- Buttons -->
      <div class="flex items-center justify-center gap-4">
        <NuxtLink
          to="/qbook"
          class="px-6 py-2.5 text-sm font-medium text-white bg-qbook rounded-lg hover:opacity-90 transition"
        >
          Go Home
        </NuxtLink>

        <button
          @click="$router.back()"
          class="px-6 py-2.5 text-sm font-medium text-qbook border border-qbook rounded-lg hover:bg-qbook hover:text-white transition"
        >
          Go Back
        </button>
      </div>
    </div>
  </section>
</template>
<script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'qbook',   
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    },
    watch: {},
    computed: {
  
    },
    methods: {
    },
    async beforeMount() {
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
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
  </style>
  
  
  