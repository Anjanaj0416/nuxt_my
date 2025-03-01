<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Vendor Details - View More..</h2>
        <!-- <button @click="closeModal" class="absolute z-50 p-2 text-white rounded-md close-button">&times;</button> -->
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
            <!-- Start Company Details -->
          <!-- {{ curVendor }} -->

          <div>
            <h3 class="mb-4 text-xl font-bold">Company Details</h3>
            <div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
              <div v-for="(field, index) in vendorFields" :key="index">
                <label class="block text-sm font-medium text-gray-600">{{ field.label }}</label>
                <template v-if="field.key !== 'vendorImage' && field.key !== 'shopLogo' && field.key !== 'shopCoverImage' && field.key !== 'brCopy'">
                  <label class="block mt-1 text-sm font-medium text-gray-800">{{ curVendor[field.key] || 'No value available' }}</label>
                </template>
                <template v-else>
                  <div v-if="curVendor[field.key]" class="relative mt-2">
                    <img 
                      :src="curVendor[field.key] ? (imageroot + curVendor[field.key]) :  'No value available'" 
                      alt="Image Preview" 
                      class="object-cover w-12 h-12 rounded-md"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- End  Company Details -->

          <hr class="my-4">
          <div>
            <h3 class="font-bold">Banner Details</h3>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div v-for="(field, index) in bannerFields" :key="index">
                <label class="block text-sm font-medium text-gray-600">{{ field.label }}</label>
                <template v-if="field.key !== 'vendorImage' && field.key !== 'shopLogo' && field.key !== 'shopCoverImage' && field.key !== 'brCopy'">
                  <label class="block mt-1 text-sm font-medium text-gray-800">{{ curVendor[field.key] || 'No value available' }}</label>
                </template>
                <template v-else>
                  <div v-if="curVendor[field.key]" class="relative mt-2">
                    <img :src="imageroot + curVendor[field.key]" alt="Image Preview" class="object-cover w-32 h-32" />
                  </div>
                </template>
              </div>
            </div>
          </div>

          <hr class="my-4"> 
          <div>
            <h3 class="font-bold">Bank Details</h3>
            <div class="grid grid-cols-3 gap-4 mt-4">
              <div v-for="(field, index) in bankFields" :key="index">
                <label class="block text-sm font-medium text-gray-600">{{ field.label }}</label>
                <template v-if="field.key !== 'vendorImage' && field.key !== 'shopLogo' && field.key !== 'shopCoverImage' && field.key !== 'brCopy'">
                  <label class="block mt-1 text-sm font-medium text-gray-800">{{ curVendor[field.key] || 'No value available' }}</label>
                </template>
                <template v-else>
                  <div v-if="curVendor[field.key]" class="relative mt-2">
                    <img :src="imageroot + curVendor[field.key]" alt="Image Preview" class="object-cover w-32 h-32" />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!--End  Bank Setails -->
        </div>    
      </div>
      <!-- End Modal Content -->

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="GetSave" class="confirm-button">Save</button>
      </div>
    </div>
  </div>
</template>

<script>

import { useVendorStore } from "~/stores/modules/vendorStore";
import closebtn from "~/components/customcontrol/modal_close_button";

export default {
    
    components: {closebtn},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        vendorStore: null,
        curVendor:{}, 
        isOpen:true,  
        bankFields: [
          { label: "Bank Name", key: "bankName" },
          { label: "Branch Name", key: "branch" },
          // { label: "Bank Branch Code", key: "branchCode" },
          { label: "Bank Account No", key: "accountNumber" },
          // { label: "Bank Swift Code", key: "swiftCode" }
        ],
        bannerFields: [
          { label: "Banner 1", key: "banner1" },
          { label: "Banner 2", key: "banner2" },
          // { label: "Description", key: "description" }
        ],
        vendorFields: [
          { label: "Customer Ref", key: "customerRef" },
          { label: "Shop Name", key: "shopName" },
          { label: "First Name", key: "firstName" },
          { label: "Last Name", key: "lastname" },
          { label: "Phone", key: "phone" },
          { label: "Email", key: "email" },
          { label: "Shop Contact No", key: "shopContactNo" },
          { label: "Shop Address 1", key: "shopAddress1" },
          { label: "Shop Address 2", key: "shopAddress2" },
          { label: "City", key: "city" },
          { label: "Description", key: "description" },
          { label: "Image", key: "vendorImage" },
          { label: "Logo", key: "shopLogo" },
          { label: "BR Copy", key: "brCopy" },
          { label: "Shop Cover Image", key: "shopCoverImage" },

        ]   
      }
    },
    async created() {
    this.vendorStore = useVendorStore();
    this.curVendor = this.vendorStore.curVendor;

    },
    async mounted() {},
    watch: {},
    computed: {
      // ...mapState({
      //   //loggeduser: (state) => state.loggeduser,
      // }),
    },
    methods: {
      closeModal(){
        this.isOpen = false;
        this.$emit('close')
       
      },
      GetSave(){
        this.isOpen = false;
        this.$emit('close')
       
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
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }
</script>

<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal Container */
.modal {
  background: white;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 90%; /* Set the default height for larger screens */
  position: relative; /* Needed for proper footer placement */
}

/* Modal Header */
.modal-header {
  background: #0b2145;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

/* Modal Content */
.modal-content {
  padding: 20px;
  max-height: 80%; /* Set max height */
  overflow-y: auto; /* Make it scrollable */
  flex-grow: 1; /* Allow content to grow */
}

/* Modal Footer */
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute; /* Sticky footer */
  bottom: 0;
  width: 100%;
}

button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

.cancel-button {
  background: #e4e4e4;
  color: #333;
}

.confirm-button {
  background: #0b2145;
  color: white;
}

button:hover {
  opacity: 0.8;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .modal {
    width: 100%; /* Full width on mobile */
    height: 100%; /* Full screen height on mobile */
    border-radius: 0; /* Remove rounded corners for mobile */
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none; /* Remove max-height for mobile */
    overflow-y: auto; /* Enable scroll */
    max-height: 80%; 
  }

  .modal-footer {
    padding: 10px;
  }
}
</style>
