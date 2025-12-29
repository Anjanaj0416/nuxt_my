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
          <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
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

            <select v-model="DistrictId"  class="filter-select">
              <option disabled selected="" value="">Select District</option>
              <option
                v-for="DistrictId in tenderStore.listTenderCategory"
                :key="DistrictId.id"
                :value="DistrictId.id"
              >
                {{ DistrictId.value }}
              </option>
            </select>

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

            <select v-model="TenderSourceId"  class="filter-select">
              <option disabled selected="" value="">Select Source</option>
              <option
                v-for="Source in tenderStore.listTenderSource"
                :key="Source.id"
                :value="Source.id"
              >
                {{ Source.value }}
              </option>
            </select>
              <input
                v-model="TenderDatePublised_To"
                type="date"
                class="filter-select w-full sm:w-auto"
                placeholder="From"
              />

              <!-- To -->
              <input
                v-model="TenderClosingDate"
                type="date"
                class="filter-select w-full sm:w-auto"
                placeholder="To"
              />

            <!-- <select class="filter-select">
              <option>To</option>
              <option>Today</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select> -->
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
          type="button"
          class="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-full text-purple-600 bg-white border-2 border-purple-500 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          All 2533
        </button>

        <button
          type="button"
          class="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-full text-purple-600 bg-white border-2 border-purple-500 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"

        >
          Government
        </button>

        <button
          type="button"
          class="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-full text-purple-600 bg-white border-2 border-purple-500 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          Private
        </button>

        <button
          type="button"
          class="relative inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-full text-purple-600 bg-white border-2 border-purple-500 hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
        >
          Supplier
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-6 gap-0 text-sm relative">
        <!-- Tender list -->
        <div class="col-span-1 lg:col-span-5 flex flex-col gap-4">
          <div
            v-for="tender in tenderStore.TenderList"
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
            <div v-for="category in listCategory" class="flex flex-wrap gap-1.5 mt-2">
              <span class="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700">{{ category }}</span>
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
              <button  @click="$router.push('Tender/MoreDetail')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 text-white">View Details</button>
            </div>
          </div>
        </div>
        <!-- Banner-->
        <div class="hidden lg:flex col-span-1 justify-end">
          <div
            v-if="showBanner"
            class="w-[200px] h-[300px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden"
          >
            <img src="/assets/img/tender/tenderBanner.jpeg" alt="Banner Image" class=" w-full object-cover">
            <div class="flex flex-col justify-between p-2 h-1/2">
              <div class="flex justify-between items-start">
                <h3 class="text-sm font-bold text-gray-800">Special Announcement</h3>
                <button @click="closeBanner" class="text-gray-500 hover:text-gray-800 rounded-full w-6 h-6 flex items-center justify-center">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <p class="text-gray-700 text-xs my-1">Check out our latest offer! Click below to learn more.</p>
              <button class="bg-purple-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-purple-600 transition">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <homefooter class="mt-auto" />
</div>

</template>

<script >
  import homeHeader from '~/components/tender/header/index.vue';
  import homefooter from '~/components/tender/footer/index.vue';
  import { ref } from 'vue'
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
    SwiperSlide,},
    props:[''],
    data() {
      return {
        activeCategory: null,
        showBanner: true,
        CategoryId:"",
        TenderTypeId:"",
        TenderSourceId:"",
        DistrictId:"",
        TenderDatePublised_To:"",
        TenderClosingDate:"",
        SearchText: "",
        logos: [
        ],
      }
    },
    async mounted() {
     
    },
    async created() {
      this.showLoading = this.$showLoading;
      this.userStore = useUserStore();
      this.tenderStore = useTenderStore();
      this.loginWithSecretCode();
      
      await this.tenderStore.loadInitTender(this.showLoading);
      await this.tenderStore.fetcTender(
        {
          CategoryId: this.CategoryId || "",
          TenderTypeId: this.TenderTypeId || "",
          TenderSourceId:this.TenderSourceId || "",
          DistrctId:this.DistrctId || "",
          TenderDatePublised_To:this.TenderDatePublised_To || "",
          TenderClosingDate:this.TenderClosingDate || ""
        },
        this.showLoading,
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
      TenderSourceId() {
        this.searchByFilters();
      },
      DistrictId() {
        this.searchByFilters();
      },
      TenderDatePublised_To() {
        this.searchByFilters();
      },
      TenderClosingDate() {
        this.searchByFilters();
      }
    },

    computed: {
      getSlidesPerView() {
          const width = window.innerWidth
          if (width < 640) return 2
          if (width < 1024) return 3
          return 5
        },
    },
    methods: {
      async loginWithSecretCode() {
        const secretCode = 'pki1w2fj11';
        const formData = new FormData();
        formData.append('secretCode', secretCode);

        try {
          await this.userStore.AppLogin(formData, this.showLoading);
          // console.log('Login successful');
        } catch (err) {
          // console.error('Login failed:', err);
        }
      },
      // keywordsearch
      async onSearchClick() {
        const req = {
          SearchText: this.SearchText || "",
        };
        await this.tenderStore.fetcTender(req, this.showLoading);
      },
      // filtersearch
      async searchByFilters() {
        const req = {
          CategoryId: this.CategoryId || "",
          TenderTypeId: this.TenderTypeId || "",
          TenderSourceId: this.TenderSourceId || "",
          DistrctId: this.DistrictId || "",
          TenderDatePublised_To: this.TenderDatePublised_To || "",
          TenderClosingDate: this.TenderClosingDate || ""
        };

        await this.tenderStore.fetcTender(req, this.showLoading);
      },
      // onlycategoryfiltersearch
      async toggleCategory(category) {
        this.activeCategory = category;
        this.categoryId = category.id;
        const req = {
          CategoryId: this.categoryId,
        };

        await this.tenderStore.fetcTender(req, this.showLoading);          
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

