<template>
  <div class="p-6 space-y-6 overflow-y">
    <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Category Banner Details</h2>

    <p v-if="vendorId"></p>
    <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-600">Select Vendor</label>
        <serach_Input
          :arrItems="leadStore.InitLeads.listClients"
          label=""
          ref="refMainCategory"
          @selectItem="GetSelectVendor"
        />
      </div>
    </div>

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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <label class="block text-sm font-medium text-gray-600 mb-1">Expire Date</label>
        <input
          v-model="expDate"
          @input="clearErrorOnInput('expDate')"
          type="date"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="err.expDate" class="mt-2 text-sm text-red-600">
          {{ err.expDate }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Sort Order</label>
        <input
          v-model="sortOrder"
          @input="clearErrorOnInput('sortOrder')"
          type="number"
          placeholder="Enter Sort Order"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="err.sortOrder" class="mt-2 text-sm text-red-600">
          {{ err.sortOrder }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Amount</label>
        <input
          v-model="amount"
          @input="clearErrorOnInput('amount')"
          type="number"
          placeholder="Enter Amount"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="err.amount" class="mt-2 text-sm text-red-600">
          {{ err.amount }}
        </p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">KPI Days</label>
        <input
          v-model="kpiDays"
          @input="clearErrorOnInput('kpiDays')"
          type="text"
          placeholder="Enter KPI Days"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="err.kpiDays" class="mt-2 text-sm text-red-600">
          {{ err.kpiDays }}
        </p>
      </div>
      <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Select DTP</label>
          <select
            v-model="dtpId"
            @input="clearErrorOnInput('dtpId')"
            class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option disabled value="">Select DTP</option>
            <option
              v-for="item in taskhubStore.listDTP"
              :key="item.id"
              :value="item.id"
            >
              {{ item.value }}
            </option>
          </select>
          <p v-if="err.dtpId" class="mt-2 text-sm text-red-600">
            {{ err.dtpId }}
          </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Material Upload</label>
          <imagepickermultiple
            @GetSelectedImages="handleSelectedImages"
            ref="refApprovedImg"
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
          />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Comment</label>
        <textarea
          v-model="comment"
          type="text"
          rows="4"
          placeholder="Enter Comment"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  </div>
  <div class=" modal-footer">
    <button   @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
    <button @click="SetMainBanner()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
            font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
        Create
    </button>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";
import serach_Input from "~/components/customcontrol/SearchInput";
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";
import { useLeadStore } from "~/stores/modules/qms/leadStore";



definePageMeta({
  layout: "default",
});
export default {
  components: {imagepickermultiple,serach_Input},
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
      mainCategoryId: null,
      subCategoryID: null,
      subSubCategoryID: null,
      subSubSubCategoryID: null,
      amount:'',
      kpiDays: '',
      dtpId : '',
      expDate: '',
      sortOrder: '',
      comment: '',
      requestedCategoryLevel: '',
      listMaterialFiles: {},
      
      err: {
        amount:'',
        kpiDays: '',
        dtpId : '',
        expDate: '',
        sortOrder: '',
        comment: '',
        requestedCategoryLevel: '',
        listMaterialFiles: {},
      },
    };
  },
  computed: {},

  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();
    this.leadStore = useLeadStore();

    this.curLead = this.leadStore.curLead;
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

    handleSelectedImages(files) {
      // console.log("Selected Files in Parent:", files);
      this.listMaterialFiles = files;
    },

    formatToEndOfDayISO(dateStr) {
      if (!dateStr) return null;
      return `${dateStr}T23:59:59`;
    },

    async GetSelectVendor(item){
      // console.log('ven:',item.id);
      this.vendorId = item.id
    },

    async GetSelectMainCategory(item) {
      // console.log("Selected Main Category ID:", item.id);
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
      // console.log("Selected Sub Category ID:", item.id);
      this.subCategoryID = item.id;

      this.subSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";

      this.taskhubStore.listSubSubCategory = [];
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubCategory(item) {
      // console.log("Selected SubSub Category ID:", item.id);
      this.subSubCategoryID = item.id;

      // Clear dependent dropdowns first
      this.subSubSubCategoryID = "00000000-0000-0000-0000-000000000000";
      this.taskhubStore.listSubSubSubCategory = [];

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async GetSelectSubSubSubCategory(item) {
      // console.log("Selected SubSub Category ID:", item.id);
      this.subSubSubCategoryID = item.id;

      await this.taskhubStore.GetSubCategory(item.id, this.showLoading);
    },

    async SetMainBanner() {
      if (!this.IsValidate()) return;

      this.$showConfirm("Are you sure to this Main Banner?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();
            formData.append("vendorId", this.vendorId);
            formData.append("MainCategoryId", this.mainCategoryId);
            formData.append("SubCategoryID", this.subCategoryID);
            formData.append("SubSubCategoryID", this.subSubCategoryID);
            formData.append("SubSubSubCategoryID", this.subSubSubCategoryID);
            formData.append("ExpDate", this.formatToEndOfDayISO(this.expDate));
            formData.append("SortOrder", this.sortOrder);
            formData.append("Amount", this.amount);
            formData.append("Comment", this.comment);
            formData.append("KPIDays", this.kpiDays);
            formData.append("RequestedCategoryLevel", this.requestedCategoryLevel);
            formData.append("DTPId", this.dtpId);

            if (this.listMaterialFiles) {
              formData.append("listMaterialFiles", this.listMaterialFiles);
            }

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }

            await this.taskhubStore.AddCategoryBanner(formData, this.showLoading);

            this.closeModal();
            this.clearErr();
          }
        });
    },

    IsValidate() {
      this.clearErr();
      let valid = true;

      if (!this.expDate) {
        this.err.expDate = "Please enter a expire day!";
        valid = false;
      }
      if (!this.requestedCategoryLevel) {
        this.err.requestedCategoryLevel = "Please select requested category Level!";
        valid = false;
      }
      // if (!this.sortOrder) {
      //   this.err.sortOrder = "Please select sort Order!";
      //   valid = false;
      // }
      // if (!this.amount) {
      //   this.err.amount = "Please enter a amount!";
      //   valid = false;
      // }
      if (!this.dtpId) {
        this.err.dtpId = "Please select a dtp!";
        valid = false;
      }
      // if (!this.kpiDays) {
      //   this.err.kpiDays = "Please enter KPI days!";
      //   valid = false;
      // }

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


