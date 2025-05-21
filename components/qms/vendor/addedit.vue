<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Vendor Details - {{ isEditing ? "Edit" : "Add" }}
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
            <div class=""  v-if="isEditing">
              <label class="block text-sm font-bold text-gray-600">Customer Ref</label>
              <input
                type="text"
                v-model="curVendor.customerRef"
                disabled
                placeholder="Vendor ID (read-only)"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
              />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Company Name</label>
              <input
                type="text"
                v-model="curVendor.companyName"
                placeholder="Enter Company Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.companyName" class="mt-2 text-sm text-red-600">
                {{ err.companyName }}
              </p>
            </div>
            
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Phone</label>

              <input
                type="text"
                v-model="curVendor.phone"
                placeholder="Enter Phone"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.phone" class="mt-2 text-sm text-red-600">
                {{ err.phone }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="Email"
                v-model="curVendor.email"
                placeholder="Enter Email"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <p v-if="err.email" class="mt-2 text-sm text-red-600">
                {{ err.email }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input
                type="tel"
                v-model="curVendor.shopContactNo"
                placeholder="Enter Contact Number"
                maxlength="10"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.shopContactNo" class="mt-2 text-sm text-red-600">
                {{ err.shopContactNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Address Line 1</label>
              <input
                type="text"
                v-model="curVendor.shopAddress1"
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
                v-model="curVendor.shopAddress2"
                placeholder="Enter Address Line 2"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.shopAddress2" class="mt-2 text-sm text-red-600">
                {{ err.shopAddress2 }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">District</label>
              <serach_Input
                :arrItems="getDistinctDistricts"
                ref="refDistrict"
                label=""
                v-model="curVendor.district"
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
                v-model="curVendor.city"
                @selectItem="GetSelectCity"
              />
              <p v-if="err.city" class="mt-2 text-sm text-red-600">
                {{ err.city }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Description</label>
              <input
                type="text"
                v-model="curVendor.description"
                placeholder="Enter Description"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.description" class="mt-2 text-sm text-red-600">
                {{ err.description }}
              </p>
            </div> 
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <!--Vendor Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">Vendor Image</label>
              <div class="relative mt-2">
                <imagecomp
                  :existing_image_path="imageroot + curVendor.vendorImage"
                  @deleteExistingImage="curVendor.vendorImage = ''"
                  @GetSelectedImage="GetSelectedVendorImage"
                  ref="refVendorImage"
                />
              </div>
              <p v-if="err.vendorImage" class="mt-2 text-sm text-red-600">
                {{ err.vendorImage }}
              </p>
            </div>
            <!-- BR Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600">BR</label>
              <div class="relative mt-2">
                <imagecomp
                  :existing_image_path="imageroot + curVendor.brCopy"
                  @deleteExistingImage="curVendor.brCopy = ''"
                  @GetSelectedImage="GetSelectedBRCopy"
                  ref="refBRCopy"
                />
              </div>
              <p v-if="err.brCopy" class="mt-2 text-sm text-red-600">
                {{ err.brCopy }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Owner Information</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input
                type="text"
                v-model="curVendor.ownerName"
                placeholder="Enter Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.ownerName" class="mt-2 text-sm text-red-600">
                {{ err.ownerName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input
                type="text"
                v-model="curVendor.ownerContactNumber"
                :maxlength="10"
                placeholder="Enter Contact Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.ownerContactNumber" class="mt-2 text-sm text-red-600">
                {{ err.ownerContactNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input
                type="text"
                v-model="curVendor.ownerMobileNo"
                :maxlength="10"
                placeholder="Enter Mobile Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.ownerMobileNo" class="mt-2 text-sm text-red-600">
                {{ err.ownerMobileNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="text"
                v-model="curVendor.ownerEmailAddress"
                placeholder="Enter Email"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.ownerEmailAddress" class="mt-2 text-sm text-red-600">
                {{ err.ownerEmailAddress }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Contact Person </h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input
                type="text"
                v-model="curVendor.contactPersonName"
                placeholder="Enter Name"
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
                v-model="curVendor.designation"
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
                v-model="curVendor.personContactNumber"
                :maxlength="10"
                placeholder="Enter Contact Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.personContactNumber" class="mt-2 text-sm text-red-600">
                {{ err.personContactNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Mobile Number</label>
              <input
                type="text"
                v-model="curVendor.personMobileNo"
                :maxlength="10"
                placeholder="Enter Mobile Number"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.personMobileNo" class="mt-2 text-sm text-red-600">
                {{ err.personMobileNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="text"
                v-model="curVendor.personEmailAddress"
                placeholder="Enter Email"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.personEmailAddress" class="mt-2 text-sm text-red-600">
                {{ err.personEmailAddress }}
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <h3 class="mt-4 font-bold">Bank Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 mb-36 sm:grid-cols-2 md:grid-cols-3 sm:mb-0">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Name</label>
              <input
                type="text"
                v-model="curVendor.bankName"
                placeholder="Enter Bank Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.bankName" class="mt-2 text-sm text-red-600">
                {{ err.bankName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Branch</label>
              <input
                type="text"
                v-model="curVendor.branch"
                placeholder="Enter Bank Branch"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.branch" class="mt-2 text-sm text-red-600">
                {{ err.branch }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600">Bank Account No</label>
              <input
                type="text"
                v-model="curVendor.accountNumber"
                placeholder="Enter ank Account No"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.accountNumber" class="mt-2 text-sm text-red-600">
                {{ err.accountNumber }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Card Holder Name</label>
              <input
                type="text"
                v-model="curVendor.holderName"
                placeholder="Enter Card Colder Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.holderName" class="mt-2 text-sm text-red-600">
                {{ err.holderName }}
              </p>
            </div>
          </div>
        </div>
      </div>


      <!-- Modal Footer -->
      <!-- <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="handleSubmit" class="confirm-button">Save</button>
      </div> -->
     
      <div class="modal-footer">
        <button @click="cancel" class="cancel-button">Cancel</button>
        <button @click="GetSaveVendor" class="confirm-button">
          {{ isEditing ? "Update Vendor" : "Save Vendor" }}
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
      curVendor: {
        // Company Details
        companyName: "",
        email: "",
        phone: "",
        shopContactNo: "",
        shopAddress1: "",
        shopAddress2: "",
        district: "",
        city: "",
        description: "",
        brCopy: "",
        brCopyFile: null,

        // Owner Information
        ownerName: "",
        ownerMobileNo: "",
        ownerContactNumber: "",
        ownerEmailAddress: "",

        // Contact Person
        contactPersonName: "",
        designation: "",
        personMobileNo: "",
        personContactNumber: "",
        personEmailAddress: "",

        // Bank Details
        bankName: "",
        branch: "",
        accountNumber: "",
        holderName: "",
      },
      err: {},
      imageroot: "",
      showLoading: null,
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
    if (!this.curVendor.district) return [];  

    return this.vendorStore.initVendor.listDistrictCities
      .filter(city => city.districtId === this.curVendor.district)
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
    this.curVendor = this.vendorStore.curVendor;
    // console.log(JSON.stringify(this.curVendor, null, 2 ));
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
  },
  mounted() {
    this.$refs.refCity.initItem(this.curVendor.city);
    this.$refs.refDistrict.initItem(this.curVendor.district);
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
      this.curVendor.brCopyFile = image;
    },

    GetSaveVendor() {
      if (this.IsValidate()) {
        this.$showConfirm(
          "Are you sure you want to Save this Vendor?",
          "warning"
        ).then(async (result) => {
          if (result) {
            const formData = this.convertToFormData(this.curVendor);
            // Convert to plain object and log it
            const formDataObj = {};
            for (let [key, value] of formData.entries()) {
              formDataObj[key] = value;
            }
            console.log('Form Data as Object:', formDataObj);
            return
            await this.vendorStore.addEditVendor(formData, this.showLoading);
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
      if (!this.curVendor.companyName) {
        this.err.companyName = "Please Enter Company Name!";
        IsValidate = false;
      }

      if (!this.curVendor.email) {
        this.err.email = "Please Enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curVendor.email)) {
          this.err.email = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.phone) {
        this.err.phone = "Please Enter Phone Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.phone)) {
          this.err.phonev = "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

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

      // if (!this.curVendor.district) {
      //   this.err.district = "Please Enter District!";
      //   IsValidate = false;
      // }
      // if (!this.curVendor.city) {
      //   this.err.city = "Please Enter City!";
      //   IsValidate = false;
      // }


      if (!this.curVendor.description?.trim?.()) {
        this.err.description = "Please Enter Description!";
        IsValidate = false;
      }

      if (!this.curVendor.brCopy && !this.curVendor.brCopyFile) {
        this.err.brCopy = "Please upload a Shop BR!";
        IsValidate = false;
      }

      
      ///------------Owner Information validation--------------------//
      if (!this.curVendor.ownerName) {
        this.err.ownerName = "Please Enter Owner Name!";
        IsValidate = false;
      }

      if (!this.curVendor.ownerMobileNo) {
        this.err.ownerMobileNo = "Please Enter Owner Mobile Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.ownerMobileNo)) {
          this.err.ownerMobileNo = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }

     if (!this.curVendor.ownerContactNumber) {
        this.err.ownerContactNumber = "Please Enter Owner Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.ownerContactNumber)) {
          this.err.ownerContactNumber = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.ownerEmailAddress) {
        this.err.ownerEmailAddress = "Please Enter Owner Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curVendor.ownerEmailAddress)) {
          this.err.ownerEmailAddress = "Please Enter a valid Email address!";
          IsValidate = false;
        }
      }


      ///------------Person Information validation------------------//
      if (!this.curVendor.contactPersonName) {
        this.err.contactPersonName = "Please Enter Person Name!";
        IsValidate = false;
      }
      if (!this.curVendor.designation) {
        this.err.designation = "Please Enter Person Designation!";
        IsValidate = false;
      }

      if (!this.curVendor.personMobileNo) {
        this.err.personMobileNo = "Please Enter Person Mobile Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.personMobileNo)) {
          this.err.personMobileNo = "Please Enter a valid 10-digit Mobile Number!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.personContactNumber) {
        this.err.personContactNumber = "Please Enter Person Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.personContactNumber)) {
          this.err.personContactNumber = "Please Enter a valid 10-digit Contact Number!";
          IsValidate = false;
        }
      }

      if (!this.curVendor.personEmailAddress) {
        this.err.personEmailAddress = "Please Enter Person Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curVendor.personEmailAddress)) {
          this.err.personEmailAddress = "Please Enter a valid Email address!";
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

    GetSelectCity(id) {
      this.curVendor.city = id;
    },
    GetSelectDistrict(id){
      
      this.curVendor.district = id;
      //alert(this.curVendor.district )
    },

    convertToFormData(formObject) {
      const formData = new FormData();
      formData.append("Id", this.curVendor.id);
      formData.append("Phone", this.curVendor.phone);
      formData.append("Email", this.curVendor.email);
      formData.append("companyName", this.curVendor.companyName);
      formData.append("ShopContactNo", this.curVendor.shopContactNo);
      formData.append("ShopAddress1", this.curVendor.shopAddress1);
      formData.append("ShopAddress2", this.curVendor.shopAddress2);
      formData.append("District", this.curVendor.district);
      formData.append("City", this.curVendor.city);
      formData.append("VendorImageFile", this.curVendor.vendorImageFile);
      formData.append("BRCopyFile", this.curVendor.brCopyFile);

      // Contact Person
      formData.append("contactPersonName", this.curVendor.contactPersonName);
      formData.append("designation", this.curVendor.designation);
      formData.append("personMobileNo", this.curVendor.personMobileNo);
      formData.append("personContactNumber", this.curVendor.personContactNumber);
      formData.append("personEmailAddress", this.curVendor.personEmailAddress);

      // Owner dETAILS
      formData.append("ownerName", this.curVendor.ownerName);
      formData.append("ownerMobileNo", this.curVendor.ownerMobileNo);
      formData.append("ownerContactNumber", this.curVendor.ownerContactNumber);
      formData.append("ownerEmailAddress", this.curVendor.ownerEmailAddress);

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