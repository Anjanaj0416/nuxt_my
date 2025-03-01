<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Assign Sales Ex.</h2>
        <!-- <button @click="closeModal" class="absolute z-50 p-2 text-white rounded-md  close-button">&times;</button> -->
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
     
        <div class="form-content">
        <!-- Start Company Details -->
  <div >
      <h3 class="font-bold">Company Details</h3>
      <div class="grid grid-cols-3 gap-4 mt-4">
      
        <div class="">
      <label class="block text-sm font-medium text-gray-600">Company Name</label>
      <input
        type="text"
        v-model="vendor.CompanyName"
        @input="clearError('CompanyName')"
        placeholder="Enter Company Name"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.CompanyName" class="mt-2 text-sm text-red-600">
        {{ err.CompanyName }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Address Line 1</label>
      <input
        type="text"
        v-model="vendor.address1"
        @input="clearError('address1')"
        placeholder="Enter Address Line 1"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.address1" class="mt-2 text-sm text-red-600">
        {{ err.address1 }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Address Line 2</label>
      <input
        type="text"
        v-model="vendor.address2"
        @input="clearError('address2')"
        placeholder="Enter Address Line 2"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">City</label>
      <input
        type="text"
        v-model="vendor.city"
        @input="clearError('city')"
        placeholder="Enter city"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.city" class="mt-2 text-sm text-red-600">
        {{ err.city }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">District</label>
      <input
        type="text"
        v-model="vendor.district"
        @input="clearError('district')"
        placeholder="Enter District"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.district" class="mt-2 text-sm text-red-600">
        {{ err.district }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Email</label>
      <input
        type="email"
        v-model="vendor.email"
        @input="clearError('email')"
        placeholder="Enter Email"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.email" class="mt-2 text-sm text-red-600">
        {{ err.email }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Number</label>
      <input
        type="tel"
        v-model="vendor.contactNumber"
        @input="clearError('contactNumber')"
        placeholder="Enter Contact Number"
        maxlength="10"
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.contactNumber" class="mt-2 text-sm text-red-600">
        {{ err.contactNumber }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Whatsapp Number</label>
      <input
        type="tel"
        v-model="vendor.whatappNumber"
        @input="clearError('whatappNumber')"
        placeholder="Enter Whatsapp Number"
        maxlength="10"
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.whatappNumber" class="mt-2 text-sm text-red-600">
        {{ err.whatappNumber }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Company Logo</label>
      <input
        type="file"
        @change="handleFileChange('companyLogo', $event)" 
        accept="image/*"
        class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
      <p v-if="err.companyLogo" class="mt-2 text-sm text-red-600">
        {{ err.companyLogo }}
      </p>
    </div>

 
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Person Name</label>
      <input
        type="text"
        v-model="vendor.contactPersonName"
        @input="clearError('contactPersonName')"
        placeholder="Enter Contact Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.contactPersonName" class="mt-2 text-sm text-red-600">
        {{ err.contactPersonName }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Person Mobile</label>
      <input
        type="text"
        v-model="vendor.contactPersonMobile"
        @input="clearError('contactPersonMobile')"
        placeholder="Enter Phone Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.contactPersonMobile" class="mt-2 text-sm text-red-600">
        {{ err.contactPersonMobile }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner First Name</label>
      <input
        type="text"
        v-model="vendor.ownerFirstName"
        @input="clearError('ownerFirstName')"
        placeholder="Enter Whatsapp Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.ownerFirstName" class="mt-2 text-sm text-red-600">
        {{ err.ownerFirstName }}
      </p>
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner Contact</label>
      <input
        type="text"
        v-model="vendor.ownerContact"
        @input="clearError('ownerContact')"
        placeholder="Enter description"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.ownerContact" class="mt-2 text-sm text-red-600">
        {{ err.ownerContact }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner Birth Date</label>
      <input
        type="date"
        v-model="vendor.ownerBirthDate"
        @input="clearError('ownerBirthDate')"
        placeholder="Enter Contact Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.ownerBirthDate" class="mt-2 text-sm text-red-600">
        {{ err.ownerBirthDate }}
      </p>
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Sales officer No</label>
      <select
        id="bankBranch"
        v-model="vendor.rsoNo"
        @input="clearError('rsoNo')"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled selected>Select a Bank Branch</option>
        <option value="branch1">Bank Branch 1</option>
        <option value="branch2">Bank Branch 2</option>
        <option value="branch3">Bank Branch 3</option>
        <!-- Add more options as needed -->
      </select>
      <p v-if="err.rsoNo" class="mt-2 text-sm text-red-600">
        {{ err.rsoNo }}
      </p>
    </div>    <div class="">
      <label class="block text-sm font-medium text-gray-600">Sales officer No</label>
      <select
        id="bankBranch"
        v-model="vendor.rsoNo"
        @input="clearError('rsoNo')"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="" disabled selected>Select the Agent</option>
        <option value="branch1">RSO 1</option>
        <option value="branch2">RSO 2</option>
        <option value="branch3">RSO 3</option>
        <!-- Add more options as needed -->
      </select>
      <p v-if="err.rsoNo" class="mt-2 text-sm text-red-600">
        {{ err.rsoNo }}
      </p>
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
      <input
        type="file"
        @change="handleFileChange('banner1', $event)"
        accept="image/*"
        class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
      <p v-if="err.banner1" class="mt-2 text-sm text-red-600">
        {{ err.banner1 }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Banner 2</label>
      <input 
        class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        @change="handleFileChange('banner2', $event)"
        accept="image/*" 
        type="file"
      >
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Description</label>
      <input
        type="text"
        v-model="vendor.description"
        @input="clearError('description')"
        placeholder="Enter description"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.description" class="mt-2 text-sm text-red-600">
        {{ err.description }}
      </p>
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
      <input
        type="text"
        v-model="vendor.bankName"
        @input="clearError('bankName')"
        placeholder="Enter Bank Name"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.bankName" class="mt-2 text-sm text-red-600">
        {{ err.bankName }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Branch</label>
      <input
        type="text"
        v-model="vendor.bankBranch"
        @input="clearError('bankBranch')"
        placeholder="Enter Bank Branch"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.bankBranch" class="mt-2 text-sm text-red-600">
        {{ err.bankBranch }}
      </p>
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Branch Code</label>
      <input
        type="text"
        v-model="vendor.bankBranchCode"
        @input="clearError('bankBranchCode')"
        placeholder="Enter Bank Branch Code"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.bankBranchCode" class="mt-2 text-sm text-red-600">
        {{ err.bankBranchCode }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Account No</label>
      <input
        type="date"
        v-model="vendor.bankAccountNo"
        @input="clearError('bankAccountNo')"
        placeholder="Enter ank Account No"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.bankAccountNo" class="mt-2 text-sm text-red-600">
        {{ err.bankAccountNo }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Swift Code</label>
      <input
        type="text"
        v-model="vendor.bankSwiftCode"
        @input="clearError('bankSwiftCode')"
        placeholder="Enter Bank Swift Code"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="err.bankSwiftCode" class="mt-2 text-sm text-red-600">
        {{ err.bankSwiftCode }}
      </p>
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
import closebtn from "~/components/customcontrol/modal_close_button";

export default {
    
    components: {closebtn},
    props:[''],
    data() {
      return {
        imageroot: process.env.Assets_83,
        isOpen:true,
        vendor:   {
              CompanyName: '',
              address1: '',
              city: '',
              email: '',
              contactNumber: '',
              whatappNumber: '',
              companyLogo: '',
              banner1: '',
              description: '',
              contactPersonName: '',
              contactPersonMobile: '',
              ownerFirstName: '',
              ownerContact: '',
              ownerBirthDate: '',
              bankName: '',
              bankBranch: '',
              bankBranchCode: '',
              bankAccountNo: '',
              bankSwiftCode: '',
              rsoNo: ''
         },
         err:   {
              CompanyName: '',
              address1: '',
              city: '',
              email: '',
              contactNumber: '',
              whatappNumber: '',
              companyLogo: '',
              banner1: '',
              description: '',
              contactPersonName: '',
              contactPersonMobile: '',
              ownerFirstName: '',
              ownerContact: '',
              ownerBirthDate: '',
              bankName: '',
              bankBranch: '',
              bankBranchCode: '',
              bankAccountNo: '',
              bankSwiftCode: '',
              rsoNo: ''
         }
      }
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
     
    //  handleSubmit ()  {
    //   Object.keys(validationErrors).forEach((key) => {
    //     validationErrors[key] = '';
    //   });

    //   let hasErrors = false;

    //   // Validate required fields
    //   if (!vendor.CompanyName) {
    //     err.CompanyName = "Please enter company name!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.address1) {
    //     err.address1 = "Please enter Address Line 1!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.city) {
    //     err.city = "Please enter City!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.email) {
    //     err.email = "Please enter Email!";
    //     hasErrors = true;
    //   } else if (!/\S+@\S+\.\S+/.test(vendor.email)) {
    //     err.email = "Please enter a valid Email!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.contactNumber) {
    //     err.contactNumber = "Please enter Contact Number!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.whatappNumber) {
    //     err.whatappNumber = "Please enter WhatsApp Number!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.companyLogo) {
    //     err.companyLogo = "Please upload Company Logo!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.banner1) { // Only show error if file is required and not uploaded
    //     err.banner1 = "Please upload Banner 1!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.description) {
    //     err.description = "Please enter Description!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.contactPersonName) {
    //     err.contactPersonName = "Please enter Contact Person Name!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.contactPersonMobile) {
    //     err.contactPersonMobile = "Please enter Contact Person Mobile!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.ownerFirstName) {
    //     err.ownerFirstName = "Please enter Owner First Name!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.ownerContact) {
    //     err.ownerContact = "Please enter Owner Contact!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.ownerBirthDate) {
    //     err.ownerBirthDate = "Please enter Owner Birth Date!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.bankName) {
    //     err.bankName = "Please enter Bank Name!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.bankBranch) {
    //     err.bankBranch = "Please enter Bank Branch!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.bankBranchCode) {
    //     err.bankBranchCode = "Please enter Bank Branch Code!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.bankAccountNo) {
    //     err.bankAccountNo = "Please enter Bank Account No!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.bankSwiftCode) {
    //     err.bankSwiftCode = "Please enter Bank Swift Code!";
    //     hasErrors = true;
    //   }
    //   if (!vendor.rsoNo) {
    //     err.rsoNo = "Please select Bank Branch!";
    //     hasErrors = true;
    //   }

    //   // If there are errors, return
    //   if (hasErrors) {
    //     return;
    //   }

    //   // Proceed with form submission if no errors
    //   console.log("Form submitted:", form);
    // },

    clearError (field) {
      validationErrors[field] = '';
    },

    cancel (){
      // Clear the form and validation errors when canceling
      Object.keys(form).forEach((key) => {
        form[key] = '';
      });
      Object.keys(validationErrors).forEach((key) => {
        validationErrors[key] = '';
      });
    },

      // ...mapActions({
      //   //  getWGInitData: 'reservedaddetail/getWGInitData',
      // }),
      //   ...mapMutations({
      //   //resetEmail: 'office/RESET_EMAIL',
      //    //showMessage: 'PUSH_NOTIFICATION',
      // }),
      //  this.processing_year = new Date().getFullYear()
       //this.$emit('Load_MonthlyBrakeDown',req)
       //this.$refs.catcomp.initCategoryItem(-1)
       //this.$emit('input', this.selected_item.trim());
    // show_error(msg) {
    //     this.showMessage({
    //       type: 'Failed',
    //       message: msg,
    //     })
    //   },
    //    show_msg(msg) {
    //     this.showMessage({
    //       type: 'success',
    //       message: msg,
    //     })
    //   },
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
