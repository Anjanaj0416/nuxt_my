<template>
  <div>
    <h1 class="mt-2 text-2xl font-semibold tracking-tight text-gray-700 text-balance sm:text-3xl">Vendor</h1>
    <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
      <!-- Form Fields -->
      <div v-for="(field, index) in fields" :key="index" class="mb-1">
        <label :class="'block text-sm font-medium text-gray-600'" :for="field.name">{{ field.label }}</label>
        <!-- Input Fields -->
        <component
          v-if="field.type !== 'file' && field.type !== 'select'"
          :is="field.component || 'input'"
          v-model="form[field.name]"
          @input="clearError(field.name)"
          :type="field.type"
          :placeholder="field.placeholder"
          :class="'w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500'"
          :required="field.required !== true"
        />
        <!-- File Input -->
        <input
          v-else-if="field.type === 'file'"
          type="file"
          @change="handleFileChange(field.name, $event)"
          accept="image/*"
          class="block w-full mt-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <!-- Dropdown Select -->
        <select
          v-else-if="field.type === 'select'"
          v-model="form[field.name]"
          @change="clearError(field.name)"
          :class="'w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500'"
          required
        >
          <option value="" disabled selected>{{ field.placeholder }}</option>
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <!-- Validation Errors -->
        <p v-if="validationErrors[field.name]" class="mt-2 text-sm text-red-600">
          {{ validationErrors[field.name] }}
        </p>
      </div>
    </div>
    <!-- Actions -->
    <div class="grid grid-cols-2 mt-4">
      <button
        type="button"
        @click="handleSubmit"
        class="text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
      <button
        type="button"
        @click="handleCancel"
        class="text-blue-900 bg-white hover:bg-blue-900 border-2 border-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const form = reactive({
      companyName: "",
      address1: "",
      city: "",
      email: "",
      contactNumber: "",
      whatappNumber: "",
      companyLogo: null,
      banner1: null,
      description: "",
      contactPersonName: "",
      contactPersonMobile: "",
      ownerFirstName: "",
      ownerContact: "",
      ownerBirthDate: "",
      bankName: "",
      bankBranch: "",
      bankBranchCode: "",
      bankAccountNo: "",
      bankSwiftCode: "",
      rsoNo: "",
    });

    const rsoOptions = [
      { value: "101", label: "Sales Officer 101" },
      { value: "102", label: "Sales Officer 102" },
      { value: "103", label: "Sales Officer 103" },
      { value: "104", label: "Sales Officer 104" },
    ];

    const validationErrors = reactive({});
    const submitted = reactive({ value: false }); // Track form submission state

    const fields = [
      { name: "companyName", label: "Company Name", type: "text", placeholder: "Enter Company Name", required: true },
      { name: "address1", label: "Address Line 1", type: "text", placeholder: "Enter Address Line 1", required: true },
      { name: "address2", label: "Address Line 2", type: "text", placeholder: "Enter Address Line 2", required: false },
      { name: "city", label: "City", type: "text", placeholder: "Enter City", required: true },
      { name: "district", label: "District", type: "text", placeholder: "Enter District", required: true },
      { name: "email", label: "Email", type: "email", placeholder: "Enter Email", required: true },
      { name: "contactNumber", label: "Contact Number", type: "tel", placeholder: "Enter Contact Number", required: true },
      { name: "whatappNumber", label: "Whatsapp Number", type: "tel", placeholder: "Enter Whatsapp Number", required: true },
      { name: "companyLogo", label: "Company Logo", type: "file", required: true },
      { name: "banner1", label: "Banner 1", type: "file", required: true },
      { name: "banner2", label: "Banner 2", type: "file", required: false },
      { name: "description", label: "Description", type: "text", placeholder: "Enter Description", required: true },
      { name: "contactPersonName", label: "Contact Person Name", type: "text", placeholder: "Enter Contact Person Name", required: true },
      { name: "contactPersonMobile", label: "Contact Person Mobile", type: "tel", placeholder: "Enter Contact Person Mobile", required: true },
      { name: "ownerFirstName", label: "Owner First Name", type: "text", placeholder: "Enter Owner First Name", required: true },
      { name: "ownerContact", label: "Owner Contact", type: "text", placeholder: "Enter Owner Contact", required: true },
      { name: "ownerBirthDate", label: "Owner Birth Date", type: "date", placeholder: "Enter Owner Birth Date", required: true },
      { name: "bankName", label: "Bank Name", type: "text", placeholder: "Enter Bank Name", required: true },
      { name: "bankBranch", label: "Bank Branch", type: "tel", placeholder: "Enter Bank Branch", required: true },
      { name: "bankBranchCode", label: "Bank Branch Code", type: "tel", placeholder: "Enter Bank Branch Code", required: true },
      { name: "bankAccountNo", label: "Bank Account No", type: "text", placeholder: "Enter Bank Account No", required: true },
      { name: "bankSwiftCode", label: "Bank Swift Code", type: "text", placeholder: "Enter Bank Swift Code", required: true },
      { name: "rsoNo", label: "Sales Officer No", type: "select", placeholder: "Enter Sales Officer No", options: rsoOptions, required: true },
    ];

    const clearError = (fieldName) => {
      validationErrors[fieldName] = "";
    };

    const handleFileChange = (field, event) => {
      const file = event.target.files[0];
      if (file) {
        form[field] = file;
        clearError(field);
      } else {
        form[field] = null;
        validationErrors[field] = `${field.label} is required.`;
      }
    };

    const handleSubmit = () => {
      // Mark form as submitted
      submitted.value = true;

      // Reset all validation errors first
      Object.keys(validationErrors).forEach((key) => {
        validationErrors[key] = "";
      });

      let hasErrors = false;

      // Validate all required fields
      fields.forEach((field) => {
        if (field.required && !form[field.name]) {
          validationErrors[field.name] = `${field.label} is required.`;
          hasErrors = true;
        }
        // For file inputs, ensure they're handled specifically
        if (field.type === "file" && field.required && !form[field.name]) {
          validationErrors[field.name] = `${field.label} is required.`;
          hasErrors = true;
        }
      });

      // If no errors, submit the form
      if (!hasErrors) {
        console.log("Form Submitted", form);
      }
    };

    const cancel = () => {
      Object.keys(form).forEach((key) => {
        form[key] = key.includes("banner") || key.includes("Logo") ? null : "";
      });
    };

    return {
      form,
      validationErrors,
      fields,
      handleFileChange,
      handleSubmit,
      cancel,
      clearError,
      submitted,
    };
  },
  methods: {
    handleCancel() {
      this.$emit("cancel-view"); // Emit the cancel event
    },
  },
};
</script>

<style scoped>
/* Add any specific styles here */
</style>


<style scoped>
/* Add any specific styles here */
</style>
