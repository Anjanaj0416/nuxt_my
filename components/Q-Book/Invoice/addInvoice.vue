<template>
    <div class="modal-overlay" v-if="isOpen">
        <div class="modal slide-modal">
            <div class="modal-header">
            <h2 class="modal-title">Add Invoice</h2>
            <closebtn @close="closeModal" />
            </div>

            <div class="modal-content">
                <div class="form-content">
                    <div class="grid grid-cols-1 gap-4 mt-1 sm:grid-cols-1 md:grid-cols-2">
                        <div>
                            <label class="block text-sm font-bold text-gray-600">Select Partner</label>
                            <div class="relative">
                                <select
                                class="w-full border border-gray-300 rounded px-3 py-2 mt-2 text-sm text-gray-700 px-4 py-2 pr-10"
                                >
                                    <option disabled value="">Select Partner</option>
                                    <option>gyasdg</option>
                                    <option>gyasdg</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2">
                        <div>
                           <label class="block text-sm font-bold text-gray-600">Invoice No</label>
                            <input 
                                type="text" 
                                placeholder="Enter invoice no"
                                class="w-full p-2 mt-2 text-sm border rounded-md" 
                            />
                        </div>
                        <div>
                           <label class="block text-sm font-bold text-gray-600">Terms</label>
                            <input 
                                type="text" 
                                placeholder="Enter terms no"
                                class="w-full p-2 mt-2 text-sm border rounded-md" 
                            />
                        </div>
                        <div>
                           <label class="block text-sm font-bold text-gray-600">Invoice Date</label>
                            <input 
                                type="text" 
                                placeholder="Enter invoice date"
                                class="w-full p-2 mt-2 text-sm border rounded-md" 
                            />
                        </div>
                        <div>
                           <label class="block text-sm font-bold text-gray-600">Due Date</label>
                            <calendar class="mt-2" @update="dueDate  = $event"/>
                            <p>{{ dueDate  }}</p>
                        </div>
                        <div>
                           <label class="block text-sm font-bold text-gray-600">Invoice No</label>
                            <input 
                                type="text" 
                                placeholder="Enter invoice no"
                                class="w-full p-2 mt-2 text-sm border rounded-md" 
                            />
                        </div>
                        <div>
                           <label class="block text-sm font-bold text-gray-600">Terms</label>
                            <input 
                                type="date" 
                                placeholder="Enter terms no"
                                class="w-full p-2 mt-2 text-sm border rounded-md" 
                            />
                        </div>
                        <div>
                           <label class="block text-sm font-bold text-gray-600">Invoice Date</label>
                            <input 
                                type="text" 
                                placeholder="Enter invoice date"
                                class="w-full p-2 mt-2 text-sm border rounded-md" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
            <button @click="cancel"
                class="px-12 py-2 text-xs font-semibold bg-white text-gray-600 rounded-lg shadow">
                Cancel
            </button>

            <button
                class="px-12 py-2 text-xs bg-[#bbd151] font-semibold text-gray-600 rounded-lg shadow">
                Save Lead Details
            </button>
            </div>
        </div>
    </div>

</template>

<script>

import closebtn from "~/components/customcontrol/modal_close_button";
import calendar from "~/components/customcontrol/calendar.vue";



definePageMeta({
  layout: "qbooklogin",
  middleware: 'authEbook',
});
export default {
  components: { closebtn,calendar },
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      showAlert: null,
      dueDate: null
    };
  },
  computed: {


  },
  async created() {


  },
  mounted() {
    // this.$refs.refCity.initItem(this.curLead.city);
    // this.$refs.refDistrict.initItem(this.curLead.district);
  },
  methods: {

closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("slide-out");

  setTimeout(() => {
    this.isOpen = false;
    this.$emit("close");
  }, 300); // match animation duration
}
,

    cancel() {
      this.closeModal();
    },




  },
};
</script>

<style scoped>
/* Modal Styling */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  overflow: hidden;
}

/* Slide-in modal */
.modal {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 80%;
  max-width: 1200px;
  background: white;
  border-radius: 1rem 0 0 1rem;
  display: flex;
  flex-direction: column;

  /* Animation */
  transform: translateX(100%);
  animation: slideIn 0.35s ease forwards;
}

/* Slide in animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Slide out animation */
.modal.slide-out {
  animation: slideOut 0.3s ease forwards;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* Header */
.modal-header {
  background: #bbd151;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Content */
.modal-content {
  padding: 20px;
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