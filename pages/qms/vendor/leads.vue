<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80">
    <div class="text-2xl uppercase">Merchant Leads</div>
    <div
      class="flex flex-col items-center justify-between mt-2 mb-8 md:flex-row"
    >
      <div class="w-full mb-4 md:mb-0"></div>
      <div class="w-full md:w-auto">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>

    <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />

    <div
      class="flex flex-col gap-5 p-2 mt-2 bg-white border-2 rounded-md shadow-md sm:p-6"
      v-for="(lead, index) in vendorStore.listLeads"
      :key="index"
    >
    <div class="flex flex-col justify-between sm:flex-row">
     <div>{{ lead.companyName }}</div> 
     <div>  {{ lead.industry }}</div> 
      <div> {{ lead.address1 }} </div> 
    </div>
      <div
        class="grid grid-cols-2 gap-2 -my-6 sm:flex sm:flex-row sm:justify-end"
      >
        <LinkBtn label="More" @click="isMore = !isMore;rowIndex=index" />
      </div>

      <div v-if="isMore && rowIndex==index">
        {{ lead }}
        <selectinput2
      class="w-64"
      v-model="lead.status"
      :cur_item="lead.status"
      :selections="vendorStore.InitLeads.listStatus"
      :err="err.status"
      label="Lead Status"
      @changed="changed_Status"
    />
    <textarea v-model="lead.comment"/>
        <div
        class="grid grid-cols-2 gap-2 -my-6 sm:flex sm:flex-row sm:justify-end"
      >
        <LinkBtn label="Update" @click="GetUpdateLead" />
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
import FilterTab from "~/components/customcontrol/FilterTab";
import { useUserStore } from "~/stores/modules/userStore";
import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import SearchComp from "~/components/customcontrol/SearchComp";
import LinkBtn from "~/components/customcontrol/Link";
import selectinput2 from "~/components/customcontrol/selectinput2";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: { FilterTab, SearchComp, LinkBtn,selectinput2 },
  props: [""],
  data() {
    return {
      arrFilter: ["Pending", "Completed", "Cancelled", "Hold", "RSOAssigned"],
      imageroot: "",
      showLoading: null,
      searchBy: "",
      isMore: false,
      rowIndex:-1,
      err:{status:''},
     
    };
  },
  async mounted() {},
  async created() {
    this.userStore = useUserStore();
    this.vendorStore = useVendorStore();
    this.showLoading = this.$showLoading;
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;

    await this.vendorStore.loadListLeads(
      { keyword: "", searchBy: this.searchBy },
      this.showLoading
    );

    await this.vendorStore.GetInitLeads(      
      this.showLoading
    );
  },
  watch: {},
  computed: {},
  methods: {
    async GetSearch(searchVal) {
      // await this.vendorStore.loadListVendors(
      //   { keyword: searchVal, searchBy: this.searchBy },
      //   this.showLoading
      // );
    },
    SetSelectedFilter(type) {
      this.searchBy = type;
    },
    GetUpdateLead(){

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
    // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
    // } else {
    //   this.show_error('Not Allowed to access this page')
    //   this.$router.push('/')
    // }
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
