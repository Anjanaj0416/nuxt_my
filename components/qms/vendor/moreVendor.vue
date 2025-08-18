<template>
  <div >
    <div >
      <!-- Modal Header -->

      <div class="w-full mb- md:mb-0">  
          <div class="text-2xl uppercase mb-4"> More Details</div>
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="border rounded-lg shadow-md p-6 text-sm">
        <div class="form-content">
          <div>
            <div v-if="isEditing">
              <!-- One row with left and right content -->
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold">Company Details</h3>
                </div>
                <!-- <div>
                  <label class="block text-sm font-bold text-gray-600">Status</label>
                  <toggleoption v-model="curVendor.isActive" />
                </div> -->
                <div class="flex items-center justify-between">
                  <span class="mr-4 text-sm font-bold text-gray-600">Status : {{ (curVendor.isActive)?'Active':'Inactive' }}</span>

                </div>
              </div>
            </div>
          </div>
{{ curVendor }}
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div v-if="isEditing" class="mb-2">
                <label class="block text-sm font-bold text-gray-600 mb-1">Customer Ref</label>
                <span class="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full" v-if="curVendor.customerRef">
                    {{ curVendor.customerRef }}
                </span>
                <span class="inline-block text-sm italic text-gray-500" v-else>
                  NO data
                </span>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Company Name</label>
              <span class="inline-block  text-sm font-semibold text-gray-800 " v-if="curVendor.shopName">
                    {{ curVendor.shopName }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Phone</label>
              <span class="inline-block  text-sm font-semibold text-gray-800 " v-if="curVendor.shopContactNo">
                    {{ curVendor.shopContactNo }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Email</label>
              <span class="inline-block  text-sm font-semibold text-gray-800 " v-if="curVendor.shopEmail">
                    {{ curVendor.shopEmail }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Web site</label>
              <span class="inline-block  text-sm font-semibold text-gray-800 " v-if="curVendor.shopWeb">
                    {{ curVendor.shopWeb }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Address Line 1</label>
              <span class="inline-block  text-sm font-semibold text-gray-800 " v-if="curVendor.shopAddress1">
                    {{ curVendor.shopAddress1 }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Address Line 2</label>
              <span class="inline-block  text-sm font-semibold text-gray-800" v-if="curVendor.shopAddress2">
                    {{ curVendor.shopAddress2 }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">District</label>
              <selectName
                :arrItems="getDistinctDistricts"
                :id="curVendor.districtId"
                label=""
              />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>
              <selectName
                :arrItems="filteredCities"
                :id="curVendor.cityId"
                label=""
              />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">BR Number</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.brNumber">
                {{ curVendor.brNumber }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">VAT No</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.vatNo">
                {{ curVendor.vatNo }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">QR Link</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.storeUrl">
                {{ curVendor.storeUrl }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>

          </div>

          <!-- description -->
          <div class="mt-2">
            <label class="block text-sm font-bold text-gray-600 mb-1">Description</label>
            <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.description">
                {{ curVendor.description }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <!--Vendor Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600 mb-1">Vendor Image</label>
              <div class="relative mt-2">
                <img
                    :src="imageroot + curVendor.shopLogo"
                    alt="Vendor Logo"
                    class="w-32 h-32 object-cover border border-gray-300 rounded-lg shadow-md"
                />
              </div>
            </div>
            <!-- BR Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600 mb-1">BR</label>
              <!-- <div class="relative mt-2">
                <imagecomp :existing_image_path="imageroot + curVendor.shopLogo"
                  @deleteExistingImage="curVendor.brCopyImage = ''" @GetSelectedImage="GetSelectedBRCopy"
                  ref="refBRCopy" />
              </div> -->
                <div class="relative mt-2">
                <a :href="imageroot + curVendor.brCopyImage" target="_blank">
                  <img
                      :src="imageroot + curVendor.brCopyImage"
                      alt="Vendor Logo"
                      class="w-32 h-32 object-cover border border-gray-300 rounded-lg shadow-md"
                  />
                </a>
              </div>
            </div>
            <!-- QR Image -->
            <!-- <div>
              <label class="block text-sm font-bold text-gray-600">QR Image</label>
              <div class="relative mt-2">
                <img
                  class="h-36 max-w-lg rounded-lg"
                  :src="imageroot + curVendor.shopLogo"
                  alt="Shop Logo"
                />
              </div>
            </div> -->
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Owner Information</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Name</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.authorisePersonName">
                {{ curVendor.authorisePersonName }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Contact Number</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.district">
                {{ curVendor.authorisePersonPhone }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Date of Birth</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.authorisePersonBDate">
                {{ curVendor.authorisePersonBDate }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Email</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.authorisePersonEmail">
                {{ curVendor.authorisePersonEmail }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Contact Person </h3>
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Name</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.shopContactPersonName">
                {{ curVendor.shopContactPersonName }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Designation</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.shopContactPersonDesignation">
                {{ curVendor.shopContactPersonDesignation }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Contact Number</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.shopContactPersonPhone">
                {{ curVendor.shopContactPersonPhone }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Date of Birth</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.shopContactPersonBDate">
                {{ curVendor.shopContactPersonBDate }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Email</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.shopContactPersonEmail">
                {{ curVendor.shopContactPersonEmail }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Bank Details</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Bank Name</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.bankName">
                {{ curVendor.bankName }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Bank Branch</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.branch">
                {{ curVendor.branch }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Bank Account No</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.accountNumber">
                {{ curVendor.accountNumber }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Card Holder Name</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.holderName">
                {{ curVendor.holderName }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Super Admin Details (Recommended: Business Owner)</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Full Name</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.suAdminfullName">
                {{ curVendor.suAdminfullName }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Designation</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.suAdminDesignation">
                {{ curVendor.suAdminDesignation }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Email</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.suAdminEmail">
                {{ curVendor.suAdminEmail }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Mobile Number</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.suAdminEmail">
                {{ curVendor.suAdminMobile }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">National ID / Passport Number</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.suAdminNic">
                {{ curVendor.suAdminNic }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Additional Admin User Details</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Full Name</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.additionalFullName">
                {{ curVendor.additionalFullName }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600 mb-1">Designation</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.additionalDesignation">
                {{ curVendor.additionalDesignation }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.additionalEmail">
                {{ curVendor.additionalEmail }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.additionalMobileNumber">
                {{ curVendor.additionalMobileNumber }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">National ID / Passport Number</label>
              <span class="inline-block text-sm font-semibold text-gray-800" v-if="curVendor.additionalNic">
                {{ curVendor.additionalNic }}
              </span>
              <span class="inline-block text-sm italic text-gray-500" v-else>
                NO data
              </span>
            </div>
          </div>

        </div>

        
      </div>

      
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { ref } from 'vue'
import closebtn from "~/components/customcontrol/modal_close_button";
import imagecomp from "~/components/customcontrol/imagepicker";

import ImageLable from "~/components/customcontrol/ImageLable";
import serach_Input from "~/components/customcontrol/SearchInput.vue";
import toggleoption from "~/components/customcontrol/toggleoption";
import selectName from "~/components/customcontrol/selectName.vue";
// import imagecomp from "~/components/customcontrol/imagepicker1.vue"

import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import { useUserStore } from "~/stores/modules/userStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption ,selectName},
  props:['vendorId'],

  data() {
    return {
      isOpen: true,
     
      err: {},
      imageroot: "",
      showLoading: null,
           isEdit: false,
      listTemp: [{ id: 1, value: 'abc' }, { id: 2, value: 'def' }],
    };
  },
  computed: {
    isEditing() {
      return (
        this.curVendor &&
        this.curVendor.id !== "00000000-0000-0000-0000-000000000000"
      );
    },

    curVendor() {
      return this.vendorStore.curVendor;
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
      const cities = this.vendorStore?.initVendor?.listDistrictCities;

      if (!Array.isArray(cities)) {
        return [];
      }

      const sortedCities = cities
        .filter(city => {
          return this.curVendor.districtId ? city.districtId === this.curVendor.districtId : true;
        })
        .sort((a, b) => a.cityName.localeCompare(b.cityName))
        .map(city => ({
          id: city.cityId,
          value: city.cityName
        }));

      return sortedCities;
    }



    
  },
  async created() {
    this.vendorStore = useVendorStore();
    this.userStore = useUserStore();
    // this.curVendor = this.vendorStore.curVendor;
    // console.log(JSON.stringify(this.curVendor, null, 2 ));
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
  },
  mounted() {
    if (this.curVendor.shopContactPersonBDate) {
      this.curVendor.shopContactPersonBDate = this.curVendor.shopContactPersonBDate.substring(0, 10);
    }

    if (this.curVendor.authorisePersonBDate) {
      this.curVendor.authorisePersonBDate = this.curVendor.authorisePersonBDate.substring(0, 10);
    }

    // this.$refs.refCity.initItem(this.curVendor.cityId);
    // this.$refs.refDistrict.initItem(this.curVendor.district);
  },
  methods: {

    cancel() {
      this.clearErr();
      this.closeModal();
    },

  

    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },

    GetSelectCity(cityObj) {
      this.curVendor.cityId = cityObj.id;
      this.curVendor.city = cityObj.value;
    },

    async GetSelectDistrict(districtObj) {
      this.curVendor.districtId = districtObj.id;
      this.curVendor.district = districtObj.value;

      await this.clearCity();
      //alert(this.curVendor.district )
    },

    async clearCity() {
      this.curVendor.cityId = "";
      this.curVendor.city = "";
    },
    // zz
    convertToFormData(formObject) {
      const formData = new FormData();
      formData.append("Id", vendorId);
      formData.append("shopWeb", this.curVendor.shopWeb);
      formData.append("shopEmail", this.curVendor.shopEmail);
      formData.append("shopName", this.curVendor.shopName);
      formData.append("ShopContactNo", this.curVendor.shopContactNo);
      formData.append("ShopAddress1", this.curVendor.shopAddress1);
      formData.append("ShopAddress2", this.curVendor.shopAddress2);
      formData.append("CityId", this.curVendor.cityId);
      formData.append("VendorImageFile", this.curVendor.vendorImageFile);
      formData.append("BRCopyFile", this.curVendor.brCopyImage);
      formData.append("ShopLogoPath", this.curVendor.shopLogo);
      formData.append("BRNumber", this.curVendor.BRNumber);
      formData.append("VATNo", this.curVendor.VATNo);
      formData.append("Description", this.curVendor.description);

      // Contact Person
      formData.append("shopContactPersonName", this.curVendor.shopContactPersonName);
      formData.append("shopContactPersonDesignation", this.curVendor.shopContactPersonDesignation);
      formData.append("shopContactPersonBDate", this.curVendor.shopContactPersonBDate);
      formData.append("shopContactPersonPhone", this.curVendor.shopContactPersonPhone);
      formData.append("shopContactPersonEmail", this.curVendor.shopContactPersonEmail);

      // Owner dETAILS
      formData.append("authorisePersonName", this.curVendor.authorisePersonName);
      formData.append("authorisePersonBDate", this.curVendor.authorisePersonBDate);
      formData.append("authorisePersonPhone", this.curVendor.authorisePersonPhone);
      formData.append("authorisePersonEmail", this.curVendor.authorisePersonEmail);

      // Bank Details
      formData.append("bankName", this.curVendor.bankName);
      formData.append("branch", this.curVendor.branch);
      formData.append("accountNumber", this.curVendor.accountNumber);
      formData.append("holderName", this.curVendor.holderName);

      // Boolean fields should be converted to string
      formData.append("IsActive", String(this.curVendor.isActive ?? true));
      return formData;
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