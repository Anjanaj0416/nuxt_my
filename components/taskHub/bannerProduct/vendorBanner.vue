<template>
  <div class="p-6 space-y-6 overflow-y">
    <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Vendor Banner</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          type="number"
          placeholder="Enter KPI Days"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="err.kpiDays" class="mt-2 text-sm text-red-600">
          {{ err.kpiDays }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <span class="text-sm font-medium text-gray-600">
          Next Pending DTP :
        </span>
        <span v-if="taskhubStore?.nextPendingDTPId" class="ml-2 font-semibold text-sm text-gray-700">
          <!-- {{ taskhubStore.nextPendingDTPId.value }} -->
            {{ displayDtpValue }}
        </span>

        <span class="text-sm font-medium text-gray-600 ml-6">
          Next Pending B2B Supper Admin:
        </span>
        <span v-if="taskhubStore?.nextPendingSupperAdmin" class="ml-2 font-semibold text-sm text-gray-700">
          {{taskhubStore.nextPendingSupperAdmin.value }}

        </span>
        
        <br></br>

        <button
          @click="toggleManualSelect"
          class=" text-sm text-blue-600 underline hover:text-blue-800 border-none bg-transparent"
        >
            {{ IsDTPManulaSelected ? 'Allocate Next Pending DTP ID?' : 'Allocate another DTP?' }}
        </button>

        <!-- Dropdown only shown when manual allocation is enabled -->
        <div v-if="IsDTPManulaSelected" class="mt-2">
          <select
            v-model="selectedDtp"
            @change="onDtpSelect"
            class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
          >
            <option disabled selected value="">Select DTP</option>
            <option
              v-for="item in taskhubStore.listDTP"
              :key="item.id"
              :value="item"
            >
              {{ item.value }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Comment</label>
        <textarea
          v-model="comment"
          type="text"
          rows="5"
          placeholder="Enter Comment"
          class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">Material Upload</label>
          <imagepickermultiple
            @GetSelectedImages="handleSelectedImages"
            ref="refApprovedImg"
            accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
          />
      </div>
    </div>
  </div>
  <div class=" modal-footer">
    <button   @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
    <button @click="SetVendorBanner()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
            font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
        Create
    </button>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { imagepickermultiple},
  props: ['id', 'vendorId'],
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      selectedOption: "",
      selectedClient: null,
      optionError: "",
      IsDTPManulaSelected : false,
      expDate: '',
      sortOrder: '',
      comment: '',
      amount:'',
      kpiDays: '',
      dtpId : '',
      selectedDtp: "",
      listMaterialFiles: {},
      err: {
        expDate: '',
        sortOrder: '',
        comment: '',
        amount:'',
        kpiDays: '',
        dtpId : '',
        listMaterialFiles: '',
      },
    };
  },

  computed: {
    displayDtpValue() {
      return this.IsDTPManulaSelected && this.selectedDtp
        ? this.selectedDtp.value
        : this.taskhubStore?.nextPendingDTPId?.value;
    }
  },

  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;
   
    await this.taskhubStore.loadInitBanner(this.showLoading);
    await this.taskhubStore.TaskInit(this.vendorId, this.showLoading);
    this.nextPendingDTPId = this.taskhubStore.nextPendingDTPId
    this.taskhubStore.nextPendingSupperAdmin

  },
  mounted() {},

  computed: {
    displayDtpValue() {
      return this.IsDTPManulaSelected && this.selectedDtp
        ? this.selectedDtp.value
        : this.taskhubStore?.nextPendingDTPId?.value;
    }
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
      console.log("Selected Files in Parent:", files);
      this.listMaterialFiles = files;
    },

    formatToEndOfDayISO(dateStr) {
      if (!dateStr) return null;
      return `${dateStr}T23:59:59`;
    },

    toggleManualSelect() {
      this.IsDTPManulaSelected = !this.IsDTPManulaSelected;
      if (!this.IsDTPManulaSelected) {
        this.selectedDtp = "";
      }
    },

    onDtpSelect() {
      this.IsDTPManulaSelected = !!this.selectedDtp;
    },

    async SetVendorBanner() {
      if (!this.IsValidate()) return;

      this.$showConfirm("Are you sure to this Vendor Banner?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            const dtpToSend = 
              this.IsDTPManulaSelected && this.selectedDtp
                ? this.selectedDtp.id
                : (this.taskhubStore.nextPendingDTPId?.id || "");
            const formData = new FormData();
            formData.append("vendorId", this.vendorId);
            formData.append("expDate", this.formatToEndOfDayISO(this.expDate));
            formData.append("sortOrder", this.sortOrder);
            formData.append("comment", this.comment || "");
            formData.append("amount", this.amount || "");
            formData.append("kpiDays", this.kpiDays);
            formData.append("dtpId", dtpToSend || "");
            formData.append("IsDTPManulaSelected", this.IsDTPManulaSelected);

            if (this.listMaterialFiles && this.listMaterialFiles.length > 0) {
              this.listMaterialFiles.forEach((file) => {
                formData.append("listMaterialFiles", file);
              });
            }

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }

            await this.taskhubStore.SetVendorBanner(formData, this.showLoading);
  
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
      // if (!this.sortOrder) {
      //   this.err.sortOrder = "Please select a sort order!";
      //   valid = false;
      // }
      // if (!this.amount) {
      //   this.err.amount = "Please enter a amount!";
      //   valid = false;
      // }
  
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


