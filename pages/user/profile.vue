<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" v-if="isOpen">
    <div class="bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] max-h-screen rounded-2xl shadow-2xl flex flex-col overflow-hidden">

      <!-- Modal Header -->
      <div class="flex items-center justify-between px-6 py-4 text-white bg-gradient-to-r from-blue-900 to-blue-950 rounded-t-2xl">
        <h2 class="text-2xl font-bold">Profile</h2>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-2 space-y-4 overflow-y-auto ">
        <!-- Profile View Mode -->
        <div v-if="!isEditing">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-4">
              <img
                class="object-cover w-16 h-16 transition-transform rounded-full ring-2 ring-indigo-500 hover:scale-105"
                :src="profile.image || 'https://img.icons8.com/ios/50/user-male-circle--v1.png'"
                alt="Profile Picture"
              />
              <!-- <img
                class="object-cover w-16 h-16 transition-transform rounded-full ring-2 ring-indigo-500 hover:scale-105"
                :src="profile.resourceURLRoot + profile.image || 'https://img.icons8.com/ios/50/user-male-circle--v1.png'"
                @error="event => event.target.src = 'https://img.icons8.com/ios/50/user-male-circle--v1.png'"
                alt="Profile Picture"
              /> -->

              <div>
                <p class="text-lg font-semibold text-gray-800">{{ profile.name }}</p>
              </div>
            </div>
            <button @click="toggleEdit1" class="px-4 py-2 text-xl text-blue-900 transition-colors rounded-md hover:underline hover:text-blue-900">Edit</button>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p class="text-sm text-gray-500">Name</p>
              <p class="font-medium text-gray-800">{{ profile.name }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium text-gray-800">{{ profile.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Mobile</p>
              <p class="font-medium text-gray-800">{{ profile.mobile }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Identification Code</p>
              <p class="font-medium text-gray-800">{{ profile.identificationCode }}</p>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-if="isEditing">
          <div class="flex justify-end">
            <button @click="toggleEdit1" class="px-4 py-2 text-xl text-blue-900 transition-colors rounded-md hover:underline hover:text-blue-900">Cancel Edit</button>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input v-model="profile.name" type="text" class="w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.name" class="mt-1 text-sm text-red-600">{{ err.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input v-model="profile.email" type="text" class="w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.email" class="mt-1 text-sm text-red-600">{{ err.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Contact Number</label>
              <input v-model="profile.mobile" type="text" class="w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.mobile" class="mt-1 text-sm text-red-600">{{ err.mobile }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Identification Code</label>
              <input v-model="profile.identificationCode" type="text" class="w-full p-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
              <p v-if="err.identificationCode" class="mt-1 text-sm text-red-600">{{ err.identificationCode }}</p>
            </div>
            <div class="">
              <label class="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
              <imagecomp
                :existing_image_path="imageroot + profile.image"
                @deleteExistingImage="profile.image = ''"
                @GetSelectedImage="GetSelectedImage"
                ref="refImage"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
        <button @click="closeModal" class="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300">
          Cancel
        </button>
        <button v-if="isEditing" @click="GetSave" class="px-4 py-2 text-white bg-indigo-700 rounded-md hover:bg-indigo-800">
          Save
        </button>
    </div>

    </div>
  </div>
</template>


<script>
import closebtn from "~/components/customcontrol/modal_close_button";
import serach_Input from "~/components/customcontrol/SearchInput";
import imagepicker from "~/components/customcontrol/imagepicker.vue";
import { useUserStore } from "~/stores/modules/userStore";
import imagecomp from "~/components/customcontrol/imagepicker";


definePageMeta({ layout: 'default' });

export default {
  components: { closebtn, serach_Input,imagepicker,imagecomp },
  data() {
    return {
      imageroot: process.env.Assets_83,
      isOpen: true,
      showLoading: null,
      err: { },
      defaultProfileImage: "",
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
    this.userStore = useUserStore();

  },
  methods: {
    SelectAgent(csoNo) {
      this.csoNo = csoNo;
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
        this.GetSave();
      }
    },
     toggleEdit1() {
      this.isEditing = !this.isEditing;

    },

    GetSelectedImage(file) {
      this.profile.ImageFile = file;
      this.profile.image = '';      
    },

    GetSave() {
      if (this.IsValidate()) {
        this.$showConfirm(
          "Are you sure you want to Save this Profile Details?",
          "warning"
        ).then(async (result) => {
          if (result) {
            const formData = this.convertProfileToFormData(this.profile);         
            await this.userStore.profileUpdate(formData, this.showLoading);
            this.closeModal();
          } else {
            console.log("Action canceled");
          }
        });
      }
    },

    IsValidate() {
      let isValid = true;

      if (!this.profile.name || this.profile.name.trim() === "") {
        this.err.name = "Name is required.";
        isValid = false;
      }

      if (!this.profile.email || this.profile.email.trim() === "") {
        this.err.email = "Email is required.";
        isValid = false;
      }

      if (!this.profile.mobile || this.profile.mobile.trim() === "") {
        this.err.mobile = "Mobile number is required.";
        isValid = false;
      }

      if (!this.profile.identificationCode || this.profile.identificationCode.trim() === "") {
        this.err.identificationCode = "Identification code is required.";
        isValid = false;
      }

      return isValid;
    },

    
  convertProfileToFormData(profile) {
    const formData = new FormData();

    formData.append("Id", profile.loggedUserId || "");
    formData.append("Name", profile.name || "");
    formData.append("Email", profile.email || "");
    formData.append("Mobile", profile.mobile || "");
    formData.append("IdentificationCode", profile.identificationCode || "");
    // formData.append("IdentificationCode", profile.identificationCode || "");

    if (profile.ImageFile) {
      formData.append("Image", profile.ImageFile);
    } else if (profile.image) {
      formData.append("Image", profile.image);
    } else {
      formData.append("Image", "");
    }

    return formData;
  }


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
  /* overflow: hidden; */
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
