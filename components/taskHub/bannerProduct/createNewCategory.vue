<template>
  <div class="p-6 space-y-6">
    <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Create New Category</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Requested Category Level</label>
            <select
                v-model="requestedCategoryLevel"
                @input="clearErrorOnInput('requestedCategoryLevel')"
                class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
              >
              <option disabled value="">Select Status</option>
              <option value="1">Main Category</option>
              <option value="2">Sub Category</option>
              <option value="3">Sub Sub Category</option>
              <option value="4">Sub Sub Sub Category</option>
            </select>
            <p v-if="err.requestedCategoryLevel" class="mt-2 text-sm text-red-600">
            {{ err.requestedCategoryLevel }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">New Category Name</label>
          <input
            v-model="newCategoryName"
            @input="clearErrorOnInput('newCategoryName')"
            type="text"
            placeholder="Enter Category Name"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="err.newCategoryName" class="mt-2 text-sm text-red-600">
            {{ err.newCategoryName }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">KPI Days</label>
          <input
            v-model="kpiDays"
            @input="clearErrorOnInput('kpiDays')"
            type="number"
            placeholder="Enter KPI Days"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
          <p v-if="err.kpiDays" class="mt-2 text-sm text-red-600">
            {{ err.newCategoryName }}
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <button   @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
    </div>
    <div>
      <button @click="SetApprovalCategory()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
            font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
        Create
      </button>
    </div>
  </div>
<hr></hr>
</template>

<script>
import { reactive, computed } from "vue";
import serach_Input from "~/components/customcontrol/SearchInput";
import imagepicker1 from "~/components/customcontrol/imagepicker1.vue";

import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { serach_Input, imagepicker1},
  props: ['id', 'vendorId'],
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      selectedOption: "",
      selectedClient: null,
      optionError: "",
      options: [
        { label: "New Category", value: "category" },
        { label: "Main Banner", value: "mainBanner" },
        { label: "Category Banner", value: "categoryBanner" },
        { label: "Vendor Banner", value: "vendorBanner" },

      ],
      requestedCategoryLevel: "",
      newCategoryName: "",
      kpiDays: "",
      comment: "",
      mainCategoryId: null,
      subCategoryID: null,
      subSubCategoryID: null,
      subSubSubCategoryID: null,
      err: {
        requestedCategoryLevel: "",
        newCategoryName: "",
        kpiDays: "",
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
      console.log("Selected Main Category ID:", item.id);
      this.mainCategoryId = item.id; 

      this.subCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";

      this.taskhubStore.listSubCategory = [];
      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubMainCategory(item.id, this.showLoading);
    },

    async GetSelectSubCategory(item) {
      console.log("Selected Sub Category ID:", item.id);
      this.subCategoryID = item.id;

      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";

      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubCategory(item) {
      console.log("Selected SubSub Category ID:", item.id);
      this.subSubCategoryID = item.id;

      // Clear dependent dropdowns first
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubSubCategory(item) {
      console.log("Selected SubSub Category ID:", item.id);
      this.subSubSubCategoryID = item.id;

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },


    SetApprovalCategory() {
      if (!this.IsValidate()) return;

      this.$showConfirm("Are you sure to this New Category Request?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            // Build request in your existing style
            let request = {
                vendorId: this.vendorId,
                mainCategoryId: this.mainCategoryId || null,
                subCategoryID: this.subCategoryID || null,
                subSubCategoryID: this.subSubCategoryID || null,
                subSubSubCategoryID: this.subSubSubCategoryID || null,
                requestedCategoryLevel: this.requestedCategoryLevel,
                newCategoryName: this.newCategoryName,
                kpiDays: this.kpiDays,
                comment: this.comment,
            };

            // Send to backend
            console.log(JSON.stringify(request));
            await this.taskhubStore.AddNewCategoryApproval(request, this.showLoading);

            this.closeModal();
            this.clearErr();
          } else {
            console.log("Action canceled");
          }
        });
    },


    IsValidate() {
      this.clearErr();
      let valid = true;

      if (!this.newCategoryName) {
        this.err.newCategoryName = "Please enter a category name!";
        valid = false;
      }
      if (!this.requestedCategoryLevel) {
        this.err.requestedCategoryLevel = "Please select a category level!";
        valid = false;
      }
      if (!this.kpiDays) {
        this.err.kpiDays = "Please enter KPI days!";
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


