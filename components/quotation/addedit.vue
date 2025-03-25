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
          <!-- <h3 class="font-bold">Select Vendor</h3> -->
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-bold text-gray-600">Select Vendor</label>
              <select
                v-model="selectedCustomerRef"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
              >
                <option value="" disabled selected>Select a vendor</option>vendorOptions
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
              <div>
                <select
                  v-model="selectedBundle"
                  class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
                >
                  <option value="" disabled selected>Select a Bundles</option>
                  <option v-for="category in bundleOptions" :key="category.id" :value="category.value">
                    {{ category.label }}
                  </option>
                </select>
              </div>
              <div>
                <select
                  class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
                >
                  <option value="" disabled selected>Select a Subscription</option>
                </select>
              </div>
          

            </div>
            <ul class="grid w-full gap-6 mt-4 md:grid-cols-4">
              <li v-for="(packageItem, index) in QuotationPackage" :key="index">
                <input
                  type="radio"
                  :id="'package-' + index"
                  name="packageSelection"
                  :value="packageItem.PackageName"
                  class="hidden peer"
                  v-model="selectedPackage"
                  required
                />
                <label
                  :for="'package-' + index"
                  class="flex flex-col justify-between w-full p-5 overflow-hidden transition duration-300 ease-in-out bg-white border-2 border-gray-200 shadow-sm cursor-pointer h-38 rounded-xl hover:border-blue-500 peer-checked:border-blue-600 peer-checked:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500 dark:peer-checked:border-blue-600"
                >
                  <div class="flex items-center space-x-3">
                    <div>
                      <div class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ packageItem.PackageName }}
                      </div>
                      <div class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {{ packageItem.Description }}
                      </div>
                      <div class="text-sm font-semibold text-gray-800 truncate dark:text-gray-400">
                        {{ packageItem.Period }} Month
                      </div>
                    </div>
                  </div>
                  <div class="text-lg font-bold text-blue-900 dark:text-blue-400">
                    LKR: {{ packageItem.Price }}.00
                  </div>
                </label>
              </li>
            </ul>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <button type="button" @click="addPackage" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:focus:ring-blue-800">Add Package</button>
          </div>
          <div class="grid grid-cols-1 gap-4 mt-4"> 
            <div class="max-w-full overflow-x-auto" v-if="selectedPackages.length > 0">
              <div class="overflow-y-auto max-h-64">
              <table class="min-w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">Package</th>
                    <th scope="col" class="px-6 py-3">Category</th>
                    <th scope="col" class="px-6 py-3">Period</th>
                    <th scope="col" class="px-6 py-3">Qut</th>
                    <th scope="col" class="px-6 py-3">Discount</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Total</th>
                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="overflow-y-auto">
                  <tr v-for="(packageItem, index) in selectedPackages" :key="index" class="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <td class="px-6 py-4">{{ packageItem.PackageName }}</td>
                    <td class="px-6 py-4">{{ packageItem.Category }}</td>
                    <td class="px-6 py-4">{{ packageItem.Period }} Months</td>
                    <td class="px-6 py-4">
                      <input
                        type="number"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1"
                        v-model="packageItem.quantity"
                        @input="updatePrice(index)"
                        required
                      />
                    </td>
                    <td class="px-6 py-4">
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-10 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="10%"
                        v-model="packageItem.discount"
                        @input="updatePrice(index)"
                        required
                      />
                    </td>
                    <td class="px-6 py-4 text-right">{{ packageItem.Price }}.00</td>
                    <!-- Final Price After Discount (Single Price) -->
                    <td class="px-6 py-4 text-right">
                      <p>{{ calculatePrice(packageItem) }}.00</p>
                    </td>
                    <td class="px-6 py-4 text-right">
                      <button
                        @click="removePackage(index)"
                        class="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
            <div v-else>
              <p class="text-center text-gray-500">Please select a package</p>
            </div>
          </div>
          <div class="flex flex-col min-h-64">
            <div class="flex-grow">
            </div>
            <div class="sticky bottom-0 w-full p-4 bg-white ">
              <div class="flex justify-end">
                <div class="flex items-center justify-between w-64 p-4 bg-white rounded-lg shadow-md">
                  <p class="text-sm text-gray-500">Subtotal</p>
                  <div class="flex items-center">
                    <p class="text-xl font-medium text-gray-900">LKR: {{ calculateTotalPrice() }}.00</p>
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
import { reactive, computed} from "vue";
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
      selectedBundle: '',  
      selectedCustomerRef: '',
      selectedPackage: '',
      selectedPackages: [],
      QuotationPackage: [],
      vendorOptions: [],
      bundleOptions: [],
    };
  },
  
  computed: {
    packageOptions() {
      return this.quotationStore.qEdit.initQuotationEdit.packageOptions[this.selectedBundle] || [];
    }
  },

  created() {
    this.quotationStore = useQuotationStore();
    this.vendorOptions = this.quotationStore.qEdit.initQuotationEdit.vendorOptions;
    this.bundleOptions = this.quotationStore.qEdit.initQuotationEdit.bundleOptions;

    this.QuotationPackage = this.packageOptions;

    console.log('Updated customerOptions:', this.vendorOptions);
    console.log('Updated bundleOptions:', this.bundleOptions);
    console.log('Updated packageOptions:', this.packageOptions);
  },

  watch: {
    selectedBundle(newBundle) {
      this.QuotationPackage = this.quotationStore.qEdit.initQuotationEdit.packageOptions[newBundle] || [];
    }
  },

  methods: {
    addPackage() {
      if (this.selectedBundle && this.selectedPackage) {
        const selectedPackageItem = this.QuotationPackage.find(
          (pkg) => pkg.PackageName === this.selectedPackage
        );

        this.selectedPackages.push({
          ...selectedPackageItem,
          Bundle: this.selectedBundle,
        });

        this.selectedBundle = '';
        this.selectedPackage = '';
      } else {
        alert('Please select both a category and a package.');
      }
    },

    removePackage(index) {
      this.selectedPackages.splice(index, 1);
    },

    updatePrice(index) {
      const packageItem = this.selectedPackages[index];
      // Ensure quantity is at least 1
      const quantity = packageItem.quantity || 1;
      // Calculate discount (if any)
      const discount = parseFloat(packageItem.discount) || 0;
      // Calculate the discount amount and apply it
      let totalDiscount = discount / 100; 
      // Apply the discount and multiply by the quantity
      const discountedPrice = packageItem.Price - (packageItem.Price * totalDiscount);
      // Set the final price (quantity is considered here)
      packageItem.finalPrice = discountedPrice * quantity;
    },
    calculatePrice(packageItem) {
      return packageItem.finalPrice || packageItem.Price;  
    },
    calculateTotalPrice() {
      return this.selectedPackages.reduce((total, packageItem) => {
        const price = packageItem.finalPrice || packageItem.Price;
        return total + price;
      }, 0);
    },

    handleSubmit() {
      this.clearValidationErrors();
      let hasErrors = false;
      // Check if vendor is selected
      if (!this.form.customerRef) {
        this.validationErrors.customerRef = "Please select a vendor!";
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
