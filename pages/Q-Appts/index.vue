<template>
  <section class="max-w-[1200px] mx-auto">
    <!-- Hero Section -->
    <section class="flex flex-col md:flex-row items-center justify-between p-6 bg-blue-50">
      <div class="text-center md:text-left md:w-1/2">
        <h2 class="text-3xl md:text-7xl font-bold text-blue-900 leading-tight">
          {{ t('welcome1') }}<br />
          {{ t('welcome2') }}
        </h2>
        <p class="text-gray-600 md:text-2xl max-w-md mt-4">
          EasyQueue lets you join queues and book appointments from anywhere — no more waiting around
        </p>
        <button 
          @click="scrollToFilterBar" 
          class="mt-6 px-6 py-3 bg-blue-900 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition">
          Make Appointment
        </button>
      </div>

      <div class="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <img
          src="https://i.imgur.com/XydtNbh.png"
          alt="Illustration"
          class="w-81 h-auto"
        />
      </div>
    </section>

    <!-- Search Bar -->
    <div v-if="!showSearchInNavbar" class="sticky top-1 z-50">
      <SearchBar />
    </div>

    <!-- Filter Bar -->
    <FilterBar 
      @filter-selected="onFilterSelected"
      :current-filter="shopStore.selectedFilter"
      ref="filterBar"
      class="w-full z-50 md:sticky md:top-20"
    />

    <!-- Shops Grid -->
    <section class="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ShopCard v-for="shop in shopStore.filteredShops" :key="shop.id" :shop="shop" />
    </section>

    <!-- Load More Button -->
    <div class="text-center my-4" v-if="shopStore.shops.length < shopStore.total">
      <button
        @click="loadMore"
        class="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
        :disabled="shopStore.loading"
      >
        {{ shopStore.loading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useShopStore } from '~/stores/modules/Q-Appts/shops'

import ShopCard from '~/components/Q-Appts/ShopCard.vue'
import Header from '~/components/Q-Appts/header.vue'
import Footer from '~/components/Q-Appts/footer.vue'
import FilterBar from '~/components/Q-Appts/FilterBar.vue'
import SearchBar from '~/components/Q-Appts/searchBar.vue'

definePageMeta({ 
  layout: 'appts'
})

// i18n
const { t } = useI18n()

// Shop store
const shopStore = useShopStore()

// Refs
const showSearchInNavbar = ref(false)
const filterBar = ref(null)

// Methods
function onFilterSelected(filter) {
  shopStore.setSelectedFilter(filter)
}

function scrollToFilterBar() {
  const el = filterBar.value?.$el || filterBar.value
  if(el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleScroll() {
  showSearchInNavbar.value = window.scrollY > 430
}

function loadMore() {
  shopStore.fetchNearbyShops(shopStore.lat, shopStore.lng)
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        shopStore.lat = latitude
        shopStore.lng = longitude
        console.log(`Current location: ${latitude}, ${longitude}`)
        // Optionally fetch shops here
        // shopStore.fetchNearbyShops(latitude, longitude, true)
      },
      (err) => console.error('Location error:', err)
    )
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* .csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
} */

section {
  max-width: 1200px;
  margin: auto;
}
</style>
