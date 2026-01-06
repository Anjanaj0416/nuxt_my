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
                {{ this.userStore.loggedUser.id }}
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-semibold px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                        Tender ID: {{ tenderStore.moreDetails.tenderCode }}
                    </span>
                    <span class="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                        {{ tenderStore.moreDetails.status }}
                    </span>
                    </div>

                    <h2 class="text-base font-semibold text-gray-900 leading-snug">
                      {{ tenderStore.moreDetails.title }}
                    </h2>

                    <!-- Meta -->
                    <div class="mt-4 text-xs text-gray-500 flex flex-wrap gap-x-6 gap-y-2">
                    <div>
                        Published:
                        <span class="font-semibold text-green-600">{{ tenderStore.moreDetails.publishedDate }}</span>
                    </div>
                    <div>
                        Closing:
                        <span class="font-semibold text-red-600">{{ tenderStore.moreDetails.closingDate }}</span>
                    </div>
                    <div>
                        Location:
                        <span class="font-semibold text-gray-700">{{ tenderStore.moreDetails.district }}</span>
                    </div>
                    <div>
                        Source:
                        <span class="font-semibold text-gray-700">{{ tenderStore.moreDetails.source }}</span>
                    </div>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-4">
                      <span
                        v-for="(category, index) in tenderStore.moreDetails?.listCategories || []"
                        :key="index"
                        class="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700"
                      >
                        {{ category }}
                      </span>
                    </div>

                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 class="text-sm font-semibold text-gray-800 mb-2">
                    Tender Description
                    </h3>
                    <p class="text-sm text-gray-600 leading-relaxed">
                    {{ tenderStore.moreDetails.description }}
                    </p>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 class="text-sm font-semibold text-gray-800 mb-3">
                  Tender Documents
                  </h3>
                  <ul class="space-y-2 text-sm">
                    <li
                      v-for="(doc, index) in moreDetails?.listTenderDocuments || []"
                      :key="index"
                      class="flex flex-col items-start bg-gray-50 p-3 rounded-lg"
                    >
                      <span class="text-gray-700 mb-2">{{ doc.split('\\').pop() }}</span>
                      <img
                        :src="doc.replace(/\\/g, '/')"
                        alt="Document Image"
                        class="max-w-xs border rounded"
                      />
                    </li>
                    <li v-if="!(moreDetails?.listTenderDocuments?.length)">
                      No documents available
                    </li>
                  </ul>
                </div>
            </div>
            <div class="lg:col-span-2">
                <div class="sticky top-24 bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">

                    <div class="text-center">
                    <p class="text-xs text-gray-500">Time Remaining</p>
                    <p class="text-lg font-bold text-red-600">{{ tenderStore.moreDetails.daysRemaining }}</p>
                    </div>

                    <!-- <button
                    class="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 rounded-lg transition">
                    Apply for Tender
                    </button> -->
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
  import { useRoute } from 'vue-router'
  import { useUserStore } from '~/stores/modules/userStore';
  import { useTenderStore } from '~/stores/modules/tender/tenderStore';
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
    
    components: { Swiper,homeHeader,homefooter,SwiperSlide,},
    props: {    },
    data() {
      return {
        activeCategory: null,
        showBanner: true,
      }
    },
    async mounted() {
      const route = useRoute()
      this.tenderId = route.query.id

      if (!this.tenderId) {
        console.error('Tender ID missing')
        return
      }

      this.showLoading = this.$showLoading
      this.userStore = useUserStore()
      this.tenderStore = useTenderStore()
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;   

      await this.loginWithSecretCode()
      await this.tenderStore.tenderDetails(this.tenderId, this.showLoading)
    },

    async created() {
      const route = useRoute() 
      this.tenderId = route.query.id 

      this.showLoading = this.$showLoading;
      this.userStore = useUserStore();
      this.tenderStore = useTenderStore();
      this.loginWithSecretCode();
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;   
      
      

    },
    watch: {},
    computed: {},
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

