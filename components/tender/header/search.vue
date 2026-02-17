<template>
    <section>
           <section class="bg-purple-600 pb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
          <!-- <div class="relative">
            <input
              v-model="SearchText"
              type="search"
              :placeholder="isMobile ? 'Search...' : 'Search tenders, reference no, keywords...'"
              class="w-full rounded-full border border-gray-300 px-6 py-3 pr-14 text-sm text-gray-800
                    focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              @click="onSearchClick"
              class="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2
                    bg-purple-600 hover:bg-purple-700
                    text-white px-6 py-2 rounded-full text-sm font-medium items-center"
            >
              Search
            </button>

            <button
              @click="onSearchClick"
              class="flex sm:hidden absolute right-3 top-1/2 -translate-y-1/2
                    bg-purple-600 hover:bg-purple-700
                    text-white p-2 rounded-full"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div> -->

          <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select v-model="TenderTypeId" class="filter-select">
              <option disabled selected="" value="">Select Type</option>
              <option
                v-for="tenderType in tenderStore.listTenderType"
                :key="tenderType.id"
                :value="tenderType.id"
              >
                {{ tenderType.value }}
              </option>
            </select>

            <select v-model="CategoryId"  class="filter-select">
              <option disabled selected="" value="">Select Category</option>
              <option
                v-for="Category in tenderStore.listTenderCategory"
                :key="Category.id"
                :value="Category.id"
              >
                {{ Category.value }}
              </option>
            </select>

            <select v-model="Days" class="filter-select">
              <option disabled selected="" value="">Select Date (Publish Date)</option>
              <option value="">All</option>
              <option :value="1">Today</option>
              <option :value="7">Last 7 Days</option>
              <option :value="30">Last 30 Days</option>
            </select>

            <button
              @click="clearFilters"
              class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white"
            >
              Clear filters
            </button>


          </div>

        </div>
      </div>
    </section>
    </section>
</template>
  
<script>
  import { useRoute } from 'vue-router'
  import { useUserStore } from "~/stores/modules/userStore";
  import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'default',   
    //middleware: 'auth',
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
  
  
  