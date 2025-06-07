<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Emplayee Details
        </h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <h3 class="font-bold">General Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Employee Name <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curLead.empName" placeholder="Enter company Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.empName" class="mt-2 text-sm text-red-600">
                {{ err.empName }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                NIC Number <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curLead.nic" placeholder="Enter Address Line 1" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.nic" class="mt-2 text-sm text-red-600">
                {{ err.nic }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Address <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curLead.Address2" placeholder="Enter Address Line 2" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Address2" class="mt-2 text-sm text-red-600">
                {{ err.Address2 }}
              </p>
            </div>
            <!-- <div class="">
              <label class="block text-sm font-bold text-gray-600">
                District <span class="text-red-500">*</span>
              </label>

              <serach_Input :arrItems="getDistinctDistricts" ref="refDistrict" label="" v-model="curLead.District"
                @selectItem="GetSelectDistrict" />
              <p v-if="err.District" class="mt-2 text-sm text-red-600">
                {{ err.District }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                City <span class="text-red-500">*</span>
              </label>

              <serach_Input :arrItems="filteredCities" ref="refCity" label="" v-model="curLead.City"
                @selectItem="GetSelectCity" />
              <p v-if="err.City" class="mt-2 text-sm text-red-600">
                {{ err.City }}
              </p>
            </div> -->
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Contact Number 1<span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="curLead.Contact1" placeholder="Enter Contact Number" maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Contact1" class="mt-2 text-sm text-red-600">
                {{ err.Contact1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number 2</label>
              <input type="text" v-model="curLead.Contact2" :maxlength="10" placeholder="Enter MobileNo"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Contact2" class="mt-2 text-sm text-red-600">
                {{ err.Contact2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Email 1<span class="text-red-500">*</span>
              </label>
              <input type="Email" v-model="curLead.Email1" placeholder="Enter Email"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Email1" class="mt-2 text-sm text-red-600">
                {{ err.Email1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Email 2<span class="text-red-500">*</span>
              </label>
              <input type="Email" v-model="curLead.Email2" placeholder="Enter Email 2"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Email2" class="mt-2 text-sm text-red-600">
                {{ err.Email2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Emergency Contact Number</label>
              <input type="text" v-model="curLead.EmergencyContact" :maxlength="10" placeholder="Enter Emergency Contact Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.EmergencyContact" class="mt-2 text-sm text-red-600">
                {{ err.EmergencyContact }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Department <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curLead.Department" placeholder="Enter Department"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Department" class="mt-2 text-sm text-red-600">
                {{ err.Department }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Designation <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curLead.Department" placeholder="Enter Business Registration Number"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Department" class="mt-2 text-sm text-red-600">
                {{ err.Department }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-600">Gender</label>
              <input type="text" v-model="curLead.Gender" placeholder="Ex: Construction / Service etc"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.Gender" class="mt-2 text-sm text-red-600">
                {{ err.Gender }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Staff Type</label>
              <input type="text" v-model="curLead.StaffType" placeholder="Enter Staff Type"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.StaffType" class="mt-2 text-sm text-red-600">
                {{ err.StaffType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">DOB</label>
              <textarea v-model="curLead.DOB" placeholder="Enter DOB"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" required
                rows="4"></textarea>
              <p v-if="err.DOB" class="mt-2 text-sm text-red-600">
                {{ err.DOB }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Emp Type</label>
              <input type="text" v-model="curLead.EmpType" placeholder="Enter First Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.EmpType" class="mt-2 text-sm text-red-600">
                {{ err.EmpType }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Date Of Join</label>
              <input type="text" v-model="curLead.DateOfJoin" placeholder="Enter Date Of Join" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.DateOfJoin" class="mt-2 text-sm text-red-600">
                {{ err.DateOfJoin }}
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
              <label class="block text-sm font-bold text-gray-600">Callingname</label>
              <input type="text" v-model="curLead.ContactMobile" :maxlength="10" placeholder="Enter Mobile Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactMobile" class="mt-2 text-sm text-red-600">
                {{ err.ContactMobile }}
              </p>
            </div>
          </div>

          <!-- More Details -->
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-1">
            
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 mb-8 font-bold">Contact Person </h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <
            
            

            
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
import imagecomp from "~/components/customcontrol/imagepicker";
import ImageLable from "~/components/customcontrol/ImageLable";
import serach_Input from "~/components/customcontrol/SearchInput";
import { useUserStore } from "~/stores/modules/userStore";
import toggleoption from "~/components/customcontrol/toggleoption";
import { useLeadStore } from "~/stores/modules/qms/leadStore";

definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption },
  data() {
    return {
      isOpen: true,
      curLead: {
        empName: "",
        nic: "",
        Address2: "",
        District: "",
        DistrictId: "",
        City: "",
        CityId: "",
        Contact1: "",
        Contact2: "",
        Email1: "",
        Email2:"",
        Department: "",
        StaffType: "",
        businessType: "",
        Gender: "",
        DOB: "",//'Ex: No of Links-200 || iS Stored Available'

        Department: "",
        EmpType: "",
        DateOfJoin: "",
        ContactDesignation: "",
        EmergencyContact: "",
        ContactMobile: "",
        ContactEmail: "",
      },
      err: {
        empName: "",
        nic: "",
        Address2: "",
        District: "",
        City: "",
        Contact1: "",
        Contact2: "",
        Email1: "",
        Department: "",
        StaffType: "",
        DateOfJoin: "",
        businessType: "",
        Gender: "",
        DOB: "",

        Department: "",
        EmpType: "",
        ContactDesignation: "",
        EmergencyContact: "",
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

        this.leadStore.InitLeads.listDistrictCities.forEach((item) => {
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

      return this.leadStore.InitLeads.listDistrictCities
        .filter(city => city.districtId === this.curLead.DistrictId)
        .sort((a, b) => a.cityName.localeCompare(b.cityName))
        .map(city => ({
          id: city.cityId,
          value: city.cityName
        }));
    },

  },
  async created() {
    this.userStore = useUserStore();
    this.leadStore = useLeadStore();
    this.curLead = this.leadStore.curLead;

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

            await this.leadStore.SetVendorLead(this.curLead, this.showLoading, this.showAlert)
            console.log(JSON.stringify(this.curLead));
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

      if (!this.curLead.Gender) {
        this.err.Gender = "Please Enter Business Type!";
        IsValidate = false;
      }

      if (!this.curLead.Department) {
        this.err.Department = "Please Enter Business Registration Number!";
        IsValidate = false;
      }

      if (!this.curLead.Email1) {
        this.err.Email1 = "Please Enter an Email 1!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curLead.Email1)) {
          this.err.Email1 = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.curLead.Email1) {
        this.err.Email2 = "Please Enter an Email 2!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curLead.Email1)) {
          this.err.Email2 = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.curLead.empName) {
        this.err.empName = "Please Enter emp Name!";
        IsValidate = false;
      }

      if (!this.curLead.Contact1) {
        this.err.Contact1 = "Please Enter Contact Number 1!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.curLead.Contact1)) {
          this.err.Contact1 =
            "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.curLead.nic) {
        this.err.nic = "Please Enter Nic Number";
        IsValidate = false;
      }

      if (!this.curLead.Address2) {
        this.err.Address2 = "Please Enter Address!";
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

      if (!this.curLead.Contact2) {
        this.err.Contact2 = "Please Enter Contact Number 2!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.Contact2)) {
          this.err.Contact2 = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }

      if (!this.curLead.Department) {
        this.err.Department = "Please Enter Website!";
        IsValidate = false;
      }

      if (!this.curLead.StaffType) {
        this.err.StaffType = "Please Enter Designation!";
        IsValidate = false;
      }

      // // Other information validation
      if (!this.curLead.EmpType) {
        this.err.EmpType = "Please Enter First Name!";
        IsValidate = false;
      }

      if (!this.curLead.DateOfJoin) {
        this.err.DateOfJoin = "Please Enter Last Name!";
        IsValidate = false;
      }

      if (!this.curLead.ContactDesignation) {
        this.err.ContactDesignation = "Please Enter Designation!";
        IsValidate = false;
      }

      if (!this.curLead.EmergencyContact) {
        this.err.EmergencyContact = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.EmergencyContact)) {
          this.err.EmergencyContact = "Please Enter a valid 10-digit Contact Number!";
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
      this.curLead.CityId = selectItem.id;
      this.curLead.City = selectItem.value;
    },
    GetSelectDistrict(selectItem) {
      this.curLead.DistrictId = selectItem.id;
      this.curLead.District = selectItem.value;
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