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
                  <button type="button"  @click="GetEditPkg(orderItem)" class="text-blue-600 hover:text-black" title="Remove">
                    Edit
                  </button>
                  <button type="button" @click="GetRemoveRow(index)" class="text-blue-600 hover:text-black" title="Remove">
                    Delete
                  </button>
                </div>

                <!-- Inputs Section -->
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4">

                  <!-- No of Banners -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Main Banners</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.NoOfMainBanners }}</strong>
                  </div>

                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Category Banners</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.NoOfCategoryBanners }}</strong>
                  </div>

                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Sub Category Banners</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.NoOfCategoryBanners }}</strong>
                  </div>

                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Vendor Banners</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.NoOfVendorBanners }}</strong>
                  </div>

                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Product Link</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.NoOfMainBanners }}</strong>
                  </div>

                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">No. of Service Link</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.NoOfCategoryBanners }}</strong>
                  </div>

                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Prominent Items</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.NoOfCategoryBanners }}</strong>
                  </div>

                  <!-- Unit Price -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Unit Price (Rs)</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.unitPrice }}</strong>
                  </div>

                  <!-- Quantity -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Quantity</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.qty }}</strong>
                  </div>

                  <!-- Discount -->
                  <div class="flex flex-col">
                    <label class="text-xs font-medium text-gray-600 mb-1">Discount (Rs)</label>
                    <strong class="text-sm font-bold text-green-600">{{ orderItem.discount }}</strong>
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
                  <!-- <input
                    type="number"
                    v-model.number="item.fee"
                    min="1"
                    placeholder="Fee"
                    @input="handleInstallmentChange(index)"
                    class="w-full sm:w-20 px-2 py-1 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  /> -->
                  <input
                    type="number"
                    v-model.number="item.fee"
                    min="1"
                    placeholder="Fee"
                    class="w-full sm:w-20 px-2 py-1 border rounded"
                    required
                  />
                </div>

                <!-- Date input -->
                <div>
                  <input
                    type="date"
                    v-model="item.date"
                    :min="today"
                    class="w-full sm:w-28 px-2 py-1 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                  <!--@change="handleDateChange(index, item.date)" -->
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
        class="px-12 py-2 text-xs border font-semibold transition bg-white text-gray-600 rounded-full shadow"
        @click="$emit('close')"
      >
        Back
      </button>
      <button 
        @click="GetPrint" 
        class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-indigo-400"
      > 
        {{ isEditing ? "Update" : "Submit" }}
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
      showLoading: null,
      curProductCategory: "",
      listoPackagesDetails: [],
      isAddPackage: false,
      selectedPackage: null,
      order: {
        listOrderItem: [],
        netTotal: 0,
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

    GetRemoveRow(index) {
      this.order.listOrderItem.splice(index, 1);
      this.recalculateTotals();
    },

    recalculateTotals() {
      this.order.netTotal = this.order.listOrderItem.reduce(
        (sum, i) => sum + (Number(i.total) || 0),
        0
      );
    },

    AddInstallments(num = 1) {
      this.listInstallmentDetails = [];
      for (let i = 0; i < num; i++) {
        this.listInstallmentDetails.push({
          installment: `Installment ${i + 1}`,
          fee: 0,
          date: this.today,
        });
      }
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