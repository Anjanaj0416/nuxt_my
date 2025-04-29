<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Vendor Details - {{ isEditing ? "Edit" : "Add" }}
        </h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <!-- {{ curVendor }} -->

          <h3 class="font-bold">Company Details</h3>
            <!-- Vendor Image -->
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="" v-if="isEditing">
                <label class="block text-sm font-bold text-gray-600">Customer Ref</label>
                <input
                  type="text"
                  v-model="form.customerRef"
                  disabled
                  placeholder="Vendor ID (read-only)"
                  class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
                />
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Company Name</label>
                <input
                  type="text"
                  v-model="form.shopName"
                  @input="clearError('shopName')"
                  placeholder="Enter Shop Name"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.shopName" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.shopName }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">First Name</label>
                <input
                  type="text"
                  v-model="form.firstName"
                  @input="clearError('firstName')"
                  placeholder="Enter First Name"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.firstName" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.firstName }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Last Name</label>
                <input
                  type="text"
                  v-model="form.lastName"
                  @input="clearError('lastName')"
                  placeholder="Enter Last Name"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.lastName" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.lastName }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Phone</label>
                <input
                type="text"
                  v-model="form.phone"
                  @input="clearError('phone')"
                  placeholder="Enter phone"
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <p v-if="validationErrors.phone" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.phone }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Email</label>
                <input
                  type="email"
                  v-model="form.email"
                  @input="clearError('email')"
                  placeholder="Enter Email"
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <p v-if="validationErrors.email" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.email }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Contact Number</label>
                <input
                  type="tel"
                  v-model="form.shopContactNo"
                  @input="clearError('shopContactNo')"
                  placeholder="Enter Contact Number"
                  maxlength="10"
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.shopContactNo" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.shopContactNo }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Address Line 1</label>
                <input
                  type="text"
                  v-model="form.shopAddress1"
                  @input="clearError('shopAddress1')"
                  placeholder="Enter Address Line 1"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.shopAddress1" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.shopAddress1 }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Address Line 2</label>
                <input
                  type="text"
                  v-model="form.shopAddress2"
                  @input="clearError('shopAddress2')"
                  placeholder="Enter Address Line 2"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.shopAddress2" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.shopAddress2 }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">City</label>
                <input
                  type="text"
                  v-model="form.city"
                  @input="clearError('city')"
                  placeholder="Enter city"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                  <!-- {{form.city}} -->
                <p v-if="validationErrors.city" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.city }}
                </p>
              </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Vendor Image</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('vendorImage', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.vendorImage" class="mt-2 text-sm text-red-600">{{ validationErrors.vendorImage }}</p>
            </div>

            <!-- Shop Logo -->
            <div>
              <label class="block text-sm font-bold text-gray-600">Shop Logo</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('shopLogo', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.shopLogo" class="mt-2 text-sm text-red-600">{{ validationErrors.shopLogo }}</p>
            </div>

            <!-- Shop Cover Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">Shop Cover Image</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('shopCoverImage', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.shopCoverImage" class="mt-2 text-sm text-red-600">{{ validationErrors.shopCoverImage }}</p>
            </div>

            <!-- BR Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">BR</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('brCopy', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.brCopy" class="mt-2 text-sm text-red-600">{{ validationErrors.brCopy }}</p>
            </div>
          

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Description</label>
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
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Bank Details</h3>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Name</label>
              <input type="text" v-model="form.bankName" @input="clearError('bankName')" placeholder="Enter Bank Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.bankName" class="mt-2 text-sm text-red-600">
                {{ validationErrors.bankName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Branch</label>
              <input type="text" v-model="form.branch" @input="clearError('branch')" placeholder="Enter Bank Branch"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.branch" class="mt-2 text-sm text-red-600">
                {{ validationErrors.branch }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Account No</label>
              <input type="text" v-model="form.accountNumber" @input="clearError('accountNumber')"
                placeholder="Enter ank Account No" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.accountNumber" class="mt-2 text-sm text-red-600">
                {{ validationErrors.accountNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Card Holder Name</label>
              <input type="text" v-model="form.holderName" @input="clearError('holderName')"
                placeholder="Enter Card Colder Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.holderName" class="mt-2 text-sm text-red-600">
                {{ validationErrors.holderName }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <!-- <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="handleSubmit" class="confirm-button">Save</button>
      </div> -->
      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="handleSubmit" class="confirm-button">
          {{ isEditing ? 'Update Vendor' : 'Save Vendor' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import { useVendorStore } from "~/stores/modules/qms/vendorStore";
// import imagecomp from "~/components/customcontrol/imagepicker";
import serach_Input from "~/components/customcontrol/SearchInput";

import upload from "./uploader.vue";

export default {
  components: { closebtn, serach_Input },
  data() {
    return {
      isOpen: true,
      curVendor: {},
      validationErrors: {},
      form: {},
      imageroot: "",
    };
  },
  computed: {
    isEditing() {
      return (
        this.curVendor &&
        this.curVendor.id !== "00000000-0000-0000-0000-000000000000"
      );
    },
  },
  async created() {
    this.vendorStore = useVendorStore();  // Initialize the store correctly
    this.curVendor = this.vendorStore.curVendor;
    this.imageroot = this.vendorStore.initVendor.baseUrl;
    // If editing, populate the form with the current vendor data
    if (this.curVendor) {
      Object.assign(this.form, this.curVendor); // Pre-fill the form with vendor data
    }
  },
  methods: {
    cancel() {
      // Clear the form and validation errors when canceling
      Object.keys(this.form).forEach((key) => {
        this.form[key] = "";
      });
      Object.keys(this.validationErrors).forEach((key) => {
        this.validationErrors[key] = "";
      });
      this.closeModal(); // This will call the new method
    },

    handleImageUpload(fieldName, event) {
      const file = event.target.files[0];
      if (file) {
        this.form[fieldName] = file; // Add the image to form data
      }
    },

   
    handleSubmit() {
        this.clearValidationErrors();

        let hasErrors = false;


        if (!this.form.firstName) {
          this.validationErrors.firstName = "Please enter First Name!";
          hasErrors = true;
        }
        if (!this.form.lastName) {
          this.validationErrors.lastName = "Please enter Last Name!";
          hasErrors = true;
        }
        if (!this.form.vendorImage) {
          this.validationErrors.vendorImage = "Please enter Image!";
          hasErrors = true;
        }
        if (!this.form.email) {
          this.validationErrors.email = 'Please enter an email!';
          hasErrors = true;
        } else {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(this.form.email)) {
            this.validationErrors.email = 'Please enter a valid email address!';
            hasErrors = true;
          }
        }if (!this.form.shopName) {
          this.validationErrors.shopName = "Please enter Company Name!";
          hasErrors = true;
        }if (!this.form.shopContactNo) {
          this.validationErrors.shopContactNo = 'Please enter Contact Number!';
          hasErrors = true;
        } else {
          const contactNoRegex = /^[0-9]{10}$/;
          if (!contactNoRegex.test(this.form.shopContactNo)) {
            this.validationErrors.shopContactNo = 'Please enter a valid 10-digit contact number!';
            hasErrors = true;
          }
        }if (!this.form.shopAddress1) {
          this.validationErrors.shopAddress1 = "Please enter Address1!";
          hasErrors = true;
        }if (!this.form.city) {
          this.validationErrors.city = "Please enter city!";
          hasErrors = true;
        }
        if (!this.form.phone) {
          this.validationErrors.phone = 'Please enter phone Number!';
          hasErrors = true;
        } else {
          const contactNoRegex1 = /^[0-9]{10}$/;
          if (!contactNoRegex1.test(this.form.phone)) {
            this.validationErrors.phone = 'Please enter a valid 10-digit contact number!';
            hasErrors = true;
          }
        }
        if (!this.form.description) {
          this.validationErrors.description = "Please enter Description!";
          hasErrors = true;
        }

        // Simple validation: Company name must not be empty
        if (!this.form.bankName) {
          this.validationErrors.bankName = "Please enter Bank Name!";
          hasErrors = true;
        }
        if (!this.form.branch) {
          this.validationErrors.branch = "Please enter Branch!";
          hasErrors = true;
        }
        if (!this.form.holderName) {
          this.validationErrors.holderName = "Please enter Account Holder Name!";
          hasErrors = true;
        }
        if (!this.form.accountNumber) {
          this.validationErrors.accountNumber = "Please enter Account Number!";
          hasErrors = true;
        }

        // Validation for images (check if images are uploaded)
        if (!this.form.vendorImage) {
          this.validationErrors.vendorImage = "Please upload a Vendor Image!";
          hasErrors = true;
        }
        if (!this.form.shopLogo) {
          this.validationErrors.shopLogo = "Please upload a Shop Logo!";
          hasErrors = true;
        }
        if (!this.form.shopCoverImage) {
          this.validationErrors.shopCoverImage = "Please upload a Shop Cover Image!";
          hasErrors = true;
        }
        if (!this.form.brCopy) {
          this.validationErrors.brCopy = "Please upload a Shop BR!";
          hasErrors = true;
        }

        if (hasErrors) return; // Prevent submission if there are errors

        // Log the form data to the console
        console.log("Form Data:", this.form);

        // Pass the form data to the vendorStore
        this.vendorStore.addEditVendor(this.form);

        this.closeModal(); // Close modal after submission
    },

    closeModal() {
      this.isOpen = false; // Set modal visibility to false to close it
    },

    clearValidationErrors() {
      Object.keys(this.validationErrors).forEach((key) => {
        this.validationErrors[key] = "";
      });
    },

    convertToFormData(formObject) {
      const formData = new FormData();

      Object.keys(formObject).forEach((key) => {
        const value = formObject[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      return formData;
    },

  },
};
</script>

<style scoped>
/* Modal Styling */
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

.modal {
  background: white;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
}

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

.modal-content {
  padding: 20px;
  max-height: 80%;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
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

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none;
  }

  .modal-footer {
    padding: 10px;
  }
}
</style>
