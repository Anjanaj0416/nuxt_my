<template>
  <section class="">
    <!-- Header -->
    <headerdd />


    <div class="h-screen">
      <!--Category -->
      <div class="w-full px-4 mt-16">
        <div class="flex items-center justify-end py-4 md:hidden">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <img 
                src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png" 
                alt="User Avatar" 
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="font-medium text-gray-700">Indeepa son</span>
            </div>
            <button class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  class="w-6 h-6 text-gray-600 hover:text-gray-800 transition">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
                    6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 
                    6 8.388 6 11v3.159c0 .538-.214 1.055-.595 
                    1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span class="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
        <div class="flex flex-row gap-2 overflow-x-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <button
            v-for="master in posStore.listMainCategries"
            :key="master.id"
            @click="selectMasterCategory(master.id)"
            :class="[
              'flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-full shadow-lg hover:scale-105 transition text-white',
              selectedMasterCategory === master.id ? 'bg-green-600' : 'bg-green-500'
            ]"
          >
            <img
              :src="master.imageUrl"
              alt="Image"
              class="w-6 h-6 object-contain"
            />
            <span>{{ master.value }}</span>
          </button>
          <div class="hidden md:flex items-center gap-4 ml-auto">
            <div class="flex items-center gap-2">
              <img 
                src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png" 
                alt="User Avatar" 
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="font-medium text-gray-700">Indeepa son</span>
            </div>

            <button class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  class="w-6 h-6 text-gray-600 hover:text-gray-800 transition">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
                    6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 
                    6 8.388 6 11v3.159c0 .538-.214 1.055-.595 
                    1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span class="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
      <!-- sub catogory mobile-->
      <div class="flex flex-row gap-2 overflow-x-auto py-4 px-2 scrollbar-track-gray-200 md:hidden lg:hidden">
        <button
          v-for="subcat in posStore.listSubCategories"
          :key="subcat.id"
          @click="selectSubCategory(subcat.id)" 
          :class="[ 
            'flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-full shadow-lg hover:scale-105 transition text-white',
            selectedCategory === subcat.id ? 'bg-green-600' : 'bg-green-500'
          ]"
        >
          <img
            :src="subcat.imageUrl"
            alt="Image"
            class="w-6 h-6 object-contain"
          />
          <span>{{ subcat.value }}</span>
        </button>
      </div>

      <div class="flex h-[calc(100vh-8rem)] gap-4 mt-2 px-2">
        <!-- sub catogory -->
        <div class="w-24 bg-gray-100 p-2 rounded-lg overflow-y-auto hidden sm:block">
          <div class="flex flex-col gap-2">
            <button
              v-for="subcat in posStore.listSubCategories"
              :key="subcat.id"
              @click="selectSubCategory(subcat.id)" 
              :style="{ backgroundImage: `url(${subcat.imageUrl})` }"
              :class="selectedCategory === subcat.id 
                ? 'ring-2 ring-[#5bb450] shadow-lg' 
                : 'shadow-md'"
              class="relative flex flex-col items-center justify-end w-18 h-20 bg-cover bg-center rounded-2xl overflow-hidden hover:scale-105 transition"
            >
              <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
              <span class="relative z-0 text-sm font-semibold text-black text-center px-2 truncate ">
                {{ subcat.value }}
              </span>
            </button>
          </div>
        </div>

        <!-- Items -->
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
            <button 
              @click.stop="viewVedio()" 
              class="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <div 
              v-if="item.discount"
              class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow"
            >
              -₨{{ item.discount?.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            <div class="relative z-0 w-full text-center p-1">
              <div class="text-base font-semibold text-black truncate">{{ item.itemName }}</div>
              <div class="text-base font-semibold text-gray-800">
                ₨{{ (item.price - item.discount)?.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Cart -->
        <div class="w-96 bg-white border border-gray-200 shadow-xl rounded-2xl flex flex-col hidden lg:flex">
          <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-800">🛒 Selected Items</h2>
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              {{ cart.length }} Items
            </span>
          </div>
          <!-- Items List -->
          <div class="flex-1 overflow-y-auto max-h-[55vh]">
            <div class="space-y-4 p-4">
              <div
                v-for="(cartItem, index) in cart"
                :key="cartItem.id + '-' + index"
                class="bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition p-4 border border-gray-100"
              >
                <!-- Item Info -->
                <div class="flex items-start">
                  <div class="w-14 h-14 rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      :src="cartItem.itemImage || 'https://via.placeholder.com/60'" 
                      class="w-full h-full object-cover" 
                    />
                  </div>
                  <div class="flex-1 ml-3">
                    <div class="flex justify-between items-start">
                      <span class="font-semibold text-gray-800 truncate text-sm sm:text-base">
                        {{ cartItem.itemName }}
                      </span>
                      <button 
                        @click="cart.splice(index, 1)" 
                        class="text-red-500 font-bold hover:scale-125 transition"
                      >
                        ✕
                      </button>
                    </div>
                    <p class="text-xs sm:text-sm text-gray-500">
                      Unit Price: ₨{{ cartItem.price.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                    </p>
                  </div>
                </div>

                <!-- Qty, Discount, Total -->
                <div class="mt-3 flex flex-wrap items-center gap-3">
                  <div class="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm border">
                    <span class="text-gray-500 text-sm">Qty:</span>
                    <input 
                      type="number" 
                      v-model.number="cartItem.qty" 
                      min="1"
                      class="w-14 h-9 border-0 text-gray-800 rounded-md text-center text-sm font-semibold focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div class="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm border">
                    <span class="text-gray-500 text-sm">Disc:</span>
                    <input 
                      type="number" 
                      v-model.number="cartItem.discount" 
                      min="0"
                      class="w-20 h-9 border-0 text-gray-800 rounded-md text-center text-sm font-semibold focus:ring-2 focus:ring-green-400"
                    />
                  </div>

                  <div class="ml-auto text-right">
                    <span class="block text-gray-400 text-xs">Total</span>
                    <span class="font-bold text-blue-600 text-lg sm:text-xl">
                      ₨{{ ((cartItem.price * (cartItem.qty || 1)) - (cartItem.discount || 0)).toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="px-4 py-3 border-t border-gray-200 space-y-2 bg-gray-50">
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>Subtotal</span>
              <span>₨{{ totalBeforeTax.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>Whole Discount</span>
              <input 
                type="number" 
                v-model.number="subDiscount"
                class="w-20 border border-gray-300 text-gray-800 rounded text-center text-sm px-1 focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div class="flex justify-between text-sm font-semibold text-gray-700">
              <span>VAT</span>
              <span>₨{{ cvatAmount.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span class="font-bold text-gray-800 text-lg">Grand Total</span>
              <span class="font-bold text-green-600 text-xl">
                ₨{{ grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-4 grid grid-cols-2 gap-3">
            <button 
              @click="handleCashClick('cash')" 
              class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
            >
              💵 Cash Pay
            </button>
            <button 
               @click="handleCardClick('hold')" 
              class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
            >
               ⏸ Hold Payment
            </button>
            <!-- <button 
              @click="handleCardClick('hold')" 
              class="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
            >
              ⏸ Hold Payment
            </button> -->
          </div>
        </div>

      </div>
      <!--  Cart Button (Mobile only) -->
      <button
        @click="showCartModal = true"
        class="lg:hidden fixed bottom-4 right-4 bg-green-500 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2"
      >
        <span class="font-bold text-sm">₨{{ grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
        <span class="bg-white text-[#5bb450] font-bold px-2 py-0.5 rounded-full text-xs shadow">
          {{ cart.length }}
        </span>
      </button>
      <!-- Mobile Cart Drawer -->
      <div
        v-if="showCartModal"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:hidden"
      >
        <div
          class="bg-white w-full rounded-t-2xl shadow-2xl transform transition-all duration-300 ease-in-out max-h-[85vh] flex flex-col"
        >
          <!-- Header -->
          <div class="flex justify-between items-center px-4 py-3 border-b border-gray-200">
            <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
              🛒 Your Cart
              <span class="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                {{ cart.length }}
              </span>
            </h2>
            <button
              @click="showCartModal = false"
              class="text-red-500 font-bold text-lg hover:scale-110 transition"
            >
              ✕
            </button>
          </div>

          <!-- Cart Items -->
          <div class="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            <div
              v-for="(cartItem, index) in cart"
              :key="cartItem.code"
              class="bg-gray-50 rounded-xl shadow-sm border border-gray-100 p-3 flex items-start gap-3 hover:shadow-md transition"
            >
              <!-- Item image -->
              <div class="w-14 h-14 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                <img
                  :src="cartItem.image || 'https://via.placeholder.com/60'"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Item details -->
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-gray-800 text-sm truncate">{{ cartItem.name }}</span>
                  <button
                    @click="cart.splice(index, 1)"
                    class="text-red-500 font-bold hover:scale-125 transition"
                  >
                    ✕
                  </button>
                </div>
                <p class="text-xs text-gray-500 mb-1">
                  ₨{{ cartItem.price.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                </p>

                <!-- Qty, Discount, Total -->
                <div class="flex items-center justify-between gap-2 text-xs">
                  <div class="flex items-center gap-1 bg-white border rounded-lg px-2 py-1 shadow-sm">
                    <span class="text-gray-500">Qty</span>
                    <input
                      type="number"
                      v-model.number="cartItem.qty"
                      min="1"
                      class="w-10 border-0 text-center text-xs font-semibold focus:ring-0"
                    />
                  </div>
                  <div class="flex items-center gap-1 bg-white border rounded-lg px-2 py-1 shadow-sm">
                    <span class="text-gray-500">Disc</span>
                    <input
                      type="number"
                      v-model.number="cartItem.discount"
                      min="0"
                      class="w-12 border-0 text-center text-xs font-semibold focus:ring-0"
                    />
                  </div>
                  <span class="ml-auto font-bold text-blue-600 text-sm">
                    ₨{{
                      ((cartItem.price * (cartItem.qty || 1)) - (cartItem.discount || 0))
                        .toLocaleString('en-LK', { minimumFractionDigits: 2 })
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Totals + Actions -->
          <div class="border-t border-gray-200 p-4 bg-white sticky bottom-0">
            <!-- Totals -->
            <div class="space-y-2 mb-4 text-sm font-semibold text-gray-700">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span>₨{{ totalBeforeTax.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span>Discount</span>
                <input
                  type="number"
                  v-model.number="subDiscount"
                  class="w-20 border border-gray-300 rounded-lg text-center text-xs px-1 py-0.5 focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div class="flex justify-between">
                <span>VAT</span>
                <span>₨{{ cvatAmount.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-gray-800">
                <span>Total</span>
                <span class="text-green-600 text-lg">
                  ₨{{ grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                </span>
              </div>
            </div>

            <!-- Payment Buttons -->
            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="handleCashClick('cash')" 
                class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
              >
                💵 Cash Pay
              </button>
              <button 
                @click="handleCardClick('hold')" 
                class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition"
              >
                ⏸ Hold Payment
              </button>
            </div>
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
        class="hidden lg:flex fixed bottom-6 right-6 bg-green-400 text-white 
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

  <vedioModal v-if="showVideoModal" @close="showVideoModal = false" />
</template>




<script>
import headerdd from "~/components/pos/cafeHeader.vue";
import CashMethod from "~/components/pos/payment/cash.vue";
import invoice from "~/components/pos/invoice.vue";
import { useUserStore } from "~/stores/modules/userStore";
import { useposStore } from "~/stores/modules/pos/posStore";

import vedioModal from "~/components/pos/vedioModal.vue";

 definePageMeta({
    layout: 'POSLayout',   
    middleware: 'auth',
   });
   

export default {
  components: { headerdd,CashMethod ,invoice, vedioModal},
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
      showVideoModal: false,
      showInvoice: false,
      invoiceData: null,

      holdItem: null,
      posStore: null,

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

     viewVedio() {
      this.showVideoModal = true;
    },


    addToCart(item) {
      // console.log(item);
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
      // console.log(id);
      this.selectedMasterCategory = id;
      this.posStore.setSelectedCategory(id,this.showLoading); 
    },

    selectSubCategory(id) {
      // console.log("SubCategory clicked:", id);
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
    },



  },

  mounted() {
    if (this.posStore.selectedPayment) {
      this.holdItem = this.posStore.selectedPayment;
    } else {
      // fallback if no payment selected
      // this.$router.push('/pos');
    }
  },

  async beforeMount() {},


};
</script>

