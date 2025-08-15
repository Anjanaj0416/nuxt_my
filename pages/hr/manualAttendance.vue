<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
      <div class="text-2xl uppercase">Manual Employee Attendance</div>
      <div class=" shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
    {{ hrStore.alempdetails }}

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-bold text-gray-600">Employee</label>
            <div class="relative">
              <select 
                v-model="selectedEmployee"
                required
                class="w-60 p-2 mt-2 text-sm border text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-900"
                >
                <option value="">Select an Employee</option>
                <option value="dev">Dev</option>
                <option value="D1001">D1001</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-600">Date</label>
            <div class="relative">
            <input
              v-model="selectedDate"
              type="date"
              class="w-40 p-1.5 text-base text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-600">In Time</label>
            <div class="relative">
            <input
              v-model="selectedInTime"
              type="time"
              class="w-40 p-1.5 text-base text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-600">Out Time</label>
            <div class="relative">
            <input
              v-model="selectedOutTime"
              type="time"
              class="w-40 p-1.5 text-base text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            </div>
          </div>
        </div>
        <div class="">
          <button type="button" @click="manualAdd" class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2">
            Save
          </button>
        </div>
      </div>


      <!-- <div class="bg-white p-6 rounded shadow border mt-6">
        <h2 class="text-lg font-semibold mb-4">Attendance</h2>
        <ul class="space-y-4 text-gray-800 text-sm">
            <li v-if="selectedEmployee">Employee: <strong>{{ selectedEmployee }}</strong></li>
            <li v-if="selectedTimeType && selectedTimeValue">
                Selected Time: <strong>{{ selectedTimeType }} - {{ selectedTimeValue }}</strong>
            </li>
            <li v-if="!selectedEmployee || !selectedTimeType" class="text-gray-400 italic">
            Please select employee and time.
            </li>
        </ul>
      </div> -->



    </section>
</template>


  
  <script>

 import { useUserStore } from "~/stores/modules/userStore";
import { useHrStore } from "~/stores/modules/hrStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import SearchInput from '~/components/customcontrol/SearchInput.vue';

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {
      LinkBtn,
      Button,
      selectinput2,
      SearchInput
    },
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        selectedEmployee: '',  
        selectedDate: '',  
        selectedInTime: '',     
        selectedOutTime: ''
      }
    },
    async mounted() {
     
    },
    async created() {
      this.hrStore = useHrStore();
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    },
    watch: {
        selectedTimeType(newVal) {
            if (newVal) {
            const now = new Date();
            this.selectedTimeValue = now.toLocaleTimeString(); // set time
            } else {
            this.selectedTimeValue = '';
            }
        }
    },
    computed: {
        
    },
    methods: {

      async manualAdd() {
        this.$showConfirm("Sure to apply this manual attendance?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            const req = {
              empNo: this.selectedEmployee,
              date: this.selectedDate,
              inTime: this.selectedInTime,
              outTime: this.selectedOutTime,
              dayType: -1,
            };
            await this.hrStore.setManualAttendenceRecord(req, this.$showLoading);

            await this.cleaAll();
            }
        });

        
      },

      async cleaAll(){
        this.selectedEmployee = null;
        this.selectedDate = null;
        this.selectedInTime = null;
        this.selectedOutTime = null;
      }
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
  </style>
  
  
  