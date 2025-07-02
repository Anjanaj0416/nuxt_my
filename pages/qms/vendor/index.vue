<template>
  <!-- <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80"> -->
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">


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
      <div class="w-full md:w-auto">
        <SearchComp @DoSearch="GetSearch" />
      </div>
    </div>



    <FilterTab @selected="SetSelectedFilter" :arrFilter="vendorStore.initVendor.vendorViewItemCount" />

   

    <div v-if="vendorStore.listVendor.length === 0" class="text-center text-gray-900 mt-5 text-sm font-medium">
      <p>No vendors available...</p>
    </div>
    <div v-for="vd in vendorStore.listVendor" :key="vd.id">
      <div class="flex flex-col gap-0 p-4 mt-2  border rounded-lg shadow-sm sm:p-6" :class="{
        'bg-red-50': vd.isActive === false,
        'bg-gray-50': vd.isActive === true,
        'bg-white': vd.isActive === undefined
      }">
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-8 sm:grid-cols-7 md:grid-cols-8">
            <div class="flex flex-col text-center sm:text-left" v-for="(field, idx) in vendorFields" :key="idx">
              <h1 class="text-xs font-medium text-gray-600">
                {{ field.label }}
              </h1>

              <p v-if="field.key === 'shopLogo'" class="flex items-center justify-center h-16 text-center">
                <ImageLable :imageUrl="imageroot + `/${vd[field.key]}`" alt="Shop Logo" v-if="vd[field.key]" />
                <span v-else class="text-xs text-gray-500">No Shop Logo</span>
              </p>

              <p v-else-if="field.key !== 'isActive'" class="text-xs text-gray-500 mt-0.50">
                {{ vd[field.key] }} {{ field.secondKey ? vd[field.secondKey] : "" }}
              </p>

              <span v-else :class="{
                'bg-green-100 text-green-700': vd.isActive === true,
                'bg-red-100 text-red-700': vd.isActive === false,
                'bg-gray-100 text-gray-700': vd.isActive === undefined,
              }" class="text-xs font-medium px-2.5 py-0.5 rounded-full inline-block mt-1">
                {{ vd.isActive ? "Active" : "Inactive" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Expandable More Section -->
        <!-- <div class="flex flex-col items-center gap-1 mt-1 mb-2 sm:flex-row sm:justify-end sm:mb-0 sm:mt-0 sm:-my-3">
          
        </div> -->

        <div class="sm:flex sm:justify-end sm:gap-4">
          <div class="grid grid-cols-3 gap-2 sm:flex sm:gap-4 text-sm font-medium text-gray-500 "
            @click="filterSelectedVendor(vd.id)">
            <button v-if="vendorTabs[vd.id] !== 'proposal'"
              @click="vendorTabs[vd.id] = 'proposal'; quotationStore.curVendorId = vd.id" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                'border-transparent hover:text-gray-600 hover:border-gray-300'
              ]">
              Proposals
            </button>

            <!-- Show this only when in 'proposal' mode -->
            <button v-if="vendorTabs[vd.id] === 'proposal'"
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close Proposal
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

            <button v-if="vendorTabs[vd.id] !== 'viewMore'"
              @click="vendorTabs[vd.id] = 'viewMore'; quotationStore.curVendorId = vd.id" :class="[
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

            <button v-if="vendorTabs[vd.id] !== 'edit'"
              @click="vendorTabs[vd.id] = 'edit'; quotationStore.curVendorId = vd.id; GoToAddEdit(vd.id)" :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'edit'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 '
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
              ]">
              Edit
            </button>
            <!-- Show this only when in 'proposal' mode -->
            <button v-if="vendorTabs[vd.id] === 'edit'"
              @click="vendorTabs[vd.id] = ''; quotationStore.curVendorId = null"
              class="p-4 border-b-2 rounded-t-lg text-center text-red-600 border-transparent ">
              Close Edit
            </button>

            <!-- <button
              @click="vendorTabs[vd.id] = 'workFlow'; quotationStore.curVendorId = vd.id"
              :class="[
                'p-4 border-b-2 rounded-t-lg text-center',
                vendorTabs[vd.id] === 'workFlow'
                  ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              ]"
            >
              Work Flow
            </button> -->
          </div>
        </div>

   <!-- {{ vd }} -->
        <!-- Tab Contents -->
        <div class="p-0 dark:border-gray-700">
          <div v-if="vendorTabs[vd.id] === 'proposal'">
         
            <Proposal :customerRef="vd.customerRef" />
          </div>
          <!-- <div v-if="vendorTabs[vd.id] === 'invoice'">
            <Invoice />
          </div> -->
          <div v-if="vendorTabs[vd.id] === 'order'">
            <Order />
          </div>
          <div v-if="vendorTabs[vd.id] === 'viewMore'">
            <p>DviewMore {{ vd.id }}</p>
          </div>
          <div v-if="vendorTabs[vd.id] === 'edit'">
            <AddEdit v-if="isAddEdit" @close="isAddEdit = !isAddEdit" />
          </div>
          <div v-if="vendorTabs[vd.id] === 'workFlow'">
            <WorkFlow />
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
    Order

  },
  data() {
    return {

      isMore: false,
      activeVendorId: null,
      rowIndex: -1,
      isAddEdit: false,
      isAssignRso: false,
      keyword: "",
      listVendor: [],
      curIndex: -1,
      searchBy: "",
      searchVal: "",
      vendorFields: [
        { label: "", key: "shopLogo" },
        { label: "Customer Ref", key: "customerRef" },
        { label: "Shop Name", key: "shopName" },
        { label: "Shop Contact", key: "shopContactNo" },
        { label: "Email", key: "shopEmail" },
        // { label: "City", key: "cityId" },
        { label: "CSONo", key: "csoNo" },
        { label: "Status", key: "isActive" },
      ],
      imageroot: "",
      showLoading: null,
      vendorTabs: {},
    };
  },
  async created() {
   try{
  
      this.vendorStore = useVendorStore();
      this.userStore = useUserStore();
      this.quotationStore = useQuotationStore();
      this.showLoading = this.$showLoading;
      
       
      const route = useRoute();
      let val = route.query.p;
      let isGuid = false;
      let req = { keyword:  '', searchBy:  '' };
      if (val !== undefined)
      { 
        isGuid = val.includes('-');
         req =  { keyword: (isGuid) ? val : '', searchBy: (isGuid) ? 'id' : '' };
      }
     
      
      await this.vendorStore.loadListVendors(
      req,
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

    async SetSelectedFilter(type) {
      this.searchBy = type;
      await this.GetSearch();
    },

    async GetSearch(searchVal) {


      if (searchVal) {
        this.keyword = searchVal
      } else {
        this.keyword = ""
      }
  
      await this.vendorStore.loadInitVendor(this.showLoading);
      await this.vendorStore.loadListVendors(
        { keyword: this.keyword, searchBy: this.searchBy },
        this.showLoading
      );


      this.searchBy = "";
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

    async GoToAddEdit(id) {
      await this.vendorStore.GetVendorById(id, this.showLoading);
      this.isAddEdit = true;
    },

    async GoToAssignSalesEx(id) {
      await this.vendorStore.GetVendorById(id, this.showLoading);
      this.isAssignRso = true;
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
