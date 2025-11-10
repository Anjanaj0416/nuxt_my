<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Quotation Approval</h2>
        <!-- <button @click="closeModal" class="absolute z-50 p-2 text-white rounded-md  close-button">&times;</button> -->
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div class="grid grid-cols-2 gap-4 mt-1 sm:grid-cols-1 md:grid-cols-1">
            <div>
              <h3 class="font-bold">
                Quotaion No - {{ id }}
              </h3>
            </div>
            <hr />
            <div>
              <label class="block text-sm mb-2 font-bold text-gray-600">Attached the approval prrof</label>
              
              <imagepicker1
                @GetSelectedImage="GetAttachedImage"
                :image_file="imageroot"
                ref="refApprovedImg"
                accept=""
              />

              <!-- accept="image/*,application/pdf"
                accept="application/pdf"
                 accept="image/*" -->
  
              <p v-if="err.approvedImage" class="mt-2 text-sm text-red-600">
                {{ err.approvedImage }}
              </p>
            </div>

          </div>
          <div>
            <!-- {{ quotationStore.curQuotation.id }} -->
          </div>
        </div>
      </div>
      <!-- End Modal Content -->

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="SetApprove" class="confirm-button">Approve</button>
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
  props: ['id'],
  data() {
    return {
      imageroot: "",
      ApprovalMemo: "",
      PreIssuedPINumber: "",
      isOpen: true,
      err: { ApprovalMemo: "" },
    };
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.orderStore = useOrderStore();
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

  closeModal() {
    this.isOpen = false;
    this.$emit("close"); // tell parent to hide modal
  },

  async SetApprove() {
    if (!this.IsValidate()) return;

    const formData = new FormData();
    formData.append("orderNo", this.id);
    formData.append("signedImage", this.ApprovalMemo);

    // show loading
    const loadingAlert = this.showLoading ? this.showLoading("") : null;

    try {
      const result = await this.orderStore.GetQuotationApprove(formData);

      if (loadingAlert) loadingAlert.close();

      if (result.success) {
        if (this.showToast) this.showToast(result.message, "success"); // show toast
        this.closeModal(); // close modal
      } else {
        if (this.showToast) this.showToast(result.message, "error");
      }
    } catch (error) {
      if (loadingAlert) loadingAlert.close();
      if (this.showToast) this.showToast("An error occurred during approval", "error");
      console.error("Approval failed:", error);
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
            this.ApprovalMemo
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
