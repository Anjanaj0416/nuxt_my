<template>
  <div class="flex flex-wrap justify-center px-4 py-2 space-x-3 text-sm font-medium text-white bg-purple-700" role="alert">
    <span class="font-medium">Info alert! </span> Change a few things up and try submitting again.
  </div>

  <header class="bg-white shadow-md w-full sticky top-0 z-50 mt-8">
    <!-- Top Header -->
    <div class="flex flex-wrap items-center justify-between px-4 py-2 max-w-screen-xl mx-auto">
      <!-- Left: Sections and Search -->
      <div class="flex items-center space-x-4">
        <div class="text-sm text-gray-800">
          Fri, 25 Jul 2025
        </div>
      </div>

      <!-- Center: Logo -->
      <div class="text-center flex-1">
        <img
          src="/assets/img/b2b/BtoBLogo.png"
          alt="B2B.lk Logo"
          class="mx-auto h-24 mb-2"
        />
      </div>


      <!-- Right: Weather + Buttons -->
      <div class="flex items-center space-x-4 text-sm">
        <div class="text-center">
          <!-- <div class="text-gray-700">Colombo</div>
          <div class="flex items-center justify-center">
            🌤️ <span class="ml-1">27°C</span>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Middle Navigation Bar -->
    <nav class="border-t border-gray-200">
      <div class="flex flex-wrap justify-center px-4 py-2 space-x-3 text-sm font-medium text-gray-700">
        <a href="#" class="hover:text-blue-600">Home</a>
        <a href="#" class="hover:text-blue-600">Latest News</a>
        <a href="#" class="hover:text-blue-600">Opinion</a>
        <a href="#" class="hover:text-blue-600">Features</a>
        <a href="#" class="hover:text-blue-600">Expose</a>
        <a href="#" class="hover:text-blue-600">Business</a>
        <a href="#" class="hover:text-blue-600">Sports</a>
        <a href="#" class="hover:text-blue-600">World News</a>
        <a href="#" class="hover:text-blue-600">Videos</a>
        <a href="#" class="hover:text-blue-600">The Sun</a>
        <a href="#" class="hover:text-blue-600">Life</a>
        <a href="#" class="hover:text-blue-600">Obituaries</a>
      </div>
    </nav>
  </header>


  <section class="bg-white max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Left Column -->
    <div class="md:col-span-1 space-y-6">
      <!-- Top Story -->
      <div>
        <h2 class="text-xl font-bold text-red-800 mb-2">Top Story</h2>
        <h3 class="font-semibold leading-snug">
          Supreme Court orders CID probe into AG’s decision on X-Press Pearl legal action
        </h3>
        <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
          <span>4 hours ago</span>
          <span>•</span>
          <span>7</span>
          <span>•</span>
          <span>1512</span>
        </div>
        <div class="flex mt-2">
          <img src="https://via.placeholder.com/100x80" class="w-24 h-16 object-cover mr-3" />
          <p class="text-sm text-gray-700">
            The Supreme Court yesterday ordered the CID to conduct investigations into matters arising from the AG’s decision...
          </p>
        </div>
      </div>

      <!-- Breaking News -->
      <div>
        <h2 class="text-xl font-bold text-red-800 mt-4 mb-2">Breaking News</h2>
        <h3 class="font-semibold text-sm leading-tight">
          7 Children Dead, 2 In ICU as Rajasthan school building collapses
        </h3>
      </div>
    </div>

    <!-- Center Column -->
    <div class="md:col-span-2">
      <h4 class="uppercase text-sm text-gray-500 font-medium mb-1">Picture Story</h4>
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Business News Update</h1>
      <img
        src="https://srilankamirror.com/wp-content/uploads/2025/02/Govt.Offices_1200px_25_02_25-1000x600.jpg"
        alt="Feature Story"
        class="w-full rounded-md mb-3"
      />
      <div class="flex text-xs text-gray-500 space-x-4">
        <span>24 Jul 2025</span>
        <span>•</span>
        <span>10</span>
        <span>•</span>
        <span>1380</span>
      </div>
    </div>

    <!-- Right Column -->
    <div class="md:col-span-1 space-y-6">
      <!-- Popular Comments -->
      <div class="max-w-xs bg-white rounded-xl shadow-md p-4 space-y-4 border border-gray-200 text-sm">
        <!-- Weather Section -->
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold text-gray-800">Colombo, LK</h2>
            <p class="text-gray-500 text-xs">30°C | Clear</p>
          </div>
          <!-- <img src="https://openweathermap.org/img/wn/01d.png" alt="weather" class="w-8 h-8"> -->
           🌤️
        </div>

        <hr class="border-gray-300" />

        <!-- Currency Section -->
        <div class="">
          <h3 class="text-sm font-bold text-yellow-700 mb-3">💱 Currency Rates (LKR)</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <img src="https://flagcdn.com/w40/us.png" alt="USD" class="w-5 h-4">
                <span>USD (🇺🇸)</span>
              </div>
              <span class="font-medium">1 USD = 325.50</span>
            </li>

            <li class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <img src="https://flagcdn.com/w40/eu.png" alt="EUR" class="w-5 h-4">
                <span>EUR (🇪🇺)</span>
              </div>
              <span class="font-medium">1 EUR = 356.30</span>
            </li>

            <li class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <img src="https://flagcdn.com/w40/gb.png" alt="GBP" class="w-5 h-4">
                <span>GBP (🇬🇧)</span>
              </div>
              <span class="font-medium">1 GBP = 410.75</span>
            </li>

            <li class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <img src="https://flagcdn.com/w40/in.png" alt="INR" class="w-5 h-4">
                <span>INR (🇮🇳)</span>
              </div>
              <span class="font-medium">1 INR = 3.92</span>
            </li>
          </ul>

          <p class="text-xs text-right text-gray-500 mt-2">Updated: July 25, 2025</p>
        </div>

      </div>


      <!-- Mirror Business -->
      <div>
        <div class="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 class="text-xl font-bold text-red-800 border-b border-gray-200 pb-2"></h2>
          <div class="w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              class="w-full h-full"
              src="https://www.youtube.com/embed/IixmFT6wenE"
              title="Mirror Business"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

        </div>

      </div>

      
    </div>
  </section>

<section class="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-screen-xl mx-auto px-4 py-4 ">
  <div class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>
      <h2 class="text-xl font-bold text-red-800 mb-2">Top Story</h2>
      <h3 class="font-semibold leading-snug">
        Supreme Court orders CID probe into AG’s decision on X-Press Pearl legal action
      </h3>
      <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
        <span>4 hours ago</span>
        <span>•</span>
        <span>7</span>
        <span>•</span>
        <span>1512</span>
      </div>
      <div class="flex mt-2">
        <img src="https://via.placeholder.com/100x80" class="w-24 h-16 object-cover mr-3" />
        <p class="text-sm text-gray-700">
          The Supreme Court yesterday ordered the CID to conduct investigations into matters arising from the AG’s decision...
        </p>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-red-800 mb-2">Top Story</h2>
      <h3 class="font-semibold leading-snug">
        Supreme Court orders CID probe into AG’s decision on X-Press Pearl legal action
      </h3>
      <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
        <span>4 hours ago</span>
        <span>•</span>
        <span>7</span>
        <span>•</span>
        <span>1512</span>
      </div>
      <div class="flex mt-2">
        <img src="https://via.placeholder.com/100x80" class="w-24 h-16 object-cover mr-3" />
        <p class="text-sm text-gray-700">
          The Supreme Court yesterday ordered the CID to conduct investigations into matters arising from the AG’s decision...
        </p>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-bold text-red-800 mb-2">Top Story</h2>
      <h3 class="font-semibold leading-snug">
        Supreme Court orders CID probe into AG’s decision on X-Press Pearl legal action
      </h3>
      <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
        <span>4 hours ago</span>
        <span>•</span>
        <span>7</span>
        <span>•</span>
        <span>1512</span>
      </div>
      <div class="flex mt-2">
        <img src="https://via.placeholder.com/100x80" class="w-24 h-16 object-cover mr-3" />
        <p class="text-sm text-gray-700">
          The Supreme Court yesterday ordered the CID to conduct investigations into matters arising from the AG’s decision...
        </p>
      </div>
    </div>
  </div>

  <!-- Right Side Banners -->
  <div class="flex flex-col space-y-4">
    <div class="bg-yellow-400 h-40 rounded shadow flex items-center justify-center">
      <span class="text-black font-bold">Ad Banner 1</span>
    </div>
    <div class="bg-blue-300 h-40 rounded shadow flex items-center justify-center">
      <span class="text-black font-bold">Ad Banner 2</span>
    </div>
    <div class="bg-red-300 h-40 rounded shadow flex items-center justify-center">
      <span class="text-black font-bold">Ad Banner 3</span>
    </div>
  </div>
</section>


</template>

<script>

import { useUserStore } from '~/stores/modules/userStore';

definePageMeta({
  layout: 'contactus',
});

export default {
  data() {
    return {
     
    };
  },

  async mounted() {

  },

  async created() {

    },

  watch: {},
  computed: {

  },
  methods: {


  },




  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    };
  },
};

// Mobile Menu Toggle
// const menuOpen = ref(false);
// const toggleMenu = () => {
//   menuOpen.value = !menuOpen.value;
// };


</script>

<style scoped>
/* Utility Classes */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.html {
  scroll-behavior: smooth;
}

.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}

/* Navbar Specific */
nav a {
  @apply px-3 py-2 rounded-lg transition-colors;
}

nav a:hover {
  @apply bg-white text-black;
}
</style>
