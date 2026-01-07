<template>
  <div v-if="totalPages > 0" class="pagination">
    <!-- Previous Button -->
    <button
      class="nav-button"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Prev
    </button>

    <!-- Numbered Page Buttons -->
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="['page-button', { active: page === currentPage }]"
      :style="page === currentPage ? activeButtonStyle : {}"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>

    <!-- Next Button -->
    <button
      class="nav-button"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalItems: { type: Number, required: true },
    itemsPerPage: { type: Number, required: true },
    currentPage: { type: Number, required: true },
    activeColor: { type: String, default: '#3b82f6' } // default blue
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    visiblePages() {
      if (this.totalPages === 0) return [];
      const total = this.totalPages;
      const current = this.currentPage;
      const maxVisible = 4;
      let start = Math.floor((current - 1) / maxVisible) * maxVisible + 1;
      let end = Math.min(start + maxVisible - 1, total);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    activeButtonStyle() {
      return {
        backgroundColor: this.activeColor,
        borderColor: this.activeColor,
        color: 'white',
        fontWeight: 'bold'
      };
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:currentPage', page);
      }
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
}

.page-button,
.nav-button {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f9fafb;
  cursor: pointer;
  font-size: 14px;
  transition: 0.2s;
}

.page-button:hover,
.nav-button:hover {
  background-color: #e5e7eb;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
