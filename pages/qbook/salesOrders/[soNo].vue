<script setup>
definePageMeta({
  layout: 'qbooklogin',
  middleware: 'auth-ebook',
})
</script>

<template>
  <section class="min-h-screen bg-white">
    <div v-if="order" class="px-4 py-5 md:px-6 md:py-6">

      <!-- ── Back Button ──────────────────────────────────────── -->
      <button
        @click="$router.back()"
        class="flex items-center gap-2 text-sm font-semibold mb-4 transition hover:opacity-70"
        style="color:rgba(0,0,0,0.5);"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Sales Orders
      </button>

      <!-- ── Page Header ──────────────────────────────────────── -->
      <!-- Mobile: stacked; Desktop: title left + buttons right -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
        <div>
          <div class="text-xs font-semibold mb-1" style="color:rgba(0,0,0,0.45);">Sales Order</div>
          <div class="flex items-center gap-3 flex-wrap">
            <div class="text-2xl md:text-3xl font-extrabold text-black">{{ order.soNo }}</div>
            <span class="px-3 py-1 rounded-full text-xs font-bold" :style="statusStyle(order.status)">
              {{ order.status }}
            </span>
          </div>
          <div class="text-sm mt-1" style="color:rgba(0,0,0,0.55);">
            Customer: <span class="font-semibold text-black">{{ order.customer }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-2">
          <button class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold"
                  style="border-color:rgba(0,0,0,0.2); color:#0B1220; background:transparent;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z"/>
            </svg>
            Print
          </button>
          <button @click="createInvoice" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style="background:#C7EA2F; color:#0B1220;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 12h6M9 16h6M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"/>
            </svg>
            Create Invoice
          </button>
          <button @click="receivePayment" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style="background:#0B1220; color:#C7EA2F;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
            Receive Payment
          </button>
        </div>
      </div>

      <!-- ── Top Info Cards ─────────────────────────────────────
           Desktop: 3-col — Order Details | Memo | Totals
           Mobile:  2-col (Order Details + Totals) + Memo full-width
      ──────────────────────────────────────────────────────────── -->

      <!-- Desktop 3-col (md+) -->
      <div class="hidden md:grid md:grid-cols-3 gap-4 mb-4">
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Order Details</div>
          <div class="mb-3">
            <div class="text-xs" style="color:rgba(0,0,0,0.45);">Order Date</div>
            <div class="font-extrabold text-black text-sm mt-0.5">{{ order.orderDate }}</div>
          </div>
          <div>
            <div class="text-xs" style="color:rgba(0,0,0,0.45);">Expected Delivery</div>
            <div class="font-extrabold text-black text-sm mt-0.5">{{ order.expectedDelivery }}</div>
          </div>
        </div>
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Memo</div>
          <div class="text-sm" style="color:rgba(0,0,0,0.7);">{{ order.memo }}</div>
        </div>
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Totals</div>
          <div class="flex justify-between text-sm mb-1.5">
            <span style="color:rgba(0,0,0,0.6);">Sub Total</span>
            <span class="font-semibold text-black">{{ formatAmount(order.subTotal) }}</span>
          </div>
          <div class="flex justify-between text-sm mb-3">
            <span style="color:rgba(0,0,0,0.6);">Tax</span>
            <span class="font-semibold text-black">{{ formatAmount(order.tax) }}</span>
          </div>
          <div class="flex justify-between border-t border-black/10 pt-3">
            <span class="font-extrabold text-black">Net Total</span>
            <span class="font-extrabold text-black text-base">{{ formatAmount(order.netTotal) }}</span>
          </div>
        </div>
      </div>

      <!-- Mobile 2-col + Memo full-width (hidden on md+) -->
      <div class="md:hidden grid grid-cols-2 gap-3 mb-4">
        <div class="rounded-3xl border border-black/10 p-4 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Order Details</div>
          <div class="mb-3">
            <div class="text-xs" style="color:rgba(0,0,0,0.45);">Order Date</div>
            <div class="font-extrabold text-black text-sm mt-0.5">{{ order.orderDate }}</div>
          </div>
          <div>
            <div class="text-xs" style="color:rgba(0,0,0,0.45);">Expected Delivery</div>
            <div class="font-extrabold text-black text-sm mt-0.5">{{ order.expectedDelivery }}</div>
          </div>
        </div>
        <div class="rounded-3xl border border-black/10 p-4 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Totals</div>
          <div class="flex justify-between text-xs mb-1.5">
            <span style="color:rgba(0,0,0,0.6);">Sub Total</span>
            <span class="font-semibold text-black">{{ formatAmount(order.subTotal) }}</span>
          </div>
          <div class="flex justify-between text-xs mb-2">
            <span style="color:rgba(0,0,0,0.6);">Tax</span>
            <span class="font-semibold text-black">{{ formatAmount(order.tax) }}</span>
          </div>
          <div class="flex justify-between border-t border-black/10 pt-2">
            <span class="font-extrabold text-black text-xs">Net Total</span>
            <span class="font-extrabold text-black text-sm">{{ formatAmount(order.netTotal) }}</span>
          </div>
        </div>
        <div class="rounded-3xl border border-black/10 p-4 shadow-sm col-span-2">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Memo</div>
          <div class="text-sm" style="color:rgba(0,0,0,0.7);">{{ order.memo }}</div>
        </div>
      </div>

      <!-- ── DESKTOP: side-by-side layout (lg+) ─────────────── -->
      <div class="hidden lg:grid gap-4" style="grid-template-columns:1fr 380px; align-items:start;">

        <!-- Order Lines -->
        <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden" style="align-self:start;">
          <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Order Lines</div>
            <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:#C7EA2F;color:#0B1220;">
              {{ order.lines.length }} Items
            </span>
          </div>
          <div class="px-5 py-3 text-xs font-semibold border-b border-black/10"
               style="display:grid;grid-template-columns:1fr 70px 120px 120px;background:rgba(0,0,0,0.02);color:rgba(0,0,0,0.5);">
            <div>Item</div>
            <div style="text-align:center;">Qty</div>
            <div style="text-align:right;">Unit Price</div>
            <div style="text-align:right;">Line Total</div>
          </div>
          <div v-for="line in order.lines" :key="line.code"
               class="px-5 py-4 border-b border-black/10"
               style="display:grid;grid-template-columns:1fr 70px 120px 120px;align-items:center;">
            <div>
              <div class="font-semibold text-black text-sm">{{ line.name }}</div>
              <div class="text-xs mt-0.5" style="color:rgba(0,0,0,0.45);">Code: {{ line.code }}</div>
            </div>
            <div class="font-semibold text-black text-sm" style="text-align:center;">{{ line.qty }}</div>
            <div class="font-semibold text-black text-sm" style="text-align:right;">{{ formatAmount(line.unitPrice) }}</div>
            <div class="font-extrabold text-black" style="text-align:right;">{{ formatAmount(line.lineTotal) }}</div>
          </div>
          <div v-if="order.lines.length===0" class="py-10 text-center text-sm" style="color:rgba(0,0,0,0.4);">No order lines</div>
        </div>

        <!-- Right Panel -->
        <div class="flex flex-col gap-4" style="align-self:start;">
          <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <div class="font-extrabold text-black">Invoices</div>
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                   style="background:#0B1220;color:#C7EA2F;">{{ order.invoices.length }}</div>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="inv in order.invoices" :key="inv.invNo" class="rounded-2xl border border-black/10 p-4">
                <div class="flex items-center justify-between mb-2">
                  <div class="font-extrabold text-black text-sm">{{ inv.invNo }}</div>
                  <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                        :style="inv.status==='Posted'?'background:#C7EA2F;color:#0B1220;':'background:rgba(0,0,0,0.06);color:rgba(0,0,0,0.6);'">
                    {{ inv.status }}
                  </span>
                </div>
                <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">Date: {{ inv.date }}</div>
                <div class="grid grid-cols-3 gap-2 mb-3">
                  <div><div class="text-xs" style="color:rgba(0,0,0,0.45);">Total</div><div class="font-semibold text-black text-sm">{{ formatAmount(inv.total) }}</div></div>
                  <div><div class="text-xs" style="color:rgba(0,0,0,0.45);">Paid</div><div class="font-semibold text-black text-sm">{{ formatAmount(inv.paid) }}</div></div>
                  <div><div class="text-xs" style="color:rgba(0,0,0,0.45);">Balance</div><div class="font-extrabold text-sm" style="color:#dc2626;">{{ formatAmount(inv.balance) }}</div></div>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden mb-3" style="background:rgba(0,0,0,0.1);">
                  <div class="h-1.5 rounded-full" :style="{width:Math.round((inv.paid/inv.total)*100)+'%',background:'#C7EA2F',transition:'width 0.6s ease'}"></div>
                </div>
                <div class="flex gap-2">
                  <button @click="viewInvoice(inv)" class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                          style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Invoice</button>
                  <button @click="allocatePayment(inv)" class="flex-1 py-2 rounded-xl text-xs font-bold"
                          style="background:#0B1220;color:#C7EA2F;">Allocate Payment</button>
                </div>
              </div>
              <div v-if="order.invoices.length===0" class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10" style="color:rgba(0,0,0,0.35);">No invoices yet</div>
            </div>
          </div>

          <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <div class="font-extrabold text-black">Payments</div>
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                   style="background:#0B1220;color:#C7EA2F;">{{ order.payments.length }}</div>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="pmt in order.payments" :key="pmt.rcptNo" class="rounded-2xl border border-black/10 p-4">
                <div class="flex items-center justify-between mb-1">
                  <div class="font-extrabold text-black text-sm">{{ pmt.rcptNo }}</div>
                  <div class="font-extrabold text-black">{{ formatAmount(pmt.amount) }}</div>
                </div>
                <div class="text-xs mb-1" style="color:rgba(0,0,0,0.5);">Date: {{ pmt.date }} • Method: {{ pmt.method }} • Ref: {{ pmt.ref }}</div>
                <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">Allocated To: <span class="font-bold" style="color:#0B1220;">{{ pmt.allocatedTo }}</span></div>
                <div class="flex gap-2">
                  <button @click="viewPayment(pmt)" class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                          style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Payment</button>
                  <button @click="viewJournal(pmt)" class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                          style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Journal</button>
                </div>
              </div>
              <div v-if="order.payments.length===0" class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10" style="color:rgba(0,0,0,0.35);">No payments recorded</div>
            </div>
          </div>
        </div>

      </div>

      <!-- ── MOBILE: stacked layout (hidden on lg+) ──────────── -->
      <div class="flex flex-col gap-4 lg:hidden">

        <!-- Order Lines — mobile card rows -->
        <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Order Lines</div>
            <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:#C7EA2F;color:#0B1220;">
              {{ order.lines.length }} Items
            </span>
          </div>
          <div v-for="line in order.lines" :key="line.code"
               class="flex items-start justify-between px-4 py-3 border-t border-black/10 gap-3">
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-black text-sm">{{ line.name }}</div>
              <div class="text-xs mt-0.5" style="color:rgba(0,0,0,0.45);">Code: {{ line.code }}</div>
              <div class="text-xs mt-1" style="color:rgba(0,0,0,0.5);">Qty: {{ line.qty }} × {{ formatAmount(line.unitPrice) }}</div>
            </div>
            <div class="font-extrabold text-black text-sm shrink-0">{{ formatAmount(line.lineTotal) }}</div>
          </div>
          <div v-if="order.lines.length===0" class="py-10 text-center text-sm" style="color:rgba(0,0,0,0.4);">No order lines</div>
        </div>

        <!-- Invoices — mobile -->
        <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Invoices</div>
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                 style="background:#0B1220;color:#C7EA2F;">{{ order.invoices.length }}</div>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="inv in order.invoices" :key="inv.invNo" class="rounded-2xl border border-black/10 p-4">
              <div class="flex items-center justify-between mb-2">
                <div class="font-extrabold text-black text-sm">{{ inv.invNo }}</div>
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                      :style="inv.status==='Posted'?'background:#C7EA2F;color:#0B1220;':'background:rgba(0,0,0,0.06);color:rgba(0,0,0,0.6);'">
                  {{ inv.status }}
                </span>
              </div>
              <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">Date: {{ inv.date }}</div>
              <div class="grid grid-cols-3 gap-2 mb-3">
                <div><div class="text-xs" style="color:rgba(0,0,0,0.45);">Total</div><div class="font-semibold text-black text-sm">{{ formatAmount(inv.total) }}</div></div>
                <div><div class="text-xs" style="color:rgba(0,0,0,0.45);">Paid</div><div class="font-semibold text-black text-sm">{{ formatAmount(inv.paid) }}</div></div>
                <div><div class="text-xs" style="color:rgba(0,0,0,0.45);">Balance</div><div class="font-extrabold text-sm" style="color:#dc2626;">{{ formatAmount(inv.balance) }}</div></div>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden mb-3" style="background:rgba(0,0,0,0.1);">
                <div class="h-1.5 rounded-full" :style="{width:Math.round((inv.paid/inv.total)*100)+'%',background:'#C7EA2F',transition:'width 0.6s ease'}"></div>
              </div>
              <div class="flex gap-2">
                <button @click="viewInvoice(inv)" class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                        style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Invoice</button>
                <button @click="allocatePayment(inv)" class="flex-1 py-2 rounded-xl text-xs font-bold"
                        style="background:#0B1220;color:#C7EA2F;">Allocate Payment</button>
              </div>
            </div>
            <div v-if="order.invoices.length===0" class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10" style="color:rgba(0,0,0,0.35);">No invoices yet</div>
          </div>
        </div>

        <!-- Payments — mobile -->
        <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Payments</div>
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                 style="background:#0B1220;color:#C7EA2F;">{{ order.payments.length }}</div>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="pmt in order.payments" :key="pmt.rcptNo" class="rounded-2xl border border-black/10 p-4">
              <div class="flex items-center justify-between mb-1">
                <div class="font-extrabold text-black text-sm">{{ pmt.rcptNo }}</div>
                <div class="font-extrabold text-black">{{ formatAmount(pmt.amount) }}</div>
              </div>
              <div class="text-xs mb-1" style="color:rgba(0,0,0,0.5);">Date: {{ pmt.date }} • Method: {{ pmt.method }} • Ref: {{ pmt.ref }}</div>
              <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">Allocated To: <span class="font-bold" style="color:#0B1220;">{{ pmt.allocatedTo }}</span></div>
              <div class="flex gap-2">
                <button @click="viewPayment(pmt)" class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                        style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Payment</button>
                <button @click="viewJournal(pmt)" class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                        style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Journal</button>
              </div>
            </div>
            <div v-if="order.payments.length===0" class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10" style="color:rgba(0,0,0,0.35);">No payments recorded</div>
          </div>
        </div>

      </div>

      <!-- ── Footer Buttons ─────────────────────────────────── -->
      <div class="flex items-center justify-end gap-3 mt-6">
        <button
          @click="$router.push('/qbook/salesOrders')"
          class="px-5 py-2.5 rounded-xl border text-sm font-semibold"
          style="border-color:rgba(0,0,0,0.2); color:#0B1220; background:transparent;"
        >
          Back to Orders
        </button>
        <button
          @click="cancelOrder"
          class="px-5 py-2.5 rounded-xl text-sm font-bold"
          style="background:#dc2626; color:#ffffff;"
        >
          Cancel Order
        </button>
      </div>

    </div>
    <div v-else class="flex items-center justify-center min-h-screen text-sm" style="color:rgba(0,0,0,0.4);">Loading...</div>
  </section>
</template>

<script>
import { useUserStore } from '~/stores/modules/userStore';
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';

export default {
  data() {
    return {
      order: null,
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
    viewPayment(pmt)     { this.$router.push(`/qbook/payments?rcpt=${pmt.rcptNo}`); },
    viewJournal(pmt)     { this.$router.push(`/qbook/journal?rcpt=${pmt.rcptNo}`); },
    cancelOrder()        { /* TODO: confirm dialog then cancel */ },
  },

  async created() {
    this.userStore  = useUserStore();
    this.qbookStore = useQbookStore();

    const soNo = this.$route.params.soNo;

    // ── API call ───────────────────────────────────────────────
    // await this.qbookStore.getSalesOrderDetail(soNo, this.$showLoading);
    // this.order = this.qbookStore.salesOrderDetail;

    // ── Fallback sample data — keyed by route param ────────────
    this.order = {
      soNo,
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
        { rcptNo:'RCPT-00031', amount:80000, date:'2026-03-05', method:'Bank', ref:'TRX123', allocatedTo:'INV-250045' },
      ],
    };
  },

  head() {
    return { title: `${this.order?.soNo || 'Sales Order'} – QBook` };
  },
};
</script>