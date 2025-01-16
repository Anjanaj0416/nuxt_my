<template>
  <h1 class="mt-8 font-semibold tracking-tight text-gray-700 text-1xl text-balance sm:text-3xl">Add Vender</h1>
  <div class="grid grid-cols-3 gap-4 mt-10">
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Company Name</label>
      <input
        type="text"
        v-model="form.CompanyName"
        @input="clearError('CompanyName')"
        placeholder="Enter Company Name"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.CompanyName" class="mt-2 text-sm text-red-600">
        {{ validationErrors.CompanyName }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Address Line 1</label>
      <input
        type="text"
        v-model="form.address1"
        @input="clearError('address1')"
        placeholder="Enter Address Line 1"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.address1" class="mt-2 text-sm text-red-600">
        {{ validationErrors.address1 }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Address Line 2</label>
      <input
        type="text"
        v-model="form.address2"
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
        v-model="form.city"
        @input="clearError('city')"
        placeholder="Enter city"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.city" class="mt-2 text-sm text-red-600">
        {{ validationErrors.city }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">District</label>
      <input
        type="text"
        v-model="form.district"
        @input="clearError('district')"
        placeholder="Enter District"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.district" class="mt-2 text-sm text-red-600">
        {{ validationErrors.district }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Email</label>
      <input
        type="email"
        v-model="form.email"
        @input="clearError('email')"
        placeholder="Enter Email"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.email" class="mt-2 text-sm text-red-600">
        {{ validationErrors.email }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Number</label>
      <input
        type="tel"
        v-model="form.contactNumber"
        @input="clearError('contactNumber')"
        placeholder="Enter Contact Number"
        maxlength="10"
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.contactNumber" class="mt-2 text-sm text-red-600">
        {{ validationErrors.contactNumber }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Whatsapp Number</label>
      <input
        type="tel"
        v-model="form.whatappNumber"
        @input="clearError('whatappNumber')"
        placeholder="Enter Whatsapp Number"
        maxlength="10"
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.whatappNumber" class="mt-2 text-sm text-red-600">
        {{ validationErrors.whatappNumber }}
      </p>
    </div>
    <div class="">
    <label class="block text-sm font-medium text-gray-600">Company Logo</label>
    <input
      class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      type="file"

      @input="clearError('companyLogo')"
      ref="form.companyLogo"
    >
    <p v-if="validationErrors.companyLogo" class="mt-2 text-sm text-red-600">
      {{ validationErrors.companyLogo }}
    </p>
  </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Banner 1</label>
      <input 
        class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        type="file"
        @change="handleFileUpload($event, 1)"
        @input="clearError('banner1')"
        ref="form.banner1"
      >
      <p v-if="validationErrors.banner1" class="mt-2 text-sm text-red-600">
        {{ validationErrors.banner1 }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Banner 2</label>
      <input 
        class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        aria-describedby="user_avatar_help" 
        id="user_avatar" 
        type="file"
      >
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Description</label>
      <input
        type="text"
        v-model="form.description"
        @input="clearError('description')"
        placeholder="Enter description"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.description" class="mt-2 text-sm text-red-600">
        {{ validationErrors.description }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Person Name</label>
      <input
        type="text"
        v-model="form.contactPersonName"
        @input="clearError('contactPersonName')"
        placeholder="Enter Contact Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.contactPersonName" class="mt-2 text-sm text-red-600">
        {{ validationErrors.contactPersonName }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Contact Person Mobile</label>
      <input
        type="text"
        v-model="form.contactPersonMobile"
        @input="clearError('contactPersonMobile')"
        placeholder="Enter Phone Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.contactPersonMobile" class="mt-2 text-sm text-red-600">
        {{ validationErrors.contactPersonMobile }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner First Name</label>
      <input
        type="text"
        v-model="form.ownerFirstName"
        @input="clearError('ownerFirstName')"
        placeholder="Enter Whatsapp Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.ownerFirstName" class="mt-2 text-sm text-red-600">
        {{ validationErrors.ownerFirstName }}
      </p>
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner Contact</label>
      <input
        type="text"
        v-model="form.ownerContact"
        @input="clearError('ownerContact')"
        placeholder="Enter description"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.ownerContact" class="mt-2 text-sm text-red-600">
        {{ validationErrors.ownerContact }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Owner Birth Date</label>
      <input
        type="date"
        v-model="form.ownerBirthDate"
        @input="clearError('ownerBirthDate')"
        placeholder="Enter Contact Number"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.ownerBirthDate" class="mt-2 text-sm text-red-600">
        {{ validationErrors.ownerBirthDate }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Name</label>
      <input
        type="text"
        v-model="form.bankName"
        @input="clearError('bankName')"
        placeholder="Enter Bank Name"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.bankName" class="mt-2 text-sm text-red-600">
        {{ validationErrors.bankName }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Branch</label>
      <input
        type="text"
        v-model="form.bankBranch"
        @input="clearError('bankBranch')"
        placeholder="Enter Bank Branch"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.bankBranch" class="mt-2 text-sm text-red-600">
        {{ validationErrors.bankBranch }}
      </p>
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Branch Code</label>
      <input
        type="text"
        v-model="form.bankBranchCode"
        @input="clearError('bankBranchCode')"
        placeholder="Enter Bank Branch Code"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.bankBranchCode" class="mt-2 text-sm text-red-600">
        {{ validationErrors.bankBranchCode }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Account No</label>
      <input
        type="date"
        v-model="form.bankAccountNo"
        @input="clearError('bankAccountNo')"
        placeholder="Enter ank Account No"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.bankAccountNo" class="mt-2 text-sm text-red-600">
        {{ validationErrors.bankAccountNo }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">Bank Swift Code</label>
      <input
        type="text"
        v-model="form.bankSwiftCode"
        @input="clearError('bankSwiftCode')"
        placeholder="Enter Bank Swift Code"
        required
        class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />
      <p v-if="validationErrors.bankSwiftCode" class="mt-2 text-sm text-red-600">
        {{ validationErrors.bankSwiftCode }}
      </p>
    </div>
    <div class="">
      <label class="block text-sm font-medium text-gray-600">RSO No</label>
      <select
        id="bankBranch"
        v-model="form.rsoNo"
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
      <p v-if="validationErrors.rsoNo" class="mt-2 text-sm text-red-600">
        {{ validationErrors.rsoNo }}
      </p>
    </div>
  </div>
  <div class="grid grid-cols-2 mt-10">

      <button 
        type="button" 
        @click="handleSubmit"
        class="text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <button 
        type="button" 
        class="text-blue-900 bg-white hover:bg-blue-900 border-2 border-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Cancel
      </button>
  </div>
</template>

    
<script>
import { reactive } from 'vue';

export default {
  setup() {
    // Use reactive to define form and validationErrors objects
    const form = reactive({
      CompanyName: '',
      address1: '',
      city: '',
      companyLogo:'',
      // Add other fields here...
    });

    const validationErrors = reactive({});

    const handleSubmit = () => {
      validationErrors.CompanyName = '';
      validationErrors.address1 = '';
      validationErrors.city = '';
      validationErrors.companyLogo = '';


      if (!form.CompanyName) {
        validationErrors.CompanyName = "Please enter company name!";
      }
      if (!form.address1) {
        validationErrors.address1 = "Please enter Address Line 1!";
      }
      if (!form.city) {
        validationErrors.city = "Please enter City!";
      }
      if (!form.district) {
        validationErrors.district = "Please enter District!";
      }
      if (!form.email) {
        validationErrors.email = "Please enter Email!";
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        validationErrors.email = "Please enter a valid Email!";
      }
      if (!form.contactNumber) {
        validationErrors.contactNumber = "Please enter Contact Number!";
      }
      if (!form.contactNumber) {
        validationErrors.contactNumber = "Please enter Contact Number!";
      }
      if (!form.whatappNumber) {
        validationErrors.whatappNumber = "Please enter whatApp Number!";
      }
      if (!form.companyLogo) {
        validationErrors.companyLogo = "Please enter Company Logo!";
      }
      if (!form.banner1) {
        validationErrors.banner1 = "Please enter Banner 1!";
      }

      if (!form.description) {
        validationErrors.description = "Please enter Description!";
      }
      if (!form.contactPersonName) {
        validationErrors.contactPersonName = "Please enter Contact Person Name!";
      }
      if (!form.contactPersonMobile) {
        validationErrors.contactPersonMobile = "Please enter Contact Person Mobile!";
      }
      if (!form.ownerFirstName) {
        validationErrors.ownerFirstName = "Please enter Owner First Name!";
      }
      if (!form.ownerLastName) {
        validationErrors.ownerLastName = "Please enter Owner Last Name!";
      }
      if (!form.ownerContact) {
        validationErrors.ownerContact = "Please enter Owner Contact!";
      }
      if (!form.ownerBirthDate) {
        validationErrors.ownerBirthDate = "Please enter Owner BirthDate!";
      }
      if (!form.bankName) {
        validationErrors.bankName = "Please enter Bank Name!";
      }
      if (!form.bankBranch) {
        validationErrors.bankBranch = "Please enter Bank Branch!";
      }
      if (!form.bankBranchCode) {
        validationErrors.bankBranchCode = "Please enter Bank Branch Code!";
      }
      if (!form.bankAccountNo) {
        validationErrors.bankAccountNo = "Please enter Bank AccountNo!";
      }
      if (!form.bankSwiftCode) {
        validationErrors.bankSwiftCode = "Please enter Bank SwiftCode!";
      }
      if (!form.rsoNo) {
        validationErrors.rsoNo = "Please enter Bank Rso No!";
      }

      // Additional validation logic here...
    };

    // Clear the error message when user starts typing
    const clearError = (field) => {
      if (form[field]) {
        validationErrors[field] = '';
      }
    };

    return {
      form,
      validationErrors,
      handleSubmit,
      clearError,
    };
  },
};
</script>
    
    <style scoped>
    .csscmd{
      @apply p-2  bg-blue-200 rounded;
    }
    .csscmd:hover{
      @apply bg-blue-200 cursor-pointer;
    }
    
    .cssBox {
      border: 1px solid;
      @apply border-gray-500 rounded p-2;
    }
  
    .btn{
      background-color: #072556; 
    }

    
    </style>
    
    
    