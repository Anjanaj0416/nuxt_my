<template>
  <div>
    <fheader />

    <!-- News Section -->
    <section v-if="newsItem" class="bg-white max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1">
      <!-- News Title -->
      <h1 class="text-2xl font-bold mb-6">{{ newsItem.title }}</h1>

      <div class="flex flex-col md:flex-row md:items-start md:gap-6">
        <!-- Text Content -->
        <div class="flex-1 mb-4 md:mb-0">
          <template v-if="hasFullContent">
            <p v-for="(paragraph, idx) in fullContentArray" :key="idx" class="text-gray-700 mt-2">
              {{ paragraph }}
            </p>
          </template>
          <p v-else class="text-gray-500 italic">
            No full news available.
          </p>
        </div>

        <!-- Image on the right -->
        <div class="flex-shrink-0 w-full md:w-48">
          <img :src="newsItem.image || 'https://via.placeholder.com/200x150'" class="w-full h-36 object-cover rounded"
            alt="News Image" />
        </div>
      </div>
    </section>

    <!-- If no news selected -->
    <div v-else class="flex flex-wrap justify-center px-4 py-2 text-sm font-medium text-white bg-purple-700 sticky">
      <span class="font-medium">News Update: </span>
      You are being redirected to the latest headlines...
    </div>

    <NewsFooter />
  </div>
</template>

<script>
import fheader from '~/components/News/header.vue'
import NewsFooter from '~/components/News/footer.vue'
import { useDtlStore } from '~/stores/modules/dtlStore'

definePageMeta({
  layout: 'contactus',
})

export default {
  components: { fheader, NewsFooter },

  data() {
    return {
      newsItem: null,
    }
  },

  computed: {
    // Check if fullContent has any non-empty paragraph
    hasFullContent() {
      if (!this.newsItem?.fullContent?.[0]) return false
      return Object.values(this.newsItem.fullContent[0]).some(
        (text) => text && text.trim() !== ''
      )
    },
    // Convert fullContent object to array for v-for
    fullContentArray() {
      if (!this.newsItem?.fullContent?.[0]) return []
      return Object.values(this.newsItem.fullContent[0]).filter(
        (text) => text && text.trim() !== ''
      )
    },
  },

  mounted() {
    const dtlStore = useDtlStore()

    // Get selected news from store
    if (dtlStore.selectedNews) {
      this.newsItem = dtlStore.selectedNews
    } else {
      // fallback: redirect if no news selected
      this.$router.push('/News')
    }
  },

  head() {
    return {
      title: this.newsItem?.title || 'News Details',
    }
  },
}
</script>
