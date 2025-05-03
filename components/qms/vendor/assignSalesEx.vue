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
          <div class="text-sm text-gray-800">Sales Executive</div>
          <div>
            <serach_Input
              :arrItems="vendorStore.initVendor.listRSOs"
              ref="rsocomp"
              label="Sales Exec."
              v-model="rsoNo"
              @selectItem="SelectAgent"
            />
          </div>

          <!-- Error message for Sales Executive selection -->
          <div v-if="err.rsoNo" class="mt-2 text-sm text-red-500">
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
definePageMeta({
  layout: 'default',   

 });
export default {
  components: { closebtn, serach_Input },
  data() {
    return {
      imageroot: process.env.Assets_83,
      isOpen: true,
      rsoNo: "",
      showLoading: null,
      err: {
        rsoNo: "",
      },
    };
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
         let req = {Id:this.vendorStore.curVendor.id,RSONo: this.rsoNo};       
         await this.vendorStore.GetAssignSalesRef(req,this.showLoading);         
        this.closeModal();
      }
    },
    IsValidate() {
      let isValidate = true;

      if (this.rsoNo == "") {
        this.err.rsoNo = "Please select a Sales Executive!";
        isValidate = false;
      } else {
        this.err.rsoNo = "";
      }

      return isValidate;
    },

    objectToFormData(obj) {
      const formData = new FormData();

      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];

        if (value === null || value === undefined) continue;

        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v, i) => {
            formData.append(`${key}[${i}]`, v);
          });
        } else {
          formData.append(key, value.toString());
        }
      }

      return formData;
    },
  },
};
</script>

<style scoped>
/* Modal Overlay */
.modal-content {
   
    height: 150px!important
   
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
