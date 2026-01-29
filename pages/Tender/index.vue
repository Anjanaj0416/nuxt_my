<template>
<div class="min-h-screen flex flex-col">
  <homeHeader />
  <main class="flex-grow">
    <section class="bg-purple-600 pb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl p-5 sm:p-6">
          <div class="relative">
            <input
              v-model="SearchText"
              type="search"
              :placeholder="isMobile ? 'Search...' : 'Search tenders, reference no, keywords...'"
              class="w-full rounded-full border border-gray-300 px-6 py-3 pr-14 text-sm text-gray-800
                    focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />

            <!-- Desktop / Tablet Button -->
            <button
              @click="onSearchClick"
              class="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2
                    bg-purple-600 hover:bg-purple-700
                    text-white px-6 py-2 rounded-full text-sm font-medium items-center"
            >
              Search
            </button>

            <!-- Mobile Icon Button -->
            <button
              @click="onSearchClick"
              class="flex sm:hidden absolute right-3 top-1/2 -translate-y-1/2
                    bg-purple-600 hover:bg-purple-700
                    text-white p-2 rounded-full"
              aria-label="Search"
            >
              <!-- Search Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

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
              <option disabled selected="" value="">Select Date</option>
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

    <section class="mt-6 px-2">
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
              'relative flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium rounded-full transition-all duration-300',
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
            @click="viewTenderDetails(tender.id)"
            role="button"
            tabindex="0"
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
          v-if="tenderStore.listBanners?.length"
          class="hidden lg:flex lg:col-span-1 flex-col gap-4 self-start pl-4"
        >
          <!-- Desktop sidebar banner -->
          <div 
           v-for="(banner, index) in tenderStore.listBanners"
            :key="banner.id || index"
          >
            <img
              :src="imageroot + banner.desktopBannerUrl"
              alt="TenderB2B.lk"
              class="w-full rounded-xl shadow-md"
            />
          </div>
        </div>
        <!-- Mobile bottom banner -->
        <div 
          v-if="tenderStore.listBanners?.length"
          class="block lg:hidden mt-6"
        >
          <div
            v-for="(banner, index) in tenderStore.listBanners"
            :key="banner.id || index"
          >
            <img
              :src="imageroot + banner.mobileBannerUrl"
              alt="TenderB2B.lk"
              class="w-full rounded-xl shadow-md"
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
      <!-- Back to Top Button -->
      <button
        v-show="showBackToTop"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 border border-white"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <a
        href="https://wa.me/94711619868?text=Hello%20I%20want%20to%20inquire"
        target="_blank"
        rel="noopener noreferrer"
        class="fixed bottom-20 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          class="w-4 h-4"
        >
          <path d="M20.52 3.48a11.92 11.92 0 0 0-17 0 11.92 11.92 0 0 0-3.5 8.5c0 2 0.53 3.96 1.54 5.68l-1.63 5.95 6-1.6a11.9 11.9 0 0 0 5.58 1.4 11.92 11.92 0 0 0 8.48-3.51 11.92 11.92 0 0 0 0-16.98zM12 21c-1.6 0-3.18-.43-4.55-1.24l-.33-.2-3.57.95 1.03-3.75-.22-.36A9.92 9.92 0 0 1 2 12a10 10 0 1 1 10 10z"/>
          <path d="M16.03 14.41c-.26-.13-1.53-.76-1.76-.84-.23-.08-.4-.13-.57.13-.17.26-.66.84-.81 1.02-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.28-1.55-1.43-1.81-.15-.26-.02-.4.11-.53.11-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.43-.57-.44-.15-.01-.32-.01-.49-.01s-.45.06-.68.32c-.23.26-.88.85-.88 2.07s.9 2.4 1.03 2.57c.13.17 1.77 2.7 4.29 3.78.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.53-.63 1.74-1.23.22-.6.22-1.12.15-1.23-.07-.12-.26-.19-.52-.32z"/>
        </svg>
      </a>

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
  });

  export default {
    
    components: { Swiper,homeHeader,homefooter,
    SwiperSlide,Pagination},
    props:[''],
    data() {
      return {
        activeCategory: null,
        activeType: null,
        CategoryId:"",
        TenderTypeId:"",
        Days:"",
        SearchText: "",
        page: 1,
        itemsPerPage: 5, 
        showBackToTop: false,
      }
    },

    // async created() {
    //   this.TendershowLoading = this.$TendershowLoading;
    //   this.userStore = useUserStore();
    //   this.tenderStore = useTenderStore();
    //   this.loginWithSecretCode();
    //   this.imageroot = this.userStore.loggedUser.resourceURLRoot;   
      
    //   await this.tenderStore.loadInitTenderHome(this.TendershowLoading);
    //   await this.loadInitialTenderList();

    // },
    async created() {
      this.TendershowLoading = this.$TendershowLoading;
      this.userStore = useUserStore();
      this.tenderStore = useTenderStore();

      await this.loginWithSecretCode();

      this.imageroot = this.userStore.loggedUser.resourceURLRoot;

      await this.tenderStore.loadInitTenderHome(this.TendershowLoading);
      await this.loadInitialTenderList();
    },


    watch: {
      CategoryId: {
        handler() {
          this.searchByFilters();
        },
        immediate: false,
      },
      TenderTypeId: {
        handler() {
          this.searchByFilters();
        },
        immediate: false,
      },
      Days: {
        handler() {
          this.searchByFilters();
        },
        immediate: false,
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
      isMobile() {
        return window.innerWidth < 640
      }
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
      async loadInitialTenderList() {
        try {
          const req = {
            CategoryId: "", 
            TenderTypeId: "",
            Days: "",
            SearchText: "",
          };
          await this.tenderStore.fetcTender(req, this.TendershowLoading);
          this.TenderList = this.tenderStore.TenderList; 
        } catch (error) {
          console.error("Error loading tenders:", error);
        }
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
      clearFilters() {
        this.activeCategory = null;
        this.activeType = null;
        this.CategoryId = "";
        this.TenderTypeId = "";
        this.Days = "";
        this.SearchText = "";
        this.applyFilters();
      },

      async applyFilters() {
        const req = {
          CategoryId: this.CategoryId || "",
          TenderTypeId: this.TenderTypeId || "",
          Days: this.Days || "",
          SearchText: this.SearchText || "",
        };
        await this.tenderStore.fetcTender(req, this.TendershowLoading);
      },


      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },

      handleScroll() {
        this.showBackToTop = window.scrollY > 100;
      },

    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
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

