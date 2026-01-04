<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">
          {{ t('addMembersEditDetails') }}
        </h2>
        <closebtn @close="closeModal" />
      </div>
      <!-- Modal Content (scrollable) -->
      <div class="modal-content">
        <div class="form-content">
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersFullNEname') }}<span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="Fullname_En" placeholder="Enter Full Name (English)" required @input="clearErrorOnInput('Fullname_En')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Fullname_En" class="mt-2 text-sm text-red-600">
                {{ err.Fullname_En }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersFullNsname') }}<span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="Fullname_Sin" placeholder="Enter Fullname_Sin" required @input="clearErrorOnInput('Fullname_Sin')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersCallingName') }}<span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="CallingName" placeholder="Enter Calling Name" required @input="clearErrorOnInput('CallingName')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.CallingName" class="mt-2 text-sm text-red-600">
                {{ err.CallingName }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersRegistrationNo') }} <span class="text-red-500">*</span>
              </label>
              <input type="number" v-model="RegNo" placeholder="Enter Registration No" @input="clearErrorOnInput('RegNo')"
                class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.RegNo" class="mt-2 text-sm text-red-600">
                {{ err.RegNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersRegistrationDate') }} <span class="text-red-500">*</span>
              </label>
              <input type="date" v-model="RegDate" placeholder="Enter Registration Date" @input="clearErrorOnInput('RegDate')"
                class="w-full p-2 mt-2 text-[13px] border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.RegDate" class="mt-2 text-sm text-red-600">
                {{ err.RegDate }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersArea') }} <span class="text-red-500">*</span></label>
                <select
                  v-model="AreaCodeId"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                >
                  <option disabled value="">Select Team Leader</option>
                  <option
                    v-for="(cat, index) in welfareStore.updateInit.listManagementGroups"
                    :key="index"
                    :value="cat.id"
                  >
                    {{ cat.value }}
                  </option>
                </select>
              <p v-if="err.AreaCodeId" class="mt-2 text-sm text-red-600">
                {{ err.AreaCodeId }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersTeamLeader') }} <span class="text-red-500">*</span></label>
                <select
                  v-model="TeamLeaderId"
                  class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                >
                  <option disabled value="">Select Team Leader</option>
                  <option
                    v-for="(cat, index) in welfareStore.updateInit.listTeamLeaders"
                    :key="index"
                    :value="cat.id"
                  >
                    {{ cat.value }}
                  </option>
                </select>
              <p v-if="err.TeamLeaderId" class="mt-2 text-sm text-red-600">
                {{ err.TeamLeaderId }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersWhatsAppNumber') }} <span class="text-red-500">*</span></label>
              <input type="text" v-model="WhatsAppNo" :maxlength="10" placeholder="Enter WhatsApp Number" @input="clearErrorOnInput('WhatsAppNo')"
                required
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.WhatsAppNo" class="mt-2 text-sm text-red-600">
                {{ err.WhatsAppNo }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersAddressLine1') }} <span class="text-red-500">*</span>
              </label>
              <input type="text" v-model="Address1" placeholder="Enter Address Line 1" required @input="clearErrorOnInput('Address1')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.Address1" class="mt-2 text-sm text-red-600">
                {{ err.Address1 }}
              </p>
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersAddressLine2') }}
              </label>
              <input type="text" v-model="Address2" placeholder="Enter Address Line 2" required @input="clearErrorOnInput('Address2')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersAddressLine3') }} 
              </label>
              <input type="text" v-model="Address3" placeholder="Enter Address Line 3" required @input="clearErrorOnInput('Address3')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersResignedDate') }}<span class="text-red-500">*</span>
              </label>
              <input type="date" v-model="ResignedDate" placeholder="Enter Address Line 3" required @input="clearErrorOnInput('Address3')"
                class="w-full p-2 mt-2 text-sm border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div>
                <label class="block text-[13px] font-bold text-gray-600">
                    {{ t('addMembersImage') }} 
                </label>
                <imagepickermultiple
                    @GetSelectedImages="GetAttachedImage"
                    :image_file="imageroot"
                    ref="refApprovedImg"
                    accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
                />
            </div>
            <div class="">
              <label class="block text-[13px] font-bold text-gray-600">
                {{ t('addMembersStatus') }} 
              </label>
                <toggleoption v-model="isActive" />
            </div>
          </div>
        </div>
      </div>

      <div class=" modal-footer">
        <button @click="closeModal" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
        <button @click="SetMemberDetails()"  class="px-5 py-2 text-xs font-semibold transition bg-[#232B37] text-white rounded-md shadow hover:gray-400 focus:ring-2 focus:ring-indigo-400">
          Update Member Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const { t } = useI18n()

  function switchLang(lang) {
    locale.value = lang
  }
</script>

<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";
import imagecomp from "~/components/customcontrol/imagepicker";
import serach_Input from "~/components/customcontrol/SearchInput";
import toggleoption from "~/components/customcontrol/toggleoption";
import imagepickermultiple from "~/components/customcontrol/imagepickermultiple.vue";
import { useUserStore } from "~/stores/modules/userStore";
import { useWelfareStore } from '~/stores/modules/welfare/welfareStore';

definePageMeta({
  layout: "default",
});
export default {
  components: { closebtn, serach_Input, imagecomp, toggleoption ,imagepickermultiple},
    props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      isOpen: true,
      Fullname_En: "",
      Fullname_Sin: "",
      RegDate:"",
      CallingName: "",
      RegNo: "",
      ResignedDate:"",
      AreaCodeId: "",
      TeamLeaderId:"",
      WhatsAppNo:"",
      Address1:"",
      Address2:"",
      Address3:"",
      isActive: true,
      Photo:"",
      listFiles: [],
      err: {
        Fullname_En: "",
        Fullname_Sin: "",
        RegDate:"",
        CallingName: "",
        RegNo: "",
        ResignedDate:"",
        AreaCodeId: "",
        TeamLeaderId:"",
        WhatsAppNo:"",
        Address1:"",
        Address2:"",
        Address3:"",
        IsActive:"",
        Photo:"",
      },
      imageroot: "",
      showLoading: null,
      showAlert: null,
    };
  },
  computed: { },
  async created() {
    this.userStore = useUserStore();
    this.welfareStore = useWelfareStore();

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;

    await this.welfareStore.memberDetailsInit(this.showLoading)


  },
  mounted() {
    // this.$refs.refCity.initItem(this.city);
    // this.$refs.refDistrict.initItem(this.district);
  },
  methods: {
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    clearupdateDetails() {
      this.updateDetails = {
        Fullname_En: "",
        CallingName: "",
        RegNo: "",
        AreaCodeId: "",
      };
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

    GetAttachedImage(file) {
      console.log("Selected File:", file);
      if (file) {
        this.listFiles = file;
      }
    },


    SetMemberDetails() {
     
      if (this.IsValidate()) {
       
        this.$showConfirmWelfare(
          "Are you sure to Update this Details?",
          "warning"
        ).then(async (result) => {
        if (result.isConfirmed) {

            const formData = new FormData();
            formData.append("Id", this.id || "");
            formData.append("Fullname_En", this.Fullname_En || "");
            formData.append("Fullname_Sin", this.Fullname_Sin || "");
            formData.append("CallingName", this.CallingName || "");
            formData.append("RegDate", this.RegDate || "");
            formData.append("ResignedDate", this.ResignedDate || "");
            formData.append("AreaCodeId", this.AreaCodeId || "");
            formData.append("WhatsAppNo", this.WhatsAppNo || "");
            formData.append("Address1", this.Address1 || "");
            formData.append("Address2", this.Address2 || "");
            formData.append("Address3", this.Address3 || "");
            formData.append("IsActive", this.isActive || "");
            formData.append("IsActive", String(this.isActive ?? true) || "");
            if (this.listFiles && this.listFiles.length > 0) {
                this.listFiles.forEach((file, index) => {
                formData.append("Photo", file)
                });
      }


            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }

            await this.welfareStore.GetUpdateProfile(formData,this.showLoading)

          this.closeModal();
          this.clearErr();
        }
        });
       
      }
    },

    IsValidate() {
      this.clearErr();

      let IsValidate = true;

      if (!this.Fullname_En) {
        this.err.Fullname_En = "Please Enter Company Name!";
        IsValidate = false;
      }

      if (!this.RegNo) {
        this.err.Fullname_En = "Please Enter Reg No!";
        IsValidate = false;
      }

      if (!this.WhatsAppNo) {
        this.err.WhatsAppNo = "Please Enter Whats App No!";
        IsValidate = false;
      } else {
        const contactNoRegex = /^[0-9]{10}$/;
        if (!contactNoRegex.test(this.WhatsAppNo)) {
          this.err.WhatsAppNo =
            "Please Enter a valid 10-digit contact number!";
          IsValidate = false;
        }
      }

      if (!this.CallingName) {
        this.err.CallingName = "Please Enter CallingName!";
        IsValidate = false;
      }

      if (!this.TeamLeaderId) {
        this.err.TeamLeaderId = "Please Enter Team Leader!";
        IsValidate = false;
      }

      if (!this.RegNo) {
        this.err.RegNo = "Please Enter Registation No!";
        IsValidate = false;
      }

      if (!this.RegDate) {
        this.err.RegDate = "Please Enter Registation Date!";
        IsValidate = false;
      }

       if (!this.AreaCodeId) {
        this.err.AreaCodeId = "Please Enter AreaCode!";
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
  max-width: 800px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 80%;
  position: relative;
}

.modal-header {
  background: #232B37; /* from-blue-600, via-blue-700, to-blue-900 */
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