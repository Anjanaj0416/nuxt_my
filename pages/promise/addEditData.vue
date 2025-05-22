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
                  <h3 class="font-bold">Vendor/ Supplier organization details</h3>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Registration Authority</label>
              <selectinput2
                class="my-2"
                v-model="registrationAuthority"
                :cur_item="registrationAuthority"
                :selections="registrationAuthorityData"
                :err="err.registrationAuthority"
                label=""
                @changed="changedRegistrationAuthority"
              />
              <!-- <p v-if="err.registrationAuthority" class="mt-2 text-sm text-red-600">
                {{ err.registrationAuthority }}
              </p> -->
            </div>
            
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Name</label>

              <input
                type="text"
                placeholder="Enter Business Name"
                v-model="addData.businessName"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.businessName" class="mt-2 text-sm text-red-600">
                {{ err.businessName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Country</label>
              <selectinput2
                class="my-2"
                v-model="country"
                :selections="countryData"
                :err="err.country"
                label=""
                @changed="changedCountryData"
              />

              <!-- <p v-if="err.country" class="mt-2 text-sm text-red-600">
                {{ err.country }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Registration No</label>
              <input
                type="text"
                placeholder="Enter Zip Code"
                v-model="addData.businessRegistrationNo"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.businessRegistrationNo" class="mt-2 text-sm text-red-600">
                {{ err.businessRegistrationNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Type of Organization</label>
             <selectinput2
                class="my-2"
                v-model="typeOfOrganization"
                :cur_item="typeOfOrganization"
                :selections="typeOfOrganizationData"
                :err="err.typeOfOrganization"
                label=""
                @changed="changedTypeOfOrganization"
              />

              <!-- <p v-if="err.typeOfOrganization" class="mt-2 text-sm text-red-600">
                {{ err.typeOfOrganization }}
              </p> -->
            </div>
             <div class="">
              <label class="block text-sm font-bold text-gray-600">Registered Address</label>
              <input
                type="text"
                placeholder="Enter Registered Address"
                v-model="addData.registeredAddress"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.registeredAddress" class="mt-2 text-sm text-red-600">
                {{ err.registeredAddress }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Street</label>
              <input
                type="text"
                placeholder="Enter Street"
                v-model="addData.street"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.street" class="mt-2 text-sm text-red-600">
                {{ err.street }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>
              <input
                type="text"
                placeholder="Enter City"
                v-model="addData.city"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.city" class="mt-2 text-sm text-red-600">
                {{ err.city }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Province</label>
              <input
                type="text"
                placeholder="Enter Province"
                v-model="addData.province"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.province" class="mt-2 text-sm text-red-600">
                {{ err.province }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">State</label>
              <input
                type="text"
                placeholder="Enter State"
                v-model="addData.state"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.state" class="mt-2 text-sm text-red-600">
                {{ err.state }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Website</label>
              <input
                type="text"
                placeholder="Enter Website"
                v-model="addData.website"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.website" class="mt-2 text-sm text-red-600">
                {{ err.website }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Official Email</label>
              <input
                type="text"
                placeholder="Enter Official Email"
                v-model="addData.officialEmail"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officialEmail" class="mt-2 text-sm text-red-600">
                {{ err.officialEmail }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Official Telephone No</label>
              <input
                type="text"
                placeholder="Enter Official Telephone No"
                v-model="addData.officialTelephoneNo"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officialTelephoneNo" class="mt-2 text-sm text-red-600">
                {{ err.officialTelephoneNo }}
              </p>
            </div>
            
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Details of the Authorized Officer of the Vendor/Supplier</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Passport No</label>
              <input
                type="text"
                placeholder="Enter Passport No"
                v-model="addData.Passport"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.Passport" class="mt-2 text-sm text-red-600">
                {{ err.Passport }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                v-model="addData.name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.name" class="mt-2 text-sm text-red-600">
                {{ err.name }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Office Designation</label>
              <input
                type="text"
                placeholder="Enter Officer Position"
                v-model="addData.officerDesignation"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.officerDesignation" class="mt-2 text-sm text-red-600">
                {{ err.officerDesignation }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile phone No</label>
              <input
                type="text"
                placeholder="Enter Mobile phone No"
                v-model="addData.mobilePhoneNo"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.mobilePhoneNo" class="mt-2 text-sm text-red-600">
                {{ err.mobilePhoneNo }}
              </p>
            </div>
            
            
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                v-model="addData.vendorEmail"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.vendorEmail" class="mt-2 text-sm text-red-600">
                {{ err.vendorEmail }}
              </p>
            </div>
          </div>

      

        </div>
      </div>

      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="GetSaveData" class="confirm-button">
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
import selectinput2 from "~/components/customcontrol/selectinput2";


definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, selectinput2 ,toggleoption},
  data() {
    return {
      isOpen: true,
      addData: {
        registrationAuthority: "",
        businessName: "",
        country: "",
        businessRegistrationNo: "",
        typeOfOrganization: "",
        registeredAddress: "",
        street: "",
        city: "",
        province: "",
        state: "",
        officialEmail: "",
        website: "",
        officialTelephoneNo: "",
        Passport: "",
        officerDesignation: "",
        name: "",
        mobilePhoneNo: "",
        vendorEmail: "",
      },
      registrationAuthorityData: [ "Foreign", "Government Affiliated", "Provincial Department of Business Registrations", "Registrar Of Companies", "Other"],
      countryData: ["Sri Lanka", "India", "ETC"],
      typeOfOrganizationData: [ "Company Limited by Guarantee", "Off-Shore Company", "Overseas Company", "Private Limited Liability Company", "Public Limited Liability Company"],

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

    changedRegistrationAuthority(value) {
      this.registrationAuthority = value;
      console.log("Changed to:", value);
      this.err.registrationAuthority = ""
    },
    changedCountryData(value) {
      this.country = value;
      console.log("Changed to:", value);
      this.err.country = ""
    },
     changedTypeOfOrganization(value) {
      this.typeOfOrganization = value;
      console.log("Changed to:", value);
      this.err.typeOfOrganization = "";
    },

    GetSaveData() {
      if (this.IsValidate()) {
        this.$showConfirm(
          "Are you sure you want to Save this Data?",
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
      if (!this.addData.registrationAuthority) {
        this.err.registrationAuthority = "Please Enter Business Registration Authority!";
        IsValidate = false;
      }
      if (!this.addData.businessName) {
        this.err.businessName = "Please Enter Business Name!";
        IsValidate = false;
      }
      if (!this.addData.country) {
        this.err.country = "Please Enter country!";
        IsValidate = false;
      }
      if (!this.addData.businessRegistrationNo) {
        this.err.businessRegistrationNo = "Please Enter Business Registration No!";
        IsValidate = false;
      }
      if (!this.addData.typeOfOrganization) {
        this.err.typeOfOrganization = "Please Enter Type of Organization!";
        IsValidate = false;
      }
      if (!this.addData.registeredAddress) {
        this.err.registeredAddress = "Please Enter Registered Address!";
        IsValidate = false;
      }
      if (!this.addData.street) {
        this.err.street = "Please Enter Street!";
        IsValidate = false;
      }
      if (!this.addData.city) {
        this.err.city = "Please Enter City!";
        IsValidate = false;
      }
      if (!this.addData.province) {
        this.err.province = "Please Enter Province!";
        IsValidate = false;
      }
      if (!this.addData.state) {
        this.err.state = "Please Enter state!";
        IsValidate = false;
      }
      if (!this.addData.officialEmail) {
        this.err.officialEmail = "Please Enter Email!";
        IsValidate = false;
      }
      if (!this.addData.website) {
        this.err.website = "Please Enter Website !";
        IsValidate = false;
      }
       if (!this.addData.officialTelephoneNo) {
        this.err.officialTelephoneNo = "Please Enter Office Telephone No !";
        IsValidate = false;
      }
     

      ///------------  Vendor Information validation------------------//
      if (!this.addData.Passport) {
        this.err.Passport = "Please Enter officer Passport!";
        IsValidate = false;
      }
      if (!this.addData.officerDesignation) {
        this.err.officerDesignation = "Please Enter Officer Designation!";
        IsValidate = false;
      }
       if (!this.addData.name) {
        this.err.name = "Please Enter Name!";
        IsValidate = false;
      }
      if (!this.addData.mobilePhoneNo) {
        this.err.mobilePhoneNo = "Please Enter Mobile Phone No!";
        IsValidate = false;
      }
      if (!this.addData.vendorEmail) {
        this.err.vendorEmail = "Please Enter Email!";
        IsValidate = false;
      }

      
      ///------------  Details validation--------------------//


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
  opacountry: 0.8;
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