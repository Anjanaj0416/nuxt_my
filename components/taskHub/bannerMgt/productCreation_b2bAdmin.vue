<template>
  <section>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Dtl Job Category</h1>
          <p class="text-sm text-gray-500 mt-0.5">  {{ jobCategoryLabel }}</p>

          
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
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store Maped Domain Url</h1>
          <input
            v-model="StoreMapedDomainUrl"
            @input="clearErrorOnInput('kpiDStoreMapedDomainUrlays')"
            type="text"
            placeholder="Enter Domain Url"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store Url</h1>
          <input
            v-model="StoreUrl"
            @input="clearErrorOnInput('StoreUrl')"
            type="text"
            placeholder="Enter Store Url"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="err.StoreUrl" class="mt-2 text-sm text-red-600">
          {{ err.StoreUrl }}
          </p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store QR Url</h1>
          <input
            v-model="StoreQRUrl"
            @input="clearErrorOnInput('StoreQRUrl')"
            type="text"
            placeholder="Enter Store QR Url"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store User Name</h1>
          <input
            v-model="StoreUsername"
            @input="clearErrorOnInput('StoreUsername')"
            type="text"
            placeholder="Enter Store User Name"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="err.StoreUsername" class="mt-2 text-sm text-red-600">
          {{ err.StoreUsername }}
          </p>
        </div>
        <div>
          <h1 class="text-[12px] font-semibold text-gray-600">Store Store Password</h1>
          <input
            v-model="StorePassword"
            @input="clearErrorOnInput('StorePassword')"
            type="text"
            placeholder="Enter Store Password"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="err.StorePassword" class="mt-2 text-sm text-red-600">
          {{ err.StorePassword }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
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
        <div>
          <label class="text-[12px] font-semibold text-gray-600">Material Upload</label>
            <imagepickermultiple
              @GetSelectedImages="handleSelectedImages"
              ref="refApprovedImg"
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
            />
        </div>
      </div>

      <createNewCategory 
        v-if="isaAssig"
        @close="isaAssig = false"
        @update-category-path="updateCategoryPath"
        :taskType="taskType"
        :taskHubId="taskHubId"
        :categoryPath="taskhubStore.taskMoreDetailsList?.data?.categoryPath"
      />

      <div class="sm:flex sm:justify-end sm:gap-4">
        <div v-if="!isaAssig" class="flex flex-row gap-2 overflow-x-auto items-center whitespace-nowrap
            scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 
            sm:flex sm:flex-wrap sm:gap-4 sm:overflow-visible
            text-sm font-medium text-gray-500" >
          <div class="flex justify-end pt-2 gap-2">
            <button
              v-if="!isShowWF"
              @click="GoToWorkFlow"
              class="p-r px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
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
          </div>

          <div class="flex justify-end pt-2 gap-2">
            <!-- <button
              @click="SendToApproval"
              class="p-r px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
            >
              Send to Aprovel
            </button> -->
            <button
              v-if="hasNewInCategoryPath"
              @click="SendToApproval"
              :class="[
                'p-r px-12 py-2 text-xs font-semibold transition rounded-full shadow focus:ring-2',
                hasNewInCategoryPath
                  ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white focus:ring-blue-400'
                  : 'bg-yellow-400 text-black animate-pulse'
              ]"
            >
              Send to Approval
            </button>
          </div>
          <div class="flex justify-end pt-2 gap-2">
            <button
              @click="PassTo"
              class="p-r px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
            >
              Pass to
            </button>
          </div>
          <!-- <div class=" pt-2 gap-2 relative">
            <button
              @click="togglePassToList"
              class="p-r px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
            >
              Pass to
            </button>
            <transition name="fade-slide">
              <div
                v-if="showPassToList"
                class="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
              >
              <ul>
                <li  class="px-4 py-3  cursor-pointer transition">
                  <div>
                    <label class="text-[14px] font-semibold text-gray-600">Select</label>
                  </div>
                  <select class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400">
                    <option disabled selected value="">Select DTP</option>
                    <option
                      v-for="item in taskhubStore.listDTP"
                      :key="item.id"
                      :value="item"
                    >
                      {{ item.value }}
                    </option>
                  </select>
                </li>
                <li  class="px-4 py-3 hover:bg-blue-50 cursor-pointer transition flex justify-end">
                  <button
                    @click="PassTo"
                    class="p-r px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                    font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
                  >
                    Pass to
                  </button>
                </li>
              </ul>
              </div>
            </transition>
          </div> -->
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
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";

definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
    components:{createNewCategory,workFlowDetails,imagepickermultiple},
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
      showPassToList: false,
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
    //    await this.taskhubStore.loadInitBanner(this.showLoading);
    // await this.taskhubStore.TaskInit(this.vendorId, this.showLoading);

    this.taskMoreDetailsList = this.taskhubStore.taskMoreDetailsList;


  },

  computed: {
    jobCategoryLabel() {
      const code = this.taskhubStore.taskMoreDetailsList?.dtlJobCategory;
      const categoryMap = {
        110: 'VendorBannerCreation',
        100: 'ProductCreation'
      };
      return categoryMap[code] || 'No Data';
    },

    hasNewInCategoryPath() {
      const path = this.taskhubStore.taskMoreDetailsList?.data?.categoryPath || "";
      // matches (New), (new), (NEW), etc anywhere in text
      return /\(new\)/i.test(path);
    }
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
    togglePassToList() {
      this.showPassToList = !this.showPassToList;
    },
    
    updateCategoryPath(newPath) {
      this.taskhubStore.taskMoreDetailsList.data.categoryPath = newPath;
    },

    handleSelectedImages(files) {
      console.log("Selected Files in Parent:", files);
      this.listFiles = files;
    },

    handleDeleteExistingImage(index) {
        mageroots.value.splice(index, 1);
    },

    //pass cat approvel
    async SendToApproval() {
      this.$showConfirm("Are you sure to this category approval ?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("TaskType", "100");//ProductCreation-100
            formData.append("WGRequestType", "1010");//NewCategoryRequest-1010
            const dataObj = {
              taskHubId: this.taskHubId,
              categoryPath: this.taskhubStore.taskMoreDetailsList?.data?.categoryPath,
              comment: this.comment || ""
            };
            formData.append("Data", JSON.stringify(dataObj));
            if (this.listFiles && this.listFiles.length > 0) {
              this.listFiles.forEach((file, index) => {
                formData.append("listFiles", file);
              });
            }

            const jsonObject = {};
            for (let [key, value] of formData.entries()) {
              if (jsonObject[key]) {
                jsonObject[key] = [].concat(jsonObject[key], value);
              } else {
                jsonObject[key] = value;
              }
            }
            console.log(jsonObject);
            
            await this.taskhubStore.SetPassToOtherWorkGroup(formData, this.showLoading);
          }
        });
    },

    //pass next 
    async PassTo() {
      if (!this.IsValidate()) return;
      this.$showConfirm("Are you sure Pass the DTP?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            const formData = new FormData();
            formData.append("TaskType", "100");//ProductCreation- 100
            formData.append("WGRequestType", "1030");//ProductUpload-1030
            const dataObj = {
              TaskHubId: this.taskHubId,
              CategoryPath: this.taskhubStore.taskMoreDetailsList?.data?.categoryPath,
              Comment: this.comment || "",
              StoreMapedDomainUrl: this.StoreMapedDomainUrl || "",
              StoreUrl: this.StoreUrl || "",
              StoreQRUrl: this.StoreQRUrl || "",
              StoreUsername: this.StoreUsername || "",
              StorePassword: this.StorePassword || "",
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

     IsValidate() {
      this.clearErr();
      let valid = true;

      if (!this.StoreUrl) {
        this.err.StoreUrl = "Please enter Store Url!";
        valid = false;
      }
      if (!this.StoreUsername) {
        this.err.StoreUsername = "Please enter Store Username!";
        valid = false;
      }
      if (!this.StorePassword) {
        this.err.StorePassword = "Please enter Store Password!";
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
