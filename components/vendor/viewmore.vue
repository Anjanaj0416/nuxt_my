<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Vendor Details - View More..</h2>
        <!-- <button @click="closeModal" class="absolute z-50 p-2 text-white rounded-md  close-button">&times;</button> -->
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
     
        <div class="form-content">
        <!-- Start Company Details -->
  <div >
      <h3 class="font-bold">Company Details</h3>

     {{ curVendor }}


      <div class="grid grid-cols-3 gap-4 mt-4">
      
        <div class="">
      <label class="block text-sm font-medium text-gray-600">Company Name</label>
     
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Address Line 1</label>
      
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Address Line 2</label>
      
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">City</label>
     
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">District</label>
     
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Email</label>
    
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Number</label>
    
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Whatsapp Number</label>
     
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Company Logo</label>
    
    </div>

 
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Person Name</label>
      
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Person Mobile</label>
     
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner First Name</label>
      
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner Contact</label>
     
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner Birth Date</label>
     
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Sales officer No</label>
      
    </div>    <div class="">
      <label class="block text-sm font-medium text-gray-600">Sales officer No</label>
     
    </div>
  </div>
</div>
      <!-- End  Company Details -->

  <hr class="my-4"> 
  <!-- start Banner Details -->
   <div>
  <h3 class="font-bold">Banner Details</h3>
  <div class="grid grid-cols-3 gap-4 mt-4">
  <div class="">
      <label class="block text-sm font-medium text-gray-600">Banner 1</label>
     
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Banner 2</label>
      
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Description</label>
     
    </div>
  </div>
</div>
  <!-- End Banner Details -->
  
  <hr class="my-4">   
    <!-- Bank Setails -->
     <div>
   <h3 class="font-bold">Bank Details</h3>
   <div class="grid grid-cols-3 gap-4 mt-4">
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Name</label>
      
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Branch</label>
      
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Branch Code</label>
      
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Account No</label>
      
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Swift Code</label>
     
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
