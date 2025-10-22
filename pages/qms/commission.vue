<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">
    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="text-2xl uppercase">Commission</div>
      </div>
      <div class="w-full md:w-auto flex items-center gap-2">
      </div>
    </div>

    <div class="bg-white p-4 rounded-xl shadow-md max-w-8xl mx-auto mt-10 border">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <!-- From Date -->
            <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input
                type="date"
                v-model="filters.dtFrom"
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            <span class="absolute left-3 top-9 text-gray-400">
                <i class="fas fa-calendar-alt"></i>
            </span>
            </div>

            <!-- To Date -->
            <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
                type="date"
                v-model="filters.dtTo"
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            <span class="absolute left-3 top-9 text-gray-400">
                <i class="fas fa-calendar-alt"></i>
            </span>
            </div>

            <!-- Keyword -->
            <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">Keyword</label>
            <input
                type="text"
                v-model="filters.keyword"
                placeholder="Search..."
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            <span class="absolute left-3 top-9 text-gray-400">
                <i class="fas fa-search"></i>
            </span>
            </div>

            <!-- CSO No -->
            <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">CSO No</label>
            <select
                v-model="filters.csoNo"
                class="w-full border border-gray-300 text-sm rounded px-3 py-2 mt-2"
            >
                <option disabled selected value="">Select cso</option>
                <option
                    v-for="cat in orderStore.InitCommision"
                    :key="cat.id"
                    :value="cat.id"
                >
                    {{ cat.value }}
                </option>
            </select>
            <span class="absolute left-3 top-9 text-gray-400">
                <i class="fas fa-hashtag"></i>
            </span>
            </div>
        </div>

        <div class="flex justify-center mt-6">
            <button
                @click="searchCommission"
                class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-indigo-400"

            >
            Search
            </button>
        </div>
    </div>

    <div class="mt-4 max-w-full overflow-auto  ">
        <div 
            v-if="orderStore.CommisionPaymentDetails && orderStore.CommisionPaymentDetails.length  > 0"
            class="space-y-2"
        >
            <div
            v-for="(item, pIndex) in orderStore.CommisionPaymentDetails"
            :key="pIndex"
            class="bg-white shadow-sm border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 text-xs"
            >
        
            <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
                <div class="flex items-center gap-1 text-gray-600">
                Order No:  <span class="font-medium">{{ item.orderNo }}</span>
                </div>
                <div class="text-green-600 font-bold">
                LKR {{ item.collectedAmount }}
                </div>
            </div>

            <div class="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
                <div>
                <span class="font-semibold text-gray-500">Cso No:</span>
                <span class="ml-1 text-gray-700">{{ item.csoNo }}</span>
                </div>
                <div>
                <span class="font-semibold text-gray-500">Commision Rate:</span>
                <span class="ml-1 text-gray-700">{{ item.commisionRate }}</span>
                </div>
                <div>
                <span class="font-semibold text-gray-500">Commision PaidAmount :</span>
                <span class="ml-1 text-gray-700">KKR {{ item.toBeCommisionPaidAmount || '—' }}</span>
                </div>
                <div>
                <span class="font-semibold text-gray-500">Payment:</span>
                <span class="ml-1 text-gray-700">{{ item.isPaid }}</span>
                </div>
                <div class="col-span-2">
                <span class="font-semibold text-gray-500">Remarks:</span>
                <span class="ml-1 italic text-gray-500">{{ item.paidSlipUrl || "—" }}</span>
                </div>
            </div>

           
            <div class="flex flex-wrap gap-3 mt-2">
               
                <div>
                <a
                    v-if="!item.isPaidSlipUploaded"
                    class="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    @click="GoToPayment(item.orderCommisionPayId)"
                >
                    🧾 Add Payment
                </a>
                <a
                    v-else-if="item.isPaidSlipUploaded && item.paidSlipUrl"
                    :href="imageroot + item.invoiceURL"
                    target="_blank"
                    class="text-blue-600 hover:underline flex items-center gap-1"
                >
                    🧾 Payment Slip
                </a>
                <!-- <span v-else class="text-gray-400 italic">No Slip</span> -->
                </div>
            </div>
            </div>
        </div>

        <div v-else class="text-center text-gray-500 py-6 text-sm">
            Please Search
        </div>
    </div>

    <addCommision :commisionID="orderCommisionPayId" v-if="isAddPayment" @close="isAddPayment = false" />

  </section>

</template>

<script>



import { useUserStore } from "~/stores/modules/userStore";
import { useOrderStore } from '~/stores/modules/orderStore';
import addCommision from "~/components/qms/order/addCommision.vue";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: {addCommision},
  data() {
    return {
        isAddPayment: false,
        orderCommisionPayId: null,
        filters: 
          {
            dtFrom: "",
            dtTo: "",
            keyword: "",
            csoNo: "",
          },
        AllCommisionPaymentDetails:{}
    };
  },
  async created() {
      this.userStore = useUserStore();
      this.orderStore = useOrderStore();
      this.showLoading = this.$showLoading;
     
      this.AllCommisionPaymentDetails = this.orderStore.CommisionPaymentDetails;

      await this.orderStore.GetCommissionRatesDetails(this.showLoading);
      this.InitCommision = this.orderStore.InitCommision;
  },

  methods: {

    GoToPayment(commisionID) {
      this.orderCommisionPayId = commisionID;
      this.isAddPayment = true;
    },

    searchCommission() {
        console.log("Filters:", this.filters);
        this.orderStore.GetAllCommisionPaymentDetails(this.filters, this.showLoading);
    }

  },
  
};
</script>

<style scoped>
  .csscmd {
    @apply p-2 text-center bg-blue-200 rounded;
  }

  .csscmd:hover {
    @apply bg-blue-200 cursor-pointer;
  }

  .cssBox {
    border: 1px solid;
    @apply border-blue-600 rounded p-2;
  }

  .cssDataSec {
    max-height: 400px;
    /* Limit height */
    @apply overflow-y-auto;
    /* Enable vertical scrolling */
    margin-top: 20px;
    /* Spacing for the scrollable section */
  }
</style>
