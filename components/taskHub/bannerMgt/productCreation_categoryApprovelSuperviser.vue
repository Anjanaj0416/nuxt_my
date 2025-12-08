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
            <div class="sm:flex sm:justify-end sm:gap-4">
                <div class="flex justify-end pt-2 gap-2">
                    <button
                    @click="SetCatPath"
                    class="p-r px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                    font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400"
                    >
                    Aprovel
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";
import serach_Input from "~/components/customcontrol/SearchInput";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
    components:{serach_Input},
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
    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
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


    async SetCatPath() {
      this.$showConfirm("Are you sure Approval?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const req = {
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

             console.log("Sending to backend", req);

            await this.taskhubStore.SaveB2BCategoryItem(req, this.showLoading);
            this.resetCategoryFields();

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
