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
              <select v-model="selectedCustomerRef" class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
                placeholder="dd">
                <option value="" disabled selected>Select a vendor</option>
                <option v-for="vendor in vendorOptions" :key="vendor.id" :value="vendor.id">
                  {{ vendor.name }}
                </option>
              </select>
              <p v-if="validationErrors.customerRef" class="mt-2 text-xs text-red-500">{{ validationErrors.customerRef
                }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-4">
            <label class="block text-sm font-bold text-gray-600">Select a Package</label>
            <div class="grid grid-cols-4 gap-4 ">
              <div
                class="flex items-center border border-transparent rounded-2xl sm:border-gray-200 ps-4 dark:border-gray-700">
                <input id="bordered-radio-1" type="radio" value="bundles" name="bordered-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" v-model="selectedRadio"
                  @change="handleRadioChange('bundles')" />
                <label for="bordered-radio-1"
                  class="w-full py-4 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                  Bundles
                </label>
              </div>

              <div
                class="flex items-center border border-transparent rounded-2xl sm:border-gray-200 ps-4 dark:border-gray-700">
                <input id="bordered-radio-2" type="radio" value="subscriptions" name="bordered-radio"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" v-model="selectedRadio"
                  @change="handleRadioChange('subscriptions')" />
                <label for="bordered-radio-2"
                  class="w-full py-4 text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                  Subscriptions
                </label>
              </div>

            </div>
          </div>

          <!-- Show Bundles List -->
          <ul v-if="selectedRadio === 'bundles'" class="flex w-full gap-2 mt-4 overflow-x-auto no-scrollbar">
            <li class="flex-shrink-0 w-60" v-for="(item, index) in listBundles" :key="index" :value="item">
              <input type="checkbox" :id="'package-' + index" :value="item" v-model="selectedPackages"
                class="hidden peer" @change="selectPackage(item)" />
              <label :for="'package-' + index"
                class="flex flex-col w-full max-w-xs p-4 mb-4 transition-all duration-300 ease-in-out transform bg-white border-2 border-gray-200 shadow-sm cursor-pointer rounded-xl hover:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500">
                <div class="flex flex-col space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">
                      Package Name
                    </div>
                    <div class="flex justify-end mt-2">
                    </div>
                  </div>
                  <div class="text-xs font-medium text-gray-900 dark:text-gray-300">
                    <div class="text-xs font-semibold text-gray-900 dark:text-gray-900">
                      {{ item.productCount }} products
                    </div>
                    <div class="text-xs font-semibold text-gray-900 dark:text-gray-900">
                      {{ item.days }} Days
                    </div>
                    <div class="text-xs font-semibold text-gray-600 dark:text-gray-400">Banner Count: {{
                      item.bannerCount }}</div>
                    <div class="text-xs font-semibold text-gray-600 dark:text-gray-400">Featured: {{
                      item.featuredProductCount }}</div>
                    <div class="text-xs font-semibold text-gray-600 dark:text-gray-400">New Arrivals: {{
                      item.newArraivalCount }}</div>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="mt-2 text-sm font-bold text-blue-900 dark:text-blue-400">
                    LKR: {{ item.displayPrice }}
                  </div>

                  <div class="flex justify-end mt-2">
                    <span
                      class="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-gray-600">
                      Add
                    </span>
                  </div>
                </div>
              </label>
            </li>
          </ul>

          <!-- Show Subscriptions List -->
          <ul v-if="selectedRadio === 'subscriptions'" class="flex w-full gap-2 mt-4 overflow-x-auto no-scrollbar">
            <li class="flex-shrink-0 w-60" v-for="(item, index) in listSubscriptions" :key="index" :value="item">
              <input type="checkbox" :id="'package-' + index" :value="item" v-model="selectedPackages"
                class="hidden peer" @change="selectPackage(item)" />
              <label :for="'package-' + index"
                class="flex flex-col justify-between w-full p-4 mb-4 overflow-hidden transition duration-300 ease-in-out bg-white border-2 border-gray-200 shadow-sm cursor-pointer h-38 rounded-xl hover:border-blue-500 peer-checked:border-blue-600 peer-checked:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500 dark:peer-checked:border-blue-600">
                <div class="flex flex-col space-y-2">
                  <div class="flex items-center justify-between">
                    <div class="text-sm font-semibold text-gray-900 dark:text-white">
                      Package Name
                    </div>
                    <div class="flex justify-end mt-2">
                    </div>
                  </div>
                  <div class="text-xs font-medium text-gray-900 dark:text-gray-300">
                    <div class="text-xs font-semibold text-gray-900 dark:text-gray-900">
                      {{ item.productCount }} products
                    </div>
                    <div class="text-xs font-semibold text-gray-900 dark:text-gray-900">
                      {{ item.days }} Days
                    </div>
                    <div class="text-xs font-semibold text-gray-600 dark:text-gray-400">Banner Count: {{
                      item.bannerCount }}</div>
                    <div class="text-xs font-semibold text-gray-600 dark:text-gray-400">Featured: {{
                      item.featuredProductCount }}</div>
                    <div class="text-xs font-semibold text-gray-600 dark:text-gray-400">New Arrivals: {{
                      item.newArraivalCount }}</div>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="mt-2 text-sm font-bold text-blue-900 dark:text-blue-400">
                    LKR: {{ item.displayPrice }}
                  </div>

                  <div class="flex justify-end mt-2">
                    <span
                      class="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-gray-600">
                      Add
                    </span>
                  </div>
                </div>
              </label>
            </li>
          </ul>

          <p v-if="validationErrors.selectedRadio" class="text-xs text-red-500">{{ validationErrors.selectedRadio }}</p>


          <div class="grid grid-cols-1 gap-4 mt-4" v-if="selectedPackages.length > 0">
            <!-- Header Row -->
            <div
              class="hidden w-full p-2 text-center bg-gray-100 rounded-lg shadow-sm sm:p-2 dark:bg-gray-100 dark:border-gray-700 lg:block">
              <div
                class="grid grid-cols-1 gap-1 text-xs text-gray-700 uppercase sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <div class="p-2">Product Count</div>
                <div class="p-2">Days</div>
                <div class="p-2">Price</div>
                <div class="p-2">Discount</div>
                <div class="p-2">Total</div>
                <div class="p-2">Actions</div>
              </div>
            </div>

            <!-- Package Items -->
            <div
              class="w-full p-2 text-center bg-white rounded-lg shadow-sm sm:p-4 dark:bg-gray-100 dark:border-gray-700 overflow-y-auto max-h-[300px]">
              <div v-for="(packageItem, index) in selectedPackages" :key="index">
                <div
                  class="grid grid-cols-1 gap-4 py-2 text-xs text-gray-700 uppercase sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <div class="flex items-center justify-center">
                    <p class="mr-2 sm:hidden">Product Count : </p><strong>{{ packageItem.productCount }}</strong>
                  </div>
                  <div class="flex items-center justify-center">
                    <p class="mr-2 sm:hidden">Days : </p><strong>{{ packageItem.days }}</strong>
                  </div>
                  <div class="flex items-center justify-center">
                    <p class="mr-2 sm:hidden">Price :</p><strong> {{ packageItem.displayPrice }}</strong>
                  </div>

                  <!-- Discount Input -->
                  <div class="flex flex-col items-center justify-center">
                    <p class="mb-2 sm:hidden">Discount:</p>
                    <input type="text"
                      class="block p-1 text-xs text-gray-900 border border-gray-300 rounded-lg w-42 sm:w-12 bg-gray-50 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="10%" v-model="packageItem.discount" @input="updateTotalPrice(index)" />
                  </div>

                  <!-- Total Price -->
                  <div class="flex items-center justify-center">
                    <p class="mr-2 sm:hidden">Total :</p>
                    <strong>
                      {{ packageItem.discount && packageItem.discount > 0 ? packageItem.totalPrice :
                      packageItem.displayPrice }}
                    </strong>
                  </div>

                  <!-- Remove Button -->
                  <div class="flex items-center justify-center">
                    <button type="button" @click="removeRow(index)"
                      class="font-semibold text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
                <hr class="my-2 border-gray-300 dark:border-gray-600" />
              </div>
            </div>
          </div>

          <div v-else>
            <p class="mt-6 text-center text-gray-500">Please select a package</p>
          </div>

          <div class="flex flex-col md:min-h-screen sm:min-h-screen min-h-64">
            <div class="flex-grow"></div>
            <div class="sticky bottom-0 w-full p-4 bg-white">
              <div class="flex justify-end">
                <div class="flex items-center justify-between w-64 p-4 bg-white rounded-lg shadow-md">
                  <p class="text-sm text-gray-500">Subtotal</p>
                  <div class="flex items-center">
                    <p class="text-xl font-medium text-gray-900">LKR: {{ subtotal }}</p>
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
import { useQuotationStore } from "~/stores/modules/qms/quotationStore";

export default {
  components: { closebtn },
  data() {
    return {
      isOpen: true,
      curVendor: {},
      validationErrors: {
        customerRef: "",
        selectedRadio: ""
      },
      form: {},
      vendorOptions: [],
      categoryOptions: [],
      selectedRadio: null,
      selectedPackages: [],
    };
  },

  computed: {
    listBundles() {
      return this.categoryOptions?.listBundles || [];
    },
    listSubscriptions() {
      return this.categoryOptions?.listSubsrSubscriptions || [];
    },
    subtotal() {
      return this.selectedPackages.reduce((total, packageItem) => {
        const totalPrice = parseFloat(packageItem.totalPrice);
        const displayPrice = parseFloat(packageItem.displayPrice.replace(/[^0-9.-]+/g, ""));
        return total + (isNaN(totalPrice) ? displayPrice : totalPrice);
      }, 0).toFixed(2);
    },

  },

  created() {
    this.quotationStore = useQuotationStore();
    this.vendorOptions = this.quotationStore.qEdit.initQuotationEdit.vendorOptions;
    this.categoryOptions = this.quotationStore.initQuotation;

    // console.log('Updated categoryOptions:', this.categoryOptions);
    // console.log('Subscriptions:', this.categoryOptions?.listSubsrSubscriptions);
  },

  methods: {
    handleRadioChange(type) {
      this.selectedRadio = type;
      this.selectedItemId = null;
    },

    selectPackage(item) {
      console.log('Selected item:', item);
    },

    handlePackage() {
      if (this.selectedPackages.length === 0) {
        this.validationErrors.selectedRadio = 'Please select at least one package.';
      } else {
        this.validationErrors.selectedRadio = '';
        // Show the selected packages data in the alert
        alert('Selected Packages: ' + JSON.stringify(this.selectedPackages));
      }
    },
    updateTotalPrice(index) {
      const packageItem = this.selectedPackages[index];

      // Ensure the discount is a valid number
      let discount = parseFloat(packageItem.discount);
      if (isNaN(discount)) discount = 0; // If discount is not a valid number, default to 0.

      // Parse the price (if it's a string, remove any non-numeric characters, like '$')
      let price = parseFloat(packageItem.displayPrice.replace(/[^0-9.-]+/g, ""));
      if (isNaN(price)) price = 0; // If price is invalid, set to 0.

      // Calculate the discount amount
      const discountAmount = (price * (discount / 100));
      const totalPrice = price - discountAmount;
      console.log('totalPrice:', totalPrice);

      // Update the total price
      packageItem.totalPrice = totalPrice.toFixed(2);
    },


    removeRow(index) {
      this.selectedPackages.splice(index, 1);
    },


    handleSubmit() {
      this.clearValidationErrors();
      let hasErrors = false;

      // Check if vendor is selected
      if (!this.selectedCustomerRef) {
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
