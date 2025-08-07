<template>
    <section class="justify-center">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div class="text-2xl uppercase">Invoice</div>

        </div>

        <!-- {{ quotationStore.invoiceDetails }}<br><br>
          {{ id }} -->

          <!-- {{ quotationStore.PaymentDetails}} -->


        <div class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-base font-semibold text-gray-700">
                <!-- Full Payment: <span class="text-blue-600 font-bold">LKR: {{ invoice.InvoiceDetails.FullPayment }}</span> -->
              </h2>
              <h2 class="text-sm font-semibold text-gray-700">
                Balance Payment: <span class="text-gray-500 font-bold">LKR :  {{ quotationStore.invoiceDetails.balancePayment? quotationStore.invoiceDetails.balancePayment: '-' }}</span>
              </h2>
              <h2 class="text-sm font-semibold text-gray-700">
                Installment: <span class="text-gray-500 font-bold">{{ quotationStore.invoiceDetails.noOfInstallment? quotationStore.invoiceDetails.noOfInstallment: 'No' }} Installment</span>
              </h2>
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

          <ol class="flex items-center w-full">
            <li
              v-for="(item, index) in quotationStore.invoiceDetails.listInvoices"
              :key="item.id"
              class="flex items-center text-blue-600 relative"
              :class="{ 'w-full': index !== quotationStore.invoiceDetails.listInvoices.length - 1 }"
            >
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full z-10 ring-2 shrink-0"
                :class="{
                  'bg-green-100 ring-green-600': item.status === 'paid',
                  'bg-red-100 ring-red-600': item.status === 'Late Payment',
                  'bg-yellow-100 ring-yellow-600': item.status === 'Pending'
                }"
              >
                <svg
                  v-if="item.status === 'paid'"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-5 h-5 text-green-600"
                  fill="currentColor"
                >
                  <path
                    d="M256 8C119 8 8 119 8 256s111 248 248 248
                      248-111 248-248S393 8 256 8zM377 187l-136 136c-4.7 4.7-12.3 
                      4.7-17 0l-72-72c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 
                      12.3-4.7 17 0l47.5 47.5L343 153c4.7-4.7 
                      12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="w-5 h-5"
                  :class="{
                    'text-red-500': item.status === 'Late Payment',
                    'text-yellow-500': item.status === 'Pending'
                  }"
                  fill="currentColor"
                >
                  <path
                    d="M256 8C119 8 8 119 8 256s111 248 
                      248 248 248-111 248-248S393 8 256 8zm12 
                      136h-24c-6.6 0-12 5.4-12 12v116c0 4.2 
                      2.2 8.2 5.8 10.4l96 58c5.7 3.5 13.1 
                      1.7 16.6-4l12-20c3.5-5.7 1.7-13.1-4-16.6L268 
                      276.1V156c0-6.6-5.4-12-12-12z"
                  />
                </svg>
              </div>
              <div
                v-if="index !== quotationStore.invoiceDetails.listInvoices.length - 1"
                class="hidden sm:block w-full h-0.5 bg-gray-300"
              ></div>
            </li>
          </ol>

          <div class="mt-6 flex justify-between text-xs text-gray-600">
            <div
              v-for="item in quotationStore.invoiceDetails.listInvoices"
              :key="'label-' + item.id"
              class="text-center flex flex-col items-center"
            >
              <p class="font-semibold">{{ item.installmentNo }}</p>
              <p class="font-semibold">Due Date {{ item.dueDateDisplay }}</p>
              <p class="mb-2">LKR {{ item.invoiceAmountDisplay }}</p>

              <!-- Status badge -->
              <span
                v-if="item.status === 'paid'"
                class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
              >
                Paid
              </span>
              <span
                v-else-if="item.status === 'Late Payment'"
                class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
              >
                Late payment
              </span>
              <span
                v-else
                class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
              >
                Pending
              </span>


              <!-- Action -->
              <a
                v-if="item.status === 'paid'"
                :href="item.invoiceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-medium text-blue-900 underline mt-2 justify-between"
              >
                View
              </a>

            </div>
          </div>

          <!-- Payment History Section -->

          <div class="mt-6 overflow-auto max-h-64 max-w-full">
            <h3 class="text-sm font-semibold text-gray-700 mb-4">Payment History</h3>

            <div v-if="quotationStore.PaymentDetails && quotationStore.PaymentDetails.length > 0" class="space-y-3">
              <div
                v-for="(item, index) in quotationStore.PaymentDetails"
                :key="index"
                class="bg-white border-l-4 border-blue-500 shadow-sm rounded-lg p-4 text-xs md:grid md:grid-cols-8 gap-2 items-center"
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
                    :href="item.paymentSlipUrl"
                    target="_blank"
                    class="text-blue-600 underline"
                  >
                    🔗 View Slip
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
 import { useQuotationStore } from '~/stores/modules/qms/quotationStore';
 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
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
    props:['id'],
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
      this.quotationStore = useQuotationStore();
      this.showLoading = this.$showLoading;

      await this.quotationStore.GettInvoiceDetails(this.id, this.showLoading);
      this.invoiceDetails = this.quotationStore.invoiceDetails;

      await this.quotationStore.GetPaymenteDetails(this.id, this.showLoading);
      this.PaymentDetails = this.quotationStore.PaymentDetails;

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
  
  
  