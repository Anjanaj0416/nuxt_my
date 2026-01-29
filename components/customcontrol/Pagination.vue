<template>
  <div class="pagination-container">
    <div v-if="totalPages > 1" class="pagination-wrapper">
      <!-- Previous -->
      <button
        class="arrow-btn"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        ‹
      </button>

      <!-- Pages -->
      <template v-for="(page, i) in pages" :key="i">
        <span v-if="page === '...'" class="dots">…</span>

        <button
          v-else
          class="page-btn"
          :class="{ active: page === currentPage }"
          :style="page === currentPage ? activeStyle : {}"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </template>

      <!-- Next -->
      <button
        class="arrow-btn"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        ›
      </button>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    totalItems: Number,
    itemsPerPage: Number,
    currentPage: Number,
    activeColor: {
      type: String,
      default: '#3b82f6'
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    pages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;

      if (total <= 6) {
        for (let i = 1; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);

        if (current > 4) pages.push('...');

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (current < total - 3) pages.push('...');

        pages.push(total);
      }
      return pages;
    },
    activeStyle() {
      return {
        backgroundColor: this.activeColor,
        color: '#fff',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        fontWeight: '600'
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
  /* Outer container → ALWAYS CENTER */
  .pagination-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
  }

  /* Pagination pill */
  .pagination-wrapper {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 6px 20px;
    background: white;
    border-radius: 999px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    flex-wrap: wrap;              /* responsive */
    justify-content: center;
  }

  /* Page numbers */
  .page-btn {
    background: none;
    border: none;
    font-size: 15px;
    color: #6b7280;
    cursor: pointer;
    padding: 6px 10px;
    min-width: 32px;
    transition: 0.2s;
  }

  .page-btn:hover {
    color: #4f46e5;
  }

  /* Active page */
  .page-btn.active {
    width: 36px;
    height: 36px;

    border-radius: 50%;
    font-weight: 600;
  }

  /* Arrows */
  .arrow-btn {
    border: none;
    background: none;
    font-size: 20px;
    color: #6b7280;
    cursor: pointer;
    padding: 6px;
  }

  .arrow-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Ellipsis */
  .dots {
    color: #9ca3af;
    font-size: 16px;
    padding: 0 6px;
  }

  /* 📱 Mobile adjustments */
  @media (max-width: 640px) {
    .pagination-wrapper {
      gap: 2px;
      padding: 10px 14px;
    }

    .page-btn {
      font-size: 14px;
      padding: 4px 8px;
    }

    .page-btn.active {
      width: 32px;
      height: 32px;
    }
  }
</style>
