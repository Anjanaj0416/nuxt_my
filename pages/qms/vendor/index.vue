<template>
  <!-- <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-80"> -->
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">

    <div class="text-2xl uppercase">Vendors</div>
    <div class="flex flex-col items-center justify-between mt-2 mb-8 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
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

    <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter" />

    <div v-if="vendorStore.listVendor.length === 0" class="text-center text-gray-900 mt-5 text-sm font-medium">
      <p>No vendors available...</p>
    </div>

    <div class="flex flex-col gap-5 p-4 mt-4 bg-white border rounded-lg shadow-sm sm:p-6"
      v-for="(vd, index) in vendorStore.listVendor" :key="index">
      <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-8 sm:grid-cols-3 md:grid-cols-8">
          <div class="flex flex-col text-center sm:text-left" v-for="(field, idx) in vendorFields" :key="idx">
            <h1 class="text-sm font-semibold text-gray-700">
              {{ field.label }}
            </h1>

            <p v-if="field.key === 'shopLogo'" class="flex items-center justify-center h-16 text-center">
              <ImageLable :imageUrl="imageroot + `/${vd[field.key]}`" alt="Shop Logo" v-if="vd[field.key]" />
              <span v-else class="text-xs text-gray-500">No Shop Logo</span>
            </p>

            <p v-else-if="field.key !== 'isActive'" class="text-xs text-gray-600">
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

      <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end sm:gap-4">
        <LinkBtn label="Edit" @click="GoToAddEdit(vd.id)" />

        <LinkBtn label="View Poforma" @click="GoToAddEdit(vd.id)" />
        <LinkBtn label="View Proposal" @click="GoToAddEdit(vd.id)" />

        <LinkBtn v-if="!vd.csoNo && userStore.loggedUser.granted.includes('vendor_mgt')" label="Assign RSO"
          @click="GoToAssignSalesEx(vd.id)" />

        <LinkBtn label="Delete" @click="DeleteVendor(vd.id)" />

        <!-- <LinkBtn label="View Quotations" @click="
          vendorStore.curVendor = vd;
        GoToQuotation();
        " /> -->
      </div>
    </div>


    <AddEdit v-if="isAddEdit" @close="isAddEdit = !isAddEdit" />

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

import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import { useUserStore } from "~/stores/modules/userStore";
import { useLeadStore } from "~/stores/modules/qms/leadStore";
import { useRoute } from 'vue-router'

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
  },
  data() {
    return {
      arrFilter: [
        "All",
        "Not Assigned",
        "Active",
        "Inactive",
        "Phone",
        "Shopname",
      ],
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
    };
  },
  async created() {
    this.vendorStore = useVendorStore();
    this.userStore = useUserStore();
    this.leadStore = useLeadStore();
    this.showLoading = this.$showLoading;


    const route = useRoute();
    let val  = route.query.p ;
    let isGuid = val.includes('-');  
   

    await this.vendorStore.loadListVendors(
      { keyword: (isGuid)?val:'', searchBy: (isGuid)?'id':'' },
      this.showLoading
    );

    await this.vendorStore.loadInitVendor(this.showLoading);
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
  },

  methods: {

    async SetSelectedFilter(type) {
      this.searchBy = type;
      await this.GetSearch();
    },

    async GetSearch(searchVal) {
      // await this.vendorStore.loadListVendors(
      //   { keyword: searchVal, searchBy: this.searchBy },
      //   this.showLoading
      // );

      if (searchVal) {
        this.keyword = searchVal
      } else {
        this.keyword = ""
      }
      console.log("keyword, searchBy", searchVal, this.searchBy);

      await this.vendorStore.loadListVendors(
        { keyword: this.keyword, searchBy: this.searchBy },
        this.showLoading
      );

      this.searchBy = "";
      this.keyword = "";
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
