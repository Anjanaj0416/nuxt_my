<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Add Leads Details
        </h2>
        <closebtn @close="closeModal" />
      </div>
<!-- {{quotationStore.initQuotation.listVendors}} -->
      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        
      </div>

      <div class=" modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="SetVendorLead()" class="confirm-button">
          Save Lead Details
        </button>
      </div>
    </div>
  </div>
</template>

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

      err: {
        CompanyName: "",
        Address: "",
        CompanyPhone: "",
        ContactPhoneNo: "",
      },
      imageroot: "",
      showLoading: null,
      showAlert: null,
    };
  },
  computed: {




  },
  async created() {
    this.userStore = useUserStore();
    this.leadStore = useLeadStore();
    this.curLead = this.leadStore.curLead;
    this.quotationStore = useQuotationStore();


    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;


  },
  mounted() {
    // this.$refs.refCity.initItem(this.curLead.city);
    // this.$refs.refDistrict.initItem(this.curLead.district);
  },
  methods: {
    closeModal() {
      this.leadStore.clearCurLead();
      this.clearErr();               
      this.isOpen = false;
      this.$emit("close");
    },

    clearCurLead() {
      this.curLead = {
        CompanyName: "",
        Address: "",
        CompanyPhone: "",
        ContactPhoneNo: "",
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


    SetVendorLead() {
     
      if (this.IsValidate()) {
       
        this.$showConfirm(
          "Are you sure to Save this Lead?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {
            if (this.curLead.Medium === undefined) {
              this.curLead.Medium = "Office";
            }
            console.log(JSON.stringify(this.curLead));
            await this.leadStore.SetVendorLead(this.curLead, this.showLoading, this.showAlert)
           
          } else {
            console.log("Action canceled");
          }
          this.leadStore.clearCurLead();
          this.closeModal();
          this.clearErr();
        });
       
      }
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      // if (!this.curLead.CompanyEmail) {
      //   this.err.CompanyEmail = "Please Enter an Email!";
      //   IsValidate = false;
      // } else {
      //   const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      //   if (!EmailRegex.test(this.curLead.CompanyEmail)) {
      //     this.err.CompanyEmail = "Please Enter a valid Email address!";
      //     IsValidate = false;
      //   }
      // }

      if (!this.curLead.CompanyName) {
        this.err.CompanyName = "Please Enter Company Name!";
        IsValidate = false;
      }

      if (!this.curLead.CompanyPhone) {
        this.err.CompanyPhone = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.curLead.CompanyPhone)) {
          this.err.CompanyPhone =
            "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.curLead.Address) {
        this.err.Address = "Please Enter Address!";
        IsValidate = false;
      }

      if (!this.curLead.ContactPhoneNo) {
        this.err.ContactPhoneNo = "Please Enter Contact Person Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.ContactPhoneNo)) {
          this.err.ContactPhoneNo = "Please Enter a valid 10-digit Contact Person Number!";
          IsValidate = false;
        }
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
  background: #0b2145;
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