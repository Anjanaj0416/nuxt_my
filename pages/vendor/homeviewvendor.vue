<template>
  <!-- <h1 class="mt-8 font-semibold tracking-tight text-gray-700 text-1xl text-balance sm:text-3xl">
    View Vendor
  </h1> -->
  <div class="flex items-center justify-between mt-6" v-if="!isEditMode">
    <h1 class="mt-8 font-semibold tracking-tight text-gray-700 text-1xl text-balance sm:text-3xl">Vendor</h1>

    <button
      class="px-4 py-2 font-semibold text-blue-900 transition duration-300 ease-in-out border-2 border-blue-800 rounded-lg hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
      aria-label="Edit vendor"
      @click="toggleEditMode"
    >
      Edit Vendor
    </button>
  </div>

  <div>
    <!-- Conditional rendering based on edit mode -->
    <viewvender v-if="!isEditMode" />
    <editvender v-else />
  </div>
</template>

<script>
import viewvender from '~/pages/vendor/viewvendor.vue';
import editvender from '~/pages/vendor/editvendor.vue';

export default {
  components: { viewvender, editvender },
  data() {
    return {
      isEditMode: false, // Tracks if the edit mode is active
    };
  },
  methods: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode; // Toggle edit mode
    },
  },
};
</script>

<style scoped>
.csscmd {
  @apply p-2 bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}
.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
.btn {
  background-color: #072556;
}
</style>
