<!-- Pagination.vue -->
<template>
    <div class="pagination">
      <button 
        @click="changePage(page)" 
        v-for="page in pages" 
        :key="page" 
        class="page-button"
      >
        {{ page }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      totalItems: Number, 
      itemsPerPage: Number,
      currentPage: Number,
    },
    computed: {
      pages() {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        return Array.from({ length: totalPages }, (_, index) => index + 1);
      }
    },
    methods: {
      changePage(page) {
        this.$emit('update:currentPage', page);
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    gap: 8px;
  }
  
  .page-button {
    padding: 8px;
    background-color: #eee;
    border: 1px solid #ddd;
    cursor: pointer;
  }
  
  .page-button:hover {
    background-color: #ccc;
  }
  </style>
  