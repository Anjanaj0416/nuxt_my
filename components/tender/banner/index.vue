<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
        <!-- Modal Header -->
        <div class="modal-header">
        <h2 class="modal-title">Add Tender Banner</h2>
        <closebtn @close="closeModal" />
        </div>

        <div class="modal-content">
            <div class="form-content">

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-2">
                            Banner Section
                        </label>
                        <select
                            v-model="BannerSection"
                            class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
                            @input="clearErrorOnInput('BannerSection')"
                        >
                            <option disabled value="">Select Type</option>
                            <option
                            v-for="type in tenderStore.listBannerSection"
                            :key="type"
                            :value="type"
                            >
                            {{ type }}
                            </option>
                        </select>
                        <p v-if="err.BannerSection" class="mt-2 text-xs text-red-600">
                            {{ err.BannerSection }}
                        </p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-2">Sort Order</label>
                            <input
                            v-model="SortOrder"
                            type="text"
                            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                            placeholder="Sort Order"
                            @input="clearErrorOnInput('SortOrder')"
                            />
                        <p v-if="err.SortOrder" class="mt-2 text-xs text-red-600">
                            {{ err.SortOrder }}
                        </p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-600 mb-2">Expire Date</label>
                            <input
                            v-model="ExpireDate"
                            type="date"
                            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Expire Date"
                            @input="clearErrorOnInput('ExpireDate')"
                            />
                        <p v-if="err.ExpireDate" class="mt-2 text-xs text-red-600">
                            {{ err.ExpireDate }}
                        </p>
                    </div>
                </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <!-- PC Banner -->
                <div class="border border-dashed rounded-xl p-5 ">
                  <div class="flex items-center justify-between mb-3">
                    <label class="lock text-sm font-medium text-gray-600">
                      🖥️ Desktop Banner Image
                    </label>
                    <span class="text-[11px] px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                      2000 × 900
                    </span>
                  </div>

                  <p class="text-xs text-gray-500 mb-3">
                    Wide banner for desktop & large screens
                  </p>

                  <imagepickermultiple
                    @GetSelectedImages="handleSelectedImages"
                    ref="refPcBanner"
                    accept="image/*"
                    @input="clearErrorOnInput('listFiles')"
                  />

                  <p v-if="err.listFiles" class="mt-2 text-xs text-red-600">
                    {{ err.listFiles }}
                  </p>
                </div>
                                <!-- Mobile Banner -->
                <div class="border border-dashed rounded-xl p-5 ">
                  <div class="flex items-center justify-between mb-3">
                    <label class="lock text-sm font-medium text-gray-600">
                      📱 Mobile Banner Image
                    </label>
                    <span class="text-[11px] px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                      1080 × 1080 px
                    </span>
                  </div>

                  <p class="text-xs text-gray-500 mb-3">
                    Recommended square image for mobile display
                  </p>

                  <imagepickermultiple
                    @GetSelectedImages="handleSelectedImagesMobile"
                    ref="refMobileBanner"
                    accept="image/*"
                    @input="clearErrorOnInput('mobileBannerFiles')"
                  />

                  <p v-if="err.mobileBannerFiles" class="mt-2 text-xs text-red-600">
                    {{ err.mobileBannerFiles }}
                  </p>
                </div>


              </div>


            </div>
        </div>
        <div class=" modal-footer">
            <button   @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
            <button @click="CreateTenderBanner()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                    font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
                Create
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import closebtn from "~/components/customcontrol/modal_close_button";
import { useUserStore } from "~/stores/modules/userStore";
import { useTenderStore } from "~/stores/modules/tender/tenderStore";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";
import categorySearch from "~/components/customcontrol/categorySearch.vue";

export default {
  components: { closebtn,imagepickermultiple,categorySearch },
  props: ["id", "vendorId"],
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      BannerAppName:"",
      BannerSection: "",
      SortOrder: "",
      ExpireDate: "",
      listFiles: [],
      mobileBannerFiles:[],
      err: { 
        BannerAppName:"",
        BannerSection: "",
        SortOrder: "",
        ExpireDate: "",
        listFiles: "",
      },
    };
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.userStore = useUserStore();
    this.tenderStore = useTenderStore();
    this.branchCode = this.userStore.loggedUser.branchCode;   

    await this.tenderStore.loadInitTenderBanner(this.branchCode,this.showLoading);
  },
  computed: {},
  methods: {
    // handleSelectedImages(files) {
    //   console.log("Selected Files in Parent:", files);
    //   this.listFiles = files;
    // },

    handleSelectedImages(files) {
      this.listFiles = files;
    },

    handleSelectedImagesMobile(files) {
      this.mobileBannerFiles = files;
    },

    updateCategoryPath(newPath) {
      this.newPath = newPath
    },
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },
    cancel() {
      this.clearErr();
      this.closeModal();
    },


    //CreateTenderBnner
    async CreateTenderBanner() {
       if (!this.IsValidate()) return;
      this.$showConfirm("Are you sure you want publish this tender?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();

            formData.append("BannerAppName", "Tender");
            formData.append("BannerSection", this.BannerSection);
            formData.append("SortOrder", this.SortOrder);
            formData.append("ExpireDate", this.ExpireDate || "");
            if (this.listFiles && this.listFiles.length > 0) {
              this.listFiles.forEach((file, index) => {
                formData.append("FileDesktopBanner", file);
              });
            }
            if (this.mobileBannerFiles && this.mobileBannerFiles.length > 0) {
              this.mobileBannerFiles.forEach((file, index) => {
                formData.append("FileMobileBanner", file);
              });
            }

            // const formDataObject = {};
            // for (let [key, value] of formData.entries()) {
            //   if (formDataObject[key]) {
            //     if (!Array.isArray(formDataObject[key])) {
            //       formDataObject[key] = [formDataObject[key]];
            //     }
            //     formDataObject[key].push(value);
            //   } else {
            //     formDataObject[key] = value;
            //   }
            // }
            // console.log("FormData as Object:", formDataObject);
            await this.tenderStore.AddTenderBanner(formData,this.showLoading)

            this.closeModal();
            this.clearErr();

          }
        });
    },

    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
    },

    IsValidate() {
      this.clearErr();
      let IsValidate = true;

      if (!this.BannerSection) {
        this.err.BannerSection = "Please select banner section";
        IsValidate = false;
      }

      if (!this.SortOrder) {
        this.err.SortOrder = "Please enter sort order";
        IsValidate = false;
      }

      if (!this.ExpireDate) {
        this.err.ExpireDate = "Please select expire date";
        IsValidate = false;
      }

      if (!this.listFiles || !this.listFiles.length) {
        this.err.listFiles = "Please upload at mobile banner";
        IsValidate = false;
      }

      if (!this.mobileBannerFiles  || !this.mobileBannerFiles .length) {
        this.err.mobileBannerFiles  = "Please upload at mobile banner";
        IsValidate = false;
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
