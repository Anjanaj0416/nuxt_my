<template>
    <section>
        <div class="p-6 space-y-6 overflow-y">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Supplier Registration</h2>
              <categorySearch @updatecategorypaths="handleCategoryPaths" />
              <p v-if="err.selectedCategories" class="mt-2 text-sm text-red-600">
                {{ err.selectedCategories }}
              </p>


            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-2">Tender Title</label>
                    <textarea
                      v-model="Title"
                      rows="3"
                      type="text"
                      class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter Title"
                      @input="clearErrorOnInput('Title')"
                    />
                  <p v-if="err.Title" class="mt-2 text-sm text-red-600">
                    {{ err.Title }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-2">Description</label>
                    <textarea
                      v-model="TenderDetails"
                      rows="3"
                      type="text"
                      class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter Description"
                      @input="clearErrorOnInput('TenderDetails')"
                    />
                  <p v-if="err.TenderDetails" class="mt-2 text-sm text-red-600">
                  {{ err.TenderDetails }}
                  </p>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Attachment</label>
                    <imagepickermultiple
                        @GetSelectedImages="handleSelectedImages"
                        ref="refApprovedImg"
                        accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                        @input="clearErrorOnInput('listFiles')"
                    />
                    <p v-if="err.listFiles" class="mt-2 text-sm text-red-600">
                      {{ err.listFiles }}
                    </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-2">
                    Tender Source 
                  </label>
                  <select
                    v-model="TenderSourceId"
                    class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
                    @input="clearErrorOnInput('TenderSourceId')"
                  >
                    <option disabled value="">Select Tender Source</option>
                    <option
                      v-for="source in tenderStore.listTenderSource"
                      :key="source.id"
                      :value="source.id"
                    >
                      {{ source.value }}
                    </option>
                  </select>
                  <p v-if="err.TenderSourceId" class="mt-2 text-sm text-red-600">
                    {{ err.TenderSourceId }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-2">
                    District
                  </label>
                  <select
                    v-model="DistrictId"
                    class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
                    @input="clearErrorOnInput('DistrictId')"
                  >
                    <option disabled value="">Select Tender District</option>
                    <option
                      v-for="district in tenderStore.listDistrict"
                      :key="district.id"
                      :value="district.id"
                    >
                      {{ district.value }}
                    </option>
                  </select>
                  <p v-if="err.DistrictId" class="mt-2 text-sm text-red-600">
                    {{ err.DistrictId }}
                  </p>

                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Published on</label>
                    <input
                      v-model="PublishedOn"
                      type="date"
                      class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                      @input="clearErrorOnInput('PublishedOn')"
                    />
                    <p v-if="err.PublishedOn" class="mt-2 text-sm text-red-600">
                      {{ err.PublishedOn }}
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Closed on</label>
                    <input
                      v-model="ClosedOn"
                      type="date"
                      class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                      @input="clearErrorOnInput('ClosedOn')"
                    />
                    <p v-if="err.ClosedOn" class="mt-2 text-sm text-red-600">
                      {{ err.ClosedOn }}
                    </p>
                </div>
            </div>

        </div>
        <div class=" modal-footer">
            <button   @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
            <button @click="CreateTender()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                    font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
                Create
            </button>
        </div>
    </section>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useTenderStore } from "~/stores/modules/tender/tenderStore";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";
import categorySearch from "~/components/customcontrol/categorySearch.vue";

definePageMeta({
layout: 'tenderb2b',   
// middleware: 'auth',
});

export default {
    components:{imagepickermultiple,categorySearch},
    props:['taskType','jobCategory', 'taskHubId'],

  data() {
    return {
      isaAssig: false,
      isShowWF: false,
      expandedRow: null, 
      DistrictId: "",
      TenderSourceId: "",
      Title: "",
      TenderDetails: "",
      PublishedOn: "",
      ClosedOn: "",
      selectedCategories: [],
      categoryIds: [],
      listFiles: [],
      err: {
         DistrictId: "",
        TenderSourceId: "",
        selectedCategories: "",
        Title: "",
        TenderDetails: "",
        PublishedOn: "",
        ClosedOn: "",
        listFiles: "",
      },
      
    };
  },

  async created() {
    this.showLoading = this.$showLoading;
    this.userStore = useUserStore();
    this.tenderStore = useTenderStore();

    await this.tenderStore.loadInitTender(this.showLoading);
  },

  mounted() {},

  methods: {

    handleSelectedImages(files) {
      console.log("Selected Files in Parent:", files);
      this.listFiles = files;
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

    handleCategoryPaths(paths) {
      this.selectedCategories = paths.map(p => ({
        MainCategory: {
          id: p.MainCategory.id ?? p.MainCategory.Id,
          value: p.MainCategory.value,
        },
        SubCategory: {
          id: p.SubCategory.id ?? p.SubCategory.Id,
          value: p.SubCategory.value,
        },
        SubSubCategory: {
          id: p.SubSubCategory.id ?? p.SubSubCategory.Id,
          value: p.SubSubCategory.value,
        },
        SubSubSubCategory: {
          id: p.SubSubSubCategory.id ?? p.SubSubSubCategory.Id,
          value: p.SubSubSubCategory.value,
        },
      }));

      this.err.selectedCategories = "";
    },


    //CreateTender
     async CreateTender() {
       if (!this.IsValidate()) return;
      this.$showConfirm("Are you sure you want publish this tender?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();

            formData.append("TenderTypeId", "100");
            formData.append("DistrictId", this.DistrictId);
            formData.append("TenderSourceId", this.TenderSourceId);
            formData.append("Title", this.Title || "");
            formData.append("TenderDetails", this.TenderDetails || "");
            formData.append("PublishedOn", this.PublishedOn);
            formData.append("ClosedOn", this.ClosedOn || "");
            this.selectedCategories.forEach((cat, index) => {
              formData.append(`listTenderCategory[${index}].MainCategory.Id`, cat.MainCategory.id);
              formData.append(`listTenderCategory[${index}].MainCategory.Value`, cat.MainCategory.value);

              formData.append(`listTenderCategory[${index}].SubCategory.Id`, cat.SubCategory.id);
              formData.append(`listTenderCategory[${index}].SubCategory.Value`, cat.SubCategory.value);

              formData.append(`listTenderCategory[${index}].SubSubCategory.Id`, cat.SubSubCategory.id);
              formData.append(`listTenderCategory[${index}].SubSubCategory.Value`, cat.SubSubCategory.value);

              formData.append(`listTenderCategory[${index}].SubSubSubCategory.Id`, cat.SubSubSubCategory.id);
              formData.append(`listTenderCategory[${index}].SubSubSubCategory.Value`, cat.SubSubSubCategory.value);
            });
            if (this.listFiles && this.listFiles.length > 0) {
              this.listFiles.forEach((file, index) => {
                formData.append("listFiles", file);
              });
            }

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }

           await this.tenderStore.AddTender(formData,this.showLoading)
  

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

      if (!this.selectedCategories || !this.selectedCategories.length) {
        this.err.selectedCategories = "Please select at least one category";
        IsValidate = false;
      }

      if (!this.DistrictId) {
        this.err.DistrictId = "Please select district";
        IsValidate = false;
      }

      if (!this.TenderSourceId) {
        this.err.TenderSourceId = "Please select tender source";
        IsValidate = false;
      }

      if (!this.Title){
        this.err.Title = "Please enter Title ";
        IsValidate = false;
      }

      if (!this.TenderDetails) {
        this.err.TenderDetails = "Please enter Description";
        IsValidate = false;
      }

      if (!this.PublishedOn) {
        this.err.PublishedOn = "Please select published date";
        IsValidate = false;
      }

      if (!this.ClosedOn) {
        this.err.ClosedOn = "Please select closed date";
        IsValidate = false;
      }

      if (!this.listFiles || !this.listFiles.length) {
        this.err.listFiles = "Please upload at least one attachment";
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