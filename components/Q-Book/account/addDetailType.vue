<template>
    <div class="modal-overlay" v-if="isOpen">
      <div class="modal slide-modal">
        <div class="modal-header">
          <h2 class="modal-title">Add Detail Type</h2>
          <button
            @click="closeModal"
            class="bg-white rounded-full p-2 hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <div class="p-3">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-3 mt-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-3">
                  Name
                </label>
                <input
                  type="text"
                  v-model="name"
                  placeholder="Fuel Expense"
                  @input="clearErrorOnInput('name')"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 px-3 text-sm
                    focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/20"
                />
                <p v-if="err.name" class="mt-2 text-sm text-red-600">
                  {{ err.name }}
                </p>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-3">
                  Account Type
                </label>
                <select
                  v-model="AccountTypeId"
                  class="w-full rounded-lg border border-gray-300 bg-white
                        text-sm text-gray-700 px-4 py-2
                        focus:border-[#2ca01c] focus:ring-2 focus:ring-[#2ca01c]/20"
                  @input="clearErrorOnInput('AccountTypeId')"
                >
                <option disabled value="">Account Type</option>
                  <option
                    v-for="(cus, index) in qbookStore.accountTypes"
                    :key="index"
                    :value="cus.id"
                  >
                    {{ cus.value }}
                  </option>
                </select>
                <p v-if="err.AccountTypeId" class="mt-2 text-sm text-red-600">
                  {{ err.AccountTypeId }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="closeModal"
              class="px-12 py-2 text-xs font-semibold bg-white text-gray-600 rounded-lg shadow">
              Cancel
          </button>
          <button
              @click="SetAccount" 
              class="px-12 py-2 text-xs bg-[#bbd151] font-semibold text-gray-600 rounded-lg shadow">
              Save 
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { useUserStore } from '~/stores/modules/userStore';
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';
import closebtn from "~/components/customcontrol/modal_close_button";
import calendar from "~/components/customcontrol/calendar.vue";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";


definePageMeta({
  layout: "qbooklogin",
  middleware: 'auth-ebook',
});
export default {
  components: { closebtn,calendar,imagepickermultiple },
  data() {
    return {
      isOpen: true,
      imageroot: "",
      QbookshowLoading: null,
      showAlert: null,
      name:'',
      AccountTypeId:'',
      err: {
        name:'',
        AccountTypeId:'',

      }
    };
  },
  computed: {
  },
  async created() {
    this.QbookshowLoading = this.$QbookshowLoading;
    this.userStore = useUserStore();
    this.qbookStore = useQbookStore(),

    await this.qbookStore.detailTypeInit();

  },
  mounted() {
    // this.$refs.refCity.initItem(this.curLead.city);
    // this.$refs.refDistrict.initItem(this.curLead.district);
  },

  methods: {

    animateClose() {
      const modal = document.querySelector(".modal");
      modal.classList.add("slide-out");

      setTimeout(() => {
        this.isOpen = false;
        this.$emit("close");
      }, 300);
    },

    hasFormData() {
      return (
        (this.name && this.name.trim() !== "") ||
        !!this.AccountTypeId 
      );
    },


    async closeModal() {
      if (!this.hasFormData()) {
        this.animateClose();
        return;
      }
      const confirmed = await this.$showConfirmbqbook(
        "Leave without saving?",
        "You have entered data. If you close now, it will be lost.",
      );

      if (confirmed.isConfirmed) {
        this.animateClose();
      }
    },

    closeModalAfterSubmit() {
      this.isOpen = false;
      this.$emit("close");
    },

    async SetAccount() {
      if (!this.IsValidate()) return;

      const confirmed = await this.$showConfirmbqbook(
        "Are you sure to Save this Detail Type?",
        null,
        "warning"
      );

      if (!confirmed.isConfirmed) return;

      const req = {
        id : this.id || '',
        name : this.name,
        AccountTypeId : this.AccountTypeId
      };

      await this.qbookStore.setDetailType(req, this.QbookshowLoading);

      this.closeModalAfterSubmit();
    },

    // cancel() {
    //   this.closeModal();
    // },

    IsValidate() {
      this.clearErr();
      let isValid = true;


      if (!this.name) {
        this.err.name = "Please enter name";
        isValid = false;
      }

      if (!this.AccountTypeId) {
        this.err.AccountTypeId = "Please select account type";
        isValid = false;
      }

      return isValid;
    },

    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
    },

    clearErr() {
      Object.keys(this.err).forEach(key => {
        this.err[key] = "";
      });
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
  z-index: 9999;
  overflow: hidden;
}

/* Slide-in modal */
.modal {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 80%;
  max-width: 800px;
  background: white;
  border-radius: 1rem 0 0 1rem;
  display: flex;
  flex-direction: column;

  /* Animation */
  transform: translateX(100%);
  animation: slideIn 0.35s ease forwards;
}

/* Slide in animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Slide out animation */
.modal.slide-out {
  animation: slideOut 0.3s ease forwards;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* Header */
.modal-header {
  background: #bbd151;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Content */
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