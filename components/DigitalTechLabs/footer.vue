

<template>
    <footer class="p-4 mt-12 bg-white sm:p-6 ">
        <div class="max-w-screen-xl mx-auto">
            <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="/" class="flex items-center">
                <img
                    src="/assets/img/digitalTechLabs/DigitalTechLabsLogo.jpg"
                    alt="Digital Tech Labs Logo"
                    class="w-40 px-2 rounded-full"
                />
                </a>
                <p class="mt-4 text-sm text-gray-600  max-w-sm">
                Digital TechLabs is a forward-thinking tech company providing innovative digital products and business solutions to help you succeed in a rapidly evolving digital world.
                </p>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Products</h2>
                <ul class="text-gray-600">
                    <li class="mb-4">
                   <a href="https://prep.btob.lk" target="_blank" class="hover:underline">B2B.lk</a>
                    </li>
                    <li>
                    <!-- <a href="" class="hover:underline">Automobile.lk</a> -->
                    </li>
                </ul>
                </div>
                <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Company</h2>
                <ul class="text-gray-600 ">
                    <li class="mb-4">
                    <a href="/aboutUs" class="hover:underline">About Us</a>
                    </li>
                    <li>
                    <a href="/contact" class="hover:underline">Contact</a>
                    </li>
                </ul>
                </div>
                <div>
                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase ">Legal</h2>
                <ul class="text-gray-600 ">
                    <li class="mb-4">
                    <a href="/privacy-policy" class="hover:underline">Privacy Policy</a>
                    </li>
                    <li>
                    <a href="/terms" class="hover:underline">Terms & Conditions</a>
                    </li>
                </ul>
                </div>
            </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center">
                © 2025 <a href="/" class="hover:underline">Digital TechLabs™</a>. All rights reserved.
            </span>
            <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                <!-- Existing social icons remain unchanged -->
                <!-- Add links to your actual social media profiles -->
                <!-- Facebook / Instagram / LinkedIn / etc. -->
            </div>
            </div>
        </div>
    </footer>
</template>
  
<script>
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    },
    watch: {},
    computed: {
  
    },
    methods: {
     
     
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
  // 	 
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
  
  
  