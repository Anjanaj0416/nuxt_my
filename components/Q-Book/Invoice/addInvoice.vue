<template>
    <div class="modal-overlay" v-if="isOpen">
      <div class="modal slide-modal">
        <div class="modal-header">
          <h2 class="modal-title">Add Invoice</h2>
          <button
            @click="closeModal"
            class="bg-white rounded-full p-2 hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <div class="bg-white rounded-xl border border-gray-200 p-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">
                  Partner
                </label>
                <select
                  v-model="PartnerId"
                  class="w-full rounded-lg border border-gray-300 bg-white
                        text-sm text-gray-700 px-4 py-2
                        focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/20"
                  @input="clearErrorOnInput('PartnerId')"
                >
                <option disabled value="">Select Partner</option>
                  <option
                    v-for="(cus, index) in qbookStore.listCustomers"
                    :key="index"
                    :value="cus.id"
                  >
                    {{ cus.value }}
                  </option>
                </select>
                <p v-if="err.PartnerId" class="mt-2 text-sm text-red-600">
                  {{ err.PartnerId }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">
                  Invoice No
                </label>
                <input
                  type="text"
                  v-model="InvoiceNo"
                  placeholder="INV-000123"
                  @input="clearErrorOnInput('InvoiceNo')"
                  readonly
                  class="w-full rounded-lg border border-gray-300 bg-gray-100
                    text-sm text-gray-700 px-4 py-2 "
                />
                <p v-if="err.InvoiceNo" class="mt-2 text-sm text-red-600">
                  {{ err.InvoiceNo }}
                </p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">
                  Terms
                </label>
                <input
                  type="text"
                  v-model="Terms"
                  placeholder="Net 30"
                  @input="clearErrorOnInput('Terms')"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 px-3 text-sm
                        focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/20"
                />
                <p v-if="err.Terms" class="mt-2 text-sm text-red-600">
                  {{ err.Terms }}
                </p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">
                  Invoice Date
                </label>
                <calendar
                  class="mt-1"
                  primaryColor="#bbd151"       
                  primaryLight="#c9de66"
                  @update="onInvoiceDateChange"
                />
                <p v-if="err.InvoiceDate" class="mt-2 text-sm text-red-600">
                  {{ err.InvoiceDate }}
                </p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">
                  Due Date
                </label>
                <calendar
                  class="mt-1"
                  primaryColor="#bbd151"       
                  primaryLight="#c9de66"
                  @update="onDueDateChange"
                />
                <p v-if="err.DueDate" class="mt-2 text-sm text-red-600">
                  {{ err.DueDate }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white mt-16 ">
            <div class="overflow-x-auto max-h-[400px] rounded-xl">
              <table class="w-full text-sm text-left border-collapse">
                <thead class="sticky top-0  z-10">
                  <tr class="text-gray-600 text-xs uppercase tracking-wide">
                    <th class="px-4 py-3">Product / Service</th>
                    <th class="px-4 py-3 text-right">Unit Price</th>
                    <th class="px-4 py-3 text-center">Qty</th>
                    <th class="px-4 py-3 text-center">Discount</th>
                    <th class="px-4 py-3 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b transition duration-200"
                  >
                    <td class="px-4 py-3">
                      <select
                        v-model="product"
                        @change="onProductAdd"
                        class="w-full rounded-xl border border-gray-300 bg-white
                              text-sm px-3 py-2 shadow-sm
                              focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/30"
                      >
                        <option disabled value="">Select product</option>
                        <option
                          v-for="(cus, index) in qbookStore.listItemDetails"
                          :key="index"
                          :value="cus.id"
                        >
                          {{ cus.itemName }}
                        </option>
                      </select>
                    </td>
                    <td class="px-4 py-3 text-right font-semibold text-gray-700">
                      Rs. {{ unitPrice }}
                    </td>
                    <td class="px-4 py-3 text-center">
                      <input
                        type="number"
                        min="1"
                        v-model.number="qty"
                        class="w-20 px-3 py-2 text-sm text-center rounded-xl border shadow-sm
                              focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/30"
                      />
                    </td>
                    <td class="px-4 py-3 text-center">
                      <div class="flex justify-center">
                        <div class="flex items-center rounded-xl border shadow-sm overflow-hidden">
                          <input
                            v-if="discountType === 'percentage'"
                            type="number"
                            min="0"
                            max="100"
                            v-model.number="discount"
                            placeholder="0%"
                            class="w-24 px-3 py-2 text-sm text-center outline-none
                                  focus:ring-2 focus:ring-[#2ca01c]/30"
                          />
                          <input
                            v-else
                            type="number"
                            min="0"
                            v-model.number="discount"
                            placeholder="Rs 0.00"
                            class="w-24 px-3 py-2 text-sm text-center outline-none
                                  focus:ring-2 focus:ring-[#2ca01c]/30"
                          />
                          <div class="flex">
                            <button
                              type="button"
                              @click="toggleDiscountType"
                              class="px-4 py-2 text-xs font-semibold bg-[#bbd151] text-white transition"
                            >
                              {{ discountType === "percentage" ? "%" : "LKR" }}
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-center">
                      <button
                        @click="SetCalculate"
                        class="px-12 py-2 text-xs bg-[#bbd151] font-semibold text-gray-600 rounded-lg shadow"
                      >
                        + Add Item
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-white  shadow-sm mt-8 overflow-hidden">
            <div class="overflow-x-auto max-h-[420px]">
              <table class="w-full text-sm text-left">
                <thead class="sticky top-0 bg-gray-50 z-10">
                  <tr class="text-gray-600 text-xs uppercase tracking-wide">
                    <th class="px-5 py-4">Product</th>
                    <th class="px-5 py-4">Code</th>
                    <th class="px-5 py-4">Description</th>
                    <th class="px-5 py-4 text-right">Price</th>
                    <th class="px-5 py-4 text-center">Qty</th>
                    <th class="px-5 py-4 text-center">Discount</th>
                    <th class="px-5 py-4 text-center">Taxes</th>
                    <th class="px-5 py-4 text-right">Tax Total</th>
                    <th class="px-5 py-4 text-right font-semibold">Line Total</th>
                    <th class="px-5 py-4 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!CalculateInvoiceList.length">
                    <td colspan="10" class="py-10 text-center text-gray-400">
                      🧾 No invoice items added yet. Start by selecting a product above.
                    </td>
                  </tr>
                  <tr
                    v-for="(row, index) in CalculateInvoiceList"
                    :key="index"
                    class="border-b transition duration-200"
                  >
                    <td class="px-5 py-4  text-sm text-gray-800">
                      {{ row.itemCode || "-" }}
                    </td>
                    <td class="px-5 py-4 text-gray-500">
                      {{ row.itemCode || "-" }}
                    </td>
                    <td class="px-5 py-4 text-gray-500">
                      {{ row.itemDescription || "No description" }}
                    </td>
                    <td class="px-5 py-4 text-sm text-right">
                      Rs {{ row.sellingPrice?.toFixed(2) || "0.00" }}
                    </td>
                    <td class="px-5 py-4 text-center">
                      <span
                        class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold"
                      >
                        {{ row.qty || 0 }}
                      </span>
                    </td>
                    <td class="px-5 py-4 text-center">
                      <span class="font-medium text-sm">
                        Rs {{ row.discount || 0 }}
                      </span>
                    </td>
                    <td class="px-5 py-4 text-center">
                      <div
                        v-if="row.listTaxComponentTotalDetails?.length"
                        class="flex flex-wrap justify-center gap-2"
                      >
                        <span
                          v-for="(tax, tIndex) in row.listTaxComponentTotalDetails"
                          :key="tIndex"
                          class="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium"
                        >
                          {{ tax.taxName }} • Rs {{ tax.taxAmount }}
                        </span>
                      </div>
                      <span v-else class="text-gray-400 text-xs">
                        No Tax
                      </span>
                    </td>
                    <td class="px-5 py-4 text-right text-gray-700 font-medium">
                      Rs {{ row.totalTax?.toFixed(2) || "0.00" }}
                    </td>
                    <td class="px-5 py-4 text-right font-bold text-green-600">
                      Rs {{ row.lineTotal?.toFixed(2) || "0.00" }}
                    </td>
                    <td class="px-5 py-4 text-center">
                      <button 
                        @click="removeRow(index)" 
                        class="text-black hover:text-red-700" title="Delete Row" 
                      > 
                        <svg xmlns="http://www.w3.org/2000/svg" 
                          class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a1 1 0 011-1h4a1 1 0 011 1v2" /> 
                        </svg> 
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex justify-between items-center px-6 py-2 bg-white">
              <div class="flex flex-wrap gap-2 mb-52">
                <button
                  v-if="CalculateInvoiceList.length > 0"
                  @click="clearAll"
                  class="flex items-center gap-2 px-4 py-2 text-xs font-semibold
                        text-red-600 bg-red-50 rounded-xl
                        hover:bg-red-100 transition"
                >
                  🗑 Clear All Lines
                </button>
              </div>

              <div
                class="w-full max-w-sm ml-auto bg-white 0  p-5 space-y-5"
              >
                <!-- <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Invoice Summary
                </h3> -->
                <div class="flex justify-between items-center text-sm">
                  <span class="text-gray-500">Gross Total</span>
                  <span class="font-semibold text-gray-900">
                    Rs {{ grossTotal.toFixed(2) }}
                  </span>
                </div>

                <hr class="border-gray-200" />
                <div class="space-y-2">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-500">Discount</span>
                    <span class="font-medium text-gray-900">
                      - Rs {{ invoiceDiscountValue.toFixed(2) }}
                    </span>
                  </div>

                  <div
                    class="flex items-center rounded-xl border border-gray-300 overflow-hidden shadow-sm"
                  >
                    <input
                      type="number"
                      min="0"
                      v-model.number="invoiceDiscount"
                      placeholder="0"
                      class="w-full px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2ca01c]/30"
                    />

                    <!-- Toggle Buttons -->
                    <div class="flex">
                      <button
                        type="button"
                        @click="invoiceDiscountType = 'lkr'"
                        class="px-3 py-2 text-xs font-semibold transition"
                        :class="
                          invoiceDiscountType === 'lkr'
                            ? 'bg-[#2ca01c] text-white'
                            : 'bg-gray-100 text-gray-600'
                        "
                      >
                        LKR
                      </button>

                      <button
                        type="button"
                        @click="invoiceDiscountType = 'percentage'"
                        class="px-3 py-2 text-xs font-semibold transition"
                        :class="
                          invoiceDiscountType === 'percentage'
                            ? 'bg-[#2ca01c] text-white'
                            : 'bg-gray-100 text-gray-600'
                        "
                      >
                        %
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Divider -->
                <hr class="border-gray-200" />

                <!-- ✅ Taxes -->
                <div class="space-y-2">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-500">Taxes</span>
                    <span class="font-medium text-gray-900">
                      Rs {{ totalTax.toFixed(2) }}
                    </span>
                  </div>

                  <!-- Tax Breakdown -->
                  <div
                    v-if="groupedTaxes.length"
                    class="bg-gray-50 rounded-xl p-3 space-y-1 text-xs"
                  >
                    <div
                      v-for="(tax, index) in groupedTaxes"
                      :key="index"
                      class="flex justify-between text-gray-700"
                    >
                      <span>{{ tax.taxName }}</span>
                      <span class="font-medium">
                        Rs {{ tax.taxAmount.toFixed(2) }}
                      </span>
                    </div>
                  </div>

                  <p v-else class="text-xs text-gray-400">
                    No taxes applied
                  </p>
                </div>

                <!-- Divider -->
                <hr class="border-gray-200" />

                <!-- ✅ Net Total Highlight -->
                <div
                  class="flex justify-between items-center bg-[#2ca01c]/10 rounded-xl px-4 py-3"
                >
                  <span class="text-sm font-semibold text-gray-700">
                    Net Total
                  </span>

                  <span class="text-lg font-bold text-[#2ca01c]">
                    Rs {{ netTotal.toFixed(2) }}
                  </span>
                </div>
              </div>


            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">
                Memo
              </label>
              <textarea
                rows="5"
                placeholder="Net 30"
                v-model="Memo"
                class="w-full px-4 py-2 rounded-lg border text-sm outline-none
                      focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/20"
              ></textarea>
              <p v-if="err.Memo" class="mt-2 text-sm text-red-600">
                  {{ err.Memo }}
                </p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">
                Attachment
              </label>
              <imagepickermultiple
                @GetSelectedImages="handleSelectedImages"
                ref="refApprovedImg"
                accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                @input="clearErrorOnInput('listFiles')"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 mt-8 gap-3">
            <div>
            </div>
            <div class="flex justify-end items-center">
              <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  v-model="IsDraft"
                  class="w-5 h-5 accent-green-600 cursor-pointer"
                />
                Save as Draft
              </label>
            </div>
          </div>

        </div>

        <div class="modal-footer flex justify-between items-center px-6 py-4 border-t bg-gray-50">
          <button
            @click="closeModal"
            class="px-10 py-2 text-xs font-semibold bg-white text-gray-600
                  rounded-lg shadow hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <div class="flex gap-3">
            <button
              @click="printInvoice"
              class="px-10 py-2 text-xs font-semibold bg-blue-100 text-blue-700
                    rounded-lg shadow hover:bg-blue-200 transition"
            >
              🖨 Print
            </button>
            <button
              @click="SetInstallment"
              class="px-10 py-2 text-xs font-semibold bg-[#bbd151] text-gray-700
                    rounded-lg shadow hover:bg-[#a9c83f] transition"
            >
              💾 Save
            </button>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import { useUserStore } from '~/stores/modules/userStore';
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';
import closebtn from "~/components/customcontrol/modal_close_button";
import calendar from "~/components/customcontrol/calendar.vue";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";


definePageMeta({
  layout: "qbooklogin",
  middleware: 'auth-ebook',
});
export default {
  components: { closebtn,calendar,imagepickermultiple },
  data() {
    return {
      isOpen: true,
      imageroot: "",
      QbookshowLoading: null,
      showAlert: null,
      InvoiceNo:'',
      InvoiceDate: '',
      DueDate: '',
      PartnerId:'',
      product: '',
      description: '',
      qty: 1,
      unitPrice: 0,
      discount: 0,
      invoiceDiscount: 0,
      invoiceDiscountType: 'percentage',
      isDiscountInPercent: false,
      CalculateInvoiceList: [],
      IsDraft: false,
      taxRate: 0,
      rows: [
        this.newRow(),
      ],
      err: {
        InvoiceNo:'',
        InvoiceDate: '',
        DueDate: '',
        PartnerId:'',
      }
    };
  },
  computed: {
    invoiceLines() {
      const saved = localStorage.getItem("InvoiceLines");
      return saved ? JSON.parse(saved) : [];
    },

    // ✅ Gross Total (Sum of all Line Totals)
    grossTotal() {
      return this.CalculateInvoiceList.reduce((sum, row) => {
        return sum + (row.lineTotal || 0);
      }, 0);
    },

    // ✅ Invoice Discount Value (LKR or %)
    invoiceDiscountValue() {
      if (this.invoiceDiscountType === "percentage") {
        return (this.grossTotal * this.invoiceDiscount) / 100;
      }
      return this.invoiceDiscount;
    },

    // ✅ Total Tax (Sum of all taxes from all products)
    totalTax() {
      return this.CalculateInvoiceList.reduce((sum, row) => {
        return sum + (row.totalTax || 0);
      }, 0);
    },

    // ✅ Net Total = Gross - Discount + Tax
    netTotal() {
      return (this.grossTotal - this.invoiceDiscountValue) + this.totalTax;
    },

    // ✅ Group All Tax Types (NBT, VAT...) Across All Products
    groupedTaxes() {
      const taxMap = {};

      this.CalculateInvoiceList.forEach(row => {
        if (row.listTaxComponentTotalDetails?.length) {

          row.listTaxComponentTotalDetails.forEach(tax => {

            if (!taxMap[tax.taxName]) {
              taxMap[tax.taxName] = 0;
            }

            taxMap[tax.taxName] += tax.taxAmount;
          });
        }
      });

      // Convert object → array for template display
      return Object.entries(taxMap).map(([name, amount]) => ({
        taxName: name,
        taxAmount: amount
      }));
    }
  },
  async created() {
    this.QbookshowLoading = this.$QbookshowLoading;
    this.userStore = useUserStore();
    this.qbookStore = useQbookStore(),

    await this.qbookStore.loadInitInvoice();
    await this.qbookStore.nextInvoiceNo();
    this.listCustomers = this.qbookStore.listCustomers;
    this.InvoiceNo = this.qbookStore.InvoiceNumber;

    // Load saved lines from localStorage
    const savedLines = localStorage.getItem("InvoiceLines");
    if (savedLines) {
      const lines = JSON.parse(savedLines);
      this.qbookStore.CalculateInvoiceList = lines;
    }

  },
  mounted() {
    const saved = localStorage.getItem("invoiceItems");

    if (saved) {
      this.CalculateInvoiceList = JSON.parse(saved);
    };
    
  },

  methods: {
    newRow() {
      return {
        product: '',
        itemCode: '',
        description: '',
        qty: 1,
        unitPrice: 0,
        discount: 0,
        discountType: 'percentage'
      }
    },

    onInvoiceDateChange(date) {
      console.log(date);
      
      this.InvoiceDate = date;
      this.clearErrorOnInput('InvoiceDate'); 
    },

    onDueDateChange(date) {
      this.DueDate = date;
      this.clearErrorOnInput('DueDate'); 
    },

    removeRow(index) {
      this.CalculateInvoiceList.splice(index, 1);

      localStorage.setItem(
        "invoiceItems",
        JSON.stringify(this.CalculateInvoiceList)
      );
    },

    async clearAll() {
      const confirmed = await this.$showConfirmbqbook(
        "Are you sure you want to clear all invoice lines?",
        "You have entered data. If you clear now, it will be lost."
      );
      if (!confirmed) return;
      this.CalculateInvoiceList = [];
      localStorage.removeItem("invoiceItems");
      this.$showSuccessbqbook("Invoice lines cleared successfully!");
    },

    onProductAdd() {
      const item = this.qbookStore.listItemDetails.find(
        i => i.id === this.product
      );
      console.log(item);
      if (item) {
        this.unitPrice = item.itemPrice;
        this.description = item.description;
        this.discount = item.discount || 0;
        this.discountType = item.isDiscountInPercent? "percentage": "lkr";
      }
    },

    onDiscountTypeChange(row) {
      row.discount = 0
    },

    handleSelectedImages(files) {
      console.log("Selected Files in Parent:", files);
      this.listFiles = files;
    },

    animateClose() {
      const modal = document.querySelector(".modal");
      modal.classList.add("slide-out");

      setTimeout(() => {
        this.isOpen = false;
        this.$emit("close");
      }, 300);
    },

    hasFormData() {
      if (
        this.PartnerId?.trim() ||
        // this.InvoiceNo?.trim() ||
        this.Terms?.trim() ||
        this.Memo?.trim()
      ) {
        return true;
      }
      if (this.InvoiceDate || this.DueDate) {
        return true;
      }
      if (
        Array.isArray(this.CalculateInvoiceList) &&
        this.CalculateInvoiceList.length > 0
      ) {
        return true;
      }
      if (Array.isArray(this.listFiles) && this.listFiles.length > 0) {
        return true;
      }
      return false;
    },

    async closeModal() {
      if (!this.hasFormData()) {
        this.animateClose();
        return;
      }
      const confirmed = await this.$showConfirmbqbook(
        "Leave without saving?",
        "You have entered data. If you close now, it will be lost.",
      );

      if (confirmed.isConfirmed) {
        this.animateClose();
      }
    },

    closeModalAfterSubmit() {
      this.isOpen = false;
      this.$emit("close");
    },

    async SetCalculate() {
      const req = {
        ItemId: this.product,
        Qty: this.qty,
        Discount: this.discount,
        IsDiscountInPercent: this.discountType === "percentage"
      };
      await this.qbookStore.setCalculateLine(req, this.QbookshowLoading);

      // Get the calculated line object
      const newItem = this.qbookStore.CalculateInvoiceList;
      // ✅ Add Qty + Discount info also
      // newItem.qty = this.qty;
      // newItem.discount = this.discount;
      // ✅ Push into local array
      this.CalculateInvoiceList.push(newItem);
      // ✅ Save to LocalStorage
      localStorage.setItem(
        "invoiceItems",
        JSON.stringify(this.CalculateInvoiceList)
      );

      // Reset Inputs
      this.product = "";
      this.qty = 1;
      this.discount = 0;
      this.unitPrice = 0;
    },

    ///////////////////////////////

    async SetInstallment() {
      if (!this.IsValidate()) return;

      const confirmed = await this.$showConfirmbqbook(
        "Are you sure to Save this Invoice?",
        null,
        "warning"
      );

      if (!confirmed.isConfirmed) return;

      const formData = new FormData();
      formData.append("PartnerId", this.PartnerId || "");
      formData.append("InvoiceNo", this.InvoiceNo || "");
      formData.append("InvoiceDate", this.InvoiceDate || "");
      formData.append("DueDate", this.DueDate || "");
      formData.append("Terms", this.Terms || "");
      formData.append("Memo", this.Memo || "");

      this.CalculateInvoiceList.forEach((row, index) => {
        formData.append(`Lines[${index}].ItemId`, row.itemId || "");
        formData.append(`Lines[${index}].Code`, row.code || "");
        formData.append(`Lines[${index}].ItemDescription`, row.itemDescription || "");
        formData.append(`Lines[${index}].Qty`, row.qty || 1);
        formData.append(`Lines[${index}].DiscountAmount`, row.discount || 0);
        formData.append(`Lines[${index}].UnitPrice`,row.sellingPrice || 0);
        formData.append(`Lines[${index}].LineSubTotal`,row.lineSubTotal || 0);
        formData.append(`Lines[${index}].LineTotal`,row.lineTotal || 0);
        formData.append(`Lines[${index}].TaxTotal`,row.totalTax || 0);
      });

      formData.append("DiscountAmount", this.invoiceDiscount)
      formData.append("IsDiscountInPercent",this.invoiceDiscountType === 'percentage')
      formData.append("IsDraft", this.IsDraft ? "true" : "false");

      if (this.listFiles && this.listFiles.length > 0) {
        this.listFiles.forEach((file, index) => {
          formData.append(`listAttachment[${index}]`, file);
        });
      }


      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }



      this.closeModalAfterSubmit();
    },

    // cancel() {
    //   this.closeModal();
    // },

    IsValidate() {
      this.clearErr();
      let isValid = true;

      if (!this.PartnerId) {
        this.err.PartnerId = "Please select Partner";
        isValid = false;
      }

      if (!this.InvoiceNo) {
        this.err.InvoiceNo = "Please enter Invoice No";
        isValid = false;
      }

      if (!this.Terms) {
        this.err.Terms = "Please select Terms";
        isValid = false;
      }

      if (!this.InvoiceDate) {
        this.err.InvoiceDate = "Please select Invoice Date";
        isValid = false;
      }

      if (!this.DueDate) {
        this.err.DueDate = "Please select Due Date";
        isValid = false;
      }

      return isValid;
    },

    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
    },

    clearErr() {
      Object.keys(this.err).forEach(key => {
        this.err[key] = "";
      });
    },


  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  overflow: hidden;
}

/* Slide-in modal */
.modal {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 80%;
  max-width: 1600px;
  background: white;
  border-radius: 1rem 0 0 1rem;
  display: flex;
  flex-direction: column;

  /* Animation */
  transform: translateX(100%);
  animation: slideIn 0.35s ease forwards;
}

/* Slide in animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Slide out animation */
.modal.slide-out {
  animation: slideOut 0.3s ease forwards;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* Header */
.modal-header {
  background: #bbd151;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Content */
.modal-content {
  padding: 20px;
  max-height: 80%;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.cancel-button {
  background: #e4e4e4;
  color: #333;
}

.confirm-button {
  background: #0b2145;
  color: white;
}

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none;
  }

  .modal-footer {
    position: sticky;
    bottom: 0;
    padding: 10px;
  }
}
</style>