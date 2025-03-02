<template>
  <div>
    <section class="justify-center min-h-screen px-4 lg:px-80 mt-24">
      <div class="uppercase text-2xl">Quotation</div>
      <div class="flex flex-col items-center justify-between mt-2 md:flex-row">
        <div class="w-full mb-4 md:mb-0">
          <div class="mr-2">
            <Button
              class="w-24"
              label="New"
              variant="primary"
              @click="goToProformaInvoice"
            />
          </div>
        </div>
        <div class="w-full md:w-auto">
          <SearchComp @DoSearch="GetSearch" />
        </div>
      </div>

      <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />
      


      <div
        class="flex flex-col gap-5 p-2 mt-10 bg-white border-2 rounded-md shadow-md sm:p-6" v-for="(qItem,index) in QuotationStore.listQuotation" :key="index"
      >
      {{ qItem }}
        <div class="flex flex-col justify-between sm:flex-row">
          <!-- Section 1 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Quotation No.</h1>
            <p class="text-sm text-gray-500">{{qItem.quotationNo}}</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 2 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Company</h1>
            <p class="text-sm text-gray-500">{{qItem.company}}</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 3 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Contact</h1>
            <p class="text-sm text-gray-500">{{qItem.contact}}</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 4 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Sales Ex:</h1>
            <p class="text-sm text-gray-500">{{qItem.salesExec}}</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 5 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Total</h1>
            <p class="text-sm text-gray-500">{{qItem.total}}</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

         

          <!-- Section 7 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Status</h1>
            <span
              class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
            >
            {{qItem.status}}
            </span>
          </div>
        </div>
        
        
        <div class="text-green-500">
          <span class="uppercase text-black">Items -> </span>
          <span v-for="(qProduct,index) in qItem.items" :key="index">
          <span>{{qProduct}}</span> |
       
        </span>
        </div>

        <div class="flex gap-x-4 mt-2.">
          <!-- Button Group -->
          <div
            class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
          >
            <LinkBtn
              label="View More"
              @click="
                vendorStore.curVendor = vd;
                GoToViewMore();
              "
            />
          </div>

          <div
            class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
          >
            <LinkBtn
              label="View All Quo."
              @click="
                vendorStore.curVendor = vd;
                GoToViewAllQuo();
              "
            />
          </div>

          <div
            class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
          >
            <LinkBtn 
              label="Upload Approval Proof"
              @click="
                vendorStore.curVendor = vd;
                GoToApprove();
              "
            />
          </div>

          <div
            class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
          >
            <LinkBtn
              label="View Quotation"
              @click="
                vendorStore.curVendor = vd;
                GoToViewQuotation();
              "
            />
          </div>

          <div
            class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end"
          >
            <LinkBtn
              label="View Invoice"
              @click="
                vendorStore.curVendor = vd;
                GoToViewInvoice();
              "
            />
          </div>
        </div>
      </div>



    </section>
  </div>
</template>

<script>
import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import LinkBtn from "~/components/customcontrol/Link";
import SearchComp from "~/components/customcontrol/SearchComp";
import FilterTab from "~/components/customcontrol/FilterTab";

import { useQuotationStore } from "~/stores/modules/quotationStore";

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
  },
  data() {
    return {
      searchBy: "",
      arrFilter: ["All", "Pending", "Approved", "Cancelled"],
    };
  },
  async created() {
    this.QuotationStore = useQuotationStore();
   // await this.vendorStore.loadListVendors({keyword:'',searchBy:this.searchBy})  
   // await this.vendorStore.loadInitVendor()   
  },
  methods: {
    
  },
};
</script>

<style scoped>
.btn {
  background-color: #072556;
}
</style>
