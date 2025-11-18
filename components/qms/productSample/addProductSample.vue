<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Sample Product Box and banner</h2>
        <closebtn @close="closeModal()" />
      </div>


      <div class="modal-content">
        <div class="form-content">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
            <div>
              <span class="text-sm font-medium text-gray-600">
                Next Pending DTP ID:
              </span>
              <span v-if="taskhubStore?.nextPendingDTPId" class="ml-2 font-semibold text-sm text-gray-700">
                {{taskhubStore.nextPendingDTPId.value }}

              </span><br></br>

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

          <div class="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
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

import closebtn from "~/components/customcontrol/modal_close_button.vue";
import { useUserStore } from "~/stores/modules/userStore";
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";


export default {
  components: { closebtn },
  props: {
    vendorId: {
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
    await this.taskhubStore.TaskInit(this.vendorId, this.showLoading);
    

    this.nextPendingDTPId = this.taskhubStore.nextPendingDTPId

  },
  async mounted() {
  },
  watch: {},
  computed: {},
  methods: {
    toggleManualSelect() {
      this.IsDTPManulaSelected = !this.IsDTPManulaSelected;
      if (!this.IsDTPManulaSelected) {
        this.selectedDtp = null;
      }
    },

    onDtpSelect() {
      this.IsDTPManulaSelected = !!this.selectedDtp;
    },

    async SetApprove() {
      const confirmed = await this.$showConfirm(
        "Are you sure to assign task for sample product box creation ?",
        "warning"
      );
      if (!confirmed.isConfirmed) return;

        const dtpToSend = this.selectedDtp 
          ? this.selectedDtp.id 
          : this.taskhubStore.nextPendingDTPId.id;
        const formData = new FormData();
        formData.append("vendorId", this.vendorId || "");
        formData.append("dtpId", dtpToSend || "");
        formData.append("IsDTPManulaSelected", this.IsDTPManulaSelected || "");
        formData.append("kpiDays", this.kpiDays || "");
        formData.append("comment", this.comment || "");

       
        await this.taskhubStore.SampaleProducAssign(formData, this.showLoading)

        this.closeModal();
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
