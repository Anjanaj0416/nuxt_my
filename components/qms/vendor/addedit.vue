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

          <h3 class="font-bold">Company Details</h3>
          <!-- Vendor Image -->

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
              <label class="block text-sm font-bold text-gray-600"
                >Company Name</label
              >
              <input
                type="text"
                v-model="curVendor.shopName"
                placeholder="Enter Shop Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.ShopName" class="mt-2 text-sm text-red-600">
                {{ err.ShopName }}
              </p>
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >First Name</label
              >
              <input
                type="text"
                v-model="curVendor.firstName"
                placeholder="Enter First Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.firstName" class="mt-2 text-sm text-red-600">
                {{ err.firstName }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Last Name</label
              >
              <input
                type="text"
                v-model="curVendor.lastName"
                placeholder="Enter Last Name"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.lastName" class="mt-2 text-sm text-red-600">
                {{ err.lastName }}
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
              <label class="block text-sm font-bold text-gray-600"
                >Contact Number</label
              >
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
              <label class="block text-sm font-bold text-gray-600"
                >Address Line 1</label
              >
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
              <label class="block text-sm font-bold text-gray-600"
                >Address Line 2</label
              >
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
              <label class="block text-sm font-bold text-gray-600"
                >VAT Number</label
              >
              <input
                type="text"
                v-model="curVendor.vatNo"
                placeholder="Enter VATNo"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p v-if="err.vatNo" class="mt-2 text-sm text-red-600">
                {{ err.vatNo }}
              </p>
            </div>

            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Description</label
              >
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

            <!--Vendor Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >Vendor Image</label
              >
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

            <!-- Shop Logo -->
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >Shop Logo</label
              >
              <div class="relative mt-2">
                <imagecomp
                  :existing_image_path="imageroot + curVendor.shopLogo"
                  @deleteExistingImage="curVendor.shopLogo = ''"
                  @GetSelectedImage="GetSelectedShopImage"
                  ref="refShopLogo"
                />
              </div>
              <p v-if="err.shopLogo" class="mt-2 text-sm text-red-600">
                {{ err.shopLogo }}
              </p>
            </div>

            <!-- Shop Cover Image -->
            <div>
              <label class="block text-sm font-bold text-gray-600"
                >Shop Cover Image</label
              >
              <div class="relative mt-2">
                <imagecomp
                  :existing_image_path="imageroot + curVendor.shopCoverImage"
                  @deleteExistingImage="curVendor.shopCoverImage = ''"
                  @GetSelectedImage="GetSelectedShopCoverImage"
                  ref="refShopCoverImage"
                />
              </div>
              <p v-if="err.shopCoverImage" class="mt-2 text-sm text-red-600">
                {{ err.shopCoverImage }}
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
          <h3 class="mt-4 font-bold">Bank Details</h3>
          <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            <div class="">
              <label class="block text-sm font-bold text-gray-600"
                >Bank Name</label
              >
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
              <label class="block text-sm font-bold text-gray-600"
                >Bank Branch</label
              >
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
              <label class="block text-sm font-bold text-gray-600"
                >Bank Account No</label
              >
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
              <label class="block text-sm font-bold text-gray-600"
                >Card Holder Name</label
              >
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
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Status</label>

              <toggleoption v-model="curVendor.isActive" />
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
      curVendor: {},
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

      if (!this.curVendor.firstName) {
        this.err.firstName = "Please enter First Name!";
        IsValidate = false;
      }

      if (!this.curVendor.lastName) {
        this.err.lastName = "Please enter Last Name!";
        IsValidate = false;
      }
      // if (!this.curVendor.vendorImage) {
      //   this.err.vendorImage = "Please enter Image!";
      //   IsValidate = false;
      // }
      if (!this.curVendor.email) {
        this.err.email = "Please enter an Email!";
        IsValidate = false;
      } else {
        const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!EmailRegex.test(this.curVendor.email)) {
          this.err.email = "Please enter a valid Email address!";
          IsValidate = false;
        }
      }
      if (!this.curVendor.shopName) {
        this.err.shopName = "Please enter Company Name!";
        IsValidate = false;
      }
      if (!this.curVendor.shopContactNo) {
        this.err.shopContactNo = "Please enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.curVendor.shopContactNo)) {
          this.err.shopContactNo =
            "Please enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }
      if (!this.curVendor.shopAddress1) {
        this.err.shopAddress1 = "Please enter Address1!";
        IsValidate = false;
      }
      if (!this.curVendor.city) {
        this.err.city = "Please enter City!";
        IsValidate = false;
      }
      if (!this.curVendor.phone) {
        this.err.phone = "Please enter Phone Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curVendor.phone)) {
          this.err.phonev = "Please enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }
      if (!this.curVendor.vatNo?.trim?.()) {
        this.err.vatNo = "Please enter VATNo!";
        IsValidate = false;
      }
      if (!this.curVendor.description?.trim?.()) {
        this.err.description = "Please enter Description!";
        IsValidate = false;
      }

      // Simple validation: Company name must not be empty
      if (!this.curVendor.bankName) {
        this.err.bankName = "Please enter Bank Name!";
        IsValidate = false;
      }
      if (!this.curVendor.branch) {
        this.err.Branch = "Please enter Branch!";
        IsValidate = false;
      }
      if (!this.curVendor.holderName) {
        this.err.holderName = "Please enter Account Holder Name!";
        IsValidate = false;
      }
      if (!this.curVendor.accountNumber) {
        this.err.accountNumber = "Please enter Account Number!";
        IsValidate = false;
      }

      // Validation for images (check if images are uploaded)
      // if (!this.curVendor.vendorImage) {
      //   this.err.vendorImage = "Please upload a Vendor Image!";
      //   IsValidate = false;
      // }
      // console.log(this.curVendor.shopLogo)
      // if (!this.curVendor.shopLogo) {
      //   this.err.shopLogo = "Please upload a Shop Logo!";
      //   IsValidate = false;
      // }
      // if (!this.curVendor.shopCoverImage) {
      //   this.err.shopCoverImage = "Please upload a Shop Cover Image!";
      //   IsValidate = false;
      // }
      //console.log(this.curVendor.brCopyFile);

      if (this.curVendor.brCopy == "" && !this.curVendor.brCopyFile?.trim?.()) {
        this.err.brCopy = "Please upload a Shop BR!";
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
      formData.append("FirstName", this.curVendor.firstName);
      formData.append("LastName", this.curVendor.lastName);
      formData.append("Phone", this.curVendor.phone);
      formData.append("Email", this.curVendor.email);
      formData.append("ShopName", this.curVendor.shopName);
      formData.append("ShopContactNo", this.curVendor.shopContactNo);
      formData.append("ShopAddress1", this.curVendor.shopAddress1);
      formData.append("ShopAddress2", this.curVendor.shopAddress2);
      formData.append("District", this.curVendor.district);
      formData.append("City", this.curVendor.city);

      formData.append("VendorImageFile", this.curVendor.vendorImageFile);
      formData.append("ShopLogoFile", this.curVendor.shopLogoFile);
      formData.append("ShopCoverImageFile", this.curVendor.shopCoverImageFile);
      formData.append("BRCopyFile", this.curVendor.brCopyFile);

      formData.append("Description", this.curVendor.description);
      formData.append("VATNo", this.curVendor.vatNo);

      formData.append("BankName", this.curVendor.bankName);
      formData.append("Branch", this.curVendor.branch);
      formData.append("HolderName", this.curVendor.holderName);
      formData.append("AccountNumber", this.curVendor.accountNumber);
      formData.append("IsActive", this.curVendor.isActive);
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