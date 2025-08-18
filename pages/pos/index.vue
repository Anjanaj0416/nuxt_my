<template>
  <section class="h-screen">
    <!-- Header -->
    <headerdd />

    <!-- POS Layout -->
    <div class="flex h-screen text-white mt-16">
      <!-- Sidebar Categories -->
      <div class="w-20 flex flex-col items-center py-4 space-y-4 rounded-r-lg shadow-lg">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="flex flex-col items-center border border-gray-300 w-16 h-16 rounded-lg transition duration-300 shadow hover:scale-105"
          :class="selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-200'"
        >
          <span class="text-xs font-medium">{{ cat.name }}</span>
        </button>
      </div>


      <!-- Items Grid -->
       
      <div class="flex-1 p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-y-auto">
        <button
          v-for="item in filteredItems"
          :key="item.code"
          @click="addToCart(item)"
          class="bg-white border border-gray-300 rounded-xl flex flex-col w-full shadow hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <div class="w-full aspect-[4/3] bg-gray-100 rounded-t-xl overflow-hidden">
            <img :src="item.image || 'https://via.placeholder.com/600x400?text=No+Image'"
                :alt="item.name" class="object-cover w-full h-full" />
          </div>

          <div class="px-2 py-3 text-center">
            <div class="font-semibold text-sm text-gray-800 truncate">{{ item.name }}</div>
            <div class="text-xs text-gray-600 mt-1">
              ₨{{ item.price.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
            </div>
          </div>
        </button>
        <h1  v-for="item in filteredItems"
          :key="item.code"
          @click="addToCart(item)">
        {{ item.name }}
        </h1>
   
        <div v-if="filteredItems.length === 0" class="col-span-8 text-center text-gray-500">
          No product
        </div>
      </div>


      <!-- Cart Sidebar (Desktop only) -->
      <div class="hidden lg:block w-96">
        <aside class="bg-gray-50 p-4 rounded-lg shadow-lg sticky top-16 max-h-[calc(100vh-4rem)] flex flex-col min-h-0">
          <h2 class="text-lg font-bold mb-4 text-gray-700">Total</h2>

          <!-- Items (scrolls) -->
          <div class="flex-1 min-h-0 overflow-y-auto space-y-3 p-2">
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
                          class="w-10 border border-gray-300 text-gray-800 rounded text-center text-xs px-1"/>
                  </span>
                  <span class="flex items-center space-x-1">
                    <span class="text-gray-500">Disc:</span>
                    <input type="number" v-model.number="cartItem.discount" min="0"
                          class="w-12 border border-gray-300 text-gray-800 rounded text-center text-xs px-1"/>
                  </span>
                  <span class="font-bold text-blue-600">
                    LKR {{ ((cartItem.price * (cartItem.qty || 1)) - (cartItem.discount || 0)).toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Totals (always visible) -->
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
            <button
              @click="makePayment('cash')"
              class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md"
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
        </aside>
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
            @click="makePayment('cash')"
            class="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md"
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
  </section>
</template>

<script>
import headerdd from "~/components/pos/header.vue";

export default {
  components: { headerdd },
  data() {
    return {
      categories: [
        { id: "breakfast", name: "Breakfast" },
        { id: "soups", name: "Soups" },
        { id: "pizza", name: "Pizza" },
        { id: "drinks", name: "Drinks" },
        { id: "sweets", name: "Sweets" },
      ],
      items: [
        { name: "Ham Sandwich", price: 1600, code: "M23", image: "https://www.indianveggiedelight.com/wp-content/uploads/2017/03/vegetable-mayonnaise-sandwich-featured.jpg", category: "breakfast" },
        { name: "Tuna Sandwich", price: 2100, code: "M25", category: "breakfast" },
        { name: "Steak Sandwich", price: 2100, code: "M28", category: "breakfast" },
        { name: "Cheese Burger", price: 1800, code: "M30", category: "breakfast" },
          { name: "Ham Sandwich", price: 1600, code: "M23", image: "https://www.indianveggiedelight.com/wp-content/uploads/2017/03/vegetable-mayonnaise-sandwich-featured.jpg", category: "breakfast" },
        { name: "Tuna Sandwich", price: 2100, code: "M25", category: "breakfast" },
        { name: "Steak Sandwich", price: 2100, code: "M28", category: "breakfast" },
        { name: "Cheese Burger", price: 1800, code: "M30", category: "breakfast" },
          { name: "Ham Sandwich", price: 1600, code: "M23", image: "https://www.indianveggiedelight.com/wp-content/uploads/2017/03/vegetable-mayonnaise-sandwich-featured.jpg", category: "breakfast" },
        { name: "Tuna Sandwich", price: 2100, code: "M25", category: "breakfast" },
        { name: "Steak Sandwich", price: 2100, code: "M28", category: "breakfast" },
        { name: "Cheese Burger", price: 1800, code: "M30", category: "breakfast" },
        { name: "Coca Cola", price: 1200, code: "C09", category: "drinks" },
        { name: "Fanta", price: 1200, code: "C11", category: "drinks" },
        { name: "Sprite", price: 1200, code: "C12", category: "drinks" },
      ],
      selectedCategory: "breakfast",
      cart: [],
      subDiscount: 0,
      cvatRate: 0,
      showCartModal: false
    };
  },
  computed: {
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
    addToCart(item) {
      const existing = this.cart.find(i => i.code === item.code);
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        this.cart.push({ ...item, qty: 1, discount: 0 });
      }
    }
  },
   async beforeMount() {
   if (this.userStore.loggeduser && !this.userStore.loggeduser.granted.contains('pos') ) {
      } else {        
        this.$router.push('/user/login')
        this.$showToast('Not Allowed to access this page')
      }
  
    },
};
</script>
