<template>
  <section>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Dtl Job Category</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ taskhubStore.taskMoreDetailsList.dtlJobCategory || 'No Data' }}</p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Client Details</h1>
          
          <p
              v-html="formatComment(taskhubStore.taskMoreDetailsList?.data?.clientDetails)"
              class="mt-1 text-xs text-gray-700 max-h-[150px] overflow-auto whitespace-pre-wrap break-words"
            ></p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">CSO Number</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ taskhubStore.taskMoreDetailsList?.data?.csoName || 'No Data' }}</p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">No Of Products</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ taskhubStore.taskMoreDetailsList?.data?.noOfProducts || 'No Data' }}</p>
        </div>
        <div class="flex items-center gap-2">
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Category Path</h1>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ taskhubStore.taskMoreDetailsList?.data?.categoryPath || 'No Data' }}
            </p>
          </div>

          <!-- When modal is CLOSED → show EDIT button -->
          <button 
              v-if="!isaAssig"
              @click="GoToAddNew" 
              class="p-1 rounded hover:bg-gray-200 transition mt-4"
              title="Edit Category Path"
          >
              <svg xmlns="http://www.w3.org/2000/svg" 
                  class="h-4 w-4 text-gray-600" 
                  fill="none" viewBox="0 0 24 24" 
                  stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" 
                      d="M15.232 5.232l3.536 3.536M9 13l3 3L21 6l-3-3-12 12v3h3l12-12z" />
              </svg>
          </button>

          <!-- When modal is OPEN → show CLOSE button -->
          <button 
              v-else
              @click="closeAddNew"
              class="p-1 rounded hover:bg-red-200 text-red-600 transition mt-4"
              title="Close"
          >
              ✕
          </button>
        </div>

      </div>

      <createNewCategory v-if="isaAssig" @close="isaAssig = false" :taskType="taskType" :taskHubId="taskHubId" :categoryPath="categoryPath" />

      <!-- Update button -->
      <div class="sm:flex sm:justify-end sm:gap-4">
        <div v-if="!isaAssig" class="flex flex-row gap-2 overflow-x-auto items-center whitespace-nowrap
            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 
            sm:flex sm:flex-wrap sm:gap-4 sm:overflow-visible
            text-sm font-medium text-gray-500" >
          <div class="flex justify-end pt-2 gap-2">
            <button
  v-if="!isShowWF"
  @click="GoToWorkFlow"
  class="p-4 rounded-t-lg text-center text-gray-600 hover:border-gray-300"
>
  View Work Flow
</button>

<button
  v-if="isShowWF"
  @click="closeWorkFlow"
  class="p-4 border-b-2 rounded-t-lg text-center text-red-600"
>
  Close Work Flow
</button>

            <button
            >
            Pass to ?
            </button>
          </div>
        </div>
      </div>

      <div class="p-0 dark:border-gray-700">
        <workFlowDetails v-if="isShowWF" @close="isShowWF = false" :taskHubId="taskHubId" />
      </div>
  </section>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";
import createNewCategory from "../bannerProduct/createNewCategory.vue";
import workFlowDetails from "./workFlowDetails.vue";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
    components:{createNewCategory,workFlowDetails},
    props:['taskType','jobCategory', 'taskHubId'],

  data() {
    return {
      isaAssig: false,
      isShowWF: false,
      expandedRow: null, 
       taskMoreDetails: {
      dtlJobCategory: "",
      data: {
        clientDetails: "",
        categoryPath: "",
        csoName: "",
        noOfProducts: ""
      }
    }
      
    };
  },

  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;

    await this.taskhubStore.TaskHubMoreDetail(
        { 
            taskType: this.taskType, 
            jobCategory: this.jobCategory, 
            taskHubId: this.taskHubId 
        },
        this.showLoading
    );

    this.taskMoreDetailsList = this.taskhubStore.taskMoreDetailsList;


  },

  mounted() {
    const queryId = this.$route.query.id;
    this.openFromRoute(queryId);
  },

  methods: {

    formatComment(clientDetails) {
      if (!clientDetails) return "No Data";
      return String(clientDetails).replace(/\n/g, "<br><br>");
    },

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

    closeAddNew() {
      this.isaAssig = false;
    },

GoToWorkFlow() {
    this.isShowWF = true;
  },
  closeWorkFlow() {
    this.isShowWF = false;
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

  // taskMoreDetailsList must be an array to use findIndex
  const list = this.taskhubStore.taskMoreDetailsList;

  if (!Array.isArray(list)) {
    console.warn("taskMoreDetailsList is not an array", list);
    return;   // Prevents crash
  }

  const foundIndex = list.findIndex(v => v.id === queryId);

  if (foundIndex !== -1) {
    this.expandedRow = foundIndex;
    this.filteredKpiId = list[foundIndex].id;
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
