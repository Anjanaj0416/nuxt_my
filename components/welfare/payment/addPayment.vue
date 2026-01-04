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
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                 {{ t('addMembersPaymentAmount') }} <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="curLead.amount"  :placeholder="t('addMembersPaymentEnterAmount')" required @input="clearErrorOnInput('amount')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.amount" class="mt-2 text-sm text-red-600">
                {{ err.amount }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersPaymentDate') }}<span class="text-red-500">*</span>
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

      <!-- <div class=" modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="SetPayment()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
          Add Payment
        </button>
      </div> -->
      <div class="modal-footer">
        <button @click="closeModal" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">{{ t('cancel') }}</button>
        <button @click="SetPayment()" class="px-12 py-2 text-xs  bg-[#232B37] text-white 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
           {{ t('addMembersPaymentAdd') }}
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
import closebtn from "~/components/customcontrol/modal_close_button";
import { useUserStore } from "~/stores/modules/userStore";
import { useWelfareStore } from '~/stores/modules/welfare/welfareStore';


definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn },
  props: {
    memberId: {
      type: [String, Number],
      required: true
    }
  },
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
    this.welfareStore = useWelfareStore();
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
      this.$showConfirmWelfare(
        "Are you sure to save this payment?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {

          const req = {
            memberId: this.memberId,
            amount: this.curLead.amount,
            paidDate: this.curLead.payment
          }

          console.log("PAYLOAD ", req)

          await this.welfareStore.addPayment(req,this.showLoading)
        }

        this.clearCurLead()
        this.closeModal()
      })
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