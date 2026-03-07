<script setup>
definePageMeta({
  layout: 'qbooklogin',
  middleware: 'auth-ebook',
})
</script>

<template>
  <section class="min-h-screen bg-white">
    <div class="px-4 py-5 md:px-6 md:py-6">

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
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
        <div>
          <div class="text-xs font-semibold mb-1" style="color:rgba(0,0,0,0.45);">Sales Order</div>
          <div class="text-2xl md:text-3xl font-extrabold text-black">Create New Order</div>
          <div class="text-sm mt-1" style="color:rgba(0,0,0,0.5);">Enter order details and add line items</div>
        </div>

        <!-- Header action buttons -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            @click="$router.push('/qbook/salesOrders')"
            class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold"
            style="border-color:rgba(0,0,0,0.2); color:#0B1220; background:transparent;"
          >
            Cancel
          </button>
          <button
            @click="saveDraft"
            class="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold"
            style="border-color:#0B1220; color:#0B1220; background:transparent;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save Draft
          </button>
          <button
            @click="confirmOrder"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style="background:#C7EA2F; color:#0B1220;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Confirm Order
          </button>
        </div>
      </div>

      <!-- ── Order Information Card ─────────────────────────── -->
      <div class="rounded-3xl border border-black/10 shadow-sm p-5 md:p-6 mb-4">
        <div class="font-extrabold text-black mb-4">Order Information</div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <!-- Order No (readonly) -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Order No</label>
            <input
              type="text"
              :value="form.soNo"
              readonly
              class="w-full rounded-2xl px-4 py-2.5 text-sm font-semibold outline-none"
              style="background:rgba(0,0,0,0.04); border:1px solid rgba(0,0,0,0.1); color:rgba(0,0,0,0.5);"
            />
          </div>

          <!-- Order Date -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Order Date</label>
            <input
              v-model="form.orderDate"
              type="date"
              class="w-full rounded-2xl px-4 py-2.5 text-sm outline-none transition"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            />
          </div>

          <!-- Expected Delivery -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Expected Delivery Date</label>
            <input
              v-model="form.expectedDelivery"
              type="date"
              class="w-full rounded-2xl px-4 py-2.5 text-sm outline-none transition"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            />
          </div>

          <!-- Status (readonly) -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Status</label>
            <div class="w-full rounded-2xl px-4 py-2.5 text-sm font-bold flex items-center gap-2"
                 style="background:rgba(0,0,0,0.04); border:1px solid rgba(0,0,0,0.1);">
              <span class="w-2 h-2 rounded-full" style="background:rgba(0,0,0,0.3);"></span>
              <span style="color:rgba(0,0,0,0.5);">Draft</span>
            </div>
          </div>

          <!-- Customer -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Customer</label>
            <select
              v-model="form.customer"
              class="w-full rounded-2xl px-4 py-2.5 text-sm outline-none transition appearance-none"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            >
              <option value="">Select Customer</option>
              <option>ABC Tea Buyers</option>
              <option>Colombo Export Traders</option>
              <option>Kandy Local Stores</option>
              <option>Galle Traders Ltd</option>
              <option>Matara Exports</option>
              <option>Negombo Buyers</option>
            </select>
          </div>

          <!-- Memo -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Memo</label>
            <input
              v-model="form.memo"
              type="text"
              placeholder="Enter order notes..."
              class="w-full rounded-2xl px-4 py-2.5 text-sm outline-none transition"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            />
          </div>

        </div>
      </div>

      <!-- ── Add Item Card ───────────────────────────────────── -->
      <div class="rounded-3xl border border-black/10 shadow-sm p-5 md:p-6 mb-4">
        <div class="font-extrabold text-black mb-4">Add Item</div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">

          <!-- Item -->
          <div class="lg:col-span-2">
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Item</label>
            <select
              v-model="lineEntry.item"
              @change="onItemChange"
              class="w-full rounded-2xl px-4 py-2.5 text-sm outline-none transition appearance-none"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            >
              <option value="">Select Item</option>
              <option v-for="i in itemList" :key="i.name" :value="i.name">{{ i.name }}</option>
            </select>
          </div>

          <!-- Qty -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Qty Ordered</label>
            <input
              v-model.number="lineEntry.qty"
              type="number"
              min="1"
              placeholder="0"
              class="w-full rounded-2xl px-4 py-2.5 text-sm text-right outline-none transition"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            />
          </div>

          <!-- Unit Price -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Unit Price</label>
            <input
              v-model.number="lineEntry.unitPrice"
              type="number"
              min="0"
              placeholder="0.00"
              class="w-full rounded-2xl px-4 py-2.5 text-sm text-right outline-none transition"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            />
          </div>

          <!-- Discount -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Discount</label>
            <div class="flex gap-2">
              <input
                v-model.number="lineEntry.discount"
                type="number"
                min="0"
                placeholder="0"
                class="w-full rounded-2xl px-3 py-2.5 text-sm text-right outline-none transition"
                style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
                onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
                onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
              />
              <select
                v-model="lineEntry.discountType"
                class="rounded-2xl px-3 py-2.5 text-sm outline-none"
                style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white; min-width:58px;"
              >
                <option>%</option>
                <option>LKR</option>
              </select>
            </div>
          </div>

          <!-- Tax Profile -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.55);">Tax Profile</label>
            <select
              v-model="lineEntry.tax"
              class="w-full rounded-2xl px-4 py-2.5 text-sm outline-none transition appearance-none"
              style="border:1px solid rgba(0,0,0,0.15); color:#0B1220; background:white;"
              onfocus="this.style.borderColor='#C7EA2F'; this.style.boxShadow='0 0 0 3px rgba(199,234,47,0.2)'"
              onblur="this.style.borderColor='rgba(0,0,0,0.15)'; this.style.boxShadow='none'"
            >
              <option value="">No Tax</option>
              <option value="0.18">VAT 18%</option>
              <option value="0.15">VAT 15%</option>
            </select>
          </div>

        </div>

        <!-- Add Line Button -->
        <div class="flex justify-end mt-4">
          <button
            @click="addLine"
            class="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition"
            style="background:#0B1220; color:#C7EA2F;"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Add Line
          </button>
        </div>
      </div>

      <!-- ── Added Items Table ───────────────────────────────── -->
      <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden mb-4">

        <!-- Card Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-black/10">
          <div class="font-extrabold text-black">Added Items</div>
          <span class="px-3 py-1 rounded-full text-xs font-bold" style="background:#C7EA2F; color:#0B1220;">
            {{ lines.length }} Items
          </span>
        </div>

        <!-- Desktop Table Header -->
        <div class="hidden md:grid px-5 py-3 text-xs font-semibold border-b border-black/10"
             style="grid-template-columns:2fr 0.7fr 1fr 0.8fr 0.8fr 1fr 1fr 1fr 0.7fr; color:rgba(0,0,0,0.5); background:rgba(0,0,0,0.02);">
          <div>Item</div>
          <div class="text-center">Qty</div>
          <div class="text-right">Unit Price</div>
          <div class="text-right">Discount</div>
          <div class="text-center">Tax</div>
          <div class="text-right">Sub Total</div>
          <div class="text-right">Tax Total</div>
          <div class="text-right">Line Total</div>
          <div class="text-center">Action</div>
        </div>

        <!-- Desktop Rows -->
        <div v-if="lines.length === 0" class="py-12 text-center text-sm" style="color:rgba(0,0,0,0.4);">
          No items added yet. Use the form above to add items.
        </div>

        <template v-for="(line, idx) in lines" :key="idx">
          <!-- Desktop row -->
          <div class="hidden md:grid px-5 py-4 border-b border-black/10 hover:bg-black/[0.015] transition"
               style="grid-template-columns:2fr 0.7fr 1fr 0.8fr 0.8fr 1fr 1fr 1fr 0.7fr; align-items:center;">
            <div>
              <div class="font-semibold text-black text-sm">{{ line.item }}</div>
              <div class="text-xs mt-0.5" style="color:rgba(0,0,0,0.45);">Code: {{ line.code }}</div>
            </div>
            <div class="text-center font-semibold text-black text-sm">{{ line.qty }}</div>
            <div class="text-right font-semibold text-black text-sm">{{ formatAmount(line.unitPrice) }}</div>
            <div class="text-right text-sm" style="color:rgba(0,0,0,0.6);">
              {{ line.discount }}{{ line.discountType === '%' ? '%' : ' LKR' }}
            </div>
            <div class="text-center text-xs" style="color:rgba(0,0,0,0.6);">{{ line.taxLabel }}</div>
            <div class="text-right font-semibold text-black text-sm">{{ formatAmount(line.subTotal) }}</div>
            <div class="text-right text-sm" style="color:rgba(0,0,0,0.6);">{{ formatAmount(line.taxTotal) }}</div>
            <div class="text-right font-extrabold text-black">{{ formatAmount(line.lineTotal) }}</div>
            <div class="flex justify-center">
              <button
                @click="removeLine(idx)"
                class="px-3 py-1 rounded-xl text-xs font-semibold"
                style="background:#fee2e2; color:#991b1b;"
              >
                Remove
              </button>
            </div>
          </div>

          <!-- Mobile card row -->
          <div class="md:hidden px-4 py-3 border-b border-black/10">
            <div class="flex items-start justify-between gap-3 mb-2">
              <div>
                <div class="font-semibold text-black text-sm">{{ line.item }}</div>
                <div class="text-xs mt-0.5" style="color:rgba(0,0,0,0.45);">Code: {{ line.code }}</div>
              </div>
              <button
                @click="removeLine(idx)"
                class="px-3 py-1 rounded-xl text-xs font-semibold shrink-0"
                style="background:#fee2e2; color:#991b1b;"
              >
                Remove
              </button>
            </div>
            <div class="grid grid-cols-3 gap-2 text-xs">
              <div><span style="color:rgba(0,0,0,0.45);">Qty</span><div class="font-semibold text-black">{{ line.qty }}</div></div>
              <div><span style="color:rgba(0,0,0,0.45);">Unit Price</span><div class="font-semibold text-black">{{ formatAmount(line.unitPrice) }}</div></div>
              <div><span style="color:rgba(0,0,0,0.45);">Discount</span><div class="font-semibold text-black">{{ line.discount }}{{ line.discountType === '%' ? '%' : ' LKR' }}</div></div>
              <div><span style="color:rgba(0,0,0,0.45);">Sub Total</span><div class="font-semibold text-black">{{ formatAmount(line.subTotal) }}</div></div>
              <div><span style="color:rgba(0,0,0,0.45);">Tax</span><div class="font-semibold text-black">{{ formatAmount(line.taxTotal) }}</div></div>
              <div><span style="color:rgba(0,0,0,0.45);">Line Total</span><div class="font-extrabold text-black">{{ formatAmount(line.lineTotal) }}</div></div>
            </div>
          </div>
        </template>

      </div>

      <!-- ── Order Summary + Footer Buttons ────────────────────── -->

      <!-- Order Summary Card — full width, prominent -->
      <div class="rounded-3xl border border-black/10 shadow-sm p-5 md:p-6 mb-4">
        <div class="font-extrabold text-black text-base mb-4">Order Summary</div>
        <div class="flex flex-col md:flex-row md:items-center md:justify-end gap-3 md:gap-10">
          <div class="flex items-center justify-between md:flex-col md:items-end gap-1">
            <span class="text-sm" style="color:rgba(0,0,0,0.55);">Sub Total</span>
            <span class="font-extrabold text-black text-base md:text-lg">{{ formatAmount(summary.subTotal) }}</span>
          </div>
          <div class="h-px md:h-8 md:w-px" style="background:rgba(0,0,0,0.1);"></div>
          <div class="flex items-center justify-between md:flex-col md:items-end gap-1">
            <span class="text-sm" style="color:rgba(0,0,0,0.55);">Tax Total</span>
            <span class="font-extrabold text-black text-base md:text-lg">{{ formatAmount(summary.taxTotal) }}</span>
          </div>
          <div class="h-px md:h-8 md:w-px" style="background:rgba(0,0,0,0.1);"></div>
          <div class="flex items-center justify-between md:flex-col md:items-end gap-1 rounded-2xl md:rounded-none p-3 md:p-0"
               style="background:rgba(199,234,47,0.15);">
            <span class="text-sm font-bold" style="color:#0B1220;">Net Total</span>
            <span class="font-extrabold text-xl md:text-2xl" style="color:#0B1220;">{{ formatAmount(summary.netTotal) }}</span>
          </div>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="flex flex-wrap items-center justify-end gap-3 mb-6">
        <button
          @click="$router.push('/qbook/salesOrders')"
          class="px-5 py-2.5 rounded-xl border text-sm font-semibold"
          style="border-color:rgba(0,0,0,0.2); color:#0B1220; background:transparent;"
        >
          Back to Orders
        </button>
        <button
          @click="saveDraft"
          class="px-5 py-2.5 rounded-xl border text-sm font-bold"
          style="border-color:#0B1220; color:#0B1220; background:transparent;"
        >
          Save Draft
        </button>
        <button
          @click="confirmOrder"
          class="px-5 py-2.5 rounded-xl text-sm font-bold"
          style="background:#C7EA2F; color:#0B1220;"
        >
          Confirm Order
        </button>
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
      form: {
        soNo:             'SO-250024',   // TODO: fetch next SO number from API
        orderDate:        '',
        expectedDelivery: '',
        customer:         '',
        memo:             '',
      },

      // Line entry form
      lineEntry: {
        item:         '',
        qty:          null,
        unitPrice:    null,
        discount:     0,
        discountType: '%',
        tax:          '',
      },

      // Added lines
      lines: [],

      // Item master list
      itemList: [
        { name:'BOP Tea 25kg',  code:'TEA-BOP-25',  price:50000 },
        { name:'Dust Tea 25kg', code:'TEA-DUST-25', price:20000 },
        { name:'FBOP Tea 25kg', code:'TEA-FBOP-25', price:65000 },
        { name:'OP Tea 25kg',   code:'TEA-OP-25',   price:45000 },
      ],
    };
  },

  computed: {
    summary() {
      const subTotal = this.lines.reduce((s, l) => s + l.subTotal, 0);
      const taxTotal = this.lines.reduce((s, l) => s + l.taxTotal, 0);
      return { subTotal, taxTotal, netTotal: subTotal + taxTotal };
    },
  },

  methods: {
    formatAmount(val) {
      if (!val && val !== 0) return '0.00';
      return Number(val).toLocaleString('en-LK', { minimumFractionDigits:2, maximumFractionDigits:2 });
    },

    onItemChange() {
      const found = this.itemList.find(i => i.name === this.lineEntry.item);
      if (found) this.lineEntry.unitPrice = found.price;
    },

    addLine() {
      if (!this.lineEntry.item || !this.lineEntry.qty || !this.lineEntry.unitPrice) {
        alert('Please select an item and enter qty / unit price.');
        return;
      }

      const found    = this.itemList.find(i => i.name === this.lineEntry.item);
      const baseAmt  = this.lineEntry.qty * this.lineEntry.unitPrice;
      const discAmt  = this.lineEntry.discountType === '%'
        ? baseAmt * (this.lineEntry.discount / 100)
        : (this.lineEntry.discount || 0);
      const subTotal = baseAmt - discAmt;
      const taxRate  = this.lineEntry.tax ? parseFloat(this.lineEntry.tax) : 0;
      const taxTotal = subTotal * taxRate;
      const taxLabel = this.lineEntry.tax === '0.18' ? 'VAT 18%'
                     : this.lineEntry.tax === '0.15' ? 'VAT 15%' : 'No Tax';

      this.lines.push({
        item:         this.lineEntry.item,
        code:         found?.code || '',
        qty:          this.lineEntry.qty,
        unitPrice:    this.lineEntry.unitPrice,
        discount:     this.lineEntry.discount || 0,
        discountType: this.lineEntry.discountType,
        taxLabel,
        subTotal,
        taxTotal,
        lineTotal:    subTotal + taxTotal,
      });

      // Reset entry form
      this.lineEntry = { item:'', qty:null, unitPrice:null, discount:0, discountType:'%', tax:'' };
    },

    removeLine(idx) {
      this.lines.splice(idx, 1);
    },

    saveDraft() {
      // TODO: call qbookStore.createSalesOrder({ ...form, status:'Draft', lines })
      console.log('Save Draft', { form: this.form, lines: this.lines });
    },

    confirmOrder() {
      if (!this.form.customer) { alert('Please select a customer.'); return; }
      if (this.lines.length === 0) { alert('Please add at least one item.'); return; }
      // TODO: call qbookStore.createSalesOrder({ ...form, status:'Confirmed', lines })
      console.log('Confirm Order', { form: this.form, lines: this.lines });
    },
  },

  async created() {
    this.userStore  = useUserStore();
    this.qbookStore = useQbookStore();
    // TODO: fetch next SO number
    // this.form.soNo = await this.qbookStore.getNextSoNo()
  },

  head() { return { title: 'New Sales Order – QBook' }; },
};
</script>