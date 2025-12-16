<template>
  <section class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div
      class="flex flex-col items-center w-full max-w-5xl overflow-hidden my-4 bg-white shadow-2xl rounded-3xl md:flex-row">
      <div class="w-full p-10 bg-white">
        <!-- Image Above the Heading -->
        <div class="flex flex-col items-center mb-6 text-center">
          <!-- hide Img -->
          <img
            src="/assets/img/b2b/BtoBLogo.png"
            alt="B2B.lk Logo"
            class="w-42 h-24 mb-4"
          />
          <h3 class="text-3xl font-bold text-gray-900">
            Vendor Registration
          </h3>
          <p class="mt-3 text-gray-700 max-w-2xl">
            Welcome to the <span class="font-medium text-textColor">B2B.lk marketplace </span>!  
            To get started, please provide your company details below, including all required information to register as a new vendor.  
            
            </p>
        </div>
        <div class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div class="">
            <label class="block text-[13px] font-bold text-gray-600">
              Company Name
            </label>
            <input type="text" v-model="curLead.CompanyName" placeholder="Enter Company Name" required @input="clearErrorOnInput('CompanyName')"
              class="w-full p-2 mt-1 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            <p v-if="err.CompanyName" class="mt-1 text-sm text-red-600">
              {{ err.CompanyName }}
            </p>
          </div>
          <div class="">
            <label class="block text-[13px] font-bold text-gray-600">
              District 
            </label>
            <div class="relative w-full">
              <serachInput
                v-if="leadStore.InitLeads && leadStore.InitLeads.listDistricts"
                :arr-items="leadStore.InitLeads.listDistricts"
                v-model="curLead.District"
                @selectItem="onDistrictSelect"
              />
            </div>
          </div>
          <!-- <div class="">
            <label class="block text-[13px] font-bold text-gray-600">
              Contact Number
            </label>
            <input type="tel" v-model="curLead.CompanyPhone" placeholder="Enter Company Contact Number" maxlength="10" @input="clearErrorOnInput('CompanyPhone')"
              class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            <p v-if="err.CompanyPhone" class="mt-1 text-sm text-red-600">
              {{ err.CompanyPhone }}
            </p>
          </div>
          <div class="">
            <label class="block text-[13px] font-bold text-gray-600">
              Email
            </label>
            <input type="tel" v-model="curLead.ContactPerson1Email" placeholder="Enter WhatsApp Number" maxlength="10" @input="clearErrorOnInput('ContactPerson1Email')"
              class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
          </div> -->
        </div>
          <div class="grid grid-cols-1 gap-4  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Contact Person Name </label>
              <input type="text" v-model="curLead.ContactPerson1Name"  placeholder="Enter Name" @input="clearErrorOnInput('ContactPerson1Name')"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactPerson1Name" class="mt-1 text-sm text-red-600">
                {{ err.ContactPerson1Name }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Contact Person Designation</label>
              <input type="text" v-model="curLead.ContactPerson1Designation" placeholder="Enter Designation" @input="clearErrorOnInput('ContactPerson1Designation')"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactPerson1Designation" class="mt-1 text-sm text-red-600">
                {{ err.ContactPerson1Designation }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                Contact Person WhatsApp Number <span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="curLead.ContactPerson1WhatsAppNo" placeholder="Enter WhatsApp Number" maxlength="10" @input="clearErrorOnInput('ContactPerson1WhatsAppNo')"
                class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactPerson1WhatsAppNo" class="mt-1 text-sm text-red-600">
                {{ err.ContactPerson1WhatsAppNo }}
              </p>
            </div>
          </div>

     

        <button type="submit" class="w-full mt-4 py-2 text-white transition bg-purple-700 rounded-xl hover:bg-purple-800"
          @click="SetVendorLead()">
          Submit
        </button>
      </div>
    </div>
  </section>

</template>

<script>
import { useLeadStore } from "~/stores/modules/qms/leadStore";
import { useUserStore } from '~/stores/modules/userStore';
import serachInput from "~/components/customcontrol/SearchInput2";



definePageMeta({
  layout: 'contactus',
});

export default {
  components: { serachInput},

  data() {
    return {
      isDropdownOpen: false,
       curLead: {
        id: "00000000-0000-0000-0000-000000000000",
        CompanyName: "",
        Address: "",
        CompanyPhone: "",
        District:"",
        CompanyWhatsAppNo: "",
        ContactPerson1Name: "",
        ContactPerson1Designation: "",
        ContactPerson1Number: "",
        ContactPerson1Email: "",
        ContactPerson1WhatsAppNo: "",
        ContactPerson2Name: "",
        ContactPerson2Designation: "",
        ContactPerson2Number: "",
        ContactPerson2Email: "",
        contactPerson2WhatsAppNo: "",
      },
      err: {
        CompanyName: "",
        Address: "",
        CompanyPhone: "",
        District:"",
        CompanyWhatsAppNo: "",
        ContactPerson1Name: "",
        ContactPerson1Designation: "",
        ContactPerson1Number: "",
        ContactPerson1Email: "",
        ContactPerson1WhatsAppNo: "",
        ContactPerson2Name: "",
        ContactPerson2Designation: "",
        ContactPerson2Number: "",
        ContactPerson2Email: "",
        contactPerson2WhatsAppNo: "",
      },
      showLoading: null,
      showAlert: null,
    };
  },

  async mounted() {

  },

  async created() {
    try {
      const userStore = useUserStore();
      this.leadStore = useLeadStore();
      this.showLoading = this.$showLoading;
      this.showAlert = this.$showAlert;

      const secretCode = 'w5jzxd02';
      const formData = new FormData();
      formData.append('secretCode', secretCode);

      await userStore.AppLogin(formData, this.showLoading);
      await this.leadStore.GetInitLeads(this.showLoading);  

      // const encode = btoa('facebook'); //console.log(encode) // "SGVsbG8gV29ybGQ="        
      // const decode = atob(encode); console.log(decode); // "Hello World"

      // linkedin - p=bGlua2VkaW4=
      // facebook  - p=ZmFjZWJvb2s=
      // Instagram - p=aW5zdGFncmFt
      // WhatsApp - p=d2hhdHNhcHA=
      // TikTok - p=dGlrdG9r

      // <a href="https://dtl.lk/B2BVendorRegistration?p=ZmFjZWJvb2s=">Register via Facebook</a>
      // <a href="https://dtl.lk/B2BVendorRegistration?p=bGlua2VkaW4=">Register via LinkedIn</a>
      // <a href="https://dtl.lk/B2BVendorRegistration?p=aW5zdGFncmFt">Register via Instagram</a>
      // <a href="https://dtl.lk/B2BVendorRegistration?p=d2hhdHNhcHA=">Register via WhatsApp</a>
      // <a href="https://dtl.lk/B2BVendorRegistration?p=dGlrdG9r">Register via TikTok</a>

      // https://dtl.lk/VendorRegistration?p=ZmFjZWJvb2s=
      // https://dtl.lk/VendorRegistration?p=bGlua2VkaW4=
      // https://dtl.lk/VendorRegistration?p=aW5zdGFncmFt
      // https://dtl.lk/VendorRegistration?p=d2hhdHNhcHA=
      // https://dtl.lk/VendorRegistration?p=dGlrdG9r



      const route = useRoute();
      let val = route.query.p;

        if (val) {
          try {
            this.curLead.medium = atob(val);
            console.log("Detected medium:", this.curLead.medium);
          } catch (e) {
            console.warn("Invalid medium encoding");
            this.curLead.medium = "Other";
          }
        } else {
          this.curLead.medium = "Other";
        }

              
      } catch (error) {
        console.error("error:", error);
      }
  },

  watch: {},
  computed: {},
  methods: {
    onDistrictSelect(districtName) {
      this.curLead.District = districtName;
    },

    async SetVendorLead() {

      if (!this.IsValidate()) return;

      this.$showConfirmb2b(
        "Do you check all your information before submitting?",
        "warning"
      ).then(async (result) => {

        if (result.isConfirmed) {

          const payload = {
            id: "00000000-0000-0000-0000-000000000000",
            companyName: this.curLead.CompanyName || "",
            address: this.curLead.Address || "",
            companyPhone: this.curLead.CompanyPhone || "",
            contactPhoneNo: this.curLead.ContactPhoneNo || "",
            companyWhatsAppNo: this.curLead.companyWhatsAppNo || "",
            contactPhoneNo: "",

            contactPerson1Name: this.curLead.ContactPerson1Name || "",
            contactPerson1Designation: this.curLead.ContactPerson1Designation || "",
            contactPerson1Number: this.curLead.ContactPerson1Number || "",
            contactPerson1WhatsAppNo: this.curLead.ContactPerson1WhatsAppNo || "",
            contactPerson1Email: this.curLead.ContactPerson1Email || "",

            contactPerson2Name: this.curLead.ContactPerson2Name || "",
            contactPerson2Designation: this.curLead.ContactPerson2Designation || "",
            contactPerson2Number: this.curLead.ContactPerson2Number || "",
            contactPerson2WhatsAppNo: this.curLead.ContactPerson2WhatsAppNo || "",
            contactPerson2Email: this.curLead.ContactPerson2Email || "",

            District: this.curLead.District,
            medium: this.curLead.medium || "Other",
          };

          // console.log("Vendor Lead Payload:", JSON.stringify(payload, null, 2));
          await this.leadStore.SetVendorLead(payload, this.showLoading);
          this.curLead = {};
          this.resetForm();
          this.clearErr();

        } else {
          console.log("Action canceled");
        }
      });
    },

    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      // if (!this.curLead.CompanyEmail) {
      //   this.err.CompanyEmail = "Please Enter an Email!";
      //   IsValidate = false;
      // } else {
      //   const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      //   if (!EmailRegex.test(this.curLead.CompanyEmail)) {
      //     this.err.CompanyEmail = "Please Enter a valid Email address!";
      //     IsValidate = false;
      //   }
      // }

      if (!this.curLead.CompanyName) {
        this.err.CompanyName = "Please Enter Company Name!";
        IsValidate = false;
      }

      // if (!this.curLead.CompanyPhone) {
      //   this.err.CompanyPhone = "Please Enter Company Phone!";
      //   IsValidate = false;
      // }

      if (!this.curLead.ContactPerson1Name) {
        this.err.ContactPerson1Name = "Please Enter Contact Person Name!";
        IsValidate = false;
      }

      if (!this.curLead.ContactPerson1Designation) {
        this.err.ContactPerson1Designation = "Please Enter Contact Person Designation!";
        IsValidate = false;
      }

      if (!this.curLead.ContactPerson1WhatsAppNo) {
        this.err.ContactPerson1WhatsAppNo = "Please Enter Company Whats App Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.ContactPerson1WhatsAppNo)) {
          this.err.ContactPerson1WhatsAppNo = "Please Enter a valid 10-digit Contact Person Number!";
          IsValidate = false;
        }
      }

      return IsValidate;
    },

    
    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
    },

    resetForm() {
      this.formData = {
        FullName: '',
        Email: '',
        Phone: '',
        WebSite: '',
        Comment: ''
      };
      this.err = {};
    },


    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  },




  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    };
  },
};

// Mobile Menu Toggle
// const menuOpen = ref(false);
// const toggleMenu = () => {
//   menuOpen.value = !menuOpen.value;
// };


</script>

<style scoped>
/* Utility Classes */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.html {
  scroll-behavior: smooth;
}

.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-300 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}

/* Navbar Specific */
nav a {
  @apply px-3 py-2 rounded-lg transition-colors;
}

nav a:hover {
  @apply bg-white text-black;
}
</style>
