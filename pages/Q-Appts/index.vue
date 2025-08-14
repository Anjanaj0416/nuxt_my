<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section>
    <section class="flex flex-col md:flex-row items-center justify-between p-6 bg-blue-50">
  <div class="text-center md:text-left md:w-1/2">
    <h2 class="text-3xl md:text-7xl font-bold text-blue-900 leading-tight">
      Skip the Line,<br />
      Save Time
    </h2>
    <p class="text-gray-600 md:text-2xl max-w-md mt-4">
      EasyQueue lets you join queues and book appointments from anywhere — no more waiting around
    </p>
    <button @click="scrollToFilterBar" class="mt-6 px-6 py-3 bg-blue-900 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition">
      Make Appointment
    </button>
  </div>

  <div class="mt-8 md:mt-0 md:w-1/2 flex justify-center">
    <img
      src="https://i.imgur.com/XydtNbh.png"
      alt="Illustration"
      class="w-81 h-auto"
    />
  </div>
</section>

      <div v-if="!showSearchInNavbar" class="sticky top-1 z-50">
        <searchBar />
      </div>

    
      <FilterBar 
      @filter-selected="onFilterSelected"
      :current-filter="salonStore.selectedFilter"
      ref="filterBar"class="w-full z-50 md:sticky md:top-20"/>

    <section class="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       <SalonCard v-for="salon in salonStore.filteredSalons" :key="salon.id" :salon="salon" />
    </section>

    <div class="text-center my-4" v-if="salonStore.salons.length < salonStore.total">
      <button
        @click="loadMore"
        class="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
        :disabled="salonStore.loading"
      >
        {{ salonStore.loading ? 'Loading...' : 'Load More' }}
      </button>
    </div>

    <!-- <div class="p-2 bg-yellow-100 text-sm rounded mb-4" v-if="salonStore.lat && salonStore.lng">
      Geolocation: {{ salonStore.lat }}, {{ salonStore.lng }}
    </div> -->
  </section>
    <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>
  
<script>
import { onMounted } from 'vue'
//import { useRoute } from 'vue-router'
//import { useUserStore } from "~/stores/modules/userStore";
import { useSalonStore } from "~/stores/modules/Q-Appts/shops";
//import { login } from '~/pages/Q-Appts/login.vue';
//import { register } from '~/pages/Q-Appts/register.vue';

import SalonCard from '~/components/Q-Appts/ShopCard.vue';
import header from '@/components/Q-Appts/header.vue';
import footer from '@/components/Q-Appts/footer.vue';
import FilterBar from '@/components/Q-Appts/FilterBar.vue';
import searchBar from "~/components/Q-Appts/searchBar.vue";

//const salonStore = useSalonStore();

 definePageMeta({ 
    layout: 'appts',   
    //middleware: 'auth',
   });
   
  export default {
    
    components: {header, footer, FilterBar, SalonCard , searchBar},
    setup() {
    const salonStore = useSalonStore();

    function onFilterSelected(filter) {
      salonStore.setSelectedFilter(filter);
    }
    onMounted(() => {
      console.log('Mounted Q-Appts page');
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        salonStore.lat = latitude
        salonStore.lng = longitude
        //salonStore.fetchNearbyShops(latitude, longitude, true)
        console.log(`Current location: ${latitude}, ${longitude}`);
        console.log('Nearby shops fetched successfully');
        
      },
      (err) => {
        console.error('Location error:', err)
        // Fallback location (Colombo)
        //salonStore.fetchNearbyShops(6.9271, 79.8612, true)
      }
      )
      }
    })

    /* function loadMore() {
        salonStore.fetchNearbyShops(salonStore.lat, salonStore.lng)
    } */

    return {
      salonStore,
      onFilterSelected,
    };
    },
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        userStore: null,
        showSearchInNavbar: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    async created() {
      //this.userStore = useUserStore();
      //this.showLoading = this.$showLoading;
      //this.imageroot = this.userStore.loggedUser.resourceURLRoot;
      
       //const encode = btoa('facebook'); //console.log(encode) // "SGVsbG8gV29ybGQ="        
        //const decode = atob(encode);console.log(decode); // "Hello World"
         
        //linkedin - p=bGlua2VketW5=
        // facebook  - p=ZmFjZWJvb2s=
       //  const route = useRoute();
        //let val = route.query.p;
        //if (val !== undefined)
        //{            
         // this.medium = atob(val);         
       // }
    },
  watch: {},
  computed: {
      salonStore() {
      return useSalonStore();
    },
  },
  methods: {
      handleScroll() {
      this.showSearchInNavbar = window.scrollY > 430
      },
      scrollToFilterBar() {
        const el = this.$refs.filterBar?.$el || this.$refs.filterBar;
          if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
        }
      },
     
      // async copyContent(value) {
      //   try {
      //      await navigator.clipboard.writeText(value)
      //      this.show_msg('Content copied to clipboard')
  
      //   } catch (err) {
      //     this.show_msg('Failed to copy :'+err)
      //   }
      // },
      //     async copyContent(value) {
      //   try {
      //      await navigator.clipboard.writeText(value)
      //      this.show_msg('Content copied to clipboard')
  
      //   } catch (err) {
      //     this.show_msg('Failed to copy :'+err)
      //   }
      // },
      //  async downloadReportKotukole(){
      //   if(confirm('Do you want to Download?')){
      //      await this.get_DownloadKotukole({book:this.book});
      //      window.open(this.csv_root+'/reports/'+this.csv_name, '_blank');
      //   }
      // },

      //this.$showToast('Login successful!', 'success'); //success ,error ,warning,info
    },
    async beforeMount() {
  //  if (this.userStore.loggeduser && !this.userStore.loggeduser.granted.contains('english') ) {
  //     } else {        
  //       this.$router.push('/user/login')
  //       this.$showToast('Not Allowed to access this page')
  //     }
      window.removeEventListener('scroll', this.handleScroll)
  
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }

      //Message Usecases
    //this.$showAlert("Test Login Failed!", "error");

    //     this.$showConfirm('Are you sure you want to delete this item?', 'warning').then((result) => {
    //   if (result) {
    //     console.log('Item deleted');
    //   } else {
    //     console.log('Action canceled');
    //   }
    // });

  //    this.$showInput('Please enter your name:').then((input) => {
  //   if (input) {
  //     console.log('User input:', input);
  //   } else {
  //     console.log('No input or canceled');
  //   }
  // });

  // const htmlMessage = `
  //       <h2 style="color: #007bff;">Hello, Welcome to the Custom HTML Alert!</h2>
  //       <p>This is a <strong>custom HTML</strong> message with <a href="https://www.example.com" target="_blank" style="color: #007bff;">links</a>.</p>
  //       <img src="https://via.placeholder.com/150" alt="Sample Image" style="display: block; margin-top: 10px;" />
  //       <p><em>Note: This is a custom alert with rich HTML content.</em></p>
  //     `;
      
  //     this.$showHtmlAlert(htmlMessage);

  
  //const loadingAlert = this.$showLoading('Loading...');
  //loadingAlert.close();

  // const imageUrl = 'https://intranet.sltds.lk/SLTDS/Resource/rainbow/news/GroupPhotoMeetingTheSecretarytotheTreasury.jpg'; 
  // this.$showImageAlert('Here is your custom image!', imageUrl);

  // this.$showCustomButtons('Are you sure you want to proceed?', 'warning').then((result) => {
  //   if (result === 'Proceed') {
  //     console.log('User confirmed to proceed');
  //   } else {
  //     console.log('User canceled the action');
  //   }
  // });

 //End Message Usecases
  
  //Validation
  //-------------------------------------------------
  // async cmdSearchOrg(){
  //       if(this.isAtleasetOneExisitsForSearch()){
  //      await this.getOrganizationData(this.organizationSearch);
  //       }
  //     },
  
  // 	-------------------
  
  
  //  isAtleasetOneExisitsForSearch(){
  //  let isAtleasetOneExisitsForSearch = false;
  
  
  //  if(this.organizationSearch.person.trim()!='' ){
  //         if( this.organizationSearch.person.trim().length  <= 3 ){
  //             this.show_error('Invalid person , More than three Letters Requied for search');
  //         }
  //         else{ isAtleasetOneExisitsForSearch = true;}
  
  //       }
  // 	  return isAtleasetOneExisitsForSearch;
  // 	  }

     // GetCityById() {
    //   return (id) => {
    //     try {
    //       let objCity = this.vendorStore.initVendor.listCities.filter((city) => {
    //         return city.id == id
    //       })[0]
    //       return objCity.value
    //     } catch {
    //       return ''
    //     }
    //   }
    // },
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
  section {
  max-width: 1200px;
  margin: auto;
}
  </style>


