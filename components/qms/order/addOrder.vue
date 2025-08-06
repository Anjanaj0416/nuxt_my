<template>
  <section class="justify-center">
    <div class="flex flex-col items-center justify-between mt-4 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">  
        <div class="text-2xl uppercase">Order {{ isEditing ? "Edit" : "Add" }}</div>
      </div>
      <div class="w-full md:w-auto">
      </div>
    </div>
    <!-- {{ id }} -->

    <!-- <pre>{{ JSON.stringify(orderStore.order, null, 2) }}</pre> -->

    <div class="form-content bg-white mt-4 border rounded-lg shadow-md p-4 space-y-1 text-sm text-gray-800">
     
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-4 gap-8">
        <div>
          <label class="block text-sm font-bold text-gray-600">Select Product Category</label>
            <select
                v-model="curProductCategory"
                @change="handleCategoryChange"
                class="w-full border border-gray-300 rounded px-3 py-2 mt-2"
                >
                <option disabled value="">-- Select Category --</option>
                <option
                    v-for="cat in finalProductCategoryList"
                    :key="cat.id"
                    :value="cat.id"
                >
                    {{ cat.value }}
                </option>
            </select>

            <p v-if="err.curProductCategory" class="text-red-500 text-sm mt-1">
            {{ err.curProductCategory }}
            </p>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            PI Number Issued?
          </label>
          <div class="flex items-center space-x-4">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="piIssued" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 relative transition-all duration-300"
              >
                <div
                  class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform
                  peer-checked:translate-x-5"
                ></div>
              </div>
            </label>
            <span class="text-sm font-medium text-gray-900 transition">
              {{ piIssued ? 'Yes' : 'No' }}
            </span>
          </div>
        </div>

        <!-- PI Number Input (Conditional) -->
        <div v-if="piIssued" class="transition-all duration-300">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            Enter PI Number
          </label>
          <input
            type="text"
            v-model="piNumber"
            placeholder="Enter PI Number"
            class="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            rounded-lg px-4 py-2 text-sm bg-gray-50 transition duration-300"
          />
        </div>
      </div>

    <!-- Package -->

    <!-- <pre>{{ JSON.stringify(curPkgList, null, 2) }}</pre> -->

    <div>
      <label class="block text-sm font-bold text-gray-600" v-if="listoPackagesDetails.length > 0">Available Packages</label>
      <div class="grid grid-cols-1 my-2">
        <!-- Package List -->
        <ul class="flex w-full gap-2 mt-4 overflow-x-auto no-scrollbar">
          <li
            class="flex-shrink-0 w-60"
            v-for="(pkg, index) in listoPackagesDetails"
            :key="index"
          >
            <div
              class="flex flex-col w-full max-w-xs p-4 mb-4 transition-all duration-300 ease-in-out transform bg-white border-2 border-gray-200 shadow-sm cursor-pointer rounded-xl hover:border-blue-500"
            >
              <div class="flex flex-col space-y-2">
                <div class="flex items-center justify-between">
                  <div
                    class="text-sm font-semibold text-gray-900 "
                  >
                    {{ pkg.categoryName }}
                  </div>
                  <div class="flex justify-end mt-2"></div>
                </div>
                <div
                  class="text-xs font-medium text-gray-900 dark:text-gray-900"
                >
                  <div
                    class="text-xs font-semibold text-gray-900 dark:text-gray-900"
                    v-html="pkg.itemDescription"
                  ></div>
                  <div class="text-xs font-semibold text-gray-900 dark:text-gray-900">
                    {{ pkg.isTaxable ? 'Include tax' : 'Not include tax' }}
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div
                    class="mt-2 text-sm font-bold text-blue-900 dark:text-blue-900"
                  >
                    LKR: {{ pkg.showPrice }}
                  </div>

                  <div
                    class="flex justify-end mt-2"
                    @click="GetAddPkg(pkg)"
                  >
                    <span
                      class="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full"
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
          v-if="order?.listOrderItem?.length > 0"
        >

          <!-- Header Row -->
          <div class="hidden w-full p-2 text-center bg-gray-100 rounded-lg shadow-sm sm:p-2 dark:bg-gray-100 dark:border-gray-700 lg:block">
            <div
              class="grid grid-cols-1 gap-1 text-xs text-gray-700 uppercase sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9"
            >
              <div class="p-2">Index</div>
              <div class="p-2">Description</div>
              <div class="p-2">Unit Price</div>
              <div class="p-2">qty</div>
              <div class="p-2">
                Discount
                <span class="text-xs font-bold text-red-500">(Rs.)</span>
              </div>
              <div class="p-2">
                SSL
                <span class="text-xs font-bold text-red-500">(Rs.)</span>
              </div>
              <div class="p-2">
                VAT
                <span class="text-xs font-bold text-red-500">(Rs.)</span>
              </div>
              <div class="p-2">Total</div>
              <div class="p-2"></div>
            </div>
          </div>

          <!-- Package Items -->
          <div class="w-full p-2 text-center bg-white rounded-lg shadow-sm sm:p-4 dark:bg-gray-100 dark:border-gray-700 overflow-y-auto max-h-[300px]">
            <div
              v-for="(orderItem, index) in order.listOrderItem"
              :key="index"
            >
          <div>
              <div
                class="relative grid grid-cols-1 gap-4 py-2 text-xs text-gray-700 uppercase sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9"
              >
                <div class="flex items-center justify-center">
                  <p class="mr-2 sm:hidden">Index:</p>
                  <strong>{{ index + 1 }}</strong>
                </div>
                <div class="flex items-center justify-center">
                  <p class="mr-2 sm:hidden">Package Name:</p>
                  <strong>{{ orderItem.packageName }} </strong>
                </div>
                <div class="flex items-center justify-center">
                  <p class="mr-2 sm:hidden">Unit Price :</p>
                  <!-- <strong>{{ this.$myUtility.toLKR(orderItem.unitPrice) }}</strong> -->
                  <input
                    type="number"
                    min="1"
                    class="block p-1 text-xs text-gray-900 border border-gray-300 rounded-lg w-24 sm:w-16 bg-gray-50 sm:text-sm"
                    placeholder="In Rupees"
                    v-model="orderItem.unitPrice"
                    @input="updateUnitPrice(index)"

                  />
                </div>
                <div class="flex flex-col items-center justify-center">
                  <p class="mb-2 sm:hidden">Qty:</p>
                  <input
                    type="number"
                    min="1"
                    class="block p-1 text-xs text-gray-900 border border-gray-300 rounded-lg w-24 sm:w-16 bg-gray-50 sm:text-sm"
                    placeholder="In Rupees"
                    v-model="orderItem.qty"
                    @input="updateTotalPrice(index)"

                  />
                </div>
                
                <!-- <span class="mt-1 text-xs text-blue-600">
                  {{ orderItem.qty}} 
                    </span> -->

                <!-- Discount Input -->
                <div class="flex flex-col items-center justify-center">
                  <p class="mb-2 sm:hidden">Discount:</p>
                  <input
                    type="number"
                    min="0"
                    class="block w-24 p-1 text-xs text-gray-900 border border-gray-300 rounded-lg sm:w-24 bg-gray-50 sm:text-sm"
                    placeholder="In Rupeesdds"
                    v-model="orderItem.discount"
                    @input="updateTotalPrice(index)"

                  />
                  <!-- @input="updateTotalPrice(index)" -->
                </div>
                <div class="flex flex-col items-center justify-center">
                  <p class="mb-2 sm:hidden">SSL:</p>

                  <div>
                    <strong>{{ this.$myUtility.toLKR(orderItem.ssclRate) }}</strong>
                  </div>

                </div>
                <div class="flex flex-col items-center justify-center">

                  <div>
                    <strong>{{ this.$myUtility.toLKR(orderItem.vatRate) }}</strong>
                  </div>
                </div>

                <!-- Total Price -->
                <div class="flex items-center justify-center">
                  <p class="mr-2 sm:hidden">Total:</p>
                  <strong>{{ this.$myUtility.toLKR(orderItem.total) }}</strong>

                </div>

                <!-- Remove Button -->
                <div class="flex items-center justify-center">
                  <div class="text-center">
                    <button
                      type="button"
                      @click="GetRemoveRow(index)"
                      class="text-red-600 hover:text-red-800"
                      title="Remove"
                    >
                      <!-- Trash icon (Heroicons) -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              </div>
              <hr class="my-2 border-gray-300 dark:border-gray-600" />
            </div>
          </div>
        </div>
        <!-- <div v-else>
          <p class="mt-6 text-center text-gray-500">
            Please select a packages
          </p>
        </div> -->
        <p v-if="err.packageError" class="mt-2 text-sm text-center text-red-500">
          {{ err.packageError }}
        </p>
      </div>
    </div>

    <!-- {{ orderStore.order }} -->


      <!-- order Summery Section -->
      <div class="flex flex-col">
        <div class="flex-grow"></div>
        <div class="sticky bottom-0 w-full p-4 bg-white">
          <div class="flex justify-end">
            <div class="flex flex-col w-64 gap-2 p-4 bg-white rounded-lg shadow-md">
            
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Net Total</p>
                <p class="text-xl font-medium text-gray-900">
                  {{ (order && order.netTotal != null ? order.netTotal : 0).toFixed(2) }}
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <!--End  order Summery Section -->
      <!-- {{ order.order }} -->
    </div>

    <div class="flex justify-between items-center mt-6">
      <button
        class="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded"
        @click="$emit('close')"
      >
        Back
      </button>
      <button @click="GetPrint" class="confirm-button"> {{ isEditing ? "Update" : "Print" }}</button>
    </div>

  </section>
</template>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import serach_Input from "~/components/customcontrol/SearchInput";
import inputtags_search from "~/components/customcontrol/inputtags_search";
import selectinput2 from "~/components/customcontrol/selectinput2";
import Button from "~/components/customcontrol/Button";

import { useOrderStore } from "~/stores/modules/orderStore";

export default {
  components: {
    closebtn,
    serach_Input,
    inputtags_search,
    selectinput2,
    Button,
  },
  props:['customerRef', 'id'],
  data() {
    return {
      isOpen: true,
      err: {
        customerRef: "",
        mainDistrictId: "",
      },
      piIssued: '',
      piNumber: '',
      selectedPackages: [],
      showLoading: null, 
      listoPackagesDetails: [],
      curProductCategory: '',

      order: {
        customerRef: "",
        listOrderItem: [],
        netTotal: 0,
      },

  
    };
  },
  
  watch: {
    piIssued(newVal) {
      if (!newVal) {
        this.piNumber = '';  // Clear PI Number input when toggled off
      }
    }
  },
  
 computed: {

    finalProductCategoryList() {
        const categories = this.orderStore.initOrder.listProductCategory || [];
        console.log("cat:",categories);
        // Optionally remove duplicates based on id
        const uniqueCategories = categories.filter(
            (cat, index, self) =>
            index === self.findIndex((c) => c.id === cat.id)
        );
        return uniqueCategories;
    },


  },

  async created() {
    this.showLoading = this.$showLoading;
    this.orderStore = useOrderStore();

    await this.orderStore.loadInitOrderPlace(this.showLoading);


  },




  methods: {

    handleCategoryChange() {
        const id = this.curProductCategory;
        console.log('Selected Category ID:', id);

        this.showLoading("");  

        this.orderStore.setSelectedCategoryId(id, this.showLoading)
            .then(() => {
            this.listoPackagesDetails = this.orderStore.listoPackagesDetails;
            });
    },

    
    updateUnitPrice(index) {
      const item = this.quotation.listOrderItem[index];
      const qty = Number(item.qty) || 0;
      const price = Number(item.unitPrice) || 0;
      const discount = Number(item.discount) || 0;

      let total = qty * price * (1 - discount / 100);
      if (total < 0) total = 0;

      item.total = total;

      this.netTotalPrice();
    },



  

    GetAddPkg(pkg) {
      // Make sure listOrderItem is an array
      if (!this.orderStore.listoPackagesDetails) {
        this.orderStore.listoPackagesDetails = [];
      }

      const vatRate = this.orderStore.initOrder.vatRate ;
      const ssclRate = this.orderStore.initOrder.ssclRate ;

      const orderItem = {
        index: this.orderStore.listoPackagesDetails.length + 1,
        packageId: pkg.itemId,
        packageName: pkg.categoryName,
        packageCategory: pkg.itemDescription,
        unitPrice: pkg.price,
        tax:pkg.isTaxable,
        qty: 1,
        discount: 0.0,
        vatRate: vatRate,
        ssclRate: ssclRate ,
        total: pkg.showPrice,
      };

      // Check if package is already selected
      if (!this.selectedPackages.includes(pkg)) {
        this.selectedPackages.push(pkg);
        this.order.listOrderItem.push(orderItem);
    
        this.updateTotalPrice(this.order.listOrderItem.length-1);
      }
      else{
        this.$showCustomToast('This Item Already added', 'warning', 3000);
      }
    },

    GetRemoveRow(index) {
      this.order.listOrderItem.splice(index, 1);
    },
    
    clearerr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },

    updateTotalPrice(index) {
      const item = this.order.listOrderItem[index];

      const qty = Number(item.qty) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      const discount = Number(item.discount) || 0;
      const vatAmount = Number(item.vatRate) || 0;
      const ssclAmount = Number(item.ssclRate) || 0;

      const baseTotal = qty * unitPrice * (1 - discount / 100);

      const totalWithVAT = baseTotal + vatAmount;

      const finalTotal = totalWithVAT + ssclAmount;

      item.total = finalTotal;

      this.netTotalPrice();
    },
    
    GetRemoveRow(index) {
      this.order.listOrderItem.splice(index, 1);
      this.netTotalPrice();
    },
    
    netTotalPrice() {
      if (this.order && Array.isArray(this.order.listOrderItem)) {
        this.order.netTotal = this.order.listOrderItem.reduce((acc, item) => {
          const total = Number(item.total) || 0;
          return acc + total;
        }, 0);
      } else {
        this.order.netTotal = 0;
      }

      // this.order.totalAmount = this.order.netTotal + (this.order.vat || 0);
      this.order.totalAmount = this.order.netTotal;
    },
  
    GetPrint() {
      this.netTotalPrice();

      if (!this.IsValidated()) return;

      this.$showConfirm("Confirm: Print the proposal?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            const payload = {
              QuotationId: '',
              OrderNo: this.piNumber || "",
              ClientId: this.id, 
              OrderItems: this.order.listOrderItem.map((item, index) => ({
                Index: index + 1,
                ItemId: item.packageId,
                UnitPrice: Number(item.unitPrice),
                Quantity: Number(item.qty),
                Discount: Number(item.discount)
              }))
            };

            // console.log("Payload to send:", JSON.stringify(payload, null, 2));

            await this.orderStore.GetAddorder(payload, this.showLoading);
            
          } else {
            console.log("Action canceled");
          
          }
          this.closeModal();
            // this.clearErr();
        });
    },






  


    IsValidated() {
      let isValidated = true;
      this.err = {}; // Clear previous errors

      // Check Merchant
      // if (!this.order.customerRef) {
      //   this.err.customerRef = "Please select a Merchant!";
      //   isValidated = false;
      // }

      // Check Product Category
        if (!this.curProductCategory) {
        this.err.curProductCategory = "Please select a Product Category!";
        isValidated = false;
        }



      // Package validation
      if (!this.order.listOrderItem || this.order.listOrderItem.length === 0) {
        this.err.packageError = "Please select at least one package!";
        isValidated = false;
      }



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