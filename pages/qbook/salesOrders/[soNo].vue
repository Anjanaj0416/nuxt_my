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
        @click="$router.push('/qbook/salesOrders')"
        class="flex items-center gap-2 text-sm font-semibold mb-4 transition hover:opacity-70"
        style="color:rgba(0,0,0,0.5);"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Sales Orders
      </button>

      <!-- ── Page Header ──────────────────────────────────────── -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <div class="text-sm mb-1" style="color:rgba(0,0,0,0.5);">Sales Order</div>
          <div class="flex items-center gap-3 flex-wrap">
            <h1 class="text-2xl md:text-3xl font-extrabold text-black">{{ order.salesOrder.orderNo }}</h1>
            <span class="px-3 py-1 rounded-full text-xs font-bold" :style="statusStyle(order.salesOrder.status)">
              {{ order.salesOrder.status }}
            </span>
          </div>
          <div class="text-sm mt-1" style="color:rgba(0,0,0,0.55);">
            Customer: <span class="font-semibold text-black">{{ order.salesOrder.PartnerName }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-2">
          <button @click="createInvoice"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition hover:opacity-80"
                  style="border-color:rgba(0,0,0,0.2); color:#0B1220; background:transparent;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Create Invoice
          </button>
          <button @click="receivePayment"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition hover:opacity-85"
                  style="background:#C7EA2F; color:#0B1220;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"/>
            </svg>
            Receive Payment
          </button>
        </div>
      </div>

      <!-- ── Header Info Cards — 3 cols on lg ────────────────── -->
      <div class="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-3">

        <!-- Dates -->
        <div class="rounded-3xl border border-black/10 p-4 shadow-sm">
          <div class="text-xs font-semibold mb-1" style="color:rgba(0,0,0,0.45);">Order Date</div>
          <div class="font-bold text-black mb-4">{{ formatDate(order.salesOrder.orderDate) }}</div>
          <div class="text-xs font-semibold mb-1" style="color:rgba(0,0,0,0.45);">Expected Delivery</div>
          <div class="font-bold text-black">{{ formatDate(order.salesOrder.expectedDeliveryDate) }}</div>
        </div>

        <!-- Memo -->
        <div class="rounded-3xl border border-black/10 p-4 shadow-sm">
          <div class="text-xs font-semibold mb-2" style="color:rgba(0,0,0,0.45);">Memo</div>
          <div class="text-sm leading-6" style="color:rgba(0,0,0,0.7);">{{ order.salesOrder.memo || '—' }}</div>
        </div>

        <!-- Totals -->
        <div class="rounded-3xl border border-black/10 p-4 shadow-sm">
          <div class="text-xs font-semibold mb-3" style="color:rgba(0,0,0,0.45);">Totals</div>
          <div class="flex items-center justify-between text-sm mb-2">
            <span style="color:rgba(0,0,0,0.6);">Sub Total</span>
            <span class="font-semibold text-black">{{ formatAmount(order.salesOrder.orderSubTotal) }}</span>
          </div>
          <div class="flex items-center justify-between text-sm mb-2">
            <span style="color:rgba(0,0,0,0.6);">Tax</span>
            <span class="font-semibold text-black">{{ formatAmount(order.salesOrder.orderTaxTotal) }}</span>
          </div>
          <div class="flex items-center justify-between pt-2" style="border-top:1px solid rgba(0,0,0,0.08);">
            <span class="font-extrabold text-black text-sm">Net Total</span>
            <span class="font-extrabold text-black">{{ formatAmount(order.salesOrder.orderNetTotal) }}</span>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════ -->
      <!-- DESKTOP: col-span-2 Order Lines + right panel (lg+)   -->
      <!-- ══════════════════════════════════════════════════════ -->
      <div class="hidden lg:grid grid-cols-3 gap-6 mb-6">

        <!-- Order Lines — 2 cols -->
        <div class="col-span-2 rounded-3xl border border-black/10 shadow-sm overflow-hidden" style="align-self:start;">
          <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Order Lines</div>
            <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:#C7EA2F;color:#0B1220;">
              {{ order.orderLines.length }} Items
            </span>
          </div>
          <div class="px-5 py-3 text-xs font-semibold border-b border-black/10"
               style="display:grid;grid-template-columns:1fr 70px 110px 110px 110px;background:rgba(0,0,0,0.02);color:rgba(0,0,0,0.5);">
            <div>Item</div>
            <div class="text-center">Qty</div>
            <div class="text-right">Unit Price</div>
            <div class="text-right">Sub Total</div>
            <div class="text-right">Line Total</div>
          </div>
          <div v-for="line in order.orderLines" :key="line.id"
               class="px-5 py-4 border-b border-black/10 hover:bg-black/[0.015]"
               style="display:grid;grid-template-columns:1fr 70px 110px 110px 110px;align-items:center;">
            <div>
              <div class="font-semibold text-black text-sm">{{ line.itemName }}</div>
              <div class="text-xs mt-0.5" style="color:rgba(0,0,0,0.45);">Code: {{ line.itemCode }}</div>
            </div>
            <div class="font-semibold text-black text-sm text-center">{{ line.qtyOrdered }}</div>
            <div class="font-semibold text-black text-sm text-right">{{ formatAmount(line.unitPrice) }}</div>
            <div class="font-semibold text-black text-sm text-right">{{ formatAmount(line.lineSubTotal) }}</div>
            <div class="font-extrabold text-black text-right">{{ formatAmount(line.lineTotal) }}</div>
          </div>
          <div v-if="order.orderLines.length===0" class="py-10 text-center text-sm" style="color:rgba(0,0,0,0.4);">No order lines</div>
        </div>

        <!-- Right column: Invoices + Payments -->
        <div class="flex flex-col gap-4" style="align-self:start;">

          <!-- Invoices -->
          <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <div class="font-extrabold text-black">Invoices</div>
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                   style="background:#0B1220;color:#C7EA2F;">{{ order.invoices.length }}</div>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="inv in order.invoices" :key="inv.id" class="rounded-2xl border border-black/10 p-4">
                <div class="flex items-center justify-between mb-2">
                  <div class="font-extrabold text-black text-sm">{{ inv.invoiceNo }}</div>
                  <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                        :style="inv.status==='Posted'
                          ? 'background:#dcfce7;color:#166534;border:1px solid #86efac;'
                          : 'background:rgba(0,0,0,0.06);color:rgba(0,0,0,0.55);border:1px solid rgba(0,0,0,0.1);'">
                    {{ inv.status }}
                  </span>
                </div>
                <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">Date: {{ formatDate(inv.invoiceDate) }}</div>
                <div class="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div>
                    <div style="color:rgba(0,0,0,0.45);">Total</div>
                    <div class="font-semibold text-black mt-0.5">{{ formatAmount(inv.invoiceNetTotal) }}</div>
                  </div>
                  <div>
                    <div style="color:rgba(0,0,0,0.45);">Paid</div>
                    <div class="font-semibold text-black mt-0.5">{{ formatAmount(inv.paidAmount) }}</div>
                  </div>
                  <div>
                    <div style="color:rgba(0,0,0,0.45);">Balance</div>
                    <div class="font-semibold mt-0.5" style="color:#dc2626;">{{ formatAmount(inv.balanceAmount) }}</div>
                  </div>
                </div>
                <div class="w-full rounded-full h-1.5 mb-3" style="background:rgba(0,0,0,0.08);">
                  <div class="h-1.5 rounded-full" style="background:#C7EA2F;"
                       :style="`width:${inv.invoiceNetTotal > 0 ? Math.round((inv.paidAmount/inv.invoiceNetTotal)*100) : 0}%`"></div>
                </div>
                <div class="flex gap-2">
                  <button @click="viewInvoice(inv)"
                          class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                          style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Invoice</button>
                  <button @click="allocatePayment(inv)"
                          class="flex-1 py-2 rounded-xl text-xs font-bold"
                          style="background:#0B1220;color:#C7EA2F;">Allocate Payment</button>
                </div>
              </div>
              <div v-if="order.invoices.length===0"
                   class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10"
                   style="color:rgba(0,0,0,0.35);">No invoices yet</div>
            </div>
          </div>

          <!-- Payments -->
          <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
            <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
              <div class="font-extrabold text-black">Payments</div>
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                   style="background:#0B1220;color:#C7EA2F;">{{ order.payments.length }}</div>
            </div>
            <div class="p-4 space-y-3">
              <div v-for="pmt in order.payments" :key="pmt.id" class="rounded-2xl border border-black/10 p-4">
                <div class="flex items-center justify-between mb-1">
                  <div class="font-extrabold text-black text-sm">{{ pmt.paymentNo }}</div>
                  <div class="font-extrabold text-black">{{ formatAmount(pmt.amount) }}</div>
                </div>
                <div class="text-xs mb-1" style="color:rgba(0,0,0,0.5);">
                  Date: {{ formatDate(pmt.paymentDate) }} • Method: {{ pmt.paymentMethod }} • Ref: {{ pmt.paymentReferenceNo }}
                </div>
                <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">
                  Allocated To: <span class="font-bold" style="color:#0B1220;">{{ pmt.allocatedInvoiceNo }}</span>
                </div>
                <div class="flex gap-2">
                  <button @click="viewPayment(pmt)"
                          class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                          style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Payment</button>
                  <button @click="viewJournal(pmt)"
                          class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                          style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Journal</button>
                </div>
              </div>
              <div v-if="order.payments.length===0"
                   class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10"
                   style="color:rgba(0,0,0,0.35);">No payments recorded</div>
            </div>
          </div>

        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════ -->
      <!-- MOBILE: stacked layout (hidden on lg+)                -->
      <!-- ══════════════════════════════════════════════════════ -->
      <div class="flex flex-col gap-4 lg:hidden mb-6">

        <!-- Order Lines -->
        <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Order Lines</div>
            <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:#C7EA2F;color:#0B1220;">
              {{ order.orderLines.length }} Items
            </span>
          </div>
          <div v-for="line in order.orderLines" :key="line.id"
               class="flex items-start justify-between px-4 py-3 border-t border-black/10 gap-3">
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-black text-sm">{{ line.itemName }}</div>
              <div class="text-xs mt-0.5" style="color:rgba(0,0,0,0.45);">Code: {{ line.itemCode }}</div>
              <div class="text-xs mt-1" style="color:rgba(0,0,0,0.5);">Qty: {{ line.qtyOrdered }} × {{ formatAmount(line.unitPrice) }}</div>
            </div>
            <div class="font-extrabold text-black text-sm shrink-0">{{ formatAmount(line.lineTotal) }}</div>
          </div>
          <div v-if="order.orderLines.length===0" class="py-10 text-center text-sm" style="color:rgba(0,0,0,0.4);">No order lines</div>
        </div>

        <!-- Invoices -->
        <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Invoices</div>
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                 style="background:#0B1220;color:#C7EA2F;">{{ order.invoices.length }}</div>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="inv in order.invoices" :key="inv.id" class="rounded-2xl border border-black/10 p-4">
              <div class="flex items-center justify-between mb-2">
                <div class="font-extrabold text-black text-sm">{{ inv.invoiceNo }}</div>
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                      :style="inv.status==='Posted'
                        ? 'background:#dcfce7;color:#166534;border:1px solid #86efac;'
                        : 'background:rgba(0,0,0,0.06);color:rgba(0,0,0,0.55);border:1px solid rgba(0,0,0,0.1);'">
                  {{ inv.status }}
                </span>
              </div>
              <div class="text-xs mb-2" style="color:rgba(0,0,0,0.5);">Date: {{ formatDate(inv.invoiceDate) }}</div>
              <div class="flex justify-between text-xs mb-1">
                <span style="color:rgba(0,0,0,0.5);">Paid: <strong class="text-black">{{ formatAmount(inv.paidAmount) }}</strong></span>
                <span style="color:rgba(0,0,0,0.5);">Balance: <strong style="color:#dc2626;">{{ formatAmount(inv.balanceAmount) }}</strong></span>
              </div>
              <div class="w-full rounded-full h-1.5 mb-3" style="background:rgba(0,0,0,0.08);">
                <div class="h-1.5 rounded-full" style="background:#C7EA2F;"
                     :style="`width:${inv.invoiceNetTotal > 0 ? Math.round((inv.paidAmount/inv.invoiceNetTotal)*100) : 0}%`"></div>
              </div>
              <div class="flex gap-2">
                <button @click="viewInvoice(inv)"
                        class="flex-1 py-2 rounded-xl text-xs font-bold"
                        style="background:#0B1220;color:#C7EA2F;">View Invoice</button>
                <button @click="allocatePayment(inv)"
                        class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                        style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">Allocate Payment</button>
              </div>
            </div>
            <div v-if="order.invoices.length===0"
                 class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10"
                 style="color:rgba(0,0,0,0.35);">No invoices yet</div>
          </div>
        </div>

        <!-- Payments -->
        <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden">
          <div class="flex items-center justify-between px-4 py-4 border-b border-black/10">
            <div class="font-extrabold text-black">Payments</div>
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                 style="background:#0B1220;color:#C7EA2F;">{{ order.payments.length }}</div>
          </div>
          <div class="p-4 space-y-3">
            <div v-for="pmt in order.payments" :key="pmt.id" class="rounded-2xl border border-black/10 p-4">
              <div class="flex items-center justify-between mb-1">
                <div class="font-extrabold text-black text-sm">{{ pmt.paymentNo }}</div>
                <div class="font-extrabold text-black">{{ formatAmount(pmt.amount) }}</div>
              </div>
              <div class="text-xs mb-1" style="color:rgba(0,0,0,0.5);">
                Date: {{ formatDate(pmt.paymentDate) }} • Method: {{ pmt.paymentMethod }} • Ref: {{ pmt.paymentReferenceNo }}
              </div>
              <div class="text-xs mb-3" style="color:rgba(0,0,0,0.5);">
                Allocated To: <span class="font-bold" style="color:#0B1220;">{{ pmt.allocatedInvoiceNo }}</span>
              </div>
              <div class="flex gap-2">
                <button @click="viewPayment(pmt)"
                        class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                        style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Payment</button>
                <button @click="viewJournal(pmt)"
                        class="flex-1 py-2 rounded-xl border text-xs font-semibold"
                        style="border-color:rgba(0,0,0,0.15);color:#0B1220;background:transparent;">View Journal</button>
              </div>
            </div>
            <div v-if="order.payments.length===0"
                 class="py-6 text-center text-sm rounded-2xl border border-dashed border-black/10"
                 style="color:rgba(0,0,0,0.35);">No payments recorded</div>
          </div>
        </div>

      </div>

      <!-- ── Footer Buttons ──────────────────────────────────── -->
      <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          @click="$router.push('/qbook/salesOrders')"
          class="px-5 py-2.5 rounded-xl border text-sm font-semibold transition hover:opacity-80"
          style="border-color:rgba(0,0,0,0.2); color:#0B1220; background:transparent;"
        >Back to Orders</button>
        <button
          @click="cancelOrder"
          class="px-5 py-2.5 rounded-xl text-sm font-bold transition hover:opacity-85"
          style="background:#dc2626; color:#ffffff;"
        >Cancel Order</button>
      </div>

    </div>
    <div v-else class="flex items-center justify-center min-h-screen text-sm" style="color:rgba(0,0,0,0.4);">
      Loading...
    </div>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- PRINT MODAL — opens when createInvoice() is called        -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <div v-if="showPrint && order"
         class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
         style="background:rgba(0,0,0,0.6);"
         @click.self="showPrint = false">

      <div class="relative w-full max-w-4xl">

        <!-- Close + Print buttons -->
        <div class="flex items-center justify-between mb-3">
          <button
            @click="showPrint = false"
            class="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-80"
            style="background:rgba(255,255,255,0.15); color:#fff;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
            Close
          </button>
          <button
            @click="printDoc"
            class="flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-bold transition hover:opacity-90"
            style="background:#C7EA2F; color:#0B1220;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/>
            </svg>
            Print Sales Order
          </button>
        </div>

        <!-- ── Printable document ─────────────────────────────── -->
        <div id="so-print-area" class="bg-white p-8" style="border:1px solid #e2e8f0;">

          <!-- Company Header -->
          <div style="border-bottom:2px solid #0B1220; padding-bottom:20px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px;">
              <div>
                <div style="font-size:20px; font-weight:900; color:#0B1220; letter-spacing:0.03em;">YOUR COMPANY NAME (PVT) LTD</div>
                <div style="font-size:13px; color:rgba(0,0,0,0.55); margin-top:4px;">No. 123, Main Street, Colombo 10, Sri Lanka</div>
                <div style="font-size:13px; color:rgba(0,0,0,0.55);">Phone: +94 11 2345678</div>
                <div style="font-size:13px; color:rgba(0,0,0,0.55);">Email: info@yourcompany.com</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:28px; font-weight:900; color:#0B1220; letter-spacing:0.05em; text-transform:uppercase;">Sales Order</div>
                <div style="margin-top:6px; font-size:13px; color:rgba(0,0,0,0.55);">Printed: {{ printedDate }}</div>
                <div style="margin-top:8px; height:4px; background:#C7EA2F; border-radius:2px; width:180px; margin-left:auto;"></div>
              </div>
            </div>
          </div>

          <!-- Customer + Order Details -->
          <div style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:32px;">
            <div>
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:rgba(0,0,0,0.45); margin-bottom:10px;">Customer Details</div>
              <div style="font-size:13px; line-height:2; color:#0B1220;">
                <div><span style="font-weight:600;">Customer:</span> {{ order.salesOrder.PartnerName }}</div>
                <div><span style="font-weight:600;">Customer ID:</span> {{ order.salesOrder.PartnerId || '—' }}</div>
                <div><span style="font-weight:600;">Address:</span> —</div>
                <div><span style="font-weight:600;">Contact:</span> —</div>
              </div>
            </div>
            <div>
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:rgba(0,0,0,0.45); margin-bottom:10px;">Order Details</div>
              <div style="font-size:13px; line-height:2; color:#0B1220;">
                <div><span style="font-weight:600;">Order No:</span> {{ order.salesOrder.orderNo }}</div>
                <div><span style="font-weight:600;">Order Date:</span> {{ formatDate(order.salesOrder.orderDate) }}</div>
                <div><span style="font-weight:600;">Expected Delivery:</span> {{ formatDate(order.salesOrder.expectedDeliveryDate) }}</div>
                <div>
                  <span style="font-weight:600;">Status:</span>
                  <span style="margin-left:6px; padding:2px 10px; border-radius:999px; font-size:11px; font-weight:700;"
                        :style="statusStyle(order.salesOrder.status)">
                    {{ order.salesOrder.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Memo -->
          <div v-if="order.salesOrder.memo"
               style="margin-top:20px; border:1px solid rgba(0,0,0,0.12); border-radius:10px; padding:14px 16px;">
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:rgba(0,0,0,0.45); margin-bottom:6px;">Memo</div>
            <div style="font-size:13px; color:rgba(0,0,0,0.7);">{{ order.salesOrder.memo }}</div>
          </div>

          <!-- Order Lines Table -->
          <div style="margin-top:24px;">
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:rgba(0,0,0,0.45); margin-bottom:10px;">Order Items</div>
            <table style="width:100%; border-collapse:collapse; font-size:13px;">
              <thead>
                <tr style="background:#0B1220; color:#C7EA2F;">
                  <th style="padding:10px 12px; text-align:left; font-weight:700;">#</th>
                  <th style="padding:10px 12px; text-align:left; font-weight:700;">Item</th>
                  <th style="padding:10px 12px; text-align:left; font-weight:700;">Code</th>
                  <th style="padding:10px 12px; text-align:right; font-weight:700;">Qty</th>
                  <th style="padding:10px 12px; text-align:right; font-weight:700;">Unit Price</th>
                  <th style="padding:10px 12px; text-align:right; font-weight:700;">Sub Total</th>
                  <th style="padding:10px 12px; text-align:right; font-weight:700;">Tax</th>
                  <th style="padding:10px 12px; text-align:right; font-weight:700;">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(line, idx) in order.orderLines" :key="line.id"
                    :style="idx % 2 === 0 ? 'background:#fff;' : 'background:rgba(0,0,0,0.025);'">
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07);">{{ idx + 1 }}</td>
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07); font-weight:600;">{{ line.itemName }}</td>
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07); color:rgba(0,0,0,0.55);">{{ line.itemCode }}</td>
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07); text-align:right;">{{ line.qtyOrdered }}</td>
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07); text-align:right;">{{ formatAmount(line.unitPrice) }}</td>
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07); text-align:right;">{{ formatAmount(line.lineSubTotal) }}</td>
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07); text-align:right;">{{ formatAmount(line.lineTax) }}</td>
                  <td style="padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.07); text-align:right; font-weight:700;">{{ formatAmount(line.lineTotal) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Totals -->
          <div style="margin-top:20px; display:flex; justify-content:flex-end;">
            <table style="width:300px; font-size:13px;">
              <tbody>
                <tr>
                  <td style="padding:7px 12px; color:rgba(0,0,0,0.6); font-weight:500;">Sub Total</td>
                  <td style="padding:7px 12px; text-align:right; font-weight:600; color:#0B1220;">{{ formatAmount(order.salesOrder.orderSubTotal) }}</td>
                </tr>
                <tr>
                  <td style="padding:7px 12px; color:rgba(0,0,0,0.6); font-weight:500;">Tax Total</td>
                  <td style="padding:7px 12px; text-align:right; font-weight:600; color:#0B1220;">{{ formatAmount(order.salesOrder.orderTaxTotal) }}</td>
                </tr>
                <tr style="border-top:2px solid #0B1220;">
                  <td style="padding:12px 12px; font-weight:900; font-size:15px; color:#0B1220;">Net Total</td>
                  <td style="padding:12px 12px; text-align:right; font-weight:900; font-size:15px; color:#0B1220;">{{ formatAmount(order.salesOrder.orderNetTotal) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Terms & Notes -->
          <div style="margin-top:32px; border-top:1px solid rgba(0,0,0,0.1); padding-top:20px;">
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; color:rgba(0,0,0,0.45); margin-bottom:10px;">Terms & Notes</div>
            <ul style="font-size:13px; color:rgba(0,0,0,0.65); padding-left:18px; line-height:2.2; margin:0;">
              <li>This sales order is subject to stock availability.</li>
              <li>Please verify quantities and item details before delivery.</li>
              <li>Invoices may be issued based on payments received.</li>
            </ul>
          </div>

          <!-- Signatures -->
          <div style="margin-top:56px; display:grid; grid-template-columns:1fr 1fr; gap:48px;">
            <div>
              <div style="border-top:1px solid rgba(0,0,0,0.3); padding-top:8px; font-size:13px; color:rgba(0,0,0,0.6);">Prepared By</div>
            </div>
            <div style="text-align:right;">
              <div style="border-top:1px solid rgba(0,0,0,0.3); padding-top:8px; font-size:13px; color:rgba(0,0,0,0.6);">Authorized Signature</div>
            </div>
          </div>

          <!-- Footer accent bars -->
          <div style="margin-top:40px; height:6px; background:#0B1220; border-radius:3px;"></div>
          <div style="margin-top:5px; height:3px; background:#C7EA2F; border-radius:2px;"></div>

        </div>
        <!-- end #so-print-area -->

      </div>
    </div>
    <!-- end print modal -->

  </section>
</template>

<script>
import { useUserStore }  from '~/stores/modules/userStore';
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';
import axios from 'axios';

export default {
  data() {
    return {
      order:     null,
      showPrint: false,
    };
  },

  computed: {
    printedDate() {
      return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    },
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
      return Number(val).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    formatDate(val) {
      if (!val) return '—';
      try {
        return new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      } catch { return val; }
    },
    createInvoice()      { this.showPrint = true; },
    printDoc()           { window.print(); },
    receivePayment()     { /* TODO */ },
    viewInvoice(inv)     { this.$router.push(`/qbook/Invoices?inv=${inv.invoiceNo}`); },
    allocatePayment(inv) { /* TODO */ },
    viewPayment(pmt)     { this.$router.push(`/qbook/payments?rcpt=${pmt.paymentNo}`); },
    viewJournal(pmt)     { this.$router.push(`/qbook/journal?entry=${pmt.journalEntryId}`); },
    cancelOrder()        { /* TODO */ },
  },

  async created() {
    this.userStore  = useUserStore();
    this.qbookStore = useQbookStore();

    // ── TEMP: load from mock JSON file ────────────────────────
    try {
      const response = await axios.get('/mock/GetSalesOrderDetailsByIdAsync.json');
      if (response.data.isSuccess) {
        this.order = response.data.data.data;
      }
    } catch (e) {
      console.error('Mock load failed', e);
    }

    // ── Real API (uncomment when backend ready) ───────────────
    // const soNo = this.$route.params.soNo;
    // await this.qbookStore.getSalesOrderDetailById(
    //   { SalesOrderId: soNo },
    //   this.$QbookshowLoading
    // );
    // this.order = this.qbookStore.salesOrderDetail;
  },

  head() {
    return { title: `${this.order?.salesOrder?.orderNo || 'Sales Order'} – QBook` };
  },
};
</script>

<style>
@media print {
  @page { size: A4; margin: 10mm; }
  body * { visibility: hidden; }
  #so-print-area,
  #so-print-area * { visibility: visible; }
  #so-print-area {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    padding: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }
}
</style>