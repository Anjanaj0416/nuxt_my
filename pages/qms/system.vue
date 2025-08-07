<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80">
    <div class="text-2xl uppercase">System Data</div>
    <hr />

    <!-- QMS System Data -->
    <div class="cssPackages" v-if="sectionId == 801">
      <p class="text-lg">Package Details</p>
      <!-- dd  {{ userStore.assetsBaseUrl }}-->
      <!-- {{ quotationStore.initPackageDetails }}  -->

      <!-- Product Links -->
      <div>
        <p class="underline">Product Links</p>
        <p>
          Click here to view existing Product Links details -
          <a
            :href="
              userStore.assetsBaseUrl +
              quotationStore.initPackageDetails.productLinksFileUrl
            "
            class="text-blue-600"
            target="_blank"
            >Download</a
          >
        </p>

        <fileuploader
          v-model="fileProductLinks"
          caption="Attach Product Links Details"
          @FileChanged="GetFileChangedProductLinks"
          ref="refFile"
        />
        <Button
          class="w-16 h-8"
          label="Upload"
          variant="primary"
          @click="GetUploadProductLinks"
        />
      </div>

      <!-- Service Links -->
      <div>
        <p class="underline">Service Links</p>
        <p>
          Click here to view existing Service Links details -
          <a
            :href="
              userStore.assetsBaseUrl +
              quotationStore.initPackageDetails.serviceLinksFileUrl
            "
            class="text-blue-600"
            target="_blank"
            >Download</a
          >
        </p>

        <fileuploader
          v-model="fileServiceLinks"
          caption="Attach Service Links Details"
          @FileChanged="GetFileChangedServiceLinks"
          ref="refFile"
        />
        <Button
          class="w-16 h-8"
          label="Upload"
          variant="primary"
          @click="GetUploadServiceLinks"
        />
      </div>
      <!-- <div> -->
        <!-- Hybrid Links -->
        <!-- <p class="underline">Hybrid Links</p>
        <p>
          Click here to view existing HybridLinks details -
          <a
            :href="
              userStore.assetsBaseUrl +
              quotationStore.initPackageDetails.hybridLinksFileUrl
            "
            class="text-blue-600"
            target="_blank"
            >Download</a
          >
        </p>

        <fileuploader
          v-model="fileHybridLinks"
          caption="Attach Hybrid Links Details"
          @FileChanged="GetFileChangedHybridLinks"
          ref="refFile"
        />
        <Button
          class="w-16 h-8"
          label="Upload"
          variant="primary"
          @click="GetUploadHybridLinks"
        />
      </div> -->
      <div>
        <!-- Bundle Links -->
        <p class="underline">Bundle Links</p>
        <p>
          Click here to view existing Bundle Links details -
          <a
            :href="
              userStore.assetsBaseUrl +
              quotationStore.initPackageDetails.bundleLinksFileUrl
            "
            class="text-blue-600"
            target="_blank"
            >Download</a
          >
        </p>

        <fileuploader
          v-model="fileBundleLinks"
          caption="Attach Bundle Links Details"
          @FileChanged="GetFileChangedBundleLinks"
          ref="refFile"
          fileType=".xlsx"
        />
        <Button
          class="w-16 h-8"
          label="Upload"
          variant="primary"
          @click="GetUploadBundleLinks"
        />
      </div>
    </div>

    <div class="cssCities" v-if="sectionId == 802">Add New Cities</div>
    <!-- End QMS System Data -->
  </section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
//// import * as Global from '@/assets/js/Global'
////import * as myfilter from '@/plugins/myfilter'
//import Swal from 'sweetalert2';
//import { useSampleStore  } from '~/stores/modules/sampleStore';
import fileuploader from "~/components/customcontrol/fileupload";
import Button from "~/components/customcontrol/Button";

import { useUserStore } from "~/stores/modules/userStore";
import { useQuotationStore } from "~/stores/modules/qms/quotationStore";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: { fileuploader, Button },
  props: [""],
  data() {
    return {
      sectionId: -1,
      fileroot: "",
      fileProductLinks: "",
      fileServiceLinks: "",
      fileHybridLinks: "",
      fileBundleLinks: "",
      showLoading: null,
    };
  },
  async mounted() {},
  async created() {
    this.showLoading = this.$showLoading;
    this.userStore = useUserStore();
    this.quotationStore = useQuotationStore();
    await this.quotationStore.loadInitPackages(this.showLoading);

    this.fileroot = this.userStore.loggedUser.resourceURLRoot;

    const route = useRoute();
    this.sectionId = route.query.ps;
  },
  watch: {},
  computed: {
    // ...mapState({
    //   //loggeduser: (state) => state.loggeduser,
    // }),
  },
  methods: {
    GetFileChangedProductLinks(fileProductLinks) {
      this.fileProductLinks = fileProductLinks;
    },
    GetFileChangedServiceLinks(fileServiceLinks) {
      this.fileServiceLinks = fileServiceLinks;
    },
    GetFileChangedHybridLinks(fileHybridLinks) {
      this.fileHybridLinks = fileHybridLinks;
    },
    GetFileChangedBundleLinks(fileBundleLinks) {
      this.fileBundleinks = fileBundleLinks;
    },

    async GetUploadProductLinks() {
      if (!this.fileProductLinks) {
        this.$showCustomToast(
          "Please attach the ProductLinks file",
          "success",
          3000
        );
        return;
      }

      this.$showConfirm(
        "Are you sure you want to update productlinks details?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("fileProductLinks", this.fileProductLinks);
          await this.quotationStore.GetUploadProductLinks(
            formData,
            this.showLoading
          );
        } else {
          console.log("Action canceled");
        }
      });
    },

    async GetUploadServiceLinks() {
      if (!this.fileServiceLinks) {
        this.$showCustomToast(
          "Please attach the ServiceLinks file",
          "success",
          3000
        );
        return;
      }

      this.$showConfirm(
        "Are you sure you want to update ServiceLinks details?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("fileServiceLinks", this.fileServiceLinks);
          await this.quotationStore.GetUploadServiceLinks(
            formData,
            this.showLoading
          );
        } else {
          console.log("Action canceled");
        }
      });
    },

    async GetUploadHybridLinks() {
      if (!this.fileHybridLinks) {
        this.$showCustomToast(
          "Please attach the HybridLinks file",
          "success",
          3000
        );
        return;
      }
      this.$showConfirm(
        "Are you sure you want to update HybridLinks details?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("fileHybridLinks", this.fileHybridLinks);
          await this.quotationStore.GetUploadHybridLinks(
            formData,
            this.showLoading
          );
        } else {
          console.log("Action canceled");
        }
      });
    },

    async GetUploadBundleLinks() {
      if (!this.fileBundleLinks) {
        this.$showCustomToast(
          "Please attach the BundleLinks file",
          "success",
          3000
        );
        return;
      }

      this.$showConfirm(
        "Are you sure you want to update BundleLinks details?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("fileBundleLinks", this.fileBundleLinks);
          await this.quotationStore.GetUploadBundleLinks(
            formData,
            this.showLoading
          );
        } else {
          console.log("Action canceled");
        }
      });
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

.cssPackages > div {
  @apply border-2 border-gray-400  my-4 p-2 rounded-lg;
}
</style>
