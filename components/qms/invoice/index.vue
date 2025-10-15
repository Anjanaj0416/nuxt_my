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
               <div class="text-2xl uppercase">Payments</div>

            </div>
            <!-- Button Section (Right) -->
            <div class="w-full md:w-auto">
              <div class="mr-2" v-if="status && status.trim().toLowerCase() !== 'canceled' && status !== 'FullPaid'">
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
          </div>

          <!-- Payment History Section -->
          <div class="relative  border-gray-200 overflow-auto max-h-80 space-y-6">
            <div class="relative">
              <!-- v-if="orderStore.PaymentDetails && orderStore.PaymentDetails.length > 0" -->
              <div 
                v-for="(installment, iIndex) in listInstallment"
                :key="iIndex"
                class="p-4 rounded-lg shadow-md border transition border-gray-500 my-3"
              >
                <!-- Header -->
                <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
                  <div class="flex items-center gap-1 text-gray-600">
                    <span class="text-lg font-semibold text-gray-600">{{ installment.Term }}</span>
                  </div>
                  <span 
                    class="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700"
                  >
                    Pending
                  </span>
                </div>

                <!-- Installment details -->
                <div class="grid grid-cols-3 gap-x-2 gap-y-1 mt-2 text-xs">
                  <div>
                    <span class="font-semibold text-gray-500">Installment Amount :</span>
                    <span class="ml-1 text-gray-700">{{ installment.InstallmentAmount }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Paid Amount :</span>
                    <span class="ml-1 text-gray-700">{{ installment.PaidAmount }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Balance :</span>
                    <span class="ml-1 text-gray-700">{{ installment.Balance }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Payment Date :</span>
                    <span class="ml-1 text-gray-700">{{ installment.PaymentDate }}</span>
                  </div>
                  <div>
                    <span class="font-semibold text-gray-500">Payment Due Date :</span>
                    <span class="ml-1 text-gray-700">{{ installment.PaymentDueDate }}</span>
                  </div>
                </div>

                <!-- Payment History -->
                <div class="mt-4 max-w-full overflow-auto max-h-80 ">
                  <div 
                    v-if="installment.listPayment && installment.listPayment.length > 0"
                    class="space-y-2"
                  >
                    <div
                      v-for="(item, pIndex) in installment.listPayment"
                      :key="pIndex"
                      class="bg-white shadow-sm border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 text-xs"
                    >
                      <!-- Top row -->
                      <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
                        <div class="flex items-center gap-1 text-gray-600">
                          📅 <span class="font-medium">{{ item.PaidDate }}</span>
                        </div>
                        <div class="text-green-600 font-bold">
                          LKR {{ item.PaidAmount }}
                        </div>
                      </div>

                      <!-- Payment Details -->
                      <div class="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
                        <div>
                          <span class="font-semibold text-gray-500">Receipt No:</span>
                          <span class="ml-1 text-gray-700">{{ item.ReceiptNo }}</span>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-500">Receipt Type:</span>
                          <span class="ml-1 text-gray-700">{{ item.ReceiptType }}</span>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-500">Reference:</span>
                          <span class="ml-1 text-gray-700">{{ item.Reference || '—' }}</span>
                        </div>
                        <div>
                          <span class="font-semibold text-gray-500">Bank:</span>
                          <span class="ml-1 text-gray-700">{{ item.Bank }}</span>
                        </div>
                        <div class="col-span-2">
                          <span class="font-semibold text-gray-500">Remarks:</span>
                          <span class="ml-1 italic text-gray-500">{{ item.Remarks || "—" }}</span>
                        </div>
                      </div>

                      <!-- Links Section -->
                      <div class="flex flex-wrap gap-3 mt-2">
                        <!-- Slip -->
                        <div>
                          <a
                            v-if="item.IsSlipUploaded && item.SlipUrl"
                            :href="imageroot + item.SlipUrl"
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
                            v-if="!item.IsTaxInvoicePrinted"
                            class="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                            @click="handleInvoice(item)"
                          >
                            🧾 Create Tax Invoice
                          </a>
                          <a
                            v-else-if="item.IsTaxInvoicePrinted && item.TaxInvoiceURL"
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
                            v-if="!item.IsInvoicePrinted"
                            class="text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                            @click="handleInvoice(item)"
                          >
                            🧾 Create Invoice
                          </a>
                          <a
                            v-else-if="item.IsInvoicePrinted && item.InvoiceURL"
                            :href="imageroot + item.InvoiceURL"
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
        listInstallment: [
          {
            Term: "Installment 1",
            InstallmentAmount: 12000,
            PaidAmount: 10000,
            Balance: 2000,
            PaymentDate: "2025-Sep-01",
            PaymentDueDate: "2025-Sep-01",
            listPayment: [
              {
                PaidDate: "2025-Dec-12",
                PaidAmount: 8000,
                ReceiptNo: "CUST005",
                ReceiptType: "Adv-Receipt",
                Remarks: "balance will pay next week",
                Reference: "",
                Bank: "Sampath Bank",
                IsSlipUploaded: true,
                SlipUrl: "",
                IsTaxInvoicePrinted: false,
                TaxInvoiceURL: "",
                IsInvoicePrinted: false,
                InvoiceURL: ""
              },
              {
                PaidDate: "2025-Sep-24",
                PaidAmount: 10000,
                ReceiptNo: "CUST005",
                ReceiptType: "Adv-Receipt",
                Remarks: "balance will pay next week",
                Reference: "",
                Bank: "Sampath Bank",
                IsSlipUploaded: true,
                SlipUrl: "",
                IsTaxInvoicePrinted: false,
                TaxInvoiceURL: "",
                IsInvoicePrinted: false,
                InvoiceURL: ""
              }
            ]
          },
          {
            Term: "Installment 2",
            InstallmentAmount: 24000,
            PaidAmount: 10000,
            Balance: 2000,
            PaymentDate: "2025-Sep-01",
            PaymentDueDate: "2025-Sep-01",
            listPayment: [
              {
                PaidDate: "2025-Sep-24",
                PaidAmount: 10000,
                ReceiptNo: "CUST005",
                ReceiptType: "Adv-Receipt",
                Remarks: "balance will pay next week",
                Reference: "",
                Bank: "Sampath Bank",
                IsSlipUploaded: true,
                SlipUrl: "",
                IsTaxInvoicePrinted: false,
                TaxInvoiceURL: "",
                IsInvoicePrinted: false,
                InvoiceURL: ""
              }
            ]
          }
        ]
        
        
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
  
  
  