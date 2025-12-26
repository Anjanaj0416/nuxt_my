<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Add Tender</h2>
        <closebtn @close="closeModal" />
      </div>

        <div>
         <div class="p-6">
          <ul class="flex flex-col mt-6 sm:flex-row items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <li
              v-for="(option, idx) in optionsdata"
              :key="idx"
              class="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r last:border-r-0 border-gray-200"
            >
              <label
                class="flex flex-col items-center justify-center cursor-pointer p-3 hover:bg-purple-50 transition-colors duration-200"
                :class="selectedOption === option.value ? 'bg-purple-100 text-purple-800 font-semibold' : 'text-gray-700'"
              >
                <input
                  type="radio"
                   class="hidden"
                  :value="option.value"
                  v-model="selectedOption"
                  @input="clearErrorOnInput('job')"
                />
                <span class="mt-2">{{ option.label }}</span>
              </label>
            </li>
          </ul>
        </div>

        <p v-if="!selectedOption" class="text-center text-red-500 text-sm font-medium mt-2">
          Please select an option before entering details.
        </p>
        <!-- Dynamic Forms -->
        <transition name="fade" mode="out-in">
          <div v-if="selectedOption === 'private'" class="overflow-y-auto max-h-[55vh]">
            <privateCompanies  @close="closeModal"/>
          </div>

          <div v-else-if="selectedOption === 'government'" class="overflow-y-auto max-h-[55vh]">
            <governmentInstitutions @close="closeModal" />
          </div>

          <div v-else-if="selectedOption === 'supplier'" class="overflow-y-auto max-h-[55vh]">
            <supplierRegistration @close="closeModal" />
          </div>

        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import serach_Input from "~/components/customcontrol/SearchInput";
import closebtn from "~/components/customcontrol/modal_close_button";
import privateCompanies from "./privateCompanies.vue";
import governmentInstitutions from "./governmentInstitutions.vue";
import supplierRegistration from "./supplierRegistration.vue";

export default {
  components: { closebtn,privateCompanies,governmentInstitutions,supplierRegistration },
  props: ["id", "vendorId"],
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      selectedOption: "",
      VendorBanner: "",
      optionsdata: [
        { label: "Private Companies", value: "private" },
        { label: "Government Institutions", value: "government" },
        { label: "Private/Government supplier Registration", value: "supplier" },
      ],
      err: { job: "" },
    };
  },
  async created() {
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
  },
  computed: {},
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
      if (this.err[field]) this.err[field] = "";
    },

    IsValidate() {
      this.clearErr();
      if (!this.selectedOption) {
        this.err.job = "Please select an option before creating KPI!";
        return false;
      }
      return true;
    },
    clearErr() {
      Object.keys(this.err).forEach((key) => (this.err[key] = ""));
    },
  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal {
  background: white;
  width: 90%;
  max-width: 1200px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  overflow: hidden;
  position: relative;
}
.modal-header {
  background: linear-gradient(to right, #7032da,  #6D28D9, #5B21B6);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
.modal-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px;
  background: #f1f1f1;
    overflow: hidden; /* 🚫 prevents scrolling! */
  position: relative;
}

.cancel-button:hover,
.confirm-button:hover {
  opacity: 0.85;
}
/* Smooth Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* Responsive */
@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  .modal-header,
  .modal-content,
  .modal-footer {
    padding: 10px;
  }
}
</style>
