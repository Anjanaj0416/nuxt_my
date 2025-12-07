<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-[60px] md:px-[82px]">
    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="text-2xl uppercase">Bnner Hub</div>
      </div>
      <div class="w-full md:w-auto flex items-center gap-2">
        <select
          v-model="searchBy"
          @change="SetSelectedFilter"
          class="w-44 border border-gray-300 rounded-full focus:outline-none 
                focus:ring-2 focus:ring-blue-500 px-4 py-3 text-gray-700"
        >
          <option disabled value="" class="bg-blue-900 text-white">Filter By</option>
          <option selected value="100">Vendor Id</option>
          <option value="101">Task Hub Job Details-ID</option>
        </select>
        <!-- Search -->
        <div class="w-full md:w-96">
          <SearchComp @DoSearch="GetSearch" />
        </div>
      </div>
    </div>

    <div v-if="taskhubStore.taskDetailsList === 0" class="text-center text-gray-900 mt-5 text-sm font-medium">
      <p>No KPI available...</p>
    </div>

    <!-- KPI Leads -->
    <div
      v-for="(dtpJobs, index) in taskhubStore.taskDetailsList"
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
            <h1 class="text-[12px] font-semibold text-gray-600">Client Name</h1>
            <p class="text-sm text-gray-500 mt-0.5">{{ dtpJobs.clientName || 'No Data' }}</p>
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
            @click="toggleKpiView(dtpJobs.id, index)"
          >
            {{ expandedRow === index ? 'Less' : 'More' }}
          </button>
        </div>

        <!-- Expanded Content -->
        <transition name="expand" mode="out-in">
          <div
            v-if="expandedRow === index"
            class="flex flex-col gap-4 p-4 mt-2 r"
          >

            <!-- Store & Banner Details side by side -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Store -->
              <div class="p-4 rounded-lg bg-white shadow hover:shadow-md transition">
                <h2 class="text-sm font-bold text-gray-800 border-b pb-2 mb-3">🏬 Store Details</h2>
                <div class="space-y-2 text-sm">
                  <p><span class="font-medium text-gray-700">Vendor:</span> {{ dtpJobs.details?.store?.name || 'No Data' }}</p>
                  <p><span class="font-medium text-gray-700">Address:</span> {{ dtpJobs.details?.store?.location || 'No Data' }}</p>
                  <p><span class="font-medium text-gray-700">Contact:</span> {{ dtpJobs.details?.store?.contactNumber || 'No Data' }}</p>
                  <p><span class="font-medium text-gray-700">Email:</span> {{ dtpJobs.details?.store?.email || 'No Data' }}</p>
                </div>
              </div>

              <!-- Banner -->
              <div class="p-4 rounded-lg bg-white shadow hover:shadow-md transition">
                <h2 class="text-sm font-bold text-gray-800 border-b pb-2 mb-3">🖼️ Banner Details</h2>
                <p class="text-sm"><span class="font-medium text-gray-700">Category:</span> {{ dtpJobs.details?.banner?.categoryName || 'No Data' }}</p>
                <p class="text-sm flex gap-1 items-center">
                  <span class="font-medium text-gray-700">Web:</span>
                  <a
                    v-if="dtpJobs.details?.banner?.web"
                    :href="dtpJobs.details.banner.web"
                    target="_blank"
                    class="text-indigo-600 hover:underline truncate max-w-[150px]"
                    title="Visit Website"
                  >
                    Visit Website
                  </a>
                  <span v-else class="text-gray-400 italic">No Website</span>
                </p>
              </div>
            </div>

            <!-- Inputs & Actions -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Enter Store Link</label>
                <input
                  v-if="userStore.loggedUser.granted.includes('flo')"
                  type="text"
                  placeholder="Enter Link"
                  class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
                <a v-if="(userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('sso')) && dtpJobs.kpiAssignTo"
                  :href="dtpJobs.kpiAssignTo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-blue-600 hover:underline mt-0.5">
                  {{ dtpJobs.kpiAssignTo }}
                </a>

                <p v-else-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('sso')"
                  class="text-sm text-gray-500 mt-0.5">
                  No Data
                </p>

              </div>
              <!-- <div>
                <label class="block font-medium text-gray-700">Job Status</label>
                <select
                  v-model="curProductStatus"
                  class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400"
                >
                  <option disabled selected value="">Select Status</option>
                  <option value="complete">Complete</option>
                  <option value="not-complete">Not Complete</option>
                </select>
              </div> -->
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Upload Banners</label>
                <div v-if="userStore.loggedUser.granted.includes('flo')" class="mt-2">
                  <imagepicker1
                    :existingImagePaths="imageroots"
                    @GetSelectedImages="handleSelectedImages"
                    @deleteExistingImage="handleDeleteExistingImage"
                  />
                </div>
                <img
                    v-if="userStore.loggedUser.granted.includes('su')  || userStore.loggedUser.granted.includes('sso')"
                    :src="imageroot + curVendor"
                    alt="Vendor Logo"
                    class="w-full h-32 object-cover text-sm border border-gray-300 rounded-lg shadow-md mt-2"
                />
              </div>
              <!-- Note -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Note</label>
                <textarea
                  v-if="userStore.loggedUser.granted.includes('flo')"
                  class="w-full p-2 text-sm border rounded-md bg-white mt-1 focus:ring-2 focus:ring-indigo-400 resize-none"
                  rows="3"
                  placeholder="Add a comment..."
                />
                <p  v-if="userStore.loggedUser.granted.includes('su')  || userStore.loggedUser.granted.includes('sso')" class="text-sm text-gray-500 mt-0.5">test</p>
              </div>
            </div>

            <!-- Update button -->
            <div class="flex justify-end">
              <LinkBtn
                v-if="userStore.loggedUser.granted.includes('flo')"
                class="px-5 py-2 text-sm font-semibold transition bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
                label="Update"
              />
              <LinkBtn
                v-if="userStore.loggedUser.granted.includes('su')  || userStore.loggedUser.granted.includes('sso')"
                class="ml-5 px-5 py-2 text-sm font-semibold transition bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                label="Reject"
              />
              <LinkBtn
                v-if="userStore.loggedUser.granted.includes('su')  || userStore.loggedUser.granted.includes('sso')"
                class="px-5 ml-5 py-2 text-sm font-semibold transition bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                label="Approve"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>
    <assigDtp  v-if="isaAssig" @close="isaAssig = false" />
  </section>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";
import imagepicker1 from "~/components/customcontrol/imagepickermultiple.vue";
import Button from "~/components/customcontrol/Button.vue";
import assigDtp from "./assigDtp.vue";
import SearchComp from "~/components/customcontrol/SearchComp";
import createNewCategory from "../bannerProduct/createNewCategory.vue";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
    components:{imagepicker1,assigDtp,Button,SearchComp,createNewCategory},
  data() {
    return {
      isaAssig: false,
      expandedRow: null, 
    };
  },

  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;

    await this.taskhubStore.TaskDetailsList(
      { taskType: "DtlBannerMgt", searchValue: "EB65FD62-9C69-44AF-2183-08DE2B1B00C6", searchBy: "101" },
      this.showLoading
    );

  },

  mounted() {
    const queryId = this.$route.query.id;
    this.openFromRoute(queryId);
  },

  methods: {

    async SetSelectedFilter(event) {
      this.searchBy = event.target.value;
      // await this.GetSearch();
    },

    async GetSearch(searchVal) {
      if (searchVal) {
        this.keyword = searchVal;
      } else {
        this.keyword = "";
      }
      console.log("keyword, searchBy", searchVal, this.searchBy);
      await this.taskhubStore.TaskDetailsList(
        { taskType: "DtlBannerMgt", searchValue: "5CD7F771-139D-4044-708C-08DE2A3D770B", searchBy: "101" },
        this.showLoading
      );



      this.searchBy = "";
      this.keyword = "";
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
      const foundIndex = this.listKpi.findIndex(v => v.id === queryId);
      if (foundIndex !== -1) {
        this.expandedRow = foundIndex;
        this.filteredKpiId = this.listKpi[foundIndex].id;
      }
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
    }

  },
  
};
</script>
