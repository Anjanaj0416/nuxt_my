<template>
    <div class="modal-overlay" v-if="isOpen">
        <div class="modal">
        <!-- Modal Header -->
        <div class="modal-header">
            <h2 class="modal-title">Add Commision</h2>
            <closebtn @close="closeModal()" />
        </div>
        <!-- Modal Content (scrollable) -->
        <div class="modal-content">
            <div class="form-content">
                <div class="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-1 md:grid-cols-2">
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
                </div>
                <div>
            </div>
            </div>
        </div>
        <!-- End Modal Content -->

        <!-- Modal Footer -->
        <div class="modal-footer">
            <button @click="closeModal" class="cancel-button">Cancel</button>
            <button @click="SetApprove" class="confirm-button">Add</button>
        </div>
        </div>
    </div>
</template>

<script>
import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
import { useOrderStore } from "~/stores/modules/orderStore";

import closebtn from "~/components/customcontrol/modal_close_button";
import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import LinkBtn from "~/components/customcontrol/Link";

import Swal from "sweetalert2";

export default {
  components: { closebtn, LinkBtn, Lable, Button },
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
      PayAmount: "",
      isOpen: true,
      err: { PaymentSlipImage: "" },
      formattedAmount: '', 
      Amount: 0, 
    };
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.quotationStore = useQuotationStore();
    this.orderStore = useOrderStore();

    await this.quotationStore.loadInitPayment(this.showLoading);
    this.initPaymentDetails = this.quotationStore.initPaymentDetails;

  },
  async mounted() {
  },
  watch: {},
  computed: {
  },
  methods: {
    GetAttachedImage(file) {
      if (file) {
        this.PaymentSlipImage = file;
      }
    },

    formatAmount() {
      // Remove anything except numbers and dot
      let numericValue = this.formattedAmount.replace(/[^0-9.]/g, '');

      // Split by dot to handle decimals
      let parts = numericValue.split('.');
      let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add comma for thousands
      let decimalPart = parts[1] ? parts[1].slice(0, 2) : '00'; // Keep max 2 decimal digits

      this.formattedAmount = decimalPart ? `${integerPart}.${decimalPart}` : `${integerPart}.00`;

      // Store numeric value for backend
      this.Amount = parseFloat(this.formattedAmount.replace(/,/g, '')) || 0;
    },

    async SetApprove() {
      if (!this.IsValidate()) return;

      const confirmed = await this.$showConfirm(
        "Are you sure to Save this Commision Payment?",
        "warning"
      );

      if (!confirmed.isConfirmed) return;

      const formData = new FormData();
      formData.append("OrderId", this.orderId || "");
      formData.append("PaymentAmount", this.Amount || "");

      // Do the payment
      await this.orderStore.getDoCommisionPay(formData, this.showLoading);


      // refresh list after add
      await this.orderStore.GetCommisionList(this.orderId, this.showLoading);

      this.closeModal();
      
    },

    IsValidate() {
      let isSuccess = true;


       if (!this.Amount) {
            this.err.packageError = "Please enter amount.";
            isSuccess = false;
        } else {
            this.err.packageError = "";
        }

       

      return isSuccess;
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    async showConfirmAlert_ApproveQuotation(message, type) {
      try {
        const result = await Swal.fire({
          icon: type,
          title: message,
          showConfirmButton: true,
          toast: false,
          customClass: {
            popup: "custom-swal-popup",
          },
        });

        if (result.isConfirmed) {
          await this.quotationStore.GetAprrovingTheQuotation(
            this.quotationStore.curQuotation.id,
            this.PaymentSlipImage
          );
          await Swal.fire({
            icon: "success",
            title: "Saved!",
            text: "Quotation Approved",
            customClass: {
              popup: "swal-custom-zindex",
            },
          });
        }
      } catch (error) {
        console.error("Error displaying alert:", error);
      }
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
  max-width: 600px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 70%;
  position: relative;
}

.modal-header {
  background: #0b2145;
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

button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

.cancel-button {
  background: #e4e4e4;
  color: #333;
}

.confirm-button {
  background: #0b2145;
  color: white;
}

button:hover {
  opaCity: 0.8;
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
    padding: 10px;
  }
}
</style>
