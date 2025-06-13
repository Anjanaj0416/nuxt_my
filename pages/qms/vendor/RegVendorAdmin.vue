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
            src="https://prep.btob.lk/assets/Logo-83eaeda6.png"
            alt="B2B.lk Logo"
            class="w-36 h-24 mb-4"
          />
          <h3 class="text-3xl font-bold text-gray-900">
            Vendor Admin Access Registration
          </h3>
          <p class="mt-3 text-gray-700 max-w-2xl">
            As part of your onboarding to the
            <a href="" class="text-textColor font-medium">B2B.lk marketplace</a
            >, please provide details of
            <span class="font-semibold">two personnel</span> from your team who
            will be granted backend access. One will be assigned
            <span class="font-semibold text-textColor">Super Admin</span>
            privileges.
          </p>
        </div>

        <div
          class="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm w-full max-w-3xl mx-auto"
        >
          <h4 class="text-xl font-semibold text-gray-800 mb-3">
            Important Guidelines
          </h4>
          <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Choose individuals with basic computer literacy for smoother
              system use.
            </li>
            <li>
              <span class="font-medium text-gray-900"
                >Assign the Super Admin role</span
              >
              to the business owner or a senior decision-maker.
            </li>
            <li>
              These users will manage your
              <span class="italic"
                >products, orders, and account information</span
              >
              on the platform.
            </li>
            <li>
              Submit this form along with your Proforma Invoice confirmation.
            </li>
            <li>
              For any queries, contact us
              <a
                href="tel:0112223222"
                class="text-textColor font-medium hover:underline"
              >
                011 222 3 222</a
              >.
            </li>
          </ul>
        </div>

        <h3 class="mt-12 text-gray-600 font-bold">
          Super Admin Details
          <span class="text-sm text-gray-500"
            >(Recommended: Business Owner)</span
          >
        </h3>
        <hr class="mb-4" />
        <div
          class="grid grid-cols-2 gap-4 mt-4 mb-4 sm:grid-cols-2 md:grid-cols-2"
        >
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Full Name</label
            >
            <input
              type="text"
              v-model="vendorStore.regVendorAdmin.suAdmin.fullName"
              placeholder="Enter Full Name"
              required
              class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <p v-if="err.suAdminfullName" class="mt-2 text-sm text-red-600">
              {{ err.suAdminfullName }}
            </p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Designation</label
            >
            <div class="relative">
              <input
                type="text"
                v-model="vendorStore.regVendorAdmin.suAdmin.designation"
                placeholder="Enter Designation"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.suAdminDesignation" class="mt-2 text-sm text-red-600">
                {{ err.suAdminDesignation }}
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Email</label
            >
            <div class="relative">
              <input
                type="email"
                placeholder="Enter Email"
                v-model="vendorStore.regVendorAdmin.suAdmin.email"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.suAdminEmail" class="mt-2 text-sm text-red-600">
                {{ err.suAdminEmail }}
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Mobile Number</label
            >
            <div class="relative">
              <input
                type="text"
                placeholder="Enter Mobile Number"
                v-model="vendorStore.regVendorAdmin.suAdmin.mobile"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.suAdminMobile" class="mt-2 text-sm text-red-600">
                {{ err.suAdminMobile }}
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >National ID / Passport Number</label
            >
            <div class="relative">
              <input
                type="text"
                placeholder="Enter National ID / Passport Number"
                v-model="vendorStore.regVendorAdmin.suAdmin.nic"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.suAdminNic" class="mt-2 text-sm text-red-600">
                {{ err.suAdminNic }}
              </p>
            </div>
          </div>
        </div>
        <h3 class="mt-12 text-gray-600 font-bold">
          Additional Admin User Details
        </h3>
        <hr class="mb-4" />
        <div
          class="grid grid-cols-2 gap-4 mt-4 mb-4 sm:grid-cols-2 md:grid-cols-2"
        >
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Full Name</label
            >
            <input
              type="text"
              v-model="vendorStore.regVendorAdmin.additionalUser.fullName"
              placeholder="Enter Full Name"
              required
              class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <p v-if="err.additionalFullName" class="mt-2 text-sm text-red-600">
              {{ err.additionalFullName }}
            </p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Designation</label
            >
            <div class="relative">
              <input
                type="text"
                v-model="vendorStore.regVendorAdmin.additionalUser.designation"
                placeholder="Enter Designation"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.additionalDesignation" class="mt-2 text-sm text-red-600">
                {{ err.additionalDesignation }}
            </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Email</label
            >
            <div class="relative">
              <input
                type="email"
                v-model="vendorStore.regVendorAdmin.additionalUser.email"
                placeholder="Enter Email"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.additionalEmail" class="mt-2 text-sm text-red-600">
                {{ err.additionalEmail }}
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >Mobile Number</label
            >
            <div class="relative">
              <input
                type="text"
                placeholder="Enter Mobile Number"
                v-model="vendorStore.regVendorAdmin.additionalUser.mobile"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.additionalMobileNumber" class="mt-2 text-sm text-red-600">
                {{ err.additionalMobileNumber }}
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-500"
              >National ID / Passport Number</label
            >
            <div class="relative">
              <input
                type="text"
                v-model="vendorStore.regVendorAdmin.additionalUser.nic"
                placeholder="Enter National ID / Passport Numbe"
                required
                class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <p v-if="err.additionalNic" class="mt-2 text-sm text-red-600">
                {{ err.additionalNic }}
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-2 text-white transition bg-purple-700 rounded-xl hover:bg-purple-800"
          @click="handleSubmit"
        >
          Submit
        </button>
        <!-- {{ userStore.token }} -->
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import { useUserStore } from "~/stores/modules/userStore";
import { useRoute } from 'vue-router'

definePageMeta({
  layout: "b2b",
});

export default {
  data() {
    return {
      imageroot: "",
      showLoading: null,
      vendorId:'',
       secretKey: null,
      token:'',
      isvalidUrl:false,
      err: {
        mobileNumber: "",
      },
    };
  },
  async mounted() {},

  async created() {
    this.vendorStore = useVendorStore();
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;

      const route = useRoute();
     let val  = route.query.p ;
    let arrParam = val.split('.');
  
     this.isvalidUrl = (arrParam.length==2);
    
    if(this.isvalidUrl){
      this.secretKey = arrParam[0];
      this.vendorId = arrParam[1];
    }   
      await this.userStore.AppLogin(this.secretKey, this.showLoading);

  },
  watch: {},
  computed: {},
  methods: {
    async handleSubmit() {
      if (this.IsValidate()) {

        
        // await this.vendorStore.SetVendorAdminDetails(
        //  this.vendorStore.regVendorAdmin,
        //   this.showLoading
        // );
      }
    },

    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },

    IsValidate() {
      this.clearErr();
      let IsValidate = true;

      const suAdmin = this.vendorStore.regVendorAdmin.suAdmin;
      const additionalUser = this.vendorStore.regVendorAdmin.additionalUser;

      if (!suAdmin.fullName) {
        this.err.suAdminfullName = "Please Enter Super Admin Full Name!";
        IsValidate = false;
      }

      if (!suAdmin.designation) {
        this.err.suAdminDesignation = "Please Enter Super Admin Designation!";
        IsValidate = false;
      }

      if (!suAdmin.email) {
        this.err.suAdminEmail = "Please Enter Super Admin Email!";
        IsValidate = false;
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(suAdmin.email)) {
          this.err.suAdminEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!suAdmin.mobile) {
        this.err.suAdminMobile = "Please Enter Super Admin Mobile!";
        IsValidate = false;
      } else {
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(suAdmin.mobile)) {
          this.err.suAdminMobile = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      if (!suAdmin.nic) {
        this.err.suAdminNic = "Please Enter Super Admin National ID / Passport Number!";
        IsValidate = false;
      }

      if (!additionalUser.fullName) {
        this.err.additionalFullName = "Please Enter Additional Admin Full Name!";
        IsValidate = false;
      }

      if (!additionalUser.designation) {
        this.err.additionalDesignation = "Please Enter Designation!";
        IsValidate = false;
      }

      if (!additionalUser.email) {
        this.err.additionalEmail = "Please Enter Additional Admin Email!";
        IsValidate = false;
      } else {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(additionalUser.email)) {
          this.err.additionalEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!additionalUser.mobile) {
        this.err.additionalMobileNumber = "Please Enter Additional Admin Mobile!";
        IsValidate = false;
      } else {
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(additionalUser.mobile)) {
          this.err.additionalMobileNumber = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      // Additional Admin NIC
      if (!additionalUser.nic) {
        this.err.additionalNic = "Please Enter Additional Admin National ID / Passport Number!";
        IsValidate = false;
      }

      // Add other validations here...

      return IsValidate;
    },

  },
  head() {
    return {
      title: "Intranet - Digital Tech Labs",
    };
  },
};
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
