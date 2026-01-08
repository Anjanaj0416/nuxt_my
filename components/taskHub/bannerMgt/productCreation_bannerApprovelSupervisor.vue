<template>
  <section>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Dtl Job Category</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ taskhubStore.taskMoreDetailsList.dtlJobCategory || 'No Data' }}</p>
        </div>
        <!-- {{ taskhubStore.taskMoreDetailsList }} -->
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
        <div >
          <div>
            <h1 class="text-[12px] font-semibold text-gray-600">Category Path</h1>
            <p class="text-sm text-gray-500 mt-0.5">
              {{ taskhubStore.taskMoreDetailsList?.data?.categoryPath || 'No Data' }}
            </p>
          </div>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store Maped Domain Url</h1>
          <p class="text-sm text-gray-500 mt-0.5">
            {{ taskhubStore.taskMoreDetailsList?.data?.StoreMapedDomainUrl || 'No Data' }}
          </p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store Url</h1>
          <a
            v-if="taskhubStore.taskMoreDetailsList?.data?.StoreUrl"
            :href="taskhubStore.taskMoreDetailsList.data.StoreUrl"
            target="_blank"
            class="text-sm text-blue-600 mt-0.5 underline"
          >
            Link
          </a>
          <span
            v-else
            class="text-sm text-gray-500 mt-0.5"
          >
            No Data
          </span>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store QR Url</h1>
          <a
            v-if="taskhubStore.taskMoreDetailsList?.data?.StoreQRUrl"
            :href="taskhubStore.taskMoreDetailsList.data.StoreQRUrl"
            target="_blank"
            class="text-sm text-blue-600 mt-0.5 underline"
          >
            Link
          </a>
          <span
            v-else
            class="text-sm text-gray-500 mt-0.5"
          >
            No Data
          </span>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store User Name</h1>
          <p class="text-sm text-gray-500 mt-0.5">
            {{ taskhubStore.taskMoreDetailsList?.data?.StoreUsername || 'No Data' }}
          </p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store Store Password</h1>
          <p class="text-sm text-gray-500 mt-0.5">
            {{ taskhubStore.taskMoreDetailsList?.data?.StorePassword || 'No Data' }}
          </p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Comment</h1>
          <p class="text-sm text-gray-500 mt-0.5">
            {{ taskhubStore.taskMoreDetailsList?.data?.comment || 'No Data' }}
          </p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Material File</h1>
            <div
              class="flex items-center justify-between bg-gray-50 mt-2 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <div class="text-sm">
                <span class="font-semibold text-gray-500">📄 </span>
              </div>
              <div>
                <a
                  target="_blank"
                  class="text-blue-600 text-sm font-medium hover:underline"
                >
                  View File
                </a>
                <!-- <span v-else class="text-gray-400 italic text-sm">No File</span> -->
              </div>
            </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="text-[12px] font-semibold text-gray-600">Comment</label>
          <textarea
            v-model="comment"
            type="text"
            rows="5"
            placeholder="Enter Comment"
            class="w-full p-2 border rounded-md text-sm focus:ring-2"
          />
        </div>
      </div>
      <div class="mt-4 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4 w-full">
          <div class="flex gap-2 sm:order-1">
            <button
                v-if="!isShowWF"
                @click="GoToWorkFlow"
                class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
            >
                View Work Flow
            </button>

            <button
                v-if="isShowWF"
                @click="closeWorkFlow"
                class="px-6 py-2 text-red-600 border-b-2 rounded-t-lg"
            >
                Close Work Flow
            </button>
          </div>
          <div class="flex gap-2 sm:order-2">
            <button
                @click="RejectBanner"
                class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
            >
                Reject
            </button>

            <button
                @click="AprovelBanner"
                class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
            >
                Aprovel
            </button>
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
      },
      CategoryPath:"",
      TaskHubId: "",
      listFiles:"",
      dtlJobCategory: "",
      Comment:"",
      StoreUrl: "",
      StoreQRUrl:"",
      StoreUsername: "",
      StorePassword: "",
      StoreMapedDomainUrl:"",
      err: {
        StoreUrl: "",
        StoreUsername: "",
        StorePassword: "",
      },
      
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

    GoToWorkFlow() {
      this.isShowWF = true;
    },
    closeWorkFlow() {
      this.isShowWF = false;
    },
    


    //Approve
    async AprovelBanner() {
   
      this.$showConfirm("Are you sure you want to approve this banner?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();
            formData.append("TaskType", this.taskType);
            formData.append("WGRequestCategory", "NewCategoryRequest");
            const dataObj = {
              taskHubId: this.taskHubId,
              comment: this.comment || ""
            };
            formData.append("Data", JSON.stringify(dataObj));
            if (this.listFiles && this.listFiles.length > 0) {
              this.listFiles.forEach((file, index) => {
                formData.append("listFiles", file);
              });
            }

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }

            await this.taskhubStore.SetPassToOtherWorkGroup(formData, this.showLoading);

          }
        });
    },

    //Reject
    async RejectBanner() {
   
      this.$showConfirm("Are you sure you want to reject this banner?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();
            formData.append("TaskType", this.taskType);
            formData.append("WGRequestCategory", "NewCategoryRequest");
            const dataObj = {
              taskHubId: this.taskHubId,
              comment: this.comment || ""
            };
            formData.append("Data", JSON.stringify(dataObj));
            if (this.listFiles && this.listFiles.length > 0) {
              this.listFiles.forEach((file, index) => {
                formData.append("listFiles", file);
              });
            }

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }


          }
        });
    },

     IsValidate() {
      this.clearErr();
      let valid = true;

      if (!this.listFiles) {
        this.err.listFiles = "Please enter Store Url!";
        valid = false;
      }
      return valid;
    },

    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
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
