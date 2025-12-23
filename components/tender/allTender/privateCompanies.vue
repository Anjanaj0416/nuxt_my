<template>
    <section>
        <div class="p-6 space-y-6 overflow-y">
            <h2 class="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Private Companies</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-600">Select Category</label>
                     <serach_Input
                    
                     />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Location ( Province )</label>
                    <select
                        class="w-full p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-purple-400"
                        >
                        <option disabled value="">Select Status</option>
                        <option value="1">Main Category</option>
                        <option value="2">Sub Category</option>
                        <option value="3">Sub Sub Category</option>
                        <option value="4">Sub Sub Sub Category</option>
                    </select>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Tender Title</label>
                        <textarea
                            v-model="tenderTitle"
                            rows="3"
                            type="text"
                            class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter Title"
                        />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Description</label>
                        <textarea
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
                    <label class="block text-sm font-medium text-gray-600 mb-2">Published on</label>
                    <input
                        type="date"
                        class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-400"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2">Closed on</label>
                    <input
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

      CategoryPath:"",
      TaskHubId: "",
      listFiles:"",
      dtlJobCategory: "",
      Comment:"",
      StoreUrl: "",
      StoreQRUrl:"",
      StoreUsername: "",
      StorePassword: "",
      StoreMapedDomainUrl:"",
      err: {
        StoreUrl: "",
        StoreUsername: "",
        StorePassword: "",
      },
      
    };
  },

  async created() {
    this.userStore = useUserStore();



  },

  mounted() {

  },

  methods: {

    async SetSelectedFilter(event) {
      this.searchBy = event.target.value;
      // await this.GetSearch();
    },

    //Approve
    async CreateTender() {
   
      this.$showConfirm("Are you sure you want to approve this banner?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {

            const formData = new FormData();
            formData.append("TaskType", this.taskType);
            formData.append("WGRequestCategory", "NewCategoryRequest");
            const dataObj = {
              taskHubId: this.taskHubId,
              comment: this.comment || ""
            };
            formData.append("Data", JSON.stringify(dataObj));
            if (this.listFiles && this.listFiles.length > 0) {
              this.listFiles.forEach((file, index) => {
                formData.append("listFiles", file);
              });
            }

            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }

            await this.taskhubStore.SetPassToOtherWorkGroup(formData, this.showLoading);

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
