<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Quotation {{ isEditing ? "Edit" : "Add" }}
        </h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-bold text-gray-600">Select Vendor</label>
              <select
                v-model="selectedCustomerRef"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
              >
                <option value="" disabled selected>Select a vendor</option>
                <option v-for="vendor in vendorOptions" :key="vendor.id" :value="vendor.id">
                  {{ vendor.name }}
                </option>
              </select>
              <p v-if="validationErrors.customerRef" class="mt-2 text-xs text-red-500">{{ validationErrors.customerRef }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-4">
            <label class="block text-sm font-bold text-gray-600">Select a Package</label>
            <div class="grid grid-cols-4 gap-4 ">
              <div class="flex items-center border border-gray-200 rounded-sm ps-4 dark:border-gray-700">
                <input 
                  id="bordered-radio-1" 
                  type="radio" 
                  value="bundles" 
                  name="bordered-radio" 
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  v-model="selectedRadio" 
                  @change="handleRadioChange('bundles')" 
                />
                <label for="bordered-radio-1" class="w-full py-4 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                  Bundles
                </label>
              </div>

              <div class="flex items-center border border-gray-200 rounded-sm ps-4 dark:border-gray-700">
                <input 
                  id="bordered-radio-2" 
                  type="radio" 
                  value="subscriptions" 
                  name="bordered-radio" 
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  v-model="selectedRadio" 
                  @change="handleRadioChange('subscriptions')" 
                />
                <label for="bordered-radio-2" class="w-full py-4 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                  Subscriptions
                </label>
              </div>
            </div>

            <!-- Show Bundles List -->
            <ul v-if="selectedRadio === 'bundles'" class="grid w-full gap-6 mt-4 md:grid-cols-4">
              <li v-for="(item, index) in listBundles" :key="index" :value="item">
                <input
                  type="radio"
                  :id="'package-' + index"
                  name="packageSelection"
                  :value="item.PackageName"
                  class="hidden peer"
                  v-model="selectedPackage"
                  @change="addPackage(item)" 
                  required
                />
                <label
                  :for="'package-' + index"
                  class="flex flex-col justify-between w-full p-2 overflow-hidden transition duration-300 ease-in-out bg-white border-2 border-gray-200 shadow-sm cursor-pointer h-38 rounded-xl hover:border-blue-500 peer-checked:border-blue-600 peer-checked:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500 dark:peer-checked:border-blue-600"
                >
                  <div class="flex items-center space-x-3">
                    <div>
                      <div class="text-sm font-semibold text-gray-900 dark:text-white">
                        {{ item.productCount }} products
                      </div>
                      <div class="text-sm font-semibold text-gray-800 truncate dark:text-gray-400">
                        {{ item.days }} Days
                      </div>
                    </div>
                  </div>
                  <div class="text-sm font-bold text-blue-900 dark:text-blue-400">
                    LKR: {{ item.displayPrice }}
                  </div>
                </label>
              </li>
            </ul>

            <!-- Show Subscriptions List -->
            <ul v-if="selectedRadio === 'subscriptions'" class="grid w-full gap-6 mt-4 md:grid-cols-4">
              <li v-for="(item, index) in listSubscriptions" :key="index" :value="item">
                <input
                  type="radio"
                  :id="'package-' + index"
                  name="packageSelection"
                  :value="item.PackageName"
                  class="hidden peer"
                  v-model="selectedPackage"
                  @change="addPackage(item)" 
                  required
                />
                <label
                  :for="'package-' + index"
                  class="flex flex-col justify-between w-full p-2 overflow-hidden transition duration-300 ease-in-out bg-white border-2 border-gray-200 shadow-sm cursor-pointer h-38 rounded-xl hover:border-blue-500 peer-checked:border-blue-600 peer-checked:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500 dark:peer-checked:border-blue-600"
                >
                  <div class="flex items-center space-x-3">
                    <div>
                      <div class="text-sm font-semibold text-gray-900 dark:text-white">
                        {{ item.productCount }} products
                      </div>
                      <div class="text-sm font-semibold text-gray-800 truncate dark:text-gray-400">
                        {{ item.days }} Days
                      </div>
                    </div>
                  </div>
                  <div class="text-sm font-bold text-blue-900 dark:text-blue-400">
                    LKR: {{ item.displayPrice }}
                  </div>
                </label>
              </li>
            </ul>

            <p v-if="validationErrors.selectedRadio" class="text-xs text-red-500">{{ validationErrors.selectedRadio }}</p>

          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <button type="button" @click="addPackage" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800">Add Package</button>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-4">
            <div class="max-w-full overflow-x-auto">
              <div class="overflow-y-auto max-h-64">
                <table class="min-w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">Product Count</th>
                      <th scope="col" class="px-6 py-3">Days</th>
                      <th scope="col" class="px-6 py-3">Price</th>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(packageItem, index) in selectedPackages" :key="index">
                      <td class="px-6 py-4">{{ packageItem.productCount }}</td>
                      <td class="px-6 py-4">{{ packageItem.days }}</td>
                      <td class="px-6 py-4">{{ packageItem.displayPrice }}</td>
                      <td class="px-6 py-4 text-right">
                        <button @click="removePackage(index)" class="font-medium text-red-600">Remove</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="flex flex-col min-h-64">
            <div class="flex-grow"></div>
            <div class="sticky bottom-0 w-full p-4 bg-white">
              <div class="flex justify-end">
                <div class="flex items-center justify-between w-64 p-4 bg-white rounded-lg shadow-md">
                  <p class="text-sm text-gray-500">Subtotal</p>
                  <div class="flex items-center">
                    <p class="text-xl font-medium text-gray-900">LKR: 500.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="handleSubmit" class="confirm-button">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import { useQuotationStore } from "~/stores/modules/quotationStore";

export default {
  components: { closebtn },
  data() {
    return {
      isOpen: true,
      curVendor: {},
      validationErrors: {},
      form: {},
      selectedCustomerRef: '',
      vendorOptions: [],
      categoryOptions: [],
      selectedRadio: null, // Default selection
      selectedPackages: [], // Store the added packages
      selectedPackage: null, // Store the selected package temporarily
    };
  },

  computed: {
    listBundles() {
      return this.categoryOptions?.listBundles || [];
    },
    listSubscriptions() {
      return this.categoryOptions?.listSubsrSubscriptions || [];
    },
  },

  created() {
    this.quotationStore = useQuotationStore();
    this.vendorOptions = this.quotationStore.qEdit.initQuotationEdit.vendorOptions;
    this.categoryOptions = this.quotationStore.initQuotation;

    console.log('Updated categoryOptions:', this.categoryOptions);
    console.log('Subscriptions:', this.categoryOptions?.listSubsrSubscriptions);
  },

  methods: {
    handleRadioChange(value) {
      this.selectedRadio = value;
      this.selectedPackage = ''; 
    },

    addPackage(item) {
      if (!item) {
        alert('Selected package not found!');
        return;
      }

      if (this.selectedPackages.some((pkg) => pkg.PackageName === item.PackageName)) {
        alert('This package is already added!');
        return; // Prevent adding duplicate packages
      }

      this.selectedPackages.push(item);
      this.selectedPackage = ''; 

      console.log('Selected packages:', this.selectedPackages);
    },

    removePackage(index) {
      // Remove the selected package from the array
      this.selectedPackages.splice(index, 1);
    },

    handleSubmit() {
      this.clearValidationErrors();
      let hasErrors = false;

      // Check if vendor is selected
      if (!this.form.customerRef) {
        this.validationErrors.customerRef = "Please select a vendor!";
        hasErrors = true;
      }

      // Validate radio button selection
      if (!this.selectedRadio) {
        this.validationErrors.selectedRadio = "Please select a package type (Bundles or Subscriptions)!";
        hasErrors = true;
      }

      if (hasErrors) return;

      this.closeModal();
    },

    clearValidationErrors() {
      Object.keys(this.validationErrors).forEach((key) => {
        this.validationErrors[key] = "";
      });
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
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
  max-width: 950px;
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
