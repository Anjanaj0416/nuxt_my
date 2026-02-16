<template>
<div class="min-h-screen flex flex-col">
  <homeHeader />
  <main class="flex-grow bg-gray-50">
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

              <!-- {{ tenderStore.moreDetails }} -->
              <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold px-2 py-1 rounded-md bg-gray-100 text-gray-700">
                      Tender ID: {{ tenderStore.moreDetails?.tenderCode }}
                  </span>
                  <span
                    class="text-xs font-semibold px-2 py-1 rounded-full"
                    :class="tenderStore.moreDetails?.status === 'Tender Closed' 
                            ? 'bg-red-50 text-red-700' 
                            : 'bg-green-50 text-green-700'"
                  >
                    {{ tenderStore.moreDetails?.status }}
                  </span>

                  </div>

                  <h2 class="text-base font-semibold text-gray-900 leading-snug">
                    {{ tenderStore.moreDetails?.title }}
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
              <div 
                v-if="tenderStore.moreDetails?.listTenderDocuments?.length"
                class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <h3 class="text-sm font-semibold text-gray-800 mb-3">
                  Tender Documents
                </h3>

                <img
                  :src="imageroot +  tenderStore.moreDetails?.listTenderDocuments[0]"
                  alt="Tender Documents"
                  class="w-full h-full object-cover mb-4"
                  ref="tenderImage"
                />

                <!-- Action Buttons -->
                <div class="flex justify-between items-center w-full">
                  <!-- <button
                    @click="downloadImage"
                    class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs"
                  >
                    Download
                  </button> -->
                  <a v-if="tenderStore.moreDetails.tenderUrl" 
                    :href="tenderStore.moreDetails.tenderUrl" 
                    target="_blank">
                    <button
                      class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs">
                      Click for more information
                    </button>
                  </a>
                  <div class="flex gap-3">
                    <button
                      @click="shareWhatsApp"
                      class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600"
                    >
                      Share WhatsApp
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="white" 
                        class="w-4 h-4" > 
                        <path d="M20.52 3.48a11.92 11.92 0 0 0-17 0 11.92 11.92 0 0 0-3.5 8.5c0 2 0.53 3.96 1.54 5.68l-1.63 5.95 6-1.6a11.9 11.9 0 0 0 5.58 1.4 11.92 11.92 0 0 0 8.48-3.51 11.92 11.92 0 0 0 0-16.98zM12 21c-1.6 0-3.18-.43-4.55-1.24l-.33-.2-3.57.95 1.03-3.75-.22-.36A9.92 9.92 0 0 1 2 12a10 10 0 1 1 10 10z"/> <path d="M16.03 14.41c-.26-.13-1.53-.76-1.76-.84-.23-.08-.4-.13-.57.13-.17.26-.66.84-.81 1.02-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.28-1.55-1.43-1.81-.15-.26-.02-.4.11-.53.11-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.2-.49-.41-.43-.57-.44-.15-.01-.32-.01-.49-.01s-.45.06-.68.32c-.23.26-.88.85-.88 2.07s.9 2.4 1.03 2.57c.13.17 1.77 2.7 4.29 3.78.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.53-.63 1.74-1.23.22-.6.22-1.12.15-1.23-.07-.12-.26-.19-.52-.32z"/> 
                      </svg>
                    </button>

                    <!-- Download Button -->
                    <button
                      @click="downloadImage"
                      class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:col-span-2">
              <div class="sticky top-2 bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">

                  <!-- <div class="text-center">
                    <p class="text-xs text-gray-500">Time Remaining</p>
                    <p class="text-lg font-bold text-red-600">{{ tenderStore.moreDetails.daysRemaining }}</p>
                  </div> -->
                    <div 
                      class="text-center"
                      v-if="tenderStore.moreDetails?.status !== 'Tender Closed'"
                    >
                      <p class="text-xs text-gray-500">Time Remaining</p>
                      <p class="text-lg font-bold text-red-600">
                        {{ tenderStore.moreDetails.daysRemaining }}
                      </p>
                    </div>


                  <a v-if="tenderStore.moreDetails.tenderUrl" 
                    :href="tenderStore.moreDetails.tenderUrl" 
                    target="_blank">
                    <button
                      class="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 rounded-lg transition">
                      Click for more information
                    </button>
                  </a>
                  <!-- <button
                  class="w-full border border-purple-600 text-purple-600 text-sm font-semibold py-2.5 rounded-lg hover:bg-purple-50 transition">
                  Save Tender
                  </button> -->
              </div>
            </div>
        </div>
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

<script>
import { useUserStore } from '~/stores/modules/userStore'
import { useTenderStore } from '~/stores/modules/tender/tenderStore'
import homeHeader from '~/components/tender/header/index.vue'
import homefooter from '~/components/tender/footer/index.vue'

definePageMeta({
  layout: 'tender',
})

export default {
  components: { homeHeader, homefooter },

  data() {
    return {
      userStore: useUserStore(),
      tenderStore: useTenderStore(),
      tenderId: null,
      imageroot: '',
      showBackToTop: false,
    }
  },

  async mounted() {
    this.tenderId = this.$route.query.id
    if (!this.tenderId) return

    this.imageroot = this.userStore.loggedUser?.resourceURLRoot || ''
    this.TendershowLoading = this.$TendershowLoading;
    
    await this.loginWithSecretCode()

    await this.tenderStore.tenderDetails(
      this.tenderId,
      this.TendershowLoading
    )

    window.addEventListener('scroll', this.handleScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    async loginWithSecretCode() {
      const secretCode = 'w5jzxd02AA'
      const formData = new FormData()
      formData.append('secretCode', secretCode)

      try {
        await this.userStore.AppLogin(formData, this.TendershowLoading)
      } catch (err) {
        // console.error('Login failed:', err)
      }
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 100
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    shareWhatsApp() {
      const text = `Check this Tender:\n${window.location.href}`
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text)}`,
        '_blank'
      )
    },
    downloadImage() {
      const doc =
        this.tenderStore.moreDetails?.listTenderDocuments?.[0]
      if (!doc) return
      const imageUrl = this.imageroot + doc
      window.open(imageUrl, '_blank', 'noopener')
    },
    
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

