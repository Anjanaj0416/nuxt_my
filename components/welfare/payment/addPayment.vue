<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          {{ t('addMembersPayment') }}
        </h2>
        <closebtn @close="closeModal" />
      </div>
      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <!-- <h3 class="font-bold">General Information</h3> -->
          <!-- <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-2">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Company Search <span class="text-red-500">*</span>
              </label>
              <serach_Input
                :arrItems="leadStore.InitLeads.listClients"
                label=""
              />
            </div>
          </div> -->
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                Pay Amount <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="curLead.amount" placeholder="Enter amount" required @input="clearErrorOnInput('amount')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.amount" class="mt-2 text-sm text-red-600">
                {{ err.amount }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                Payment Date<span class="text-red-500">*</span>
              </label>
              <input type="date" v-model="curLead.payment" placeholder="Enter payment Line 1" required @input="clearErrorOnInput('payment')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.payment" class="mt-2 text-sm text-red-600">
                {{ err.payment }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class=" modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="SetPayment()"  class="px-5 py-2 text-xs font-semibold transition bg-[#232B37] text-white rounded-md shadow hover:gray-400 focus:ring-2 focus:ring-indigo-400">
          Add Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const { t } = useI18n()

  function switchLang(lang) {
    locale.value = lang
  }
</script>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import imagecomp from "~/components/customcontrol/imagepicker";
import ImageLable from "~/components/customcontrol/ImageLable";
import serach_Input from "~/components/customcontrol/SearchInput";
import { useUserStore } from "~/stores/modules/userStore";
import toggleoption from "~/components/customcontrol/toggleoption";
import { useLeadStore } from "~/stores/modules/qms/leadStore";
import { useQuotationStore } from "~/stores/modules/qms/quotationStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption },
  data() {
    return {
      isOpen: true,
      curLead: {
        amount: "",
        payment: "",

      },
      err: {
        amount: "",
        payment: "",
      },
      imageroot: "",
      showLoading: null,
      showAlert: null,
    };
  },
  computed: {
    isEditing() {
      return (
        this.curLead &&
        this.curLead.id !== "00000000-0000-0000-0000-000000000000"
      );
    },


  },
  async created() {
    this.userStore = useUserStore();
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;

  },
  mounted() {
    // this.$refs.refCity.initItem(this.curLead.city);
    // this.$refs.refDistrict.initItem(this.curLead.district);
  },
  methods: {
 


    SetPayment() {
     
      if (this.IsValidate()) {
       
        this.$showConfirm(
          "Are you sure to Save this Lead?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {
            console.log(JSON.stringify(this.curLead));

           
          } else {
            console.log("Action canceled");
          }
          this.clearCurLead();
          this.closeModal();
          this.clearErr();
        });
       
      }
    },

    closeModal() {
      this.clearErr();               
      this.isOpen = false;
      this.$emit("close");
    },

    clearCurLead() {
      this.curLead = {
        amount: "",
        payment: "",
      };
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

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      if (!this.curLead.amount) {
        this.err.amount = "Please Enter Amount!";
        IsValidate = false;
      }

      if (!this.curLead.payment) {
        this.err.payment = "Please Enter Payment Date!";
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
  max-width: 800px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 70%;
  position: relative;
}

.modal-header {
  background: #232B37; /* from-blue-600, via-blue-700, to-blue-900 */
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

button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

.cancel-button {
  background: #e4e4e4;
  color: #333;
}

.confirm-button {
  background: #0b2145;
  color: white;
}

button:hover {
  opaCity: 0.8;
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
    padding: 10px;
  }
}
</style>