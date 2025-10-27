<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          Create KPI
        </h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
            <ul
                class="flex flex-col sm:flex-row items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                <li
                    v-for="(option, idx) in options"
                    :key="idx"
                    class="w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r last:border-r-0 border-gray-200"
                >
                    <label
                    class="flex items-center justify-center cursor-pointer p-3 hover:bg-blue-50 transition-colors"
                    :class="selectedOption === option.value ? 'bg-blue-100 text-blue-800 font-semibold' : 'text-gray-900'"
                    >
                    <input
                        type="radio"
                        class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        :value="option.value"
                        v-model="selectedOption"
                        @input="clearErrorOnInput('job')"
                    />
                    <span class="ms-2">{{ option.label }}</span>
                    </label>
                </li>
            </ul>
            <p v-if="err.job" class="mt-2 text-sm text-red-600">
                {{ err.job }}
            </p>
            <div v-if=" selectedOption !== ''" class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-2">
                <div class="">
                    <label class="text-[13px] font-semibold text-gray-600">
                        Company Search <span class="text-red-500">*</span>
                    </label>
                    <serach_Input
                        :arrItems="leadStore.InitLeads.listClients"
                        label=""
                        v-model="listClients"
                        @selectItem="onClientSelected"
                    />  
                </div>
            </div>
            <div v-if="selectedClient && selectedOption !== ''"  class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                <div>
                    <h1 class="text-[13px] font-semibold text-gray-600">Company Name</h1>
                    <p v-if="selectedClient?.value" class="text-sm text-gray-500 mt-0.5">{{ selectedClient?.value || 'None' }}</p>
                    <input
                        v-else
                        type="text"
                        placeholder="Enter Link"
                        class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                     />
                </div>
                <div>
                    <h1 class="text-[13px] font-semibold text-gray-600">Company Address</h1>
                    <p v-if="selectedClient?.value" class="text-sm text-gray-500 mt-0.5">{{ selectedClient?.value || 'None' }}</p>
                    <input
                        v-else
                        type="text"
                        placeholder="Enter Link"
                        class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                     />
                </div>
                <div>
                    <h1 class="text-[13px] font-semibold text-gray-600">Contact Person Number</h1>
                    <p v-if="selectedClient?.value" class="text-sm text-gray-500 mt-0.5">{{ selectedClient?.value || 'None' }}</p>
                    <input
                        v-else
                        type="text"
                        placeholder="Enter Link"
                        class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                     />
                </div>
                <div>
                    <h1 class="text-[13px] font-semibold text-gray-600">Contact Number</h1>
                    <p v-if="selectedClient?.value" class="text-sm text-gray-500 mt-0.5">{{ selectedClient?.value || 'None' }}</p>
                    <input
                        v-else
                        type="text"
                        placeholder="Enter Link"
                        class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                     />
                </div>
                <div>
                    <h1 class="text-[13px] font-semibold text-gray-600">Email</h1>
                    <p v-if="selectedClient?.id" class="text-sm text-gray-500 mt-0.5">{{ selectedClient?.id || 'None' }}</p>
                    <input
                        v-else
                        type="text"
                        placeholder="Enter Link"
                        class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                     />
                </div>
                <div>
                    <h1 class="text-[13px] font-semibold text-gray-600">Company Web Address</h1>
                    <p v-if="selectedClient?.web"  class="text-sm text-gray-500 mt-0.5">   {{ selectedClient.web }}</p>
                    <input
                        v-else
                        type="text"
                        placeholder="Enter Link"
                        class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>
            </div>
            <div v-if="selectedClient && selectedOption !== ''" class="mt-4 mb-4">
                <h1 class="text-normal font-semibold text-gray-600"></h1>
                <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                  <div>
                      <h1 class="text-[13px] font-semibold text-gray-600">Category </h1>
                      <input
                          type="text"
                          placeholder="Enter Category"
                          class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                  </div>
                  <div>
                      <h1 class="text-[13px] font-semibold text-gray-600">Sub Category </h1>
                      <input
                          type="text"
                          placeholder="Enter Category"
                          class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                  </div>
                  <div>
                      <h1 class="text-[13px] font-semibold text-gray-600">Sub SubCategory </h1>
                      <input
                          type="text"
                          placeholder="Enter Category"
                          class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                  </div>
                </div>
            </div>
            <div v-if="selectedClient && selectedOption !== ''" class="mt-4 mb-4">
                <h1 class="text-normal font-semibold text-gray-600">Product Box</h1>
                <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                  <div>
                      <h1 class="text-[13px] font-semibold text-gray-600">Catalog </h1>
                      <input
                          type="text"
                          placeholder="Enter Category"
                          class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                  </div>
                </div>
            </div>
            <div v-if="selectedClient && selectedOption !== ''" class="mt-4 mb-16">
                <h1 class="text-normal font-semibold text-gray-600">Banner</h1>
                <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                  <div>
                      <h1 class="text-[13px] font-semibold text-gray-600">Catalog </h1>
                      <input
                          type="text"
                          placeholder="Enter Category"
                          class="mt-1 w-full p-2 text-sm border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                      />
                  </div>

                </div>
            </div>
        </div>
      </div>

      <div class=" modal-footer">
        <button @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
        <button @click="SetVendorLead()"  class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow  focus:ring-2 focus:ring-blue-400">
          Save Lead Details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import imagecomp from "~/components/customcontrol/imagepicker";
import ImageLable from "~/components/customcontrol/ImageLable";
import serach_Input from "~/components/customcontrol/SearchInput";
import toggleoption from "~/components/customcontrol/toggleoption";

import { useUserStore } from "~/stores/modules/userStore";
import { useLeadStore } from "~/stores/modules/qms/leadStore";


definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, ImageLable, imagecomp, toggleoption },
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      selectedOption: "",
      selectedClient: null,
      optionError: "",
      options: [
        { label: "Store and Banner", value: "store-banner" },
        { label: "Only Store", value: "store" },
        { label: "Only Banner", value: "banner" },
      ],
      err: {
        job: "",
        CompanyPhone: "",
        Address: "",
        ContactPhoneNo: "",
      },
    };
  },
  computed: {},

  async created() {
    this.userStore = useUserStore();
    this.leadStore = useLeadStore();
    this.curLead = this.leadStore.curLead;

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;
  },
  mounted() {

  },
  methods: {

    onClientSelected(item) {
        this.selectedClient = item;
    },
    closeModal() {            
      this.isOpen = false;
      this.$emit("close");
    },

    cancel() {
      this.clearErr();
      this.closeModal();
    },

    
    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
    },



    SetVendorLead() {
     
      if (this.IsValidate()) {
       return
        this.$showConfirm(
          "Are you sure to Save this Lead?",
          "warning"
        ).then(async (result) => {
          if (result.isConfirmed) {
            if (this.curLead.Medium === undefined) {
              this.curLead.Medium = "Office";
            }
            console.log(JSON.stringify(this.curLead));
           
          } else {
            console.log("Action canceled");
          }
        
          this.closeModal();
          this.clearErr();
        });
       
      }
    },


    IsValidate() {
            this.clearErr();


      let IsValidate = true;

      if (!this.selectedOption) {
            this.err.job = "Please select an option before creating KPI!";
            IsValidate = false;
        }

      if (!this.curLead.CompanyPhone) {
        this.err.CompanyPhone = "Please Enter Contact Number!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.curLead.CompanyPhone)) {
          this.err.CompanyPhone =
            "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.curLead.Address) {
        this.err.Address = "Please Enter Address!";
        IsValidate = false;
      }

      if (!this.curLead.ContactPhoneNo) {
        this.err.ContactPhoneNo = "Please Enter Contact Person Number!";
        IsValidate = false;
      } else {
        const contactNoRegex1 = /^[0-9]{10}$/;
        if (!contactNoRegex1.test(this.curLead.ContactPhoneNo)) {
          this.err.ContactPhoneNo = "Please Enter a valid 10-digit Contact Person Number!";
          IsValidate = false;
        }
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
  max-width: 900px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 90%;
  position: relative;
}


.modal-header {
  background: linear-gradient(to right, #1048c2, #0b2c88, #08236b); 
  backdrop-filter: blur(12px);
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