<template>
  <div >
    <div >
      <!-- Modal Header -->
      <div >
        <h2 class="mb-4">
          Vendor Details - {{ isEditing ? "Edit" : "Add" }}
        </h2>
      </div>

      <!-- Modal Content (scrollable) -->
      <div >
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
                  <span class="mr-4 text-sm font-bold text-gray-600">Status :</span>
                  <toggleoption v-model="curVendor.isActive" />
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="" v-if="isEditing">
              <label class="block text-sm font-bold text-gray-600">Customer Ref</label>
              <input type="text" v-model="curVendor.customerRef" disabled placeholder="Vendor ID (read-only)"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Company Name</label>
              <input type="text" v-model="curVendor.shopName" placeholder="Enter Company Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopName" class="mt-2 text-sm text-red-600">
                {{ err.shopName }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Phone</label>

              <input type="text" v-model="curVendor.shopContactNo" placeholder="Enter Phone"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.shopContactNo" class="mt-2 text-sm text-red-600">
                {{ err.shopContactNo }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="Email" v-model="curVendor.shopEmail" placeholder="Enter Email"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
              <p v-if="err.shopEmail" class="mt-2 text-sm text-red-600">
                {{ err.shopEmail }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Web site</label>
              <input type="tel" v-model="curVendor.shopWeb" placeholder="Enter Web site"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopMobileNo" class="mt-2 text-sm text-red-600">
                {{ err.shopMobileNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 1</label>
              <input type="text" v-model="curVendor.shopAddress1" placeholder="Enter Address Line 1" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopAddress1" class="mt-2 text-sm text-red-600">
                {{ err.shopAddress1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 2</label>
              <input type="text" v-model="curVendor.shopAddress2" placeholder="Enter Address Line 2" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopAddress2" class="mt-2 text-sm text-red-600">
                {{ err.shopAddress2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">District</label>

              <serach_Input :arrItems="getDistinctDistricts" :isDistrict=true ref="refDistrict" label=""
                v-model="curVendor.district" @selectItem="GetSelectDistrict" />

              <p v-if="err.district" class="mt-2 text-sm text-red-600">
                {{ err.district }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>
              <serach_Input :arrItems="filteredCities" ref="refCity" label="" v-model="curVendor.cityId"
                @selectItem="GetSelectCity" />
              <p v-if="err.cityId" class="mt-2 text-sm text-red-600">
                {{ err.cityId }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">BR Number</label>
              <input type="text" v-model="curVendor.BRNumber" placeholder="Enter Business Registration Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.BRNumber" class="mt-2 text-sm text-red-600">
                {{ err.BRNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">VAT No</label>
              <input type="text" v-model="curVendor.VATNo" placeholder="Enter VAT Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.VATNo" class="mt-2 text-sm text-red-600">
                {{ err.VATNo }}
              </p>
            </div>

          </div>

          <!-- description -->
          <div class="mt-2">
            <label class="block text-sm font-bold text-gray-600">Description</label>
            <input type="text" v-model="curVendor.description" placeholder="Enter Description"
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            <p v-if="err.description" class="mt-2 text-sm text-red-600">
              {{ err.description }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <!--Vendor Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">Vendor Image</label>
              <div class="relative mt-2">
                <imagecomp :existing_image_path="imageroot + curVendor.shopLogo"
                  @deleteExistingImage="curVendor.shopLogo = ''" @GetSelectedImage="GetSelectedVendorImage"
                  ref="refVendorImage" />
              </div>
              <p v-if="err.vendorImage" class="mt-2 text-sm text-red-600">
                {{ err.vendorImage }}
              </p>
            </div>
            <!-- BR Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">BR</label>
              <div class="relative mt-2">
                <imagecomp :existing_image_path="imageroot + curVendor.shopLogo"
                  @deleteExistingImage="curVendor.brCopyImage = ''" @GetSelectedImage="GetSelectedBRCopy"
                  ref="refBRCopy" />
              </div>
              <p v-if="err.brCopyImage" class="mt-2 text-sm text-red-600">
                {{ err.brCopyImage }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Owner Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input type="text" v-model="curVendor.authorisePersonName" placeholder="Enter Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.authorisePersonName" class="mt-2 text-sm text-red-600">
                {{ err.authorisePersonName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input type="text" v-model="curVendor.authorisePersonPhone" :maxlength="10"
                placeholder="Enter Contact Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.authorisePersonPhone" class="mt-2 text-sm text-red-600">
                {{ err.authorisePersonPhone }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Date of Birth</label>
              <input type="date" v-model="curVendor.authorisePersonBDate" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.authorisePersonBDate" class="mt-2 text-sm text-red-600">
                {{ err.authorisePersonBDate }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.authorisePersonEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.authorisePersonEmail" class="mt-2 text-sm text-red-600">
                {{ err.authorisePersonEmail }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Contact Person </h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input type="text" v-model="curVendor.shopContactPersonName" placeholder="Enter Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopContactPersonName" class="mt-2 text-sm text-red-600">
                {{ err.shopContactPersonName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curVendor.shopContactPersonDesignation" placeholder="Enter Designation"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopContactPersonDesignation" class="mt-2 text-sm text-red-600">
                {{ err.shopContactPersonDesignation }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input type="text" v-model="curVendor.shopContactPersonPhone" :maxlength="10"
                placeholder="Enter Contact Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopContactPersonPhone" class="mt-2 text-sm text-red-600">
                {{ err.shopContactPersonPhone }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Date of Birth</label>
              <input type="date" v-model="curVendor.shopContactPersonBDate"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopContactPersonBDate" class="mt-2 text-sm text-red-600">
                {{ err.shopContactPersonBDate }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.shopContactPersonEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.shopContactPersonEmail" class="mt-2 text-sm text-red-600">
                {{ err.shopContactPersonEmail }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Bank Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Name</label>
              <input type="text" v-model="curVendor.bankName" placeholder="Enter Bank Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.bankName" class="mt-2 text-sm text-red-600">
                {{ err.bankName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Branch</label>
              <input type="text" v-model="curVendor.branch" placeholder="Enter Bank Branch" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.branch" class="mt-2 text-sm text-red-600">
                {{ err.branch }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Account No</label>
              <input type="text" v-model="curVendor.accountNumber" placeholder="Enter ank Account No" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.accountNumber" class="mt-2 text-sm text-red-600">
                {{ err.accountNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Card Holder Name</label>
              <input type="text" v-model="curVendor.holderName" placeholder="Enter Card Colder Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.holderName" class="mt-2 text-sm text-red-600">
                {{ err.holderName }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Super Admin Details (Recommended: Business Owner)</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Full Name</label>
              <input type="text" v-model="curVendor.suAdminfullName" placeholder="Enter Full Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.suAdminfullName" class="mt-2 text-sm text-red-600">
                {{ err.suAdminfullName }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curVendor.suAdminDesignation" placeholder="Enter Designation" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.branch" class="mt-2 text-sm text-red-600">
                {{ err.branch }}
              </p> -->
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.suAdminEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.accountNumber" class="mt-2 text-sm text-red-600">
                {{ err.accountNumber }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input type="text" v-model="curVendor.suAdminMobile" placeholder="Enter Mobile Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.holderName" class="mt-2 text-sm text-red-600">
                {{ err.holderName }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">National ID / Passport Number</label>
              <input type="text" v-model="curVendor.suAdminNic" placeholder="Enter National ID / Passport Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.holderName" class="mt-2 text-sm text-red-600">
                {{ err.holderName }}
              </p> -->
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Additional Admin User Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Full Name</label>
              <input type="text" v-model="curVendor.additionalFullName" placeholder="Enter Full Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.suAdminfullName" class="mt-2 text-sm text-red-600">
                {{ err.suAdminfullName }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curVendor.additionalDesignation" placeholder="Enter Designation" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.branch" class="mt-2 text-sm text-red-600">
                {{ err.branch }}
              </p> -->
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.additionalEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.accountNumber" class="mt-2 text-sm text-red-600">
                {{ err.accountNumber }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input type="text" v-model="curVendor.additionalMobileNumber" placeholder="Enter Mobile Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.holderName" class="mt-2 text-sm text-red-600">
                {{ err.holderName }}
              </p> -->
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">National ID / Passport Number</label>
              <input type="text" v-model="curVendor.additionalNic" placeholder="Enter National ID / Passport Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <!-- <p v-if="err.holderName" class="mt-2 text-sm text-red-600">
                {{ err.holderName }}
              </p> -->
            </div>
          </div>

        </div>
      </div>


      <!-- Modal Footer -->
      <!-- <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="handleSubmit" class="confirm-button">Save</button>
      </div> -->
    <div>
      <button v-if="!isEdit" @click="startEditing">Edit</button>
      <button v-else @click="AddEditVendor">Save</button>
    </div>

      <div class="mt-4">
        <button @click="cancel" class="cancel-button">Cancel</button>
      <button v-if="!isEdit" @click="startEditing">Edit</button>

        <button @click="AddEditVendor" class="confirm-button">
          {{ isEditing ? "Update Vendor" : "Save Vendor" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { ref } from 'vue'
import closebtn from "~/components/customcontrol/modal_close_button";
import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import imagecomp from "~/components/customcontrol/imagepicker";
import ImageLable from "~/components/customcontrol/ImageLable";

import serach_Input from "~/components/customcontrol/SearchInput.vue";
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
      curVendor: {
        // Company Details
        shopName: "",
        shopEmail: "",
        shopWeb:"",
        shopMobileNo: "",
        shopContactNo: "",
        shopAddress1: "",
        shopAddress2: "",
        district: "",
        districtId: "",
        city: "",
        cityId: "",
        description: "",
        brCopyImage: "",
        // brCopyFile: null,

        // Owner Information
        authorisePersonName: "",
        authorisePersonBDate: "",
        authorisePersonPhone: "",
        authorisePersonEmail: "",

        // Contact Person
        shopContactPersonName: "",
        shopContactPersonDesignation: "",
        shopContactPersonBDate: "",
        shopContactPersonPhone: "",
        shopContactPersonEmail: "",

        // Bank Details
        bankName: "",
        branch: "",
        accountNumber: "",
        holderName: "",
      },
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
        // console.log(error);
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


    // filteredCities() {
    //   if (this.curVendor.districtId) {
    //     return this.vendorStore.initVendor.listDistrictCities
    //       .filter(city => city.districtId === this.curVendor.districtId)
    //       .sort((a, b) => a.cityName.localeCompare(b.cityName))
    //       .map(city => ({
    //         id: city.cityId,
    //         value: city.cityName
    //       }));
    //   } else {
    //     return this.vendorStore.initVendor.listDistrictCities
    //       .sort((a, b) => a.cityName.localeCompare(b.cityName))
    //       .map(city => ({
    //         id: city.cityId,
    //         value: city.cityName
    //       }));
    //   }
    // },
    
  },
  async created() {
    this.vendorStore = useVendorStore();
    this.userStore = useUserStore();
    this.curVendor = this.vendorStore.curVendor;
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

    this.$refs.refCity.initItem(this.curVendor.cityId);
    // this.$refs.refDistrict.initItem(this.curVendor.district);
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

      startEditing() {

    
    this.isEdit = true;
  },

    cancel() {
      this.clearErr();
      this.closeModal();
    },
    GetSelectedShopImage(image) {
      this.curVendor.shopLogoFile = image;
    },

    GetSelectedVendorImage(image) {
      this.curVendor.vendorImageFile = image;
    },
    GetSelectedShopCoverImage(image) {
      this.curVendor.shopCoverImageFile = image;
    },
    GetSelectedBRCopy(image) {
      this.curVendor.brCopyImage = image;
    },

    AddEditVendor() {
      console.log("AddEditVendor");
      if (this.IsValidate()) {
        this.$showConfirm(
          "Are you sure you want to update this vendor?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {
            const formData = this.convertToFormData(this.curVendor);
            // Convert to plain object and log it
            // const formDataObj = {};
            // for (let [key, value] of formData.entries()) {
            //   formDataObj[key] = value;
            // }
            // console.log('Form Data as Object:', formDataObj);

            await this.vendorStore.AddEditVendor(formData, this.showLoading);
            this.closeModal();
               this.isEdit = false;
          } else {
            console.log("Action canceled");
          }
        });
      }
    },

     saveChanges() {
      // Put your validation/save logic here
      console.log("Saving vendor:",);

      this.isEdit = false;
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;


      ///------------Company Details validation -----------------//
      if (!this.curVendor.shopName) {
        this.err.shopName = "Please Enter Company Name!";
        IsValidate = false;
      }

      if (!this.curVendor.shopEmail) {
        this.err.shopEmail = "Please Enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curVendor.shopEmail)) {
          this.err.shopEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.shopWeb) {
        this.err.shopWeb = "Please Enter Web site Link!";
        IsValidate = false;
      }

      // if (!this.curVendor.shopMobileNo) {
      //   this.err.shopMobileNo = "Please Enter Phone Number!";
      //   IsValidate = false;
      // } else {
      //   const contactNoRegex1 = /^[0-9]{10}$/;
      //   if (!contactNoRegex1.test(this.curVendor.shopMobileNo)) {
      //     this.err.shopMobileNo = "Please Enter a valid 10-digit contact number!";
      //     IsValidate = false;
      //   }
      // }

      if (!this.curVendor.shopContactNo) {
        this.err.shopContactNo = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.curVendor.shopContactNo)) {
          this.err.shopContactNo =
            "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.shopAddress1) {
        this.err.shopAddress1 = "Please Enter Address1!";
        IsValidate = false;
      }

      if (!this.curVendor.BRNumber) {
        this.err.BRNumber = "Please Enter Bussiness Registartion Number!";
        IsValidate = false;
      }

      if (!this.curVendor.cityId) {
        this.err.cityId = "Please Enter City!";
        IsValidate = false;
      }


      // // if (!this.curVendor.description?.trim?.()) {
      // //   this.err.description = "Please Enter Description!";
      // //   IsValidate = false;
      // // }

      if (!this.curVendor.shopLogo) {
        this.err.brCopy = "Please upload a Shop BR!";
        IsValidate = false;
      }


      ///------------Owner Information validation--------------------//
      if (!this.curVendor.authorisePersonName) {
        this.err.authorisePersonName = "Please Enter Owner Name!";
        IsValidate = false;
      }

      // if (!this.curVendor.authorisePersonBDate) {
      //   this.err.authorisePersonBDate = "Please Enter Owner Mobile Number!";
      //   IsValidate = false;
      // } else {
      //   const contactNoRegex1 = /^[0-9]{10}$/;
      //   if (!contactNoRegex1.test(this.curVendor.authorisePersonBDate)) {
      //     this.err.authorisePersonBDate = "Please Enter a valid 10-digit Mobile Number!";
      //     IsValidate = false;
      //   }
      // }

      if (!this.curVendor.authorisePersonPhone) {
        this.err.authorisePersonPhone = "Please Enter Owner Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.authorisePersonPhone)) {
          this.err.authorisePersonPhone = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.authorisePersonEmail) {
        this.err.authorisePersonEmail = "Please Enter Owner Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curVendor.authorisePersonEmail)) {
          this.err.authorisePersonEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }


      ///------------Person Information validation------------------//
      if (!this.curVendor.shopContactPersonName) {
        this.err.shopContactPersonName = "Please Enter Person Name!";
        IsValidate = false;
      }
      if (!this.curVendor.shopContactPersonDesignation) {
        this.err.shopContactPersonDesignation = "Please Enter Person Designation!";
        IsValidate = false;
      }

      if (!this.curVendor.shopContactPersonBDate) {
        this.err.shopContactPersonBDate = "Please Enter Person Date Of Birth!";
        IsValidate = false;
      }

      if (!this.curVendor.shopContactPersonPhone) {
        this.err.shopContactPersonPhone = "Please Enter Person Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.shopContactPersonPhone)) {
          this.err.shopContactPersonPhone = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.shopContactPersonEmail) {
        this.err.shopContactPersonEmail = "Please Enter Person Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curVendor.shopContactPersonEmail)) {
          this.err.shopContactPersonEmail = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }


      ///------------ Bank Details validation--------------------//
      if (!this.curVendor.bankName) {
        this.err.bankName = "Please Enter Bank Name!";
        IsValidate = false;
      }

      if (!this.curVendor.branch) {
        this.err.branch = "Please Enter Branch!";
        IsValidate = false;
      }

      if (!this.curVendor.accountNumber) {
        this.err.accountNumber = "Please Enter Account Number!";
        IsValidate = false;
      }

      if (!this.curVendor.holderName) {
        this.err.holderName = "Please Enter Holder Name!";
        IsValidate = false;
      }

      return IsValidate;
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
      formData.append("Id", this.curVendor.id);
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