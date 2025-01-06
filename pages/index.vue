<template>
  <div class="">
    <h2 class="font-bold text-red-400">
      Welcome to the Homepage - Intranet index.vue!
    </h2>
    <button @click="showAlert">Click Me</button>
  </div>
</template>

<script>
export default {
  layout: "default",
  methods: {
    showAlert() {
      // Use SweetAlert2 from the plugin
      const swal = useNuxtApp().$swal;

      swal.fire({
        title: "Hello!",
        text: "This is a SweetAlert2 alert.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
  },
};
</script>

<style></style>
