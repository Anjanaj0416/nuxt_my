<template>
    <section class="justify-center">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div class="text-2xl uppercase">Invoice</div>

        </div>

        <!-- {{ quotationStore.invoiceDetails }}<br><br>
          {{ id }} -->

          <!-- {{ quotationStore.PaymentDetails}} -->

          <!-- {{ orderStore.PaymentDetails }} -->


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
            </div>

            <!-- Button Section (Right) -->
            <div class="w-full md:w-auto">
              <div class="mr-2">
                <Button class="w-24 px-4 py-1.5 mt-2 rounded-full text-xs transition" label="Payment" variant="primary"   @click="GoToPayment"/>
                <!-- v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso')"
                  @click="handleCreateClick"  -->
              </div>
            </div>
          </div>

          <!-- Payment History Section -->

          <div class="mt-6 overflow-auto max-h-64 max-w-full">


            <div v-if="orderStore.PaymentDetails &&orderStore.PaymentDetails.length > 0" class="space-y-3">
              <div
                v-for="(item, index) in orderStore.PaymentDetails"
                :key="index"
                class="bg-white border-l-4 border-blue-500 shadow-sm rounded-lg p-4 text-xs md:grid md:grid-cols-10 gap-2 items-center"
              >
                <div class="font-medium text-gray-600">📅 {{ item.paymentDate }}</div>
                <div class="text-green-600 font-bold">LKR {{ item.amount }}</div>
                <div class="text-gray-700">🏦 {{ item.payMode.trim() }}</div>
                <div class="text-gray-700">Reference No : {{ item.referenceNo }}</div>
                <div class="text-gray-700">📄 {{ item.receiptType.trim() }}</div>
                <div class="text-gray-700">🏛️ {{ item.bankName.trim() }}</div>
                <div class="italic text-gray-500">{{ item.remarks }}</div>
                <div>
                  <a
                    v-if="item.paymentSlipUrl"
                    :href="imageroot + item.paymentSlipUrl"
                    target="_blank"
                    class="text-blue-600 underline"
                  >
                    🔗 View Slip
                  </a>
                </div>
                <div>
                  <a
                    v-if="item.taxInvoiceURL"
                    :href="imageroot + item.taxInvoiceURL"
                    target="_blank"
                    class="text-blue-600 underline"
                  >
                    🔗 View tax Invoice
                  </a>
                </div>
                <div>
                  <a
                    v-if="item.invoiceURL"
                    :href="imageroot + item.invoiceURL"
                    target="_blank"
                    class="text-blue-600 underline"
                  >
                    🔗 View Invoice
                  </a>
                </div>
              </div>
            </div>

            <div v-else>
              No payment history found.
            </div>
          </div>

 

        </div>
        <addPayment :id="id" v-if="isAddPayment" @close="isAddPayment = false" />
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
    props:['orderId'],
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
        this.isAddPayment = true;
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
  
  
  