<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Create Quotation
          <!-- Quotation {{ isEditing ? "Edit" : "Add" }} -->
        </h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div class="grid grid-cols-1 md:grid-cols-2 my-2 gap-2">
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >Select Merchant</label
              >
              <serach_Input
                :arrItems="quotationStore.initQuotation.listVendors"
                ref="refDistrict"
                label=""
                v-model="quotation.merchantId"
                @selectItem="GetSelectMerchant"
              />
              <p v-if="err.merchantId" class="mt-2 text-xs text-red-500">
                {{ err.merchantId }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >Select Main District</label
              >

              <serach_Input
                :arrItems="quotationStore.initQuotation.listDistricts"
                ref="refDistrict"
                label=""
                v-model="quotation.mainDistrictId"
                @selectItem="GetSelectMainDistrict"
              />
              <p v-if="err.mainDistrictId" class="mt-2 text-xs text-red-500">
                {{ err.mainDistrictId }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 my-4">
            <label class="block text-sm font-bold text-gray-600">
              Maximum 4 Districts can be selected including main district</label
            >

            <inputtags_search
              class="w-full"
              :arrItems="quotationStore.initQuotation.listDistricts"
              @GetSelectedIds="GetSelectedOtherDistrictIds"
            />
          </div>
          <div class="grid grid-cols-2 my-4">
            <div>
              <label class="block text-sm font-bold text-gray-600">
                Select Product Category</label
              >

              <selectinput2
                class="my-2"
                v-model="curProductCategory"
                :cur_item="curProductCategory"
                :selections="quotationStore.initQuotation.listProductCategory"
                :err="err.curProductCategory"
                label=""
                @changed="changedcurProductCategory"
              />
              <p
                v-if="err.curProductCategory"
                class="mt-2 text-xs text-red-500"
              >
                {{ err.curProductCategory }}
              </p>
            </div>
          </div>

          <!-- Show Bundles List -->
          <label
            class="block text-sm font-bold text-gray-600"
            v-if="curPkgList.length > 0"
          >
            Available Packages</label
          >

          <div class="grid grid-cols-1 my-2">
            <!-- Package List -->
            <ul class="flex w-full gap-2 mt-4 overflow-x-auto no-scrollbar">
              <li
                class="flex-shrink-0 w-60"
                v-for="(pkg, index) in curPkgList"
                :key="index"
              >
                <div
                  class="flex flex-col w-full max-w-xs p-4 mb-4 transition-all duration-300 ease-in-out transform bg-white border-2 border-gray-200 shadow-sm cursor-pointer rounded-xl hover:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-blue-500"
                >
                  <div class="flex flex-col space-y-2">
                    <div class="flex items-center justify-between">
                      <div
                        class="text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        {{ pkg.packageName }}
                      </div>
                      <div class="flex justify-end mt-2"></div>
                    </div>
                    <div
                      class="text-xs font-medium text-gray-900 dark:text-gray-300"
                    >
                      <div
                        class="text-xs font-semibold text-gray-900 dark:text-gray-900"
                        v-html="pkg.packageDescription"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div
                        class="mt-2 text-sm font-bold text-blue-900 dark:text-blue-400"
                      >
                        LKR: {{ pkg.packageShowPrice }}
                      </div>

                      <div
                        class="flex justify-end mt-2"
                        @click="GetAddPkg(pkg)"
                      >
                        <span
                          class="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-gray-600"
                        >
                          Add
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <!-- End Package List -->
          </div>

          <!-- Start order item section -->
          <div>
            <div
              class="grid grid-cols-1 gap-4 mt-4"
              v-if="quotation.listOrderItem.length > 0"
            >
              <!-- Header Row -->
              <div
                class="hidden w-full p-2 text-center bg-gray-100 rounded-lg shadow-sm sm:p-2 dark:bg-gray-100 dark:border-gray-700 lg:block"
              >
                <div
                  class="grid grid-cols-1 gap-1 text-xs text-gray-700 uppercase sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
                >
                  <div class="p-2">Index</div>
                  <div class="p-2">Description</div>
                  <div class="p-2">Unit Price</div>
                  <div class="p-2">Qty</div>
                  <div class="p-2">
                    Discount
                    <span class="text-xs font-bold text-red-500">(Rs.)</span>
                  </div>
                  <div class="p-2">Total</div>
                </div>
              </div>

              <!-- Package Items -->
              <div
                class="w-full p-2 text-center bg-white rounded-lg shadow-sm sm:p-4 dark:bg-gray-100 dark:border-gray-700 overflow-y-auto max-h-[300px]"
              >
                <div
                  v-for="(orderItem, index) in quotation.listOrderItem"
                  :key="index"
                >
                  <div
                    class="grid grid-cols-1 gap-4 py-2 text-xs text-gray-700 uppercase sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 relative"
                  >
                    <div class="flex items-center justify-center">
                      <p class="mr-2 sm:hidden">Index:</p>
                      <strong>{{ orderItem.index }}</strong>
                    </div>
                    <div class="flex items-center justify-center">
                      <p class="mr-2 sm:hidden">Description:</p>
                      <strong>{{ orderItem.packageName }} [{{ orderItem.packageCategory }}]</strong>
                    </div>
                    <div class="flex items-center justify-center">
                      <p class="mr-2 sm:hidden">Unit Price :</p>
                      <strong>
                        {{ this.$myUtility.toLKR(orderItem.unitPrice) }}</strong
                      >
                    </div>
                    <div class="flex items-center justify-center">
                      <p class="mr-2 sm:hidden">Qty:</p>
                      <strong> {{ orderItem.qty }}</strong>
                    </div>

                    <!-- Discount Input -->
                    <div class="flex flex-col items-center justify-center">
                      <p class="mb-2 sm:hidden">Discount:</p>
                      <input
                        type="text"
                        class="block p-1 text-xs text-gray-900 border border-gray-300 rounded-lg w-42 sm:w-12 bg-gray-50 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="In Rupees"
                        v-model="orderItem.discount"
                      />
                      <!-- @input="updateTotalPrice(index)" -->
                    </div>

                    <!-- Total Price -->
                    <div class="flex items-center justify-center">
                      <p class="mr-2 sm:hidden">Total:</p>
                      <strong>
                        {{ this.$myUtility.toLKR(orderItem.total) }}
                      </strong>
                    </div>

                    <!-- Remove Button -->
                    <div class="absolute right-0 top-0 -mt-4 -mr-4">
                      <button
                        type="button"
                        @click="GetRemoveRow(index)"
                        class="font-semibold text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr class="my-2 border-gray-300 dark:border-gray-600" />
                </div>
              </div>
            </div>

            <div v-else>
              <p class="mt-6 text-center text-gray-500">
                Please select a packages
              </p>
            </div>
          </div>
          <!-- End order item section -->

          <!-- Quotation Summery Section -->
          <div class="flex flex-col md:min-h-screen sm:min-h-screen min-h-64">
            <div class="flex-grow"></div>
            <div class="sticky bottom-0 w-full p-4 bg-white">
              <div class="flex justify-end">
                <div
                  class="flex items-center justify-between w-64 p-4 bg-white rounded-lg shadow-md"
                >
                  <p class="text-sm text-gray-500">Subtotal</p>
                  <div class="flex items-center">
                    <p class="text-xl font-medium text-gray-900">
                      {{ this.$myUtility.toLKR(quotation.netTotal) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--End  Quotation Summery Section -->
          {{ quotation.quotation }}
        </div>
      </div>
      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Discard</button>
        <button @click="GetPrint" class="confirm-button">Print</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import serach_Input from "~/components/customcontrol/SearchInput";
import inputtags_search from "~/components/customcontrol/inputtags_search";
import selectinput2 from "~/components/customcontrol/selectinput2";
import Button from "~/components/customcontrol/Button";

import { useQuotationStore } from "~/stores/modules/qms/quotationStore";

export default {
  components: {
    closebtn,
    serach_Input,
    inputtags_search,
    selectinput2,
    Button,
  },
  data() {
    return {
      isOpen: true,

      err: {
        merchantId: "",
        mainDistrictId: "",
        curProductCategory: "",
      },

      selectedPackages: [],
      showLoading: null, 

      curProductCategory: "",
      quotation: {
        currentQNo:'',
        isVerion:false,
        merchantId: "",
        mainDistrictId: "",
        listAdditionalDistricts: [],
        listOrderItem: [],
        vat:0.00,
        netTotal: 0.0,
        installment:1,
        listInstallment:[],
      },


      curPkgList: [],
    };
  },

  computed: {
    subtotal() {
      return this.selectedPackages
        .reduce((total, packageItem) => {
          const totalPrice = parseFloat(packageItem.totalPrice);
          const displayPrice = parseFloat(
            packageItem.displayPrice.replace(/[^0-9.-]+/g, "")
          );
          return total + (isNaN(totalPrice) ? displayPrice : totalPrice);
        }, 0)
        .toFixed(2);
    },
  },

  async created() {
    this.showLoading = this.$showLoading;
    this.quotationStore = useQuotationStore();
    await this.quotationStore.loadInitQuotation(this.showLoading);
  },

  methods: {
    GetSelectMerchant(id) {
      this.quotation.merchantId = id;
    },
    GetSelectMainDistrict(id) {
      this.quotation.mainDistrictId = id;
    },
    GetSelectedOtherDistrictIds(listIds) {
      if (listIds.length < this.quotationStore.initQuotation.noOfMaxDistricts) {
        this.quotation.listAdditionalDistricts = listIds;
      } else {
        this.$showAlert("Maximum four districts can be selected!", "error");
      }
    },
    changedcurProductCategory(type) {
      this.curProductCategory = type;
      if (type == "ProductLinks") {
        this.curPkgList =
          this.quotationStore.initQuotation.listPackageProductLinks;
      } else if (type == "ServiceLinks") {
        this.curPkgList =
          this.quotationStore.initQuotation.listPackageServiceLinks;
      } else if (type == "HybridLinks") {
        this.curPkgList =
          this.quotationStore.initQuotation.listPackageHybridLinks;
      } else if (type == "Bundles") {
        this.curPkgList = this.quotationStore.initQuotation.listBundles;
      }
    },
    GetAddPkg(pkg) {
      let orderItem = {
        index: this.quotation.listOrderItem.length + 1,
        packageId:pkg.id,
        packageCategory:pkg.packageCategory,       
        unitPrice: pkg.packagePrice,
        qty: 1,
        discount: 0.0,
        total: pkg.packagePrice,
      };
      this.quotation.listOrderItem.push(orderItem);
    },
    GetRemoveRow(index) {
      this.quotation.listOrderItem.splice(index, 1);
    },
    clearerr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },
    GetPrint() {      
      if(!this.IsValidated()) return;
      console.log(JSON.stringify(this.quotation))



      
    //this.clearerr();
      //this.closeModal();
    },

    IsValidated(){
     let isValidated = true;

    //  // Check if vendor is selected
    //   if (!this.selectedCustomerRef) {
    //     this.err.customerRef = "Please select a vendor!";
    //     hasErrors = true;
    //   }

    //   // Validate radio button selection
    //   if (!this.selectedRadio) {
    //     this.err.selectedRadio =
    //       "Please select a package type (Bundles or Subscriptions)!";
    //     hasErrors = true;
    //   }

    //   if (hasErrors) return;

     return isValidated;
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },
    ProcessOrderItems(){
     //loop  listOrderItem
     //{
     //reindexing
     //calc vat, calc net 
     //}
    },

















    handleRadioChange(type) {
      this.selectedRadio = type;
      this.selectedItemId = null;
    },

    selectPackage(item) {
      console.log("Selected item:", item);
    },

    handlePackage() {
      if (this.selectedPackages.length === 0) {
        this.err.selectedRadio = "Please select at least one package.";
      } else {
        this.err.selectedRadio = "";
        // Show the selected packages data in the alert
        alert("Selected Packages: " + JSON.stringify(this.selectedPackages));
      }
    },
    updateTotalPrice(index) {
      const packageItem = this.selectedPackages[index];

      // Ensure the discount is a valid number
      let discount = parseFloat(packageItem.discount);
      if (isNaN(discount)) discount = 0; // If discount is not a valid number, default to 0.

      // Parse the price (if it's a string, remove any non-numeric characters, like '$')
      let price = parseFloat(
        packageItem.displayPrice.replace(/[^0-9.-]+/g, "")
      );
      if (isNaN(price)) price = 0; // If price is invalid, set to 0.

      // Calculate the discount amount
      const discountAmount = price * (discount / 100);
      const totalPrice = price - discountAmount;
      console.log("totalPrice:", totalPrice);

      // Update the total price
      packageItem.totalPrice = totalPrice.toFixed(2);
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
