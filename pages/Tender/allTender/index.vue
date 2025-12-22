<template>
  <section class="px-4">
    <div class="text-2xl uppercase font-semibold mb-4">Tenders</div>

    <div class="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
      <div>
        <Button
            class="w-24"
            label="New"
            variant="tender"
            @click="GoToAddNew"
          />
      </div>
      <div class="w-full md:w-96">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>

    <!-- Filter Tabs (Example) -->
    <div class="flex gap-2 mb-4">
      <button class="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">All</button>
      <button class="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold">Pending</button>
      <button class="px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs font-semibold">Completed</button>
    </div>

    <!-- Leads List -->
    <div class="space-y-3">
      <!-- Example Lead Card -->
      <div class="flex flex-col gap-2 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md">
        <div class="flex justify-between items-center">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
            ⏳ 3 Days Pending
          </span>
          <span class="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-500 text-white">
            Pending
          </span>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between mt-2">
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">Vendor Name</h1>
            <p class="text-xs text-gray-500 mt-0.5">ABC Company</p>
          </div>
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">Address</h1>
            <p class="text-xs text-gray-500 mt-0.5">123 Main Street</p>
          </div>
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">Contact Number</h1>
            <p class="text-xs text-gray-500 mt-0.5">+94 123 456 789</p>
          </div>
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">CSO Number</h1>
            <p class="text-xs text-gray-500 mt-0.5">+94 987 654 321</p>
          </div>
        </div>
      </div>

      <!-- Duplicate card for example -->
      <div class="flex flex-col gap-2 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md">
        <div class="flex justify-between items-center">
          <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
            ⏳ 1 Day Pending
          </span>
          <span class="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
            Completed
          </span>
        </div>

        <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between mt-2">
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">Vendor Name</h1>
            <p class="text-xs text-gray-500 mt-0.5">XYZ Pvt Ltd</p>
          </div>
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">Address</h1>
            <p class="text-xs text-gray-500 mt-0.5">456 High Street</p>
          </div>
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">Contact Number</h1>
            <p class="text-xs text-gray-500 mt-0.5">+94 111 222 333</p>
          </div>
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-xs font-semibold text-gray-600">CSO Number</h1>
            <p class="text-xs text-gray-500 mt-0.5">+94 444 555 666</p>
          </div>
        </div>
      </div>
    </div>
    <AddTender v-if="isAddLeads" @close="isAddLeads = false" />

  </section>
</template>

<script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 
    import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
    import SearchComp from "~/components/customcontrol/SearchCompTender";
    import AddTender from '~/components/tender/allTender/addTender.vue';


 definePageMeta({
    layout: 'tenderb2b',   
    // middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,SearchComp,AddTender},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        isAddLeads: false,
       
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

    GoToAddNew() {
      this.isAddLeads = true;
    },
     
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
  