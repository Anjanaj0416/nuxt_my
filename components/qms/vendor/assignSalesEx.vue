<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Assign Sales Ex.</h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content -->
      <div class="modal-content">
        <div class="form-content">
          <div class="mb-1 text-xs text-gray-800">Sales Executive</div>
          <serach_Input :arrItems="vendorStore.initVendor.listRSOs" ref="rsocomp" label="Sales Exec." v-model="rsoNo"
            @selectItem="SelectAgent" />

          <div v-if="err.rsoNo" class="mt-1 text-xs text-red-500">
            {{ err.rsoNo }}
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="GetSave" class="confirm-button">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import closebtn from "~/components/customcontrol/modal_close_button";
import serach_Input from "~/components/customcontrol/SearchInput";
import { useVendorStore } from "~/stores/modules/qms/vendorStore";

definePageMeta({ layout: 'default' });

export default {
  components: { closebtn, serach_Input },
  data() {
    return {
      imageroot: process.env.Assets_83,
      isOpen: true,
      rsoNo: "",
      showLoading: null,
      err: { rsoNo: "" },
    };
  },
  props: {
    leadId: {
      type: [String, Number],
      required: true
    }
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.vendorStore = useVendorStore();
  },
  methods: {
    SelectAgent(rsoNo) {
      this.rsoNo = rsoNo;
    },
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },
    async GetSave() {
      if (this.IsValidate()) {
        this.vendorStore.curVendor.rsoNo = this.rsoNo;
        // const req = { Id: this.vendorStore.curVendor.id, RSONo: this.rsoNo };
        const req = {
          Id: this.vendorStore.curVendor.id || this.leadId,
          RSONo: this.rsoNo,
        };
        console.log(JSON.stringify(req, null, 2));

        await this.vendorStore.GetAssignSalesRef(req, this.showLoading);
        this.closeModal();
      }
    },
    IsValidate() {
      let isValid = true;
      this.err.rsoNo = this.rsoNo ? "" : "Please select a Sales Executive!";
      return !!this.rsoNo;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  width: 600px;
  height: 300px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 14px;
}

.modal-header,
.modal-footer {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 16px;
  font-weight: bold;
}

.modal-content {
  padding: 10px 15px;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  border-radius: 4px;
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
  opacity: 0.85;
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .modal {
    width: 90%;
  }
}
</style>
