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
                  class="w-full rounded-lg border border-gray-300 bg-white
                        text-sm text-gray-700 px-4 py-2
                        focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/20"
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

          <div class="bg-white  shadow-sm mt-8 overflow-x-auto">
            <table class="w-full text-sm text-left">
              <thead class="">
                <tr class="text-gray-700">
                  <th class="px-4 py-3 text-sm font-medium">Product / Service</th>
                  <th class="px-4 py-3 font-medium">Item Code</th>
                  <th class="px-4 py-3 font-medium">Description</th>
                  <th class="px-4 py-3 font-medium text-center">Qty</th>
                  <th class="px-4 py-3 font-medium text-right">Unit Price</th>
                  <th class="px-4 py-3 font-medium text-center">Discount</th>
                  <th class="px-4 py-3 font-medium text-right">Total</th>
                  <th class="px-4 py-3"></th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(row, index) in rows"
                  :key="index"
                  class="border-b hover:bg-white"
                >
                  <td class="px-4 py-2">
                    <select
                      v-model="row.product"
                      @change="onProductChange(row)"
                      class="w-full rounded-lg border border-gray-300 bg-white
                            text-xs text-gray-700 px-2 py-1
                            focus:border-[#2ca01c] focus:ring-1 focus:ring-[#2ca01c]/20"
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
                  <td class="px-4 py-2">
                    <p class="text-sm">{{ row.itemCode || '-'}} </p>
                  </td>
                  <td class="px-4 py-2">
                    <p class="text-sm">{{ row.description || '-'}}</p>
                  </td>
                  <td class="px-2 py-1 text-center">
                    <input
                      type="number"
                      min="1"
                      v-model.number="row.qty"
                      class="w-16 px-2 py-1 text-xs text-center rounded border outline-none
                            focus:border-[#2ca01c] focus:ring-1 focus:ring-[#2ca01c]/20"
                    />
                  </td>

                  <td class="px-4 py-2">
                    <p class="text-sm">{{ row.unitPrice }}</p>
                  </td>

                  <td class="px-2 py-1">
                    <div class="flex items-center justify-center">
                      <div class="flex border rounded-lg overflow-hidden bg-white shadow-sm text-xs">
                        <!-- Discount Input -->
                        <input
                          type="number"
                          min="0"
                          v-model.number="row.discount"
                          :placeholder="row.discountType === 'lkr' ? 'Rs 0.00' : '0%'"
                          class="w-24 px-2 py-1 text-xs text-center outline-none focus:ring-1 focus:ring-[#2ca01c]/20"
                        />

                        <!-- LKR / % Toggle -->
                        <div class="flex border-l">
                          <label
                            class="flex items-center justify-center px-2 cursor-pointer transition"
                            :class="row.discountType === 'lkr'
                              ? 'bg-[#2ca01c] text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100'"
                          >
                            <input
                              type="radio"
                              value="lkr"
                              v-model="row.discountType"
                              @change="onDiscountTypeChange(row)"
                              class="hidden"
                            />
                            LKR
                          </label>

                          <label
                            class="flex items-center justify-center px-2 cursor-pointer transition border-l"
                            :class="row.discountType === 'percentage'
                              ? 'bg-[#2ca01c] text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100'"
                          >
                            <input
                              type="radio"
                              value="percentage"
                              v-model="row.discountType"
                              @change="onDiscountTypeChange(row)"
                              class="hidden"
                            />
                            %
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="px-4 py-2 text-right font-semibold">
                    {{ lineTotal(row).toFixed(2) }}
                  </td>

                  <td class="px-4 py-2 text-center">
                    <button
                      @click="removeRow(index)"
                      class="text-black hover:text-red-700"
                      title="Delete Row"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-6 0V5a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Footer -->
            <div class="flex justify-between items-center px-6 py-2 bg-white">
              <div class="space-x-4">
                <button
                  @click="addRow"
                  class="text-gray-700 bg-gray-100 text-sm rounded-lg text-xs px-3 py-1.5"
                >
                  + Add line
                </button>

                <button
                  @click="clearAll"
                  class="text-gray-700 bg-gray-100 text-sm rounded-lg text-xs px-3 py-1.5"
                >
                  Clear All Line
                </button>
              </div>

              <div class="text-right space-y-1">
                <div class="text-lg font-semibold">
                  <span class="text-sm text-gray-600">Subtotal :</span> {{ subtotal.toFixed(2) }}
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
        </div>

        <div class="modal-footer">
          <button @click="closeModal"
              class="px-12 py-2 text-xs font-semibold bg-white text-gray-600 rounded-lg shadow">
              Cancel
          </button>
          <button
              @click="SetInstallment" 
              class="px-12 py-2 text-xs bg-[#bbd151] font-semibold text-gray-600 rounded-lg shadow">
              Save 
          </button>
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
      showLoading: null,
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
    subtotal() {
      return this.rows.reduce((sum, row) => sum + this.lineTotal(row), 0)
    }
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.userStore = useUserStore();
    this.qbookStore = useQbookStore(),

    await this.qbookStore.loadInitInvoice();
    this.listCustomers = this.qbookStore.listCustomers

  },
  mounted() {
    // this.$refs.refCity.initItem(this.curLead.city);
    // this.$refs.refDistrict.initItem(this.curLead.district);
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

    addRow() {
      this.rows.push(this.newRow())
    },

    removeRow(index) {
      this.rows.splice(index, 1)
    },

    clearAll() {
      this.rows = []
    },

    onProductChange(row) {
      const item = this.qbookStore.listItemDetails.find(i => i.id === row.product)
      if (item) {
        row.itemCode = item.itemCode || ''
        row.description = item.description || ''
        row.unitPrice = item.itemPrice || 0
        row.discount = item.discount || 0
        row.discountType = item.isDiscountInPercent ? 'percentage' : 'lkr'
      } else {
        row.unitPrice = 0
        row.discount = 0
        row.discountType = 'percentage'
      }
    },

    onDiscountTypeChange(row) {
      row.discount = 0
    },

    lineTotal(row) {
      const base = row.qty * row.unitPrice
      let discountAmount = 0
      if (row.discountType === 'percentage') {
        discountAmount = base * (row.discount / 100)
      } else if (row.discountType === 'lkr') {
        discountAmount = row.discount
      }
      return Math.max(base - discountAmount, 0)
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
        this.InvoiceNo?.trim() ||
        this.Terms?.trim() ||
        this.Memo?.trim()
      ) {
        return true;
      }
      if (this.InvoiceDate || this.DueDate) {
        return true;
      }
      if (
        this.rows.some(row =>
          row.product ||
          row.qty !== 1 ||
          row.unitPrice !== 0 ||
          row.discount !== 0
        )
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

    async SetInstallment() {
      if (!this.IsValidate()) return;

      const confirmed = await this.$showConfirmbqbook(
        "Are you sure to Save this Invoice?",
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

      this.rows.forEach((row, index) => {
        formData.append(`Lines[${index}].ItemId`, row.product || "");
        formData.append(`Lines[${index}].Qty`, row.qty || 0);
      });

      if (this.listFiles && this.listFiles.length > 0) {
        this.listFiles.forEach(file => {
          formData.append("listAttachment", file);
        });
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await this.qbookStore.getInvoice(formData, this.showLoading);

      this.closeModal();
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
  max-width: 1200px;
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