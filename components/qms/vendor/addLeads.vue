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
              <input type="text" v-model="curLead.CompanyName" placeholder="Enter company Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CompanyName" class="mt-2 text-sm text-red-600">
                {{ err.CompanyName }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 1</label>
              <input type="text" v-model="curLead.Address1" placeholder="Enter Address Line 1" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Address1" class="mt-2 text-sm text-red-600">
                {{ err.Address1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 2</label>
              <input type="text" v-model="curLead.Address2" placeholder="Enter Address Line 2" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Address2" class="mt-2 text-sm text-red-600">
                {{ err.Address2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">District</label>

              <serach_Input :arrItems="getDistinctDistricts" ref="refDistrict" label="" v-model="curLead.DistrictName"
                @selectItem="GetSelectDistrict" />
              <p v-if="err.District" class="mt-2 text-sm text-red-600">
                {{ err.District }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>

              <serach_Input :arrItems="filteredCities" ref="refCity" label="" v-model="curLead.CityName"
                @selectItem="GetSelectCity" />
              <p v-if="err.City" class="mt-2 text-sm text-red-600">
                {{ err.City }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input type="tel" v-model="curLead.CompanyPhone" placeholder="Enter Contact Number" maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CompanyPhone" class="mt-2 text-sm text-red-600">
                {{ err.CompanyPhone }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input type="text" v-model="curLead.CompanyMobileNo" :maxlength="10" placeholder="Enter MobileNo"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.CompanyMobileNo" class="mt-2 text-sm text-red-600">
                {{ err.CompanyMobileNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="Email" v-model="curLead.CompanyEmail" placeholder="Enter Email"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.CompanyEmail" class="mt-2 text-sm text-red-600">
                {{ err.CompanyEmail }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Website</label>
              <input type="text" v-model="curLead.CompanyWeb" placeholder="Enter weblink"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.CompanyWeb" class="mt-2 text-sm text-red-600">
                {{ err.CompanyWeb }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Business Registration Number</label>
              <input type="text" v-model="curLead.BusinessRegNo" placeholder="Enter Business Registration Number"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.BusinessRegNo" class="mt-2 text-sm text-red-600">
                {{ err.BusinessRegNo }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Business Type</label>
              <input type="text" v-model="curLead.Industry" placeholder="Ex: Construction / Service etc"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Industry" class="mt-2 text-sm text-red-600">
                {{ err.Industry }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curLead.CompanyDesignation" placeholder="Enter Designation"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.CompanyDesignation" class="mt-2 text-sm text-red-600">
                {{ err.CompanyDesignation }}
              </p>
            </div>
          </div>

          <!-- More Details -->
          <div class="w-full">
            <label class="block text-sm font-bold text-gray-600">More Details</label>
            <textarea v-model="curLead.moreDetails" placeholder="Quotation related extra information"
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" required
              rows="4"></textarea>
            <p v-if="err.moreDetails" class="mt-2 text-sm text-red-600">
              {{ err.moreDetails }}
            </p>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Contact Person </h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">First Name</label>
              <input type="text" v-model="curLead.ContactPersonFirstName" placeholder="Enter First Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactPersonFirstName" class="mt-2 text-sm text-red-600">
                {{ err.ContactPersonFirstName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Last Name</label>
              <input type="text" v-model="curLead.ContactPersonLastname" placeholder="Enter Last Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactPersonLastname" class="mt-2 text-sm text-red-600">
                {{ err.ContactPersonLastname }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curLead.ContactDesignation" placeholder="Enter Designation" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactDesignation" class="mt-2 text-sm text-red-600">
                {{ err.ContactDesignation }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input type="text" v-model="curLead.ContactPhoneNo" :maxlength="10" placeholder="Enter Contact Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactPhoneNo" class="mt-2 text-sm text-red-600">
                {{ err.ContactPhoneNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input type="text" v-model="curLead.ContactMobile" :maxlength="10" placeholder="Enter Mobile Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactMobile" class="mt-2 text-sm text-red-600">
                {{ err.ContactMobile }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curLead.ContactEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactEmail" class="mt-2 text-sm text-red-600">
                {{ err.ContactEmail }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class=" modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="SetVendorLead()" class="confirm-button">
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
      curLead: {
        CompanyName: "",
        Address1: "",
        Address2: "",
        District: "",
        DistrictName: "",
        City: "",
        CityName: "",
        CompanyPhone: "",
        CompanyMobileNo: "",
        CompanyEmail: "",
        CompanyWeb: "",
        CompanyDesignation: "",
        businessType: "",
        Industry: "",
        moreDetails: "",//'Ex: No of Links-200 || iS Stored Available'

        BusinessRegNo: "",
        ContactPersonFirstName: "",
        ContactPersonLastname: "",
        ContactDesignation: "",
        ContactPhoneNo: "",
        ContactMobile: "",
        ContactEmail: "",
      },
      err: {
        CompanyName: "",
        Address1: "",
        Address2: "",
        District: "",
        City: "",
        CompanyPhone: "",
        CompanyMobileNo: "",
        CompanyEmail: "",
        CompanyWeb: "",
        CompanyDesignation: "",
        ContactPersonLastname: "",
        businessType: "",
        Industry: "",
        moreDetails: "",

        BusinessRegNo: "",
        ContactPersonFirstName: "",
        ContactDesignation: "",
        ContactPhoneNo: "",
        ContactMobile: "",
        ContactEmail: "",
      },
      imageroot: "",
      showLoading: null,
      showAlert: null,
    };
  },
  computed: {
    isEditing() {
      return (
        this.curLead &&
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
      if (!this.curLead.District) return [];

      return this.vendorStore.InitLeads.listDistrictCities
        .filter(city => city.districtId === this.curLead.District)
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
    this.curLead = this.vendorStore.curLead;

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
      this.isOpen = false;
      this.$emit("close");
    },

    cancel() {
      this.clearErr();
      this.closeModal();
    },

    SetVendorLead() {
      console.log("inside SetVendorLead");

      if (this.IsValidate()) {
        console.log("inside IsValidate");
        this.$showConfirm(
          "Are you sure you want to Save this Lead?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {

            await this.vendorStore.SetVendorLead(this.curLead, this.showLoading, this.showAlert)
            console.log(JSON.stringify(this.curLead));
          } else {
            console.log("Action canceled");
          }
          this.vendorStore.clearCurLead();
          this.closeModal();
          this.clearErr();
        });
      }
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      if (!this.curLead.Industry) {
        this.err.Industry = "Please Enter Business Type!";
        IsValidate = false;
      }

      if (!this.curLead.BusinessRegNo) {
        this.err.BusinessRegNo = "Please Enter Business Registration Number!";
        IsValidate = false;
      }

      if (!this.curLead.CompanyEmail) {
        this.err.CompanyEmail = "Please Enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curLead.CompanyEmail)) {
          this.err.CompanyEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

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

      if (!this.curLead.Address1) {
        this.err.Address1 = "Please Enter Address 1!";
        IsValidate = false;
      }

      if (!this.curLead.Address2) {
        this.err.Address2 = "Please Enter Address 2!";
        IsValidate = false;
      }

      if (!this.curLead.District) {
        this.err.District = "Please Enter District!";
        IsValidate = false;
      }

      if (!this.curLead.City) {
        this.err.City = "Please Enter City!";
        IsValidate = false;
      }

      if (!this.curLead.CompanyMobileNo) {
        this.err.CompanyMobileNo = "Please Enter mobile Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.CompanyMobileNo)) {
          this.err.CompanyMobileNo = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }

      if (!this.curLead.CompanyWeb) {
        this.err.CompanyWeb = "Please Enter Website!";
        IsValidate = false;
      }

      if (!this.curLead.CompanyDesignation) {
        this.err.CompanyDesignation = "Please Enter Designation!";
        IsValidate = false;
      }

      // // Other information validation
      if (!this.curLead.ContactPersonFirstName) {
        this.err.ContactPersonFirstName = "Please Enter First Name!";
        IsValidate = false;
      }

      if (!this.curLead.ContactPersonLastname) {
        this.err.ContactPersonLastname = "Please Enter Last Name!";
        IsValidate = false;
      }

      if (!this.curLead.ContactDesignation) {
        this.err.ContactDesignation = "Please Enter Designation!";
        IsValidate = false;
      }

      if (!this.curLead.ContactPhoneNo) {
        this.err.ContactPhoneNo = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.ContactPhoneNo)) {
          this.err.ContactPhoneNo = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      if (!this.curLead.ContactMobile) {
        this.err.ContactMobile = "Please Enter Mobile Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.ContactMobile)) {
          this.err.ContactMobile = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }

      if (!this.curLead.ContactEmail) {
        this.err.ContactEmail = "Please Enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curLead.ContactEmail)) {
          this.err.ContactEmail = "Please Enter a valid Email address!";
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

    GetSelectCity(selectItem) {
      this.curLead.City = selectItem.id;
      this.curLead.CityName = selectItem.value;
    },
    GetSelectDistrict(selectItem) {
      this.curLead.District = selectItem.id;
      this.curLead.DistrictName = selectItem.value;
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