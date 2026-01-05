<template>
    <div class="form-content">
      <div class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
        <div>
            <label class="block text-sm font-medium text-gray-600">Main Category</label>
            <serach_Input
            :arrItems="taskhubStore.listMainCategory"
            label=""
            ref="refMainCategory"
            @selectItem="GetSelectMainCategory"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-600">Sub Category</label>
            <serach_Input
            :arrItems="taskhubStore.listSubCategory"
            label=""
            ref="refSubCategory"
            @selectItem="GetSelectSubCategory"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-600">Sub Sub Category</label>
            <serach_Input
            :arrItems="taskhubStore.listSubSubCategory"
            label=""
            ref="refSubSubCategory"
            @selectItem="GetSelectSubSubCategory"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-600">Sub Sub Sub Category</label>
            <serach_Input
            :arrItems="taskhubStore.listSubSubSubCategory"
            label=""
            ref="refSubSubSubCategory"
            @selectItem="GetSelectSubSubSubCategory"
            />
        </div>
        <div>
          <button @click="addPath()"  class="px-12 py-2 text-xs mt-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                  font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
              Add category path
          </button>
        </div>
      </div>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Category Path</label>
            <ul class="space-y-1">
    <li
      v-for="(item, index) in categoryPaths"
      :key="index"
      class="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded"
    >
      {{ 
        [
          item.MainCategory.value,
          item.SubCategory.value,
          item.SubSubCategory.value,
          item.SubSubSubCategory.value
        ].filter(Boolean).join('/')
      }}
    </li>
  </ul>
        </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";
import serach_Input from "~/components/customcontrol/SearchInput";

definePageMeta({
  layout: "default",
});
export default {
  components: { serach_Input},
  props:['categoryPath'],

  data() {
    return {
      CategoryPath: "",
      categoryPaths: [],

      mainCategoryId: null,
      mainCategoryValue: "",

      subCategoryID: null,
      subCategoryValue: "",

      subSubCategoryID: null,
      subSubCategoryValue: "",

      subSubSubCategoryID: null,
      subSubSubCategoryValue: "",
    };
  },
  computed: {},

  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;
   
    await this.taskhubStore.loadInitBanner(this.showLoading);

  },
  mounted() {
    if (this.categoryPath) {
      this.CategoryPath = this.categoryPath;
    }
  },
  methods: {

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

    addPath() {
      if (!this.CategoryPath) return;

      const pathObj = {
        MainCategory: {
          Id: this.mainCategoryId,
          value: this.mainCategoryValue,
        },
        SubCategory: {
          Id: this.subCategoryID,
          value: this.subCategoryValue,
        },
        SubSubCategory: {
          Id: this.subSubCategoryID,
          value: this.subSubCategoryValue,
        },
        SubSubSubCategory: {
          Id: this.subSubSubCategoryID,
          value: this.subSubSubCategoryValue,
        },
      };

      // ✅ Add to list
      this.categoryPaths.push(pathObj);

      // ✅ Emit to parent / another component
      this.$emit("updatecategorypaths", this.categoryPaths);

      // ✅ Reset for next selection
      this.resetCategorySelection();
    },
    resetCategorySelection() {
      this.mainCategoryId = null;
      this.mainCategoryValue = "";

      this.subCategoryID = null;
      this.subCategoryValue = "";

      this.subSubCategoryID = null;
      this.subSubCategoryValue = "";

      this.subSubSubCategoryID = null;
      this.subSubSubCategoryValue = "";

      this.CategoryPath = "";

      // Clear dropdown data
      this.taskhubStore.listSubCategory = [];
      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      // Reset search inputs
      this.$refs.refMainCategory?.clear();
      this.$refs.refSubCategory?.clear();
      this.$refs.refSubSubCategory?.clear();
      this.$refs.refSubSubSubCategory?.clear();
    },


  },
};
</script>
