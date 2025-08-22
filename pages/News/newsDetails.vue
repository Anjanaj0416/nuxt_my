
<template>
  
    <!-- Header -->
    <fheader />
      <section class="bg-white max-w-screen-xl mx-auto px-4 py-6 grid grid-cols-1 6">

    <!-- News Title -->
    <h1 class="text-2xl font-bold mb-6">{{ newsItem.title }}</h1>

    <!-- Content with image on the right -->
    <div class="flex flex-col md:flex-row md:items-start md:gap-6">
      <!-- Text Content -->
      <div class="flex-1 mb-4 md:mb-0">
        <p class="text-gray-700">{{ newsItem.fullContent[0].paragraph1 }}</p>
        <p class="text-gray-700 mt-2">{{ newsItem.fullContent[0].paragraph2 }}</p>
        <p class="text-gray-700 mt-2">{{ newsItem.fullContent[0].paragraph3 }}</p>
        <p class="text-gray-700 mt-2">{{ newsItem.fullContent[0].paragraph4 }}</p>
        <p class="text-gray-700 mt-2">{{ newsItem.fullContent[0].paragraph5 }}</p>
        <p class="text-gray-700 mt-2">{{ newsItem.fullContent[0].paragraph6 }}</p>
      </div>

      <!-- Image on the right -->
      <div class="flex-shrink-0 w-full md:w-48">
        <img
          :src="newsItem.image || 'https://via.placeholder.com/200x150'"
          class="w-full h-36 object-cover rounded"
          alt="News Image"
        />
      </div>
    </div>
  </section>
  <NewsFooter/>
</template>

  
  <script>

 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 
 import fheader from '~/components/News/header.vue';
 import NewsFooter from '~/components/News/footer.vue';


 definePageMeta({
      layout: 'contactus',

    //middleware: 'auth',
   });
   
  export default {
    
    components: {fheader,NewsFooter},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        newsItem: null
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;

      const route = useRoute();
        if (route.query.item) {
        try {
            this.newsItem = JSON.parse(route.query.item); // deserialize object
        } catch (error) {
            console.error('Failed to parse news item:', error);
        }
        } else {
        console.warn('No news item found in query params');
        }
      
    },
    watch: {},
     head() {
    return {
      title: this.newsItem ? this.newsItem.title : 'News Details',
    };
  },
    computed: {
  
    },
    methods: {
    
    },
    async beforeMount() {
        his.$showToast('Not Allowed to access this page')
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }

  </script>
  
  <style scoped>
  .csscmd{
    @apply p-2 text-center bg-blue-200 rounded;
  }
  .csscmd:hover{
    @apply bg-blue-200 cursor-pointer;
  }
  
  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }
  </style>
  
  
  