  <template>

    <heder/>
    
    <section class="px-4 py-12 mt-12">
      <div class="min-h-screen p-6 text-white ">
        <!-- Breadcrumbs -->
        <div class="mb-4 text-sm text-gray-400">
          <a href="#" class="hover:underline">Home</a> /
          <span class="text-gray-800">Product</span>
        </div>
  
        <!-- Layout -->
        <div class="flex flex-col gap-6 lg:flex-row">
          <!-- Sidebar Filters -->
          <aside class="w-full p-4 text-gray-800 rounded-lg lg:w-64 bg-gray-50">
            <h2 class="mb-4 text-lg font-semibold">Categories</h2>
            <ul class="space-y-2 text-sm">
              <li><input type="checkbox" class="mr-2" /> TOPS</li>
              <li><input type="checkbox" class="mr-2" /> T SHIRT</li>
              <li><input type="checkbox" class="mr-2" /> SHORTS</li>
              <li><input type="checkbox" class="mr-2" /> JUMPSUITS</li>
              <li><input type="checkbox" class="mr-2" /> JEANS</li>
            </ul>
          </aside>
  
          <!-- Product Grid -->
          <section class="w-full px-2 py-8 rounded-lg lg:px-4 bg-gray-50">
            <h1 class="mb-6 text-3xl font-semibold text-gray-800">Product</h1>
            <div class="grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 max-w-7xl">          
                <!-- Product Card -->
                <div 
                    v-for="(voucher, index) in giftVouchers"
                    :key="index"
                    class="p-4 text-center transition duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
                >
                <img
                    :src="voucher.image"
                    :alt="voucher.title"
                    class="object-cover w-full h-48 mb-4 rounded-lg"
                />
                <p class="font-medium text-gray-700">{{ voucher.title }}</p>
                <p class="mt-1 text-lg font-bold text-gray-900">{{ voucher.price }}</p>
                <button class="mt-3 inline-block border-2 text-gray-600 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-100 transition">Shop Now</button>
              </div>
  
            </div>
          </section>
        </div>
  
        <!-- Pagination -->
        <div class="flex justify-center mt-8 space-x-2">
          <button class="px-3 py-1 text-gray-500 border-2 rounded hover:bg-gray-50">1</button>
          <button class="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700">2</button>
          <button class="px-3 py-1 text-gray-500 border-2 rounded hover:bg-gray-50">3</button>
        </div>
      </div>
    </section>

    <whatsappChats />
    <mainFooter/>

  </template>
    
    <script setup>
      import { ref } from "vue";
      import { Swiper, SwiperSlide } from "swiper/vue";
      import "swiper/css";
      import "swiper/css/pagination";
      import "swiper/css/autoplay";
      import { Pagination, Autoplay } from "swiper/modules";
      import { useStandpageStore } from '~/stores/modules/dtlStore';
      import whatsappChats from '../chat/whatsappChat.vue';
      import heder from "./heder.vue";
      import mainFooter from "./footer.vue";
      
    

        const giftVouchers = [
            {
                title: 'Comfort Fit Crew Neck T-shirt – Black)',
                price: 'Rs.5,000.00',
                image: '../../../assets/img/digitalTechLabs/standard/s1.png'
            },
            {
                title: 'Gift Voucher Rs.2000 (Valid In-store & Online)',
                price: 'Rs.2,000.00',
                image: 'https://thilakawardhana.com/cdn/shop/files/TV2000_fe84521f-3d7f-4480-a5cd-36b3ac03b7e0_940x.png?v=1722253755'
            },
            {
                title: 'Gift Voucher Rs.10000 (Online Store Only)',
                price: 'Rs.10,000.00',
                image: 'https://thilakawardhana.com/cdn/shop/files/TV1000.1_6eed9eeb-74d8-4aba-9a98-cc0ac119343d_940x.png?v=1722253748'
            }
        ]
    
    
    
    </script>
    
    <script>
      definePageMeta({
        layout: 'bst',
      });
    
      export default {
        data() {
          return {
            imageroot: process.env.Assets_83,
            isMenuOpen: false,
                isSidebarOpen: false,
                isDropdownOpen: false,
          };
        },
        async mounted() {
          
        },
        async created() {
          this.store = useStandpageStore();
      
        },
        watch: {},
        computed: {
          // ...mapState({
          //   //loggeduser: (state) => state.loggeduser,
          // }),
        },
        methods: {
          handleSideButton() {
            this.showChatBox = !this.showChatBox;
            if (this.showChatBox) {
              // Initially, show the welcome message
              this.messages = [{ text: "Hi! Please wait, we're preparing to assist you.", isUser: false }];
            }
          },
          
        },
        mounted() {
          document.addEventListener('click', this.closeAll);
        },
        beforeUnmount() {
          document.removeEventListener('click', this.closeAll);
        },
        head() {
          return {
            title: 'Intranet - Digital Tech Labs',
          };
        },
      };
    </script>
    
    <style scoped>
    /* Utility Classes */
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
    @apply px-3  rounded-lg transition-colors;
  }
  
  
    </style>
    