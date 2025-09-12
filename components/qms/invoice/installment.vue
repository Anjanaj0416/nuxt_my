<template>
  <section class="justify-center">
    <div
      class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800"
    >
      <div class="mb-6  ">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-2xl uppercase">Installments</div>
            <h1 class="mt-1">
              Full Amount:
              <span class="text-xl font-semibold text-blue-600">LKR: {{ InstalllmentDetails.fullPayment }}</span>
            </h1>
            <h1 class="mt-1">
              Balance Payment:
              <span class="text-normal font-semibold text-blue-600">LKR: {{ InstalllmentDetails.balancePayment }}</span>
            </h1>
          </div>
          <!-- <span class="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold shadow">
            {{ PaymentDetails.installments || PaymentDetails.length }} Installments
          </span> -->
        </div>
      </div>
      <!-- {{ InstalllmentDetails }} -->

      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex justify-between text-xs font-medium mb-1">
          <span>
            Paid: LKR {{ (Number(InstalllmentDetails.fullPayment.replace(/,/g, "")) - Number(InstalllmentDetails.balancePayment.replace(/,/g, ""))).toFixed(2) }}
          </span>
          <span>
            Remaining: LKR {{ Number(InstalllmentDetails.balancePayment.replace(/,/g, "")).toFixed(2) }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            class="bg-green-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>


      <!-- Timeline Style Installments -->
      <div class="relative  border-gray-200  space-y-6">
        <div
          v-for="(inst, index) in InstalllmentDetails.installments"
          :key="index"
          class="relative"
        >
          <!-- Card -->
            <div
                class="p-4 rounded-lg shadow-md border transition"
                :class="{
                'animate-glow border-red-500': inst.status === 'due',
            }"
            >
                <!-- Top row -->
                <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
                <div class="flex items-center gap-1 text-gray-600">
                    <span class="text-lg font-semibold text-gray-600">{{ inst.invoiceTerm }}</span>
                </div>
                    <span
                    :class="[
                        'px-2 py-1 rounded text-xs font-medium',
                        inst.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : inst.status === 'due'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700',
                    ]"
                    >
                    {{ inst.status }}
                    </span>
                </div>

                <!-- Details -->
                <div class="grid grid-cols-3 gap-x-2 gap-y-1 mt-2 text-xs">
                <div>
                    <span class="font-semibold text-gray-500">Invoice Amount :</span>
                    <span class="ml-1 text-gray-700">LKR {{ inst.invoiceAmountShow }}</span>
                </div>
                <div>
                    <span class="font-semibold text-gray-500">Date:</span>
                    <span class="ml-1 text-gray-700">{{ inst.invoiceDate }}</span>
                </div>
                <div>
                    <span class="font-semibold text-gray-500">Due Date:</span>
                    <span class="ml-1 text-gray-700">{{ inst.invoiceDueDate }}</span>
                </div>
                <div>
                    <span class="font-semibold text-gray-500">Receipt:</span>
                    <span class="ml-1 text-gray-700">Cash</span>
                </div>

                </div>

                <!-- Links -->
                <!-- <div class="flex flex-wrap gap-3 mt-4">
                    <a class="text-blue-600 hover:underline flex items-center gap-1">
                        🧾 Invoice
                    </a>
                </div> -->
            </div>
           


        </div>

        <!-- Empty State -->
        <div v-if="!InstalllmentDetails?.installments?.length" class="text-center text-gray-500 py-6">
          No installments found.
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { useOrderStore } from "~/stores/modules/orderStore";

export default {
  props: ["orderId", "orderNo"],
  data() {
    return {
    InstalllmentDetails: {
      fullPayment: "0.00",
      balancePayment: "0.00",
      installments: [],
    },
    };
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.orderStore = useOrderStore();

    await this.orderStore.GetInstallmentDetails(this.orderId,this.showLoading);
    this.InstalllmentDetails = this.orderStore.InstalllmentDetails;

  },
  computed: {
    progress() {
      const full = Number(this.InstalllmentDetails.fullPayment?.toString().replace(/,/g, "")) || 0;
      const balance = Number(this.InstalllmentDetails.balancePayment?.toString().replace(/,/g, "")) || 0;
      const paid = full - balance;
      return full > 0 ? (paid / full) * 100 : 0;
    },
  },
  methods: {
    handleInvoice(item) {
      console.log("Invoice clicked", item);
      // your print logic here
    },
  },
};
</script>

<style scoped>
  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    }
    50% {
      box-shadow: 0 0 15px rgba(255, 0, 0, 0.9);
    }
    100% {
      box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    }
  }

  .animate-glow {
    animation: glow 1.5s infinite ease-in-out;
  }
</style>
