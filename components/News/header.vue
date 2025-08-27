
<template>
      <header class="bg-white shadow-md w-full sticky top-0 z-50 mt-8">
    <!-- Top Header -->
    <div class="flex flex-wrap items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
      <!-- Left: Sections and Search -->
      <div class="flex items-center space-x-4">
        <div class="text-sm text-gray-800">
         {{ currentDate }}
        </div>
      </div>

      <!-- Center: Logo -->
      <div class="text-center flex-1">
        <nuxt-link to="/News">
          <img
            src="/assets/img/b2b/BtoBNewsLogo.png"
            alt="B2B.lk Logo"
            class="mx-auto h-24 mb-2"
          />
        </nuxt-link>
      </div>


      <!-- Right: Weather + Buttons -->
      <div class="flex items-center space-x-4 text-sm">
        <!-- Social Media Icons -->
        <div class="flex space-x-3 text-gray-600">
          <a href="#" aria-label="Facebook" class="hover:text-blue-600">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter" class="hover:text-sky-500">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" class="hover:text-pink-600">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn" class="hover:text-blue-700">
            <i class="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Middle Navigation Bar -->
    <nav class="border-t border-gray-200"> 
      <div class="flex overflow-x-auto whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 md:justify-center lg:justify-center">
        <a href="/News" class="hover:text-blue-600 px-4 py-1 inline-block">Home</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Latest News</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Opinion</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Features</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Expose</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Business</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Sports</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">World News</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Videos</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">The Sun</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Life</a>
        <a href="#" class="hover:text-blue-600 px-4 py-1 inline-block">Obituaries</a>
      </div>
    </nav>

  </header>

</template>
  
  <script>
  //import textInput from '~/components/customcontrol/textinput'
  //// import * as Global from '@/assets/js/Global'
  ////import * as myfilter from '@/plugins/myfilter'
 //import Swal from 'sweetalert2';
 //import { useSampleStore  } from '~/stores/modules/sampleStore';
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  

 definePageMeta({
    layout: 'contactus',   
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        currentDate: new Date().toLocaleDateString('en-US', {
            weekday: 'short', 
            day: '2-digit', 
            month: 'short',  
            year: 'numeric' 
        })
       
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
  
  
  