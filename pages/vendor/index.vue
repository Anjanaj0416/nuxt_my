<template>
  <section class="justify-center min-h-screen px-4 mt-24 lg:px-80">
    
        <div class="text-2xl uppercase">Vendors</div>
        <div class="flex flex-col items-center justify-between mt-2 mb-8 md:flex-row">
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
        <SearchComp @DoSearch="GetSearch"/>
        </div>
      </div>

      <FilterTab @selected="SetSelectedFilter" :arrFilter="arrFilter"/>

      <div
        class="flex flex-col gap-4 p-2 mt-6 bg-white border-2 rounded-md shadow-md sm:p-6"
        v-for="(vd,index) in vendorStore.listVendor" :key="index"
      >
        <InfoCard :data="vd" :fields="vendorFields" />
        <!-- {{ vd }} -->

        <!-- Button Group -->
        <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end">
          <LinkBtn label="View More"   @click="
              vendorStore.curVendor = vd;
              GoToViewMore();"
          /> 
        
          <LinkBtn label="Edit"  @click="
             vendorStore.curVendor = vd;
              GoToAddEdit();"
          />
         
          <LinkBtn label="Assign RSO"  @click="
             vendorStore.curVendor = vd;
              GoToAssignSalesEx();"
          />
            
          <LinkBtn label="View Quotations"  @click="
              vendorStore.curVendor = vd;
              GoToQuotation();"
          />
        </div>
      </div>
    

    <!-- <div class="cssDataSec">
      {{ vendorStore.initVendor.baseUrl }} <br>
      {{ vendorStore.initVendor.listCities }}
    </div> -->

    <AddEdit v-if="isAddEdit" @close="isAddEdit = !isAddEdit" />
    <ViewMore v-if="isViewMore" @close="isViewMore = !isViewMore" />
    <AssignRso v-if="isAssignRso" @close="isAssignRso = !isAssignRso" />
  </section>
</template>

<script>
import Lable from "~/components/customcontrol/Lable";
import Button from "~/components/customcontrol/Button";
import LinkBtn from "~/components/customcontrol/Link";
import AddEdit from "~/components/vendor/addedit";
import ViewMore from "~/components/vendor/viewmore";
import AssignRso from "~/components/vendor/assignSalesEx";
import FilterTab from "~/components/customcontrol/FilterTab";
import SearchComp from "~/components/customcontrol/SearchComp";
import InfoCard from "~/components/customcontrol/InfoCard.vue";

import { useVendorStore } from "~/stores/modules/vendorStore";


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
    ViewMore,
    AssignRso,
    FilterTab,
    SearchComp,
    InfoCard,
  },
  data() {
    return {
    

      arrFilter:['All','Not Assigned','Active'],      
      isAddEdit: false,
      isViewMore: false,
      isAssignRso: false,      
      listVendor:[],
      curIndex: -1,
      searchBy:'',
      searchVal:'',
      vendorFields: [
        { label: "Customer Ref", key: "customerRef" },
        { label: "Name", key: "firstName", secondKey: "lastname" },
        { label: "Shop Contact", key: "shopContactNo" },
        { label: "Email", key: "email" },
        { label: "City", key: "city" },
        { label: "Status", key: "isActive" }
      ]
  
    };
  },
  async created() {
    this.vendorStore = useVendorStore();
    await this.vendorStore.loadListVendors({keyword:'',searchBy:this.searchBy})  
    await this.vendorStore.loadInitVendor()   
  },
  methods: {
    SetSelectedFilter(type){
      this.searchBy = type;
    },
    async GetSearch(searchVal) {
      
     await  this.vendorStore.loadListVendors({keyword:searchVal,searchBy:this.searchBy})   
    
    },

    GoToAddNew() {
      this.vendorStore.ResetVendor();
      this.isAddEdit = true;
    },
    GoToViewMore() {    
    
      this.isViewMore = true;
    
    },
    GoToAddEdit() {     
     
      this.isAddEdit = true;
    },
    GoToAssignSalesEx() {
     
      this.isAssignRso = true;
    },
    GoToQuotation() {     
      this.isAssignRso = true;
      this.$router.push("/quotation"); 
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
  max-height: 400px; /* Limit height */
  @apply overflow-y-auto; /* Enable vertical scrolling */
  margin-top: 20px; /* Spacing for the scrollable section */
}
</style>
