<template>
  <div class="p-6 space-y-6">
    {{ vendorId }}
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
              <label class="block text-sm font-medium text-gray-600 mb-1">Expire Date</label>
              <input
                v-model="expDate"
                type="date"
                class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Requested Category Level</label>
              <input
                v-model="requestedCategoryLevel"
                type="text"
                placeholder="Enter Category Level"
                class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">New Category Name</label>
              <input
                v-model="newCategoryName"
                type="text"
                placeholder="Enter Category Name"
                class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">KPI Days</label>
              <input
                v-model="kpiDays"
                type="number"
                placeholder="Enter KPI Days"
                class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Comment</label>
              <textarea
                v-model="kpiDays"
                type="date"
                rows="4"
                placeholder="Enter Comment"
                class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
  </div>
  <div class=" modal-footer">
    <button   @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
    <button @click="SetVendorLead()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
            font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
        Create
    </button>
  </div>
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
      mainId: null,
      err: {
        job: "",
        CompanyPhone: "",
        Address: "",
        ContactPhoneNo: "",
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

      this.taskhubStore.listSubCategory = [];
      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubMainCategory(item.id, this.showLoading);
    },

    async GetSelectSubCategory(item) {
      console.log("Selected Sub Category ID:", item.id);

      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubCategory(item) {
      console.log("Selected SubSub Category ID:", item.id);

      // Clear dependent dropdowns first
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },



    SetApprovalCategory() {
     
      if (this.IsValidate()) {
       return
        this.$showConfirm(
          "Are you sure to Save this Lead?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {
            if (this.Medium === undefined) {
              this.Medium = "Office";
            }
            console.log(JSON.stringify(this.curLead));
           
          } else {
            console.log("Action canceled");
          }
        
          this.closeModal();
          this.clearErr();
        });
       
      }
    },

    IsValidate() {
      this.clearErr();
      let IsValidate = true;

      if (!this.selectedOption) {
            this.err.job = "Please select an option before creating KPI!";
            IsValidate = false;
        }

      return IsValidate;
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


