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
          <div>
            <h3 class="font-bold">
              Quotaion No -
              {{ quotationStore.curQuotation.rootQuotationNo }}
            </h3>
            <hr />

            <!-- <imagecomp
              @GetAttachedImage="GetAttachedImage"
              :image_file="imageroot"
              ref="refApprovedImg"
            /> -->

            <p class="mt-2 text-sm text-red-600">
              {{ err.approvedImage }}
            </p>
          </div>
        </div>
      </div>
      <!-- End Modal Content -->

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="SetApprove" class="confirm-button">Approve</button>
        <button @click="showAlert">Show SweetAlert</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuotationStore } from "~/stores/modules/quotationStore";

import closebtn from "~/components/customcontrol/modal_close_button";
import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import ImageLable from "~/components/customcontrol/ImageLable";
import LinkBtn from "~/components/customcontrol/Link";
// import imagecomp from "~/components/customcontrol/imagepicker";
import Swal from "sweetalert2";

export default {
  components: { closebtn, LinkBtn, Lable, Button, ImageLable },
  props: [],
  data() {
    return {
      imageroot: "",
      approvedImage: "",
      isOpen: true,
      err: { approvedImage: "" },
    };
  },
  async created() {
    this.quotationStore = useQuotationStore();
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
    GetAttachedImage(img) {
      this.approvedImage = img;
    },

    async SetApprove() {
      if (this.IsValidate()) {
        //send API call
        this.showConfirmAlert_ApproveQuotation();

        // this.closeModal();
        //  this.$emit("CloseApprovingView");
      }
    },

    IsValidate() {
      let isSuccess = true;

      if (this.approvedImage && this.approvedImage.size > 0) {
        this.err.approvedImage = "";
      } else {
        this.err.approvedImage = "Attached the approval prrof..";
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
            this.approvedImage
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
  border-radius: 8px;
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
