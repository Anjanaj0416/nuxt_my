<template>
    <section class="justify-center">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <!-- <div class="text-2xl uppercase">Invoice</div> -->

        </div>
        <!-- {{ quotationStore.invoiceDetails }}<br><br>
          {{ id }} -->

          <!-- {{ quotationStore.PaymentDetails}} -->

          <!-- {{ orderStore.PaymentDetails }} -->

          <!-- {{ orderId }}<br></br> -->

          <!-- {{ orderNo }} -->


        <div class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800">
          <div class="flex items-center justify-between mb-6">
            <div>
              <!-- <h2 class="text-base font-semibold text-gray-700">
              </h2>
              <h2 class="text-sm font-semibold text-gray-700">
                Balance Payment: <span class="text-gray-500 font-bold">LKR : </span>
              </h2>
              <h2 class="text-sm font-semibold text-gray-700">
                Installment: <span class="text-gray-500 font-bold">Installment</span>
              </h2> -->
          <div class="text-2xl uppercase">Payments</div>

            </div>

            <!-- Button Section (Right) -->
            <div class="w-full md:w-auto"  >
              <div class="mr-2" v-if="status && status.trim().toLowerCase() !== 'canceled'">

                  <Button
                    class="w-26 px-4 py-1.5 mt-2 rounded-full text-xs transition"
                    label="Add Payment"
                    variant="primary"
                    v-if="
                      status !== 'Canceled' &&
                      userStore.loggedUser.granted.includes('su') ||
                      userStore.loggedUser.granted.includes('flo') ||
                      userStore.loggedUser.granted.includes('sso')
                    "
                    @click="GoToPayment"
                  />
              </div>
            </div>
          </div>

          <!-- Payment History Section -->

        <div class="mt-4 overflow-auto max-h-80 max-w-full">
          <div v-if="orderStore.PaymentDetails && orderStore.PaymentDetails.length > 0" class="space-y-2">
            <div
              v-for="(item, index) in orderStore.PaymentDetails"
              :key="index"
              class="bg-white shadow-sm border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 text-xs"
            >

            <!-- {{ item }} -->
              <!-- Top row -->
              <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
                <div class="flex items-center gap-1 text-gray-600">
                  📅 <span class="font-medium">{{ item.paymentDate }}</span>
                </div>
                <div class="text-green-600 font-bold">
                  LKR {{ item.amount }}
                </div>
              </div>

              <!-- Details -->
              <div class="grid grid-cols-2 gap-x-2 gap-y- mt-2">
                <div>
                  <span class="font-semibold text-gray-500">Mode:</span>
                  <span class="ml-1 text-gray-700">{{ item.payMode.trim() }}</span>
                </div>
                <div>
                  <span class="font-semibold text-gray-500">Ref:</span>
                  <span class="ml-1 text-gray-700">{{ item.referenceNo }}</span>
                </div>
                <div>
                  <span class="font-semibold text-gray-500">Receipt:</span>
                  <span class="ml-1 text-gray-700">{{ item.receiptType.trim() }}</span>
                </div>
                <div>
                  <span class="font-semibold text-gray-500">Bank:</span>
                  <span class="ml-1 text-gray-700">{{ item.bankName.trim() }}</span>
                </div>
                <div class="col-span-2">
                  <span class="font-semibold text-gray-500">Remarks:</span>
                  <span class="ml-1 italic text-gray-500">{{ item.remarks || "—" }}</span>
                </div>
              </div>

              <!-- Links -->
              <div class="flex flex-wrap gap-3 mt-2">
                <a
                  v-if="item.paymentSlipUrl"
                  :href="imageroot + item.paymentSlipUrl"
                  target="_blank"
                  class="text-blue-600 hover:underline flex items-center gap-1"
                >
                  📄 Slip
                </a>
                <a
                  class="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  @click="handleInvoice(item)"
                >
                  🧾 Tax Invoice
                </a>
                <a
                  class="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  @click="handleInvoice(item)"
                >
                  🧾 Invoice
                </a>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 py-6 text-sm">
            No payment history found.
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
        const req = {
          orderNo: this.orderNo,
          receiptNo: item.receiptNo,
          amountPaid : item.amount,
          isTax : item.taxRegisteredClient,
        };

        console.log(req);
        
        this.orderStore.PrintInvoice(req, this.$showLoading);
      },


    },
    async beforeMount() {
      // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
      // } else {
      //   this.show_error('Not Allowed to access this page')
      //   this.$router.push('/')
      // }
  
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
  
  
  