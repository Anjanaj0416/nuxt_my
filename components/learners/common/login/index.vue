<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal relative bg-white rounded-lg shadow-lg max-w-md mx-auto mt-20">
      <!-- Modal Header -->
      <div class="w-full flex justify-end p-2">
        <button @click="closeModal" class="text-gray-500 hover:text-red-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Content -->
      <div class="p-4">
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col items-center w-full max-w-xl overflow-hidden  rounded-3xl md:flex-row bg-white">
            <div class="w-full p-10">
              <h3 class="mb-6 text-3xl font-semibold text-center text-red-600">
                Sign In
              </h3>

              <form class="space-y-5">
                <!-- Username -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">
                    User Name
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    class="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                </div>

                <!-- Password -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div class="relative">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      class="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 flex items-center text-black right-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Sign In Button -->
                <button
                  type="submit"
                  class="w-full py-2 text-white transition bg-red-600 rounded-lg hover:bg-red-500"
                >
                  Sign In
                </button>

                <!-- Links -->
                <div class="flex justify-between">
                  <a href="" class="text-sm text-red-600 hover:underline">
                    Registration
                  </a>
                  <a href="/user/changelogin" class="text-sm text-red-600 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, computed } from "vue";
import closebtn from "~/components/customcontrol/modal_close_button";;
import { useUserStore } from "~/stores/modules/userStore";



definePageMeta({
  layout: "learners",
});
export default {
  components: { closebtn},
  data() {
    return {
      isOpen: true,
      imageroot: "",
      showLoading: null,
      showAlert: null,
    };
  },
  computed: {

  },

  async created() {
    this.userStore = useUserStore();


    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.showLoading = this.$showLoading;
    this.showAlert = this.$showAlert;


  },
  mounted() {
    // this.$refs.refCity.initItem(this.curLead.city);
    // this.$refs.refDistrict.initItem(this.curLead.district);
  },
  methods: {
    closeModal() {            
      this.isOpen = false;
      this.$emit("close");
    },
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
  max-width: 500px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 50%;
  position: relative;
}


@media (max-width: 768px) {
  .modal {
    width: 100%;
    height: 70%;
    border-radius: 1rem;
  }



}
</style>