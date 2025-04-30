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
              <div class="" v-if="isEditing">
                <label class="block text-sm font-bold text-gray-600">shopName</label>
                <input
                  type="text"
                  v-model="form.shopName"
                  disabled
                  placeholder="Vendor ID (read-only)"
                  class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
                />
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Company Name</label>
                <input
                  type="text"
                  v-model="form.ShopName"
                  @input="clearError('ShopName')"
                  placeholder="Enter Shop Name"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.ShopName" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.ShopName }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">First Name</label>
                <input
                  type="text"
                  v-model="form.FirstName"
                  @input="clearError('FirstName')"
                  placeholder="Enter First Name"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.FirstName" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.FirstName }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Last Name</label>
                <input
                  type="text"
                  v-model="form.LastName"
                  @input="clearError('LastName')"
                  placeholder="Enter Last Name"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.LastName" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.LastName }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Phone</label>
                <input
                type="text"
                  v-model="form.Phone"
                  @input="clearError('Phone')"
                  placeholder="Enter Phone"
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <p v-if="validationErrors.Phone" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.Phone }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Email</label>
                <input
                  type="Email"
                  v-model="form.Email"
                  @input="clearError('Email')"
                  placeholder="Enter Email"
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <p v-if="validationErrors.Email" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.Email }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Contact Number</label>
                <input
                  type="tel"
                  v-model="form.ShopContactNo"
                  @input="clearError('ShopContactNo')"
                  placeholder="Enter Contact Number"
                  maxlength="10"
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.ShopContactNo" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.ShopContactNo }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Address Line 1</label>
                <input
                  type="text"
                  v-model="form.ShopAddress1"
                  @input="clearError('ShopAddress1')"
                  placeholder="Enter Address Line 1"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.ShopAddress1" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.ShopAddress1 }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">Address Line 2</label>
                <input
                  type="text"
                  v-model="form.ShopAddress2"
                  @input="clearError('ShopAddress2')"
                  placeholder="Enter Address Line 2"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p v-if="validationErrors.ShopAddress2" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.ShopAddress2 }}
                </p>
              </div>
              <div class="">
                <label class="block text-sm font-bold text-gray-600">City</label>
                <input
                  type="text"
                  v-model="form.City"
                  @input="clearError('City')"
                  placeholder="Enter City"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <!-- <select
                  v-model="form.City"
                  @change="clearError('City')"
                  required
                  class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>Select a City</option>
                  <option v-for="City in vendorStore.initVendor.listCities" :key="City.id" :value="City.name">
                      {{ City.name }}
                  </option>
                </select> -->


                  <!-- {{form.City}} -->
                <p v-if="validationErrors.City" class="mt-2 text-sm text-red-600">
                  {{ validationErrors.City }}
                </p>
              </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Vendor Image</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('VendorImage', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.VendorImage" class="mt-2 text-sm text-red-600">{{ validationErrors.VendorImage }}</p>
            </div>

            <!-- Shop Logo -->
            <div>
              <label class="block text-sm font-bold text-gray-600">Shop Logo</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('ShopLogo', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.ShopLogo" class="mt-2 text-sm text-red-600">{{ validationErrors.ShopLogo }}</p>
            </div>

            <!-- Shop Cover Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">Shop Cover Image</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('ShopCoverImage', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.ShopCoverImage" class="mt-2 text-sm text-red-600">{{ validationErrors.ShopCoverImage }}</p>
            </div>

            <!-- BR Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">BR</label>
              <div class="relative mt-2">
                <input type="file" @change="handleImageUpload('BRCopy', $event)" class="w-full p-2 text-sm border rounded-md" />
              </div>
              <p v-if="validationErrors.BRCopy" class="mt-2 text-sm text-red-600">{{ validationErrors.BRCopy }}</p>
            </div>
          

            <div class="">
              <label class="block text-sm font-bold text-gray-600">VAT Number</label>
              <input
                type="text"
                v-model="form.VATNo"
                @input="clearError('VATNo')"
                placeholder="Enter VATNo"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="validationErrors.VATNo" class="mt-2 text-sm text-red-600">
                {{ validationErrors.VATNo }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Description</label>
              <input
                type="text"
                v-model="form.Description"
                @input="clearError('Description')"
                placeholder="Enter Description"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="validationErrors.Description" class="mt-2 text-sm text-red-600">
                {{ validationErrors.Description }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Bank Details</h3>
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Name</label>
              <input type="text" v-model="form.BankName" @input="clearError('BankName')" placeholder="Enter Bank Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.BankName" class="mt-2 text-sm text-red-600">
                {{ validationErrors.BankName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Branch</label>
              <input type="text" v-model="form.Branch" @input="clearError('Branch')" placeholder="Enter Bank Branch"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.Branch" class="mt-2 text-sm text-red-600">
                {{ validationErrors.Branch }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Account No</label>
              <input type="text" v-model="form.AccountNumber" @input="clearError('AccountNumber')"
                placeholder="Enter ank Account No" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.AccountNumber" class="mt-2 text-sm text-red-600">
                {{ validationErrors.AccountNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Card Holder Name</label>
              <input type="text" v-model="form.HolderName" @input="clearError('HolderName')"
                placeholder="Enter Card Colder Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="validationErrors.HolderName" class="mt-2 text-sm text-red-600">
                {{ validationErrors.HolderName }}
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
      form: {
        FirstName: '',
        LastName: '',
        customerRef: '',
        Phone: '',
        Email: '',
        ShopAddress1: '',
        ShopAddress2: '',
        City: '',
        Description: '',
        VATNo: '',
        AccountNumber: '',
        BankName: '',
        Branch: '',
        ShopName: '',
        ShopContactNo: '',
        ShopLogo: null,
        VendorImage: null,
        ShopCoverImage: null,
        BRCopy: null,
        HolderName: ''
      },
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
    this.vendorStore = useVendorStore();
    await this.vendorStore.loadInitVendor(); // Await here once
    this.curVendor = this.vendorStore.curVendor;
    this.imageroot = this.vendorStore.initVendor.baseUrl;

    // Only assign the specific fields you need
    if (this.curVendor) {
      this.form.shopName = this.curVendor.ShopName || '';
      this.form.customerRef = this.curVendor.customerRef || ''; 
    }

    console.log('City :', this.vendorStore.initVendor);
  },
  methods: {
       closeModal() {
      this.isOpen = false;
      this.$emit('close');
    },
    clearError(field) {
      this.validationErrors[field] = '';
    },
    cancel() {
      // Clear the form and validation errors when canceling
      Object.keys(this.form).forEach((key) => {
        this.form[key] = '';
      });
      Object.keys(this.validationErrors).forEach((key) => {
        this.validationErrors[key] = '';
      });
      this.closeModal();
    },
    handleImageUpload(fieldName, event) {
      const file = event.target.files[0];
      if (file) {
        this.form[fieldName] = file;
      }
    },

    handleSubmit() {
        this.clearValidationErrors();

        let hasErrors = false;

        if (!this.form.FirstName) {
          this.validationErrors.FirstName = "Please enter First Name!";
          hasErrors = true;
        }
        if (!this.form.LastName) {
          this.validationErrors.LastName = "Please enter Last Name!";
          hasErrors = true;
        }
        if (!this.form.VendorImage) {
          this.validationErrors.VendorImage = "Please enter Image!";
          hasErrors = true;
        }
        if (!this.form.Email) {
          this.validationErrors.Email = 'Please enter an Email!';
          hasErrors = true;
        } else {
          const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!EmailRegex.test(this.form.Email)) {
            this.validationErrors.Email = 'Please enter a valid Email address!';
            hasErrors = true;
          }
        }if (!this.form.ShopName) {
          this.validationErrors.ShopName = "Please enter Company Name!";
          hasErrors = true;
        }if (!this.form.ShopContactNo) {
          this.validationErrors.ShopContactNo = 'Please enter Contact Number!';
          hasErrors = true;
        } else {
          const contactNoRegex = /^[0-9]{10}$/;
          if (!contactNoRegex.test(this.form.ShopContactNo)) {
            this.validationErrors.ShopContactNo = 'Please enter a valid 10-digit contact number!';
            hasErrors = true;
          }
        }if (!this.form.ShopAddress1) {
          this.validationErrors.ShopAddress1 = "Please enter Address1!";
          hasErrors = true;
        }if (!this.form.City) {
          this.validationErrors.City = "Please enter City!";
          hasErrors = true;
        }
        if (!this.form.Phone) {
          this.validationErrors.Phone = 'Please enter Phone Number!';
          hasErrors = true;
        } else {
          const contactNoRegex1 = /^[0-9]{10}$/;
          if (!contactNoRegex1.test(this.form.Phone)) {
            this.validationErrors.Phone = 'Please enter a valid 10-digit contact number!';
            hasErrors = true;
          }
        }
        if (!this.form.VATNo) {
          this.validationErrors.VATNo = "Please enter VATNo!";
          hasErrors = true;
        }
        if (!this.form.Description) {
          this.validationErrors.Description = "Please enter Description!";
          hasErrors = true;
        }

        // Simple validation: Company name must not be empty
        if (!this.form.BankName) {
          this.validationErrors.BankName = "Please enter Bank Name!";
          hasErrors = true;
        }
        if (!this.form.Branch) {
          this.validationErrors.Branch = "Please enter Branch!";
          hasErrors = true;
        }
        if (!this.form.HolderName) {
          this.validationErrors.HolderName = "Please enter Account Holder Name!";
          hasErrors = true;
        }
        if (!this.form.AccountNumber) {
          this.validationErrors.AccountNumber = "Please enter Account Number!";
          hasErrors = true;
        }

        // Validation for images (check if images are uploaded)
        if (!this.form.VendorImage) {
          this.validationErrors.VendorImage = "Please upload a Vendor Image!";
          hasErrors = true;
        }
        if (!this.form.ShopLogo) {
          this.validationErrors.ShopLogo = "Please upload a Shop Logo!";
          hasErrors = true;
        }
        if (!this.form.ShopCoverImage) {
          this.validationErrors.ShopCoverImage = "Please upload a Shop Cover Image!";
          hasErrors = true;
        }
        if (!this.form.BRCopy) {
          this.validationErrors.BRCopy = "Please upload a Shop BR!";
          hasErrors = true;
        }

        if (hasErrors) return; // Prevent submission if there are errors

        // Log the form data to the console
        console.log("Form Data:", this.form);

        // Pass the form data to the vendorStore
        this.vendorStore.addEditVendor(this.form);

        this.closeModal(); // Close modal after submission
    },



    clearValidationErrors() {
      Object.keys(this.validationErrors).forEach((key) => {
        this.validationErrors[key] = "";
      });
    },

    // convertToFormData(formObject) {
    //   const formData = new FormData();

    //   Object.keys(formObject).forEach((key) => {
    //     const value = formObject[key];
    //     if (value instanceof File) {
    //       formData.append(key, value);
    //     } else {
    //       formData.append(key, value);
    //     }
    //   });

    //   return formData;
    // },

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
  opaCity: 0.8;
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
