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
               <p v-if="err.installmentTypeError" class="mt-2 text-sm text-red-600">
                {{ err.installmentTypeError }}
                </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Paid Amount</label>
              <input 
                type="text"
                v-model="formattedAmount"
                @input="formatAmount"
                placeholder="Enter pay amount"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
              />
               <p v-if="err.packageError" class="mt-2 text-sm text-red-600">
                {{ err.packageError }}
                </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Reference No</label>
              <input 
                type="text" 
                v-model="ReferenceNo"
                placeholder="Enter reference no"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
              />
               <p v-if="err.referenceNoError" class="mt-2 text-sm text-red-600">
                {{ err.referenceNoError }}
                </p>
            </div>
            <div>
              <label class="block mb-2 text-sm font-semibold text-gray-700">Receipt Type</label>
              <div class="relative">
                <select
                  v-model="ReceiptType"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                >
                  <option disabled value="">Select Receipt Type</option>
                  <option
                    v-for="(cat, index) in orderStore.initPaymentDetails.listReceiptType"
                    :key="index"
                    :value="cat"
                  >
                    {{ cat }}
                  </option>
                </select>
              </div>
               <p v-if="err.receiptTypeError" class="mt-2 text-sm text-red-600">
                {{ err.receiptTypeError }}
                </p>
            </div>
            <div>
              <label class="block text-sm mb-2 font-bold text-gray-600">Bank Name</label>
              <div class="relative">
                <select
                  v-model="BankName"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
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
               <p v-if="err.bankNameError" class="mt-2 text-sm text-red-600">
                {{ err.bankNameError }}
                </p>
              
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Advance Receipt No</label>
              <input 
                type="text" 
                v-model="OriginalAdvanceReceiptNo"
                placeholder="Enter reference no"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
              />
               <p v-if="err.originalAdvanceReceiptNoError" class="mt-2 text-sm text-red-600">
                {{ err.originalAdvanceReceiptNoError }}
                </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Advance Receipt Date</label>
              <input 
                type="date" 
                v-model="OriginalAdvanceReceiptDate"
                placeholder="Enter Pay Date"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
                min="2025-05-02"
              />
               <p v-if="err.originalAdvanceReceiptDateError" class="mt-2 text-sm text-red-600">
                {{ err.originalAdvanceReceiptDateError }}
                </p>
            </div>
            <div>
              <label class="block text-sm mb-2 font-bold text-gray-600"> Attachment For Payment Referance</label>
              
              <imagepicker1
                @GetSelectedImage="GetAttachedImage"
                :image_file="imageroot"
                ref="refApprovedImg"
                accept=""
              />

        

              <!-- <input type="file" @change="handleFileUpload" /> -->


              <!-- accept="image/*,application/pdf"
                accept="application/pdf"
                 accept="image/*" -->
  
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
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
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
import Swal from "sweetalert2";

export default {
  components: { closebtn, LinkBtn, Lable, Button, ImageLable, imagepicker1 },
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
      ReceiptType: "" ,
      BankName: "",
      isOpen: true,
      err: { PaymentSlipImage: "" },
      formattedAmount: '', // the formatted string
      Amount: 0, 
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
    GetAttachedImage(file) {
      console.log("Selected File:", file);
      if (file) {
        this.PaymentSlipImage = file;
      }
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
      formData.append("BankName", this.BankName || "");
      formData.append("OriginalAdvanceReceiptNo", this.OriginalAdvanceReceiptNo || "");
      formData.append("OriginalAdvanceReceiptDate", this.OriginalAdvanceReceiptDate || "");
      formData.append("PaymentSlipImage", this.PaymentSlipImage);



      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      // console.log("File Name:", this.PaymentSlipImage);


      // Do the payment
      await this.orderStore.getDoPay(formData, this.showLoading);


      this.closeModal();
      
    },

    IsValidate() {
      let isSuccess = true;

      if (this.PaymentSlipImage && this.PaymentSlipImage.size > 0) {
        this.err.approvedImage = "";
      } else {
        this.err.approvedImage = "Attach the approval proof.";
        isSuccess = false;
      }

        if (!this.Amount) {
            this.err.installmentTypeError = "Please select installment.";
            isSuccess = false;
        } else {
            this.err.packageError = "";
        }

        if (!this.Amount) {
            this.err.packageError = "Please enter amount.";
            isSuccess = false;
        } else {
            this.err.packageError = "";
        }

        if (!this.OriginalAdvanceReceiptDate) {
            this.err.originalAdvanceReceiptDateError = "Please enter original advance receip date.";
            isSuccess = false;
        } else {
            this.err.originalAdvanceReceiptDateError = "";
        }

        if (!this.ReferenceNo) {
            this.err.referenceNoError = "Please enter Reference No.";
            isSuccess = false;
        } else {
            this.err.referenceNoError = "";
        }

        if (!this.ReceiptType) {
            this.err.receiptTypeError = "Please select Receipt Type.";
            isSuccess = false;
        } else {
            this.err.receiptTypeError = "";
        }

        if (!this.BankName) {
            this.err.bankNameError = "Please enter Bank Name.";
            isSuccess = false;
        } else {
            this.err.bankNameError = "";
        }

        if (!this.OriginalAdvanceReceiptNo) {
            this.err.originalAdvanceReceiptNoError = "Please enter Original AdvanceReceipt No.";
            isSuccess = false;
        } else {
            this.err.originalAdvanceReceiptNoError = "";
        }

        if (!this.OriginalAdvanceReceiptDate) {
            this.err.originalAdvanceReceiptDateError = "Please enter Original AdvanceReceipt Date.";
            isSuccess = false;
        } else {
            this.err.originalAdvanceReceiptDateError = "";
        }

      return isSuccess;
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

  },
  async beforeMount() {
    // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
    // } else {
    //   this.show_error('Not Allowed to access this page')
    //   this.$router.push('/')
    // }
  },
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
  height: 80%;
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
