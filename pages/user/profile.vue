<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold text-white ">Profile</h1>

        </div>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content -->
      <div class="modal-content">
       <div class="modal-content">
        <!-- <button @click="toggleEdit"></button> -->


        <div v-if="!isEditing" class="mt-2">
          <div class="bg-white p-6 sm:p-2 ">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-4">
              <img
                class="w-16 h-16 rounded-full ring-2 ring-indigo-500 hover:scale-105 transition-transform duration-300"
                :src="profile.resourceURLRoot + profile.image"
                alt="Profile"
              />
              <div>
                <p class="text-lg font-semibold text-gray-800">{{ profile.name }}</p>
              </div>
            </div>
            <button
              @click="toggleEdit"
              class="px-4 py-2 text-blue-900 text-xl  underline rounded-md hover:text-blue-900 transition-colors"
            >
              {{ isEditing ? 'Profile' : 'Edit' }}
            </button>

          </div>
          <!-- {{ profile.loggedUserId }} -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col space-y-1">
              <span class="text-sm text-gray-500">Name</span>
              <span class="font-medium text-gray-800">{{ profile.name }}</span>
            </div>
            <div class="flex flex-col space-y-1">
              <span class="text-sm text-gray-500">Email</span>
              <span class="font-medium text-gray-800">{{ profile.email }}</span>
            </div>
            <div class="flex flex-col space-y-1">
              <span class="text-sm text-gray-500">Mobile</span>
              <span class="font-medium text-gray-800">{{ profile.mobile }}</span>
            </div>
            <div class="flex flex-col space-y-1">
              <span class="text-sm text-gray-500">Identification Code</span>
              <span class="font-medium text-gray-800">{{ profile.identificationCode }}</span>
            </div>
          </div>
          </div>
        </div>

        <!-- Inputs: show when editing -->
        <div v-if="isEditing" class="relative bg-white  p-2 sm:p-2">
          <div class="flex justify-end mb-4">
            <button
              @click="toggleEdit"
              class="px-4 py-2 text-blue-900 text-xl  underline rounded-md hover:text-blue-900 transition-colors"
            >
              {{ isEditing ? 'Profile' : 'Edit' }}
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-700">Name</label>
              <input
                type="text"
                v-model="profile.name"
                class="w-full mt-2 p-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700">Email</label>
              <input
                type="text"
                v-model="profile.email"
                class="w-full mt-2 p-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700">Contact Number</label>
              <input
                type="text"
                v-model="profile.mobile"
                class="w-full mt-2 p-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700">Identification Code</label>
              <input
                type="text"
                v-model="profile.identificationCode"
                class="w-full mt-2 p-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          {{ profile }}
        </div>

      </div>

      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button v-if="isEditing" @click="GetSave" class="confirm-button">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import closebtn from "~/components/customcontrol/modal_close_button";
import serach_Input from "~/components/customcontrol/SearchInput";
import imagepicker from "~/components/customcontrol/imagepicker.vue";
import { useUserStore } from "~/stores/modules/userStore";

definePageMeta({ layout: 'default' });

export default {
  components: { closebtn, serach_Input,imagepicker },
  data() {
    return {
      imageroot: process.env.Assets_83,
      isOpen: true,
      rsoNo: "",
      showLoading: null,
      err: { },
      defaultProfileImage: "",
      profile:{},
      isEditing: false,
    };
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  async created() {
    this.showLoading = this.$showLoading;

  },
  methods: {
    SelectAgent(rsoNo) {
      this.rsoNo = rsoNo;
    },

    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    GetprofileImage(image) {
      this.profile.ImageFile = image;
    },

    toggleEdit() {
      this.isEditing = !this.isEditing;
      if (!this.isEditing) {
        // When exiting edit mode (clicking 'Profile' button), you can call save if you want:
        this.GetSave();
      }
    },

    async GetSave() {
      const userStore = useUserStore();
      const formData = new FormData();

      formData.append("Id", this.profile.loggedUserId); 
      formData.append("Name", this.profile.name || "");
      formData.append("Email", this.profile.email || "");
      formData.append("Mobile", this.profile.mobile || "");
      formData.append("IdentificationCode", this.profile.identificationCode || "");

      if (this.profile.ImageFile) {
        formData.append("Image", this.profile.ImageFile);
      } else {
        formData.append("Image", this.profile.image || "");
      }

            // console.log('Form Data as Object:', formDataObj);
      return
      try {
        await userStore.profileUpdate(formData, this.showLoading);
        this.isEditing = false; 
        this.closeModal();      
      } catch (e) {
        console.error("Error while updating profile:", e);
      }
    },


    
    IsValidate() {
      let isValid = true;
      
      this.err.rsoNo = this.rsoNo ? "" : "Please select a Sales Executive!";
      return !!this.rsoNo;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  width: 1000px;
  height: 500px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 14px;
}

.modal-header,
.modal-footer {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 16px;
  font-weight: bold;
}

.modal-content {
  padding: 10px 15px;
}

button {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  border-radius: 4px;
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
  opacity: 0.85;
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .modal {
    width: 90%;
  }
}
</style>
