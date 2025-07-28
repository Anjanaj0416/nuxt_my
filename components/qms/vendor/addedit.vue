<template>
  <div >
    <div >
      <div class="w-full mb- md:mb-0">  
          <div class="text-2xl uppercase mb-4"> Vendor Details - {{ isEditing ? "Edit" : "Add" }}</div>
      </div>
       <!-- {{ Id }} -->
      <!-- <pre>{{ JSON.stringify(curVendor, null, 2) }}</pre>   -->


      <!-- Modal Content (scrollable) -->
      <div class="border rounded-lg shadow-md p-6 text-sm">
        <div class="form-content">
          <div>
            <div v-if="isEditing">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-bold">Company Details</h3>
                </div>
                <div class="flex items-center justify-between">
                  <span class="mr-4 text-sm font-bold text-gray-600">Status :</span>
                  <toggleoption v-model="curVendor.isActive" />
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div class="" v-if="isEditing">
              <label class="block text-sm font-bold text-gray-600">Customer Ref</label>
              <input type="text" v-model="curVendor.customerRef" disabled placeholder="Vendor ID (read-only)"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Company Name</label>
              <input type="text" v-model="curVendor.shopName" placeholder="Enter Company Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Phone</label>

              <input type="text" v-model="curVendor.shopContactNo" placeholder="Enter Phone"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="Email" v-model="curVendor.shopEmail" placeholder="Enter Email"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Web site</label>
              <input type="tel" v-model="curVendor.shopWeb" placeholder="Enter Web site"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 1</label>
              <input type="text" v-model="curVendor.shopAddress1" placeholder="Enter Address Line 1" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 2</label>
              <input type="text" v-model="curVendor.shopAddress2" placeholder="Enter Address Line 2" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <!-- <div class="">
              <label class="block text-sm font-bold text-gray-600">District</label>

              <serach_Input :arrItems="getDistinctDistricts" :isDistrict=true ref="refDistrict" label=""
                v-model="curVendor.districtId" @selectItem="GetSelectDistrict" />
            </div> -->
            <div class="">
              <label class="block text-sm font-bold text-gray-600">City</label>
              <serach_Input :arrItems="filteredCities" ref="refCity" label="" v-model="curVendor.cityId"
                @selectItem="GetSelectCity" />

            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">BR Number</label>
              <input type="text" v-model="curVendor.brNumber" placeholder="Enter Business Registration Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />

            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">VAT No</label>
              <input type="text" v-model="curVendor.vatNo" placeholder="Enter VAT Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Store Url</label>
              <input type="text" v-model="curVendor.storeUrl" placeholder="Enter QR Link" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Assiged CSO</label>
              <serach_Input
                :arrItems="csoList"
                ref="refCso"
                v-model="curVendor.csoNo"
                @selectItem="GetSelectCso"
              />
            </div>

          </div>

          <!-- description -->
          <div class="mt-2">
            <label class="block text-sm font-bold text-gray-600">Description</label>
            <textarea type="text" v-model="curVendor.description" placeholder="Enter Description"
              class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
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
            </div>
            <!-- BR Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">BR</label>
              <div class="relative mt-2">
                <imagecomp :existing_image_path="imageroot + curVendor.shopLogo"
                  @deleteExistingImage="curVendor.brCopyImage = ''" @GetSelectedImage="GetSelectedBRCopy"
                  ref="refBRCopy" />
              </div>
            </div>

          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Owner Information</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input type="text" v-model="curVendor.authorisePersonName" placeholder="Enter Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />

            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input type="text" v-model="curVendor.authorisePersonPhone" :maxlength="10"
                placeholder="Enter Contact Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Date of Birth</label>
              <input type="date" v-model="curVendor.authorisePersonBDate" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.authorisePersonEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Contact Person </h3>
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input type="text" v-model="curVendor.shopContactPersonName" placeholder="Enter Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curVendor.shopContactPersonDesignation" placeholder="Enter Designation"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input type="text" v-model="curVendor.shopContactPersonPhone" :maxlength="10"
                placeholder="Enter Contact Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />

            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Date of Birth</label>
              <input type="date" v-model="curVendor.shopContactPersonBDate"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />

            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.shopContactPersonEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />

            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Bank Details</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0 lg:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Name</label>
              <input type="text" v-model="curVendor.bankName" placeholder="Enter Bank Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Branch</label>
              <input type="text" v-model="curVendor.branch" placeholder="Enter Bank Branch" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Account No</label>
              <input type="text" v-model="curVendor.accountNumber" placeholder="Enter ank Account No" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Card Holder Name</label>
              <input type="text" v-model="curVendor.holderName" placeholder="Enter Card Colder Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Super Admin Details (Recommended: Business Owner)</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Full Name</label>
              <input type="text" v-model="curVendor.suAdminfullName" placeholder="Enter Full Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
 
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curVendor.suAdminDesignation" placeholder="Enter Designation" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.suAdminEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input type="text" v-model="curVendor.suAdminMobile" placeholder="Enter Mobile Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">National ID / Passport Number</label>
              <input type="text" v-model="curVendor.suAdminNic" placeholder="Enter National ID / Passport Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Additional Admin User Details</h3>
          <div class="grid grid-cols-1 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Full Name</label>
              <input type="text" v-model="curVendor.additionalFullName" placeholder="Enter Full Name" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Designation</label>
              <input type="text" v-model="curVendor.additionalDesignation" placeholder="Enter Designation" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input type="text" v-model="curVendor.additionalEmail" placeholder="Enter Email" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input type="text" v-model="curVendor.additionalMobileNumber" placeholder="Enter Mobile Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">National ID / Passport Number</label>
              <input type="text" v-model="curVendor.additionalNic" placeholder="Enter National ID / Passport Number" required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>

        </div>

        <div class="flex justify-between items-center mt-6">
          <button @click="cancel" class="cancel-button">Cancel</button>
          <button @click="AddEditVendor" class="confirm-button">
            {{ isEditing ? "Update Vendor" : "Save Vendor" }}
          </button>
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
// import imagecomp from "~/components/customcontrol/imagepicker1.vue"

import { useVendorStore } from "~/stores/modules/qms/vendorStore";
import { useUserStore } from "~/stores/modules/userStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption },
  props:['Id'],
  data() {
    return {
      isOpen: true,
      curVendor: {
        // Company Details
        shopName: "",
        shopEmail: "",
        shopWeb: "",
        shopMobileNo: "",
        shopContactNo: "",
        shopAddress1: "",
        shopAddress2: "",
        district: "",
        districtId: "",
        city: "",
        cityId: "",
        csoNo:"",
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

  watch: {
    curVendor: {
      handler(newVal) {
        if (newVal && newVal.id) {
          // console.log('curVendor updated in AddEdit.vue:', JSON.stringify(newVal, null, 2));
        }
      },
      immediate: true,
      deep: true
    }
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

    csoList() {
      return this.vendorStore?.initVendor?.listRSOs || [];
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
    this.curVendor = this.vendorStore.curVendor;
    console.log(JSON.stringify(this.curVendor, null, 2 ));
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
    this.$refs.refCso?.initItem(this.curVendor.csoNo);
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
      this.$emit("close");
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
    onSelectRSO(selectedId) {
      console.log("Selected RSO from native select:", selectedId);
      this.curVendor.csoNo = selectedId;
    },

    clearCurVendor() {
      this.curVendor = {
        Id: "",
        customerRef: "",
        shopWeb: "",
        storeUrl: "",
        shopEmail: "",
        shopName: "",
        shopContactNo: "",
        shopAddress1: "",
        shopAddress2: "",
        districtId: "",
        cityId: "",
        csoId: "",
        vendorImageFile: "",
        brCopyImage: "",
        shopLogo: "",
        brNumber: "",
        vatNo: "",
        description: "",
        shopContactPersonName: "",
        shopContactPersonDesignation: "",
        shopContactPersonBDate: "",
        shopContactPersonPhone: "",
        shopContactPersonEmail: "",
        authorisePersonName: "",
        authorisePersonBDate: "",
        authorisePersonPhone: "",
        authorisePersonEmail: "",
        bankName: "",
        branch: "",
        accountNumber: "",
        holderName: "",
        isActive: true,
      };
    },

    GetSelectCso(selectedItem) {
      // console.log("Selected CSO from search input:", selectedItem);
      if (selectedItem && selectedItem.id) {
        this.curVendor.csoNo = selectedItem.id;
      }
    },

    AddEditVendor() {
      this.$showConfirm(
        "Are you sure you want to update this vendor?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const formData = this.convertToFormData(this.curVendor);

          // Optional: log formData for testing
          for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
          await this.vendorStore.AddEditVendor(formData, this.showLoading);
          this.clearCurVendor();
          this.$emit("close")
          this.isEdit = false;
        } else {
          console.log("Action canceled");
        }
      });
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
      
      formData.append("Id", this.Id);
      formData.append("ShopWeb", this.curVendor.shopWeb || "");
      formData.append("StoreUrl", this.curVendor.storeUrl || "");
      formData.append("ShopEmail", this.curVendor.shopEmail || "");
      formData.append("ShopName", this.curVendor.shopName || "");
      formData.append("ShopContactNo", this.curVendor.shopContactNo || "");
      formData.append("ShopAddress1", this.curVendor.shopAddress1 || "");
      formData.append("ShopAddress2", this.curVendor.shopAddress2 || "");
      // formData.append("DistrictId", this.curVendor.districtId);
      formData.append("CityId", this.curVendor.cityId );
      formData.append("CSONo", this.curVendor.csoNo );;
      formData.append("VendorImageFile", this.curVendor.vendorImageFile || "");
      formData.append("BRCopyFile", this.curVendor.brCopyImage || "");
      formData.append("ShopLogoPath", this.curVendor.shopLogo || "");
      formData.append("BRNumber", this.curVendor.brNumber || "");
      formData.append("VATNo", this.curVendor.vatNo || "");
      formData.append("Description", this.curVendor.description || "");

      // Contact Person
      formData.append("ShopContactPersonName", this.curVendor.shopContactPersonName || "");
      formData.append("ShopContactPersonDesignation", this.curVendor.shopContactPersonDesignation || "");
      formData.append("ShopContactPersonBDate", this.curVendor.shopContactPersonBDate || "");
      formData.append("ShopContactPersonPhone", this.curVendor.shopContactPersonPhone || "");
      formData.append("ShopContactPersonEmail", this.curVendor.shopContactPersonEmail || "");

      // Owner dETAILS
      formData.append("AuthorisePersonName", this.curVendor.authorisePersonName || "");
      formData.append("AuthorisePersonBDate", this.curVendor.authorisePersonBDate || "");
      formData.append("AuthorisePersonPhone", this.curVendor.authorisePersonPhone || "");
      formData.append("AuthorisePersonEmail", this.curVendor.authorisePersonEmail || "");

      // Bank Details
      formData.append("BankName", this.curVendor.bankName || "");
      formData.append("Branch", this.curVendor.branch || "");
      formData.append("AccountNumber", this.curVendor.accountNumber || "");
      formData.append("HolderName", this.curVendor.holderName || "");

      // Boolean fields should be converted to string
      formData.append("IsActive", String(this.curVendor.isActive ?? true) || "");
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