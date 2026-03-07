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
            style="focus-ring-color:#C7EA2F;"
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
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition"
            style="background:#0B1220;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            New Order
          </button>
        </div>

        <!-- ── DESKTOP: Table Header (hidden on mobile) ───────── -->
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

        <template v-for="(order, idx) in paginatedOrders" :key="order.soNo">

          <!-- ── DESKTOP Row (hidden on mobile) ─────────────── -->
          <div
            class="hidden md:grid px-6 py-4 border-t border-black/10 hover:bg-black/[0.015] transition items-center"
            style="grid-template-columns:1fr 1.4fr 1fr 1fr 1fr 0.6fr;"
          >
            <div class="font-extrabold text-black text-sm">{{ order.soNo }}</div>
            <div class="text-sm font-medium" style="color:rgba(0,0,0,0.75);">{{ order.customer }}</div>
            <div class="text-sm" style="color:rgba(0,0,0,0.6);">{{ order.orderDate }}</div>
            <div>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold" :style="statusStyle(order.status)">
                {{ order.status }}
              </span>
            </div>
            <div class="text-sm font-extrabold text-black text-right">{{ formatAmount(order.netTotal) }}</div>
            <div class="flex justify-end">
              <button
                @click="viewOrder(order)"
                class="px-4 py-1.5 rounded-xl border border-black/15 text-xs font-semibold transition hover:border-black/30"
                style="color:#0B1220;"
              >
                View
              </button>
            </div>
          </div>

          <!-- ── MOBILE Card (hidden on desktop) ─────────────── -->
          <div
            class="md:hidden px-4 py-4 border-t border-black/10 active:bg-black/[0.02] transition"
            @click="viewOrder(order)"
          >
            <!-- Top row: SO No + Status badge -->
            <div class="flex items-center justify-between mb-2">
              <div class="font-extrabold text-black text-base">{{ order.soNo }}</div>
              <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold" :style="statusStyle(order.status)">
                {{ order.status }}
              </span>
            </div>

            <!-- Customer name -->
            <div class="text-sm font-semibold mb-1" style="color:rgba(0,0,0,0.8);">{{ order.customer }}</div>

            <!-- Bottom row: date + net total + arrow -->
            <div class="flex items-center justify-between mt-2">
              <div class="text-xs" style="color:rgba(0,0,0,0.45);">{{ order.orderDate }}</div>
              <div class="flex items-center gap-2">
                <div class="font-extrabold text-black text-sm">LKR {{ formatAmount(order.netTotal) }}</div>
                <!-- Chevron right -->
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
            Showing {{ paginationStart }}–{{ paginationEnd }} of {{ filteredOrders.length }}
          </div>
          <div class="flex gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-4 py-1.5 rounded-xl border text-xs font-semibold transition"
              :style="currentPage === 1
                ? 'color:rgba(0,0,0,0.3); border-color:rgba(0,0,0,0.1); cursor:not-allowed;'
                : 'color:#0B1220; border-color:rgba(0,0,0,0.2); cursor:pointer;'"
            >
              Prev
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-4 py-1.5 rounded-xl border text-xs font-semibold transition"
              :style="currentPage === totalPages
                ? 'color:rgba(0,0,0,0.3); border-color:rgba(0,0,0,0.1); cursor:not-allowed;'
                : 'color:#0B1220; border-color:rgba(0,0,0,0.2); cursor:pointer;'"
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '~/stores/modules/userStore';
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';

export default {
  data() {
    return {
      searchQuery:  '',
      currentPage:  1,
      perPage:      8,
      orders: [
        { soNo:'SO-250012', customer:'ABC Tea Buyers',      orderDate:'2026-03-05', status:'Confirmed',  netTotal:138000 },
        { soNo:'SO-250013', customer:'Colombo Exporters',   orderDate:'2026-03-06', status:'Draft',      netTotal:92500  },
        { soNo:'SO-250014', customer:'Kandy Local Traders', orderDate:'2026-03-07', status:'Cancelled',  netTotal:0      },
        { soNo:'SO-250015', customer:'Galle Traders Ltd',   orderDate:'2026-03-08', status:'Confirmed',  netTotal:245000 },
        { soNo:'SO-250016', customer:'Matara Exports',      orderDate:'2026-03-09', status:'Draft',      netTotal:67500  },
        { soNo:'SO-250017', customer:'Negombo Buyers',      orderDate:'2026-03-10', status:'Confirmed',  netTotal:310000 },
        { soNo:'SO-250018', customer:'Kurunegala Co.',      orderDate:'2026-03-11', status:'Cancelled',  netTotal:0      },
        { soNo:'SO-250019', customer:'Ratnapura Gems',      orderDate:'2026-03-12', status:'Confirmed',  netTotal:185000 },
        { soNo:'SO-250020', customer:'Anuradhapura Foods',  orderDate:'2026-03-13', status:'Draft',      netTotal:54000  },
        { soNo:'SO-250021', customer:'Jaffna Traders',      orderDate:'2026-03-14', status:'Confirmed',  netTotal:420000 },
        { soNo:'SO-250022', customer:'Badulla Estate',      orderDate:'2026-03-15', status:'Confirmed',  netTotal:198000 },
        { soNo:'SO-250023', customer:'Trinco Exporters',    orderDate:'2026-03-16', status:'Draft',      netTotal:112000 },
      ],
    };
  },

  computed: {
    filteredOrders() {
      const q = this.searchQuery.toLowerCase().trim();
      if (!q) return this.orders;
      return this.orders.filter(o =>
        o.soNo.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q)
      );
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

  watch: {
    searchQuery() { this.currentPage = 1; },
  },

  methods: {
    statusStyle(status) {
      if (status === 'Confirmed') return 'background:#fef9c3; color:#854d0e; border:1px solid #fde047;';
      if (status === 'Draft')     return 'background:rgba(0,0,0,0.06); color:rgba(0,0,0,0.55); border:1px solid rgba(0,0,0,0.12);';
      if (status === 'Cancelled') return 'background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;';
      return 'background:#C7EA2F22; color:#0B1220; border:1px solid #C7EA2F;';
    },
    formatAmount(val) {
      if (!val && val !== 0) return '0.00';
      return Number(val).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    viewOrder(order) {
      this.$router.push(`/qbook/salesOrders/${order.soNo}`);
    },
    openNewOrder() {
      this.$router.push('/qbook/salesOrders/new');
    },
    prevPage() { if (this.currentPage > 1) this.currentPage--; },
    nextPage()  { if (this.currentPage < this.totalPages) this.currentPage++; },
  },

  async created() {
    this.userStore  = useUserStore();
    this.qbookStore = useQbookStore();
    // TODO: await this.qbookStore.getSalesOrders(this.showLoading)
    // then: this.orders = this.qbookStore.salesOrderList
  },

  head() { return { title: 'Sales Orders – QBook' }; },
};
</script>