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

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">

          <h3 class="font-bold">General Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Company Name</label>
              <input
                type="text"
                v-model="addLeads.companyName"
                placeholder="Enter companyName"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.companyName" class="mt-2 text-sm text-red-600">
                {{ err.companyName }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 1</label>
              <input
                type="text"
                v-model="addLeads.shopAddress1"
                placeholder="Enter Address Line 1"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.shopAddress1" class="mt-2 text-sm text-red-600">
                {{ err.shopAddress1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">District</label>
           
               <serach_Input
                :arrItems="getDistinctDistricts"
                ref="refDistrict"
                label=""
                v-model="addLeads .district"
                @selectItem="GetSelectDistrict"
              />
              <!-- <p v-if="err.district" class="mt-2 text-sm text-red-600">
                {{ err.district }}
              </p> -->
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>
          
              <serach_Input
                :arrItems="filteredCities"
                ref="refCity"
                label=""
                v-model="addLeads.city"
                @selectItem="GetSelectCity"
              />
              <!-- <p v-if="err.city" class="mt-2 text-sm text-red-600">
                {{ err.city }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number 1</label>
              <input
                type="tel"
                v-model="addLeads.contactNo1 "
                :maxlength="10"
                placeholder="Enter Contact Number"
                maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.contactNo1 " class="mt-2 text-sm text-red-600">
                {{ err.contactNo1  }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number 2</label>
              <input
                type="text"
                v-model="addLeads.contactNo2"
                :maxlength="10"
                placeholder="Enter contactNo2"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.contactNo2" class="mt-2 text-sm text-red-600">
                {{ err.contactNo2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="Email"
                v-model="addLeads.email"
                placeholder="Enter Email"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.email" class="mt-2 text-sm text-red-600">
                {{ err.email }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Website</label>
              <input
                type="text"
                v-model="addLeads.web"
                placeholder="Enter weblink"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.web" class="mt-2 text-sm text-red-600">
                {{ err.web }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Type</label>
              <input
                type="text"
                v-model="addLeads.businessType"
                placeholder="Ex:Construction/ Service etc"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.businessType" class="mt-2 text-sm text-red-600">
                {{ err.businessType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Registration Number</label>
              <input
                type="text"
                v-model="addLeads.businessRegNum"
                placeholder="Enter Business Registration Number"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.businessRegNum" class="mt-2 text-sm text-red-600">
                {{ err.businessRegNum }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Other Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Person Name </label>
              <input
                type="text"
                v-model="addLeads.contactPersonName"
                placeholder="Enter Contact Person Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.contactPersonName" class="mt-2 text-sm text-red-600">
                {{ err.contactPersonName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label
              >
              <input
                type="text"
                v-model="addLeads.designation"
                placeholder="Enter Designation"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.designation" class="mt-2 text-sm text-red-600">
                {{ err.designation  }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Person Contact Number 1</label>
              <input
                type="text"
                v-model="addLeads.personContactNumber1"
                :maxlength="10"
                placeholder="Person Contact Number 1"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.personContactNumber1" class="mt-2 text-sm text-red-600">
                {{ err.personContactNumber1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Person Contact Number 2</label>
              <input
                type="text"
                v-model="addLeads.personContactNumber2"
                :maxlength="10"
                placeholder="Enter Person Contact Number 2"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.personContactNumber2" class="mt-2 text-sm text-red-600">
                {{ err.personContactNumber2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Person Email Address</label>
              <input
                type="text"
                v-model="addLeads.personEmailAddress"
                placeholder="Enter Person Email Address"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.personEmailAddress" class="mt-2 text-sm text-red-600">
                {{ err.personEmailAddress }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class=" modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="GetSaveVendor()" class="confirm-button">
          Save Leads Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import imagecomp from "~/components/customcontrol/imagepicker";
import ImageLable from "~/components/customcontrol/ImageLable";
import serach_Input from "~/components/customcontrol/SearchInput";
import { useUserStore } from "~/stores/modules/userStore";
import toggleoption from "~/components/customcontrol/toggleoption";

definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption },
  data() {
    return {
      isOpen: true,
      addLeads : {
        companyName: "",
        shopAddress1: "",
        district: "",
        city: "",
        contactNo1: "",
        contactNo2: "",
        email: "",
        web:"",
        businessType: "",
        businessRegNum: "",
        contactPersonName: "",
        designation: "",
        personContactNumber1: "",
        personContactNumber2: "",
        personEmailAddress: ""
      },
      err: {},
      imageroot: "",
      showLoading: null,
    };
  },
  computed: {
    isEditing() {
      return (
        this.addLeads   &&
        this.addLeads  .id !== "00000000-0000-0000-0000-000000000000"
      );
    },

    getDistinctDistricts() {
      try {
        const districtsMap = new Map();

        this.vendorStore.initVendor.listDistrictCities.forEach((item) => {
          if (!districtsMap.has(item.districtId)) {
            districtsMap.set(item.districtId, {
              id: item.districtId,
              value: item.districtName,
            });
          }
        });

        return Array.from(districtsMap.values()).sort((a, b) =>
          a.value.localeCompare(b.value)
        );
      } catch (error) {
        console.log(error);
        return [];
      }
    },

    filteredCities() {      
    if (!this.addLeads  .district) return [];  

    return this.vendorStore.initVendor.listDistrictCities
      .filter(city => city.districtId === this.addLeads  .district)
      .sort((a, b) => a.cityName.localeCompare(b.cityName))
      .map(city => ({
        id: city.cityId,
        value: city.cityName
      }));
    },

  },
  async created() {
    this.vendorStore = useVendorStore();
    this.userStore = useUserStore();
   // this.addLeads   = this.vendorStore.addLeads  ;
   console.log(JSON.stringify(this.addLeads ));
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
  },
  mounted() {
    this.$refs.refCity.initItem(this.addLeads  .city);
    this.$refs.refDistrict.initItem(this.addLeads  .district);
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
          //  const formData = (this.addLeads  );
           // console.log('Leads:',formData);
           // console.log('Leads JSON:', JSON.stringify(addLeads , null, 2));

            console.log(JSON.stringify(this.addLeads ));

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

      if (!this.addLeads  .businessType) {
        this.err.businessType = "Please enter Business Type!";
        IsValidate = false;
      }
      if (!this.addLeads  .businessRegNum) {
        this.err.businessRegNum = "Please enter Business Registration Number!";
        IsValidate = false;
      }
      if (!this.addLeads  .email) {
        this.err.email = "Please enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.addLeads  .email)) {
          this.err.email = "Please enter a valid Email address!";
          IsValidate = false;
        }
      }
      if (!this.addLeads  .companyName) {
        this.err.companyName = "Please enter Company Name!";
        IsValidate = false;
      }
      if (!this.addLeads  .contactNo1 ) {
        this.err.contactNo1  = "Please enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.addLeads  .contactNo1 )) {
          this.err.contactNo1  =
            "Please enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }
      if (!this.addLeads  .shopAddress1) {
        this.err.shopAddress1 = "Please enter Address1!";
        IsValidate = false;
      }
      // if (!this.addLeads  .district) {
      //   this.err.district = "Please enter District!";
      //   IsValidate = false;
      // }
      // if (!this.addLeads  .city) {
      //   this.err.city = "Please enter City!";
      //   IsValidate = false;
      // }
      if (!this.addLeads  .contactNo2) {
        this.err.contactNo2 = "Please enter contactNo2 Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.addLeads  .contactNo2)) {
          this.err.contactNo2v = "Please enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }
      if (!this.addLeads  .web) {
        this.err.web = "Please enter Website!";
        IsValidate = false;
      }
      if (!this.addLeads  .personEmailAddress) {
        this.err.personEmailAddress = "Please enter Person Email Address!";
        IsValidate = false;
      }

      // Other information validation
      if (!this.addLeads  .contactPersonName) {
        this.err.contactPersonName = "Please enter Bank Name!";
        IsValidate = false;
      }
      if (!this.addLeads  .designation ) {
        this.err.designation  = "Please enter designation !";
        IsValidate = false;
      }

      if (!this.addLeads  .personContactNumber1) {
        this.err.personContactNumber1 = "Please enter Person contactNo1  Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.addLeads  .personContactNumber1)) {
          this.err.personContactNumber1 = "Please enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.addLeads  .personContactNumber2) {
        this.err.personContactNumber2 = "Please enter Person contactNo2 Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.addLeads  .personContactNumber2)) {
          this.err.personContactNumber2 = "Please enter a valid 10-digit contact number!";
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

    GetSelectCity(id) {
      this.addLeads  .city = id;
    },
    GetSelectDistrict(id){
      
      this.addLeads  .district = id;
      //alert(this.addLeads  .district )
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
  justify-content: center;
  align-items: center;
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