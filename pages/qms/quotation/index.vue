<template>

<section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80">
    <div class="text-2xl uppercase">Proforma</div>
    <div
      class="flex flex-col items-center justify-between mt-2 mb-8 md:flex-row"
    >
      <div class="w-full mb-4 md:mb-0">
        <div class="mr-2">
          <Button
            class="w-24"
            label="New"
            variant="primary"
            @click="GoToAddNew"
          />
        </div>
      </div>
      <div class="w-full md:w-auto">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>

      <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />
      {{ listQuotation }}
      <div
        class="flex flex-col gap-5 p-2 mt-2 bg-white border-2 rounded-md shadow-md sm:p-6"
        v-for="(qItem, index) in quotationStore.listQuotation"
        :key="index"
      >
        <div class="flex flex-col justify-between sm:flex-row">
          <!-- Section 1 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Quotation No.</h1>
            <p class="text-blue-500 text-md">{{ qItem.quotationNo }}</p>
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

        <div class="-my-4 text-red-400">
          Sales Exec. : {{ qItem.salesExec }}
        </div>

        <div class="text-green-500">
          <span class="text-black uppercase">Items -> </span>
          <span v-for="(qProduct, index) in qItem.items" :key="index">
            <div>{{ qProduct }}</div>
          </span>
        </div>

        <div class="flex -my-4 gap-x-4">
          <!-- Button Group -->

          <div
            class="relative grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
          >
            <span
              class="absolute top-0 left-0 px-2 text-white bg-blue-500 rounded-full"
              >{{ qItem.noOfVersions }}</span
            >
            <LinkBtn
              label="View Quo. Versions"
              class="ml-3"
              @click="
                quotationStore.curQuotation = qItem;
                GoToViewAllQuoVer(qItem.id);
              "
            />
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
          >
            <LinkBtn
              v-if="qItem.status == 'Approved'"
              label="View Invoice"
              @click="
                quotationStore.curQuotation = qItem;
                GoToViewInvoice(qItem.id);
              "
            />
          </div>
        </div>
      </div>

      <div v-if="!quotationStore.listQuotation.length" class="mt-4 text-center text-blue-950">
        No quotations found.
      </div>

      <ViewMore
        v-if="isViewMore"
        @close="isViewMore = !isViewMore"
        @Approve="isApproving = true"
      />
      <ApproveView v-if="isApproving" @close="CloseApprovingView()"  />
      <AddEdit v-if="isAddEdit" @close="isAddEdit = false" />
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
  },
  data() {
    return {
      isViewMore: false,
      isApproving: false,
      isAddEdit: false,
      searchBy: "",
      arrFilter: ["All", "Pending", "Approved", "Cancelled"],
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
