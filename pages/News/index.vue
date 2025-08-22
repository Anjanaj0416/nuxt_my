<template>
  <div class="flex flex-wrap justify-center px-4 py-2 space-x-3 text-sm font-medium text-white bg-purple-700 sticky" role="alert">
    <span class="font-medium">News Update: </span> New articles are available. Check out the latest headlines now !
  </div>

  <NewsHeader/>

  <section class="bg-white max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Left Column -->
    <div class="md:col-span-1 space-y-6">
      <!-- Top Story -->
      <div>
        <h2 class="text-xl font-bold text-red-800 mb-2">Top Story</h2>
        <h3 
          class="font-semibold leading-snug text-gray-800 hover:underline hover:text-blue-600 cursor-pointer"
          @click="goToDetails(news.topNews)">
            {{ news.topNews.title || "No Title Available" }}
        </h3>
        <!-- <nuxt-link to="/News/newsDetails">
          <button class="px-4 py-2 bg-blue-600 text-white rounded">
            Go to Details
          </button>
        </nuxt-link> -->
        <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
          <span>{{ news.topNews.hour }}</span>
          <span>💬</span>
          <span>7</span>
          <span>👁️</span>
          <span>14</span>
        </div>
        <div class="flex mt-2">
        <img :src="news.topNews.image" class="w-24 h-16 object-cover mr-3" />

          <p class="text-sm text-gray-700">
            {{ news.topNews.shortContent.slice(0, 76) }}...
          </p>
        </div>
      </div>

      <!-- Breaking News -->
      <div>
        <h2 class="text-xl font-bold text-red-800 mb-2">Breaking News</h2>
        <h3 
          class="font-semibold leading-snug text-gray-800 hover:underline hover:text-blue-600 cursor-pointer"
          @click="goToDetails(news.breakingNews)">
            {{ news.breakingNews.title || "No Title Available" }}
        </h3>
        <!-- <nuxt-link to="/News/newsDetails">
          <button class="px-4 py-2 bg-blue-600 text-white rounded">
            Go to Details
          </button>
        </nuxt-link> -->
        <div class="flex items-center text-xs text-gray-500 space-x-2 mt-2">
          <span>{{ news.breakingNews.hour }}</span>
          <span>💬</span>
          <span>7</span>
          <span>👁️</span>
          <span>14</span>
        </div>
        <div class="flex mt-2">
        <img :src="news.breakingNews.image" class="w-24 h-16 object-cover mr-3" />

          <p class="text-sm text-gray-700">
            {{ news.breakingNews.shortContent.slice(0, 130) }}...
          </p>
        </div>
      </div>
    </div>

    <!-- Center Column -->
    <div class="md:col-span-2">
      <h4 class="uppercase text-sm text-gray-500 font-medium mb-1">Picture Story</h4>
      <img
        :src="news.mainNews.image"
        alt="Feature Story"
        class="w-full rounded-md mb-3"
      />
      <h1 class="font-semibold leading-snug text-gray-800 hover:underline hover:text-blue-600 cursor-pointer"
        @click="goToDetails(news.mainNews)"
      >
        {{ news.mainNews.title || "No Title Available"}}
      </h1>

      <div class="flex text-xs text-gray-500 space-x-4 mt-4">
        <span>{{ news.mainNews.hour }}</span>
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
      <div v-for="newsItem in news.otherNews" :key="newsItem.id">
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


definePageMeta({
  layout: 'contactus',
});

export default {
  components: {NewsHeader,NewsFooter},
  data() {
    return {
      news: {
        topNews: {
          title: "75% of APAC CFOs Believe That AI Agents Will Drive Revenue and Transform Existing Organizational Structures: Salesforce Research",
          image: topBanner,
          hour: "22 Aug 2025",
          shortContent: "Colombo, Sri Lanka – Full’r Burgers, one of the fastest-growing names in Sri Lanka’s quick service restaurant (QSR) industry,  ",
          fullContent: [
            {
              paragraph1:"CFOs recognise that AI has evolved from an emerging technology to a strategic tool, with only 3% of APAC CFOs still conservative in their AI strategy, down drastically from 63% five years ago ",
              paragraph2:"INDIA, 19 August 2025 – Chief Financial Officers (CFOs) in Asia Pacific (APAC) have fundamentally shifted their approach to Artificial Intelligence (AI), according to new research from Salesforce, moving from cautious spenders to strategic investors who are betting on AI not just for cost-cutting, but as a crucial engine for long-term revenue growth.",
              paragraph3:"A striking 63% of APAC CFOs reported having a conservative AI strategy in 2020. Fast forward to today, and that number has plummeted to a mere 3%. This rapid transformation highlights a widespread recognition among financial leaders that AI is no longer just an emerging technology but a crucial tool for enhancing efficiency, optimizing operations, and, critically, driving long-term growth.",
              paragraph4:"CFOs' fundamental rethinking of tech investment ROI, according to the data, explains this transformation. Half (50%) of APAC CFOs say AI agents — digital labor capable of performing tasks autonomously — are changing how they evaluate ROI, measuring the success of technology investments beyond traditional metrics to encompass a broader range of business outcomes. ",
              paragraph5:"The introduction of digital labor isn’t just a technical upgrade — it represents a decisive and strategic shift for CFOs, said Robin Washington, President and Chief Operating and Financial Officer at Salesforce. “With AI agents, we’re not merely transforming business models; we’re fundamentally reshaping the entire scope of the CFO function. This demands a new mindset as we expand beyond financial stewards to also become architects of agentic enterprise value.",
              paragraph6:"Last year, in fact, 65% of global CFOs faced pressure to accelerate tech investment ROI. Today, they recognize the value of AI isn’t just about short-term cost-cutting, but also long-term business outcomes like revenue generation, productivity gains and improved decision-making. –  things AI agents are uniquely suited to improve. ",

            }
          ],
        },
        mainNews: {
          title: "Full’r Burgers Reopens at Crescat Boulevard with a New Look and Upgraded Dining Experience",
          image: mainBanner,
          hour: "22 Aug 2025",
          shortContent: "Colombo, Sri Lanka – Full’r Burgers, one of the fastest-growing names in Sri Lanka’s quick service restaurant (QSR) industry, has officially reopened its Crescat Boulevard outlet with a fresh new brand identity ",
          fullContent: [
            {
              paragraph1:"Colombo, Sri Lanka – Full’r Burgers, one of the fastest-growing names in Sri Lanka’s quick service restaurant (QSR) industry, has officially reopened its Crescat Boulevard outlet with a fresh new brand identity and enhanced dining experience. This milestone marks another exciting chapter in Full’r Burgers journey to become a top contender for the best burgers in Colombo",
              paragraph2:"Located in the heart of the city at the popular Crescat Boulevard, the revamped Full’r Burgers outlet now features expanded indoor and outdoor seating, designed to offer a more comfortable, convenient space for both dine-in guests and takeaway customers. The refreshed layout improves customer flow while maintaining the brand’s signature vibrant and casual ambiance.",
              paragraph3:"With this relaunch, Full’r Burgers introduces a modernized brand image and focuses more than ever on providing a seamless, fast-casual dining experience. From quick service to quality food and welcoming interiors, every aspect of the new outlet reflects Full’r Burgers dedication to great burgers and great service.",
              paragraph4:"The reopening is a strategic move as Full’r Burgers strengthens its presence in Colombo’s competitive burger restaurant space. It aligns with the brand’s wider expansion goals and its mission to deliver a premium yet affordable burger experiences across key urban hubs.",
              paragraph5:"Full’r Burgers has built a loyal following with its juicy burger patties, fresh ingredients, and bold flavors. The new Crescat outlet brings this signature taste to a modern setting, offering customers more reasons to choose Full’r when searching for burgers near me in Colombo.",
              paragraph4:"Whether you’re grabbing a quick bite, enjoying a meal with friends, or exploring the city’s best food spots, the new Full’r at Crescat Boulevard is a must-visit. The brand invites everyone to step in, enjoy the vibe, and be part of its evolving QSR story ; one delicious burger at a time.",


            }
          ],
        },
        businessNews: {
          title: "",
          image: "",
          hour: "",
          shortContent: "",
          fullContent: "",
        },
        breakingNews: {
          title: "Former President Ranil Wickremesinghe arrested ",
          image: braking,
          hour: "22 Aug 2025",
          shortContent: "Former President Ranil Wickremesinghe was arrested today by the Criminal Investigation Department (CID) after arriving to record a",
          fullContent: "",
        },
        otherNews: [
          {
            id: 1,
            title: "Abans Solar Introduces ‘Tiken Tika Pay’ for Solar PV Systems",
            image: otherNews1, 
            hour: "22 Aug 2025",
            shortContent: "Within a time of increasing grid failures, environmental concerns, and the growing energy demand, Solar power stands as the sustainable solution, which could pave the pathway for energy independence, while reducing the reliance on typical power sources ",
            fullContent: [
              {
                paragraph1: "Within a time of increasing grid failures, environmental concerns, and the growing energy demand, Solar power stands as the sustainable solution, which could pave the pathway for energy independence, while reducing the reliance on typical power sources and lowering energy bills. However, one significant hurdle that prevents many from venturing into investing in Solar Power Systems is the high initial cost of the power system. ",
                paragraph2: "As the ultimate solution to this problem, Abans Solar is proud to introduce ‘Tiken Tika Pay’ hire purchase facility for Solar PV systems, which brings the monthly instalment rate for Solar as low as mere Rs. 20,139/-. Under this facility, customers can not only gain the benefit of instalment payment plans, but Abans Solar provides with the access to the best technology, reliable consumer service, and long-term warranties. As a stable company that is able to guide you through the whole process, from selecting the right solutions, to providing installation and after-sales service support, Abans Solar functions under a ‘customer-first’ philosophy. ",
                paragraph3: "Abans Solar doesn’t just stop at affordability. The company is committed to delivering a full-circle energy experience, combining world-class products with personalized service, nationwide support, and unbeatable value.",
                paragraph4: "This is delivered through the high-efficiency photovoltaic (PV) panels and inverters sourced from globally trusted manufacturers, such as JinkoSolar, Huawei, Growatt and more. This means better performance, longer life, and maximum savings from day one.",
                paragraph5: "Why choose Abans? With island wide coverage of a network of over 400 showrooms, experienced electrical engineers and technical staff, well trained installation teams, 24/7 after sales service support, not only Abans offers top quality, highly efficient product components, but also offers trustworthy warranty up to 30 years.",
                paragraph6: "Additionally, Abans Solar offers free site visits and consultation, free insurance coverage, an online monitoring application, while offering the first service for free. With Abans Solar, you can harness the sun’s power to create a cleaner, greener, and brighter future for generations to come. Choosing Abans Solar doesn’t just benefit your wallet but becomes a gift to the environment and the future. Contact us at 0112 222 888 for more information.",
              }
            ],
          },
          // {
          //   id: 2,
          //   title: "Another News Title",
          //   image: "",
          //   hour: "5 hours ago",
          //   shortContent: "Short summary...",
          //   fullContent: "",
          // },
        ]

      }
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
