<template>
  <div>
    <div class="flex items-center justify-between mt-4" v-if="!isEditMode">
      <h1 class="text-2xl font-semibold tracking-tight text-gray-700 sm:text-3xl">Vendor</h1>
      <button
        class="px-3 py-1 text-sm font-semibold text-blue-900 transition duration-300 ease-in-out border-2 border-blue-800 rounded-lg hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none md:px-4 md:py-2 md:text-base"
        aria-label="Edit vendor"
        @click="toggleEditMode"
      >
        Edit Vendor
      </button>
    </div>
<hr>
    <div class="min-h-screen mt-8" v-if="!isEditMode">
      <!-- Vendor Information Section -->
      <div>
        <h2 class="mb-2 text-lg font-semibold text-gray-700">Vendor Information</h2>
        <hr>
        <div class="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
          <div v-for="(item, index) in vendorData" :key="'vendor-' + index">
            <label class="text-base font-semibold text-gray-600">{{ item.label }}</label>

            <!-- Display image if it exists -->
            <div v-if="item.imageUrl">
              <img
                src="/assets/img/Logo.png"
                alt="AWS Logo"
                class="w-14"
              />
            </div>

            <p class="text-sm text-gray-500">{{ item.value }}</p>
          </div>
        </div>
      </div>

      <!-- Banner Information Section -->
      <div>
        <h2 class="mt-10 mb-2 text-lg font-semibold text-gray-700">Banner Information</h2>
        <hr>
        <div class="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
          <div v-for="(item, index) in bannerData" :key="'banner-' + index">
            <label class="text-base font-semibold text-gray-600">{{ item.label }}</label>
            
            <!-- Display image if it exists -->
            <div v-if="item.imageUrl">
              <img
                src="/assets/img/banner.jpg"
                alt="AWS Logo"
                class="w-26"
              />
            </div>

            <p class="text-sm text-gray-500">{{ item.value }}</p>
          </div>
        </div>
      </div>


      <!-- Personal Information Section -->
      <div>
        <h2 class="mt-10 mb-2 text-lg font-semibold text-gray-700">Personal Information</h2>
        <hr>
        <div class="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
          <div v-for="(item, index) in personalData" :key="'personal-' + index">
            <label class="text-base font-semibold text-gray-600">{{ item.label }}</label>
            <p class="text-sm text-gray-500">{{ item.value }}</p>
          </div>
        </div>
      </div>

      <!-- Bank Information Section -->
      <div>
        <h2 class="mt-10 mb-2 text-lg font-semibold text-gray-700">Bank Information</h2>
        <hr>
        <div class="grid grid-cols-1 gap-4 mt-3 md:grid-cols-3">
          <div v-for="(item, index) in bankData" :key="'bank-' + index">
            <label class="text-base font-semibold text-gray-600">{{ item.label }}</label>
            <p class="text-sm text-gray-500">{{ item.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Conditional rendering for edit mode -->
    <edit-vender v-else @cancel-view="$emit('cancel-view')" />
  </div>
</template>

<script>
import EditVender from '~/pages/vendor/editvendor.vue'; 

export default {
  components: {
    EditVender
  },
  data() {
    return {
      isEditMode: false,
      vendorData: [
        { label: 'Vendor Name', value: 'ABC' },
        { label: 'Address Line 1', value: '3355/4, Rajagiriya' },
        { label: 'Address Line 2', value: 'Colombo' },
        { label: 'City', value: 'Colombo' },
        { label: 'District', value: 'ABC' },
        { label: 'Email', value: 'abc@gmail.com' },
        { label: 'Contact Number', value: '071487526' },
        { label: 'Whatsapp Number', value: '071587426' },
        { label: 'Company Logo', imageUrl: 'true', alt: 'banner1' }
      ],
      bannerData: [
        { label: 'Banner 1', imageUrl: 'true', alt: 'banner1' },
        { label: 'Banner 2', imageUrl: 'true', alt: 'banner2'},
        { label: 'Description', value: 'text' }
      ],
      personalData: [
        { label: 'Contact Person Name', value: 'Perera' },
        { label: 'Contact Person Mobile', value: '074158769' },
        { label: 'Owner First Name', value: 'Nimal' },
        { label: 'Owner Contact', value: '072587459' },
        { label: 'Owner Birth Date', value: '1988.05.28' }
      ],
      bankData: [
        { label: 'Bank Name', value: 'ABC Bank' },
        { label: 'Bank Branch', value: 'Kottawa' },
        { label: 'Bank Branch Code', value: 'ABC12345' },
        { label: 'Bank Account No', value: '58741269' },
        { label: 'Bank Swift Code', value: 'ABC12345' },
        { label: 'Sales officer No', value: 'rso21' }
      ]
    };
  },
  methods: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode; // Toggle edit mode
    }
  }
};
</script>

<style scoped>
.csscmd {
  @apply p-2 bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}
.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
.btn {
  background-color: #072556;
}
</style>
