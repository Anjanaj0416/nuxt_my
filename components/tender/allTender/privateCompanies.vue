<template>
    <section>
        <div class="p-6 space-y-6 overflow-y">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Private Companies</h2>
              <categorySearch @updatecategorypaths="handleCategoryPaths" />
              
                <p v-if="err.addCategory" class="mt-1 text-sm text-red-600">
                  {{ err.Categories }}
                </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div v-if="selectedCategories.length" class="flex flex-wrap gap-2 mt-2">
                  <span
                    v-for="(cat, index) in selectedCategories"
                    :key="cat.id"
                    class="inline-flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                  >
                    {{ cat.value }}

                    <button
                      @click="removeCategory(index)"
                      class="text-blue-500 hover:text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </span>
                </div>
              </div>


              <!-- District -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-2">
                  Location ( Province )
                </label>
                <select
                  v-model="DistrictId"
                  class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
                  @input="clearErrorOnInput('DistrictId')"
                >
                  <option disabled value="">Select District</option>
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
            </div>


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
                    v-model="TenderSource"
                    class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
                    @input="clearErrorOnInput('TenderSource')"
                  >
                    <option disabled value="">Select Tender Source</option>
                    <option
                      v-for="district in tenderStore.listTenderSource"
                      :key="district.id"
                      :value="district.id"
                    >
                      {{ district.value }}
                    </option>
                  </select>
                  <p v-if="err.TenderSource" class="mt-2 text-sm text-red-600">
                    {{ err.TenderSource }}
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
import serach_Input from "~/components/customcontrol/SearchInput";
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
      TenderSource: "",
      Title: "",
      TenderDetails: "",
      PublishedOn: "",
      ClosedOn: "",
      selectedCategories: [],
      categoryIds: [],
      listFiles: [],
      err: {
        DistrictId: "",
        TenderSource: "",
        Categories: "",
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
    async SetSelectedFilter(event) {
      this.searchBy = event.target.value;
      // await this.GetSearch();
    },
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

    removeCategory(index) {
      this.selectedCategories.splice(index, 1);
      this.categoryIds.splice(index, 1);
    },

    handleCategoryPaths(paths) {
      console.log(paths);
      // paths = array of category objects (as you wanted)
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
            formData.append("TenderSourceId", this.TenderSource);
            formData.append("Title", this.Title || "");
            formData.append("TenderDetails", this.TenderDetails || "");
            formData.append("PublishedOn", this.PublishedOn);
            formData.append("ClosedOn", this.ClosedOn || "");

            this.categoryIds.forEach((id, index) => {
              formData.append(`listTenderCategory[${index}]`, id);
            });
            
            if (this.listFiles && this.listFiles.length > 0) {
              this.listFiles.forEach((file, index) => {
                formData.append("listFiles", file);
              });
            }

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }

            await this.tenderStore.AddTender(formData, this.showLoading);

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
      let valid = true;

      if (!this.addCategory.length) {
        this.err.Categories = "Please select at least one category";
        valid = false;
      }

      if (!this.DistrictId) {
        this.err.DistrictId = "Please select district";
        valid = false;
      }

      if (!this.TenderSource) {
        this.err.TenderSource = "Please select tender source";
        valid = false;
      }

      if (!this.Title.trim()) {
        this.err.Title = "Title is required";
        valid = false;
      }

      if (!this.TenderDetails.trim()) {
        this.err.TenderDetails = "Description is required";
        valid = false;
      }

      if (!this.PublishedOn) {
        this.err.PublishedOn = "Please select published date";
        valid = false;
      }

      if (!this.ClosedOn) {
        this.err.ClosedOn = "Please select closed date";
        valid = false;
      }

      if (this.PublishedOn && this.ClosedOn && this.ClosedOn < this.PublishedOn) {
        this.err.ClosedOn = "Closed date must be after published date";
        valid = false;
      }

      if (!this.listFiles || !this.listFiles.length) {
        this.err.listFiles = "Please upload at least one attachment";
        valid = false;
      }

      return valid;
    },


    clearErr() {
      Object.keys(this.err).forEach((key) => {
        this.err[key] = "";
      });
    },


  },
  
};
</script>
