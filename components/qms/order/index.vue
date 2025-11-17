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
                  v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso') || userStore.loggedUser.granted?.includes('cso')"
                  @click="handleCreateClick" 
                />
              </div>
            </div>
          </div>

        <div class="max-h-[660px] overflow-y-auto space-y-4">
          <div
            v-for="(order, index) in orderStore.listOrder"
            :key="index"
            class="flex flex-col gap-3 p-3 mt-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow sm:p-4"
            :class="{
              'border-green-400 border-2': order.orderStatus === 'FullPaid',
              'border-gray-200': order.orderStatus === 'Pending',
              'border-red-300': order.orderStatus === 'Canceled'
            }"
          >
          <!-- {{ order }} -->
            <!-- Top section: Details -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Order No</h1>
                <p class="text-sm font-semibold text-gray-700">{{ order.orderNo }}</p>
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

                <h1 class="text-xs font-medium text-gray-600">Settled Amount</h1>
                <p class="text-sm font-semibold text-gray-800">Rs. {{ order.orderSettledAmount }}</p>
              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Proforma</h1>
                <a
                  :href="order.orderStatus !== 'Active' ? imageroot + order.piUrl : undefined"
                  target="_blank"
                  :class="[
                    'text-sm  hover:underline',
                    order.orderStatus === 'Active'
                      ? 'text-gray-400 cursor-not-allowed pointer-events-none'
                      : 'text-sm font-semibol text-blue-600 hover:underline'
                  ]"
                >
                  view
                </a>

              </div>
              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Proposal</h1>

                <!-- Show "view" only if signed PI is uploaded (boolean true) -->
                <a
                  v-if="order.isScanedProposalUploaded"
                  :href="imageroot + order.scanedProposalUrl"
                  target="_blank"
                  class="text-sm  text-blue-600 hover:underline"
                >
                  View
                </a>

                <!-- Show "Upload Signed PI" only if not uploaded (boolean false) -->
                <button
                  v-else
                  @click="handleProposalUploderClick(order.id)"
                  class="text-sm  text-blue-600 hover:underline"
                >
                  upload proposals
                </button>
              </div>

              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Final Proposal</h1>

                <a
                  :href="order.isScanedProposalUploaded ? imageroot + order.scanedProposalUrl : null"
                  target="_blank"
                  :class="[
                    'text-sm px-2 py-1 rounded',
                    order.isScanedProposalUploaded
                      ? 'text-blue-600 hover:underline'
                      : 'text-gray-400 pointer-events-none cursor-not-allowed'
                  ]"
                >
                  view
                </a>       
              </div>

              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Pi Signed Scan</h1>

                <!-- Show "view" only if signed PI is uploaded (boolean true) -->
                <a
                  v-if="order.isSignedPIUploaded"
                  :href="imageroot + order.piSignedScanUrl"
                  target="_blank"
                  class="text-sm  text-blue-600 hover:underline"
                >
                  View
                </a>

                <!-- Show "Upload Signed PI" only if not uploaded (boolean false) -->
                <button
                  v-else
                  @click="handlePIUploderClick(order.orderNo)"
                  class="text-sm  text-blue-600 hover:underline"
                >
                  upload signed PI
                </button>
              </div>

              <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

              <div class="flex flex-col text-center sm:text-left">
                <h1 class="text-xs font-medium text-gray-600">Status</h1>
                <span 
                  :class="{
                    'bg-green-100 text-green-700': order.orderStatus === 'FullPaid',
                    'bg-yellow-100 text-yellow-700': order.orderStatus === 'Pending',
                    'bg-yellow-600 text-white': order.orderStatus === 'Active',
                    'bg-red-100 text-red-700': order.orderStatus === 'Cancelled'
                  }"
                  class="text-xs font-semibold px-2 py-0.5 rounded-full"
                >
                  <!-- {{ order.orderStatus }} -->
                  {{ formatStatus(order.orderStatus) }}
                </span>
              </div>

              <!-- v-if="order.isSignedPIUploaded" -->

              <!-- Action Buttons -->
              <!-- <div class="flex flex-wrap sm:justify-end gap-2 mt-4">
                <button
                  v-if="order.orderStatus !== 'Canceled'"
                  @click="confirmDelete(order.id)"
                  class="flex items-center gap-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 font-medium text-sm px-4 py-2 rounded-lg transition duration-200"
                >
                  Delete
                </button>
              </div> -->

            </div>

            <!-- Proposal Tab Buttons -->
            <div class="sm:flex sm:justify-end sm:gap-4">
              <div class="grid grid-cols-3 gap-2 sm:flex sm:gap-4 text-sm font-medium text-gray-500">
                <!-- Banner -->
                <button
                  v-if="order.orderStatus !== 'Active'"
                  @click="toggleTab('Banner', order.id)"
                  :class="[
                    'p-4 border-b-2 rounded-t-lg text-center',
                    activeTab.type === 'Banner' && activeTab.orderId === order.id
                      ? 'text-red-600 border-transparent'
                      : 'text-blue-600 border-transparent hover:text-gray-600 hover:border-gray-300 '
                  ]"
                >
                  {{ activeTab.type === 'Banner' && activeTab.orderId === order.id ? 'Close Create Store' : 'Create Store ' }}
                </button>
                <!-- Commision -->
                <button
                  v-if="order.orderStatus !== 'Active'"
                  @click="toggleTab('commission', order.id)"
                  :class="[
                    'p-4 border-b-2 rounded-t-lg text-center',
                    activeTab.type === 'commission' && activeTab.orderId === order.id
                      ? 'text-red-600 border-transparent'
                      : 'text-blue-600 border-transparent hover:text-gray-600 hover:border-gray-300 '
                  ]"
                >
                  {{ activeTab.type === 'commission' && activeTab.orderId === order.id ? 'Close Commision' : 'View Commision' }}
                </button>
                <!-- Installments -->
                <!-- <button
                  v-if="order.orderStatus !== 'Active'"
                  @click="toggleTab('Installment', order.id)"
                  :class="[
                    'p-4 border-b-2 rounded-t-lg text-center',
                    activeTab.type === 'Installment' && activeTab.orderId === order.id
                      ? 'text-red-600 border-transparent'
                      : 'text-blue-600 border-transparent hover:text-gray-600 hover:border-gray-300 '
                  ]"
                >
                  {{ activeTab.type === 'Installment' && activeTab.orderId === order.id ? 'Close Installment' : 'View Installment' }}
                </button> -->
                <!-- Payments -->
                <button
                  v-if="order.orderStatus !== 'Active'"
                  @click="toggleTab('Invoice', order.id)"
                  :class="[
                    'p-4 border-b-2 rounded-t-lg text-center',
                    activeTab.type === 'Invoice' && activeTab.orderId === order.id
                      ? 'text-red-600 border-transparent'
                      : 'text-blue-600 border-transparent hover:text-gray-600 hover:border-gray-300 '
                  ]"
                >
                  {{ activeTab.type === 'Invoice' && activeTab.orderId === order.id ? 'Close Payments' : 'View Payments' }}
                </button>

                <!-- creteOrder -->
                <button
                  v-if="order.orderStatus === 'Active'"
                  @click="createOrder(order.orderNo)"
                  class="text-sm  text-blue-600 hover:underline"
                >
                  Create order
                </button>

                <button
                  v-if="(userStore.loggedUser.granted.includes('sso') || userStore.loggedUser.granted.includes('su')) && (order.orderStatus !== 'Canceled')"
                  @click="confirmDelete(order.id)"
                  class="text-sm  text-blue-600 hover:underline"
                >
                  Delete
                </button>

                <!-- <button v-if="activeOrderWorkFloweId !== order.id"
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
                </button> -->
              </div>
            </div>

            <!-- Button group -->
            <div class="p-0 dark:border-gray-700">
              <div v-if="activeTab.type === 'Invoice' && activeTab.orderId === order.id">
                <Invoice :orderId="order.id" :status="order.orderStatus" :orderNo="order.orderNo" />
              </div>
              <div v-if="activeOrderWorkFloweId === order.id">
                <WorkFlow  />
              </div>
              <div v-if="activeTab.type === 'Installment' && activeTab.orderId === order.id">
                <Installment :orderId="order.id" />
              </div>
              <div v-if="activeTab.type === 'commission' && activeTab.orderId === order.id">
                <commision :orderId="order.id" />
              </div>
              <div v-if="activeTab.type === 'TimeLine' && activeTab.orderId === order.id">
                <TimeLine :orderId="order.id" />
              </div>
              <div v-if="activeTab.type === 'Banner' && activeTab.orderId === order.id">
                <Banner :orderId="order.id" :vendorId="order.clientId" />
              </div>
            </div>
          </div>

          <div v-if="!orderStore.listOrder.length" class="mt-4 text-center text-blue-950">
            No Orders found.
          </div>
        </div>
      </div>

      <AddOrder v-if="isAddEdit && showAddProposal"   @close="handleCloseAddOrder" :customerRef="customerRef" :id="id" :orderNo="selectedOrderNo"/>
      <SignedPIUpload v-if="isSignedPIUploaded"   @close="isSignedPIUploaded = false"  :id="selectedOrderNo" />
      <ProposalUpload v-if="isScanedProposalUploaded"   @Close="isScanedProposalUploaded = false"  :id="selectedOrderId" />

    </section>
  </template>
  
  <script>

  import { useRoute } from 'vue-router'
  import { useUserStore } from "~/stores/modules/userStore";
  import { useOrderStore } from '~/stores/modules/orderStore';

  import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

  import AddOrder from './addOrder.vue';
  import Invoice from "~/components/qms/invoice/index.vue";
  import WorkFlow from "~/components/qms/workFlow/index.vue";
  import SignedPIUpload from './signUpload.vue';
  import ProposalUpload from './proposalUpload.vue';
  import Installment from '../invoice/installment.vue';
  import commision from './commision.vue';
  import TimeLine from './timeLine.vue';
  import Banner from './Productbanner.vue';


 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,Invoice,WorkFlow,AddOrder,SignedPIUpload,ProposalUpload,Installment,commision,TimeLine,Banner},
    props: ['id', 'customerRef'],
    data() {
      return {
        isAddEdit: false,
        isViewMore: false,
        isSignedPIUploaded: false,
        isScanedProposalUploaded: false,
        showInvoice: false,
        showWorkFlow:false,
        activeTab: { type: null, orderId: null },
        selectedOrderId: null,
        selectedOrderNo: null,
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
        { keyword: this.id, searchBy: 'clientId' },
        this.showLoading
      );

      
      // this.orderList = this.quotationStore.orderList;
      this.listOrder = this.orderStore.orderList;


    },

    
    methods: {

      toggleTab(type, orderId) {
        if (this.activeTab.type === type && this.activeTab.orderId === orderId) {
          this.activeTab = { type: null, orderId: null } // close if same tab clicked
        } else {
          this.activeTab = { type, orderId } // open selected tab
        }
      },

      formatStatus(status) {
        const map = {
          FullPaid: "Fully Paid",
          pending: "Pending",
          Active: "Active",
          Canceled: "Cancelled"
        };
        return map[status] || status; 
      },

      handleCreateClick() {
        this.showAddProposal = true;
        this.GoToAddNew(); 
      },

      handlePIUploderClick(orderNo) {
        this.selectedOrderNo = orderNo;
        this.isSignedPIUploaded = true;
      },

      handleProposalUploderClick(id) {
        this.selectedOrderId = id;
        this.isScanedProposalUploaded = true;
      },

      GoToAddNew() {
        this.isAddEdit = true;
      },

      handleCloseAddOrder() {
        this.isAddEdit = false;
        this.showAddProposal = false;
        this.selectedOrderNo = null; 
      },

      createOrder(orderNo) {
        this.selectedOrderNo = orderNo;
        this.showAddProposal = true;
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
  
  
  