<template>
  <div class="flex flex-wrap justify-center px-4 py-2 space-x-3 text-sm font-medium text-white bg-purple-700 sticky" role="alert">
    <span class="font-medium">News Update: </span> New articles are available. Check out the latest headlines now !
  </div>

  <NewsHeader/>

  <!-- {{ listNews.otherNews }} -->

  <section class="bg-white max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Left Column -->
    <div class="md:col-span-1 space-y-6">
      <!-- Top Story -->
      <div>
        <h2 class="text-xl font-bold text-red-800 mb-2">Top Story</h2>
        <h3 
          class="font-semibold leading-snug text-gray-800 hover:underline hover:text-blue-600 cursor-pointer"
          @click="goToDetails(listNews.topNews)">
            {{ listNews.topNews.title || "No Title Available" }}
        </h3>
        <!-- <nuxt-link to="/News/newsDetails">
          <button class="px-4 py-2 bg-blue-600 text-white rounded">
            Go to Details
          </button>
        </nuxt-link> -->
        <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
          <span>{{ listNews.topNews.hour }}</span>
          <span>💬</span>
          <span>7</span>
          <span>👁️</span>
          <span>14</span>
        </div>
        <div class="flex mt-2">
        <img :src="listNews.topNews.image" class="w-24 h-16 object-cover mr-3" />

          <p class="text-sm text-gray-700">
            {{ listNews.topNews.shortContent }}...
          </p>
        </div>
      </div>

      <!-- Breaking News -->
      <div>
        <h2 class="text-xl font-bold text-red-800 mb-2">Breaking News</h2>
        <h3 
          class="font-semibold leading-snug text-gray-800 hover:underline hover:text-blue-600 cursor-pointer"
          @click="goToDetails(listNews.breakingNews )">
            {{ listNews.breakingNews.title || "No Title Available" }}
        </h3>
        <!-- <nuxt-link to="/News/newsDetails">
          <button class="px-4 py-2 bg-blue-600 text-white rounded">
            Go to Details
          </button>
        </nuxt-link> -->
        <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
          <span>{{ listNews.breakingNews.hour }}</span>
          <span>💬</span>
          <span>7</span>
          <span>👁️</span>
          <span>14</span>
        </div>
        <div class="flex mt-2">
        <img :src="listNews.breakingNews.image" class="w-24 h-16 object-cover mr-3" />

          <p class="text-sm text-gray-700">
            {{ listNews.breakingNews.shortContent }}
          </p>
        </div>
      </div>
    </div>

    <!-- Center Column -->
    <div class="md:col-span-2">
      <h4 class="uppercase text-sm text-gray-500 font-medium mb-1">Picture Story</h4>
      <img
        :src="listNews.mainNews.image"
        alt="Feature Story"
        class="w-full rounded-md mb-3"
      />
      <h1 class="font-semibold leading-snug text-gray-800 hover:underline hover:text-blue-600 cursor-pointer"
        @click="goToDetails(listNews.mainNews)"
      >
        {{ listNews.mainNews.title || "No Title Available"}}
      </h1>

      <div class="flex text-xs text-gray-500 space-x-4 mt-4">
        <span>{{ listNews.mainNews.hour }}</span>
        <span>💬</span>
        <span>10</span>
        <span>👁️</span>
        <span>13</span>
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
      <div v-for="newsItem in listNews.otherNews" :key="newsItem.id">
        <h2 class="text-xl font-bold text-red-800 mb-2">Story</h2>
        <h3 class="font-semibold leading-snug text-gray-800 hover:underline hover:text-blue-600 cursor-pointer"
          @click="goToDetails(newsItem)"
        >
          {{ newsItem.title || "No Title Available" }}
        </h3>
        <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
          <span>{{ newsItem.hour || "Unknown time" }}</span>
          <span>💬</span>
          <span>7</span>
          <span>👁️</span>
          <span>15</span>
        </div>
        <div class="flex mt-2">
          <img
            :src="newsItem.image || 'https://via.placeholder.com/100x80'"
            class="w-24 h-16 object-cover mr-3"
          />
          <p class="text-sm text-gray-700">
            {{ newsItem.shortContent.slice(0, 76) || "No summary available." }}
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

  <NewsFooter/>


</template>

<script>

import NewsHeader from '~/components/News/header.vue';
import NewsFooter from '~/components/News/footer.vue';
import b2bLogo from '~/assets/img/b2b/BtoBNewsLogo.png';
import mainBanner from '~/assets/img/news/mainNews.jpg';
import topBanner from '~/assets/img/news/topNews.png'
import otherNews1 from '~/assets/img/news/otherNews1Banner.jpg'
import braking from '~/assets/img/news/braking.jpg'
import { useUserStore } from '~/stores/modules/userStore';
import { useStandpageStore } from '~/stores/modules/dtlStore';


definePageMeta({
  layout: 'contactus',
});

export default {
  components: {NewsHeader,NewsFooter},
  data() {
    return {
      listNews: {
        breakingNews: {},
        businessNews: {},
        mainNews: {},
        otherNews: [],
        topNews: {}
      },
      showLoading: null,

    };
  },

  async mounted() {

  },

  async created() {
    this.dtlStore = useStandpageStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;

    this.loginWithSecretCode();

    await this.dtlStore.fetchNews(this.showLoading);

    this.listNews = this.dtlStore.newsList;



    },

  watch: {},
  computed: {

  },
  methods: {

    async loginWithSecretCode() {
      const secretCode = 'w5jzxd02';
      const formData = new FormData();
      formData.append('secretCode', secretCode);

      try {
        await this.userStore.AppLogin(formData, this.showLoading);
        console.log('Login successful');
      } catch (err) {
        console.error('Login failed:', err);
      }
    },

  


    goToDetails(item) {
      console.log('test:',item);
      // Use this.$router for Options API
      this.$router.push({
        path: '/News/newsDetails',
        params: { id: item.id },
        query: { item: JSON.stringify(item) }
      })

    }
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
