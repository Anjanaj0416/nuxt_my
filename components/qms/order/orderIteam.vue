<template>
  <div class="modal-overlay" >
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Add Packages</h2>
        <!-- <button @click="closeModal" class="absolute z-50 p-2 text-white rounded-md  close-button">&times;</button> -->
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div class="grid grid-cols-2 gap-4 mt-1 sm:grid-cols-1 md:grid-cols-1">
            <div>
              <h3 class="font-bold">
                {{ pkg.categoryName }}
              </h3>
            </div>
            <hr />

            

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-if="pkg.categoryName  === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Main Banners</label>
                <input
                    type="number"
                    min="1"
                    v-model.number="form.NoOfMainBanners"
                    class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter number of main banners"
                />
                </div>
                <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Main Banners</label>
                <strong class="text-sm text-blue-700">
                    {{ pkg.NoOfMainBanners || '-' }}
                </strong>
              </div>

              <div v-if="pkg.categoryName  === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Category Banners</label>
                <input
                    type="number"
                    min="1"
                    v-model.number="form.NoOfCategoryBanners"
                    class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter number of category banners"
                />
                </div>
                <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Category Banners</label>
                <strong class="text-sm text-blue-700">
                    {{ pkg.NoOfCategoryBanners || '-' }}
                </strong>
              </div>

              <div v-if="pkg.categoryName  === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Sub Category Banners</label>
                <input
                    type="number"
                    min="1"
                    v-model.number="form.NoOfSubCategoryBanners"
                    class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter number of sub category banners"
                />
                </div>
                <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Sub Category Banners</label>
                <strong class="text-sm text-blue-700">
                    {{ pkg.NoOfSubCategoryBanners || '-' }}
                </strong>
              </div>

              <div v-if="pkg.categoryName === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">
                  No. of Vendor Banners
                </label>

                <input
                  type="number"
                  min="1"
                  v-model.number="form.NoOfVendorBanners"
                  class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter number of vendor banners"
                  @input="clearErrorOnInput('NoOfVendorBanners')"
                />

                <p v-if="err.NoOfVendorBanners" class="mt-2 text-sm text-red-600">
                  {{ err.NoOfVendorBanners }}
                </p>
              </div>

              <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">
                  No. of Vendor Banners
                </label>
                <strong class="text-sm text-blue-700">
                  {{ pkg.NoOfVendorBanners || '-' }}
                </strong>
              </div>


              <div v-if="pkg.categoryName  === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Product Link</label>
                <input
                    type="number"
                    min="1"
                    v-model.number="form.NoOfProductLinks"
                    class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter number of product links"
                />
                </div>
                <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Product Link</label>
                <strong class="text-sm text-blue-700">
                    {{ pkg.NoOfProductLinks || '-' }}
                </strong>
              </div>

              <div v-if="pkg.categoryName  === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Service Link</label>
                <input
                    type="number"
                    min="1"
                    v-model.number="form.NoOfServiceLinks"
                    class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter number of service links"
                />
                </div>
                <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">No. of Service Link</label>
                <strong class="text-sm text-blue-700">
                    {{ pkg.NoOfServiceLinks || '-' }}
                </strong>
              </div>

              <div v-if="pkg.categoryName  === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">Prominent Items</label>
                <input
                    type="number"
                    min="1"
                    v-model.number="form.NoOfProminentItems"
                    class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Enter number of prominent items"
                />
                </div>
                <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">Prominent Items</label>
                <strong class="text-sm text-blue-700">
                    {{ pkg.NoOfProminentItems || '-' }}
                </strong>
              </div>

              <div class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  v-model.number="form.qty"
                  class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

  

              <!-- Unit Price -->
              <div v-if="pkg.categoryName === 'Customized Package'" class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">
                  Unit Price (Rs)
                </label>
                <input
                  type="number"
                  min="0"
                  v-model.number="form.unitPrice"
                  class="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div v-else class="flex flex-col">
                <label class="text-sm font-medium text-gray-600 mb-1">
                  Unit Price (Rs)
                </label>
                <strong class="text-sm text-blue-700">
                  {{ pkg.showPrice || '-' }}
                </strong>
              </div>

              <div class="flex flex-col space-y-2">
                <label class="text-sm font-semibold text-gray-700 tracking-wide">
                  Discount
                </label>

                <div class="flex items-stretch w-full rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white ">

                  <!-- Input with currency indicator -->
                  <div class="relative flex-1">
                    <span
                      v-if="invoiceDiscountType === 'lkr'"
                      class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                    >
                      Rs
                    </span>

                    <input
                      type="number"
                      min="0"
                      v-model.number="invoiceDiscount"
                      placeholder="Enter discount"
                      class="w-full h-full px-3 py-2 text-sm outline-none bg-transparent"
                      :class="invoiceDiscountType === 'lkr' ? 'pl-9' : ''"
                    />
                  </div>

                  <!-- Toggle Buttons -->
                  <div class="flex bg-gray-50">
                    <button
                      type="button"
                      @click="invoiceDiscountType = 'lkr'"
                      class="relative px-4 py-2 text-sm font-semibold transition-all duration-300"
                      :class="
                        invoiceDiscountType === 'lkr'
                          ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      "
                    >
                      LKR
                    </button>

                    <button
                      type="button"
                      @click="invoiceDiscountType = 'percentage'"
                      class="relative px-4 py-2 text-sm font-semibold transition-all duration-300"
                      :class="
                        invoiceDiscountType === 'percentage'
                          ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      "
                    >
                      %
                    </button>
                  </div>

                </div>
              </div>

            </div>

            <div class="flex flex-col">
              <div class="flex-grow"></div>
              <div class="sticky bottom-0 w-full p-4 bg-white border-t">
                <div class="flex justify-end">
                  <div class="w-64 p-4 bg-white rounded-lg shadow-sm space-y-2">
                    <div class="flex justify-between text-sm text-gray-500">
                      <span>VAT</span>
                      <span>{{ orderStore.initOrder.vatRate }}</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-500">
                      <span>SSL</span>
                      <span>{{ orderStore.initOrder.ssclRate }}</span>
                    </div>
                    <div class="flex justify-between text-sm text-gray-500">
                      <span>Discount</span>
                      <span>{{ Number(discountAmount || 0).toFixed(2) }}</span>
                    </div>
                    <hr />
                    <div class="flex justify-between text-base font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{{ total.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
          <button @click="closeModal" class="px-12 py-2 text-sm  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
          <button @click="submitItem" class="px-12 py-2 text-sm  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
            Upload
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "~/stores/modules/orderStore";
import closebtn from "~/components/customcontrol/modal_close_button";

export default {
  components: { closebtn },

  props: {
    pkg: { type: Object, required: true },
  },

  data() {
    return {
      initOrder: null,
      err: {},
      invoiceDiscount: 0,
      invoiceDiscountType: "lkr",
      form: {
        NoOfMainBanners: '',
        NoOfCategoryBanners: '',
        NoOfSubCategoryBanners: '',
        NoOfVendorBanners: '',
        NoOfProductLinks: '',
        NoOfServiceLinks: '',
        NoOfProminentItems: '',
        qty: 1,
        unitPrice: Number(this.pkg.price || 0),
        discount: 0,
      },
    };
  },

  computed: {

    discountAmount() {
      const qty = Number(this.form.qty) || 1;
      const unitPrice = Number(this.form.unitPrice) || 0;
      const gross = qty * unitPrice;

      const discountInput = Number(this.invoiceDiscount) || 0;
      let discount = 0;

      if (this.invoiceDiscountType === "percentage") {
        discount = (gross * discountInput) / 100;
      } else {
        discount = discountInput;
      }

      discount = Math.max(0, Math.min(discount, gross));

      return discount;
    },

    total() {
      if (!this.initOrder) return 0;

      const vat = Number(this.initOrder?.vatRate) || 0;
      const sscl = Number(this.initOrder?.ssclRate) || 0;

      const qty = Number(this.form.qty) || 1;
      const unitPrice = Number(this.form.unitPrice) || 0;

      const gross = qty * unitPrice;
      const discount = Number(this.discountAmount) || 0;

      const base = gross - discount;

      const ssclAmt = base * (sscl / 100);
      const vatAmt = (base + ssclAmt) * (vat / 100);

      return Number(base + ssclAmt + vatAmt) || 0;
    }
  },


  async created() {
    this.showLoading = this.$showLoading;
    this.orderStore = useOrderStore();

    await this.orderStore.loadInitOrderPlace(this.showLoading);

    this.initOrder = this.orderStore.initOrder
  },

  methods: {

      invoiceDiscountValue() {
      if (this.invoiceDiscountType === "percentage") {
        return (this.grossTotal * this.invoiceDiscount) / 100;
      }
      return this.invoiceDiscount;
    },
    submitItem() {
      if (!this.IsValidate()) return;

      this.$emit("submit", {
        packageId: this.pkg.itemId,
        packageName: this.pkg.categoryName,
        unitPrice: this.form.unitPrice,
        qty: this.form.qty,

        // discountType: this.invoiceDiscountType,
        // discountInput: this.invoiceDiscount,
        discount: this.discountAmount,

        vatRate: this.initOrder?.vatRate || 0,
        ssclRate: this.initOrder?.ssclRate || 0,
        total: this.total,

        NoOfMainBanners: this.form.NoOfMainBanners,
        NoOfCategoryBanners: this.form.NoOfCategoryBanners,
        NoOfSubCategoryBanners: this.form.NoOfSubCategoryBanners,
        NoOfVendorBanners: this.form.NoOfVendorBanners,
        NoOfProductLinks: this.form.NoOfProductLinks,
        NoOfServiceLinks: this.form.NoOfServiceLinks,
        ProminentItems: this.form.NoOfProminentItems,
      });
      
    },

    
    closeModal() {
      this.isAddPackage = false;
      this.$emit("close");
    },
    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
    },
    IsValidate() {
      this.err = {};
      let isValid = true;

      if (!this.form.NoOfVendorBanners) {
        this.err.NoOfVendorBanners = "Please Enter Vendor Banner Count";
        isValid = false;
      }

      return isValid;
    },

  },

    
};
</script>


<style scoped>
/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: cEnter;
  align-items: cEnter;
  z-index: 9999;
}

.modal {
  background: white;
  width: 80%;
  max-width: 800px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
}

.modal-header {
  background: linear-gradient(to right, #1048c2, #0b2c88, #08236b); /* from-blue-600, via-blue-700, to-blue-900 */
  backdrop-filter: blur(12px); /* backdrop-blur-md */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: cEnter;
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

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

