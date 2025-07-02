<template>
  <section class="justify-center">
    <div v-if="!showAddProposal && !showProposalVersions && !showInvoice && !showWorkFlow" >
      <div class="flex flex-col items-center justify-between -mt-4 mb-2 md:flex-row">
        <div class="w-full mb-4 md:mb-0">  
          <div class="text-2xl uppercase">Orders</div>
        </div>
        <div class="w-full md:w-auto">
          <div class="mr-2">

          </div>
        </div>
      </div>

      <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />
      <div class="max-h-[660px] overflow-y-auto space-y-4">
        <div
          class="flex flex-col gap-3 p-3 mt-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow sm:p-4"
          v-for="(qItem, index) in quotationStore.listQuotation"
          :key="index"
        >
          <!-- Top section: Details -->
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Proposal No.</h1>
              <p class="text-sm font-semibold text-blue-600">{{ qItem.quotationNo }}</p>
            </div>
            <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Company</h1>
              <p class="text-sm text-gray-700">{{ qItem.vendor }}</p>
            </div>
            <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Total</h1>
              <p class="text-sm font-semibold text-gray-800">Rs.{{ qItem.qutationValue }}</p>
            </div>
            <div class="hidden sm:block w-px bg-gray-300 h-8"></div>

            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600">Status</h1>
              <span
                :class="{
                  'bg-green-100 text-green-700': qItem.status === 'Approved',
                  'bg-yellow-100 text-yellow-700': qItem.status === 'Pending',
                  'bg-red-100 text-red-700': qItem.status === 'Rejected'
                }"
                class="text-xs font-semibold px-2 py-0.5 rounded-full"
              >
                {{ qItem.status }}
              </span>
            </div>
          </div>

          <!-- Sales Exec -->
          <div class="text-xs text-red-500 font-medium">
            Sales Exec: <span class="text-gray-700">{{ qItem.salesExec }}</span>
          </div>

          <!-- Items list -->
          <div class="text-xs text-gray-700">
            <span class="font-medium uppercase text-gray-800">Items:</span>
            <ul class="list-disc list-inside ml-2">
              <li v-for="(qProduct, index) in qItem.items" :key="index">{{ qProduct }}</li>
            </ul>
          </div>

          <!-- Button group -->
          <div class="flex flex-wrap justify-end gap-1 mt-1">
            <LinkBtn
              label="Invoice"
              class="text-xs font-medium"
              @click="
                GoToInvoice(qItem.id);
                showInvoice = true
              "
            />
            <LinkBtn
              label="Work Flow"
              class="text-xs font-medium"
              @click="
                GoToWorkFlow(qItem.id);
                showWorkFlow = true
              "
            />
            <LinkBtn
              label="View PDF"
              class="text-xs font-medium"
              @click="
                quotationStore.curQuotation = qItem;
                GoToViewQuotation(qItem.id);
              "
            />
            <LinkBtn
              v-if="qItem.status === 'Approved'"
              label="View Invoice"
              class="text-xs font-medium"
              @click="
                quotationStore.curQuotation = qItem;
                GoToViewInvoice(qItem.id);
              "
            />
          </div>
        </div>
        <div v-if="!quotationStore.listQuotation.length" class="mt-4 text-center text-blue-950">
          No Proposals found.
        </div>
      </div>
    </div>
    <ViewMore
      v-if="isViewMore && showProposalVersions"
      @close="isViewMore = !isViewMore; showProposalVersions = false"
      @Approve="isApproving = true"
    />
    <AddEdit
      v-if="isAddEdit && showAddProposal"
      @close="isAddEdit = false; showAddProposal = false"
    />
    <ApproveView 
      v-if="isApproving" 
      @close="CloseApprovingView()"  
    />
    <Invoice
      v-if="isViewMore && showInvoice"
      @close="isViewMore = false; showInvoice = false"
    />
    <WorkFlow v-if="isViewMore && showWorkFlow"
      @close="isViewMore = false; showWorkFlow = false"
    />

</section>
</template>

<script>
import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import LinkBtn from "~/components/customcontrol/Link";
import SearchComp from "~/components/customcontrol/SearchComp";
import FilterTab from "~/components/customcontrol/FilterTab";

import ViewMore from "~/components/qms/quotation/viewmore";
import ApproveView from "~/components/qms/quotation/approve";
import AddEdit from "~/components/qms/quotation/addedit.vue";
import Invoice from "~/components/qms/invoice/index.vue";
import WorkFlow from "~/components/qms/workFlow/index.vue"



import { useQuotationStore } from "~/stores/modules/qms/quotationStore";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: {
    Lable,
    Button,
    LinkBtn,
    FilterTab,
    SearchComp,
    ViewMore,
    ApproveView,
    AddEdit,
    Invoice,
    WorkFlow,
  },
  data() {
    return {
      isViewMore: false,
      isApproving: false,
      isAddEdit: false,
      showAddProposal: false,
      showProposalVersions: false,
      searchBy: "",
      // arrFilter: [
      //  {itemName: "All", itemCount:n },
      //     {itemName: "Pending", itemCount:n },
      //        {itemName: "Approved", itemCount:n},
      //           {itemName: "Cancelled", itemCount:n },                 	   
      // ],
      imageroot: "",
      showLoading:null,
    
    };
  },
  async created() {
    this.quotationStore = useQuotationStore();
    this.showLoading = this.$showLoading;

    await this.quotationStore.loadListQuotations({
      keyword: "",
      searchBy: this.searchBy,
    },this.showLoading);
   
    // await this.quotationStore.loadInitQuotation(this.showLoading);
    // this.imageroot = this.quotationStore.initQuotation.baseUrl;

 
  },
  methods: {   


    GoToAddNew() {
      if (this.quotation.isVerion === '') {
        this.isAddEdit = true;
      }
    },
    GoToAddNew() {
      this.quotationStore.ResetQuotation();
      this.isAddEdit = true;
    },

    async GoToViewAllQuoVer() {
      let id = this.quotationStore.curQuotation.id;
      await this.quotationStore.LoadQuotationVersions(id,this.showLoading);
      this.isViewMore = true;
    },

    async GoToInvoice() {
      let id = this.quotationStore.curQuotation.id;
      this.isViewMore = true;
    },

    async GoToWorkFlow() {
      let id = this.quotationStore.curQuotation.id;
      this.isViewMore = true;
    },


    async CloseApprovingView() {
      let id = this.quotationStore.curQuotation.id;
      await this.quotationStore.LoadQuotationVersions(id,this.showLoading);
    
    },

    GoToViewQuotation(id) {
      //https://learners.lk:5005/web/assets/DTP/Quotation/Q2025030003-V3.pdf
      let url = `${this.imageroot}/DTL/Quotation/${id}.pdf`;
      window.open(url, "_blank");
    },
    GoToViewInvoice(id) {},
  },
};
</script>

<style scoped>
.btn {
  background-color: #072556;
}
</style>
