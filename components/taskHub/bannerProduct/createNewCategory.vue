<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">
          Category Rquest
        </h2>
        <closebtn @close="closeModal" />
      </div>
      <!-- {{quotationStore.initQuotation.listVendors}} -->
      <div class="modal-content">
        <div class="form-content">
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
              <p class="mt-2 text-sm text-gray-500">Ex : AB/CD/EF(New) ....</p>
              <p v-if="err.CategoryPath" class="mt-2 text-sm text-red-600">
                {{ err.CategoryPath }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class=" modal-footer">
        <button @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
        <button @click="SetCatPath()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
          Pass Category
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import serach_Input from "~/components/customcontrol/SearchInput";
import imagepicker1 from "~/components/customcontrol/imagepicker1.vue";
import closebtn from "~/components/customcontrol/modal_close_button.vue";

import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { serach_Input, imagepicker1,closebtn},
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
    }

  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: cEnter;
  align-items: cEnter;
  z-index: 9999;
}

.modal {
  background: white;
  width: 80%;
  max-width: 1200px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 80%;
  position: relative;
}

.modal-header {
  background: linear-gradient(to right, #1048c2, #0b2c88, #08236b); /* from-blue-600, via-blue-700, to-blue-900 */
  backdrop-filter: blur(12px); /* backdrop-blur-md */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: cEnter;
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.modal-content {
  padding: 20px;
  max-height: 80%;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.cancel-button {
  background: #e4e4e4;
  color: #333;
}

.confirm-button {
  background: #0b2145;
  color: white;
}

@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none;
  }

  .modal-footer {
    position: sticky;
    bottom: 0;
    padding: 10px;
  }
}
</style>