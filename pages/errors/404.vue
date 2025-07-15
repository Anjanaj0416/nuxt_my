<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section class="flex flex-col items-center justify-center min-h-screen text-center p-6">
    <img src="../../assets/img/digitalTechLabs/error/404.png" alt="404 illustration" class="w-24 mb-8" />
    <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
    <p class="text-lg text-gray-500 dark:text-gray-400 mb-6">
      Sorry, the page you're looking for doesn't exist or has been moved.
    </p>
    <NuxtLink to="/" class="text-white bg-blue-900 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
      Go back home
    </NuxtLink>
  </section>
</template>

<script>

import LinkBtn from "~/components/customcontrol/Link";
import Button from "~/components/customcontrol/Button";
import selectinput2 from "~/components/customcontrol/selectinput2";


definePageMeta({
  layout: 'default',
});

export default {

  components: { LinkBtn, Button, selectinput2 },
  props: [''],

  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    }
  },
}

</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>