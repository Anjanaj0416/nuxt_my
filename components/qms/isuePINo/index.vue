<template>
    <section class="justify-center">
      <div class="  p-2 text-sm text-gray-800">
        <div class="flex flex-wrap items-center justify-between mb-6">
            <div class="text-xl sm:text-xl md:text-2xl uppercase mb-3 sm:mb-0">
                Reserve PI No.
            </div>
        </div>

        <div class=" flex items-center justify-center">
          <div class=" border border-gray-200 rounded-2xl shadow-2xl p-8 w-full">

            <!-- Next Available -->
            <div class="mb-6">
  <h1
    class="text-xl font-bold transition-all duration-300"
    :class="isCustom 
      ? 'text-gray-400 blur-[1px] opacity-60' 
      : 'text-gray-800'"
  >
    Next Available PI No:
    <span
      class="font-extrabold"
      :class="isCustom 
        ? 'text-gray-400' 
        : 'text-blue-900'"
    >
      {{ orderStore.availablePin.data }}
    </span>
  </h1>
</div>

            <!-- Checkbox -->
            <div class="mb-4 flex items-center gap-3">
              <input
                type="checkbox"
                v-model="isCustom"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label class="font-semibold text-gray-700">
                Use Custom PI No
              </label>
            </div>

            <!-- Custom Section (Only show if checked) -->
            <div v-if="isCustom" class="mb-6 space-y-4">

              <!-- Date Picker -->
              <div>
                <label class="block text-sm font-semibold text-gray-600 mb-1">
                  Select Date
                </label>
                <input
                  v-model="customDate"
                  type="date"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

            </div>

            <!-- Button -->
<!-- 
            <div class="flex items-center justify-end gap-4">
              <div>
        <button @click="closeModal" class="px-12 py-2 text-xs  font-semibold transition bg-white text-gray-600 rounded-full shadow">Cancel</button>
        </div>
        <div>
        <button @click="issueNo" class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow">
          Issue PI 
        </button>
        </div>
      </div> -->
              <div class="flex justify-between items-center mt-6">
                <button @click="cancel" class="px-12 py-2 text-xs  font-semibold transition bg-gray-100 text-gray-600 rounded-full shadow">Cancel</button>
                <button @click="issueNo" class="px-12 py-2 text-xs  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                font-semibold transition text-white rounded-full shadow">
                  Issue PI
                </button>
            </div>
            

          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>

 import { useRoute } from 'vue-router'
 import { useOrderStore } from '~/stores/modules/orderStore';
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });
   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:['vendorId'],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        receiptFiles: {},


    isCustom: false,
    customPINo: "",
    customDate: "",
   
      }
    },
    async mounted() {
     
    },
    async created() {
      this.orderStore = useOrderStore(); 
      this.showLoading = this.$showLoading;
   

      await this.orderStore.loadAvailablePin(this.vendorId, this.showLoading);
    },
    watch: {},
    computed: {
  
    },
    methods: {
      issueNo() {

        let request = {
          vendorId: this.vendorId,
          PINo: this.isCustom
            ? this.customPINo
            : this.orderStore.availablePin?.data,
          date: this.isCustom ? this.customDate : ''
        };

        if (this.isCustom && (!this.customDate)) {
          this.$showToast("Please enter Date", "error");
          return;
        }

        this.$showConfirm("Are you sure to Reserve PI No.?", "warning")
          .then(async (result) => {
            if (result.isConfirmed) {
              console.log(request);
              await this.orderStore.GetIssuePINumber(request, this.showLoading);
              this.$emit("close");
            } else {
              // Cancelled
              console.log("Action canceled");
            }
        });

      },
      cancel() {
        this.$emit("close");
      },
    },

    async beforeMount() {

    },
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }

  </script>
  
  <style scoped>
  .csscmd{
    @apply p-2 text-center bg-blue-200 rounded;
  }
  .csscmd:hover{
    @apply bg-blue-200 cursor-pointer;
  }
  
  .cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
  }

  @keyframes glow {
  0% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
  }
  100% {
    box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
  }
}

.animate-glow {
  animation: glow 1.5s infinite ease-in-out;
}
  </style>
  
  
  