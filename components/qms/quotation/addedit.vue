<template>
  <section class="justify-center">
    <div class="flex flex-col items-center justify-between mt-4 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">  
        <div class="text-2xl uppercase">Proposal {{ isEditing ? "Edit" : "Add" }}</div>
      </div>
      <div class="w-full md:w-auto">
      </div>
    </div>
    <!-- {{ quotation.listOrderItem }} -->
    <!-- <pre>{{ JSON.stringify(quotationStore.quotation, null, 2) }}</pre> -->

    <div class="form-content bg-white mt-4 border rounded-lg shadow-md p-4 space-y-1 text-sm text-gray-800">
     
      <div class="grid grid-cols-2 my-4">
        <div>
          <label class="block text-sm font-bold text-gray-600">Select Product Category</label>
      
          <selectinput2
            class="my-2"
            v-model="curProductCategory"
            ref=""
            :cur_item="curProductCategory"
            :selections="finalProductCategoryList"
            :err="err.curProductCategory"
            label=""
            @changed="changedcurProductCategory"
          />
          <!-- {{ quotationStore.initQuotation.listProductCategory }} -->
          
        </div>
      </div>

    <!-- Package -->

    <!-- <pre>{{ JSON.stringify(curPkgList, null, 2) }}</pre> -->

    <div>
      <label class="block text-sm font-bold text-gray-600" v-if="curPkgList.length > 0">Available Packages</label>
      <div class="grid grid-cols-1 my-2">
        <!-- Package List -->
        <ul class="flex w-full gap-2 mt-4 overflow-x-auto no-scrollbar">
          <li
            class="flex-shrink-0 w-60"
            v-for="(pkg, index) in curPkgList"
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
                    {{ pkg.packageName }}
                  </div>
                  <div class="flex justify-end mt-2"></div>
                </div>
                <div
                  class="text-xs font-medium text-gray-900 dark:text-gray-900"
                >
                  <div
                    class="text-xs font-semibold text-gray-900 dark:text-gray-900"
                    v-html="pkg.packageDescription"
                  ></div>
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
          v-if="quotation?.listOrderItem?.length > 0"
        >

          <!-- Header Row -->
          <div class="hidden w-full p-2 text-center bg-gray-100 rounded-lg shadow-sm sm:p-2 dark:bg-gray-100 dark:border-gray-700 lg:block">
            <div
              class="grid grid-cols-1 gap-1 text-xs text-gray-700 uppercase sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7"
            >
              <div class="p-2">Index</div>
              <div class="p-2">Description</div>
              <div class="p-2">Unit Price</div>
              <div class="p-2">Links/Pkg</div>
              <div class="p-2">
                Discount
                <span class="text-xs font-bold text-red-500">(Rs.)</span>
              </div>
              <div class="p-2">Total</div>
              <div class="p-2"></div>
            </div>
          </div>

          <!-- Package Items -->
          <div class="w-full p-2 text-center bg-white rounded-lg shadow-sm sm:p-4 dark:bg-gray-100 dark:border-gray-700 overflow-y-auto max-h-[300px]">
            <div
              v-for="(orderItem, index) in quotation.listOrderItem"
              :key="index"
            >
          <div>
              <div
                class="relative grid grid-cols-1 gap-4 py-2 text-xs text-gray-700 uppercase sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-7"
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
                  <strong>{{ this.$myUtility.toLKR(orderItem.unitPrice) }}</strong>
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

    <!-- {{ quotationStore.quotation }} -->

    <!-- Input for adding installments -->
    <div>
      <div class="grid grid-cols-2  my-1">
        <div>
          <label class="block text-sm font-bold text-gray-600">Installments</label>
          <input
            v-model.number="quotation.installment"
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
            class="grid items-center grid-cols-4 px-2 py-2 text-xs text-gray-700 border border-t border-gray-200 shadow-sm hover:bg-gray-50"
          >
            <!-- Installment label -->
            <div class="truncate">{{ item.installment }}</div>

            <!-- Fee input -->
            <div>
              <span>Rs : </span>
              <input
                type="number"
                v-model.number="item.fee"
                min="1"
                placeholder="Fee"
                @input="handleInstallmentChange(index)"
                class="w-20 px-2 py-1 text-xs border rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <input
                type="date"
                v-model="item.date"
                :min="today"
                @change="handleInstallmentChange(index)"
                class="w-20 px-2 py-1 text-xs border rounded focus:ring-indigo-500 focus:border-indigo-500"
                required
              />

            </div>

            <!-- Remove icon -->
            <div class="text-center">
              <button
                type="button"
                @click="RemoveInstallment(index)"
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
      
      <p v-if="err.installmentError" class="mt-6 text-sm text-center text-red-500">
        {{ err.installmentError }}
      </p>
    </div>

      <!-- Quotation Summery Section -->
      <div class="flex flex-col">
        <div class="flex-grow"></div>
        <div class="sticky bottom-0 w-full p-4 bg-white">
          <div class="flex justify-end">
            <div class="flex flex-col w-64 gap-2 p-4 bg-white rounded-lg shadow-md">
            
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">Net Total</p>
                <p class="text-xl font-medium text-gray-900">
                  {{ (quotation && quotation.netTotal != null ? quotation.netTotal : 0).toFixed(2) }}
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <!--End  Quotation Summery Section -->
      <!-- {{ quotation.quotation }} -->
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

import { useQuotationStore } from "~/stores/modules/qms/quotationStore";

export default {
  components: {
    closebtn,
    serach_Input,
    inputtags_search,
    selectinput2,
    Button,
  },
  props:['isVerion','customerRef','quotationNo'],
  data() {
    return {
      isOpen: true,
      err: {
        customerRef: "",
        mainDistrictId: "",
        curProductCategory: "",
      },

      selectedPackages: [],
      showLoading: null, 

      curProductCategory: "",
      quotation: {
        currentQNo: '',
        isVerion: false,      
        customerRef: "",
        listOrderItem: [],
        netTotal: 0,
        listInstallment: [],
      },


      listInstallmentDetails:[],

      curPkgList: [],
        listTemp:[{id:1,value:'abc'},{id:2,value:'def'}],
    };
  },
  
  watch: {
    'quotation.listOrderItem'(newVal) {
      if (
        Array.isArray(newVal) &&
        newVal.length > 0 &&
        !this.curProductCategory
      ) {
        this.curProductCategory = newVal[0].packageCategory;
      }
    },
    'quotation.listInstallment': {
      handler(newVal) {
        if (Array.isArray(newVal) && newVal.length > 0) {
          this.quotation.installment = newVal.length;
          this.populateInstallmentsFromBackend();
        }
      },
      immediate: true
    }
  },
  
 computed: {
    isEditing() {
      return (
        this.quotation &&
        this.quotation.id !== "00000000-0000-0000-0000-000000000000"
        //  this.quotation.isVersion !== "true"
      );
    },
    finalProductCategoryList() {
      // const categories = this.quotation.listOrderItem?.map(item => item.packageCategory) || [];
      const categories = this.quotationStore.initQuotation.listProductCategory || [];
      const uniqueCategories = [...new Set(categories)];

      if (uniqueCategories.length > 0) {
        return uniqueCategories;
      }
      return this.quotationStore.initQuotation.listProductCategory || [];
    },
    today() {
      const today = new Date();
      // Format date as yyyy-mm-dd
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    }
  },

  async created() {
    this.showLoading = this.$showLoading;
    this.quotationStore = useQuotationStore();
    this.quotation = this.quotationStore.quotation;
    await this.quotationStore.loadInitQuotation(this.showLoading);
  },




  methods: {

    changedcurProductCategory(type) {
      this.curProductCategory = type;
      this.err.curProductCategory = '';
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
    // Make sure listOrderItem is an array
    if (!this.quotation.listOrderItem) {
      this.quotation.listOrderItem = [];
    }

    const orderItem = {
      index: this.quotation.listOrderItem.length + 1,
      packageId: pkg.packageId,
      packageName: pkg.packageName,
      packageCategory: pkg.packageCategory,
      unitPrice: pkg.price,
      qty: 1,
      discount: 0.0,
      total: pkg.price,
    };

    // Check if package is already selected
    if (!this.selectedPackages.includes(pkg)) {
      this.selectedPackages.push(pkg);
      this.quotation.listOrderItem.push(orderItem);
  
      this.updateTotalPrice(this.quotation.listOrderItem.length-1);
    }
    else{
       this.$showCustomToast('This Item Already added', 'warning', 3000);
    }
  },


    GetRemoveRow(index) {
      this.quotation.listOrderItem.splice(index, 1);
    },
    
    clearerr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },

    // populateInstallmentsFromBackend() {
    //   const backendInstallments = this.quotation.listInstallment;

    //   if (!Array.isArray(backendInstallments)) return;

    //   this.listInstallmentDetails = backendInstallments.map((fee, index) => ({
    //     installment: `Installment ${index + 1}`,
    //     fee: Number(fee)
    //   }));
    // },

    populateInstallmentsFromBackend() {
      const backendInstallments = this.quotation.listInstallment;

      if (!Array.isArray(backendInstallments)) return;

      this.listInstallmentDetails = backendInstallments.map((entry, index) => ({
        installment: `Installment ${index + 1}`,
        fee: Number(entry.amount || 0),
        date: entry.date || this.today,
        manual: false
      }));
    },
    

    AddInstallments() {
      const count = this.quotation.installment;

      if (!count || count <= 0) {
        this.$showCustomToast('Invalid Installment!', 'error', 3000);
        return;
      }

      if (count > 3) {
        this.$showCustomToast('Maximum three Installments allowed!', 'error', 3000);
        return;
      }

      const total = Math.round(
        this.quotation.listOrderItem.reduce((sum, item) => sum + (+item.total || 0), 0) * 100
      ) / 100;

      const base = Math.floor((total / count) * 100) / 100;
      const remainder = Math.round((total - base * count) * 100) / 100;

      this.listInstallmentDetails = Array.from({ length: count }, (_, i) => ({
        installment: `Installment ${i + 1}`,
        fee: i + 1 === count ? Math.round((base + remainder) * 100) / 100 : base,
        date: this.today // Set today as default or use null if you want to enforce user input
      }));


      // this.quotation.listInstallment = this.listInstallmentDetails.map(item => item.fee);
      this.quotation.listInstallment = this.listInstallmentDetails.map(item => ({
        amount: Number(item.fee) || 0,
        date: item.date || null
      }));

    },

    handleInstallmentChange(changedIndex) {
      let netTotal = this.quotation.listOrderItem.reduce(
        (sum, item) => sum + (Number(item.total) || 0),
        0
      );
      netTotal = Math.round(netTotal * 100) / 100;

      // Mark current as manual
      this.listInstallmentDetails[changedIndex].manual = true;

      // Calculate manual total and find auto indexes
      let manualTotal = 0;
      const autoIndexes = [];

      this.listInstallmentDetails.forEach((item, idx) => {
        if (item.manual) {
          manualTotal += Number(item.fee) || 0;
        } else {
          autoIndexes.push(idx);
        }
      });

      const remaining = Math.round((netTotal - manualTotal) * 100) / 100;

      if (remaining < 0) {
        this.$showCustomToast('Total exceeds allowed amount!', 'error', 3000);
        return;
      }

      const base = Math.floor((remaining / autoIndexes.length) * 100) / 100;
      const lastRemainder = Math.round((remaining - base * autoIndexes.length) * 100) / 100;

      autoIndexes.forEach((idx, i) => {
        this.listInstallmentDetails[idx].fee = i === autoIndexes.length - 1
          ? Math.round((base + lastRemainder) * 100) / 100
          : base;
      });

      // ✅ Updated here: just set the fees array
      this.quotation.listInstallment = this.listInstallmentDetails.map(item => ({
        amount: Number(item.fee) || 0,
        date: item.date || null
      }));
    },

    RemoveInstallment(index) {
      this.listInstallmentDetails.splice(index, 1);
      this.quotation.installment = this.listInstallmentDetails.length;
      this.AddInstallments(); 
    },

    updateTotalPrice(index) {
      const item = this.quotation.listOrderItem[index];
      const qty = Number(item.qty) || 0;
      const price = Number(item.unitPrice) || 0;
      const discount = Number(item.discount) || 0;

      let total = qty * price * (1 - discount / 100);
      if (total < 0) total = 0;

      item.total = total;
      //console.log(total);

      this.netTotalPrice();

      // Only update installments if they already exist
      if (this.quotation.installment && this.listInstallmentDetails.length > 0) {
        this.AddInstallments(); 
      }
    },
    
    GetRemoveRow(index) {
      this.quotation.listOrderItem.splice(index, 1);
      this.netTotalPrice();
    },
    
    netTotalPrice() {
      if (this.quotation && Array.isArray(this.quotation.listOrderItem)) {
        this.quotation.netTotal = this.quotation.listOrderItem.reduce((acc, item) => {
          const total = Number(item.total) || 0;
          return acc + total;
        }, 0);
      } else {
        this.quotation.netTotal = 0;
      }

      // this.quotation.totalAmount = this.quotation.netTotal + (this.quotation.vat || 0);
      this.quotation.totalAmount = this.quotation.netTotal;
    },


  
GetPrint() {
  this.netTotalPrice();

  if (!this.IsValidated()) return;

  this.$showConfirm("Confirm: Print the proposal?", "warning")
    .then(async (result) => {
      if (result.isConfirmed) {
        this.quotation.isVerion = this.isVerion;
        this.quotation.customerRef = this.customerRef;
        this.quotation.currentQNo = this.quotationNo;

        const payload = {
          listOrderItem: this.quotation.listOrderItem,
          listInstallment: this.quotation.listInstallment,
          netTotal: this.quotation.netTotal,
          isVerion: this.quotation.isVerion,
          customerRef: this.quotation.customerRef,
          currentQNo: this.quotation.currentQNo || ''
        };
      //  console.log(JSON.stringify(payload));

         await this.quotationStore.GetAddQuotation(payload, this.showLoading);
         
      } else {
        console.log("Action canceled");
       
      }
       this.closeModal();
        // this.clearErr();
    });
}
,






  


    IsValidated() {
      let isValidated = true;
      this.err = {}; // Clear previous errors

      // Check Merchant
      // if (!this.quotation.customerRef) {
      //   this.err.customerRef = "Please select a Merchant!";
      //   isValidated = false;
      // }

      // Check Product Category
      if (!this.curProductCategory) {
        this.err.curProductCategory = "Please select a Product Category!";
        isValidated = false;
      }

      // Package validation
      if (!this.quotation.listOrderItem || this.quotation.listOrderItem.length === 0) {
        this.err.packageError = "Please select at least one package!";
        isValidated = false;
      }

      // Installment validation
      if (!this.listInstallmentDetails || this.listInstallmentDetails.length === 0) {
        this.err.installmentError = "Please add at least one installment!";
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
