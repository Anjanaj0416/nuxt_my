<script setup>
definePageMeta({
  layout: 'qbooklogin',
  middleware: 'auth-ebook',
})
</script>

<template>
  <section class="min-h-screen bg-white">
    <div class="px-4 py-5 md:px-6 md:py-6">

      <!-- ── Page Header ─────────────────────────────────────── -->
      <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div class="text-2xl font-extrabold text-black">🧾 Sales Orders</div>
          <div class="text-sm" style="color:rgba(0,0,0,0.6)">Search and view sales orders</div>
        </div>

        <!-- Search -->
        <div class="relative w-full md:w-auto">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="SO No / Customer"
            class="w-full md:w-64 pl-4 pr-10 py-2.5 rounded-2xl border border-black/10 text-sm focus:outline-none bg-white"
            @input="onSearchInput"
          />
          <svg class="absolute right-3 top-2.5 w-4 h-4" style="color:rgba(0,0,0,0.4)"
               fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
      </div>

      <!-- ── Orders Card ──────────────────────────────────────── -->
      <div class="mt-5 rounded-3xl border border-black/10 shadow-sm overflow-hidden">

        <!-- Card Header -->
        <div class="flex items-center justify-between px-4 py-4 md:px-6 border-b border-black/10">
          <div class="font-extrabold text-black text-base">Orders</div>
          <button
            @click="openNewOrder"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition hover:opacity-85"
            style="background:#0B1220; color:#C7EA2F;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            New Order
          </button>
        </div>

        <!-- DESKTOP: Table Header (hidden on mobile) -->
        <div class="hidden md:grid px-6 py-3 text-xs font-semibold border-b border-black/10"
             style="grid-template-columns:1fr 1.4fr 1fr 1fr 1fr 0.6fr; color:rgba(0,0,0,0.5); background:rgba(0,0,0,0.02);">
          <div>SO No</div>
          <div>Customer</div>
          <div>Order Date</div>
          <div>Status</div>
          <div class="text-right">Net Total</div>
          <div class="text-right">Action</div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredOrders.length === 0" class="py-16 text-center text-sm" style="color:rgba(0,0,0,0.4);">
          No orders found.
        </div>

        <template v-else v-for="(order, idx) in paginatedOrders" :key="order.orderId || order.orderNo">

          <!-- DESKTOP Row -->
          <div
            class="hidden md:grid px-6 py-4 border-t border-black/10 hover:bg-black/[0.015] transition items-center"
            style="grid-template-columns:1fr 1.4fr 1fr 1fr 1fr 0.6fr;"
          >
            <div class="font-extrabold text-black text-sm">{{ order.orderNo }}</div>
            <div class="text-sm font-medium" style="color:rgba(0,0,0,0.75);">{{ order.customerName }}</div>
            <div class="text-sm" style="color:rgba(0,0,0,0.6);">{{ order.orderDate }}</div>
            <div>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold" :style="statusStyle(order.status)">
                {{ order.status }}
              </span>
            </div>
            <div class="text-sm font-extrabold text-black text-right">{{ order.orderNetTotal }}</div>
            <div class="flex justify-end">
              <button
                @click="viewOrder(order)"
                class="px-4 py-1.5 rounded-xl border border-black/15 text-xs font-semibold transition hover:border-black/30"
                style="color:#0B1220;"
              >View</button>
            </div>
          </div>

          <!-- MOBILE Card -->
          <div
            class="md:hidden px-4 py-4 border-t border-black/10 active:bg-black/[0.02] transition"
            @click="viewOrder(order)"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="font-extrabold text-black text-base">{{ order.orderNo }}</div>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold" :style="statusStyle(order.status)">
                {{ order.status }}
              </span>
            </div>
            <div class="text-sm font-semibold mb-1" style="color:rgba(0,0,0,0.8);">{{ order.customerName }}</div>
            <div class="flex items-center justify-between mt-2">
              <div class="text-xs" style="color:rgba(0,0,0,0.45);">{{ order.orderDate }}</div>
              <div class="flex items-center gap-2">
                <div class="font-extrabold text-black text-sm">LKR {{ order.orderNetTotal }}</div>
                <svg class="w-4 h-4" style="color:rgba(0,0,0,0.3)" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>

        </template>

        <!-- Pagination Footer -->
        <div class="flex items-center justify-between px-4 md:px-6 py-4 border-t border-black/10">
          <div class="text-xs md:text-sm" style="color:rgba(0,0,0,0.5);">
            <template v-if="filteredOrders.length > 0">
              Showing {{ paginationStart }}–{{ paginationEnd }} of {{ filteredOrders.length }}
            </template>
            <template v-else>No results</template>
          </div>
          <div class="flex gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-1.5 rounded-xl border text-xs font-semibold transition"
              :style="currentPage === 1
                ? 'color:rgba(0,0,0,0.3); border-color:rgba(0,0,0,0.1); cursor:not-allowed;'
                : 'color:#0B1220; border-color:rgba(0,0,0,0.2); cursor:pointer;'"
            >Prev</button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-1.5 rounded-xl border text-xs font-semibold transition"
              :style="currentPage === totalPages
                ? 'color:rgba(0,0,0,0.3); border-color:rgba(0,0,0,0.1); cursor:not-allowed;'
                : 'color:#0B1220; border-color:rgba(0,0,0,0.2); cursor:pointer;'"
            >Next</button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore }  from '~/stores/modules/userStore';
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';

export default {
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      perPage:     8,
      orders:      [],
      searchTimer: null,
    };
  },

  computed: {
    filteredOrders() {
      return this.orders;
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredOrders.length / this.perPage));
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredOrders.slice(start, start + this.perPage);
    },
    paginationStart() {
      if (this.filteredOrders.length === 0) return 0;
      return (this.currentPage - 1) * this.perPage + 1;
    },
    paginationEnd() {
      return Math.min(this.currentPage * this.perPage, this.filteredOrders.length);
    },
  },

  methods: {
    statusStyle(status) {
      if (status === 'Confirmed') return 'background:#fef9c3; color:#854d0e; border:1px solid #fde047;';
      if (status === 'Draft')     return 'background:rgba(0,0,0,0.06); color:rgba(0,0,0,0.55); border:1px solid rgba(0,0,0,0.12);';
      if (status === 'Cancelled') return 'background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;';
      return 'background:#C7EA2F22; color:#0B1220; border:1px solid #C7EA2F;';
    },
    viewOrder(order) {
      this.$router.push(`/qbook/salesOrders/${order.orderNo}`);
    },
    openNewOrder() {
      this.$router.push('/qbook/salesOrders/new');
    },
    prevPage() { if (this.currentPage > 1) this.currentPage--; },
    nextPage()  { if (this.currentPage < this.totalPages) this.currentPage++; },

    // ── Safe no-op loader for SSR / early calls ────────────────
    // $QbookshowLoading is only available after client mount,
    // so we use a dummy that won't crash on the server.
    safeLoader() {
      if (process.client && this.$QbookshowLoading) {
        return this.$QbookshowLoading('');
      }
      // Return a dummy object with a close() no-op
      return { close: () => {} };
    },

    // ── searchBy: 100=OrderNo, 110=CustomerName ────────────────
    getSearchBy() {
      const q = this.searchQuery.trim();
      if (!q) return 100;
      if (/^SO-/i.test(q) || /^\d/.test(q)) return 100;
      return 110;
    },

    // ── Debounce: wait 400ms after user stops typing ───────────
    onSearchInput() {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.currentPage = 1;
        this.fetchOrders();
      }, 400);
    },

    async fetchOrders() {
      try {
        await this.qbookStore.getSalesOrderList(
          { keyword: this.searchQuery.trim(), searchBy: this.getSearchBy() },
          () => this.safeLoader()
        );
        this.orders = this.qbookStore.salesOrderList || [];
      } catch (e) {
        console.error('fetchOrders error', e);
        this.orders = [];
      }
    },
  },

  created() {
  this.userStore  = useUserStore();
  this.qbookStore = useQbookStore();
},
async mounted() {
  await this.fetchOrders();  // ← token exists here = 200 OK ✅
},

  head() { return { title: 'Sales Orders – QBook' }; },
};
</script>