<template>
  <div class=" mt-6 space-y-4">
      <!-- <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Create New Category</h2> -->
    <div class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
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
    </div>
    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Category Path</label>
        <textarea
          v-model="CategoryPath"
          type="text"
          placeholder="Enter Category Path"
          @input="clearErrorOnInput('CompanyName')"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
        <p class="mt-2 text-sm text-gray-500">Ex : AB/CD/EF ....</p>
        <p v-if="err.CategoryPath" class="mt-2 text-sm text-red-600">
          {{ err.CategoryPath }}
        </p>
      </div>
    </div>
    <!-- <div class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Task Type</label>
        <p>{{ taskType }}</p>
        
      </div>
    </div> -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Material Upload</label>
          <imagepickermultiple
            @GetSelectedImages="handleSelectedImages"
            ref="refApprovedImg"
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
          />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Comment</label>
        <textarea
          v-model="comment"
          type="date"
          rows="4"
          placeholder="Enter Comment"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
        
      </div>
    </div>
  </div>
  <div class="mt-6 flex justify-between">
    <button @click="cancel" 
      class="px-12 py-2 text-xs font-semibold transition bg-white text-gray-600 rounded-full shadow">
      Cancel
    </button>
    <button @click="SetApprovalCategory()" 
      class="px-12 py-2 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
            font-semibold transition text-white rounded-full shadow focus:ring-2 focus:ring-blue-400">
      Add Category
    </button>
  </div>

</template>

<script>
import { reactive, computed } from "vue";
import serach_Input from "~/components/customcontrol/SearchInput";
import imagepicker1 from "~/components/customcontrol/imagepicker1.vue";
import closebtn from "~/components/customcontrol/modal_close_button.vue";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";


import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { serach_Input, imagepicker1,closebtn,imagepickermultiple},
  props:['taskType','jobCategory', 'taskHubId', 'categoryPath'],

  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      comment: "",
      mainCategoryId: null,
      subCategoryID: null,
      subSubCategoryID: null,
      subSubSubCategoryID: null,
      CategoryPath: "",
      err: {
        requestedCategoryLevel: "",
        newCategoryName: "",
        kpiDays: "",
        CategoryPath: "",
      },
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

    handleSelectedImages(files) {
      console.log("Selected Files in Parent:", files);
      this.listFiles = files;
    },

    async SetApprovalCategory() {
      if (!this.IsValidate()) return;

      this.$showConfirm("Are you sure to this Main Banner?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();
            formData.append("TaskType", this.taskType);
            formData.append("WGRequestCategory", "NewCategoryRequest");
            const dataObj = {
              taskHubId: this.taskHubId,
              categoryPath: this.CategoryPath,
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

            this.closeModal();
            this.clearErr();
          }
        });
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

  },
};
</script>

<style scoped>
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
}

</style>