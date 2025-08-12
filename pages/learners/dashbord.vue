<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
    <section>
        <div class="grid max-w-screen-xl px-4 mx-auto lg:py-8 lg:gap-8 xl:gap-0 lg:grid-cols-12">
            <!-- Left Section -->
            <div class="mr-auto place-self-center lg:col-span-8">
            <!-- <h1 class="max-w-2xl mb-6 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-gray-900">ABC learners</h1> -->
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aliquam atque ratione,
                exercitationem cupiditate ad assumenda quia. Quos accusamus sed consectetur.
                Exercitationem, mollitia repellendus quod sit earum laboriosam laborum voluptatem?
            </p>

            <section class="bg-white dark:bg-white">
                <div class="max-w-screen-xl px-4 py-8 mx-auto lg:px-0">
                <div class="grid justify-center gap-6 mb-6 lg:mb-16 md:grid-cols-4 sm:grid-cols-4 xs:grid-cols-2">
                    <button
                    class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                    >
                    Registration
                    <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2" />
                    </button>
                    <!-- Add more buttons if needed -->
                </div>
                </div>
            </section>
            </div>

            <!-- Right Section -->
            <div class="hidden lg:mt-0 lg:col-span-4 lg:flex">
            <!-- <img src="~/assets/your-image.png" alt="mockup" /> -->
            </div>
        </div>
    </section>
    <section className="bg-white dark:bg-white">
        <div className="max-w-screen-xl px-4 mx-auto mb-6 lg:px-6 ">
            <div className="grid gap-8 lg:mb-16 md:grid-cols-3">

            </div>  
        </div>
    </section>
    <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
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
    layout: 'learners',   
    middleware: '',
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
  
  
  