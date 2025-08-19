<template>
  <section class="">
    <!-- Header -->
    <headerdd />

    <!-- Horizontal Button Bar -->
    <div class="h-screen">
      <div class="flex flex-row gap-2 overflow-x-auto py-4 px-2 mt-16 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
        <button
          v-for="master in masterCategories"
          :key="master.id"
          @click="selectMasterCategory(master.id)"
          :class="selectedMasterCategory === master.id 
            ? 'bg-blue-600 text-white' 
            : 'bg-blue-500 text-white'"
          class="flex-shrink-0 px-3 py-1.5 rounded-full shadow-lg hover:scale-105 transition"
        >
          {{ master.name }}
        </button>

      </div>

      <!-- POS Layout -->
      <div class="flex h-[calc(100vh-8rem)] gap-4 mt-2 px-2">
        <!-- Left: Category List -->
        <div class="w-24 bg-gray-100 p-2 rounded-lg overflow-y-auto">
          <div class="flex flex-col gap-2">
            <button
              v-for="cat in categories"
              :key="cat.id"
              @click="selectedCategory = cat.id"
              :class="selectedCategory === cat.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700'"
              class="flex flex-col items-center justify-center p-2 rounded-xl hover:scale-105 transition"
            >
              <span class="text-xl mb-1">{{ cat.icon }}</span>
              <span class="text-xs text-center truncate">{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <!-- Middle: Items Grid -->
        <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto">
          <div
            v-for="item in filteredItems"
            :key="item.code"
            @click="addToCart(item)"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-pointer overflow-hidden h-48 lg:h-64"

          >
            <div class="w-full aspect-[4/3] bg-gray-200 rounded-t-2xl overflow-hidden">
              <img :src="item.image || 'https://via.placeholder.com/600x400?text=No+Image'" class="w-full h-full object-cover"/>
            </div>
            <div class="p-2 flex flex-col items-center justify-between">
              <div class="text-sm font-semibold text-gray-800 truncate">{{ item.name }}</div>
              <div class="text-xs text-gray-600 mt-1">₨{{ item.price?.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</div>
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
                :key="cartItem.code"
                class="bg-white rounded-xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
              >
                <!-- Top Row -->
                <div class="flex items-start">
                  <div class="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
                    <img :src="cartItem.image || 'https://via.placeholder.com/60'" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1 ml-3">
                    <div class="flex justify-between items-center">
                      <span class="font-semibold text-gray-800 truncate text-sm sm:text-base">{{ cartItem.name }}</span>
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
                      class="w-20 h-10 border border-gray-300 text-gray-800 rounded-lg text-center text-sm sm:text-base font-semibold focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
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
              <span>Discount</span>
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
          <div class="mt-6 grid grid-cols-3 gap-3">
              <button   @click="handleCashClick('cash')" class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md">Cash</button>
              <button @click="makePayment('card')" class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md">Card</button>
              <button @click="makePayment('other')" class="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold shadow-md">Other</button>
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
              class="text-sm  text-blue-600 hover:underline"
            >
              Cash
            </button>
            <button
              @click="makePayment('card')"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md"
            >
              Card
            </button>
            <button
              @click="makePayment('other')"
              class="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold shadow-md"
            >
              Other
            </button>
          </div>
        </div>
      </div>
    </div>
    <CashMethod v-if="isCashPayment" @close="isCashPayment = false" />
  </section>
</template>




<script>
import headerdd from "~/components/pos/header.vue";
import CashMethod from "~/components/pos/payment/cash.vue";

export default {
  components: { headerdd,CashMethod },
  data() {
    return {
      isCashPayment: false,
      masterCategories: [
        {
          id: 'food',
          name: 'Food',
          subCategories: [
            { id: 'breakfast', name: 'Breakfast', icon: '🍎' },
            { id: 'pizza', name: 'Pizza', icon: '🍕' },
            { id: 'soups', name: 'Soups', icon: '🥣' }
          ]
        },
        {
          id: 'drinks',
          name: 'Drinks',
          subCategories: [
            { id: 'cold', name: 'Cold Drinks', icon: '🥤' },
            { id: 'hot', name: 'Hot Drinks', icon: '☕' }
          ]
        },
        {
          id: 'sweets',
          name: 'Sweets',
          subCategories: [
            { id: 'cakes', name: 'Cakes', icon: '🍰' },
            { id: 'icecream', name: 'Ice Cream', icon: '🍨' }
          ]
        }
      ],
      selectedMasterCategory: 'food',
      selectedCategory: 'breakfast',
      items: [
        { name: "Ham Sandwich", price: 1600, code: "M23", image: "https://www.indianveggiedelight.com/wp-content/uploads/2017/03/vegetable-mayonnaise-sandwich-featured.jpg", category: "breakfast" },
        { name: "Tuna Sandwich", price: 2100, code: "M25", category: "Drinks" },
        { name: "Steak Sandwich", price: 2100, code: "M28", category: "breakfast" },
        { name: "Cheese Burger", price: 1800, code: "M30", category: "breakfast" },
        { name: "Steak Sandwich", price: 2100, code: "M28", category: "breakfast" },
        { name: "Cheese Burger", price: 1800, code: "M30", category: "breakfast" },
        { name: "Steak Sandwich", price: 2100, code: "M28", category: "breakfast" },
        { name: "Cheese Burger", price: 1800, code: "M30", category: "breakfast" },
        { name: "Coca Cola", price: 1200, code: "C09", category: "Drinks" },
        { name: "Fanta", price: 1200, code: "C11", category: "cold" },
        { name: "Coffee", price: 800, code: "H01", category: "hot" }
      ],
      cart: [],
      subDiscount: 0,
      cvatRate: 0,
      showCartModal: false
    };
  },
  computed: {
    categories() {
      const master = this.masterCategories.find(m => m.id === this.selectedMasterCategory);
      return master ? master.subCategories : [];
    },
    filteredItems() {
      return this.items.filter(i => i.category === this.selectedCategory);
    },
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
  methods: {
      handleCashClick() {
        this.isCashPayment = true;
      },
    addToCart(item) {
      const existing = this.cart.find(i => i.code === item.code);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        this.cart.push({ ...item, qty: 1, discount: 0 });
      }
    },
    selectMasterCategory(masterId) {
      this.selectedMasterCategory = masterId;
      // Automatically select first subcategory
      const master = this.masterCategories.find(m => m.id === masterId);
      if (master && master.subCategories.length) {
        this.selectedCategory = master.subCategories[0].id;
      }
    }
  }
};
</script>

