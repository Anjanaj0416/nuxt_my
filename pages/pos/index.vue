<template>
  <section>
    <!-- Header -->
    <headerdd />

    <!-- POS Layout -->
    <div class="flex h-screen text-white mt-16">
      
      <!-- Sidebar Categories -->
      <div class="w-20 flex flex-col items-center py-4 space-y-4  rounded-r-lg shadow-lg">
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
          class="bg-white border border-gray-300 rounded-xl p-3 flex flex-col items-center justify-between w-full h-40 shadow hover:shadow-xl transition transform hover:-translate-y-1"
        >
          <!-- Image -->
          <div class="w-40 h-40 bg-gray-100  flex items-center justify-center mb-2 overflow-hidden">
            <img
              :src="`${item.image}.`"
              :alt="item.name"
              class="object-cover w-full h-full"
            />
          </div>

          <!-- Name -->
          <span class="font-semibold text-sm text-gray-800 text-center">
            {{ item.name }}
          </span>

          <!-- Price in LKR -->
          <span class="text-xs text-gray-600 mt-1">
            ₨{{ item.price.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
          </span>
        </button>
      </div>
      
      <!-- Cart Section -->
      <div class="w-96 bg-gray-50 p-4 flex flex-col rounded-lg shadow-lg">
        <h2 class="text-lg font-bold mb-4 text-gray-700">Total</h2>

        <!-- Cart Items -->
        <div class="flex-1 space-y-3 overflow-y-auto">
          <div
            v-for="(cartItem, index) in cart"
            :key="cartItem.code"
            class="bg-white rounded-lg shadow p-2 flex flex-col hover:shadow-lg transition"
          >
            <!-- First Row: Name + Price + Delete -->
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold text-gray-800">{{ cartItem.name }}</span>
              <span class="text-gray-600">
                ₨{{ cartItem.price.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
              </span>
              <button
                @click="cart.splice(index, 1)"
                class="text-red-500 hover:text-red-700 font-bold ml-2"
              >
                ✕
              </button>
            </div>

            <!-- Second Row: Quantity, Discount, Item Total -->
            <div class="flex justify-between items-center space-x-2">
              <input
                type="number"
                v-model.number="cartItem.qty"
                min="1"
                class="w-16 p-1 border border-gray-300 rounded text-sm text-gray-800"
                placeholder="Qty"
              />
              <input
                type="number"
                v-model.number="cartItem.discount"
                min="0"
                class="w-20 p-1 border border-gray-300 rounded text-sm text-gray-800"
                placeholder="Discount"
              />
              <span class="text-gray-700 font-semibold">
               LKR: {{ ((cartItem.price * (cartItem.qty || 1)) - (cartItem.discount || 0)).toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
              </span>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-300 mt-4 pt-4 space-y-2">
        <div class="flex justify-between font-semibold text-gray-700">
          <span>Subtotal</span>
          <span>₨{{ totalBeforeTax.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
        </div>
        <div class="flex justify-between font-semibold text-gray-700">
          <span>discount</span>
          <input
                type="number"
                v-model.number="subDiscount"
                min="1"
                class="w-16 p-1 border border-gray-300 rounded text-sm text-gray-800"
                placeholder="discount"
              />
        </div>
        <div class="flex justify-between font-semibold text-gray-700">
          <span>VAT (15%)</span>
          <span>₨{{ cvatAmount.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
        </div>
        
      </div>


        <!-- Cart Total -->
        <div class="border-t border-gray-300 mt-4 pt-4">
          <div class="flex justify-between font-semibold text-gray-700">
            <span>Total</span>
            <span>₨{{ grandTotal.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
          </div>
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
        { name: "Coca Cola", price: 1200, code: "C09", category: "drinks" },
        { name: "Fanta", price: 1200, code: "C11", category: "drinks" },
        { name: "Sprite", price: 1200, code: "C12", category: "drinks" },
      ],
      selectedCategory: "breakfast",
      cart: [],
      subDiscount: 0,       // <-- global discount
      cvatRate: 0.15,       // 15% VAT
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(i => i.category === this.selectedCategory);
    },
    // Subtotal before VAT and global discount
    totalBeforeTax() {
      return this.cart.reduce((sum, i) => sum + ((i.price * (i.qty || 1)) - (i.discount || 0)), 0);
    },
    // VAT on subtotal after global discount
    cvatAmount() {
      const taxable = Math.max(this.totalBeforeTax - (this.subDiscount || 0), 0);
      return taxable * this.cvatRate;
    },
    // Grand total: subtotal - global discount + VAT
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
    },
  },
};
</script>


<style scoped>
/* Smooth input focus effect */
input:focus {
  @apply outline-none ring-2 ring-blue-400;
}
</style>
