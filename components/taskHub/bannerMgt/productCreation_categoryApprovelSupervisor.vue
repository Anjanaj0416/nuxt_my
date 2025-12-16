<template>
    <section class="space-y-5">


        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div class="space-y-1">
            <label class="text-[12px] font-semibold text-gray-600">Main Category</label>
            <serach_Input
                :arrItems="taskhubStore.listMainCategory"
                ref="refMainCategory"
                @selectItem="GetSelectMainCategory"
            />
            </div>

            <div class="space-y-1">
            <label class="text-[12px] font-semibold text-gray-600">Sub Category</label>
            <serach_Input
                :arrItems="taskhubStore.listSubCategory"
                ref="refSubCategory"
                @selectItem="GetSelectSubCategory"
            />
            </div>

            <div class="space-y-1">
            <label class="text-[12px] font-semibold text-gray-600">Sub Sub Category</label>
            <serach_Input
                :arrItems="taskhubStore.listSubSubCategory"
                ref="refSubSubCategory"
                @selectItem="GetSelectSubSubCategory"
            />
            </div>

            <div class="space-y-1">
            <label class="text-[12px] font-semibold text-gray-600">Sub Sub Sub Category</label>
            <serach_Input
                :arrItems="taskhubStore.listSubSubSubCategory"
                ref="refSubSubSubCategory"
                @selectItem="GetSelectSubSubSubCategory"
            />
            </div>
        </div>

        <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 class="text-[12px] font-semibold text-gray-600">Category Path</h2>
            <p class="mt-1 text-sm font-medium text-gray-700 tracking-wide">
              {{ taskhubStore.taskMoreDetailsList?.data?.categoryPath || 'No Data' }}
            </p>
        </div>
        <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 class="text-[12px] font-semibold text-gray-600">CSO Name</h2>
            <p class="mt-1 text-sm font-medium text-gray-700 tracking-wide">
              {{ taskhubStore.taskMoreDetailsList?.data?.csoName || 'No Data' }}
            </p>
        </div>

        <div class="space-y-1">
          <div class="grid items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 sm:grid-cols-8 shadow-sm">
          <div class="sm:col-span-2">
              <h3 class="text-xs font-semibold text-gray-600">
              Main Category
              </h3>
          </div>
          <div class="sm:col-span-4">
              <input 
                type="text" 
                v-model="mainCategoryValue"
                placeholder="Enter sub SubSub Category"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
              />
          </div>
          <div class="sm:col-span-2 flex sm:justify-end"></div>
          </div>
          <div class="grid items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 sm:grid-cols-8 shadow-sm">
          <div class="sm:col-span-2">
              <h3 class="text-xs font-semibold text-gray-600">
              Sub Category
              </h3>
          </div>
          <div class="sm:col-span-4">
              
              <input 
                type="text" 
                v-model="subCategoryValue"
                placeholder="Enter sub SubSub Category"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
              />
          </div>

          <div class="sm:col-span-2 flex sm:justify-end"></div>
          </div>
          <div class="grid items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 sm:grid-cols-8 shadow-sm">
          <div class="sm:col-span-2">
              <h3 class="text-xs font-semibold text-gray-600">
              Sub Sub Category
              </h3>
          </div>
          <div class="sm:col-span-4">
            <input 
              type="text" 
              v-model="subSubCategoryValue"
              placeholder="Enter sub SubSub Category"
              class="w-full p-2 mt-2 text-sm border rounded-md" 
            />
          </div>

          <div class="sm:col-span-2 flex sm:justify-end"></div>
          </div>
          <div class="grid items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 sm:grid-cols-8 shadow-sm">
          <div class="sm:col-span-2">
              <h3 class="text-xs font-semibold text-gray-600">
              Sub Sub Sub Category
              </h3>
          </div>
          <div class="sm:col-span-4">
              <input 
                type="text" 
                v-model="subSubSubCategoryValue"
                placeholder="Enter sub SubSub Category"
                class="w-full p-2 mt-2 text-sm border rounded-md" 
              />
          </div>

          <div class="sm:col-span-2 flex sm:justify-end"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="text-[12px] font-semibold text-gray-600">Comment</label>
            <textarea
              v-model="comment"
              type="text"
              rows="3"
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
import workFlowDetails from "./workFlowDetails.vue";
import serach_Input from "~/components/customcontrol/SearchInput";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
    components:{serach_Input,workFlowDetails},
      props:['taskType','jobCategory', 'taskHubId', 'categoryPath'],


  data() {
    return {
      isaAssig: false,
      isShowWF: false,
      expandedRow: null, 
      mainCategoryId: "00000000-0000-0000-0000-000000000000",
      mainCategoryValue: "",
      subCategoryID: "00000000-0000-0000-0000-000000000000",
      subCategoryValue: "",
      subSubCategoryID: "00000000-0000-0000-0000-000000000000",
      subSubCategoryValue: "",
      subSubSubCategoryID: "00000000-0000-0000-0000-000000000000",
      subSubSubCategoryValue: "",
    };
  },

  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();
    

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
   
    await this.taskhubStore.loadInitBanner(this.showLoading);

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

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },
    cancel() {
      this.clearErr();
      this.closeModal();
    },
     GoToWorkFlow() {
      this.isShowWF = true;
    },
    closeWorkFlow() {
      this.isShowWF = false;
    },

    async GetSelectMainCategory(item) {
      this.mainCategoryId = item.id;
      this.mainCategoryValue = item.value;

      this.subCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subCategoryValue = "";
      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubCategoryValue = "";
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryValue = "";

      this.taskhubStore.listSubCategory = [];
      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubMainCategory(item.id, this.showLoading);

    },

    async GetSelectSubCategory(item) {
      this.subCategoryID = item.id;
      this.subCategoryValue = item.value;

      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubCategoryValue = "";
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryValue = "";

      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubCategory(item) {
      this.subSubCategoryID = item.id;
      this.subSubCategoryValue = item.value;

      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryValue = "";

      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);

    },

    async GetSelectSubSubSubCategory(item) {
      this.subSubSubCategoryID = item.id;
      this.subSubSubCategoryValue = item.value;

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async AprovelBanner() {
      try {
        const result = await this.$showConfirm(
          "Are you sure you want to approve this category?",
          "warning"
        );

        if (!result.isConfirmed) return;

        const CategoryItemDetails = {
          MainCategory: {
            Id: this.mainCategoryId || "00000000-0000-0000-0000-000000000000",
            Value: this.mainCategoryValue || ""
          },
          SubCategory: {
            Id: this.subCategoryID || "00000000-0000-0000-0000-000000000000",
            Value: this.subCategoryValue || ""
          },
          SubSubCategory: {
            Id: this.subSubCategoryID || "00000000-0000-0000-0000-000000000000",
            Value: this.subSubCategoryValue || ""
          },
          SubSubSubCategory: {
            Id: this.subSubSubCategoryID || "00000000-0000-0000-0000-000000000000",
            Value: this.subSubSubCategoryValue || ""
          }
        };
        const dataObj = {
          TaskHubId: this.taskHubId || "",
          CategoryPath: this.taskhubStore.taskMoreDetailsList?.data?.categoryPath || "",
          Comment: this.comment || "",
          CategoryItemDetails
        };

        const formData = new FormData();
        formData.append("TaskType", "1");//ProductCreation-100
        formData.append("WGRequestType", "1020");//NewCategoryApproval-1020
        // formData.append("Data", JSON.stringify(finalData));
        formData.append("Data", JSON.stringify(dataObj));
        if (this.listFiles?.length > 0) {
          this.listFiles.forEach((file) => {
            formData.append("listFiles", file || "");
          });
        }
        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        await this.taskhubStore.SetPassToOtherWorkGroup(formData, this.showLoading);
        this.resetCategoryFields();
      } catch (err) {
        console.error("Error:", err);
      }
    },

    //Reject
    async RejectBanner() {
   
      this.$showConfirm("Are you sure you want to reject this category?", "warning")
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

    resetCategoryFields() {
      this.mainCategoryId = "00000000-0000-0000-0000-000000000000";
      this.mainCategoryValue = "";

      this.subCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subCategoryValue = "";

      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubCategoryValue = "";

      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryValue = "";

      // Clear the dropdown/search lists
      this.taskhubStore.listSubCategory = [];
      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];
    },


    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },

    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
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
