<template>
    <section class="justify-center">
        <div class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800">
            <div class="flex items-center justify-between mb-6">
                <div class="mb-6  ">
                    <div class="flex justify-between items-center">
                    <div>
                        <div class="text-2xl uppercase">Commision</div>
                        <h1 class="mt-1">
                            Payble Amount:
                        <span class="text-xl font-semibold text-blue-600">LKR: </span>
                        </h1>
                        <h1 class="mt-1">
                            Paid Amount:
                        <span class="text-normal font-semibold text-blue-600">LKR: </span>
                        </h1>
                    </div>
                    </div>
                </div>
                <!-- Button Section (Right) -->
                <div class="w-full md:w-auto">
                    <div class="mr-2" >
                        <Button
                            class="w-26 px-4 py-1.5 mt-2 rounded-full text-xs transition"
                            label="Add Commision"
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
            <div class="mt-4 overflow-auto max-h-80 max-w-full">
                <div v-if="orderStore.CommisionDetails && orderStore.CommisionDetails.length > 0" class="space-y-2">
                    <div
                        v-for="(item, index) in orderStore.CommisionDetails"
                        :key="index"
                        class="bg-white shadow-sm border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 text-xs"
                    >
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
                                <span class="font-semibold text-gray-500">Officer Name</span>
                                <span class="ml-1 text-gray-700">{{ item.receiptNo}}</span>
                            </div>
                            <div>
                                <span class="font-semibold text-gray-500">Ref:</span>
                                <span class="ml-1 text-gray-700"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center text-gray-500 py-6 text-sm">
                    No Commision payment history found.
                </div>
            </div>

        </div>
        <addCommision :orderId="selectedOrderId" v-if="isAddPayment" @close="isAddPayment = false" />
    </section>
  </template>
  
  <script>
 import { useRoute } from 'vue-router'
 import { useUserStore } from "~/stores/modules/userStore";
 import { useOrderStore } from '~/stores/modules/orderStore';
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import addCommision from './addCommision.vue';


 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2,addCommision},
    props:['orderId','status','orderNo'],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        isAddPayment: false,
        receiptFiles: {},
        selectedOrderId: null,
      }
    },
    async mounted() {
     
    },
    async created() {
      this.userStore = useUserStore();
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
      this.orderStore = useOrderStore();
      this.showLoading = this.$showLoading;

      await this.orderStore.GetCommisionList(this.orderId, this.showLoading);

      this.CommisionDetails = this.orderStore.CommisionDetails;

    },
    watch: {},
    computed: {
  
    },
    methods: {

      GoToPayment() {
        this.selectedOrderId = this.orderId;
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
  
  
  