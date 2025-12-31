<template>
  <div class="">
    <div class="">
      <main class="">
        <div class="bg-white rounded-xl shadow p-6 w-full max-w-4xl">
          <h2 class="text-lg font-semibold mb-2">Welcome 👋</h2>
          <p class="text-gray-600">
            Sidebar and main header are now visually separated.
          </p>

          <!-- Example Test Components -->
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg text-center">Test 1</div>
            <div class="bg-green-50 p-4 rounded-lg text-center">Test 2</div>
            <div class="bg-purple-50 p-4 rounded-lg text-center">Test 3</div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>


  
  <script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'tenderb2b',   
    // middleware: 'auth',
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
        // title: 'Intranet - Digital Tech Labs',
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
  
  
  