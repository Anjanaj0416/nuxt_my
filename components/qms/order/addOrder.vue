<template>
  <section class="justify-center">
    <div class="flex flex-col items-center justify-between mt-4 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">  
        <div class="text-2xl uppercase">Order Add</div>
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
              <option disabled value="">Select Category</option>
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
      <!-- <pre>{{ JSON.stringify(listoPackagesDetails, null, 2) }}</pre> -->
      <div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-gray-600" v-if="listoPackagesDetails.length > 0">Available Packages</label>
          <ul class="flex gap-3 mt-3 overflow-x-auto no-scrollbar p-1">
            <li
              class="flex-shrink-0 w-48"
              v-for="(pkg, index) in listoPackagesDetails"
              :key="index"
            >
              <div
                class="relative p-3 transition-all duration-300 bg-white border border-gray-200 shadow-sm cursor-pointer rounded-xl hover:shadow-md hover:border-blue-400"
              >
                <div class="mb-1 text-xs font-semibold text-gray-800 truncate">
                  {{ pkg.categoryName }}
                </div>
                <div class="h-16 overflow-hidden text-[10px] text-gray-500 leading-tight">
                  <span v-html="pkg.itemDescription"></span>
                </div>
                <div class="mt-1">
                  <span
                    class="px-2 py-0.5 text-[10px] font-medium rounded-full"
                    :class="pkg.isTaxable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
                  >
                    {{ pkg.isTaxable ? 'Include Tax' : 'No Tax' }}
                  </span>
                </div>
                <div class="flex items-center justify-between mt-2">
                  <div class="text-sm font-bold text-blue-700">
                    LKR {{ pkg.showPrice }}
                  </div>
                  <div
                    @click="GetAddPkg(pkg)"
                    class="px-2 py-1 text-xs font-semibold text-blue-700 transition bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
                  >
                    + Add
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div
            class="grid grid-cols-1 gap-4 mt-4"
            v-if="order?.listOrderItem?.length > 0"
          >
            <!-- Package Items -->
            <div class="w-full p-2 bg-white rounded-lg shadow-sm sm:p-4 overflow-y-auto max-h-[300px]">
              <div v-for="(orderItem, index) in order.listOrderItem" :key="index" class="mb-4 rounded-lg border border-gray-200 shadow-sm p-4 bg-gray-50">
      
                <div class="flex justify-between items-center mb-3">
                  <h2 class="text-sm font-bold text-gray-800">
                    {{ orderItem.packageName }}
                  </h2>
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      @click="GetEditPkg(orderItem)"
                      class="px-3 py-1 text-xs font-semibold text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      @click="GetRemoveRow(index)"
                      class="px-3 py-1 text-xs font-semibold text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div class="grid grid-cols-12 gap-1 text-xs">

                  <div>
                    <p class="text-gray-500">Main Banners</p>
                    <p class="font-semibold text-indigo-600">
                      {{ orderItem.NoOfMainBanners }}
                    </p>
                  </div>

                  <div>
                    <p class="text-gray-500">Category Banners</p>
                    <p class="font-semibold text-indigo-600">
                      {{ orderItem.NoOfCategoryBanners }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Sub Category Banners</p>
                    <p class="font-semibold text-indigo-600">
                      {{ orderItem.NoOfSubCategoryBanners }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Vendor Banners</p>
                    <p class="font-semibold text-indigo-600">
                      {{ orderItem.NoOfVendorBanners }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Product Links</p>
                    <p class="font-semibold text-indigo-600">
                      {{ orderItem.NoOfProductLinks }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Service Links</p>
                    <p class="font-semibold text-indigo-600">
                      {{ orderItem.NoOfServiceLinks }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Prominent</p>
                    <p class="font-semibold text-indigo-600">
                      {{ orderItem.ProminentItems }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Qty</p>
                    <p class="font-semibold text-gray-800">
                      {{ orderItem.qty }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Unit Price</p>
                    <p class="font-semibold text-green-600">
                      {{ this.$myUtility.toLKR(orderItem.unitPrice) }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">Discount</p>
                    <p class="font-semibold text-red-500">
                      - {{ this.$myUtility.toLKR(orderItem.discount) }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">VAT</p>
                    <p class="font-semibold text-blue-600">
                      {{ this.$myUtility.toLKR(orderItem.vatRate) }}
                    </p>
                  </div>

                  <div >
                    <p class="text-gray-500">SSL</p>
                    <p class="font-semibold text-blue-600">
                      {{ this.$myUtility.toLKR(orderItem.ssclRate) }}
                    </p>
                  </div>

                </div>

                <!-- Total Section -->
                <div class="mt-4 border-t pt-3 flex justify-end">
                  <div class="text-sm font-bold text-gray-800">
                    Total:
                    <span class="text-green-600 ml-2">
                      {{ this.$myUtility.toLKR(orderItem.total) }}
                    </span>
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
              <div class="flex flex-col sm:grid sm:grid-cols-4 sm:items-center gap-2 text-xs text-gray-700">
                
                <div class="font-semibold truncate">
                  {{ item.installment }}
                </div>

                <div class="flex items-center gap-1">
                  <span>Rs:</span>
                  <input
                    type="number"
                    v-model.number="item.fee"
                    min="1"
                    placeholder="Fee"
                    class="w-full sm:w-20 px-2 py-1 border rounded"
                    required
                  />
                </div>

                <div>
                  <input
                    type="date"
                    v-model="item.date"
                    :min="today"
                    class="w-full sm:w-28 px-2 py-1 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div class="text-right sm:text-center">
                  <button
                    type="button"
                    @click="RemoveInstallment(index)"
                    class="text-red-600 hover:text-red-800"
                    title="Remove"
                  >
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
        class="px-12 py-2 text-xs border font-semibold transition bg-white text-gray-600 rounded-full shadow"
        @click="$emit('close')"
      >
        Back
      </button>
      <button 
        @click="GetPrint" 
        class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-indigo-400"
      > 
        Submit
      </button>
    </div>
    
    <orderIteam 
      v-if="isAddPackage"
      :pkg="selectedPackage"
      @submit="handlePackageSubmit"
      @close="isAddPackage = false"
    />

  </section>
</template>

<script>
import { useOrderStore } from "~/stores/modules/orderStore";
import orderIteam from "./orderIteam.vue";

export default {
  components: { orderIteam },
  props: ["customerRef", "id", "orderNo"],

  data() {
    return {
      orderStore: null,
      isAddPackage: false,
      selectedPackage: null,
      piIssued: false,
      piNumber: '',
      showLoading: null, 
      listoPackagesDetails: [],
      curProductCategory: '',
      localOrderNo: this.orderNo, 
      order: {
        customerRef: "",
        listOrderItem: [],
        netTotal: 0,
        listInstallment: [],
      },

      listInstallmentDetails: [],
      today: new Date().toISOString().split("T")[0],

      err: {},
    };
  },

  async created() {
    this.showLoading = this.$showLoading;
    this.orderStore = useOrderStore();
    await this.orderStore.loadInitOrderPlace(this.showLoading);
  },

  computed: {
    finalProductCategoryList() {
      return this.orderStore.initOrder.listProductCategory || [];
    },
  },

  methods: {
    handleCategoryChange() {
      this.orderStore
        .setSelectedCategoryId(this.curProductCategory, this.showLoading)
        .then(() => {
          this.listoPackagesDetails = this.orderStore.listoPackagesDetails;
        });
    },

    GetAddPkg(pkg) {
       console.log("ADD CLICKED", pkg);
      this.selectedPackage = pkg;
      this.isAddPackage = true;
    },

    GetEditPkg(orderItem) {
       console.log("ADD CLICKED", orderItem);
      this.isAddPackage = true;
    },

    handlePackageSubmit(orderItem) {
      this.order.listOrderItem.push(orderItem);
      this.recalculateTotals();
      this.AddInstallments(1);
      this.isAddPackage = false;
      console.log('List',orderItem);
      
    },

    // GetRemoveRow(index) {
    //   this.order.listOrderItem.splice(index, 1);
    //   this.recalculateTotals();
    // },
    GetRemoveRow(index) {
      this.$showConfirm(
        "Are you sure you want to delete this order item?",
        "warning"
      )
      .then((confirmed) => {
        if (confirmed) {
          // Only remove when confirmed
          this.order.listOrderItem.splice(index, 1);
          this.recalculateTotals();
        }
      })
      .catch(() => {
        // Cancel clicked → do nothing
        this.order.listOrderItem.splice(index, 1);
        console.log("User cancelled deletion");
      });
    },

    recalculateTotals() {
      this.order.netTotal = this.order.listOrderItem.reduce(
        (sum, i) => sum + (Number(i.total) || 0),
        0
      );
    },

    AddInstallments(e) {
      const num = Number(e?.target?.value || e) || 1; 
      this.listInstallmentDetails = [];

      const today = new Date().toISOString().split("T")[0];

      for (let i = 0; i < num; i++) {
        this.listInstallmentDetails.push({
          installment: `Installment ${i + 1}`,
          fee: 0,
          date: today,
        });
      }
    },

    RemoveInstallment(index) {
      this.listInstallmentDetails.splice(index, 1);

      // reindex installment names after deletion
      this.listInstallmentDetails.forEach((item, i) => {
        item.installment = `Installment ${i + 1}`;
      })
    },

    GetPrint() {

      if (!this.IsValidated()) return;

      this.$showConfirm("Are you sure to create this order?", "warning")
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
                  NoOfMainBanners: Number(item.NoOfMainBanners) || 0,
                  NoOfCategoryBanners: Number(item.NoOfCategoryBanners) || 0,
                  NoOfSubCategoryBanners: Number(item.NoOfSubCategoryBanners) || 0,
                  NoOfVendorBanners: Number(item.NoOfVendorBanners) || 0,
                  NoOfProductLinks: Number(item.NoOfProductLinks) || 0,
                  NoOfServiceLinks: Number(item.NoOfServiceLinks) || 0,
                  NoOfServiceLinks: Number(item.NoOfServiceLinks) || 0,
                  ProminentItems: Number(item.ProminentItems) || 0,
                })
                
              })),
              Installments: this.listInstallmentDetails.map((inst) => ({
                  InstallmentAmount: Number(inst.fee) || 0,
                  InstallmentDate: inst.date
                }))
            };
            // console.log("Payload to send:", JSON.stringify(payload, null, 2));
          

            this.localOrderNo = '';
            this.piIssued = false;
            this.piNumber = '';
            this.order.listOrderItem = [];
            this.curProductCategory = '';
            
            await this.orderStore.loadListOrder(
              { keyword: this.id, searchBy: 'clientId' },
              this.showLoading
            )
          } else {
            console.log("Action canceled");
          
          }
          this.closeModal();
            // this.clearErr();
        });
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
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
      if (!this.listInstallmentDetails || this.listInstallmentDetails.length === 0) {
        this.err.installmentError = "Please add at least one installment!";
        isValidated = false;
      }
      return isValidated;
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