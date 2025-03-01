<template>
  <section class="justify-center min-h-screen px-4 lg:px-80 mt-24">
    
        <div class="uppercase text-2xl">Vendors</div>
        <div class="flex flex-col items-center justify-between mt-2 md:flex-row">
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
    

    <div class="cssDataSec">


      <div class="grid grid-cols-1 my-4" v-for="(vd,index) in vendorStore.listVendor" :key="index">
        {{ vd }}
        <lable title="customerRef" :value="vd.customerRef" />
        <div class="flex gap-x-4 mt-2.">
          <LinkBtn label="View More"   @click="
              vendorStore.curVendor = vd;
              GoToViewMore();
            " /> |
        
          <LinkBtn label="Edit"  @click="
             vendorStore.curVendor = vd;
              GoToAddEdit();
            " />
         |
          <LinkBtn label="Assign RSO"  @click="
             vendorStore.curVendor = vd;
              GoToAssignSalesEx();
            " />
            |
          
          <LinkBtn label="View Quotations"  @click="
              vendorStore.curVendor = vd;
              GoToQuotation();
            " />
          
        </div>
      </div>
     
        {{ vendorStore.initVendor.baseUrl }} <br>
       {{ vendorStore.initVendor.listCities }}
      

    </div>

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
