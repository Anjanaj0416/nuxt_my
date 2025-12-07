<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">
    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="text-2xl uppercase">Manual PI</div>
      </div>
      <div class="w-full md:w-auto flex items-center gap-2">
      </div>
    </div>

    <div class="bg-white p-4 rounded-xl shadow-md max-w-8xl mx-auto mt-10 border">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">

            <!-- To Date -->
            <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">Customer Ref</label>
            <input
                type="text"
                v-model="subData.customerRef"
                placeholder="Enter customer Ref"
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            </div>

            <!-- Keyword -->
            <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">PI No</label>
            <input
                type="text"
                v-model="subData.PINo"
                placeholder="Enter customer PI"
                class="w-full p-2 mt-2 text-gray-900 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
            />
            </div>


        </div>

        <div class="flex justify-center mt-6">
            <button
                @click="SubmitData"
                class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-indigo-400"

            >
            Search
            </button>
        </div>
    </div>

  </section>

</template>

<script>



import { useUserStore } from "~/stores/modules/userStore";
import { useOrderStore } from '~/stores/modules/orderStore';


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: {},
  data() {
    return {
        isAddPayment: false,
        orderCommisionPayId: null,
        subData: 
          {
            PINo: "",
            customerRef: "",
          }
    };
  },
  async created() {
      this.userStore = useUserStore();
      this.orderStore = useOrderStore();
      this.showLoading = this.$showLoading;
     
  },

  methods: {


    SubmitData() {
        console.log("Filters:", this.subData);
        this.orderStore.GetAllManuaPI(this.subData, this.showLoading);
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
