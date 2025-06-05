<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
<section class="p-4 mt-20 max-w-2xl mx-auto">
  <h2 class="text-xl font-bold mb-4 ">Document Register</h2>
  <TreeView :items="treeData" />
</section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
//import textInput from '~/components/customcontrol/textinput'
//// import * as Global from '@/assets/js/Global'
////import * as myfilter from '@/plugins/myfilter'
//import Swal from 'sweetalert2';
//import { useSampleStore  } from '~/stores/modules/sampleStore';
//import { useUserStore } from "~/stores/modules/userStore";
//import { useQuotationStore } from "~/stores/modules/qms/quotationStore";

import TreeView from "~/components/customcontrol/TreeView.vue";
import LinkBtn from "~/components/customcontrol/Link";
import Button from "~/components/customcontrol/Button";
import selectinput2 from "~/components/customcontrol/selectinput2";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: { LinkBtn, Button, selectinput2,TreeView},
  props: [""],
  data() {
    return {
      imageroot: "",
      // showLoading: null,
      treeData: [
            {
                "id": 1,
                "name": "documentregistry",
                "url": "#",
                "_open": true,
                "children": [
                    {
                        "id": 1,
                        "name": "Admin",
                        "url": "#",
                        "_open": false,
                        "children": [
                            {
                                "id": 1,
                                "name": "Test",
                                "url": "#",
                                "_open": false,
                                "children": [
                                    {
                                        "id": 2,
                                        "name": "Test",
                                        "url": "https://assets.dtl.lk/DTL/documentregistry/Admin/Test/Test.txt",
                                        "_open": false
                                    }
                                ]
                            },
                            {
                                "id": 1,
                                "name": "Test1",
                                "url": "#",
                                "_open": false,
                                "children": [
                                    {
                                        "id": 1,
                                        "name": "Test3",
                                        "url": "#",
                                        "_open": false,
                                        "children": [
                                            {
                                                "id": 2,
                                                "name": "Test3",
                                                "url": "https://assets.dtl.lk/DTL/documentregistry/Admin/Test1/Test3/Test3.txt",
                                                "_open": false
                                            }
                                        ]
                                    },
                                    {
                                        "id": 2,
                                        "name": "Test1",
                                        "url": "https://assets.dtl.lk/DTL/documentregistry/Admin/Test1/Test1.txt",
                                        "_open": false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "Finance",
                        "url": "#",
                        "_open": false,
                        "children": [
                            {
                                "id": 2,
                                "name": "petty cash memo-1",
                                "url": "https://assets.dtl.lk/web/assets/DTL/documentregistry/Finance/pettycashmemo-1.pdf",
                                "_open": false
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "HR",
                        "url": "#",
                        "_open": false,
                        "children": []
                    },
                    {
                        "id": 1,
                        "name": "IT",
                        "url": "#",
                        "_open": false,
                        "children": [
                            {
                                "id": 1,
                                "name": "B2B",
                                "url": "#",
                                "_open": false,
                                "children": [
                                    {
                                        "id": 2,
                                        "name": "Customer User Guide",
                                        "url": "https://assets.dtl.lk/DTL/documentregistry/IT/B2B/Customer User Guide.docx",
                                        "_open": false
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "name": "Email setup",
                                "url": "https://assets.dtl.lk/DTL/documentregistry/IT/Email setup.pdf",
                                "_open": false
                            },
                            {
                                "id": 3,
                                "name": "Email Signature setup",
                                "url": "https://assets.dtl.lk/DTL/documentregistry/IT/Email Signature setup.docx",
                                "_open": false
                            },
                            {
                                "id": 4,
                                "name": "Process Flow Updated",
                                "url": "https://assets.dtl.lk/DTL/documentregistry/IT/Process Flow Updated.pdf",
                                "_open": false
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "Marketing",
                        "url": "#",
                        "_open": false,
                        "children": []
                    },
                    {
                        "id": 1,
                        "name": "Meeting Minutes",
                        "url": "#",
                        "_open": false,
                        "children": [
                            {
                                "id": 2,
                                "name": "B2b_-_May_21_st_-_Meeting_Minutes",
                                "url": "https://assets.dtl.lk/DTL/documentregistry/Meeting Minutes/B2b_-_May_21_st_-_Meeting_Minutes.docx",
                                "_open": false
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "name": "Sales",
                        "url": "#",
                        "_open": false,
                        "children": [
                            {
                                "id": 2,
                                "name": "petty cash memo-1",
                                "url": "https://assets.dtl.lk/DTL/documentregistry/Sales/petty cash memo-1.pdf",
                                "_open": false
                            }
                        ]
                    }
                ]
            }
        ]
    };
  },

  async mounted() {},
  async created() {
    // this.userStore = useUserStore();
    // this.showLoading = this.$showLoading;
    //  this.imageroot = this.userStore.loggedUser.resourceURLRoot;
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
