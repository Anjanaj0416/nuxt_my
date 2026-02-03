<template>
  <nav class="flex items-center justify-between text-sm  px-2 " aria-label="Pagination">
    <!-- Info -->
    <span class="text-sm text-gray-600">
    Showing 
    <span class="font-bold text-gray-700  px-2 py-1 rounded-lg" :style="{ backgroundColor: color }">
        {{ startItem }}–{{ endItem }}
    </span>
    out of 
    <span class="font-bold text-gray-600">
        {{ total }}
    </span>
    items
    </span>
    <!-- Pagination -->
    <ul class="flex items-center space-x-1 border rounded-lg px-2 py-1 ml-8">
      <!-- Prev -->
      <li>
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-2 py-1 disabled:opacity-50"
        >
          Prev
        </button>
      </li>

      <!-- Page numbers -->
      <li v-for="item in pages" :key="item.key">
        <span
          v-if="item.type === 'dots'"
          class="px-2 py-1"
        >
          …
        </span>

        <button
          v-else
          @click="changePage(item.page)"
          class="px-2 py-1 rounded"
          :class="item.page === currentPage
            ? 'bg-gray-800 text-white'
            : 'hover:bg-gray-100'"
        >
          {{ item.page }}
        </button>
      </li>

      <!-- Next -->
      <li>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-2 py-1 disabled:opacity-50"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    total: { type: Number, required: true },
    perPage: { type: Number, default: 10 },
    currentPage: { type: Number, required: true },
    color: {
        type: String,
        default: '#bbd151' // default color
    }
  },

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    startItem() {
      return (this.currentPage - 1) * this.perPage + 1
    },
    endItem() {
      return Math.min(this.currentPage * this.perPage, this.total)
    },
    pages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage

      if (total <= 5) {
        for (let i = 1; i <= total; i++) pages.push({ type: 'page', page: i, key: i })
        return pages
      }

      pages.push({ type: 'page', page: 1, key: 1 })

      if (current > 3) pages.push({ type: 'dots', key: 'dots-left' })

      const start = Math.max(2, current - 1)
      const end = Math.min(total - 1, current + 1)
      for (let i = start; i <= end; i++) pages.push({ type: 'page', page: i, key: i })

      if (current < total - 2) pages.push({ type: 'dots', key: 'dots-right' })

      pages.push({ type: 'page', page: total, key: total })

      return pages
    }
  },

  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.$emit('update:page', page)
    }
  }
}
</script>
