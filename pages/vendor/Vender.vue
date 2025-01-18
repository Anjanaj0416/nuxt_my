<template>
  <h1 class="mt-4 font-semibold tracking-tight text-gray-700 text-1xl text-balance sm:text-3xl">Add Vender</h1>
  <div class="grid grid-cols-3 gap-4 mt-4">
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
        type="file"
        @change="handleFileChange('companyLogo', $event)" 
        accept="image/*"
        class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
      <p v-if="validationErrors.companyLogo" class="mt-2 text-sm text-red-600">
        {{ validationErrors.companyLogo }}
      </p>
    </div>

    <div class="">
      <label class="block text-sm font-medium text-gray-600">Banner 1</label>
      <input
        type="file"
        @change="handleFileChange('banner1', $event)"
        accept="image/*"
        class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
      <p v-if="validationErrors.banner1" class="mt-2 text-sm text-red-600">
        {{ validationErrors.banner1 }}
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
      <label class="block text-sm font-medium text-gray-600">Sales officer No</label>
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
      @click="cancel"
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
    const form = reactive({
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
    });

    const validationErrors = reactive({});

    // Handle file input changes
    const handleFileChange = (field, event) => {
      form[field] = event.target.files[0] || '';
      clearError(field); 
    };

    // Handle form submission
    const handleSubmit = () => {
      Object.keys(validationErrors).forEach((key) => {
        validationErrors[key] = '';
      });

      let hasErrors = false;

      // Validate required fields
      if (!form.CompanyName) {
        validationErrors.CompanyName = "Please enter company name!";
        hasErrors = true;
      }
      if (!form.address1) {
        validationErrors.address1 = "Please enter Address Line 1!";
        hasErrors = true;
      }
      if (!form.city) {
        validationErrors.city = "Please enter City!";
        hasErrors = true;
      }
      if (!form.email) {
        validationErrors.email = "Please enter Email!";
        hasErrors = true;
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        validationErrors.email = "Please enter a valid Email!";
        hasErrors = true;
      }
      if (!form.contactNumber) {
        validationErrors.contactNumber = "Please enter Contact Number!";
        hasErrors = true;
      }
      if (!form.whatappNumber) {
        validationErrors.whatappNumber = "Please enter WhatsApp Number!";
        hasErrors = true;
      }
      if (!form.companyLogo) {
        validationErrors.companyLogo = "Please upload Company Logo!";
        hasErrors = true;
      }
      if (!form.banner1) { // Only show error if file is required and not uploaded
        validationErrors.banner1 = "Please upload Banner 1!";
        hasErrors = true;
      }
      if (!form.description) {
        validationErrors.description = "Please enter Description!";
        hasErrors = true;
      }
      if (!form.contactPersonName) {
        validationErrors.contactPersonName = "Please enter Contact Person Name!";
        hasErrors = true;
      }
      if (!form.contactPersonMobile) {
        validationErrors.contactPersonMobile = "Please enter Contact Person Mobile!";
        hasErrors = true;
      }
      if (!form.ownerFirstName) {
        validationErrors.ownerFirstName = "Please enter Owner First Name!";
        hasErrors = true;
      }
      if (!form.ownerContact) {
        validationErrors.ownerContact = "Please enter Owner Contact!";
        hasErrors = true;
      }
      if (!form.ownerBirthDate) {
        validationErrors.ownerBirthDate = "Please enter Owner Birth Date!";
        hasErrors = true;
      }
      if (!form.bankName) {
        validationErrors.bankName = "Please enter Bank Name!";
        hasErrors = true;
      }
      if (!form.bankBranch) {
        validationErrors.bankBranch = "Please enter Bank Branch!";
        hasErrors = true;
      }
      if (!form.bankBranchCode) {
        validationErrors.bankBranchCode = "Please enter Bank Branch Code!";
        hasErrors = true;
      }
      if (!form.bankAccountNo) {
        validationErrors.bankAccountNo = "Please enter Bank Account No!";
        hasErrors = true;
      }
      if (!form.bankSwiftCode) {
        validationErrors.bankSwiftCode = "Please enter Bank Swift Code!";
        hasErrors = true;
      }
      if (!form.rsoNo) {
        validationErrors.rsoNo = "Please select Bank Branch!";
        hasErrors = true;
      }

      // If there are errors, return
      if (hasErrors) {
        return;
      }

      // Proceed with form submission if no errors
      console.log("Form submitted:", form);
    };

    // Clear individual field error on input change
    const clearError = (field) => {
      validationErrors[field] = '';
    };

    const cancel = () => {
      // Clear the form and validation errors when canceling
      Object.keys(form).forEach((key) => {
        form[key] = '';
      });
      Object.keys(validationErrors).forEach((key) => {
        validationErrors[key] = '';
      });
    };

    return {
      form,
      validationErrors,
      handleSubmit,
      handleFileChange,
      clearError,
      cancel
    };
  }
};
</script>

<style scoped>
/* Add any custom styling here */
</style>