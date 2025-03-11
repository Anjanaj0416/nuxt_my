<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal" >
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Quotation Details - View More..</h2>
        <!-- <button @click="closeModal" class="absolute z-50 p-2 text-white rounded-md  close-button">&times;</button> -->
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div>
            <h3 class="font-bold">
              Quotaion Details -
              {{ quotationStore.curQuotation.rootQuotationNo }}
            </h3>

            <!-- start qcards -->
            <div
              class="flex flex-col gap-5 p-2 mt-2 bg-white border-2 rounded-md shadow-md sm:p-6"
              v-for="(qItem, index) in quotationStore.listQuotationVerions"
              :key="index"
            >
              <div class="flex flex-col justify-between sm:flex-row">
                <!-- Section 1 -->
                <div class="flex flex-col text-center sm:text-left">
                  <h1 class="text-base font-semibold text-gray-700">
                    Quotation No.
                  </h1>
                  <p class="text-md text-blue-500">{{ qItem.quotationNo }}</p>
                </div>
                <hr class="block w-full border-gray-300 sm:hidden" />
                <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

                <!-- Section 2 -->
                <div class="flex flex-col text-center sm:text-left">
                  <h1 class="text-base font-semibold text-gray-700">Company</h1>
                  <p class="text-sm text-gray-500">{{ qItem.vendor }}</p>
                </div>
                <hr class="block w-full border-gray-300 sm:hidden" />
                <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

                <!-- Section 5 -->
                <div class="flex flex-col text-center sm:text-left">
                  <h1 class="text-base font-semibold text-gray-700">Total</h1>
                  <p class="text-sm font-bold text-gray-500">
                    Rs.{{ qItem.qutationValue }}
                  </p>
                </div>
                <hr class="block w-full border-gray-300 sm:hidden" />
                <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

                <!-- Section 7 -->
                <div class="flex flex-col text-center sm:text-left">
                  <h1 class="text-base font-semibold text-gray-700">Status</h1>
                  <span
                    class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                  >
                    {{ qItem.status }}
                  </span>
                </div>
              </div>

              <div class="text-red-400 -my-4">
                Sales Exec. : {{ qItem.salesExec }}
              </div>

              <div class="text-green-500">
                <span class="uppercase text-black">Items -> </span>
                <span v-for="(qProduct, index) in qItem.items" :key="index">
                  <div>{{ qProduct }}</div>
                </span>
              </div>

              <div class="flex gap-x-4 -my-4">
                <!-- Button Group -->

                <div
                  class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
                  
                >
                  <LinkBtn
                    v-show="qItem.status !== 'Approved'"
                    label="Approve"
                    @click="
                      quotationStore.curQuotation = qItem;
                      GoToApprove(qItem.id);
                    "
                  />

                  <ImageLable   v-show="qItem.status === 'Approved'" :imageUrl="imageroot+qItem.approvedMemo"  alt="Quotation Approval" title="Quotation Approval"  /> 
                </div>

                <div
                  class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
                >
                  <LinkBtn
                    label="View Quotation"
                    @click="
                      quotationStore.curQuotation = qItem;
                      GoToViewQuotation(qItem.id);
                    "
                  />
                </div>

                <div
                  class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
                  v-show="qItem.status === 'Approved'"
                >
                  <LinkBtn
                    label="View Invoice"
                    @click="
                      quotationStore.curQuotation = qItem;
                      GoToViewInvoice(qItem.id);
                    "
                  />
                </div>
                <div
                  class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
                >
                  <LinkBtn
                    label="Delete Quotation"
                    @click="
                      quotationStore.curQuotation = qItem;
                      DeleteQuotationVersion(qItem.id);
                    "
                  />
                </div>
              </div>
            </div>

            <!-- end qcards -->
          </div>
        </div>
      </div>
      <!-- End Modal Content -->

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <!-- <button @click="GetSave" class="confirm-button">Save</button> -->
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



export default {
  components: { closebtn, LinkBtn,Lable,Button,ImageLable },
  props: [],
  data() {
    return {
      imageroot: "",
      quotationStore: null,

      isOpen: true,
    };
  },
  async created() {
    this.quotationStore = useQuotationStore();  
    this.imageroot = this.quotationStore.initQuotation.baseUrl;
  },
  async mounted() {},
  watch: {},
  computed: {
    // ...mapState({
    //   //loggeduser: (state) => state.loggeduser,
    // }),
  },
  methods: {
    GoToApprove(id) {      
      this.$emit("Approve");
    },
    GoToViewQuotation(id) {
      //https://learners.lk:5005/web/assets/DTP/Quotation/Q2025030003-V3.pdf

      let url = `${this.imageroot}/DTL/Quotation/${id}.pdf`;
      window.open(url, "_blank");
    },
    GoToViewInvoice(id) {
      //https://learners.lk:5005/web/assets/DTP/Quotation/Q2025030003-V3.pdf

      let url = `${this.imageroot}/DTL/Invoice/${id}.pdf`;
      window.open(url, "_blank");

      //link to Invoice view
    },
    DeleteQuotationVersion(id) {
      //sweet alret
    },
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
      
    },
    GetSave() {
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
  z-index: 777;
}

/* Modal Container */
.modal {
  background: white;
  width: 80%;
  max-width: 1000px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 90%; /* Set the default height for larger screens */
  position: relative; /* Needed for proper footer placement */
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
  max-height: 80%; /* Set max height */
  overflow-y: auto; /* Make it scrollable */
  flex-grow: 1; /* Allow content to grow */
}

/* Modal Footer */
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute; /* Sticky footer */
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
    width: 100%; /* Full width on mobile */
    height: 100%; /* Full screen height on mobile */
    border-radius: 0; /* Remove rounded corners for mobile */
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none; /* Remove max-height for mobile */
    overflow-y: auto; /* Enable scroll */
    max-height: 80%;
  }

  .modal-footer {
    padding: 10px;
  }
}
</style>
