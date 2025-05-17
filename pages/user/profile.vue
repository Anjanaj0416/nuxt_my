<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <div class="flex items-center gap-4">
          <div class="relative w-16 h-16">
            <img
              :src="previewImage || defaultProfileImage"
              alt="Profile"
              class="object-cover w-full h-full bg-white border border-gray-300 rounded-full"
            />
            <input
                type="text"
                v-model="updateProfile.Name"
                placeholder="Enter Name"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
            />

          </div>
          <div class="text-lg font-semibold text-white">Name</div>
        </div>
        <closebtn @close="closeModal" />
      </div>

      <!-- Modal Content -->
      <div class="modal-content">
        <p>User ID: {{ userId }}</p>
        <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-2">
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Name</label>
              <input
                type="text"
                v-model="updateProfile.Name"
                placeholder=""
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
              />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Email</label>
              <input
                type="text"
                v-model="updateProfile.Emali"
                placeholder=""
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
              />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Contact Number</label>
              <input
                type="text"
                v-model="updateProfile.Mobile"
                placeholder="Vendor ID (read-only)"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
              />
            </div>
            <div class="">
              <label class="block text-sm font-bold text-gray-600">Identification Code</label>
              <input
                type="text"
                v-model="updateProfile.IdentificationCode"
                placeholder="Vendor ID (read-only)"
                class="w-full p-2 mt-2 text-sm bg-gray-100 border rounded-md"
              />
            </div>
           
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="GetSave" class="confirm-button">Save</button>
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
      updateProfile:{

      }
    };
  },
  props: {
    userId: {
      type: [String, Number],
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

    GetUpdateProfileImage(image) {
      this.updateProfile.ImageFile = image;
    },

    async GetSave() {
      const userStore = useUserStore();
      const formData = new FormData();

      formData.append("Id", userStore.updateProfile.Id);
      formData.append("Name", userStore.updateProfile.Name);
      formData.append("Email", userStore.updateProfile.Email);
      formData.append("Mobile", userStore.updateProfile.Mobile);
      formData.append("IdentificationCode", userStore.updateProfile.IdentificationCode);

      if (userStore.updateProfile.ImageFile) {
        formData.append("Image", userStore.updateProfile.ImageFile);
      }
      console.log(formData);
      return
      await userStore.profileUpdate(formData, this.showLoading);


      this.closeModal();
    },

    onImageChange(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
            this.previewImage = event.target.result;
            };
            reader.readAsDataURL(file);
            console.log(file);
            
        } else {
            alert("Please upload a valid image file.");
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
