<template>
    <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Category Banner Details</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Expire Date</label>
            <input
            v-model="ExpireDate"
            type="date"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Amount</label>
            <input
            v-model="amount"
            type="text"
            placeholder="Enter Amount"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
            />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">KPI Days</label>
            <input
            v-model="ContactPhoneNo"
            type="text"
            placeholder="Enter KPI Days"
            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
            />
        </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Select DTP</label>
            <select
            v-model="curProductStatus"
            class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
            >
            <option disabled value="">Select DTP</option>
            <option value="complete">Complete</option>
            <option value="not-complete">Not Complete</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-600 mb-1">Select Super Admin</label>
            <select
            v-model="curProductStatus"
            class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
            >
            <option disabled value="">Select Status</option>
            <option value="complete">Complete</option>
            <option value="not-complete">Not Complete</option>
            </select>
        </div>
    </div>

    <div>
    <label class="block text-sm font-medium text-gray-600 mb-1">Material Upload</label>
    <imagepicker1
        :existingImagePaths="imageroots"
        @GetSelectedImages="handleSelectedImages"
        @deleteExistingImage="handleDeleteExistingImage"
    />
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
  components: { serach_Input, imagepicker1 },
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
    this.initBanner = this.taskhubStore.initBanner;
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
        console.log('Selected Files:', files);
    },

    SetVendorLead() {
     
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