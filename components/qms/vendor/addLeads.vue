<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">
          Add Leads Details
        </h2>
        <closebtn @close="closeModal" />
      </div>
      <!-- {{quotationStore.initQuotation.listVendors}} -->
      <div class="modal-content">
        <div class="form-content">

          <div class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-2 md:grid-cols-2">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">
                Company Search <span class="text-red-500">*</span>
              </label>
              <serach_Input
                :arrItems="leadStore.InitLeads.listClients"
                label=""
              />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 my-4 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                Company Name <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curLead.CompanyName" placeholder="Enter Company Name" required @input="clearErrorOnInput('CompanyName')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CompanyName" class="mt-2 text-sm text-red-600">
                {{ err.CompanyName }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                Address <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="curLead.Address" placeholder="Enter Address" required @input="clearErrorOnInput('Address')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Address" class="mt-2 text-sm text-red-600">
                {{ err.Address }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                Contact Number <span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="curLead.CompanyPhone" placeholder="Enter Company Contact Number" maxlength="10" @input="clearErrorOnInput('CompanyPhone')"
                class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CompanyPhone" class="mt-2 text-sm text-red-600">
                {{ err.CompanyPhone }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                WhatsApp Number <span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="curLead.CompanyPhone" placeholder="Enter WhatsApp Number" maxlength="10" @input="clearErrorOnInput('CompanyPhone')"
                class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CompanyPhone" class="mt-2 text-sm text-red-600">
                {{ err.CompanyPhone }}
              </p>
            </div>
          </div>
          <div class="mt-4 block text-[13px] font-bold text-gray-800">Contact Person 1</div>
          <div class="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Name </label>
              <input type="text" v-model="curLead.ContactPerson1Name" placeholder="Enter Name" @input="clearErrorOnInput('ContactPerson1Number')"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.ContactPerson1Number" class="mt-2 text-sm text-red-600">
                {{ err.ContactPerson1Number }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curLead.ContactPerson1Designation" placeholder="Enter Designation" 
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.ContactPerson1Number" class="mt-2 text-sm text-red-600">
                {{ err.ContactPerson1Number }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Contact Number<span class="text-red-500">*</span></label>
              <input type="text" v-model="curLead.ContactPerson1Number" :maxlength="10" placeholder="Enter Contact Number" @input="clearErrorOnInput('ContactPerson1Number')"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.ContactPerson1Number" class="mt-2 text-sm text-red-600">
                {{ err.ContactPerson1Number }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                WhatsApp Number <span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="curLead.CompanyPhone" placeholder="Enter WhatsApp Number" maxlength="10" @input="clearErrorOnInput('CompanyPhone')"
                class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div class="mt-4 block text-[13px] font-bold text-gray-800">Contact Person 2</div>
          <div class="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Name</label>
              <input type="text" v-model="curLead.ContactPerson2Name" placeholder="Enter Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.ContactPerson1Number" class="mt-2 text-sm text-red-600">
                {{ err.ContactPerson1Number }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curLead.ContactPerson2Designation" placeholder="Enter Designation" @input="clearErrorOnInput('ContactPerson1Number')"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.ContactPerson1Number" class="mt-2 text-sm text-red-600">
                {{ err.ContactPerson1Number }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">Contact Number</label>
              <input type="text" v-model="curLead.ContactPerson2Number" :maxlength="10" placeholder="Enter Contact Number" @input="clearErrorOnInput('ContactPerson1Number')"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                WhatsApp Number <span class="text-red-500">*</span>
              </label>
              <input type="tel" v-model="curLead.CompanyPhone" placeholder="Enter WhatsApp Number" maxlength="10" @input="clearErrorOnInput('CompanyPhone')"
                class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
        </div>
      </div>

      <div class=" modal-footer">
        <button @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
        <button @click="SetVendorLead()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
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
      curLead: {
        id: "00000000-0000-0000-0000-000000000000",
        CompanyName: "",
        Address: "",
        CompanyPhone: "",
        ContactPerson1Name: "",
        ContactPerson1Designation: "",
        ContactPerson1Number: "",
        ContactPerson1Email: "",
        ContactPerson2Name: "",
        ContactPerson2Designation: "",
        ContactPerson2Number: "",
        ContactPerson2Email: "",
        IsBlindVisit: false
      },
      err: {
        CompanyName: "",
        Address: "",
        CompanyPhone: "",
        ContactPerson1Number: "",
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

        this.vendorStore.initVendor.listDistrictCities.forEach((item) => {
          if (!districtsMap.has(item.districtId)) {
            districtsMap.set(item.districtId, {
              id: item.districtId,
              value: item.districtName,
            });
          }
        });

        // ✅ Store result as an array (safe for SSR)
        return Array.from(districtsMap.values()).sort((a, b) =>
          a.value.localeCompare(b.value)
        );

      } catch (error) {
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
        id: "00000000-0000-0000-0000-000000000000",
        CompanyName: "",
        Address: "",
        CompanyPhone: "",
        ContactPerson1Name: "",
        ContactPerson1Designation: "",
        ContactPerson1Number: "",
        ContactPerson1Email: "",
        ContactPerson2Name: "",
        ContactPerson2Designation: "",
        ContactPerson2Number: "",
        ContactPerson2Email: "",
        IsBlindVisit: false
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
      if (!this.IsValidate()) return;

      this.$showConfirm("Are you sure to Save this Lead?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            // Build request in your existing style
            let request = {
              id: "00000000-0000-0000-0000-000000000000",
              CompanyName: this.curLead.CompanyName || "",
              Address: this.curLead.Address || "",
              CompanyPhone: this.curLead.CompanyPhone || "",
              ContactPhoneNo: this.curLead.ContactPhoneNo  || "",
              ContactPerson1Name: this.curLead.ContactPerson1Name || "",
              ContactPerson1Designation: this.curLead.ContactPerson1Designation || "",
              ContactPerson1Number: this.curLead.ContactPerson1Number || "",
              ContactPerson1Email: this.curLead.ContactPerson1Email || "",
              ContactPerson2Name : this.curLead.ContactPerson2Name || "",
              ContactPerson2Designation: this.curLead.ContactPerson2Designation || "",
              ContactPerson2Number: this.curLead.ContactPerson2Number || "",
              ContactPerson2Email: this.curLead.ContactPerson2Email || "",
              Medium: "office"
            };

            // Send to backend
            console.log(request);
            await this.leadStore.SetVendorLead(request, this.showLoading, this.showAlert);

            this.leadStore.clearCurLead();
            this.closeModal();
            this.clearErr();
          } else {
            console.log("Action canceled");
          }
        });
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

      if (!this.curLead.ContactPerson1Number) {
        this.err.ContactPerson1Number = "Please Enter Contact Person Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.ContactPerson1Number)) {
          this.err.ContactPerson1Number = "Please Enter a valid 10-digit Contact Person Number!";
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
  max-width: 1200px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 80%;
  position: relative;
}

.modal-header {
  background: linear-gradient(to right, #1048c2, #0b2c88, #08236b); /* from-blue-600, via-blue-700, to-blue-900 */
  backdrop-filter: blur(12px); /* backdrop-blur-md */
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

.cancel-button {
  background: #e4e4e4;
  color: #333;
}

.confirm-button {
  background: #0b2145;
  color: white;
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
    position: sticky;
    bottom: 0;
    padding: 10px;
  }
}
</style>