<template>
    <div class="modal-overlay" v-if="isOpen">
      <div class="modal">
        <!-- Modal Header -->
        <div class="modal-header">
            <h2 class="modal-title">Product Sample Assing DTP</h2>
            <closebtn @close="closeModal()" />
        </div>
  
        <div class="modal-content">
            <div class="form-content">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-1">Select DTP</label>
                        <select
                            v-model="selectedDtp"
                            @change="onDtpSelect"
                            class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
                        >
                            <option disabled value="">Select DTP</option>
                            <option
                            v-for="item in taskhubStore.listDTP"
                            :key="item.id"
                            :value="item"
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
        </div>
        <!-- End Modal Content -->

        <!-- Modal Footer -->
        <div class="modal-footer">
          <button @click="closeModal" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
          <button @click="SetApprove" class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
              font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
            Add
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { useOrderStore } from "~/stores/modules/orderStore";
import closebtn from "~/components/customcontrol/modal_close_button";
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";

import Swal from "sweetalert2";

export default {
  components: { closebtn },
  props: {
    commisionID: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      imageroot: "",
      isOpen: true,
      comment: '',
      kpiDays: '',
      dtpId : '',
      selectedDtp: null,
      IsDTPManulaSelected : false
    };
  },
  async created() {
    this.showLoading = this.$showLoading;

    this.userStore = useUserStore();
    this.taskhubStore = useTaskhubStore();

    await this.taskhubStore.loadInitBanner(this.showLoading);
  },
  async mounted() {
  },
  watch: {},
  computed: {
  },
  methods: {


    onDtpSelect() {
      if(this.selectedDtp) {
        this.dtpId = this.selectedDtp.id;
        this.clearErrorOnInput("dtpId");
      }
    },


    async SetApprove() {
 
      const confirmed = await this.$showConfirm(
        "Are you sure to Save Task Product Box Creation ?",
        "warning"
      );

      if (!confirmed.isConfirmed) return;
      let formData = new FormData();
      formData.append("commisionID", this.commisionID);
      formData.append("isPaid", true);
      formData.append("PaymentSlipImage", this.slipImageFile);


     for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
     
      await this.orderStore.AddCommissionPayment(formData, this.showLoading);

      // Do the payment


      this.closeModal();
      
    },

    IsValidate() {
      this.clearErr();
      let valid = true;


      if (!this.dtpId) {
        this.err.dtpId = "Please select a DTP!";
        valid = false;
      }
      if (!this.kpiDays) {
        this.err.kpiDays = "Please enter KPI days!";
        valid = false;
      }



      return valid;
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

   

  },
  async beforeMount() {
    // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
    // } else {
    //   this.show_error('Not Allowed to access this page')
    //   this.$router.push('/')
    // }
  },
  head() {
    return {
      title: "Intranet - Digital Tech Labs",
    };
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
  max-width: 900px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 70%;
  position: relative;
}

.modal-header {
  background: linear-gradient(to right, #1048c2, #0b2c88, #08236b); /* from-blue-600, via-blue-700, to-blue-900 */
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
