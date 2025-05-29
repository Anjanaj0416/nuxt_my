<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Assign Sales Ex.</h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content -->
      <div class="modal-content">
        <div class="form-content">
          <!-- sales -->
          <div class="form-content">
            <!-- SALES SECTION -->
            <div v-if="!showCityForm">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div class="w-full sm:w-1/2">
                  <serach_Input :arrItems="vendorStore.initVendor.listRSOs" ref="rsocomp" label="Sales Exec."
                    v-model="rsoNo" @selectItem="SelectAgent" />
                  <div v-if="err.rsoNo" class="mt-1 text-xs text-red-500">
                    {{ err.rsoNo }}
                  </div>
                </div>
                <div class="w-full sm:w-1/2">
                  <selectinput2 v-model="district" :cur_item="district" :selections="getDistricts" :isDistrict="true"
                    @changed="onDistrictChange" label="District" />
                  <div v-if="err.district" class="mt-1 text-xs text-red-500">
                    {{ err.district }}
                  </div>
                </div>
                <div class="w-full sm:w-1/2">
                  <div v-if="filteredCities.length" class="flex items-end justify-between gap-2">
                    <div class="flex-1">
                      <selectinput2 v-model="city" :cur_item="city" :selections="filteredCities" label="City"
                        :isDistrict="true" />
                    </div>
                    <button @click="showAddCity" class="self-end confirm-button h-9">
                      Add City
                    </button>
                  </div>
                  <div v-if="err.city" class="mt-1 text-xs text-red-500">
                    {{ err.city }}
                  </div>
                </div>
              </div>
            </div>

            <!-- CITY SECTION -->
            <div v-if="showCityForm">
              <div class="mt-2 mb-4 text-xl font-semibold text-gray-800">Add New City</div>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-1">
                <div class="w-full sm:w-1/2">
                  <selectinput2 v-model="city" :cur_item="city" :selections="filteredCities" label="Select District"
                    :err="err.city" />
                </div>

                <div class="w-full sm:w-1/2">
                  <label class="block text-sm font-bold text-gray-600">Enter City</label>
                  <input type="text" v-model="city" placeholder="Enter City" required
                    class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                  <div v-if="err.city" class="mt-1 text-xs text-red-500">
                    {{ err.city }}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

      <!-- Main Modal Footer -->
      <div class="modal-footer" v-if="!showCityForm">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="GetAssignSalesRef" class="confirm-button">Save</button>
      </div>

      <!-- CITY SECTION Footer -->
      <div class="modal-footer" v-else>
        <button @click="cancelAddCity" class="cancel-button">Cancel</button>
        <button @click="SaveCity" class="confirm-button">Save City</button>
      </div>

    </div>
  </div>
</template>

<script>
import closebtn from "~/components/customcontrol/modal_close_button";
import serach_Input from "~/components/customcontrol/SearchInput";
import selectinput2 from "~/components/customcontrol/selectinput2.vue";
import { useVendorStore } from "~/stores/modules/qms/vendorStore";

definePageMeta({ layout: 'default' });

export default {
  components: { closebtn, serach_Input, selectinput2 },
  data() {
    return {
      imageroot: process.env.Assets_83,
      isOpen: true,
      showCityForm: false,
      rsoNo: "",
      city: null,
      district: null,
      selectedCity: null,
      cities: [],
      showLoading: null,
      err: {
        rsoNo: "",
        city: "",
        district: "",
      },
    };
  },
  props: {
    leadId: {
      type: [String, Number],
      required: true
    }
  },

  computed: {
    getDistricts() {
      const seen = new Set();
      return this.vendorStore.InitLeads.listDistrictCities.filter(item => {
        const key = `${item.districtId}-${item.districtName}`;
        if (!seen.has(key)) {
          seen.add(key);
          return true;
        }
        return false;
      }).map(item => ({
        id: item.districtId,
        name: item.districtName
      }));
    },
    filteredCities() {
      console.log("district:", this.district);

      if (!this.district) return [];
      return this.vendorStore.InitLeads.listDistrictCities.filter(
        c => c.districtId == this.district
      ).map(c => ({
        id: c.cityId,
        name: c.cityName
      }));
    },

    selectedCityObject() {
      return this.filteredCities.find(city => city.id == this.city);
    },
  },

  // watch: {
  //   district(newVal) {
  //     console.log("newVal:", JSON.stringify(newVal));

  //     if (newVal && newVal.id) {
  //       // Filter cities based on selected district
  //       this.cities = this.vendorStore.InitLeads.listDistrictCities
  //         .filter(c => c.districtId === newVal.id)
  //         .map(c => ({
  //           id: c.cityId,
  //           name: c.cityName
  //         }));
  //     } else {
  //       this.cities = [];
  //     }
  //     this.selectedCity = null; // reset selected city
  //   }
  // },

  async created() {
    this.showLoading = this.$showLoading;
    this.vendorStore = useVendorStore();

    await this.vendorStore.GetInitLeads(this.showLoading);
  },
  methods: {
    SelectAgent(rsoNo) {
      this.rsoNo = rsoNo;
    },
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },
    showAddCity() {
      this.showCityForm = true;
    },
    cancelAddCity() {
      this.showCityForm = false;
    },
    onDistrictChange(districtObj) {
      console.log("District selected:", districtObj);
      this.selectedCity = ""; // Reset selected city
    },
    async GetAssignSalesRef() {
      if (this.IsValidate()) {
        this.vendorStore.curVendor.rsoNo = this.rsoNo;
        // const req = { Id: this.vendorStore.curVendor.id, RSONo: this.rsoNo };
        const req = {
          Id: this.vendorStore.curVendor.id || this.leadId,
          RSONo: this.rsoNo,
        };
        console.log(JSON.stringify(req, null, 2));

        await this.vendorStore.GetAssignSalesRef(req, this.showLoading);
        this.closeModal();
      }
    },
    IsValidate() {
      let isValid = true;

      this.err.rsoNo = this.rsoNo ? "" : "Please select a Sales Executive!";
      if (!this.rsoNo) isValid = false;

      this.err.district = this.district ? "" : "Please select a District!";
      if (!this.district) isValid = false;

      this.err.city = this.city ? "" : "Please select a City!";
      if (!this.city) isValid = false;

      return isValid;
    }

  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  width: 600px;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 14px;
}

.modal-header,
.modal-footer {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 16px;
  font-weight: bold;
}

.modal-content {
  padding: 10px 15px;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  border-radius: 4px;
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
  opacity: 0.85;
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .modal {
    width: 90%;
  }
}
</style>
