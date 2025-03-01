<template>
  <div>
    <section class="justify-center min-h-screen px-4 lg:px-80 mt-24">
        <div class="uppercase text-2xl">Quotations</div>
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
            <SearchComp @DoSearch="GetSearch"/>
        </div>
      </div>
      
      <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />

      <div
        class="flex flex-col gap-5 p-2 mt-10 bg-white border-2 rounded-md shadow-md sm:p-6"
      >
        <div class="flex flex-col justify-between sm:flex-row">
          <!-- Section 1 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Quotation Id</h1>
            <p class="text-sm text-gray-500">AE51156</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 2 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Company</h1>
            <p class="text-sm text-gray-500">abans group of company</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 3 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Contact</h1>
            <p class="text-sm text-gray-500">silva - 0718542367</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 4 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Sales Ex:</h1>
            <p class="text-sm text-gray-500">Saman - 0714587425</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 5 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Total</h1>
            <p class="text-sm text-gray-500">LKR: 25000.00</p>
          </div>
          <hr class="block w-full border-gray-300 sm:hidden" />
          <div class="hidden w-px h-12 bg-gray-300 sm:block"></div>

          <!-- Section 6 -->
          <!-- <div class="flex flex-col text-center sm:text-left">
                    <h1 class="text-base font-semibold text-gray-700">Total</h1>
                    <p class="text-sm text-gray-500">LKR: 25000.00</p>
                    </div>
                    <hr class="block w-full border-gray-300 sm:hidden" />
                    <div class="hidden w-px h-12 bg-gray-300 sm:block"></div> -->

          <!-- Section 7 -->
          <div class="flex flex-col text-center sm:text-left">
            <h1 class="text-base font-semibold text-gray-700">Status</h1>
            <span
              class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
            >
              Active
            </span>
          </div>
        </div>

        <!-- Button Group -->
        <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end">
            <LinkBtn label="View More"   @click="
              vendorStore.curVendor = vd;
              GoToViewMore();   stooed here
            " /> 
          <button
            @click="openModal('view')"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            View Quotation
          </button>
          <button
            @click="openModal('upload')"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            Upload Approval Proof
          </button>
          <button
            @click="openModal('')"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            View Proforma
          </button>
          <button
            @click="openModal('')"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            View Invoice
          </button>
          <button
            @click="openModal('')"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            View Tax Invoice
          </button>
          <button
            @click="openModal('')"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
          >
            View All Quo.
          </button>
        </div>
      </div>
      <div class="flex items-center justify-center mt-10">
        <nav aria-label="Page navigation example">
          <ul class="flex items-center h-10 -space-x-px text-base">
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >1</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >2</a
              >
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="z-10 flex items-center justify-center h-10 px-4 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >3</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >4</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >5</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
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
  methods: {
    goToProformaInvoice(){

    },
    async GetSearch(searchVal) {
        //await  this.vendorStore.loadListVendors({keyword:searchVal,searchBy:this.searchBy})   
    },


    //     SetSelectedFilter(type){
    //   this.searchBy = type;
    // },
    // openModal(type) {
    //     this.isModalOpen[type] = true;
    // },
    // closeModal(type) {
    //     this.isModalOpen[type] = false;
    // },
    // deleteVendor() {
    //     // Logic for deleting the vendor
    //     this.closeModal('delete');
    // },
    // restoreVendor() {
    //     // Logic for restoring the vendor
    //     this.closeModal('restore');
    // },
    // goToProformaInvoice() {
    //     this.$router.push('/Invoicing/invoice');
    // },
    // closeModal(modalType) {
    // // Close the modal based on the type
    // this.isModalOpen[modalType] = false;
    // },
    // closeModal(modal) {
    //     if (modal === 'upload') {
    //         this.isModalOpen.upload = false; // Close the upload modal
    //     }
    // },
  },
};
</script>

<style scoped>
.btn {
  background-color: #072556;
}
</style>
