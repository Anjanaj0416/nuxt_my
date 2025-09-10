<template>
  <section class="justify-center">
    <div class="flex flex-col items-center justify-between mt-4 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">  
        <div class="text-2xl uppercase">Order {{ isEditing ? "Edit" : "Add" }}</div>
      </div>
      <div class="w-full md:w-auto">
      </div>
    </div>

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
    
        
        <div v-if="!orderNo">
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

        <p v-else>
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            orderNo
          </label>
          {{ localOrderNo  }}
        </p>

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
            <!-- Package Items -->
            <div class="w-full p-2 bg-white rounded-lg shadow-sm sm:p-4 dark:bg-gray-100 dark:border-gray-700 overflow-y-auto max-h-[300px]">
              <div v-for="(orderItem, index) in order.listOrderItem" :key="index" class="mb-4 rounded-lg border border-gray-200 shadow-sm p-4 bg-gray-50">
                
                <!-- Package Name (Top Left) -->
                <div class="flex justify-between items-center mb-3">
                  <h2 class="text-sm font-bold text-gray-800">
                    {{ orderItem.packageName }}
                  </h2>
                  <!-- Remove Button -->
                  <button type="button" @click="GetRemoveRow(index)" class="text-blue-600 hover:text-black" title="Remove">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg> -->
                    Delete
                  </button>
                </div>

                <!-- Inputs Section -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-4">

                  <!-- No of Banners -->
                  <div v-if="orderItem.packageName === 'Customized Package'" class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Banners</label>
                    <input type="number" min="1" v-model="orderItem.NoOfBanners"
                      class="p-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
                      placeholder="Enter number of banners"/>
                  </div>

                  <!-- No of Links -->
                  <div v-if="orderItem.packageName === 'Customized Package'" class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Links</label>
                    <input type="number" min="1" v-model="orderItem.NoOfLinks"
                      class="p-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      placeholder="Enter number of links" />
                  </div>

                  <!-- Unit Price -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Unit Price (Rs)</label>
                    <input type="number" min="1" v-model="orderItem.unitPrice" @input="updateUnitPrice(index)"
                      class="p-2 text-xs border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none" />
                  </div>

                  <!-- Quantity -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Quantity</label>
                    <input type="number" min="1" v-model="orderItem.qty" @input="updateTotalPrice(index)"
                      class="p-2 text-xs border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none" />
                  </div>

                  <!-- Discount -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Discount (Rs)</label>
                    <input type="number" min="0" v-model="orderItem.discount" @input="updateTotalPrice(index)"
                      class="p-2 text-xs border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none" />
                  </div>

                  <!-- SSL -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">SSL</label>
                    <strong class="text-sm text-blue-700">{{ this.$myUtility.toLKR(orderItem.ssclRate) }}</strong>
                  </div>

                  <!-- VAT -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">VAT</label>
                    <strong class="text-sm text-blue-700">{{ this.$myUtility.toLKR(orderItem.vatRate) }}</strong>
                  </div>

                  <!-- Total -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Total</label>
                    <strong class="text-sm font-bold text-green-600">{{ this.$myUtility.toLKR(orderItem.total) }}</strong>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <p v-if="err.packageError" class="mt-2 text-sm text-center text-red-500">
            {{ err.packageError }}
          </p>
        </div>
      </div>

      <!-- Input for adding installments -->
      <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  my-1">
          <div>
            <label class="block text-sm font-bold text-gray-600">Installments</label>
            <input
              type="number"
              min="1"
              max="3"
              placeholder="Enter number of installments"
              @change="AddInstallments"
              required
              class="w-full p-2 my-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <div class="w-full md:w-2/4 bg-white rounded-lg  dark:bg-gray-100  dark:border-gray-300 overflow-y-auto max-h-[300px]">
            <div
              v-for="(item, index) in listInstallmentDetails"
              :key="index"
              class="p-2 border border-t border-gray-200 shadow-sm hover:bg-gray-50"
            >
              <!-- Responsive container -->
              <div class="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2 text-xs text-gray-700">
                
                <!-- Installment label -->
                <div class="font-semibold truncate">
                  {{ item.installment }}
                </div>

                <!-- Fee input -->
                <div class="flex items-center gap-1">
                  <span>Rs:</span>
                  <input
                    type="number"
                    v-model.number="item.fee"
                    min="1"
                    placeholder="Fee"
                    @input="handleInstallmentChange(index)"
                    class="w-full sm:w-20 px-2 py-1 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <!-- Date input -->
                <div>
                  <input
                    type="date"
                    v-model="item.date"
                    :min="today"
                    @change="handleDateChange(index, item.date)"
                    class="w-full sm:w-28 px-2 py-1 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <!-- Remove button -->
                <div class="text-right sm:text-center">
                  <button
                    type="button"
                    @click="RemoveInstallment(index)"
                    class="text-red-600 hover:text-red-800"
                    title="Remove"
                  >
                    <!-- Trash icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p v-if="err.installmentError" class="mt-6 text-sm text-center text-red-500">
          {{ err.installmentError }}
        </p>
      </div>

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
  props:['customerRef', 'id','orderNo'],
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
      localOrderNo: this.orderNo, 
      listInstallmentDetails: [],  
    today: new Date().toISOString().split("T")[0],

      order: {
        customerRef: "",
        listOrderItem: [],
        netTotal: 0,
        listInstallment: [],
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

    
    // updateUnitPrice(index) {
    //   const item = this.quotation.listOrderItem[index];
    //   const qty = Number(item.qty) || 0;
    //   const price = Number(item.unitPrice) || 0;
    //   const discount = Number(item.discount) || 0;

    //   let total = qty * price * (1 - discount / 100);
    //   if (total < 0) total = 0;

    //   item.total = total;

    //   this.netTotalPrice();
    // },

    updateUnitPrice(index) {
      this.updateTotalPrice(index);
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

        this.AddInstallments(1);
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

    AddInstallments(e) {
      const num = Number(e?.target?.value || e) || 1; // can be event or direct call
      this.listInstallmentDetails = [];

      const today = new Date().toISOString().split("T")[0];

      for (let i = 0; i < num; i++) {
        this.listInstallmentDetails.push({
          installment: `Installment ${i + 1}`,
          fee: 0,
          date: today, // 👉 default to today
        });
      }
    },

    RemoveInstallment(index) {
      this.listInstallmentDetails.splice(index, 1);

      // reindex installment names after deletion
      this.listInstallmentDetails.forEach((item, i) => {
        item.installment = `Installment ${i + 1}`;
      });
    },



    updateTotalPrice(index) {
      const item = this.order.listOrderItem[index];

      const qty = Number(item.qty) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      const discount = Number(item.discount) || 0;
      const vatRate = Number(item.vatRate) || 0;   // % VAT
      const ssclRate = Number(item.ssclRate) || 0; // % SSCL

      // Base total after discount
      const baseTotal = qty * unitPrice - discount;

      // Apply SSCL first
      const ssclAmount = baseTotal * (ssclRate / 100);
      const afterSSCL = baseTotal + ssclAmount;

     
      const vatAmount = afterSSCL * (vatRate / 100);
      const finalTotal = afterSSCL + vatAmount;

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

    formatDate(dateObj) {
      const yyyy = dateObj.getFullYear();
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dd = String(dateObj.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
  
    GetPrint() {
      this.netTotalPrice();

      if (!this.IsValidated()) return;

      this.$showConfirm("Confirm: Print the proposal?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            const payload = {
              QuotationId: '',
              OrderNo: this.piNumber || this.orderNo || '',
              ClientId: this.id, 
              OrderItems: this.order.listOrderItem.map((item, index) => ({
                Index: index + 1,
                ItemId: item.packageId,
                UnitPrice: Number(item.unitPrice),
                Quantity: Number(item.qty),
                Discount: Number(item.discount),
                Data: JSON.stringify({
                  NoOfBanners: item.NoOfBanners,
                  NoOfLinks: item.NoOfLinks
                }),
                Installments: this.listInstallmentDetails.map((inst) => ({
                  Fee: Number(inst.fee) || 0,
                  Date: inst.date
                }))
              }))
            };

            console.log("Payload to send:", JSON.stringify(payload, null, 2));
            return
           
            await this.orderStore.GetAddorder(payload, this.showLoading);

            // ✅ reset form after submit
            this.localOrderNo = '';
            this.piIssued = false;
            this.piNumber = '';
            this.order.listOrderItem = [];
            this.curProductCategory = '';
            
            // refresh list after add
            await this.orderStore.loadListOrder(
              { keyword: this.id, searchBy: 'clientId' },
              this.showLoading
            );
            
          } else {
            console.log("Action canceled");
          
          }
          this.closeModal();
            // this.clearErr();
        });
    },






  


    IsValidated() {
      let isValidated = true;
      this.err = {};
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
      // Installment validation
      // if (!this.listInstallmentDetails || this.listInstallmentDetails.length === 0) {
      //   this.err.installmentError = "Please add at least one installment!";
      //   isValidated = false;
      // }
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