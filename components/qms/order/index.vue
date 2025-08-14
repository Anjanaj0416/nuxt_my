<template>
    <section class="justify-center">
      <div  v-if="!showAddProposal && !showInvoice && !showWorkFlow">
        <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div class="text-2xl uppercase">Order </div>
           <!-- <button
              v-if="id"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 transition-all duration-300 bg-white border-1 rounded-full shadow hover:bg-blue-700 hover:text-white hover:shadow-md"
              @click="$emit('close')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Proposals
            </button> -->
            <div class="w-full md:w-auto">
              <div class="mr-2">
            
                <Button class="w-24 px-4 py-1.5 mt-2 rounded-full text-xs transition" label="Create" variant="primary" 
                v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso')"
                  @click="handleCreateClick" />
              </div>
            </div>
          </div>


          <!-- {{ orderStore.listOrder }} -->


          

        <div class="max-h-[660px] overflow-y-auto space-y-4">
          <div
            v-for="(order, index) in orderStore.listOrder"
            :key="index"
            class="flex flex-col gap-3 p-3 mt-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow sm:p-4"
          >
          <!-- {{ order}} -->

            <!-- Top section: Details -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Order No</h1>
                <p class="text-sm font-semibold text-blue-600">{{ order.orderNo }}</p>
              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Date</h1>
                <p class="text-sm text-gray-700">{{ order.orderDate }}</p>
              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Order Type</h1>
                <p class="text-sm text-gray-700">{{ order.orderType }}</p>
              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Amount</h1>
                <p class="text-sm font-semibold text-gray-800">Rs. {{ order.orderAmount }}</p>
              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Proforma</h1>
                <a
                  :href="imageroot + order.piUrl"
                  target="_blank"
                  class="text-sm font-semibold text-blue-600 hover:underline"
                >
                  view
                </a>
              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>


              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Pi Signed Scan</h1>
                <a
                  :href="imageroot + order.piSignedScanUrl"
                  target="_blank"
                  class="text-sm font-semibold text-blue-600 hover:underline"
                >
                  view
                </a>
              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Status</h1>
                <span 
                  :class="{
                    'bg-green-100 text-green-700': order.orderStatus === 'Check All Paid',
                    'bg-yellow-100 text-yellow-700': order.orderStatus === 'pending',
                    'bg-red-100 text-red-700': order.orderStatus === 'Rejected'
                  }"
                  class="text-xs font-semibold px-2 py-0.5 rounded-full"
                >
                  {{ order.orderStatus }}
                </span>
              </div>

              <!-- v-if="order.isSignedPIUploaded" -->

              <div  class="sm:flex sm:justify-end mt-2">
                <button
                  @click="handlePIUploderClick(order.orderNo)"
                  class="text-red-600 border border-red-300 hover:bg-red-50 font-medium text-sm px-4 py-2 rounded-md transition duration-200"
                >
                  SignedPIUploaded
                </button>

              </div>

              <div class="sm:flex sm:justify-end mt-2">
                <button
                  @click="confirmDelete(order.id)"
                  class="text-red-600 border border-red-300 hover:bg-red-50 font-medium text-sm px-4 py-2 rounded-md transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>

            <!-- Proposal Tab Buttons -->
            <div class="sm:flex sm:justify-end sm:gap-4">
              <div class="grid grid-cols-3 gap-2 sm:flex sm:gap-4 text-sm font-medium text-gray-500">
                <button v-if="activeOrderInvoiceId !== order.id"
                  @click="activeOrderInvoiceId = order.id"
                  :class="[
                    'p-4 border-b-2 rounded-t-lg text-center',
                    'border-transparent hover:text-gray-600 hover:border-gray-300'
                  ]">
                  Invoice
                </button>

                <button v-else
                  @click="activeOrderInvoiceId = null"
                  class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent">
                  Close Invoice
                </button>

                <button v-if="activeOrderWorkFloweId !== order.id"
                  @click="activeOrderWorkFloweId = order.id"
                  :class="[
                    'p-4 border-b-2 rounded-t-lg text-center',
                    'border-transparent hover:text-gray-600 hover:border-gray-300'
                  ]">
                  WorkFlow
                </button>

                <button v-else
                  @click="activeOrderWorkFloweId = null"
                  class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent">
                  Close WorkFlow
                </button>
              </div>
            </div>

            <!-- Button group -->
            <div class="p-0 dark:border-gray-700">
              <div v-if="activeOrderInvoiceId === order.id">
                <Invoice :orderId="order.id"/>
              </div>
              <div v-if="activeOrderWorkFloweId === order.id">
                <WorkFlow  />
              </div>
            </div>
          </div>

          <div v-if="!orderStore.listOrder.length" class="mt-4 text-center text-blue-950">
            No quotations found.
          </div>
        </div>
      </div>

      <AddOrder v-if="isAddEdit && showAddProposal" @close="isAddEdit = false; showAddProposal = false" :customerRef="customerRef" :id="id"/>
      <SignedPIUpload v-if="isSignedPIUploaded"  @close="isSignedPIUploaded = false"  :id="selectedOrderId"/>


      
    </section>
  </template>
  
  <script>

 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
//  import { useQuotationStore } from '~/stores/modules/qms/quotationStore';
 import { useOrderStore } from '~/stores/modules/orderStore';
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

  import AddOrder from './addOrder.vue';
  import Invoice from "~/components/qms/invoice/index.vue";
  import WorkFlow from "~/components/qms/workFlow/index.vue";
  import SignedPIUpload from './signUpload.vue';


 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,Invoice,WorkFlow,AddOrder,SignedPIUpload},
    props: ['id', 'customerRef'],
    data() {
      return {
        isAddEdit: false,
        isViewMore: false,
        isSignedPIUploaded: false,
        showInvoice: false,
        showWorkFlow:false,
        activeOrderInvoiceId: null, 
        activeOrderWorkFloweId: null,
        selectedOrderId: null,
        listOrder: [] ,
      }
    },

    async created() {
      this.userStore = useUserStore();
      // this.quotationStore = useQuotationStore();
      this.orderStore = useOrderStore();
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;

      this.showLoading = this.$showLoading;

      // await this.quotationStore.LoadOrders(this.id, this.showLoading);


      await this.orderStore.loadListOrder(
        { keyword: "", searchBy: this.searchBy },
        this.showLoading
      );

      
      // this.orderList = this.quotationStore.orderList;
      this.listOrder = this.orderStore.orderList;


    },

    
    methods: {

        handleCreateClick() {
          this.showAddProposal = true;
          this.GoToAddNew(); 
        },

        handlePIUploderClick(orderNo) {
          this.selectedOrderId = orderNo;
          this.isSignedPIUploaded = true;
        },

        GoToAddNew() {
          this.isAddEdit = true;
        },

        confirmDelete(orderId) {
          this.$showConfirm(
            "Are you sure you want to delete this order?",
            "warning"
          ).then(async (result) => {
            if (!result.isConfirmed) {
              console.log("Action canceled");
              return;
            }

            try {
              // console.log("Deleting Order ID:", orderId);

              await this.orderStore.deleteOrder(orderId, this.showLoading);

            } catch (error) {
              console.error("Failed to delete order:", error);
            }
          });
        },

        async GoToInvoice(){
            this.resetViews();  

            // let id = this.quotationStore.curQuotation.id;
            this.isViewMore = true;
        },

        async GoToWorkFlow(){
            this.resetViews();  

            // let id = this.quotationStore.curQuotation.id;
            this.isViewMore = true;
        },

        resetViews(){
            this.isViewMore= false
            this.showInvoice= false
        },
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
  
  
  