<template>
    <section>
        <div class="p-6 space-y-6 overflow-y">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Private Companies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Category -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Select Categories
                </label>

                <serach_Input
                  :arrItems="tenderStore.listTenderCategory"
                  ref="refCategory"
                  @selectItem="addCategory"
                />

                <!-- Selected Category Badges -->
                <div v-if="selectedCategories.length" class="flex flex-wrap gap-2 mt-2">
                  <span
                    v-for="(cat, index) in selectedCategories"
                    :key="cat.id"
                    class="inline-flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full"
                  >
                    {{ cat.value }}

                    <button
                      @click="removeCategory(index)"
                      class="text-purple-500 hover:text-red-500 font-bold"
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
                  class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-purple-400"
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
              </div>
            </div>


            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Tender Title</label>
                        <textarea
                            v-model="Title"
                            rows="3"
                            type="text"
                            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter Title"
                        />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Description</label>
                        <textarea
                            v-model="TenderDetails"
                            rows="3"
                            type="text"
                            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter Description"
                        />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Attachment</label>
                    <imagepickermultiple
                        @GetSelectedImages="handleSelectedImages"
                        ref="refApprovedImg"
                        accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                    />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-600 mb-2">
                    Tender Source 
                  </label>
                  <select
                    v-model="TenderSource"
                    class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-purple-400"
                  >
                    <option disabled value="">Select District</option>
                    <option
                      v-for="district in tenderStore.listTenderSource"
                      :key="district.id"
                      :value="district.id"
                    >
                      {{ district.value }}
                    </option>
                  </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Published on</label>
                    <input
                        v-model="PublishedOn"
                        type="date"
                        class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-400"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Closed on</label>
                    <input
                        v-model="ClosedOn"
                        type="date"
                        class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-400"
                    />
                </div>
            </div>

        </div>
        <div class=" modal-footer">
            <button   @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
            <button @click="CreateTender()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
                    font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-purple-400">
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


definePageMeta({
layout: 'tenderb2b',   
// middleware: 'auth',
});

export default {
    components:{imagepickermultiple,serach_Input},
    props:['taskType','jobCategory', 'taskHubId'],

  data() {
    return {
      isaAssig: false,
      isShowWF: false,
      expandedRow: null, 
        DistrictId: "",
        TenderSourceId:"",
        Title:"",
        TenderDetails:"",

        selectedCategories: [],   
        categoryIds: [], 
        listFiles:"",
    
      err: {
        StoreUrl: "",
        StoreUsername: "",
        StorePassword: "",
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
    addCategory(item) {
      // prevent duplicate selection
      const exists = this.selectedCategories.some(cat => cat.id === item.id);
      if (exists) return;

      this.selectedCategories.push(item);
      this.categoryIds.push(item.id);

      // optional: close dropdown
      this.$refs.refCategory?.close?.();
    },

    removeCategory(index) {
      this.selectedCategories.splice(index, 1);
      this.categoryIds.splice(index, 1);
    },

    //Approve
    async CreateTender() {
   
      this.$showConfirm("Are you sure you want to approve this banner?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();
            formData.append("TenderType", "100");
            formData.append(
              "TenderCategories",
              JSON.stringify(
                this.selectedCategories.map(cat => ({
                  categoryId: cat.id,
                }))
              )
            );;
            formData.append("DistrictId", this.DistrictId);
            formData.append("TenderSource", this.TenderSource);
            formData.append("Title", this.Title || "");
            formData.append("TenderDetails", this.TenderDetails || "");
            
            formData.append("PublishedOn", this.PublishedOn);
            formData.append("ClosedOn", this.ClosedOn || "");
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


     IsValidate() {
      this.clearErr();
      let valid = true;

      if (!this.listFiles) {
        this.err.listFiles = "Please enter Store Url!";
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
