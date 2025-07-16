<template>
    <section
    class="flex items-center justify-center min-h-screen px-4 bg-gray-100"
  >
    <div
      class="flex flex-col items-center w-full max-w-5xl overflow-hidden my-4 bg-white shadow-2xl rounded-3xl md:flex-row"
    >
      <div class="w-full p-10 bg-white">
        <!-- Image Above the Heading -->
        <div class="flex flex-col items-center mb-6 text-center">
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
        <div
          class="grid grid-cols-2 gap-4 mt-12 mb-4 sm:grid-cols-2 md:grid-cols-2">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500">Company Name</label>
            <input
              type="text"
              v-model="curLead.companyName" 
              placeholder="Enter company name"
              required
              class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <p v-if="err.companyName" class="mt-2 text-sm text-red-600">
                {{ err.companyName }}
              </p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500">Address</label>
            <div class="relative">
              <input
                type="text"
                v-model="curLead.address"
                placeholder="Enter address"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.Address" class="mt-2 text-sm text-red-600">
                {{ err.Address }}
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500">Contact Number</label>
            <div class="relative">
              <div class="flex items-center w-full max-w-md border border-gray-300 rounded-lg overflow-hidden">
                <!-- Country Code Dropdown with Flag -->
                <div class="flex items-center bg-gray-100 px-2">
                  <select
                    v-model="selectedCountryCode"
                    class="bg-gray-100 text-sm focus:outline-none pr-2 pl-1 py-2"
                  >
                    <option
                      v-for="country in countries"
                      :key="country.code"
                      :value="country.code"
                    >
                      {{ country.code }} - {{ country.name }} 
                    </option>
                  </select>
                  <!-- Flag Image -->
                  <img
                    :src="selectedFlagUrl"
                    alt="flag"
                    class="w-6 h-4 ml-1"
                  />
                </div>

                <!-- Phone Number Input -->
                <input
                  type="text"
                  placeholder="Enter phone number"
                  v-model="curLead.CompanyPhoneNumber"
                  :maxlength="phoneMaxLength"
                  class="flex-1 px-4 py-2 text-sm focus:outline-none"
                />
              </div>
              <p v-if="err.CompanyPhoneNumber" class="mt-2 text-sm text-red-600">
                {{ err.CompanyPhoneNumber }}
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500">Contact Person Number</label>

            <div class="relative">
              <div class="flex items-center w-full max-w-md border border-gray-300 rounded-lg overflow-hidden">
                <!-- Country Code Dropdown with Flag -->
                <div class="flex items-center bg-gray-100 px-2">
                  <select
                    v-model="selectedCountryCodeContactPerson"
                    class="bg-gray-100 text-sm focus:outline-none pr-2 pl-1 py-2"
                  >
                    <option
                      v-for="country in countries"
                      :key="country.code"
                      :value="country.code"
                    >
                      {{ country.code }} - {{ country.name }} 
                    </option>
                  </select>
                  <!-- Flag Image -->
                  <img
                    :src="selectedFlagUrlContactPerson"
                    alt="flag"
                    class="w-6 h-4 ml-1"
                  />
                </div>

                <!-- Phone Number Input -->
                <input
                  type="text"
                  placeholder="Enter phone number"
                  v-model="curLead.contactPhoneNo"
                  :maxlength="contactMaxLength"
                  class="flex-1 px-4 py-2 text-sm focus:outline-none"
                />
              </div>
              <p v-if="err.contactPhoneNo" class="mt-2 text-sm text-red-600">
                {{ err.contactPhoneNo }}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-2 text-white transition bg-purple-700 rounded-xl hover:bg-purple-800"
          @click="SetVendorLead()"
        >
          Submit
        </button>
      </div>
    </div>
  </section>

</template>
  
<script>
  // import { useDtlStore } from "~/stores/modules/dtlStore";
// import { useAuthStore } from '~/stores/modules/authStore';

  definePageMeta({
    layout: 'contactus',
  });

  export default {
      data() {
        return {
            selectedCountryCode: '+94',
            selectedFlagUrl: 'https://flagcdn.com/w40/lk.png',
            selectedCountryCodeContactPerson: '+94' ,
            selectedFlagUrlContactPerson: 'https://flagcdn.com/w40/lk.png',
            isDropdownOpen: false,
            curLead: {
                companyName: "",
                address: "",
                CompanyPhoneNumber: "",
                contactPhoneNo: "",
                medium:'',
            },
            err: {
                companyName: "",
                Address: "",
                CompanyPhoneNumber: "",
                ContactPhoneNo: "",
            },
            countries: [
              { name: 'USA', code: '+1', flagUrl: 'https://flagcdn.com/w40/us.png' },
              { name: 'UK', code: '+44', flagUrl: 'https://flagcdn.com/w40/gb.png' },
              { name: 'Canada', code: '+1', flagUrl: 'https://flagcdn.com/w40/ca.png' },
              { name: 'Italy', code: '+39', flagUrl: 'https://flagcdn.com/w40/it.png' },
              { name: 'Australia', code: '+61', flagUrl: 'https://flagcdn.com/w40/au.png' },
              { name: 'Sri Lanka', code: '+94', flagUrl: 'https://flagcdn.com/w40/lk.png' , maxlength:'9' },
              { name: 'India', code: '+91', flagUrl: 'https://flagcdn.com/w40/in.png' },
              { name: 'Pakistan', code: '+92', flagUrl: 'https://flagcdn.com/w40/pk.png' },
              { name: 'Bangladesh', code: '+880', flagUrl: 'https://flagcdn.com/w40/bd.png' },
              { name: 'Nepal', code: '+977', flagUrl: 'https://flagcdn.com/w40/np.png' },
              { name: 'Maldives', code: '+960', flagUrl: 'https://flagcdn.com/w40/mv.png' },
              { name: 'Afghanistan', code: '+93', flagUrl: 'https://flagcdn.com/w40/af.png' },
              { name: 'Bhutan', code: '+975', flagUrl: 'https://flagcdn.com/w40/bt.png' },
              { name: 'Thailand', code: '+66', flagUrl: 'https://flagcdn.com/w40/th.png' },
              { name: 'Malaysia', code: '+60', flagUrl: 'https://flagcdn.com/w40/my.png' },
              { name: 'Singapore', code: '+65', flagUrl: 'https://flagcdn.com/w40/sg.png' },
              { name: 'Indonesia', code: '+62', flagUrl: 'https://flagcdn.com/w40/id.png' },
              { name: 'Vietnam', code: '+84', flagUrl: 'https://flagcdn.com/w40/vn.png' },
              { name: 'Philippines', code: '+63', flagUrl: 'https://flagcdn.com/w40/ph.png' },
              { name: 'China', code: '+86', flagUrl: 'https://flagcdn.com/w40/cn.png' },
              { name: 'Japan', code: '+81', flagUrl: 'https://flagcdn.com/w40/jp.png' },
              { name: 'South Korea', code: '+82', flagUrl: 'https://flagcdn.com/w40/kr.png' },
              { name: 'North Korea', code: '+850', flagUrl: 'https://flagcdn.com/w40/kp.png' },
              { name: 'Myanmar (Burma)', code: '+95', flagUrl: 'https://flagcdn.com/w40/mm.png' },
              { name: 'Cambodia', code: '+855', flagUrl: 'https://flagcdn.com/w40/kh.png' },
              { name: 'Laos', code: '+856', flagUrl: 'https://flagcdn.com/w40/la.png' }
            ],
        };
      },

      async mounted() {

      },

      async created() {
  

      //  await authStore.fetchAppToken(); 
      //http://localhost:3000/VendorRegistration?p=ZmFjZWJvb2s=

        //const encode = btoa('facebook'); //console.log(encode) // "SGVsbG8gV29ybGQ="        
        //const decode = atob(encode);console.log(decode); // "Hello World"
         
        // linkedin - p=bGlua2VkaW4=
        // facebook  - p=ZmFjZWJvb2s=
        // Instagram - p=aW5zdGFncmFt
        // WhatsApp - p=d2hhdHNhcHA=
        // TikTok - p=dGlrdG9r

        const route = useRoute();
        let val = route.query.p;

        if (val !== undefined) {
          this.curLead.medium = atob(val);
          // console.log("Decoded medium:", this.curLead.medium);
          //https://localhost:7237/api/qms/Leads/SetVendorLead
        }

      },

      watch: {},
      computed: {
        selectedFlagUrl() {
          const country = this.countries.find(c => c.code === this.selectedCountryCode);
          return country ? country.flagUrl : '';
        },

        selectedFlagUrlContactPerson() {
          const country = this.countries.find(c => c.code === this.selectedCountryCodeContactPerson);
          return country ? country.flagUrl : '';
        },

        phoneMaxLength() {
          const country = this.countries.find(c => c.code === this.selectedCountryCode);
          return country?.maxlength ? parseInt(country.maxlength) : 50;
        },
        contactMaxLength() {
          const country = this.countries.find(c => c.code === this.selectedCountryCodeContactPerson);
          return country?.maxlength ? parseInt(country.maxlength) : 50;
        }
      },
      methods: {
      SetVendorLead() {
        if (this.IsValidate()) {
          
          const selectedCountry = this.countries.find(c => c.code === this.selectedCountryCode);
          const countryCode = selectedCountry ? selectedCountry.code : '';

          const selectedCountryContactPerson = this.countries.find(c => c.code === this.selectedCountryCodeContactPerson);
          const countryCodeContactPerson = selectedCountryContactPerson ? selectedCountryContactPerson.code : '';

          const list = {
            CompanyName: this.curLead.companyName,
            Address: this.curLead.address,
            CompanyPhone: countryCode + this.curLead.CompanyPhoneNumber,
            ContactPhoneNo: countryCodeContactPerson + this.curLead.contactPhoneNo,
            Medium: this.curLead.medium || "Other",
          };

          this.$showConfirm(
            "Are you sure to Save this Lead?",
            "warning"
          ).then(async (result) => {
            if (result.isConfirmed) {
              console.log(JSON.stringify(list));
              // await this.authStore.SetVendor(list, this.showLoading, this.showAlert);
            } else {
              console.log("Action canceled");
            }
            // this.leadStore.clearCurLead();
            this.resetForm();
            this.clearErr();
          });
        }
      },

        clearErr() {
        Object.keys(this.err).forEach((key) => {
            this.err[key] = "";
        });
        },

        IsValidate() {
          this.clearErr();
          let isValid = true;

          // Dynamically generate regex based on maxlength
          const mobileRegex = new RegExp(`^[0-9]{${this.phoneMaxLength}}$`);
          const contactRegex = new RegExp(`^[0-9]{${this.contactMaxLength}}$`);

          if (!this.curLead.companyName) {
            this.err.companyName = "Please enter the company name!";
            isValid = false;
          }

          if (!this.curLead.address) {
            this.err.Address = "Please enter the address!";
            isValid = false;
          }

          if (!this.curLead.CompanyPhoneNumber) {
            this.err.CompanyPhoneNumber = "Please enter the company contact number!";
            isValid = false;
          } else if (!mobileRegex.test(this.curLead.CompanyPhoneNumber)) {
            this.err.CompanyPhoneNumber = `Please enter a valid ${this.phoneMaxLength}-digit contact number!`;
            isValid = false;
          }

          if (!this.curLead.contactPhoneNo) {
            this.err.contactPhoneNo = "Please enter the contact person number!";
            isValid = false;
          } else if (!contactRegex.test(this.curLead.contactPhoneNo)) {
            this.err.contactPhoneNo = `Please enter a valid ${this.contactMaxLength}-digit mobile number!`;
            isValid = false;
          }

          return isValid;
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
.slide-enter-active, .slide-leave-active {
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
