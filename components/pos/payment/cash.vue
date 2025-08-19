<template>
  <div class="bg-white text-gray-800 rounded-xl shadow-md p-4 w-full max-w-sm">
    <h2 class="text-lg font-semibold mb-4">Cart Summary</h2>

    <!-- Subtotal -->
    <div class="flex justify-between mb-2">
      <span>Subtotal</span>
      <span class="font-medium">Rs. 0.00</span>
    </div>

    <!-- Discount -->
    <div class="flex justify-between mb-2 items-center">
      <span>Discount</span>
      <input
        type="number"
        placeholder="0"
        class="w-20 border rounded-lg px-2 py-1 text-right"
      />
    </div>

    <!-- VAT -->
    <div class="flex justify-between mb-2">
      <span>VAT (15%)</span>
      <span class="font-medium">Rs. 0.00</span>
    </div>

    <hr class="my-3" />

    <!-- Grand Total -->
    <div class="flex justify-between text-lg font-bold">
      <span>Total</span>
      <span>Rs. 0.00</span>
    </div>

    <!-- Checkout Button -->
    <button
      class="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Checkout
    </button>
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
  props: ['id'],
  data() {
    return {
      imageroot: "",
      ApprovalMemo: "",
      PreIssuedPINumber: "",
      isOpen: true,
    };
  },
  async created() {
    this.showLoading = this.$showLoading;

  },
  async mounted() {
    //this.showAlert('fff', 'error');
  },
  watch: {},
  computed: {
    // ...mapState({
    //   //loggeduser: (state) => state.loggeduser,
    // }),
  },
  methods: {
    GetAttachedImage(file) {
      this.ApprovalMemo = file;
      console.log(file);
      
    },

    async SetApprove() {
      if (this.IsValidate()) {
        const formData = new FormData();
        formData.append("orderNo", this.id);
        formData.append("signedImage", this.ApprovalMemo);

        const loadingAlert = this.showLoading(""); 

        try {
          await this.orderStore.GetQuotationApprove(formData);
          loadingAlert.close();
          this.closeModal();
        } catch (error) {
          loadingAlert.close();
          console.error("Approval failed:", error);
        }
      } else {
        console.log("Validation failed");
      }
    },



    IsValidate() {
      let isSuccess = true;

      if (this.ApprovalMemo && this.ApprovalMemo.size > 0) {
        this.err.approvedImage = "";
      } else {
        this.err.approvedImage = "Attach the approval proof.";
        isSuccess = false;
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
.custom-swal-popup {
  z-index: 9999 !important;
  /* Ensure SweetAlert is above the modal */
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8888;
}

/* Modal Container */
.modal {
  background: white;
  width: 80%;
  max-width: 400px;
    border-radius: 1rem;
    overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 60%;
  /* Set the default height for larger screens */
  position: relative;
  /* Needed for proper footer placement */
}

/* Modal Header */
.modal-header {
  background: #0b2145;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

/* Modal Content */
.modal-content {
  padding: 20px;
  max-height: 80%;
  /* Set max height */
  overflow-y: auto;
  /* Make it scrollable */
  flex-grow: 1;
  /* Allow content to grow */
}

/* Modal Footer */
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  /* Sticky footer */
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
  opacity: 0.8;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .modal {
    width: 100%;
    /* Full width on mobile */
    height: 100%;
    /* Full screen height on mobile */
    border-radius: 0;
    /* Remove rounded corners for mobile */
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none;
    /* Remove max-height for mobile */
    overflow-y: auto;
    /* Enable scroll */
    max-height: 80%;
  }

  .modal-footer {
    padding: 10px;
  }
}
</style>
