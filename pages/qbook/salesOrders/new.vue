<script setup>
definePageMeta({
  layout: 'qbooklogin',
  middleware: 'auth-ebook',
})
</script>

<template>
  <section class="min-h-screen bg-white">
    <div class="px-4 py-5 md:px-6 md:py-6 ">

      <!-- ── Back Link ────────────────────────────────────────── -->
      <button @click="$router.push('/qbook/salesOrders')"
        class="flex items-center gap-1.5 text-sm mb-4 hover:opacity-70 transition"
        style="color:rgba(0,0,0,0.5);">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Sales Orders
      </button>

      <!-- ── Page Header ─────────────────────────────────────── -->
      <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-6">
        <div>
          <div class="text-xs font-semibold mb-1" style="color:rgba(0,0,0,0.4);">Sales Order</div>
          <div class="text-2xl font-extrabold text-black">Create New Order</div>
          <div class="text-sm mt-0.5" style="color:rgba(0,0,0,0.5);">Enter order details and add line items</div>
        </div>
        <div class="flex items-center gap-3">
          <button @click="$router.push('/qbook/salesOrders')"
            class="px-5 py-2 rounded-xl border text-sm font-semibold transition hover:bg-black/5"
            style="border-color:rgba(0,0,0,0.15); color:#0B1220;">
            Cancel
          </button>
          <button @click="submitOrder('Draft')"
            class="flex items-center gap-2 px-5 py-2 rounded-xl border text-sm font-semibold transition hover:bg-black/5"
            style="border-color:rgba(0,0,0,0.2); color:#0B1220;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save Draft
          </button>
          <button @click="submitOrder('Confirmed')"
            class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition hover:opacity-85"
            style="background:#C7EA2F; color:#0B1220;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Confirm Order
          </button>
        </div>
      </div>

      <!-- ── Order Information ────────────────────────────────── -->
      <div class="rounded-3xl border border-black/10 shadow-sm p-6 mb-5">
        <div class="font-extrabold text-black text-base mb-5">Order Information</div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <!-- Order No (readonly) -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Order No</label>
            <input v-model="form.orderNo" type="text" readonly
              class="w-full px-3 py-2.5 rounded-xl border text-sm"
              style="background:rgba(0,0,0,0.03); border-color:rgba(0,0,0,0.1); color:rgba(0,0,0,0.5);"
              placeholder="Auto-generated"/>
          </div>
          <!-- Order Date -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Order Date</label>
            <input v-model="form.orderDate" type="date"
              class="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
              style="border-color:rgba(0,0,0,0.1);"/>
          </div>
          <!-- Expected Delivery Date -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Expected Delivery Date</label>
            <input v-model="form.expectedDeliveryDate" type="date"
              class="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
              style="border-color:rgba(0,0,0,0.1);"/>
          </div>
          <!-- Status (readonly) -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Status</label>
            <div class="w-full px-3 py-2.5 rounded-xl border text-sm flex items-center gap-2"
              style="background:rgba(0,0,0,0.03); border-color:rgba(0,0,0,0.1); color:rgba(0,0,0,0.5);">
              <span class="w-2 h-2 rounded-full inline-block" style="background:rgba(0,0,0,0.3);"></span>
              Draft
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Customer -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Customer</label>
            <select v-model="form.partnerId"
              class="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none bg-white"
              style="border-color:rgba(0,0,0,0.1);">
              <option value="">Select Customer</option>
              <option v-for="c in customers" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <!-- Memo -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Memo</label>
            <input v-model="form.memo" type="text"
              class="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
              style="border-color:rgba(0,0,0,0.1);"
              placeholder="Enter order notes..."/>
          </div>
        </div>
      </div>

      <!-- ── Add Item ──────────────────────────────────────────── -->
      <div class="rounded-3xl border border-black/10 shadow-sm p-6 mb-5">
        <div class="font-extrabold text-black text-base mb-5">Add Item</div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <!-- Item -->
          <div class="col-span-2 md:col-span-1">
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Item</label>
            <select v-model="lineForm.itemId"
              class="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none bg-white"
              style="border-color:rgba(0,0,0,0.1);">
              <option value="">Select Item</option>
              <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
          <!-- Qty -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Qty Ordered</label>
            <input v-model.number="lineForm.qty" type="number" min="1"
              class="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
              style="border-color:rgba(0,0,0,0.1);" placeholder="0"/>
          </div>
          <!-- Unit Price (readonly from API) -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Unit Price</label>
            <input :value="calcResult ? calcResult.sellingPrice : '0.00'" type="text" readonly
              class="w-full px-3 py-2.5 rounded-xl border text-sm"
              style="background:rgba(0,0,0,0.03); border-color:rgba(0,0,0,0.1); color:rgba(0,0,0,0.5);"/>
          </div>
          <!-- Discount -->
          <div>
            <label class="block text-xs font-semibold mb-1.5" style="color:rgba(0,0,0,0.5);">Discount</label>
            <div class="flex gap-2">
              <input v-model.number="lineForm.discount" type="number" min="0"
                class="w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none"
                style="border-color:rgba(0,0,0,0.1);" placeholder="0"/>
              <select v-model="lineForm.isDiscountInPercent"
                class="px-2 py-2.5 rounded-xl border text-sm focus:outline-none bg-white"
                style="border-color:rgba(0,0,0,0.1);">
                <option :value="true">%</option>
                <option :value="false">LKR</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Calc result preview -->
        <div v-if="calcResult" class="mb-4 px-4 py-3 rounded-2xl text-sm flex flex-wrap gap-6"
          style="background:rgba(199,234,47,0.12); border:1px solid rgba(199,234,47,0.4);">
          <div><span style="color:rgba(0,0,0,0.5);">Sub Total:</span> <strong>{{ fmtNum(calcResult.lineSubTotal) }}</strong></div>
          <div><span style="color:rgba(0,0,0,0.5);">Tax:</span> <strong>{{ fmtNum(calcResult.totalTax) }}</strong></div>
          <div><span style="color:rgba(0,0,0,0.5);">Line Total:</span> <strong style="color:#0B1220;">{{ fmtNum(calcResult.lineTotal) }}</strong></div>
          <div v-for="t in calcResult.listTaxComponentTotalDetails" :key="t.taxName" class="text-xs" style="color:rgba(0,0,0,0.5);">
            {{ t.taxName }}: {{ fmtNum(t.taxAmount) }}
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button v-if="lineForm.itemId && lineForm.qty > 0" @click="calculateLine"
            class="px-5 py-2 rounded-xl border text-sm font-semibold transition hover:bg-black/5"
            style="border-color:rgba(0,0,0,0.2); color:#0B1220;">
            Calculate
          </button>
          <button @click="addLine"
            class="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition hover:opacity-85"
            style="background:#0B1220; color:#C7EA2F;">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Add Line
          </button>
        </div>
      </div>

      <!-- ── Added Items ───────────────────────────────────────── -->
      <div class="rounded-3xl border border-black/10 shadow-sm overflow-hidden mb-5">
        <div class="flex items-center justify-between px-6 py-4 border-b border-black/10">
          <div class="font-extrabold text-black text-base">Added Items</div>
          <span class="px-3 py-1 rounded-full text-xs font-bold"
            style="background:#C7EA2F; color:#0B1220;">
            {{ orderLines.length }} Items
          </span>
        </div>

        <!-- Table header -->
        <div class="hidden md:grid px-6 py-3 text-xs font-semibold border-b border-black/10"
          style="grid-template-columns:2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.6fr; color:rgba(0,0,0,0.5); background:rgba(0,0,0,0.02);">
          <div>Item</div>
          <div class="text-right">Qty</div>
          <div class="text-right">Unit Price</div>
          <div class="text-right">Discount</div>
          <div class="text-right">Tax</div>
          <div class="text-right">Sub Total</div>
          <div class="text-right">Line Total</div>
          <div class="text-right">Action</div>
        </div>

        <!-- Empty -->
        <div v-if="orderLines.length === 0" class="py-12 text-center text-sm" style="color:rgba(0,0,0,0.4);">
          No items added yet. Use the form above to add items.
        </div>

        <!-- Lines -->
        <div v-for="(line, idx) in orderLines" :key="idx"
          class="hidden md:grid px-6 py-3.5 border-t border-black/10 items-center text-sm"
          style="grid-template-columns:2fr 1fr 1fr 1fr 1fr 1fr 1fr 0.6fr;">
          <div>
            <div class="font-semibold text-black">{{ line.itemDescription }}</div>
            <div class="text-xs" style="color:rgba(0,0,0,0.4);">{{ line.itemCode }}</div>
          </div>
          <div class="text-right">{{ line.qty }}</div>
          <div class="text-right">{{ fmtNum(line.sellingPrice) }}</div>
          <div class="text-right">{{ line.discount }}{{ line.isDiscountInPercent ? '%' : ' LKR' }}</div>
          <div class="text-right">{{ fmtNum(line.totalTax) }}</div>
          <div class="text-right">{{ fmtNum(line.lineSubTotal) }}</div>
          <div class="text-right font-extrabold">{{ fmtNum(line.lineTotal) }}</div>
          <div class="flex justify-end">
            <button @click="removeLine(idx)"
              class="w-7 h-7 flex items-center justify-center rounded-lg transition hover:bg-red-50"
              style="color:#991b1b;">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile lines -->
        <div v-for="(line, idx) in orderLines" :key="'m'+idx"
          class="md:hidden px-4 py-4 border-t border-black/10">
          <div class="flex justify-between items-start mb-2">
            <div>
              <div class="font-semibold text-black text-sm">{{ line.itemDescription }}</div>
              <div class="text-xs" style="color:rgba(0,0,0,0.4);">{{ line.itemCode }} · Qty: {{ line.qty }}</div>
            </div>
            <button @click="removeLine(idx)" class="text-red-600 p-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="flex justify-between text-xs" style="color:rgba(0,0,0,0.5);">
            <span>Sub: {{ fmtNum(line.lineSubTotal) }}</span>
            <span>Tax: {{ fmtNum(line.totalTax) }}</span>
            <span class="font-bold text-black">Total: {{ fmtNum(line.lineTotal) }}</span>
          </div>
        </div>
      </div>

      <!-- ── Order Summary ──────────────────────────────────────── -->
      <div class="rounded-3xl border border-black/10 shadow-sm p-6 mb-6">
        <div class="font-extrabold text-black text-base mb-4">Order Summary</div>
        <div class="flex justify-end">
          <div class="w-full md:w-72">
            <div class="flex justify-between py-2 border-b border-black/10 text-sm">
              <span style="color:rgba(0,0,0,0.5);">Sub Total</span>
              <span class="font-semibold">{{ fmtNum(summary.subTotal) }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-black/10 text-sm">
              <span style="color:rgba(0,0,0,0.5);">Tax Total</span>
              <span class="font-semibold">{{ fmtNum(summary.taxTotal) }}</span>
            </div>
            <div class="flex justify-between py-3 text-base">
              <span class="font-extrabold">Net Total</span>
              <span class="font-extrabold text-xl">{{ fmtNum(summary.netTotal) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Bottom Buttons ────────────────────────────────────── -->
      <div class="flex justify-end gap-3">
        <button @click="$router.push('/qbook/salesOrders')"
          class="px-6 py-2.5 rounded-xl border text-sm font-semibold hover:bg-black/5"
          style="border-color:rgba(0,0,0,0.15); color:#0B1220;">
          Back to Orders
        </button>
        <button @click="submitOrder('Draft')"
          class="px-6 py-2.5 rounded-xl border text-sm font-semibold hover:bg-black/5"
          style="border-color:rgba(0,0,0,0.2); color:#0B1220;">
          Save Draft
        </button>
        <button @click="submitOrder('Confirmed')"
          class="px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-85"
          style="background:#C7EA2F; color:#0B1220;">
          Confirm Order
        </button>
      </div>

    </div>
  </section>
</template>

<script>
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';
import axios from 'axios';

export default {
  data() {
    return {
      qbookStore: null,

      // Order header
      form: {
        orderNo:              '',
        orderDate:            '',
        expectedDeliveryDate: '',
        partnerId:            '',
        memo:                 '',
      },

      // Current line being built
      lineForm: {
        itemId:              '',
        qty:                 1,
        discount:            0,
        isDiscountInPercent: true,
      },

      // Result from GetCalcSalesOrderLineTotal
      calcResult: null,

      // Committed order lines (with full calc data)
      orderLines: [],

      // Master data (loaded from init API)
      customers: [],
      items:     [],
    };
  },

  computed: {
    summary() {
      const subTotal = this.orderLines.reduce((s, l) => s + (l.lineSubTotal || 0), 0);
      const taxTotal = this.orderLines.reduce((s, l) => s + (l.totalTax    || 0), 0);
      return { subTotal, taxTotal, netTotal: subTotal + taxTotal };
    },
  },

  methods: {
    fmtNum(val) {
      if (val === null || val === undefined) return '0.00';
      return Number(val).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    // ── Step 1: Calculate a line (preview before adding) ───────
    async calculateLine() {
      if (!this.lineForm.itemId || this.lineForm.qty < 1) {
        this.$showToast('Please select an item and enter quantity.', 'error');
        return;
      }
      const loader = this.$QbookshowLoading('');
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/QBSales/Order/GetCalcSalesOrderLineTotal`,
          {
            itemId:              this.lineForm.itemId,
            discount:            this.lineForm.discount,
            isDiscountInPercent: this.lineForm.isDiscountInPercent,
            qty:                 this.lineForm.qty,
          }
        );
        loader.close();
        if (res.data.isSuccess) {
          this.calcResult = res.data.data.data;
        } else {
          this.$showToast(res.data.message, 'error');
        }
      } catch (e) {
        loader.close();
        this.$showToast(e.message || 'Calculation failed.', 'error');
      }
    },

    // ── Step 2: Add the calculated line to the list ─────────────
    async addLine() {
      if (!this.lineForm.itemId || this.lineForm.qty < 1) {
        this.$showToast('Please select an item and enter quantity.', 'error');
        return;
      }
      // Auto-calculate if not done yet
      if (!this.calcResult) {
        await this.calculateLine();
        if (!this.calcResult) return;
      }
      // Push to lines with both form data + calc result
      this.orderLines.push({
        ...this.calcResult,
        itemId:              this.lineForm.itemId,
        qty:                 this.lineForm.qty,
        discount:            this.lineForm.discount,
        isDiscountInPercent: this.lineForm.isDiscountInPercent,
      });
      // Reset line form
      this.lineForm  = { itemId: '', qty: 1, discount: 0, isDiscountInPercent: true };
      this.calcResult = null;
    },

    removeLine(idx) {
      this.orderLines.splice(idx, 1);
    },

    // ── Step 3: Submit the full order ───────────────────────────
    async submitOrder(status) {
      if (!this.form.partnerId) {
        this.$showToast('Please select a customer.', 'error');
        return;
      }
      if (this.orderLines.length === 0) {
        this.$showToast('Please add at least one item.', 'error');
        return;
      }

      const loader = this.$QbookshowLoading('');
      try {
        const formData = new FormData();
        formData.append('orderNo',              this.form.orderNo);
        formData.append('orderDate',            this.form.orderDate);
        formData.append('partnerId',            this.form.partnerId);
        formData.append('memo',                 this.form.memo);
        formData.append('expectedDeliveryDate', this.form.expectedDeliveryDate);
        formData.append('status',               status);
        // Lines as JSON string
        formData.append('lines', JSON.stringify(
          this.orderLines.map(l => ({
            itemId:              l.itemId,
            qty:                 l.qty,
            discount:            l.discount,
            isDiscountInPercent: l.isDiscountInPercent,
          }))
        ));

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/QBSales/Order/SetSalesOrderAsync`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        loader.close();

        if (res.data.isSuccess) {
          this.$showToast(res.data.message || 'Order created!', 'success');
          const orderNo = res.data.data?.data?.orderNo;
          if (orderNo) {
            this.$router.push(`/qbook/salesOrders/${orderNo}`);
          } else {
            this.$router.push('/qbook/salesOrders');
          }
        } else {
          this.$showToast(res.data.message, 'error');
        }
      } catch (e) {
        loader.close();
        this.$showToast(e.message || 'Failed to create order.', 'error');
      }
    },

    // ── Load customers & items from init API ────────────────────
    async loadInit() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/QBSales/Order/GetSalesOrderInitAsync`
        );
        if (res.data.isSuccess) {
          this.customers = res.data.data.data.listCustomers  || [];
          this.items     = res.data.data.data.listItems      || [];
        }
      } catch (e) {
        console.warn('Init API not ready, dropdowns will be empty.', e.message);
      }
    },
  },

  created() {
    this.qbookStore = useQbookStore();
  },

  async mounted() {
    // Set today as default order date
    const today = new Date().toISOString().split('T')[0];
    this.form.orderDate = today;
    await this.loadInit();
  },

  head() { return { title: 'New Sales Order – QBook' }; },
};
</script>