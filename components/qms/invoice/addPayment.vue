<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Payment Add</h2>
        <closebtn @close="closeModal()" />
      </div>
      <div class="modal-content">
        <div class="form-content">
          <div class="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-1 md:grid-cols-2">
            <div>
              <label class="block text-sm font-bold text-gray-600">Select Installment</label>
              <div class="relative">
                <select
                  v-model="InstallmentId"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                  @input="clearErrorOnInput('InstallmentId')"
                >
                  <option disabled value="">Select Installment</option>
                  <option
                    v-for="(cat, index) in orderStore.initPaymentDetails.listInstallment"
                    :key="index"
                    :value="cat.id"
                  >
                    {{ cat.value }}
                  </option>
                </select>
              </div>
               <p v-if="err.InstallmentId" class="mt-2 text-sm text-red-600">
                {{ err.InstallmentId }}
                </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Paid Amount</label>
              <input 
                type="text"
                v-model="formattedAmount"
                @input="handleInput"
                placeholder="Enter pay amount"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
              />
               <p v-if="err.Amount" class="mt-2 text-sm text-red-600">
                {{ err.Amount }}
                </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Reference No</label>
              <input 
                type="text" 
                v-model="ReferenceNo"
                placeholder="Enter reference no"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
                @input="clearErrorOnInput('ReferenceNo')"
              />
               <p v-if="err.ReferenceNo" class="mt-2 text-sm text-red-600">
                {{ err.ReferenceNo }}
                </p>
            </div>
            <div>
              <label class="block  text-sm font-semibold text-gray-700">Receipt Type</label>
              <div class="relative">
                <select
                  v-model="ReceiptType"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                  @input="clearErrorOnInput('ReceiptType')"
                >
                  <option disabled value="">Select Receipt Type</option>
                  <option
                    v-for="(cat, index) in orderStore.initPaymentDetails.listReceiptType"
                    :key="index"
                    :value="cat.id"
                  >
                    {{ cat.value }}
                  </option>
                </select>
              </div>
               <p v-if="err.ReceiptType" class="mt-2 text-sm text-red-600">
                {{ err.ReceiptType }}
                </p>
            </div>
            <div>
              <label class="block  text-sm font-semibold text-gray-700">Payment Type</label>
              <div class="relative">
                <select
                  v-model="PaymentMode"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                  @input="clearErrorOnInput('PaymentMode')"
                >
                  <option disabled value="">Select Payment Type</option>
                  <option
                    v-for="(cat, index) in orderStore.initPaymentDetails.listPaymentMode"
                    :key="index"
                    :value="cat.id"
                  >
                    {{ cat.value }}
                  </option>
                </select>
              </div>
               <p v-if="err.PaymentMode" class="mt-2 text-sm text-red-600">
                {{ err.PaymentMode }}
                </p>
            </div>
            <div v-if="PaymentMode !== 'CASH'">
              <label class="block text-sm font-bold text-gray-600">Bank Name</label>
              <div class="relative">
                <select
                  v-model="BankName"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                  @input="clearErrorOnInput('BankName')"
                >
                  <option disabled value="">Select Bank</option>
                  <option
                    v-for="(cat, index) in orderStore.initPaymentDetails.listBanks"
                    :key="index"
                    :value="cat.id"
                  >
                    {{ cat.value }}
                  </option>
                </select>
              </div>
              <p v-if="err.BankName" class="mt-2 text-sm text-red-600">
              {{ err.BankName }}
              </p>
              
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Invoice No</label>
              <input 
                type="text" 
                v-model="OriginalAdvanceReceiptNo"
                placeholder="Enter reference no"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
                @input="clearErrorOnInput('OriginalAdvanceReceiptNo')"
              />
               <p v-if="err.OriginalAdvanceReceiptNo" class="mt-2 text-sm text-red-600">
                {{ err.OriginalAdvanceReceiptNo }}
                </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Invoice Date</label>
              <input 
                type="date" 
                v-model="OriginalAdvanceReceiptDate"
                placeholder="Enter Pay Date"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
                @input="clearErrorOnInput('OriginalAdvanceReceiptDate')"
              />
               <p v-if="err.OriginalAdvanceReceiptDate" class="mt-2 text-sm text-red-600">
                {{ err.OriginalAdvanceReceiptDate }}
                </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Paid Date</label>
              <input 
                type="date" 
                v-model="PaidDate"
                placeholder="Enter Pay Date"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
                @input="clearErrorOnInput('PaidDate')"
              />
               <p v-if="err.PaidDate" class="mt-2 text-sm text-red-600">
                {{ err.PaidDate }}
                </p>
            </div>
            <div>
              <label class="block text-sm mb-2 font-bold text-gray-600"> Attachment For Payment Referance</label>
              
              <!-- <imagepicker1
                @GetSelectedImage="GetAttachedImage"
                :image_file="imageroot"
                ref="refApprovedImg"
                accept="image/*,application/pdf"
              /> -->
              <!-- accept="image/*,application/pdf"
                accept="application/pdf"
                 accept="image/*" -->
              <imagepickermultiple
                @GetSelectedImages="GetAttachedImage"
                :image_file="imageroot"
                ref="refApprovedImg"
                accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                @input="clearErrorOnInput('PaymentSlipImage')"
              />
  
              <p v-if="err.approvedImage" class="mt-2 text-sm text-red-600">
                {{ err.approvedImage }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-1 md:grid-cols-1 mb-8">
            <div>
              <label class="block text-sm font-bold text-gray-600">Remarks</label>
              <textarea 
                type="text" 
                v-model="Remarks"
                 rows="4"
                placeholder="Enter remarks"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
                @input="clearErrorOnInput('Remarks')"
              />
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <!-- End Modal Content -->

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
        <button @click="SetApprove" class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow">
          Add Payment 
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useOrderStore } from "~/stores/modules/orderStore";

import closebtn from "~/components/customcontrol/modal_close_button";
import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import ImageLable from "~/components/customcontrol/ImageLable";
import LinkBtn from "~/components/customcontrol/Link";
// import imagecomp from "~/components/customcontrol/imagepicker";
import imagepicker1 from "~/components/customcontrol/imagepicker1.vue";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";

export default {
  components: { closebtn, LinkBtn, Lable, Button, ImageLable, imagepicker1,imagepickermultiple },
  props: {
    orderId: {
      type: [String, Number],
      required: true,
    },
     status: {  
      type: String,
      required: false,
      default: ''
    },
  },
  data() {
    return {
      imageroot: "",
      PaymentSlipImage: "",
      InstallmentId: "",
      PayAmount: "",
      PayTerms:"",
      PayDate: "",
      ReceiptType: "",
      PaymentMode: "" ,
      BankName: "",
      isOpen: true,
      err: { PaymentSlipImage: "" },
      formattedAmount: '', // the formatted string
      Amount: 0, 
      err: {
        InstallmentId: "",
        Amount: "",
        ReferenceNo: "",
        PaymentMode: "",
        BankName: "",
        OriginalAdvanceReceiptNo: "",
        OriginalAdvanceReceiptDate: "",
        PaidDate:"",
        approvedImage: "",
      }
    };
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.orderStore = useOrderStore();

    await this.orderStore.GetInitPayment(this.orderId,this.showLoading);
    // this.initPaymentDetails = this.orderStore.initPaymentDetails;

  },
  async mounted() {
  },
  watch: {},
  computed: {
  },
  methods: {

    GetAttachedImage(files) {
      console.log("Selected Files:", files);
      this.PaymentSlipImage = files;
    },

    handleInput(event) {
      this.formatAmount(event);           
      this.clearErrorOnInput('Amount'); 
    },

    formatAmount() {
      let numericValue = this.formattedAmount.replace(/[^0-9.]/g, '');
      let parts = numericValue.split('.');
      let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
      let decimalPart = parts[1] ? parts[1].slice(0, 2) : '00';

      this.formattedAmount = decimalPart ? `${integerPart}.${decimalPart}` : `${integerPart}.00`;
      this.Amount = parseFloat(this.formattedAmount.replace(/,/g, '')) || 0;
    },

    async SetApprove() {
      if (!this.IsValidate()) return;

      const confirmed = await this.$showConfirm(
        "Are you sure to Save this Payment?",
        "warning"
      );

      if (!confirmed.isConfirmed) return;

      const formData = new FormData();
      formData.append("InstallmentId", this.InstallmentId || "");
      formData.append("Amount", this.Amount || "");
      formData.append("Remarks", this.Remarks || "");
      formData.append("ReferenceNo", this.ReferenceNo || "");
      formData.append("ReceiptType", this.ReceiptType || "");
      formData.append("PaymentMode", this.PaymentMode || "");
      formData.append("BankName", this.BankName || "");
      formData.append("OriginalAdvanceReceiptNo", this.OriginalAdvanceReceiptNo || "");
      formData.append("OriginalAdvanceReceiptDate", this.OriginalAdvanceReceiptDate || "");
      formData.append("PaidDate", this.PaidDate || "");
      if (this.PaymentSlipImage && this.PaymentSlipImage.length > 0) {
        this.PaymentSlipImage.forEach(file => {
          formData.append("PaymentSlipImage", file);
        });
      }

      // ✅ JSON object for console
      const paymentJson = {
        InstallmentId: this.InstallmentId || "",
        Amount: this.Amount || "",
        Remarks: this.Remarks || "",
        ReferenceNo: this.ReferenceNo || "",
        ReceiptType: this.ReceiptType || "",
        PaymentMode: this.PaymentMode || "",
        BankName: this.BankName || "",
        OriginalAdvanceReceiptNo: this.OriginalAdvanceReceiptNo || "",
        OriginalAdvanceReceiptDate: this.OriginalAdvanceReceiptDate || "",
        PaidDate: this.PaidDate || "",
        PaymentSlipImage: this.PaymentSlipImage?.map(f => f.name) || []
      };

      console.log(JSON.stringify(paymentJson));


      await this.orderStore.getDoPay(formData, this.showLoading);
      this.closeModal();
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

    IsValidate() {
      this.clearErr();
      let isValid = true;

      if (!this.InstallmentId) {
        this.err.InstallmentId = "Please select installment";
        isValid = false;
      }

      if (!this.Amount || this.Amount <= 0) {
        this.err.Amount = "Please enter valid amount";
        isValid = false;
      }

      if (!this.ReferenceNo) {
        this.err.ReferenceNo = "Please enter Reference No";
        isValid = false;
      }

      if (!this.ReceiptType) {
        this.err.ReceiptType = "Please select Receipt Type";
        isValid = false;
      }

      if (!this.PaymentMode) {
        this.err.PaymentMode = "Please select Payment Type";
        isValid = false;
      }

      if (this.PaymentMode !== "CASH" && !this.BankName) {
        this.err.BankName = "Please select Bank Name";
        isValid = false;
      }

      if (!this.OriginalAdvanceReceiptNo) {
        this.err.OriginalAdvanceReceiptNo = "Please enter Advance Receipt No";
        isValid = false;
      }

      if (!this.OriginalAdvanceReceiptDate) {
        this.err.OriginalAdvanceReceiptDate = "Please select Advance Receipt Date";
        isValid = false;
      }

      if (!this.PaidDate) {
        this.err.PaidDate = "Please select Paid Date";
        isValid = false;
      }

      if (!this.PaymentSlipImage || !this.PaymentSlipImage.length) {
        this.err.approvedImage = "Attach payment proof";
        isValid = false;
      }

      return isValid;
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

  },
  async beforeMount() {},

  head() {
    return {
      title: "Intranet - Digital Tech Labs",
    };
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
