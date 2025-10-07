<template>
  <section class="px-4 py-8 mt-14 lg:px-24">
    <div class="text-2xl uppercase mb-6">Collaction Details </div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 sm:gap-4 mb-8">
      <div class="flex flex-col w-full sm:w-56">
        <label class="font-medium text-gray-700 mb-1 sm:mb-0">Collaction Date</label>
        <input
          type="date"
          placeholder="Search"
          class="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-56 focus:ring-2 focus:ring-gray-800 focus:outline-none"
        />
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          class="mt-4 px-3 py-2 relative flex items-center gap-2 px-4 py-2 bg-[#232B37] text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-2 0v4H8v-4m8 0H8" />
          </svg>
          Print
        </button>
      </div>
    </div>



    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <div class="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 hover:shadow-2xl transition-all duration-300">

        <div class="grid grid-cols-5 text-center text-sm font-semibold text-gray-700  py-2 rounded-md mb-2">
          <div></div>
          <div>Book Number</div>
          <div>Member Name</div>
          <div>Amount Paid</div>
          <div>Due</div>
        </div>
        <div class="space-y-2 text-center text-sm text-gray-700">
          <div
            class="grid grid-cols-5 py-2 rounded-lg bg-white shadow-sm hover:bg-gray-500 transition"
            v-for="n in 4"
            :key="n"
          >
            <div>
               <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Avatar"
                class="w-12 h-12 rounded-full border-4 border-teal-600 shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div>2025-06-25</div>
            <div class="font-semibold text-teal-700">4,000</div>
            <div>2025-06-25</div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>

<script>
import { useUserStore } from "~/stores/modules/userStore";

definePageMeta({
  layout: "society",
});

export default {
  components: {  },
  props: [""],
  data() {
    return {
      imageroot: "",
      showLoading: null,
      searchVal: "",
    };
  },
  async mounted() {},
  async created() {
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;

  },
  watch: {},
  computed: {},
  methods: {
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
    // if (      
    //   this.userStore.loggedUser.userCompanyDetails.companyType.includes("welfare")
    // ) {
    // } else {
    //   this.$router.push("/user/login");
    //   this.$showToast("Not Allowed to access this page");
    // }
  },
  head() {
    return {
      title: "Welfare System",
    };
  },
};

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
