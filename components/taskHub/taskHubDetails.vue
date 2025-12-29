<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">
    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="text-2xl uppercase">Task Hub</div>
      </div>
      <div class="w-full md:w-auto flex items-center gap-2">
        <select
          v-model="searchBy"
          @change="SetSelectedFilter"
          class="w-44 border border-gray-300 rounded-full focus:outline-none 
                focus:ring-2 focus:ring-blue-500 px-4 py-3 text-gray-700"
        >
          <option disabled value="102" class="bg-blue-900 text-white">Filter By</option>
          <option selected value="103">Vendor Name or JobName</option>

        </select>
        <!-- Search -->
        <div class="w-full md:w-96">
          <SearchComp @DoSearch="GetSearch" />
        </div>
      </div>
    </div>
    <div
      v-if="!taskhubStore.taskDetailsList || taskhubStore.taskDetailsList.length === 0"
      class="text-center text-gray-900 mt-5 text-sm font-medium"
    >
      <p>No Tasks Found...</p>
    </div>
<!-- {{ userStore }} -->
    <!-- KPI Leads -->
    <div
      v-for="(dtpJobs, index) in paginatedTaskList"
      :key="index"
    >
    <!-- {{ dtpJobs }} -->
      
      <div
        v-if="!filteredKpiId || filteredKpiId === dtpJobs.id"
         class="flex flex-col gap-2 p-4 mt-3 bg-white border rounded-xl shadow-sm hover:shadow-md ]"
      >
        <!-- Badges -->
        <div class="flex gap-2">
          <span class="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-blue-800 bg-blue-100 rounded-full">
            ⏳ {{ dtpJobs.noofDaysPending || 0 }} Days Pending
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium text-purple-800 bg-purple-100 rounded-full">
            📅 {{ dtpJobs.assignDate || 'No Date' }}
          </span>
        </div>

        <!-- Main Info -->
        <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between px-2">
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Job ID</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ dtpJobs.jobId || 'No Data' }}</p>
          </div>
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Job Description</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ dtpJobs.jobDescription || 'No Data' }}</p>
          </div>
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Job Type</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ dtpJobs.jobType || 'No Data' }}</p>
          </div>
           <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Category</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ dtpJobs.jobCategory || 'No Data' }}</p>
          </div>
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Pending WorkGroup</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ dtpJobs.pendingWorkGroup || 'No Data' }}</p>
          </div>
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Job Pending At</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ dtpJobs.jobPendingAt || 'No Data' }}</p>
          </div>
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Status</h1>
            <span
              :class="{
                'bg-gray-100 text-gray-700': !dtpJobs.jobStatus,
                'bg-yellow-100 text-yellow-800': dtpJobs.jobStatus === 'Pending',
                'bg-red-100 text-red-800': dtpJobs.jobStatus === 'Cancelled',
                'bg-orange-100 text-orange-800': dtpJobs.jobStatus === 'Hold',
                'bg-green-100 text-green-800': dtpJobs.jobStatus === 'Completed',
              }"
              class="text-[12px] font-medium px-2.5 py-0.5 rounded-full"
            >
              {{ dtpJobs.jobStatus || 'Unknown' }}
            </span>
          </div>
        </div>

        <!-- Expand Button -->
        <div class="flex flex-col items-center gap-1 mt-1 mb-2 sm:flex-row sm:justify-end sm:mb-0 sm:mt-0 sm:-my-3">
          <button
            class="text-black dark:bg-transparent text-xs font-medium dark:text-blue-900 cursor-pointer px-4 py-2 text-sm font-medium text-blue-900 rounded-md hover:font-bold underline"
            @click="toggleWorkFlow(dtpJobs.id, index)"
          >
            {{ expandedRowWF  === index ? 'Close Work Flow' : 'View Work Flow' }}
          </button>
          <button
            class="text-black dark:bg-transparent text-xs font-medium dark:text-blue-900 cursor-pointer px-4 py-2 text-sm font-medium text-blue-900 rounded-md hover:font-bold underline"
            @click="toggleKpiView(dtpJobs.id, index)"
          >
            {{ expandedRow === index ? 'Less' : 'More' }}
          </button>
          
        </div>

        <!-- Expanded Content -->

        <transition name="expand">
          <div
            v-if="expandedRow === index"
            class="flex flex-col gap-4 p-4 mt-2"
          >
            <div v-if="isB2bAdmin && dtpJobs.pendingWorkGroup === 'SUPPERADMIN'">
              <productCreation_b2bAdmin
                v-if="dtpJobs.jobCategoryId === 100"
                :taskType="'1'"
                :jobCategory="'100'"
                :taskHubId="dtpJobs.id"
              />
              <VendorBannerCreation_b2bAdmin
                v-if="dtpJobs.jobCategoryId === 110"
                :taskType="'1'"
                :jobCategory="'110'"
                :taskHubId="dtpJobs.id"
              />
            </div>

            <div v-else-if="isDtp && dtpJobs.pendingWorkGroup === 'DTP'">
              <productCreation_dtp
                v-if="dtpJobs.jobCategoryId === 100"
                :taskType="dtpJobs.jobType"
                :jobCategory="dtpJobs.jobCategory"
                :taskHubId="dtpJobs.id"
              />
            </div>

            <div v-else-if="isSupervisorUser && dtpJobs.pendingWorkGroup === 'SUPERVISOR'">
              <CategoryApprovelSuperviser
                v-if="dtpJobs.jobCategoryId === 100"
                :taskType="1"
                :jobCategory="100"
                :taskHubId="dtpJobs.id"
              />
              <BannerApprovelSuperviser
                v-else-if="dtpJobs.jobCategoryId === 101"
                :taskType="dtpJobs.jobType"
                :jobCategory="dtpJobs.jobCategory"
                :taskHubId="dtpJobs.id"
              />
            </div>

            <div v-else class="text-center text-gray-900 text-sm font-medium">
              You do not have access to this task
            </div>
          </div>
        </transition>

        <transition name="expand">
          <div
            v-if="expandedRowWF === index && isShowWF"
            class="flex flex-col gap-4 p-4 mt-2"
          >
            <workFlowDetails
              :taskHubId="taskHubIdWF"
              @close="isShowWF = false; expandedRowWF = null"
            />
          </div>
        </transition>

      </div>
    </div>

    <Pagination
      :total-items="taskhubStore.taskDetailsList?.length || 0"
      :items-per-page="itemsPerPage"
      :current-page="page"
      @update:currentPage="page = $event"
    />

    <assigDtp  v-if="isaAssig" @close="isaAssig = false" />
  </section>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";
import imagepicker1 from "~/components/customcontrol/imagepickermultiple.vue";
import Button from "~/components/customcontrol/Button.vue";
import assigDtp from "./bannerMgt/assigDtp.vue";
import SearchComp from "~/components/customcontrol/SearchComp";
import productCreation_b2bAdmin from "./bannerMgt/productCreation_b2bAdmin.vue";
import productCreation_dtp from "./bannerMgt/productCreation_dtp.vue";
import CategoryApprovelSuperviser from "./bannerMgt/productCreation_categoryApprovelSupervisor.vue";
import BannerApprovelSuperviser from "./bannerMgt/productCreation_bannerApprovelSupervisor.vue";
import VendorBannerCreation_b2bAdmin from "./bannerMgt/vendorBannerCreation_b2bAdmin.vue";
import Pagination from "~/components/customcontrol/Pagination.vue";
import workFlowDetails from "./bannerMgt/workFlowDetails.vue";



definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
    components:{
      imagepicker1,
      assigDtp,Button,
      SearchComp,
      productCreation_b2bAdmin,
      productCreation_dtp,
      CategoryApprovelSuperviser,
      BannerApprovelSuperviser,
      VendorBannerCreation_b2bAdmin,
      Pagination,
      workFlowDetails
    },
  data() {
    return {
      isaAssig: false,
      expandedRow: null, 
      expandedRowWF: null,
      isShowWF: false,
      taskHubIdWF: null,
      filteredKpiId: null,
      searchBy: "102",
      taskType: "1",
      searchValue: "",
       page: 1,
      itemsPerPage: 5, 
      showLoading: null,
    };
  },

  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    

    await this.taskhubStore.TaskDetailsList(
      { taskType: this.taskType, searchValue: this.searchValue, searchBy: this.searchBy }, 
      this.showLoading
    );

  },

  mounted() {
    const queryId = this.$route.query.id;
    this.openFromRoute(queryId);
  },
  
  computed: {
    paginatedTaskList() {
      if (!this.taskhubStore.taskDetailsList) return [];

      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      return this.taskhubStore.taskDetailsList.slice(start, end);
    },

    isSupervisorUser() {
      return this.userStore?.loggedUser?.userGroup === 'Supervisor';
    },

    isDtp() {
      return this.userStore?.loggedUser?.userGroup === 'DTP';
    },

    isB2bAdmin() {
      return this.userStore?.loggedUser?.userGroup === 'B2BAdmin';
    }
  },


  methods: {

    async SetSelectedFilter(event) {
      this.searchBy = event.target.value;
      this.page = 1;
      await this.GetSearch();
    },

    async GetSearch(searchVal) {
      this.searchValue = searchVal || "";
      this.page = 1;
      console.log("searchValue, searchBy", this.searchValue, this.searchBy);
      await this.taskhubStore.TaskDetailsList(
        { taskType: "1", searchValue: this.searchValue, searchBy: this.searchBy || '102' },
        this.showLoading
      );



    },


    GoToAddNew() {
      this.isaAssig = true;
    },
    
    handleSelectedImages(files) {
        console.log('Selected Files:', files);
    },

    handleDeleteExistingImage(index) {
        mageroots.value.splice(index, 1);
    },

    openFromRoute(queryId) {
      if (!queryId) {
        this.expandedRow = null;
        this.filteredKpiId = null;
        return;
      }
      // const foundIndex = this.listKpi.findIndex(v => v.id === queryId);
      // if (foundIndex !== -1) {
      //   this.expandedRow = foundIndex;
      //   this.filteredKpiId = this.listKpi[foundIndex].id;
      // }
    },

    toggleKpiView(id, index) {
      if (this.expandedRow === index) {
        this.expandedRow = null;
        this.filteredKpiId = null;
        this.$router.replace({ path: this.$route.path, query: {} });
      } else {
        this.expandedRow = index;
        this.filteredKpiId = id;
        this.$router.replace({ path: this.$route.path, query: { id } });
      }
    },

    toggleWorkFlow(taskHubId, index) {
      if (this.expandedRowWF === index && this.isShowWF) {
        this.expandedRowWF = null;
        this.isShowWF = false;
        this.taskHubIdWF = null;
      } else {
        this.expandedRowWF = index;
        this.isShowWF = true;
        this.taskHubIdWF = taskHubId;
      }
    },

  },
  
};
</script>
