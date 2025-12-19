<template>
<div class="min-h-screen flex flex-col">
  <homeHeader />

  <main class="flex-grow">
    <section class="px-2 sm:px-4 md:px-8 lg:px-24 py-6 bg-gray-50">
        <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
            <div class="lg:col-span-4 space-y-6">
                <nav class="flex p-3 bg-white rounded-xl border border-gray-200-medium rounded-base" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                        <a href="/Tender" class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
                            <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
                            Home
                        </a>
                        </li>
                        <li>
                        <div class="flex items-center space-x-1.5">
                            <svg class="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
                            <a href="#" class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand text-gray-500">MoreDetail</a>
                        </div>
                        </li>
                    </ol>
                </nav>
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                        Tender ID: 1234
                    </span>
                    <span class="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                        Open
                    </span>
                    </div>

                    <h2 class="text-base font-semibold text-gray-900 leading-snug">
                    අධ්‍යාපන, උසස් අධ්‍යාපන සහ වෘත්තීය අධ්‍යාපන අමාත්‍යාංගය වෛද්‍ය පීඨයේ
                    මහාචාර්ය ඒකකය සඳහා නවතම පරිගණක සහ මුද්‍රණ යන්ත්‍ර සැපයීම
                    </h2>

                    <!-- Meta -->
                    <div class="mt-4 text-xs text-gray-500 flex flex-wrap gap-x-6 gap-y-2">
                    <div>
                        Published:
                        <span class="font-semibold text-green-600">18 Dec 2025</span>
                    </div>
                    <div>
                        Closing:
                        <span class="font-semibold text-red-600">13 Jan 2026</span>
                    </div>
                    <div>
                        Location:
                        <span class="font-semibold text-gray-700">Colombo</span>
                    </div>
                    <div>
                        Source:
                        <span class="font-semibold text-gray-700">Lankadipa Newspaper</span>
                    </div>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-4">
                    <span class="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700">
                        CCTV & Security
                    </span>
                    <span class="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                        IT Equipment
                    </span>
                    </div>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-800 mb-2">
                    Tender Description
                    </h3>
                    <p class="text-sm text-gray-600 leading-relaxed">
                    This tender invites eligible suppliers to provide the latest computers,
                    printers, and related accessories for the Professor Unit of the Medical
                    Faculty. All equipment must meet government procurement standards and
                    warranty requirements.This tender invites eligible suppliers to provide the latest computers,
                    printers, and related accessories for the Professor Unit of the Medical
                    Faculty. All equipment must meet government procurement standards and
                    warranty requirements.This tender invites eligible suppliers to provide the latest computers,
                    printers, and related accessories for the Professor Unit of the Medical
                    Faculty. All equipment must meet government procurement standards and
                    warranty requirements.This tender invites eligible suppliers to provide the latest computers,
                    printers, and related accessories for the Professor Unit of the Medical
                    Faculty. All equipment must meet government procurement standards and
                    warranty requirements.
                    </p>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3">
                    Financial Information
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div class="bg-gray-50 rounded-lg p-3">
                        <p class="text-xs text-gray-500">Estimated Value</p>
                        <p class="font-semibold text-gray-800">LKR 5,000,000</p>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-3">
                        <p class="text-xs text-gray-500">Bid Security</p>
                        <p class="font-semibold text-gray-800">LKR 100,000</p>
                    </div>

                    <div class="bg-gray-50 rounded-lg p-3">
                        <p class="text-xs text-gray-500">Validity Period</p>
                        <p class="font-semibold text-gray-800">90 Days</p>
                    </div>
                    </div>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-800 mb-3">
                    Tender Documents
                    </h3>

                    <ul class="space-y-2 text-sm">
                    <li class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span class="text-gray-700">Tender Notice.pdf</span>
                        <button class="text-purple-600 font-semibold hover:underline">
                        Download
                        </button>
                    </li>
                    <li class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span class="text-gray-700">Technical Specifications.pdf</span>
                        <button class="text-purple-600 font-semibold hover:underline">
                        Download
                        </button>
                    </li>
                    </ul>
                </div>
            </div>
            <div class="lg:col-span-2">
                <div class="sticky top-24 bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">

                    <div class="text-center">
                    <p class="text-xs text-gray-500">Time Remaining</p>
                    <p class="text-lg font-bold text-red-600">25 Days Left</p>
                    </div>

                    <button
                    class="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 rounded-lg transition">
                    Apply for Tender
                    </button>
                    <!-- <button
                    class="w-full border border-purple-600 text-purple-600 text-sm font-semibold py-2.5 rounded-lg hover:bg-purple-50 transition">
                    Save Tender
                    </button> -->
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
        logos: [
        ],
        vehicleCategories: [
          'Hardware and Constructions',
          'Roofing Materials & Machinery',
          'Doors, Windows and Accessories',
          'Electrical, Electronic and Accessories',
          'CCTV, Security and Fire Extinguisher',
          'Air Conditioners and Refrigerators',
          'Paints and Waterproofing Materials',
          'Repair and Maintenance',
          'Chemicals and Gas',
          'Industrial Machinery and Equipment',
          'Three Boilers and Heaters',
          'Boilers and Heaters',
        ],
        tenders: [
          {
            id: 'TND-2025-1187',
            daysLeft: 26,
            title: 'අධ්‍යාපන, උසස් අධ්‍යාපන සහ වෘත්තීය අධ්‍යාපන අමාත්‍යාංගය වෛද්‍ය පීඨයේ මහාචාර්ය ඒකකය සඳහා නවතම පරිගණක සහ මුද්‍රණ යන්ත්‍ර සැපයීම',
            category: 'Works',
            sourceType: 'Nprocure',
            published: '18 Dec 2025',
            closing: '13 Jan 2026',
            location: 'Colombo',
            source: 'Lankadipa News Paper'
          },
          {
            id: 'TND-2025-1188',
            daysLeft: 12,
            title: 'රාජ්‍ය රෝහල් සඳහා වෛද්‍ය උපකරණ සැපයීම',
            category: 'Goods',
            sourceType: 'ICTA',
            published: '10 Dec 2025',
            closing: '01 Jan 2026',
            location: 'Kandy',
            source: 'Daily News'
          },
          {
            id: 'TND-2025-1189',
            daysLeft: 7,
            title: 'පාසල් සඳහා පරිගණක පද්ධති ස්ථාපනය',
            category: 'Services',
            sourceType: 'GovProc',
            published: '12 Dec 2025',
            closing: '26 Dec 2025',
            location: 'Galle',
            source: 'Government Gazette'
          },
          {
            id: 'TND-2025-1190',
            daysLeft: 30,
            title: 'ජල සැපයුම් ව්‍යාපෘතිය සඳහා නල සැපයීම',
            category: 'Works',
            sourceType: 'NWSDB',
            published: '15 Dec 2025',
            closing: '14 Jan 2026',
            location: 'Kurunegala',
            source: 'Sunday Observer'
          },
          {
            id: 'TND-2025-1191',
            daysLeft: 5,
            title: 'සෞඛ්‍ය අමාත්‍යාංශයට ඖෂධ සැපයීම',
            category: 'Goods',
            sourceType: 'MSD',
            published: '14 Dec 2025',
            closing: '24 Dec 2025',
            location: 'Colombo',
            source: 'Daily Mirror'
          },
          {
            id: 'TND-2025-1192',
            daysLeft: 18,
            title: 'රාජ්‍ය ආයතන සඳහා ජාල පද්ධති නවීකරණය',
            category: 'Services',
            sourceType: 'ICTA',
            published: '16 Dec 2025',
            closing: '06 Jan 2026',
            location: 'Jaffna',
            source: 'IT Gazette'
          }
        ]
      }
    },
    async mounted() {
     
    },
    async created() {
      this.showLoading = this.$showLoading;
    },
    watch: {},
    computed: {
      getSlidesPerView() {
          const width = window.innerWidth
          if (width < 640) return 2
          if (width < 1024) return 3
          return 5
        },
    },
    methods: {
      toggleCategory(category) {
        this.activeCategory = category;
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

