<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section class="mt-20 mx-4">
    <div class="text-lg unde">Membership Payments</div>

    <div
      class="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 sm:gap-4 my-4 w-full"
    >
      <!-- Search Label and Input -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full sm:w-auto"
      >
        <label class="font-medium mb-1 sm:mb-0">Search</label>
        <input
          type="text"
          v-model="searchVal"
          class="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-52 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <!-- Pay Date Input -->
      <input
        type="date"
        placeholder="Pay Date"
        class="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      <!-- Amount Input -->
      <input
        type="number"
        placeholder="Amount"
        class="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        inputmode="numeric"
        pattern="[0-9]*"
        onwheel="this.blur()"
        onkeydown="return event.keyCode !== 69 && event.keyCode !== 189 && event.keyCode !== 190"
      />

      <!-- Pay Button -->
      <button
        type="button"
        class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
      >
        Pay
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Payment Details Card -->
      <div class="p-4 border rounded shadow-sm bg-white">
        <!-- Header -->
        <div class="flex justify-between items-center border-b pb-2 mb-4">
          <h2 class="font-semibold text-lg text-gray-800 underline">Payment Details</h2>
          <span
            class="inline-block rounded-full border border-black px-3 py-1 text-sm text-gray-700"
          >
            Due &nbsp; +5
          </span>
        </div>

        <!-- Payment Rows -->
        <div class="space-y-2">
          <div
            class="grid grid-cols-4 text-center text-sm text-gray-700 font-medium"
          >
            <div>Date</div>
            <div>Amount</div>
            <div>Status</div>
            <div>PaidDate</div>
          </div>

          <div class="grid grid-cols-4 text-center text-sm text-gray-600">
            <div>2025 June 25</div>
            <div>4000</div>
            <div class="text-green-600 font-semibold">Paid</div>
              <div>2025 July 29</div>
          </div>
          <div class="grid grid-cols-4 text-center text-sm text-gray-600">
            <div>2025 June 25</div>
            <div>4000</div>
            <div class="text-green-600 font-semibold">Paid</div>
              <div>2025 July 29</div>
          </div>
          <div class="grid grid-cols-4 text-center text-sm text-gray-600">
            <div>2025 June 25</div>
            <div>4000</div>
            <div class="text-green-600 font-semibold">Paid</div>
              <div>2025 July 29</div>
          </div>
          <div class="grid grid-cols-4 text-center text-sm text-gray-600">
            <div>2025 June 25</div>
            <div>4000</div>
            <div class="text-green-600 font-semibold">Paid</div>
              <div>2025 July 29</div>
          </div>
        </div>
      </div>

      <!-- My Details Card -->
      <div class="p-4 border rounded shadow-sm bg-white">
        <!-- Header -->
        <h2 class="underline font-semibold text-lg text-gray-800 mb-3">
          My Details
        </h2>

        <!-- Details -->
        <div class="space-y-1 text-sm text-gray-700">
          <div>
            <span class="font-medium">Employee Name:</span> Ajith Weeramon
          </div>
          <div><span class="font-medium">Book No:</span> 125</div>
          <div>
            <span class="font-medium">Address:</span> No 51, W/Palliyapitiya,
            Dunagaha
          </div>
          <div><span class="font-medium">Contact:</span> 0715321168</div>
        </div>

        <!-- Avatar -->
        <div class="mt-4">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Avatar"
            class="w-24 h-24 rounded-full border shadow-sm object-cover"
          />
        </div>
      </div>
    </div>
  </section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
//// import * as Global from '@/assets/js/Global'
////import * as myfilter from '@/plugins/myfilter'
//import Swal from 'sweetalert2';
//import { useSampleStore  } from '~/stores/modules/sampleStore';
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/modules/userStore";
//import { useQuotationStore } from "~/stores/modules/qms/quotationStore";

import LinkBtn from "~/components/customcontrol/Link";
import Button from "~/components/customcontrol/Button";
import selectinput2 from "~/components/customcontrol/selectinput2";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: { LinkBtn, Button, selectinput2 },
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
  
    

    //const encode = btoa('facebook'); //console.log(encode) // "SGVsbG8gV29ybGQ="
    //const decode = atob(encode);console.log(decode); // "Hello World"

    //linkedin - p=bGlua2VkaW4=
    // facebook  - p=ZmFjZWJvb2s=
    //  const route = useRoute();
    //let val = route.query.p;
    //if (val !== undefined)
    //{
    // this.medium = atob(val);
    // }
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
    if (      
      this.userStore.loggedUser.userCompanyDetails.companyType.contains("welfare")
    ) {
    } else {
      this.$router.push("/user/login");
      this.$showToast("Not Allowed to access this page");
    }
  },
  head() {
    return {
      title: "Intranet - Digital Tech Labs",
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
