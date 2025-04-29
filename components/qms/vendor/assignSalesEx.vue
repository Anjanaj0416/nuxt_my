<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Assign Sales Ex.</h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div class="text-sm text-gray-500"> Vendor: {{ vendorStore.curVendor.shopName }} {{ vendorStore.curVendor.shopContactNo }}</div> 
          <div>
            <serach_Input
              :arrItems="vendorStore.initVendor.listRSOs"
              ref="rsocomp"
              label="Sales Exec."                 
              v-model="agentId"
              @selectItem="SelectAgent"
            />  
          </div>

          <p class="mt-4">Selected Sales Executive: {{ selectedAgentName }}</p>

          <!-- Error message for Sales Executive selection -->
          <div v-if="validationErrors.SelectAgent" class="mt-2 text-sm text-red-500">
            {{ validationErrors.SelectAgent }}
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
import serach_Input from '~/components/customcontrol/SearchInput'
import { useVendorStore } from "~/stores/modules/qms/vendorStore";

export default {
  components: { closebtn, serach_Input },
  data() {
    return {
      imageroot: process.env.Assets_83,
      isOpen: true,
      agentId: '',
      selectedAgentName: '',
      validationErrors: {
        SelectAgent: ''
      }
    }
  },
  async created() {
    this.vendorStore = useVendorStore();
  },
  methods: {
  SelectAgent(agentId) {
    this.vendorStore.curVendor.agentId = agentId;
    const selectedAgent = this.vendorStore.initVendor.listRSOs.find(agent => agent.id === agentId);
    this.selectedAgentName = selectedAgent ? selectedAgent.value : '';

    // Clear the validation error when an agent is selected
    this.validationErrors.SelectAgent = '';
  },
  closeModal() {
    this.isOpen = false;
    this.$emit('close');
  },
  GetSave() {
    this.handleSubmit(); 
  },
  handleSubmit() {
    this.validationErrors.SelectAgent = '';
    let hasErrors = false;
    if (!this.selectedAgentName) {
      this.validationErrors.SelectAgent = "Please select a Sales Executive!";
      hasErrors = true;
    }
    if (hasErrors) {
      return; 
    }
    this.saveData(); 
  },
  saveData() {
    console.log("Sales Executive selected:", this.agentId);
    // Close the modal and emit 'close' event
    this.isOpen = false;
    this.$emit('close');
  }
}



}
</script>



<style scoped>
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal Container */
.modal {
  background: white;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 50%; /* Set the default height for larger screens */
  position: relative; /* Needed for proper footer placement */
}

/* Modal Header */
.modal-header {
  background: #0b2145;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

/* Modal Content */
.modal-content {
  padding: 20px;
  max-height: 80%; /* Set max height */
  overflow-y: auto; /* Make it scrollable */
  flex-grow: 1; /* Allow content to grow */
}

/* Modal Footer */
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  position: absolute; /* Sticky footer */
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
  opacity: 0.8;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .modal {
    width: 100%; /* Full width on mobile */
    height: 100%; /* Full screen height on mobile */
    border-radius: 0; /* Remove rounded corners for mobile */
  }

  .modal-header {
    padding: 10px;
  }

  .modal-content {
    padding: 10px;
    max-height: none; /* Remove max-height for mobile */
    overflow-y: auto; /* Enable scroll */
    max-height: 80%; 
  }

  .modal-footer {
    padding: 10px;
  }
}
</style>
