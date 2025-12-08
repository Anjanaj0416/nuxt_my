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
            A / B / C (New)
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
                <p class="text-sm font-medium text-gray-700">
                test
                </p>
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
                <p class="text-sm font-medium text-gray-700">
                test
                </p>
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
                <p class="text-sm font-medium text-gray-700">
                test
                </p>
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
                <p class="text-sm font-medium text-gray-700">
                test
                </p>
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
import createNewCategory from "../bannerProduct/createNewCategory.vue";
import workFlowDetails from "./workFlowDetails.vue";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";
import serach_Input from "~/components/customcontrol/SearchInput";


definePageMeta({
  layout: "default",
  middleware: "auth",
});

export default {
    components:{createNewCategory,workFlowDetails,imagepickermultiple,serach_Input},
      props:['taskType','jobCategory', 'taskHubId', 'categoryPath'],


  data() {
    return {
      isaAssig: false,
      isShowWF: false,
      expandedRow: null, 
      mainCategoryId: null,
      subCategoryID: null,
      subSubCategoryID: null,
      subSubSubCategoryID: null,
      
    };
  },

 async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;
   
    await this.taskhubStore.loadInitBanner(this.showLoading);

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
      this.updateCategoryPath();
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
      this.updateCategoryPath();
    },

    async GetSelectSubSubCategory(item) {
      this.subSubCategoryID = item.id;
      this.subSubCategoryValue = item.value;

      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryValue = "";

      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
      this.updateCategoryPath();
    },

    async GetSelectSubSubSubCategory(item) {
      this.subSubSubCategoryID = item.id;
      this.subSubSubCategoryValue = item.value;

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
      this.updateCategoryPath();
    },

    updateCategoryPath() {
      let path = [];

      if (this.mainCategoryValue) path.push(this.mainCategoryValue);
      if (this.subCategoryValue) path.push(this.subCategoryValue);
      if (this.subSubCategoryValue) path.push(this.subSubCategoryValue);
      if (this.subSubSubCategoryValue) path.push(this.subSubSubCategoryValue);

      this.CategoryPath = path.join('/');

    },

    SetCatPath() {
      if (!this.IsValidate()) return;

      this.$emit("update-category-path", this.CategoryPath);
      this.closeModal();
    },

    IsValidate() {
      this.clearErr();
      let valid = true;

      if (!this.CategoryPath) {
        this.err.CategoryPath = "Please enter a category Path!";
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
