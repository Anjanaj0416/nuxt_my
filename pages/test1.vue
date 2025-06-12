<template>
  <section class="flex items-center justify-center min-h-screen px-4 bg-gray-100">
    <div class="flex flex-col items-center w-full max-w-5xl overflow-hidden my-4 bg-white shadow-2xl rounded-3xl md:flex-row">
      <div class="w-full p-10 bg-white">
        <!-- Image Above the Heading -->
        <div class="flex flex-col items-center mb-6 text-center">
        <img src="https://prep.btob.lk/assets/Logo-83eaeda6.png" alt="B2B.lk Logo" class="w-36 h-24 mb-4" />
        <h3 class="text-3xl font-bold text-gray-900">Vendor Admin Access Registration</h3>
        <p class="mt-3 text-gray-700 max-w-2xl">
            As part of your onboarding to the <span class="font-semibold text-textColor">B2B.lk marketplace</span>, please provide details of <span class="font-semibold">two personnel</span> from your team who will be granted backend access. One will be assigned <span class="font-semibold text-textColor">Super Admin</span> privileges.
        </p>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm w-full max-w-3xl mx-auto">
        <h4 class="text-xl font-semibold text-gray-800 mb-3">Important Guidelines</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>Choose individuals with basic computer literacy for smoother system use.</li>
            <li><span class="font-medium text-gray-900">Assign the Super Admin role</span> to the business owner or a senior decision-maker.</li>
            <li>These users will manage your <span class="italic">products, orders, and account information</span> on the platform.</li>
            <li>Submit this form along with your Proforma Invoice confirmation.</li>
            <li>For any queries, contact us <span class="text-textColor font-medium">011 222 3 222</span>.</li>
        </ul>
        </div>


        <h3 class="mt-12 text-gray-600 font-bold">Super Admin Details <span class="text-sm text-gray-500">(Recommended: Business Owner)</span></h3>
        <hr class="mb-4" />
        <div class="grid grid-cols-2 gap-4 mt-4 mb-4 sm:grid-cols-2 md:grid-cols-2">
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Full Name</label>
                <input
                    type="text"
                    placeholder="Enter Full Name"
                    required
                    class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Designation</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter Designation"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Email</label>
                <div class="relative">
                <input
                    type="email"
                    placeholder="Enter Email"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Mobile Number</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">National ID / Passport Number</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter National ID / Passport Numbe"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Preferred Username (for login)</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter Preferred Username"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
        </div>
        <h3 class="mt-12 text-gray-600 font-bold"> Additional Admin User Details</h3>
        <hr class="mb-4" />
        <div class="grid grid-cols-2 gap-4 mt-4 mb-4 sm:grid-cols-2 md:grid-cols-2">
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Full Name</label>
                <input
                type="email"
                placeholder="Enter Full Name"
                required
                class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
            </div>

            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Designation</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter Designation"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Email</label>
                <div class="relative">
                <input
                    type="email"
                    placeholder="Enter Email"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Mobile Number</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">National ID / Passport Number</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter National ID / Passport Numbe"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-500">Preferred Username (for login)</label>
                <div class="relative">
                <input
                    type="text"
                    placeholder="Enter Preferred Username"
                    required
                    class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <button type="button" class="absolute inset-y-0 flex items-center text-black right-3">
                </button>
                </div>
            </div>
        </div>

        <button
            type="submit"
            class="w-full py-2 text-white transition bg-purple-700  rounded-xl hover:bg-purple-800"
        >
            Submit
        </button>

      
    </div>
    </div>
  </section>
</template>

  
  <script setup>
  import { ref } from "vue";






</script>

<script>
definePageMeta({
  layout: 'b2b',
});

export default {
  data() {
    return {
      imageroot: process.env.Assets_83,
    };
  },
  async mounted() {
     
  },

    async created() {
      //this.sampleStore = useSampleStore();
    },
    watch: {},
    computed: {
      // ...mapState({
      //   //loggeduser: (state) => state.loggeduser,
      // }),
    },
    methods: {},
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      };
    },
};
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
