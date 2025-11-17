<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">
    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="text-2xl uppercase">Available Banners</div>
      </div>
      <div class="w-full md:w-auto flex items-center gap-2">
      </div>
    </div>

    <div
      class="bg-white p-4 rounded-xl  max-w-8xl mx-auto mt-10 border">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        <!-- Main Category -->
        <div class="relative bg-gradient-to-b from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <label class="block text-sm font-medium text-gray-700 mb-1">Home Page Banner</label>

          <div class="transition-all duration-500">
            <p class="mt-4 text-sm font-semibold text-blue-600">
                Available Banners:
                <span class="text-blue-700 font-bold">{{ avalabale1 }}</span>
            </p>

            <div v-if="avalabale1 == 0" class="mt-4 text-sm text-red-400 font-semibold ">
              No Available Banners.
            </div>

            <div v-else>
              <div class="mt-4 border-t border-gray-200"></div>
              <p class="mt-3 text-sm font-semibold text-gray-600">Re-Save Banner</p>
              <label class="mt-3 block text-sm font-medium text-gray-700">
                  Select Company Name
              </label>
              <serach_Input 
                  :arrItems="leadStore.InitLeads.listClients" 
                  label="" 
              />
              <label class="mt-3 block text-sm font-medium text-gray-700">
                  Select CSO
              </label>
              <serach_Input 
                  :arrItems="leadStore.InitLeads.listClients" 
                  label="" 
              />
              <button
                  @click="searchCommission"
                  class="mt-4 w-full py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md focus:ring-2 focus:ring-blue-300"
              >
                  Re-Save
              </button>
            </div>
          </div>
        </div>

        <!-- Main Category -->
        <div class="relative bg-gradient-to-b from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <label class="block text-sm font-medium text-gray-700 mb-1">Main Category</label>
          <serach_Input
            :arrItems="taskhubStore.listMainCategory"
            label=""
            ref="refMainCategory"
            @selectItem="GetSelectMainCategory"
          />

          <div v-if="isMainCategorySelected" class="transition-all duration-500">
            <p class="mt-4 text-sm font-semibold text-blue-600">
                Available Banners:
                <span class="text-blue-700 font-bold">5</span>
            </p>

            <div class="mt-4 border-t border-gray-200"></div>
            <p class="mt-3 text-sm font-semibold text-gray-600">Re-Save Banner</p>

            <label class="mt-3 block text-sm font-medium text-gray-700">
                Select Company Name
            </label>
            <serach_Input 
                :arrItems="leadStore.InitLeads.listClients" 
                label="" 
            />
            <label class="mt-3 block text-sm font-medium text-gray-700">
                Select CSO
            </label>
            <serach_Input 
                :arrItems="leadStore.InitLeads.listClients" 
                label="" 
            />

            <button
                @click="searchCommission"
                class="mt-4 w-full py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md focus:ring-2 focus:ring-blue-300"
            >
                Re-Save
            </button>
          </div>
        </div>

        <!-- Sub Category -->
        <div class="relative bg-gradient-to-b from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
          <label class="block text-sm font-medium text-gray-700 mb-1">Sub Category</label>
          <serach_Input
            :arrItems="taskhubStore.listSubCategory"
            label=""
            ref="refSubCategory"
            @selectItem="GetSelectSubCategory"
          />

          <div v-if="isSubCategorySelected" class="transition-all duration-500">
            <p class="mt-4 text-sm font-semibold text-blue-600">
                Available Banners:
                <span class="text-blue-700 font-bold">5</span>
            </p>

            <div class="mt-4 border-t border-gray-200"></div>
            <p class="mt-3 text-sm font-semibold text-gray-600">Re-Save Banner</p>

            <label class="mt-3 block text-sm font-medium text-gray-700">
                Select Company Name
            </label>
            <serach_Input 
                :arrItems="leadStore.InitLeads.listClients" 
                label="" 
            />
            <label class="mt-3 block text-sm font-medium text-gray-700">
                Select CSO
            </label>
            <serach_Input 
                :arrItems="leadStore.InitLeads.listClients" 
                label="" 
            />

            <button
                @click="searchCommission"
                class="mt-4 w-full py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md focus:ring-2 focus:ring-blue-300"
            >
                Re-Save
            </button>
          </div>
          
        </div>

        <!-- Sub Sub Category -->
        <div
          class="relative bg-gradient-to-b from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <label class="block text-sm font-medium text-gray-700 mb-1">Sub Sub Category</label>
          <serach_Input
            :arrItems="taskhubStore.listSubSubCategory"
            label=""
            ref="refSubSubCategory"
            @selectItem="GetSelectSubSubCategory"
          />

          <div v-if="isSubSubCategorySelected" class="transition-all duration-500">
            <p class="mt-4 text-sm font-semibold text-blue-600">
                Available Banners:
                <span class="text-blue-700 font-bold">5</span>
            </p>

            <div class="mt-4 border-t border-gray-200"></div>
            <p class="mt-3 text-sm font-semibold text-gray-600">Re-Save Banner</p>

            <label class="mt-3 block text-sm font-medium text-gray-700">
                Select Company Name
            </label>
            <serach_Input :arrItems="leadStore.InitLeads.listClients" label="" />

            <button
                @click="searchCommission"
                class="mt-4 w-full py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md focus:ring-2 focus:ring-blue-300"
            >
                Re-Save
            </button>
          </div>
        </div>

        <!-- Sub Sub Sub Category -->
        <div
          class="relative bg-gradient-to-b from-white to-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <label class="block text-sm font-medium text-gray-700 mb-1">Sub Sub Sub Category</label>
          <serach_Input
            :arrItems="taskhubStore.listSubSubSubCategory"
            label=""
            ref="refSubSubSubCategory"
            @selectItem="GetSelectSubSubSubCategory"
          />

          <div v-if="isSubSubSubCategorySelected" class="transition-all duration-500">
            <p class="mt-4 text-sm font-semibold text-blue-600">
                Available Banners:
                <span class="text-blue-700 font-bold">5</span>
            </p>

            <div class="mt-4 border-t border-gray-200"></div>
            <p class="mt-3 text-sm font-semibold text-gray-600">Re-Save Banner</p>

            <label class="mt-3 block text-sm font-medium text-gray-700">
                Select Company Name
            </label>
            <serach_Input :arrItems="leadStore.InitLeads.listClients" label="" />

            <button
                @click="searchCommission"
                class="mt-4 w-full py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md focus:ring-2 focus:ring-blue-300"
            >
                Re-Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-2 mt-3">
    <div
        v-for="(item, index) in resaveList"
        :key="index"
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300"
    >
        <!-- Vendor Name -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span class="text-[11px] font-semibold text-gray-600">Vendor:</span>
        <span class="text-[12px] text-gray-800 font-medium">{{ item.comName || 'No Data' }}</span>
        </div>

        <!-- Resave Date -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span class="text-[11px] font-semibold text-gray-600">Resave Date:</span>
        <span class="text-[12px] text-gray-800">{{ item.resaveDate || 'No Data' }}</span>
        </div>

        <!-- Expire Date -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span class="text-[11px] font-semibold text-gray-600">Expire Date:</span>
        <span
            class="text-[12px] font-medium"
            :class="new Date(item.expireDate) < new Date() ? 'text-red-500' : 'text-green-600'"
        >
            {{ item.expireDate || 'No Data' }}
        </span>
        </div>

        <!-- Category -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span class="text-[11px] font-semibold text-gray-600">Category:</span>
        <span class="text-[12px] text-gray-800">{{ item.category || 'No Data' }}</span>
        </div>

        <!-- CSO -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <span class="text-[11px] font-semibold text-gray-600">CSO:</span>
        <span class="text-[12px] text-gray-800">{{ item.cso || 'No Data' }}</span>
        </div>

        <!-- Buttons -->
        <div class="flex gap-2 sm:ml-4">

        <button
            @click="removeItem(item)"
            class="text-[11px] font-semibold text-red-500 border border-red-400 px-3 py-1.5 rounded-full hover:bg-red-50 transition-all duration-300"
        >
            ✖ Remove
        </button>
        </div>
    </div>
    </div>




  </section>
</template>


<script>



import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";
import { useLeadStore } from "~/stores/modules/qms/leadStore";
import serach_Input from "~/components/customcontrol/SearchInput";



definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
  components: {serach_Input},
  data() {
    return {
        isMainCategorySelected: false,
        isSubCategorySelected: false,
        isSubSubCategorySelected: false,
        isSubSubSubCategorySelected: false,
        avalabale: "5",
        avalabale1: "0",
        resaveList:[ 
            {
             comName: "dispatchEvent",
             resaveDate: "2025-02-02",
             expireDate: "2025-04-13",
             category: "hadware",
             cso : "pathirana"

            },
            {
                comName: "dispatchEvent",
             resaveDate: "2025-02-02",
             expireDate: "2025-04-13",
             category: "hadware",
             cso : "pathirana"
            }
        ]
    };
  },
  async created() {
      this.userStore = useUserStore();
      this.taskhubStore = useTaskhubStore();
      this.leadStore = useLeadStore();
      this.showLoading = this.$showLoading;
     
      await this.taskhubStore.loadInitBanner(this.showLoading);
      await this.leadStore.GetInitLeads(this.showLoading);

         
  },

  methods: {

    async GetSelectMainCategory(item) {
      console.log("Selected Main Category ID:", item.id);
      this.mainCategoryId = item.id; 
      this.isMainCategorySelected = true

      this.isSubCategorySelected = false;

      this.subCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";

      this.taskhubStore.listSubCategory = [];
      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubMainCategory(item.id, this.showLoading);
    },

    async GetSelectSubCategory(item) {
      console.log("Selected Sub Category ID:", item.id);
      this.subCategoryID = item.id;
      this.isSubCategorySelected = true

      this.isSubSubCategorySelected = false

      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";

      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubCategory(item) {
      console.log("Selected SubSub Category ID:", item.id);
      this.subSubCategoryID = item.id;
      this.isSubSubCategorySelected = true

      this.isSubSubSubCategorySelected = false

      // Clear dependent dropdowns first
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubSubCategory(item) {
      console.log("Selected SubSubSub Category ID:", item.id);
      this.subSubSubCategoryID = item.id;
      this.isSubSubSubCategorySelected = true

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
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
