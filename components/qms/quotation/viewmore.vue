<template>
  <section class="justify-center">
    <div v-if="!showAddProposalEdit">
      <div >
        <div class="form-content">
          <div>
            <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
              <div class="font-bold mb-4">Proposal Versions Details -
                {{ quotationStore.curQuotation.rootQuotationNo }}
              </div>
              <button
                class="flex items-center  gap-2 px-4 py-2 text-sm font-medium text-gray-500 transition-all duration-300 bg-white border-1 rounded-full shadow hover:bg-blue-700 hover:text-white hover:shadow-md"
                @click="closeModal" 
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Proposal
              </button>
            </div>

            <!-- {{ quotationStore.curQuotation }} -->
            <div class="max-h-[660px] overflow-y-auto space-y-4">
              <div
                v-for="(qItem, index) in quotationStore.listQuotationVerions"
                :key="index"
                class="relative flex flex-col gap-4 rounded-xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-sm hover:shadow-md transition duration-300 p-4 sm:p-6 mb-4"
              >
              <!-- {{ quotationStore.listQuotationVerions }} -->
                <!-- Top row: basic info -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div class="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
                    <!-- Proforma No -->
                    <div>
                      <h2 class="text-xs font-medium text-gray-500">Proposal Version No.</h2>
                      <p class="text-sm font-bold text-blue-700">{{ qItem.quotationNo }}</p>
                    </div>
                    <div class="hidden sm:block w-px h-6 bg-gray-300"></div>

                    <!-- Company -->
                    <div>
                      <h2 class="text-xs font-medium text-gray-500">Company</h2>
                      <p class="text-sm font-semibold text-gray-700">{{ qItem.vendor }}</p>
                    </div>
                    <div class="hidden sm:block w-px h-6 bg-gray-300"></div>

                    <!-- Total -->
                    <div>
                      <h2 class="text-xs font-medium text-gray-500">Total</h2>
                      <p class="text-sm font-semibold text-green-600">Rs. {{ qItem.qutationValue }}</p>
                    </div>
                    <div class="hidden sm:block w-px h-6 bg-gray-300"></div>

                    <!-- Status -->
                    <div>
                      <h2 class="text-xs font-medium text-gray-500">Status</h2>
                      <span
                        :class="{
                          'bg-green-100 text-green-700': qItem.status === 'Approved',
                          'bg-yellow-100 text-yellow-700': qItem.status !== 'Approved'
                        }"
                        class="px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        {{ qItem.status }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Sales Exec -->
                <p class="text-xs text-red-500">Sales Exec.: {{ qItem.salesExec }}</p>

                <!-- Items -->
                <div class="text-xs text-gray-600 flex flex-wrap gap-1">
                  <span class="font-medium text-gray-700">Items:</span>
                  <span
                    v-for="(qProduct, idx) in qItem.items"
                    :key="idx"
                    class="bg-gray-200 rounded-full px-2 py-0.5 text-xs"
                  >
                    {{ qProduct }}
                  </span>
                </div>

                <!-- Buttons -->
                 
                <div  class="flex flex-wrap justify-end gap-2 mt-2 relative">
                  <!-- Approval Image Badge -->
                  <!-- <ImageLable
                    v-show="qItem.status === 'Approved'"
                    :imageUrl="imageroot + qItem.approvedMemo"
                    alt="Quotation Approval"
                    title="Quotation Approval"
                    class="absolute -top-3 -left-3 w-8 h-8 rounded-full border border-gray-300"
                  /> -->

                  <!-- Edit -->
                  <LinkBtn
                    label="Edit"
                    @click="
                      GoToVEditQuotation(qItem.id);
                      showAddProposalEdit = true
                    "
                    class="bg-indigo-500 text-white text-xs px-3 py-1 rounded hover:bg-indigo-600 transition"
                  />

                  <!-- Approve -->
                  <div v-if="(userStore.loggedUser.granted?.includes('cso') || userStore.loggedUser.granted?.includes('su'))">
                    <LinkBtn
                      v-show="!qItem.isApproved"
                      label="Approve"
                      @click="
                        quotationStore.curQuotation = qItem;
                        GoToApprove(qItem.id);
                      "
                      class="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600 transition"
                    />
                  </div>

                  <!-- View Quotation -->
                  <LinkBtn
                    label="View PDF"
                    @click="
                      quotationStore.curQuotation = qItem;
                      GoToViewQuotation(qItem.id);
                    "
                    class="bg-gray-500 text-white text-xs px-3 py-1 rounded hover:bg-gray-600 transition"
                  />

                  <!-- View Invoice -->
                  <!-- <LinkBtn
                    v-show="qItem.status === 'Approved'"
                    label="View Invoice"
                    @click="
                      quotationStore.curQuotation = qItem;
                      GoToViewInvoice(qItem.id);
                    "
                    class="bg-purple-500 text-white text-xs px-3 py-1 rounded hover:bg-purple-600 transition"
                  /> -->

                  <!-- Delete Quotation -->
                  <!-- <LinkBtn
                    label="Delete"
                    @click="
                      quotationStore.curQuotation = qItem;
                      DeleteQuotationVersion(qItem.id);
                    "
                    class="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition"
                  /> -->
                </div>
              </div>
            </div>
            <!-- end qcards -->
          </div>
        </div>
      </div>
      <!-- <div class="flex justify-between items-center mt-6">
        <button @click="closeModal" class="cancel-button">Back</button>
      </div> -->
    </div>
    <AdddEdit
      v-if="isVerion && showAddProposalEdit"
      :quotationNo ="quotationStore.curQuotation.quotationNo"
      :isVerion="isVerion" 
      :customerRef="customerRef"
      :quotation-data="quotationStore.editQuotation"
      @close="showAddProposalEdit = false"
    />
  </section>
</template>

<script>
import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
import { useUserStore } from "~/stores/modules/userStore";
import closebtn from "~/components/customcontrol/modal_close_button";


import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import ImageLable from "~/components/customcontrol/ImageLable";
import LinkBtn from "~/components/customcontrol/Link";
import AdddEdit from "~/components/qms/quotation/addedit.vue"



export default {
  components: { closebtn, LinkBtn,Lable,Button,ImageLable,AdddEdit },
  props: ['customerRef'],
  data() {
    return {
      imageroot: "",
      quotationStore: null,
      isVerion: false,
      isOpen: true,
      showAddProposalEdit: false,
    };
  },
  async created() {
    this.quotationStore = useQuotationStore();  
    this.imageroot = this.quotationStore.initQuotation.baseUrl;
    this.showLoading = this.$showLoading;
    this.userStore = useUserStore();

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

      let url = `${this.imageroot}/Quotation/${id}.pdf`;
      window.open(url, "_blank");
    },
    // GoToViewInvoice(id) {
    //   //https://learners.lk:5005/web/assets/DTP/Quotation/Q2025030003-V3.pdf

    //   let url = `${this.imageroot}/DTL/Invoice/${id}.pdf`;
    //   window.open(url, "_blank");

    //   //link to Invoice view
    // },
        
    async GoToVEditQuotation(id) {
      await this.quotationStore.GetEditQuotationById(id, this.showLoading);
      this.isVerion = true;
      this.isOpen = false; 
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

/* button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
} */

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
