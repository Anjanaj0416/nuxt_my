<template>
  <section class="">
    <!-- Header -->
    <headerdd />


    <!-- Horizontal Button Bar  zz-->
    <div class="h-screen">
      <div class="flex flex-row gap-2 overflow-x-auto py-4 px-2 mt-16 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
        <button
          v-for="master in posStore.listMainCategries"
          :key="master.id"
          @click="selectMasterCategory(master.id)"
          :class="selectedMasterCategory === master.id 
            ? 'bg-blue-800 text-white' 
            : 'bg-blue-500 text-white'"
          class="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-full shadow-lg hover:scale-105 transition"
        >           
          <img
            :src="master.imageUrl"
            alt="Image"
            class="w-6 h-6 object-contain"
          />
          <span>{{ master.value }}</span>
        </button>
      </div>

      <!-- POS Layout -->
      <div class="flex h-[calc(100vh-8rem)] gap-4 mt-2 px-2">
      
        <!-- Left: Category List -->
         
         
        
        <div class="w-24 bg-gray-100 p-2 rounded-lg overflow-y-auto">
          <div class="flex flex-col gap-2">

            <!-- <button
              v-for="subcat in posStore.listSubCategories"
              :key="subcat.id"
              @click="selectSubCategory(subcat.id)" 
              :class="selectedCategory === subcat.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700'"
              class="flex flex-col items-center justify-center p-2 rounded-xl hover:scale-105 transition"
            >
               <img  :src="subcat.imageUrl" class="w-8 h-8 rounded mb-1"/>
              <span class="text-xs text-center truncate">{{ subcat.value  }}</span>
            </button> -->

            <button
              v-for="subcat in posStore.listSubCategories"
              :key="subcat.id"
              @click="selectSubCategory(subcat.id)" 
              :style="{ backgroundImage: `url(${subcat.imageUrl})` }"
              :class="selectedCategory === subcat.id 
                ? 'ring-2 ring-blue-600 shadow-lg' 
                : 'shadow-md'"
              class="relative flex flex-col items-center justify-end w-18 h-20 bg-cover bg-center rounded-2xl overflow-hidden hover:scale-105 transition"
            >
              <!-- Overlay for readability -->
              <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent"></div>

              <!-- Product Name -->
              <span class="relative z-0 text-sm font-semibold text-black text-center px-2 truncate ">
                {{ subcat.value }}
              </span>
            </button>

          </div>
        </div>

        <!-- Middle: Items Grid -->
        <!-- <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto" v-if="this.posStore.listItems">
          <div 
            v-for="item in this.posStore.listItems"
            :key="item.id"
            @click="addToCart(item)"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer overflow-hidden h-48 lg:h-42"

          >
            <div class="w-full aspect-[4/3] bg-gray-200 rounded-t-2xl overflow-hidden">
              <img :src="item.itemImage  || 'https://via.placeholder.com/600x400?text=No+Image'" class="w-full h-full object-cover"/>
            </div>
            <div class="p-2 flex flex-col items-center justify-between">
              <div class="text-sm font-semibold text-gray-800 truncate">{{ item.itemName  }}</div>
              <div class="text-xs text-gray-600 mt-1">₨{{ item.price?.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</div>
            </div>
          </div>
        </div> -->
        <div
          class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto"
          v-if="posStore.listItems"
        >
          <div 
            v-for="item in posStore.listItems"
            :key="item.id"
            @click="addToCart(item)"   
            class="relative flex flex-col items-center justify-end w-full h-48 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform cursor-pointer overflow-hidden"
            :style="{ backgroundImage: `url(${item.itemImage || 'https://via.placeholder.com/600x400?text=No+Image'})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
          >
            <!-- Discount Badge -->
            <div 
              v-if="item.discount"
              class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow"
            >
              -₨{{ item.discount?.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
            </div>

            <!-- Overlay -->
            <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent"></div>

            <!-- Product Info -->
            <div class="relative z-0 w-full text-center p-1">
              <div class="text-base font-semibold text-black truncate">{{ item.itemName }}</div>
              <div class="text-base font-semibold text-gray-800">
                ₨{{ (item.price - item.discount)?.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
              </div>
            </div>
          </div>
        </div>



        
       
        <!-- Right: Selected Items & Total -->
        <div class="w-96 bg-gray-50 p-4 rounded-lg flex flex-col gap-4 hidden lg:flex">
          <h2 class="text-lg font-bold mb-2">Selected Items</h2>
          <div class="flex-1 overflow-y-auto">
            <div class="flex-1 min-h-0 overflow-y-auto space-y-3 p-2">
              <div
                v-for="(cartItem, index) in cart"
                :key="cartItem.id + '-' + index"
                class="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
              >
                <!-- Top Row -->
                <div class="flex items-start">
                  <div class="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                    <img :src="cartItem.itemImage || 'https://via.placeholder.com/60'" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 ml-3">
                    <div class="flex justify-between items-center">
                      <span class="font-semibold text-gray-800 truncate text-sm sm:text-base">{{ cartItem.itemName }}</span>
                      <button @click="cart.splice(index, 1)" class="text-red-500 font-bold text-lg hover:scale-110 transition">✕</button>
                    </div>
                    <p class="text-xs sm:text-sm text-gray-500">
                      Price: ₨{{ cartItem.price.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                    </p>
                  </div>
                </div>

                <!-- Qty, Discount, Total -->
                <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div class="flex items-center gap-2">
                    <span class="text-gray-500 text-sm">Qty:</span>
                    <input 
                      type="number" 
                      v-model.number="cartItem.qty" 
                      min="1"
                      class="w-16 h-10 border border-gray-300 text-gray-800 rounded-lg text-center text-sm sm:text-base font-semibold focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                  </div>

                  <div class="flex items-center gap-2">
                    <span class="text-gray-500 text-sm">Disc:</span>
                    <input 
                      type="number" 
                      v-model.number="cartItem.discount" 
                      min="0"
                      class="w-32 h-10 border border-gray-300 text-gray-800 rounded-lg text-center text-sm sm:text-base font-semibold focus:ring-2 focus:ring-green-400 focus:border-green-400"
                    />
                  </div>

                  <div class="ml-auto text-right">
                    <span class="block text-gray-500 text-xs">Total</span>
                    <span class="font-bold text-blue-600 text-lg sm:text-xl tracking-wide">
                      LKR {{ ((cartItem.price * (cartItem.qty || 1)) - (cartItem.discount || 0)).toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add more selected items dynamically -->
          </div>

          <div class="mt-4 space-y-2 border-t border-gray-300 pt-4">
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>Subtotal</span>
              <span>₨{{ totalBeforeTax.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>Whole Discount</span>
              <input type="number" v-model.number="subDiscount"
                    class="w-16 border border-gray-300 text-gray-800 rounded text-center text-xs px-1"/>
            </div>
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>VAT</span>
              <span>₨{{ cvatAmount.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="border-t border-gray-300 mt-4 pt-4">
              <div class="flex justify-between font-semibold text-gray-700 text-lg">
                <span>Total</span>
                <span>₨{{ grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-3">
            <button @click="handleCashClick('cash')" class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md">💳 Pay Now</button>
            <button @click="handleCardClick('card')" class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md">⏸️ Hold Payment</button>
            <!-- <button @click="handleOtherClick('other')" class="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold shadow-md">Other</button> -->
          </div>

        </div>
      </div>
      <!-- Floating Button (Mobile only) -->
      <button
        @click="showCartModal = true"
        class="lg:hidden fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
      >
        <span class="font-bold">₨{{ grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
        <span class="bg-white text-blue-600 font-bold px-2 py-1 rounded-full text-xs">
          {{ cart.length }}
        </span>
      </button>

      <!-- Mobile Cart Modal -->
      <div v-if="showCartModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 lg:hidden">
        <div class="bg-white w-full rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto">
          <!-- header -->
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-700">Your Cart</h2>
            <button @click="showCartModal = false" class="text-red-500 font-bold">✕</button>
          </div>
          <!-- reuse same cart UI (copied from sidebar) -->
          <div class="flex-1 space-y-3 overflow-y-auto p-2">
            <div
              v-for="(cartItem, index) in cart"
              :key="cartItem.code"
              class="bg-white rounded-xl shadow-md p-3 flex items-start"
            >
              <div class="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                <img :src="cartItem.image || 'https://via.placeholder.com/60'" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 ml-3">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-gray-800 truncate">{{ cartItem.name }}</span>
                  <button @click="cart.splice(index, 1)" class="text-red-500 font-bold">✕</button>
                </div>
                <p class="text-xs text-gray-500 mb-1">
                  Price: ₨{{ cartItem.price.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="flex items-center space-x-1">
                    <span class="text-gray-500">Qty:</span>
                    <input type="number" v-model.number="cartItem.qty" min="1"
                          class="w-10 border border-gray-300 rounded text-center text-xs px-1"/>
                  </span>
                  <span class="flex items-center space-x-1">
                    <span class="text-gray-500">Disc:</span>
                    <input type="number" v-model.number="cartItem.discount" min="0"
                          class="w-12 border border-gray-300 rounded text-center text-xs px-1"/>
                  </span>
                  <span class="font-bold text-blue-600">
                    LKR {{
                      ((cartItem.price * (cartItem.qty || 1)) - (cartItem.discount || 0))
                        .toLocaleString('en-LK', { minimumFractionDigits: 2 })
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- totals -->
          <div class="border-t border-gray-300 mt-4 pt-4 space-y-2">
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>Subtotal</span>
              <span>₨{{ totalBeforeTax.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>Discount</span>
              <input type="number" v-model.number="subDiscount"
                    class="w-16 border border-gray-300 rounded text-center text-xs px-1"/>
            </div>
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>VAT</span>
              <span>₨{{ cvatAmount.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
          </div>
          <div class="border-t border-gray-300 mt-4 pt-4">
            <div class="flex justify-between font-semibold text-gray-700">
              <span>Total</span>
              <span>₨{{ grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <button 
              @click="handleCashClick('cash')" 
              class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md"
            >
              Cash
            </button>
            <button
              @click="handleCardClick('card')"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md"
            >
              Card
            </button>
            <button
              @click="handleOtherClick('other')"
              class="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold shadow-md"
            >
              Other
            </button>
          </div>
        </div>
      </div>
    </div>

    <CashMethod 
      v-if="isCashPayment" 
      :key="cashComponentKey"
      :cart="cart" 
      :payType="PayType"   
      :subDiscount="subDiscount"
      :grandTotal="grandTotal"
      @cashPaymentConfirmed="handleCashPayment"
       @openInvoice="openInvoice($event)"
    />
    <invoice v-if="showInvoice" :invoiceData="invoiceData" @close="showInvoice = false"/>

    <!-- Fullscreen Button (Desktop only) -->
      <button
        @click="toggleFullScreen"
        class="hidden lg:flex fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
              p-4 rounded-full shadow-2xl z-50 hover:scale-110 hover:rotate-6 
              transition-all duration-300 ease-out"
      >
        <!-- Enter Fullscreen Icon -->
        <svg v-if="!isFullScreen" xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
        </svg>

        <!-- Exit Fullscreen Icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zm6 10v6h-6v-2h4v-4h2zm-10 6H4v-6h2v4h4v2z" />
        </svg>
      </button>

  </section>
</template>




<script>
import headerdd from "~/components/pos/header.vue";
import CashMethod from "~/components/pos/payment/cash.vue";
import invoice from "~/components/pos/invoice.vue";
import { useUserStore } from "~/stores/modules/userStore";
import { useposStore } from "~/stores/modules/pos/posStore";

 definePageMeta({
    layout: 'POSLayout',   
    middleware: 'auth',
   });
   

export default {
  components: { headerdd,CashMethod ,invoice},
  data() {
    return {
      isFullScreen: false,
      isCashPayment: false,
      selectedMasterCategory: null,
      selectedCategory: null,
      cart: [],
      subDiscount: 0,
      cvatRate: 0,
      showCartModal: false,
      testImgUrl:'https://drive.google.com/thumbnail?id=14ukBKtgUk2TpNRJ1HMJ-NzXeyiD50KCc&sz=w1000',
      cashComponentKey: 0,

      showInvoice: false,
      invoiceData: null
    };
  },

  
  computed: {
    totalBeforeTax() {
      return this.cart.reduce((sum, i) => sum + ((i.price * (i.qty || 1)) - (i.discount || 0)), 0);
    },
    cvatAmount() {
      const taxable = Math.max(this.totalBeforeTax - (this.subDiscount || 0), 0);
      return taxable * this.cvatRate;
    },
    grandTotal() {
      return Math.max(this.totalBeforeTax - (this.subDiscount || 0), 0) + this.cvatAmount;
    }
  },

  async created() {
    this.userStore = useUserStore();    
    this.posStore = useposStore();
    this.showLoading = this.$showLoading;

    const granted = this.userStore.loggedUser?.granted || [];

    if (granted.includes('pos') ) {
    }
    else{
      this.$router.push('/user/login');
      this.$showToast('Not Allowed to access this page');
    }
   await this.posStore.loadInitPosData(this.showLoading);
  },
  
  methods: {

    handleCashClick(type) {
      this.PayType = type; 
      this.isCashPayment = true;

       this.cashComponentKey++;
    },

    handleCardClick(type) {
      this.PayType = type;      
      this.isCashPayment = true;
    },

    handleOtherClick(type) {
      this.PayType = type;      
      this.isCashPayment = true;
    },

    openInvoice(payload) {
      this.invoiceData = payload;
      this.showInvoice = true;
    },

    addToCart(item) {
      console.log(item);
      // this.cart.push(item);
      // Use 'id' if your item JSON has 'id', otherwise use 'code'
      const existing = this.cart.find(i => i.id === item.id);
      if (existing) {
        // Increment quantity if already in cart
        existing.qty = (existing.qty || 1) + 1;
      } else {
        // Add as new cart line
        this.cart.push({ ...item, qty: 1, discount: 0 });
      }
    },

    selectMasterCategory(id) {
      console.log(id);
      this.selectedMasterCategory = id;
      this.posStore.setSelectedCategory(id,this.showLoading); 
    },

    selectSubCategory(id) {
      console.log("SubCategory clicked:", id);
      this.selectedCategory = id;
      this.posStore.setSelectedSubCategory(id,this.showLoading); 
    },

    handleCashPayment(payload) {
      console.log("Cash Payment Payload:", payload);
      this.$showToast('Cash Payment Processed!');
        this.cart = [];
        this.subDiscount = 0;
        this.PayType = "";
        this.isCashPayment = false;
    },

    toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          this.isFullScreen = true;
        });
      } else {
        document.exitFullscreen().then(() => {
          this.isFullScreen = false;
        });
      }
    }

  },

  async beforeMount() {},
  async mounted() {},

};
</script>

