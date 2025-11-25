<template>
    <section class="justify-center">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <!-- <div class="text-2xl uppercase">Invoice</div> -->
        </div>

        <!-- <pre>{{ JSON.stringify(orderStore.PaymentDetails, null, 2) }}</pre> -->

        <div class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800">


          <div class="flex flex-wrap items-center justify-between mb-6">
            <div class="text-xl sm:text-xl md:text-2xl uppercase mb-3 sm:mb-0">Payments</div>
            <!-- Button Section (Right) -->
            <div class="w-full md:w-auto flex justify-start md:justify-end " v-if="status && status.trim().toLowerCase() !== 'canceled' && status !== 'FullPaid'">
              <Button
                class="w-26 px-4 py-1.5 mt-2 rounded-full text-xs transition"
                label="Add Payment"
                variant="primary"
                v-if="
                  (status !== 'Canceled' && status !== 'FullPaid') &&
                  (userStore.loggedUser.granted.includes('su') ||
                  userStore.loggedUser.granted.includes('accdept') )
                "
                @click="GoToPayment"
              />
            </div>
          </div>


          <!-- Payment History Section -->
          <div class="relative  border-gray-200 overflow-auto max-h-660 space-y-6">
            <div v-if="orderStore.PaymentDetails.listInstallment && orderStore.PaymentDetails.listInstallment.length > 0" class="relative">
              <div 
                v-for="(inst, iIndex) in orderStore.PaymentDetails.listInstallment"
                :key="iIndex"
                class="p-4 rounded-lg shadow-md border transition border-gray-500 my-3"
              >
                <!-- Header -->
                <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
                  <div class="flex items-center gap-1 text-gray-600">
                    <span class="text-lg font-semibold text-gray-600">{{ inst.term }}</span>
                  </div>
                  <!-- <span 
                    class="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700"
                  >
                    Pending
                  </span> -->
                </div>

                <!-- Installment details -->
                <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-1 mt-2 text-xs">
                  <div>
                    <span class="font-semibold text-gray-500">Installment Amount :</span>
                    <span class="ml-1 text-gray-700">{{ inst.installmentAmount }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Paid Amount :</span>
                    <span class="ml-1 text-gray-700">{{ inst.paidAmount }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Balance :</span>
                    <span class="ml-1 text-gray-700">{{ inst.balance }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Payment Date :</span>
                    <span class="ml-1 text-gray-700">{{ inst.installmentDate }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Payment Due Date :</span>
                    <span class="ml-1 text-gray-700">{{ inst.installmentDueDate }}</span>
                  </div>
                </div>

                <!-- Payment History -->
                <div class="mt-4 max-w-full overflow-auto max-h-80 ">
                  <div 
                    v-if="inst.listPayment && inst.listPayment.length  > 0"
                    class="space-y-2"
                  >
                    <div
                      v-for="(item, pIndex) in inst.listPayment"
                      :key="pIndex"
                      class="bg-white shadow-sm border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 text-xs"
                    >
                      <!-- Top row -->
                      <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
                        <div class="flex items-center gap-1 text-gray-600">
                          📅 <span class="font-medium">{{ item.paidDate }}</span>
                        </div>
                        <div class="text-green-600 font-bold">
                          LKR {{ item.paidAmount }}
                        </div>
                      </div>

                      <!-- Payment Details -->
                      <div class="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
                        <div>
                          <span class="font-semibold text-gray-500">Receipt No:</span>
                          <span class="ml-1 text-gray-700">{{ item.receiptNo }}</span>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-500">Receipt Type:</span>
                          <span class="ml-1 text-gray-700">{{ item.receiptType }}</span>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-500">Reference:</span>
                          <span class="ml-1 text-gray-700">{{ item.reference || '—' }}</span>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-500">Bank:</span>
                          <span class="ml-1 text-gray-700">{{ item.bank }}</span>
                        </div>
                        <div class="col-span-2">
                          <span class="font-semibold text-gray-500">Remarks:</span>
                          <span class="ml-1 italic text-gray-500">{{ item.remarks || "—" }}</span>
                        </div>
                      </div>

                      <!-- Links Section -->
                      <div class=" gap-3 mt-2 flex flex-row gap-2 overflow-x-auto items-center whitespace-nowrap
                        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 
                        sm:flex sm:flex-wrap sm:gap-4 sm:overflow-visible"
                      >
                        <!-- Slip -->
                        <div>
                          <a
                            v-if="item.isSlipUploaded && item.slipUrl"
                            :href="imageroot + item.slipUrl"
                            target="_blank"
                            class="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            📄 Slip
                          </a>
                          <span v-else class="text-gray-400 italic">No slip uploaded</span>
                        </div>

                        <!-- Tax Invoice -->
                        <div>
                          <a
                            v-if="!item.isTaxInvoicePrinted"
                            class="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                            @click="handleInvoice(item)"
                          >
                            🧾 Create Tax Invoice
                          </a>
                          <a
                            v-else-if="item.isTaxInvoicePrinted && item.TaxInvoiceURL"
                            :href="imageroot + item.TaxInvoiceURL"
                            target="_blank"
                            class="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            🧾 Tax Invoice
                          </a>
                          <span v-else class="text-gray-400 italic">No Tax Invoice</span>
                        </div>

                        <!-- Regular Invoice -->
                        <div>
                          <a
                            v-if="!item.isInvoicePrinted"
                            class="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                            @click="handleInvoice(item)"
                          >
                            🧾 Create Invoice
                          </a>
                          <a
                            v-else-if="item.isInvoicePrinted && item.invoiceURL"
                            :href="imageroot + item.invoiceURL"
                            target="_blank"
                            class="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            🧾 Invoice
                          </a>
                          <span v-else class="text-gray-400 italic">No Invoice</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else class="text-center text-gray-500 py-6 text-sm">
                    No payment history found.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <addPayment :orderId="selectedOrderId" v-if="isAddPayment" @close="isAddPayment = false" />
    </section>
  </template>
  
  <script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 import { useOrderStore } from '~/stores/modules/orderStore';

 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import addPayment from './addPayment.vue';

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,addPayment},
    props:['orderId','status','orderNo'],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        isAddPayment: false,
        receiptFiles: {},
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
      this.orderStore = useOrderStore();
      this.showLoading = this.$showLoading;

      await this.orderStore.GettPaymentDetails(this.orderId, this.showLoading);

      this.PaymentDetails = this.orderStore.PaymentDetails;

    },
    watch: {},
    computed: {
  
    },
    methods: {
      GoToPayment() {
        this.selectedOrderId = this.orderId;
        this.isAddPayment = true;
      },
    async handleInvoice(item) {
      const amountPaid = Number(String(item.paidAmount).replace(/,/g, ''));
      const req = {
        orderNo: this.orderNo,
        receiptNo: item.receiptNo,
        amountPaid: amountPaid,
        isTax: item.isTaxInvoicePrinted,
      };

      const loading = this.$showLoading?.('');

      try {
        const response = await this.orderStore.PrintInvoice(req, this.$showLoading);

        // Force Vue to detect deep changes (optional)
        this.orderStore.PaymentDetails.listInstallment = [
          ...this.orderStore.PaymentDetails.listInstallment
        ];

      } catch (error) {
        console.error(error);
        this.$toast?.('Failed to generate invoice', 'error');
      } finally {
        loading?.close();
      }
    },
    },
    async beforeMount() {
    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }

    
  </script>
  
  <style scoped>
  .csscmd{
    @apply p-2 text-center bg-blue-200 rounded;
  }
  .csscmd:hover{
    @apply bg-blue-200 cursor-pointer;
  }
  
  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }

  @keyframes glow {
  0% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
  }
  100% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
}

.animate-glow {
  animation: glow 1.5s infinite ease-in-out;
}
  </style>
  
  
  