<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">

    <!-- Page Title -->
    <div class="text-2xl uppercase">Tender Banner</div>

    <!-- Header Actions -->
    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <Button
          class="w-24"
          label="New"
          variant="primary"
          @click="GoToAddNew"
        />
      </div>

      <div class="w-full md:w-96">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>

    <!-- Filter Tabs -->
    <!-- <div class="flex gap-2 mb-4">
      <button class="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
        All
      </button>
      <button class="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold">
        Publish
      </button>
      <button class="px-3 py-1 rounded-full bg-green-50 text-green-800 text-xs font-semibold">
        Close
      </button>
    </div> -->

    <!-- Empty State -->

    <div
      v-if="!tenderStore.TenderBannerList || tenderStore.TenderBannerList.length === 0"
      class="text-center text-gray-900 mt-5 text-sm font-medium"
    >
      No Tender Banner available...
    </div>

    <!-- Tender Cards -->
    <div
      class="flex flex-col gap-2 p-4 mt-3 bg-white border rounded-xl shadow-sm hover:shadow-md "
      v-for="(tender, index) in paginatedTenderBannerList"
      :key="index"
    >
    
      <div class="flex justify-between">
        <!-- <span
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold"
        >
          ⏳ {{ tender.noofDaysPending }} Days Pending
        </span>
        <span
          :class="{
            'bg-blue-500 text-white font-semibold': tender.status === 'Publish',
            'bg-amber-500 text-white font-semibold': tender.status === 'Close',
          }"
          class="inline-flex items-center text-xs font-medium me-2 px-2.5 py-0.5 rounded-full md:hidden"
        >
          {{ tender.status || '—' }}
        </span> -->
      </div>
      <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between">
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Banner App Name</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="tender.bannerAppName">{{ tender.bannerAppName }}</span>
            <span v-else class="flex items-center text-sm text-gray-400">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Banner Section</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="tender.bannerSection">{{ tender.bannerSection }}</span>
            <span v-else class="flex items-center text-sm text-gray-400">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Sort Order</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="tender.sortOrder">{{ tender.sortOrder }}</span>
            <span v-else class="flex items-center text-sm text-gray-400">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Publishe dDate</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="tender.publishedDate">{{ tender.publishedDate }}</span>
            <span v-else class="flex items-center text-sm text-gray-400 ">No Data Available</span>
          </p>
        </div>
        <div class="flex flex-col text-center sm:text-left">
          <h1 class="text-xs font-semibold text-gray-600">Expire Date</h1>
          <p class="text-xs text-gray-500 mt-0.5">
            <span v-if="tender.expireDate">{{ tender.expireDate }}</span>
            <span v-else class="flex items-center text-sm text-gray-400">No Data Available</span>
          </p>
        </div>
        <!-- Status -->
       <!-- <div class="flex flex-col text-center sm:text-left hidden sm:flex">
          <h1 class="text-xs font-semibold text-gray-600">Status</h1>
          <span
            :class="{
              'bg-blue-500 text-white font-semibold':  tender.status === 'Publish',
              'bg-amber-500 text-white font-semibold':  tender.status === 'Close',
            }"
            class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
          >
            {{ tender.status || '—' }}
          </span>
        </div> -->
      </div>

      <div
        class="flex flex-row items-center gap-1 mt-1 mb-2 sm:flex-row sm:justify-end sm:mb-0 sm:mt-0 sm:-my-3"
      >
        <LinkBtn
          :label="isMore && rowIndex === index ? 'Less' : 'More'"
          class="text-black dark:bg-transparent text-xs font-medium dark:text-blue-900"
          @click="
            isMore = !isMore;
            rowIndex = index;
          "
        />
      </div>
      <div v-if="isMore && rowIndex === index">
        <!-- <pre>{{ JSON.stringify(tender, null, 2) }}</pre> -->
        <section class="flex flex-col gap-5 p-4 mt-0 bg-white sm:p-6">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
            <div class="text-center sm:text-left">
              <h2 class="block text-xs font-semibold text-gray-600 mb-2">Organization Type</h2>
               <img
                  :src="imageroot + tender.bannerUrl"
                  alt="Tender Banner"
                  class="w-full h-full object-cover mb-4"
                  ref="bannertenderImage"
                />
            </div>
          </div>
          <!-- Action Buttons -->
          <!-- <div
            class="flex justify-end pt-2"
          >
            <button
              class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-indigo-400"
              
            >
              Update
            </button>
          </div> -->
        </section>
      </div>
    </div>

    <Pagination
      :total-items="tenderStore.TenderBannerList?.length || 0"
      :items-per-page="itemsPerPage"
      :current-page="page"
      active-color="#7c3aed"  
      @update:currentPage="page = $event"
    />

    <!-- Modal -->
    <Banner v-if="isAddLeads" @close="isAddLeads = false" />
  </section>
</template>


<script>
  import { useUserStore } from "~/stores/modules/userStore";
  import { useTenderStore } from "~/stores/modules/tender/tenderStore";
  import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button.vue";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import SearchComp from "~/components/customcontrol/SearchComp";
  import Banner from "~/components/tender/banner/index.vue";
  import Pagination from "~/components/customcontrol/Pagination.vue";


 definePageMeta({
    layout: 'default',   
    // middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,SearchComp,Banner,Pagination},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        isAddLeads: false,
        rowIndex: -1,
        isMore: false,
        page: 1,
        itemsPerPage: 5,
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.tenderStore = useTenderStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;

      const req = {
        bannerAppName: "Tender",
        bannerSection: "TenderSideBanner"
      };

      await this.tenderStore.listBanner(req,this.showLoading)

      this.TenderBannerList = this.tenderStore.TenderBannerList
      
    },
    watch: {},
    computed: {
      paginatedTenderBannerList() {
        if (!this.tenderStore.TenderBannerList) return [];

        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;

        return this.tenderStore.TenderBannerList.slice(start, end);
      }

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
  