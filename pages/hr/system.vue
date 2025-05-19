<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80">
    <div class="text-2xl uppercase">System Data</div>
    <hr />

    <!-- HR System Data -->
    <div class="cssHREmployees my-2">
      <p class="text-lg">HR System Details</p>

      <div class="my-2" v-if="sectionId == 701">
        <p class="underline">Upload Employee Details</p>

        <!-- {{ hrStore.initHRDetails }} -->
        <p>
          Click here to view existing employee details -
          <a
            :href="
              userStore.assetsBaseUrl +
              hrStore.initHRDetails.urlEmployeeDetailsXlsx
            "
            class="text-blue-600"
            target="_blank"
            >Download</a
          >
        </p>

        <fileuploader
          v-model="fileEmployeeDetails"
          caption="Attach Employee Details file"
          @FileChanged="GetFileChangedEmployeeDetails"
          fileType=".xlsx"
          ref="refFile"
        />
        <Button
          class="w-16 h-8"
          label="Upload"
          variant="primary"
          @click="GetUploadEmployeeDetails"
        />
      </div>
    </div>
    <!-- End HR System Data -->
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

import { useHrStore } from "~/stores/modules/hrStore";
import { useUserStore } from "~/stores/modules/userStore";

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
      fileEmployeeDetails: "",

      showLoading: null,
    };
  },
  async mounted() {},
  async created() {
    this.showLoading = this.$showLoading;
    this.userStore = useUserStore();

    this.hrStore = useHrStore();
    await this.hrStore.loadInitHRDetails(this.showLoading);

    this.fileroot = this.userStore.loggedUser.resourceURLRoot;

    const route = useRoute();
    this.sectionId = route.query.ps;
  },
  watch: {},
  computed: {},
  methods: {
    GetFileChangedEmployeeDetails(file) {
      this.fileEmployeeDetails = file;
    },

    GetUploadEmployeeDetails() {
      if (!this.fileEmployeeDetails) {
        this.$showCustomToast(
          "Please attach the Employee Details file",
          "success",
          3000
        );
        return;
      }

      this.$showConfirm(
        "Are you sure you want to update employee details?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {
          
          const formData = new FormData();
          formData.append("fileEmployee", this.fileEmployeeDetails);
          await this.hrStore.GetUpdateEmployeeDetails(
            formData,
            this.showLoading
          );
        } else {
           
          console.log("Action canceled");
        }
      });
    },
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

.cssHREmployees > div {
  @apply border-2 border-gray-400  my-4 p-2 rounded-lg;
}
</style>
