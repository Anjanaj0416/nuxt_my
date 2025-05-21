<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          <!-- Vendor Details - {{ isEditing ? "Edit" : "Add" }} -->
           Adding Promise.lk Data
        </h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div>
            <div v-if="isEditing" >
              <!-- One row with left and right content -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold">Business Details</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Registration Authority ID</label>
              <input
                type="text"
                placeholder="Enter Registration Authority ID"
                v-model="addData.registrationAuthorityID"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.registrationAuthorityID" class="mt-2 text-sm text-red-600">
                {{ err.registrationAuthorityID }}
              </p>
            </div>
            
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Vendor</label>

              <input
                type="text"
                placeholder="Enter Vendor"
                v-model="addData.vendor"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.vendor" class="mt-2 text-sm text-red-600">
                {{ err.vendor }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>
              <input
                type="text"
                placeholder="Enter City"
                v-model="addData.city"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.city" class="mt-2 text-sm text-red-600">
                {{ err.city }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Zip Code</label>
              <input
                type="text"
                placeholder="Enter Zip Code"
                v-model="addData.zipCode"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.zipCode" class="mt-2 text-sm text-red-600">
                {{ err.zipCode }}
              </p>
            </div>
            
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Officer Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Officer Title Id</label>
              <input
                type="text"
                placeholder="Enter Officer Title Id"
                v-model="addData.officerTitleId"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerTitleId" class="mt-2 text-sm text-red-600">
                {{ err.officerTitleId }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Officer NIC</label>
              <input
                type="text"
                placeholder="Enter Officer NIC"
                v-model="addData.officerNIC"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerNIC" class="mt-2 text-sm text-red-600">
                {{ err.officerNIC }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Officer Passport</label>
              <input
                type="text"
                placeholder="Enter Officer Passport"
                v-model="addData.officerPassport"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerPassport" class="mt-2 text-sm text-red-600">
                {{ err.officerPassport }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Officer First Name</label>
              <input
                type="text"
                placeholder="Enter Officer First Name"
                v-model="addData.officerFirstName"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerFirstName" class="mt-2 text-sm text-red-600">
                {{ err.officerFirstName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Officer Last Name</label>
              <input
                type="text"
                placeholder="Enter Officer First Name"
                v-model="addData.officerLastName"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerLastName" class="mt-2 text-sm text-red-600">
                {{ err.officerLastName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Office Email</label>
              <input
                type="text"
                placeholder="Enter Office Email"
                v-model="addData.officerEmail"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerEmail" class="mt-2 text-sm text-red-600">
                {{ err.officerEmail }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Office Position</label>
              <input
                type="text"
                placeholder="Enter Officer Position"
                v-model="addData.officerPosition"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerPosition" class="mt-2 text-sm text-red-600">
                {{ err.officerPosition }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold"> Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Registration Number</label>
              <input
                type="text"
                placeholder="Enter Business Registration Number"
                v-model="addData.businessRegistrationNumber"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.businessRegistrationNumber" class="mt-2 text-sm text-red-600">
                {{ err.businessRegistrationNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Tax Identification Number</label>
              <input
                type="text"
                placeholder="Enter Tax Identification Number"
                v-model="addData.taxIdentificationNumber"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.taxIdentificationNumber" class="mt-2 text-sm text-red-600">
                {{ err.taxIdentificationNumber  }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">NMRA Registration Number</label>
              <input
                type="text"
                placeholder="Enter NMRA Registration Number"
                v-model="addData.nmarRegistrationNumber"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.nmarRegistrationNumber" class="mt-2 text-sm text-red-600">
                {{ err.nmarRegistrationNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">CIDA Registration Number</label>
              <input
                type="text"
                placeholder="Enter CIDA Registration Number"
                v-model="addData.cidaRegistrationNumber"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.cidaRegistrationNumber" class="mt-2 text-sm text-red-600">
                {{ err.cidaRegistrationNumber }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="GetSaveVendor" class="confirm-button">
            Save 
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
import toggleoption from "~/components/customcontrol/toggleoption";

definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption },
  data() {
    return {
      isOpen: true,
      addData: {
        registrationAuthorityID: "",
        vendor: "",
        city: "",
        zipCode: "",
        officerTitleId: "",
        officerNIC: "",
        officerPassport: "",
        officerFirstName: "",
        officerLastName: "",
        officerEmail: "",
        officerPosition: "",
        businessRegistrationNumber: "",
        taxIdentificationNumber: "",
        nmraRegistrationNumber: "",
        cidaRegistrationNumber: ""
      },
      err: {},
      imageroot: "",
      showLoading: null,
    };
  },
  computed: {
    isEditing() {
      return (
        this.addData &&
        this.addData.id !== "00000000-0000-0000-0000-000000000000"
      );
    },
  },
  async created() {


    this.showLoading = this.$showLoading;
  },
  mounted() {

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
    GetSaveVendor() {
      if (this.IsValidate()) {
        this.$showConfirm(
          "Are you sure you want to Save this Vendor?",
          "warning"
        ).then(async (result) => {
          if (result) {
          console.log("Saving Data:", this.addData);
          this.closeModal();
          } else {
            console.log("Action canceled");
          }
        });
      }
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

  
      ///------------Company Details validation -----------------//
      if (!this.addData.registrationAuthorityID) {
        this.err.registrationAuthorityID = "Please Enter Company Name!";
        IsValidate = false;
      }
      if (!this.addData.zipCode) {
        this.err.zipCode = "Please Enter zip Code!";
        IsValidate = false;
      }

      if (!this.addData.city) {
        this.err.city = "Please Enter City!";
        IsValidate = false;
      }

     if (!this.addData.vendor) {
        this.err.vendor = "Please Enter vendor!";
        IsValidate = false;
      }

      
      ///------------Offf Information validation--------------------//
      if (!this.addData.officerTitleId) {
        this.err.officerTitleId = "Please Enter officer TitleId!";
        IsValidate = false;
      }
      if (!this.addData.officerPassport) {
        this.err.officerPassport = "Please Enter officer Passport!";
        IsValidate = false;
      }
      if (!this.addData.officerNIC) {
        this.err.officerNIC = "Please Enter officer NIC!";
        IsValidate = false;
      }

      if (!this.addData.officerFirstName) {
        this.err.officerFirstName = "Please Enter officer TitleId!";
        IsValidate = false;
      }
      if (!this.addData.officerLastName) {
        this.err.officerLastName = "Please Enter officer LastName!";
        IsValidate = false;
      }
      if (!this.addData.officerEmail) {
        this.err.officerEmail = "Please Enter officerEmail!";
        IsValidate = false;
      }
      if (!this.addData.officerPassport) {
        this.err.officerPassport = "Please Enter officer Passport!";
        IsValidate = false;
      }
      if (!this.addData.officerNIC) {
        this.err.officerNIC = "Please Enter officer NIC!";
        IsValidate = false;
      }


      ///------------ Information validation------------------//
      if (!this.addData.businessRegistrationNumber) {
        this.err.businessRegistrationNumber = "Please Enter Person Name!";
        IsValidate = false;
      }
      if (!this.addData.taxIdentificationNumber) {
        this.err.taxIdentificationNumber = "Please Enter Person taxIdentificationNumber!";
        IsValidate = false;
      }
      
      ///------------  Details validation--------------------//
      if (!this.addData.nmarRegistrationNumber) {
        this.err.nmarRegistrationNumber = "Please Enter Bank Name!";
        IsValidate = false;
      }

      if (!this.addData.cidaRegistrationNumber) {
        this.err.cidaRegistrationNumber = "Please Enter cidaRegistrationNumber!";
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
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
}

.modal-header {
  background:  #3c8dbc;
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