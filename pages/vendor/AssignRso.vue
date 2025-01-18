<template>
  <section>
    <h1 class="items-start justify-start mt-8 mb-8 text-2xl font-semibold tracking-tight text-gray-700 sm:text-3xl">Assign RSO</h1>
    <div class="grid grid-cols-2 gap-4 ">
      <div>
        <label class="block mb-4 text-sm font-medium text-gray-600">Company Name</label>
        <select v-model="selectedRso" class="w-full px-4 py-2 text-gray-700 border-2 border-gray-300 rounded-md">
          <option value="" disabled selected>Select RSO</option>
          <option v-for="rso in rsoName" :key="rso.id" :value="rso.name">{{ rso.name }}</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 mt-6" v-if="selectedRso">
      <label class="block text-sm font-medium text-gray-600">Selected RSO: {{ selectedRso }}</label>
    </div>
    <div class="grid grid-cols-1 gap-1 mt-6 sm:grid-cols-2 md:grid-cols-2">
      <button @click="submitAssignment" type="button" class="text-white bg-btn hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
      </button>
      <button @click="cancel" type="button" class="text-btn bg-white hover:bg-blue-900 border-2 border-btn hover:text-white focus:outline-none focus:ring-0 focus:ring-blue-900 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Cancel
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedRso: "",
      rsoName: [
        { id: 1, name: "RSO A" },
        { id: 2, name: "RSO B" },
      ],
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel-assign'); // Emit event to parent to close the modal
    },
    submitAssignment() {
      // Logic for submitting the assignment
    },
  },
};
</script>
