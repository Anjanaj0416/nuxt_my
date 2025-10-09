<template>
  <!-- <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80"> -->
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">
    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="text-2xl uppercase">Vendors</div>
        <!-- <div class="mr-2">
          <Button
            class="w-24"
            label="New"
            variant="primary"
            @click="GoToAddNew"
          />
        </div> -->
      </div>
      <div class="w-full md:w-auto flex items-center gap-2">
        <!-- Dropdown -->
        <select
          v-model="searchBy"
          @change="SetSelectedFilter"
          class="w-44 border border-gray-300 rounded-full focus:outline-none 
                focus:ring-2 focus:ring-blue-500 px-4 py-3 text-gray-700"
        >
          <option disabled value="" class="bg-blue-900 text-white">Filter By</option>
          <option value="orderno">Order No</option>
          <option value="customerRef">Customer Ref</option>
          <option value="shopName">Shop Name</option>
          <option value="CSONo">CSO No</option>

        </select>
        <!-- 
         class="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center 
                 w-10 h-10 bg-yellow-400 rounded-full hover:bg-yellow-500 transition duration-200" -->


        <!-- Search -->
        <div class="w-full md:w-96">
          <SearchComp @DoSearch="GetSearch" />
        </div>
      </div>

    </div>


    <!-- <FilterTab @selected="SetSelectedFilter"
      :arrFilter="vendorStore.initVendor?.vendorViewItemCount ? Object.values(vendorStore.initVendor.vendorViewItemCount) : {}" /> -->

    <!-- {{ vendorStore.initVendor.vendorViewItemCount }} -->

    <div v-if="vendorStore.listVendor.length === 0" class="text-center text-gray-900 mt-5 text-sm font-medium">
      <p>No vendors available...</p>
    </div>
    <!-- {{ vendorStore.listVendor }} -->
    <div v-for="vd in vendorStore.listVendor" :key="vd.id">
      <div class="flex flex-col gap-0 p-4 mt-2  border-2 rounded-md shadow-md sm:p-4" :class="{
        'bg-red-50': vd.isActive === false,
        'bg-white': vd.isActive === true,
        'bg-white': vd.isActive === undefined
      }">
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-8 sm:grid-cols-7 md:grid-cols-8">
            <!-- Shop Logo -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600"></h1>
              <p class="flex items-center justify-center h-16 text-center">
                <ImageLable v-if="vd.shopLogo" :imageUrl="imageroot + '/' + vd.shopLogo" alt="Shop Logo" />
                <ImageLable v-else :imageUrl="defaultShopImage" alt="Default Shop Logo" />
              </p>
            </div>

            <!-- Customer Ref -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-semibold text-gray-600">Customer Ref</h1>
              <p class="text-xs text-gray-500 mt-0.5">
                <span v-if="vd.customerRef">{{ vd.customerRef }}</span>
                <span v-else class="italic text-gray-400">no data</span>
              </p>
            </div>

            <!-- Shop Name -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-semibold  text-gray-600">Shop Name</h1>
              <p class="text-xs text-gray-500 mt-0.5">
                <span v-if="vd.shopName">{{ vd.shopName }}</span>
                <span v-else class="italic text-gray-400">no data</span>
              </p>
            </div>

            <!-- Shop Contact -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-semibold text-gray-600">Shop Contact</h1>
              <p class="text-xs text-gray-500 mt-0.5">
                <span v-if="vd.shopContactNo">{{ vd.shopContactNo }}</span>
                <span v-else class="italic text-gray-400">no data</span>
              </p>
            </div>

            <!-- Email -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-semibold text-gray-600">Email</h1>
              <p class="text-xs text-gray-500 mt-0.5">
                <span v-if="vd.shopEmail">{{ vd.shopEmail }}</span>
                <span v-else class="italic text-gray-400">no data</span>
              </p>
            </div>

            <!-- CSONo -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-semibold text-gray-600">CSONo</h1>
              <p class="text-xs text-gray-500 mt-0.5">
                <span v-if="vd.csoNo">{{ vd.csoNo }}</span>
                <span v-else class="italic text-gray-400">no data</span>
              </p>
            </div>

            <!-- Status -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-semibold text-gray-600">Status</h1>
              <span :class="{
                  'bg-green-100 text-green-700': vd.isActive === true,
                  'bg-red-100 text-red-700': vd.isActive === false,
                  'bg-gray-100 text-gray-700': vd.isActive === undefined,
                }" class="text-xs font-medium px-2.5 py-0.5 rounded-full inline-block mt-1">
                {{ vd.isActive ? "Active" : "Inactive" }}
              </span>
            </div>

            <!-- QR Code -->
            <div class="flex flex-col text-center sm:text-left">
              <h1 class="text-xs font-medium text-gray-600"></h1>
              <p class="flex items-center justify-center text-center">
                <span
                  class="cursor-pointer"
                  @click="handleQrClick(vd)"
                  title="Click to open store and PDF"
                >
                  <img
                    v-if="vd.qrImageUrl"
                    :src="imageroot + '/' + vd.qrImageUrl"
                    class="object-cover w-16 h-16 rounded-md"
                    title="Store QR"
                  />
                </span>
              </p>
            </div>
          </div>

        </div>

        <!-- Expandable More Section -->
        <!-- <div class="flex flex-col items-center gap-1 mt-1 mb-2 sm:flex-row sm:justify-end sm:mb-0 sm:mt-0 sm:-my-3">
          
        </div> -->

        <div class="sm:flex sm:justify-end sm:gap-4">
            <div class="grid grid-cols-3 gap-2 sm:flex sm:gap-4 text-sm font-medium text-gray-500 "
              @click="filterSelectedVendor(vd.id)">
            <!-- <button v-if="vendorTabs[vd.id] !== 'proposal'"
              @click="vendorTabs[vd.id] = 'proposal'; quotationStore.curVendorId = vd.id" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                'border-transparent hover:text-gray-600 hover:border-gray-300'
              ]">
              Proposals
            </button>

            <button v-if="vendorTabs[vd.id] === 'proposal'"
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close Proposal
            </button> -->

            <button  
              v-if="
                (userStore.loggedUser.granted.includes('su') ||
                userStore.loggedUser.granted.includes('sso')) &&
                vendorTabs[vd.id] !== 'isuePINo'
              "
              @click="vendorTabs[vd.id] = 'isuePINo'; quotationStore.curVendorId = vd.id" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'isuePINo'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 '
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              ]">
              Issue PI No.
            </button>

            <button 
              v-if="
                (userStore.loggedUser.granted.includes('su') ||
                userStore.loggedUser.granted.includes('sso')) &&
                vendorTabs[vd.id] === 'isuePINo'
              "
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close Issue PI No.
            </button>


            <button v-if="vendorTabs[vd.id] !== 'order' &&  vendorStore.initVendor.isOrdersFound"
              @click="vendorTabs[vd.id] = 'order'; quotationStore.curVendorId = vd.id" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'order'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              ]">
              Orders
            </button>
            <button v-if="vendorTabs[vd.id] === 'order' "
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close Orders
            </button>
            

            <button
              v-if="vendorTabs[vd.id] === 'invoice'"
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent "
            >
              Close Invoices
            </button>

            <button v-if="vendorTabs[vd.id] !== 'order'"
              @click="vendorTabs[vd.id] = 'order'; quotationStore.curVendorId = vd.id" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'order'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              ]">
              Order
            </button>


            <button v-if="vendorTabs[vd.id] !== 'viewMore'"
              @click="vendorTabs[vd.id] = 'viewMore'; quotationStore.curVendorId = vd.id ; GoToView(vd.id)" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'viewMore'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 '
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              ]">
              View More
            </button>

            <button v-if="vendorTabs[vd.id] === 'viewMore'"
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close View More
            </button>

            <button v-if=" 
                (userStore.loggedUser.granted.includes('su') ||
                userStore.loggedUser.granted.includes('sso')) &&
                vendorTabs[vd.id] !== 'edit'
              "
              @click="vendorTabs[vd.id] = 'edit'; quotationStore.curVendorId = vd.id; GoToAddEdit(vd.id)" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'edit'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 '
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              ]">
              Edit
            </button>
            <!-- Show this only when in 'proposal' mode -->
            <button v-if="
                (userStore.loggedUser.granted.includes('su') ||
                userStore.loggedUser.granted.includes('sso')) &&
                vendorTabs[vd.id] === 'edit'
              "
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close Edit
            </button>

            <button v-if=" 
                (userStore.loggedUser.granted.includes('su') ||
                userStore.loggedUser.granted.includes('sso')) &&
                vendorTabs[vd.id] !== 'workFlow'
              "
              @click="vendorTabs[vd.id] = 'workFlow'; quotationStore.curVendorId = vd.id " :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'workFlow'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 '
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              ]">
              Work Flow
            </button>
            <!-- Show this only when in 'proposal' mode -->
            <button v-if="
                (userStore.loggedUser.granted.includes('su') ||
                userStore.loggedUser.granted.includes('sso')) &&
                vendorTabs[vd.id] === 'workFlow'
              "
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close Work Flow
            </button>
          </div>
        </div>


        <!-- Tab Contents -->
        <div class="p-0 dark:border-gray-700">
          <div v-if="vendorTabs[vd.id] === 'proposal'">
            <Proposal :customerRef="vd.customerRef"/>
          </div>
          <!-- <div v-if="vendorTabs[vd.id] === 'invoice'">
            <Invoice />
          </div> -->
          <div v-if="vendorTabs[vd.id] === 'isuePINo'">
            <IsuePINo :vendorId="vd.id" @close="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"/>
          </div>
          <div v-if="vendorTabs[vd.id] === 'order'">
            <Order :customerRef="vd.customerRef" :id="vd.id"/>
          </div>
          <div v-if="vendorTabs[vd.id] === 'viewMore'">
            <MoreVendor :vendorId="vd.id"/>
          </div>
          <div v-if="vendorTabs[vd.id] === 'edit'">
            <AddEdit :key="vd.id" :Id="vd.id" @close="vendorTabs[vd.id] = ''" />
          </div>
          <div v-if="vendorTabs[vd.id] === 'workFlow'">
            <WorkFlow :vendorId="vd.id" />
          </div>
        </div>
      </div>
    </div>



    <AssignRso v-if="isAssignRso" @close="isAssignRso = !isAssignRso" />
  </section>
</template>

<script>
import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import ImageLable from "~/components/customcontrol/ImageLable";
import LinkBtn from "~/components/customcontrol/Link";
import AddEdit from "~/components/qms/vendor/addedit";
import AssignRso from "~/components/qms/vendor/assignSalesEx";
import FilterTab from "~/components/customcontrol/FilterTab";
import SearchComp from "~/components/customcontrol/SearchComp";
import InfoCard from "~/components/qms/vendor/InfoCard.vue";
import Proposal from "~/components/qms/quotation/proposaldetails.vue";
import Invoice from "~/components/qms/invoice/index.vue";
import Order from "~/components/qms/order/index";
import IsuePINo from "~/components/qms/isuePINo/index.vue"
import defaultShop from "~/assets/img/digitalTechLabs/defaultShopImage.png"
import MoreVendor from "~/components/qms/vendor/moreVendor.vue";


import WorkFlow from "~/components/qms/workFlow/index.vue"

import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import { useUserStore } from "~/stores/modules/userStore";
import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
import { useRoute } from 'vue-router'
import { ref } from 'vue'


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: {
    Lable,
    Button,
    LinkBtn,
    AddEdit,
    AssignRso,
    FilterTab,
    SearchComp,
    InfoCard,
    ImageLable,
    Proposal,
    Invoice,
    WorkFlow,
    Order,
    IsuePINo,
    MoreVendor

  },
  data() {
    return {
      defaultShopImage: defaultShop,
      isMore: false,
      activeVendorId: "",
      rowIndex: -1,
      isAddEdit: false,
      isAssignRso: false,
      keyword: "",
      listVendor: [],
      curIndex: -1,
      searchBy: "",
      searchVal: "",
      imageroot: "",
      showLoading: null,
      vendorTabs: {},
    };
  },
  async created() {
    try {
      this.vendorStore = useVendorStore();
      this.userStore = useUserStore();
      this.quotationStore = useQuotationStore();
      this.showLoading = this.$showLoading;

      const route = useRoute();
      let val = route.query.p;
   
      let isGuid = false;
      if (val !== undefined) isGuid = val.includes('-');


      await this.vendorStore.loadListVendors(
        { keyword: (isGuid) ? val : '', searchBy: (isGuid) ? 'id' : '' },
        this.showLoading
      );

      await this.vendorStore.loadInitVendor(this.showLoading);
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
      this.vendorStore.listVendor.forEach(vd => {
        this.vendorTabs[vd.id] = 'profile';
      });
    } catch (error) {
      console.error("error:", error);
    }
  },

  methods: {

    handleQrClick(vd) {
      const pdfUrl = this.imageroot + vd.qrPdfUrl;
      const storeUrl =  vd.storeUrl;
      // Open storeUrl in new tab
        console.log(storeUrl)
      window.open(storeUrl, '_blank');
      // Open pdfUrl in current tab
    
      window.open(pdfUrl, '_blank');
      
      // If you want qrImageUrl, consider opening it from that page or via a link
    },

    async SetSelectedFilter(event) {
      this.searchBy = event.target.value;
      await this.GetSearch();
    },

    async GetSearch(searchVal) {

      this.keyword = searchVal || "";

      console.log("keyword, searchBy", this.keyword, this.searchBy);

      await this.vendorStore.loadInitVendor(this.showLoading);

      await this.vendorStore.loadListVendors(
        { keyword: this.keyword, searchBy: this.searchBy },
        this.showLoading
      );

      this.keyword = "";

    },

    // async toggleMoreEdit(id) {
    //   console.log('toggleMoreEdit called', {
    //     isMore: this.isMore,
    //     activeVendorId: this.activeVendorId,
    //     clickedId: id,
    //   });

    //   if (this.isMore && String(this.activeVendorId) === String(id)) {
    //     console.log('Calling closeMoreEdit');
    //     this.closeMoreEdit();
    //   } else {
    //     await this.vendorStore.GetVendorById(id, this.showLoading);
    //     this.activeVendorId = String(id);
    //     this.isMore = true;
    //   }
    // },

    // closeMoreEdit() {
    //   console.log("closeMoreEdit called");
    //   this.isMore = false;
    //   this.activeVendorId = null;
    // },

    filterSelectedVendor(selectedId) {
      let selectedVendor = this.vendorStore.listVendor.find(item => item.id === selectedId);
      if (selectedVendor) {
        this.vendorStore.listVendor = [selectedVendor];
      }
    },

    GoToAddNew() {
      this.vendorStore.ResetVendor();
      this.isAddEdit = true;
    },

    async GoToView(id) {
      await this.vendorStore.GetVendorById(id, this.showLoading);
    },

    async GoToAddEdit(id) {
      await this.vendorStore.GetVendorById(id, this.showLoading);
    },

    async GoToAssignSalesEx(id) {
      await this.vendorStore.GetVendorById(id, this.showLoading);
      this.isAssignRso = true;
    },
    GoToQuotation() {
      //this.isAssignRso = true;
      this.$router.push("/qms/quotation");
    },
    DeleteVendor(vendor) {
      if (confirm("Are you sure you want to delete this vendor?")) {
        this.vendorStore.DeleteVendor(vendor);
      }
    },

    RestoreVendor(vendor) {
      if (confirm("Do you want to restore this vendor?")) {
        this.vendorStore.restoreVendor(vendor);
      }
    },
  },
};
</script>

<style scoped>
  .csscmd {
    @apply p-2 text-center bg-blue-200 rounded;
  }

  .csscmd:hover {
    @apply bg-blue-200 cursor-pointer;
  }

  .cssBox {
    border: 1px solid;
    @apply border-blue-600 rounded p-2;
  }

  .cssDataSec {
    max-height: 400px;
    /* Limit height */
    @apply overflow-y-auto;
    /* Enable vertical scrolling */
    margin-top: 20px;
    /* Spacing for the scrollable section */
  }
</style>
