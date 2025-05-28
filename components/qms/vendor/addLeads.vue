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
                v-model="curLead.companyName"
                placeholder="Enter company Name"
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
                v-model="curLead.shopAddress1"
                placeholder="Enter Address Line 1"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.shopAddress1" class="mt-2 text-sm text-red-600">
                {{ err.shopAddress1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 2</label>
              <input
                type="text"
                v-model="curLead.shopAddress2"
                placeholder="Enter Address Line 2"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.shopAddress2" class="mt-2 text-sm text-red-600">
                {{ err.shopAddress2}}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">District</label>
    
               <serach_Input
                :arrItems="getDistinctDistricts"
                ref="refDistrict"
                label=""
                v-model="curLead.district"
                @selectItem="GetSelectDistrict"
              />
              <p v-if="err.district" class="mt-2 text-sm text-red-600">
                {{ err.district }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>
          
              <serach_Input
                :arrItems="filteredCities"
                ref="refCity"
                label=""
                v-model="curLead.city"
                @selectItem="GetSelectCity"
              />
              <p v-if="err.city" class="mt-2 text-sm text-red-600">
                {{ err.city }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input
                type="tel"
                v-model="curLead.contacttNo"
               
                placeholder="Enter Contact Number"
               maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.contacttNo" class="mt-2 text-sm text-red-600">
                {{ err.contacttNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input
                type="text"
                v-model="curLead.mobileNo"
                :maxlength="10"
                placeholder="Enter MobileNo"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.mobileNo" class="mt-2 text-sm text-red-600">
                {{ err.mobileNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="Email"
                v-model="curLead.email"
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
                v-model="curLead.web"
                placeholder="Enter weblink"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.web" class="mt-2 text-sm text-red-600">
                {{ err.web }}
              </p>
            </div>
             <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Registration Number</label>
              <input
                type="text"
                v-model="curLead.businessRegNum"
                placeholder="Enter Business Registration Number"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.businessRegNum" class="mt-2 text-sm text-red-600">
                {{ err.businessRegNum }}
              </p>
            </div>
              <div>
    <label class="block text-sm font-bold text-gray-600">Business Type</label>
    <input
      type="text"
      v-model="curLead.businessType"
      placeholder="Ex: Construction / Service etc"
      class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      required
    />
    <p v-if="err.businessType" class="mt-2 text-sm text-red-600">
      {{ err.businessType }}
    </p>
  </div>           
          </div>

           <!-- More Details -->
  <div class="w-full">
    <label class="block text-sm font-bold text-gray-600">More Details</label>
    <textarea
      v-model="curLead.moreDetails"
      placeholder="Quotation related extra information"
      class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      required
      rows="4"
    ></textarea>
    <p v-if="err.moreDetails" class="mt-2 text-sm text-red-600">
      {{ err.moreDetails }}
    </p>
  </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Contact Person </h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input
                type="text"
                v-model="curLead.contacttPersonName"
                placeholder="Enter Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.contacttPersonName" class="mt-2 text-sm text-red-600">
                {{ err.contacttPersonName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label
              >
              <input
                type="text"
                v-model="curLead.designation"
                placeholder="Enter Designation"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.designation" class="mt-2 text-sm text-red-600">
                {{ err.designation  }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input
                type="text"
                v-model="curLead.contactPersonNumber"
                :maxlength="10"
                placeholder="Enter Contact Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.contactPersonNumber" class="mt-2 text-sm text-red-600">
                {{ err.contactPersonNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input
                type="text"
                v-model="curLead.contactPersonMobileNo"
                :maxlength="10"
                placeholder="Enter Mobile Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.contactPersonMobileNo" class="mt-2 text-sm text-red-600">
                {{ err.contactPersonMobileNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="text"
                v-model="curLead.contactPersonEmailAddress"
                placeholder="Enter Email"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.contactPersonEmailAddress" class="mt-2 text-sm text-red-600">
                {{ err.contactPersonEmailAddress }}
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
      curLead : {
        companyName: "",
        shopAddress1: "",
        shopAddress2: "",
        district: -1,
        city: -1,
        contactNumber: "",
        mobileNo: "",
        email: "",
        web:"",
        businessType: "",
        moreDetails:'Ex: No of Links-200 || iS Stored Available',

        businessRegNum: "",
        contactPersonName: "",
        designation: "",
        contacPersonNumber: "",
        contacPersonMobileNo: "",
        contacPersonEmailAddress: "",
      },
      err: {
          companyName: "",
        shopAddress1: "",
        shopAddress2: "",
        district: '',
        city: '',
        contactNumber: "",
        mobileNo: "",
        email: "",
        web:"",
        businessType: "",
        moreDetails:'',
        businessRegNum: "",
        contactPersonName: "",
        designation: "",
        contacPersonNumber: "",
        contacPersonMobileNo: "",
        contacPersonEmailAddress: "",
      },
      imageroot: "",
      showLoading: null,
    };
  },
  computed: {
    isEditing() {
      return (
        this.curLead   &&
        this.curLead.id !== "00000000-0000-0000-0000-000000000000"
      );
    },

     getDistinctDistricts() {
         
      try {
        const districtsMap = new Map();
        
        this.vendorStore.InitLeads.listDistrictCities.forEach((item) => {
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
        // console.log(error);
        return [];
      }
    },

    filteredCities() {      
    if (!this.curLead.district) return [];  

    return this.vendorStore.InitLeads.listDistrictCities
      .filter(city => city.districtId === this.curLead.district)
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
    this.curLead   = this.vendorStore.curLead  ;
 
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;

  
  },
  mounted() {
      this.$refs.refCity.initItem(this.curLead.city);
   this.$refs.refDistrict.initItem(this.curLead.district);
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
          "Are you sure you want to Save this Lead?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {
          
            console.log(JSON.stringify(this.curLead ));

           // this.closeModal();
          } else {
            console.log("Action canceled");
          }
        });
      }
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      if (!this.curLead.businessType) {
        this.err.businessType = "Please Enter Business Type!";
        IsValidate = false;
      }
      if (!this.curLead.businessRegNum) {
        this.err.businessRegNum = "Please Enter Business Registration Number!";
        IsValidate = false;
      }
      if (!this.curLead.email) {
        this.err.email = "Please Enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curLead.email)) {
          this.err.email = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }
        
      if (!this.curLead.companyName) {
        this.err.companyName = "Please Enter Company Name!";
        IsValidate = false;
      }
      if (!this.curLead.contacttNo) {
        this.err.contacttNo = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.curLead .contacttNo)) {
          this.err.contacttNo =
            "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }
     
      if (!this.curLead.shopAddress1) {
        this.err.shopAddress1 = "Please Enter Address 1!";
        IsValidate = false;
      }
      if (!this.curLead.shopAddress2) {
        this.err.shopAddress2 = "Please Enter Address 2!";
        IsValidate = false;
      }
    
      // if (!this.curLead.district) {
      //   this.err.district = "Please Enter District!";
      //   IsValidate = false;
      // }
      // if (!this.curLead.city) {
      //   this.err.city = "Please Enter City!";
      //   IsValidate = false;
      // }
     
      if (!this.curLead.mobileNo) {
        this.err.mobileNo = "Please Enter mobile Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.mobileNo)) {
          this.err.mobileNo = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }
        
      if (!this.curLead.web) {
        this.err.web = "Please Enter Website!";
        IsValidate = false;
      }
      
      if (!this.curLead.contactPersonEmailAddress) {
        this.err.contactPersonEmailAddress = "Please Enter Email Address!";
        IsValidate = false;
      }

      // Other information validation
      if (!this.curLead.contacttPersonName) {
        this.err.contacttPersonName = "Please Enter Name!";
        IsValidate = false;
      }
      if (!this.curLead.designation ) {
        this.err.designation  = "Please Enter Designation !";
        IsValidate = false;
      }

      if (!this.curLead.contactPersonNumber) {
        this.err.contactPersonNumber = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.contactPersonNumber)) {
          this.err.contactPersonNumber = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }
     

      if (!this.curLead.contactPersonMobileNo) {
        this.err.contactPersonMobileNo = "Please Enter Mobile Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.contactPersonMobileNo)) {
          this.err.contactPersonMobileNo = "Please Enter a valid 10-digit Mobile Number!";
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
      this.curLead.city = id;
    },
    GetSelectDistrict(id){      
      this.curLead.district = id;
     
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