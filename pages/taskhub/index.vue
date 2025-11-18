<template>
    <section >
      
        <div class="mt-6" v-if="userStore.loggedUser.granted === 'hradmin,,,','sso'">
          <dtp/>
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'Supervisor'">
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'Freelance'">
          
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.granted === 'sso'">

        </div>
    </section>
    
</template>
  
  <script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 import cso from '~/components/qms/workFlow/cso.vue';
 import dtp from '~/components/taskHub/bannerMgt/dtp.vue';


 definePageMeta({
    layout: 'default',   
    //middleware: 'auth',
   });
   
  export default {
    
    components: {cso,dtp},
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
  
  
  