<template>
<div class="min-h-screen flex flex-col">
  <homeHeader />
  <main class="flex-grow">
    <section class="bg-purple-600 py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
          <div class="relative">
            <input
              v-model="SearchText"
              type="search"
              placeholder="Search tenders, reference no, keywords..."
              class="w-full rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-800
                     focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              @click="onSearchClick"
              class="absolute right-2 top-1/2 -translate-y-1/2
                     bg-purple-600 hover:bg-purple-700
                     text-white px-6 py-2 rounded-full text-sm font-medium"
            >
              Search
            </button>
          </div>
          <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
              <option disabled selected="" value="">Select Date</option>
              <option value="">All</option>
              <option :value="1">Today</option>
              <option :value="7">Last 7 Days</option>
              <option :value="30">Last 30 Days</option>
            </select>

          </div>

        </div>
      </div>
    </section>

    <section class="py-6 px-2">
      <h1 class="mb-4 text-md font-semibold text-center text-gray-700 uppercase tracking-wide">
          ALL Categories
        </h1>
      <Swiper
        :slides-per-view="'auto'"
        space-between="10"
        free-mode="true"
        class="custom-swiper"
      >
        <div
          v-if="tenderStore.listTenderCategory?.length === 0"
          class="text-center text-gray-900 mt-5 text-sm font-medium"
        >
          <p>No TenderCategory....</p>
        </div>

        <SwiperSlide
          v-for="(category, index) in  tenderStore.listTenderCategory"
          :key="index"
          class="!w-auto"
        >
          <button
            @click="toggleCategory(category)"
            :class="[
              'relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300',
              'border backdrop-blur-sm',
              activeCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105 border-transparent'
                : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-600 hover:shadow-md'
            ]"
          >
            <!-- optional dot indicator -->
            <span
              v-if="activeCategory === category"
              class="w-2 h-2 rounded-full bg-white animate-pulse"
            ></span>

            {{ category.value }}
          </button>

        </SwiperSlide>
      </Swiper>
      
    </section>

    <section class="px-2 sm:px-4 md:px-8 lg:px-24 py-4">
      <div class="flex flex-wrap gap-3 mb-3">
        <button
          v-for="tenderType in tenderStore.listTenderType"
          :key="tenderType.id"
          :value="tenderType.id"
          @click="toggletenderType(tenderType)"
          type="button"
          :class="[
              'relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300',
              'border backdrop-blur-sm',
              activeType === tenderType
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105 border-transparent'
                : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-600 hover:shadow-md'
            ]"
        >
          <span
            v-if="activeType === tenderType"
            class="w-2 h-2 rounded-full bg-white animate-pulse"
          ></span>
          {{ tenderType.value }}
        </button>
      </div>

      <div
        v-if="tenderStore.TenderList?.length === 0"
        class="text-center text-gray-900 mt-5 text-sm font-medium"
      >
        <p>No Tender....</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-6 gap-0 text-sm relative">
        <!-- Tender list -->
        <div class="col-span-1 lg:col-span-5 flex flex-col gap-4">
          <div
            v-for="tender in paginatedTenderList"
            :key="tender.id"
            class="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition"
          >
            <!-- Tender content here (same as your current tender card) -->
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                Tender ID: {{ tender.tenderCode }}
              </span>
              <span
                class="text-xs font-bold px-2.5 py-1 rounded-full"
                :class="tender.daysLeft <= 7 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
              >
                {{ tender.daysLeft }}
              </span>
            </div>
            <h2 class="text-sm font-semibold text-gray-900 leading-snug line-clamp-3">
              {{ tender.title }}
            </h2>
            <div class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="(category, index) in tender.listCategory || []"
                :key="index"
                class="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700"
              >
                {{ category }}
              </span>
            </div>
         
            <div
              class="mt-3 text-xs text-gray-500 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-1 sm:divide-x sm:divide-gray-200"
            >
              <div class="flex items-center gap-1 sm:pr-4">
                <span>Published:</span>
                <span class="font-semibold text-green-600">{{ tender.publishedDate }}</span>
              </div>
              <div class="flex items-center gap-1 sm:px-4">
                <span>Closing:</span>
                <span class="font-semibold text-red-600">{{ tender.closingDate }}</span>
              </div>
              <div class="flex items-center gap-1 sm:px-4">
                <span>Location:</span>
                <span class="font-semibold text-gray-600">{{ tender.location }}</span>
              </div>
              <div class="flex items-center gap-1 sm:pl-4">
                <span>Source:</span>
                <span class="font-semibold text-gray-600">{{ tender.source }}</span>
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button  @click="viewTenderDetails(tender.id)"  class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white">View Details</button>
            </div>
          </div>
        </div>
        <!-- Banner-->
        <div
          v-if="tenderStore.listBanners?.length && showBanner"
          class=" hidden lg:flex lg:col-span-1 flex-col gap-4 self-start pl-4"
        >

          <div
            v-for="(banner, index) in tenderStore.listBanners"
            :key="index"
            class="
              w-full h-[280px]
              rounded-xl overflow-hidden
              shadow-md hover:shadow-xl
              transition-all
            "
          >
            <img
              :src="imageroot + banner"
              class="w-full h-full object-cover"
              alt="Banner"
            />
          </div>
        </div>

      </div>
        <Pagination
          :total-items="tenderStore.TenderList?.length || 0"
          :items-per-page="itemsPerPage"
          :current-page="page"
          active-color="#7c3aed"  
          @update:currentPage="page = $event"
        />
    </section>
  </main>
  <homefooter class="mt-auto" />
</div>

</template>

<script >
  import homeHeader from '~/components/tender/header/index.vue';
  import homefooter from '~/components/tender/footer/index.vue';
  import Pagination from "~/components/customcontrol/Pagination.vue";
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { useUserStore } from '~/stores/modules/userStore';
  import { useTenderStore } from '~/stores/modules/tender/tenderStore';
  import 'swiper/css'
  import 'swiper/css/free-mode'

  definePageMeta({
    layout: 'tender',
    // middleware: 'auth',
  });

  export default {
    
    components: { Swiper,homeHeader,homefooter,
    SwiperSlide,Pagination},
    props:[''],
    data() {
      return {
        activeCategory: null,
        activeType: null,
        showBanner: true,
        CategoryId:"",
        TenderTypeId:"",
        Days:"",
        DistrictId:"",
        TenderDatePublised_To:"",
        TenderClosingDate:"",
        SearchText: "",
        page: 1,
        itemsPerPage: 5, 
      }
    },
    async mounted() {
     
    },
    async created() {
      this.TendershowLoading = this.$TendershowLoading;
      this.userStore = useUserStore();
      this.tenderStore = useTenderStore();
      this.loginWithSecretCode();
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;   
      
      await this.tenderStore.loadInitTender(this.TendershowLoading);
      await this.tenderStore.fetcTender(
        {
          CategoryId: this.CategoryId || "",
          TenderTypeId: this.TenderTypeId || "",
          Days:this.Days || "",
        },
        this.TendershowLoading,
      );
      this.TenderList = this.tenderStore.TenderList;
    },
    watch: {
      CategoryId() {
        this.searchByFilters();
      },
      TenderTypeId() {
        this.searchByFilters();
      },
      Days() {
        this.searchByFilters();
      },
    },

    computed: {
      paginatedTenderList() {
        if (!this.tenderStore.TenderList) return [];

        const start = (this.page - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;

        return this.tenderStore.TenderList.slice(start, end);
      },
      getSlidesPerView() {
          const width = window.innerWidth
          if (width < 640) return 2
          if (width < 1024) return 3
          return 5
        },
    },
    methods: {
      async loginWithSecretCode() {
        const secretCode = 'w5jzxd02AA';
        const formData = new FormData();
        formData.append('secretCode', secretCode);

        try {
          await this.userStore.AppLogin(formData, this.TendershowLoading);
          // console.log('Login successful');
        } catch (err) {
          // console.error('Login failed:', err);
        }
      },
      viewTenderDetails(id)  {
        navigateTo({
          path: '/Tender/MoreDetail',
          query: { id }  
        })
      },
      // keywordsearch
      async onSearchClick() {
        const req = {
          SearchText: this.SearchText || "",
        };
        await this.tenderStore.fetcTender(req, this.TendershowLoading);
      },
      // filtersearch
      async searchByFilters() {
        const req = {
          CategoryId: this.CategoryId || "",
          TenderTypeId: this.TenderTypeId || "",
          Days:this.Days || "",
        };

        await this.tenderStore.fetcTender(req, this.TendershowLoading);
      },
      // onlycategoryfiltersearch
      async toggleCategory(category) {
        this.activeCategory = category;
        this.categoryId = category.id;
        const req = {
          CategoryId: this.categoryId,
        };

        await this.tenderStore.fetcTender(req, this.TendershowLoading);          
      },
      // onlycategoryfiltersearch
      async toggletenderType(tenderType) {
        this.activeType = tenderType;
        this.TenderTypeId = tenderType.id;
        const req = {
          TenderTypeId: this.TenderTypeId,
        };

        await this.tenderStore.fetcTender(req, this.TendershowLoading);          
      },
      closeBanner() {
        this.showBanner = false;
      },
    },
    async beforeMount() {

    },
    head() {
      return {
        title: 'DriveLearn - Find Your Perfect Driving School',
      }
    },
  }

</script>

<style>
  .filter-select {
  @apply w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5
         text-sm text-gray-700
         focus:ring-2 focus:ring-purple-500 focus:outline-none;
}

</style>

