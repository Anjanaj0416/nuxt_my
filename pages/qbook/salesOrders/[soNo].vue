<script setup>
definePageMeta({
  layout: 'qbooklogin',
  middleware: 'auth-ebook',
})
</script>

<template>
  <section class="min-h-screen bg-white">
    <div class="px-6 py-6">

      <!-- ── Back Button ──────────────────────────────────────── -->
      <button
        @click="$router.back()"
        class="flex items-center gap-2 text-sm font-semibold mb-5 transition hover:opacity-70"
        style="color:rgba(0,0,0,0.5);"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Sales Orders
      </button>

      <!-- ── Page Header ──────────────────────────────────────── -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

        <!-- Left: Title + Status + Customer -->
        <div>
          <div class="text-xs font-semibold mb-1" style="color:rgba(0,0,0,0.45);">Sales Order</div>
          <div class="flex items-center gap-3 flex-wrap">
            <div class="text-3xl font-extrabold text-black">{{ order.soNo }}</div>
            <span class="px-3 py-1 rounded-full text-xs font-bold" :style="statusStyle(order.status)">
              {{ order.status }}
            </span>
          </div>
          <div class="text-sm mt-1" style="color:rgba(0,0,0,0.55);">
            Customer: <span class="font-semibold text-black">{{ order.customer }}</span>
          </div>
        </div>

        <!-- Right: Action Buttons — strictly #0B1220 + #C7EA2F only -->
        <div class="flex items-center gap-2 flex-wrap">

          <!-- Print: bordered outline -->
          <button
            class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition"
            style="border-color:rgba(0,0,0,0.2); color:#0B1220; background:transparent;"
            @mouseenter="e => e.target.style.background='rgba(0,0,0,0.04)'"
            @mouseleave="e => e.target.style.background='transparent'"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"/>
            </svg>
            Print
          </button>

          <!-- Create Invoice: lime background -->
          <button
            @click="createInvoice"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition"
            style="background:#C7EA2F; color:#0B1220;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12h6M9 16h6M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"/>
            </svg>
            Create Invoice
          </button>

          <!-- Receive Payment: dark background -->
          <button
            @click="receivePayment"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition"
            style="background:#0B1220; color:#C7EA2F;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
            Receive Payment
          </button>

        </div>
      </div>

      <!-- ── Top Info Cards ───────────────────────────────────── -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <!-- Dates -->
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Order Details</div>
          <div class="mb-3">
            <div class="text-xs" style="color:rgba(0,0,0,0.5);">Order Date</div>
            <div class="font-extrabold text-black text-sm mt-0.5">{{ order.orderDate }}</div>
          </div>
          <div>
            <div class="text-xs" style="color:rgba(0,0,0,0.5);">Expected Delivery</div>
            <div class="font-extrabold text-black text-sm mt-0.5">{{ order.expectedDelivery }}</div>
          </div>
        </div>

        <!-- Memo -->
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Memo</div>
          <div class="text-sm" style="color:rgba(0,0,0,0.7); line-height:1.6;">
            {{ order.memo || '—' }}
          </div>
        </div>

        <!-- Totals -->
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Totals</div>
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span style="color:rgba(0,0,0,0.6);">Sub Total</span>
              <span class="font-semibold text-black">{{ formatAmount(order.subTotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span style="color:rgba(0,0,0,0.6);">Tax</span>
              <span class="font-semibold text-black">{{ formatAmount(order.tax) }}</span>
            </div>
            <div class="h-px mt-1" style="background:rgba(0,0,0,0.08);"></div>
            <div class="flex items-center justify-between">
              <span class="font-extrabold text-black">Net Total</span>
              <span class="font-extrabold text-black text-lg">{{ formatAmount(order.netTotal) }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- ── Bottom: Order Lines + Right Panel ────────────────── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

        <!-- Order Lines -->
        <div class="lg:col-span-2 rounded-3xl border border-black/10 shadow-sm overflow-hidden">

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Order Lines</div>
            <div class="px-3 py-1 rounded-full text-xs font-bold"
                 style="background:#C7EA2F; color:#0B1220;">
              {{ order.lines.length }} items
            </div>
          </div>

          <!-- Column Headers -->
          <div class="grid px-6 py-3 text-xs font-semibold"
               style="grid-template-columns:2fr 0.7fr 1fr 1fr; color:rgba(0,0,0,0.45); background:rgba(0,0,0,0.02);">
            <div>Item</div>
            <div class="text-center">Qty</div>
            <div class="text-right">Unit Price</div>
            <div class="text-right">Line Total</div>
          </div>

          <!-- Line Rows -->
          <div
            v-for="(line, idx) in order.lines"
            :key="idx"
            class="grid px-6 py-4 border-t border-black/10 items-center"
            style="grid-template-columns:2fr 0.7fr 1fr 1fr;"
          >
            <div>
              <div class="font-semibold text-black text-sm">{{ line.name }}</div>
              <div class="text-xs mt-0.5" style="color:rgba(0,0,0,0.45);">Code: {{ line.code }}</div>
            </div>
            <div class="text-center font-semibold text-black">{{ line.qty }}</div>
            <div class="text-right text-sm" style="color:rgba(0,0,0,0.7);">{{ formatAmount(line.unitPrice) }}</div>
            <div class="text-right font-extrabold text-black">{{ formatAmount(line.lineTotal) }}</div>
          </div>

          <div v-if="order.lines.length === 0"
               class="py-12 text-center text-sm" style="color:rgba(0,0,0,0.4);">
            No order lines found.
          </div>
        </div>

        <!-- Right Panel -->
        <div class="flex flex-col gap-4">

          <!-- ── Invoices Card ── -->
          <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <div class="font-extrabold text-black">Invoices</div>
              <div class="w-6 h-6 rounded-full grid place-items-center text-xs font-bold"
                   style="background:#0B1220; color:#C7EA2F;">
                {{ order.invoices.length }}
              </div>
            </div>

            <div class="p-4 space-y-3">
              <div
                v-for="inv in order.invoices"
                :key="inv.invNo"
                class="rounded-2xl border border-black/10 p-4"
              >
                <!-- Invoice header row -->
                <div class="flex items-center justify-between mb-2">
                  <div class="font-extrabold text-black text-sm">{{ inv.invNo }}</div>
                  <!-- Status badge: lime for Posted, dark outline for others -->
                  <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                        :style="inv.status === 'Posted'
                          ? 'background:#C7EA2F; color:#0B1220;'
                          : 'background:rgba(0,0,0,0.06); color:rgba(0,0,0,0.6);'">
                    {{ inv.status }}
                  </span>
                </div>

                <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">Date: {{ inv.date }}</div>

                <!-- Total / Paid / Balance -->
                <div class="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <div class="text-xs" style="color:rgba(0,0,0,0.45);">Total</div>
                    <div class="font-semibold text-black text-sm">{{ formatAmount(inv.total) }}</div>
                  </div>
                  <div>
                    <div class="text-xs" style="color:rgba(0,0,0,0.45);">Paid</div>
                    <div class="font-semibold text-black text-sm">{{ formatAmount(inv.paid) }}</div>
                  </div>
                  <div>
                    <div class="text-xs" style="color:rgba(0,0,0,0.45);">Balance</div>
                    <div class="font-extrabold text-sm" style="color:#dc2626;">
                      {{ formatAmount(inv.balance) }}
                    </div>
                  </div>
                </div>

                <!-- Progress bar — lime fill on dark track -->
                <div class="h-1.5 rounded-full overflow-hidden mb-3" style="background:rgba(0,0,0,0.1);">
                  <div class="h-1.5 rounded-full"
                       :style="{
                         width: Math.round((inv.paid / inv.total) * 100) + '%',
                         background: '#C7EA2F',
                         transition: 'width 0.6s ease'
                       }">
                  </div>
                </div>

                <!-- Action buttons — strictly dark + lime -->
                <div class="flex gap-2">
                  <button
                    @click="viewInvoice(inv)"
                    class="flex-1 py-2 rounded-xl border text-xs font-semibold transition"
                    style="border-color:rgba(0,0,0,0.15); color:#0B1220; background:transparent;"
                  >
                    View Invoice
                  </button>
                  <button
                    @click="allocatePayment(inv)"
                    class="flex-1 py-2 rounded-xl text-xs font-bold transition"
                    style="background:#0B1220; color:#C7EA2F;"
                  >
                    Allocate Payment
                  </button>
                </div>
              </div>

              <div v-if="order.invoices.length === 0"
                   class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10"
                   style="color:rgba(0,0,0,0.35);">
                No invoices yet
              </div>
            </div>
          </div>

          <!-- ── Payments Card ── -->
          <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <div class="font-extrabold text-black">Payments</div>
              <div class="w-6 h-6 rounded-full grid place-items-center text-xs font-bold"
                   style="background:#0B1220; color:#C7EA2F;">
                {{ order.payments.length }}
              </div>
            </div>

            <div class="p-4 space-y-3">
              <div
                v-for="pmt in order.payments"
                :key="pmt.rcptNo"
                class="rounded-2xl border border-black/10 p-4"
              >
                <div class="flex items-center justify-between mb-1">
                  <div class="font-extrabold text-black text-sm">{{ pmt.rcptNo }}</div>
                  <div class="font-extrabold text-black">{{ formatAmount(pmt.amount) }}</div>
                </div>
                <div class="text-xs" style="color:rgba(0,0,0,0.5);">
                  {{ pmt.date }} • Method: {{ pmt.method }} • Ref: {{ pmt.ref }}
                </div>
              </div>

              <div v-if="order.payments.length === 0"
                   class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10"
                   style="color:rgba(0,0,0,0.35);">
                No payments recorded
              </div>
            </div>
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
      order: {
        soNo:             'SO-250012',
        status:           'Confirmed',
        customer:         'ABC Tea Buyers',
        orderDate:        '2026-03-05',
        expectedDelivery: '2026-03-10',
        memo:             'Deliver to Negombo warehouse. Payment in two parts.',
        subTotal:         120000,
        tax:              18000,
        netTotal:         138000,
        lines: [
          { name:'BOP Tea 25kg',  code:'TEA-BOP-25',  qty:2, unitPrice:50000, lineTotal:100000 },
          { name:'Dust Tea 25kg', code:'TEA-DUST-25', qty:1, unitPrice:20000, lineTotal:20000  },
        ],
        invoices: [
          { invNo:'INV-250045', status:'Posted', date:'2026-03-05', total:138000, paid:80000, balance:58000 },
        ],
        payments: [
          { rcptNo:'RCPT-00031', amount:80000, date:'2026-03-05', method:'Bank', ref:'TRX123' },
        ],
      },
    };
  },

  methods: {
    statusStyle(status) {
      if (status === 'Confirmed') return 'background:#fef9c3; color:#854d0e; border:1px solid #fde047;';
      if (status === 'Draft')     return 'background:rgba(0,0,0,0.06); color:rgba(0,0,0,0.55); border:1px solid rgba(0,0,0,0.12);';
      if (status === 'Cancelled') return 'background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;';
      return 'background:#C7EA2F33; color:#0B1220; border:1px solid #C7EA2F;';
    },

    formatAmount(val) {
      if (val === null || val === undefined) return '—';
      return Number(val).toLocaleString('en-LK', { minimumFractionDigits:2, maximumFractionDigits:2 });
    },

    createInvoice()      { /* TODO */ },
    receivePayment()     { /* TODO */ },
    viewInvoice(inv)     { this.$router.push(`/qbook/Invoices?inv=${inv.invNo}`); },
    allocatePayment(inv) { /* TODO */ },
  },

  async created() {
    this.userStore  = useUserStore();
    this.qbookStore = useQbookStore();
    // TODO: const soNo = this.$route.params.soNo
    // await this.qbookStore.getSalesOrderDetail(soNo, this.showLoading)
    // this.order = this.qbookStore.salesOrderDetail
  },

  head() {
    return { title: `${this.order?.soNo || 'Sales Order'} – QBook` };
  },
};
</script>