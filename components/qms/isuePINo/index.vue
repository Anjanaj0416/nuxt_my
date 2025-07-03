<template>
    <section class="justify-center">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div class="text-2xl uppercase">Reserve PI No.</div>
          
        </div>
        <div class=" flex items-center justify-center">
            <div class="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 w-full text-center ">
                <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-800">
                    Next Available PI No: <span class="text-blue-900 font-extrabold">{{ reservePi.nextNumber }}</span>
                </h1>
                </div>
                <div>
                <button
                    @click="issueNo"
                    class="inline-flex items-center justify-center gap-2 px-6 py-3 px-24 text-sm font-semibold text-white bg-gradient-to-r from-blue-900 to-blue-700 rounded-full shadow-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300"
                >
                    Issue PI
                </button>
                </div>
            </div>
        </div>
    </section>
  </template>
  
  <script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        receiptFiles: {},
        reservePi: {
          nextNumber:"51",
        }
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
      issueNo() {

        this.$showConfirm(
          "Are you sure to Reserve PI No.?",
          "warning"
        ).then(async (confirmed) => {
          if (!confirmed) return;

          console.log("Reserve PI:", this.reservePi.nextNumber);


        });
      }

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

  @keyframes glow {
  0% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
  }
  100% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
}

.animate-glow {
  animation: glow 1.5s infinite ease-in-out;
}
  </style>
  
  
  