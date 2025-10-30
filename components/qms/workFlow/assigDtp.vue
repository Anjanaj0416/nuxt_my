<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Create KPI</h2>
        <closebtn @close="closeModal" />
      </div>

        <div>
         <div class="p-6">
          <ul class="flex flex-col mt-6 sm:flex-row items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <li
              v-for="(option, idx) in options"
              :key="idx"
              class="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r last:border-r-0 border-gray-200"
            >
              <label
                class="flex flex-col items-center justify-center cursor-pointer p-3 hover:bg-blue-50 transition-colors duration-200"
                :class="selectedOption === option.value ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-700'"
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
          <div v-if="selectedOption === 'category'" class="overflow-y-auto max-h-[55vh]">
            <createNewCategory :vendorId="vendorId" @close="closeModal"/>
          </div>

          <div v-else-if="selectedOption === 'mainBanner'" class="overflow-y-auto max-h-[55vh]">
            <mainBanner :vendorId="vendorId" @close="closeModal"/>
          </div>

          <div v-else-if="selectedOption === 'categoryBanner'" class="overflow-y-auto max-h-[55vh]">
            <categoryBanner :vendorId="vendorId" />
          </div>

          <div v-else-if="selectedOption === 'vendorBanner'" class="overflow-y-auto max-h-[55vh]">
            <input
              v-model="VendorBanner"
              type="text"
              placeholder="Enter Vendor Banner"
              class="w-full p-3 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
            />
          </div>
        </transition>
      </div>



    </div>
  </div>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";

import serach_Input from "~/components/customcontrol/SearchInput";
import closebtn from "~/components/customcontrol/modal_close_button";
import imagepicker1 from "~/components/customcontrol/imagepicker1.vue";
import createNewCategory from "../taskHub/bannerProduct/createNewCategory.vue";
import mainBanner from "../taskHub/bannerProduct/mainBanner.vue";
import categoryBanner from "../taskHub/bannerProduct/categoryBanner.vue";

export default {
  components: { serach_Input, imagepicker1, createNewCategory, mainBanner, categoryBanner, closebtn },
  props: ["id", "vendorId"],
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      selectedOption: "",
      VendorBanner: "",
      options: [
        { label: "New Category", value: "category" },
        { label: "Main Banner", value: "mainBanner" },
        { label: "Category Banner", value: "categoryBanner" },
        { label: "Only Vendor Banner", value: "vendorBanner" },
        { label: "Product and Vendor Banner", value: "vendorBanner" },
      ],
      err: { job: "" },
    };
  },
  async created() {
    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;
    await this.taskhubStore.loadInitBanner(this.showLoading);
    this.initBanner = this.taskhubStore.initBanner;
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
  background: linear-gradient(to right, #1048c2, #0b2c88, #08236b);
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
