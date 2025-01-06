
<template>
  <section>
    <header class="bg-blue-600 text-white p-4">
      <h1>My Nuxt App layout</h1>
    </header>
    
    <!-- The page content will be injected here -->
    <main class="p-4">
      <slot />
    </main>

    <footer class="bg-gray-800 text-white p-4 mt-4">
      <p>&copy; 2024 My Nuxt App</p>
    </footer>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>
