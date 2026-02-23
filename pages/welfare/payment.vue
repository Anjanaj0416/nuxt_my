<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section class="px-4 py-8 mt-14 lg:px-24">
    <div class="text-2xl uppercase mb-6">{{ t('membershipPayments') }} </div>

    <div
      class="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-3 sm:gap-4 mb-8"
    >
       <div class="flex flex-col w-full sm:w-72">
        <label class="font-medium text-gray-700 mb-1 sm:mb-0">Search Member</label>
          <serach_Input
               
                label=""
          />
      </div>
    </div>


    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div 
        v-for="emp in employees"
        :key="emp.id"
        class="bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300"
      >

        <div class="flex items-center justify-between p-4">

          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white font-bold text-lg"
            >
              {{ emp.name.charAt(0) }}
            </div>

            <div>
              <h3 class="text-sm font-semibold text-gray-800">
                {{ emp.name }}
              </h3>
              <p class="text-xs text-gray-500">
                Emp No: {{ emp.bookNo }}
              </p>
              <p class="text-xs text-gray-400">
                {{ emp.contact }}
              </p>
            </div>
          </div>

          <button
            @click="toggleEmployee(emp.id)"
            class="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {{ expandedId === emp.id ? 'Close' : 'View' }}
          </button>

        </div>

        <!-- Expandable UI (UNDER CARD) -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div 
            v-if="expandedId === emp.id"
            class="border-t border-gray-200 bg-white p-4 text-sm space-y-4"
          >

            <div class="bg-gray-50 rounded-lg p-3 space-y-3">

              <!-- Header -->
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Member Details
                </h4>

                <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                  #{{ emp.bookNo }}
                </span>
              </div>

              <!-- Info -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">

                <div class="flex items-start gap-2">
                  <span class="text-gray-400">📍</span>
                  <span class="text-gray-700 leading-tight">
                    {{ emp.address }}
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-gray-400">📞</span>
                  <span class="text-gray-700">
                    {{ emp.contact }}
                  </span>
                </div>

              </div>

              <!-- Payment Status -->
              <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-200 text-xs">

                <!-- Due Payment -->
                <span class="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  Due: Rs. {{ emp.duePayment }}
                </span>

                <!-- Fine Payment -->
                <span class="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                  Fine: Rs. {{ emp.finePayment }}
                </span>

                <!-- Total (Optional) -->
                <span class="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  Total: Rs. {{ emp.duePayment + emp.finePayment }}
                </span>

              </div>

            </div>
            
            <div class="flex flex-col sm:flex-row sm:items-end gap-3">

              <!-- Payment Label + Input -->
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-600 mb-1">
                  Payment Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  v-model="paymentAmount"
                />
              </div>

              <!-- Button -->
              <div>
                <button
                  @click="addPayment(emp)"
                  class="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Process
                </button>
              </div>

            </div>

            <!-- Payment List Section -->
            <div class="border-t pt-3">

              <h5 class="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                Payment History
              </h5>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div
                  v-for="pay in emp.payments"
                  :key="pay.id"
                  class="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500">Date:</span>
                    <span class="font-medium">{{ pay.date }}</span>
                  </div>

                  <div class="flex justify-between text-xs mt-1">
                    <span class="text-gray-500">Amount:</span>
                    <span class="font-semibold text-green-600">
                      Rs. {{ pay.amount }}
                    </span>
                  </div>

                  <div class="flex justify-between text-xs mt-1">
                    <span class="text-gray-500">Month:</span>
                    <span class="font-medium">
                      {{ pay.month }}
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
          
        </transition>

      </div>

    </div>

  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>

<script>
import { useRoute } from "vue-router";
import { useUserStore } from "~/stores/modules/userStore";
import serach_Input from "~/components/customcontrol/SearchInput";


definePageMeta({
  layout: "society",
  middleware: "auth",
});

export default {
  components: { serach_Input },
  props: [""],
  data() {
    return {
      imageroot: "",
      showLoading: null,
      searchVal: "",

      expandedId: null, 
      employees: [
        { 
          id: 1,
          name: "Ajith Weeramon",
          bookNo: "125",
          address: "No 51, W/Palliyapitiya, Dunagaha",
          contact: "0715321168",
          payments: [
            { id: 1, date: "2026-02-01", amount: 2000, month: "January" },
            { id: 2, date: "2026-03-01", amount: 2000, month: "February" },
          ],
        },
        {
          id: 2,
          name: "Kamal Perera",
          bookNo: "126",
          address: "Negombo Road",
          contact: "0771234567",
          payments: [
            { id: 1, date: "2026-02-01", amount: 2000, month: "January" },
            { id: 2, date: "2026-03-01", amount: 2000, month: "February" },
          ],
        },
      ],
    };
  },
  async mounted() {},
  async created() {
    this.userStore = useUserStore();
    this.showLoading = this.$showLoading;
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
  
    

  },
  watch: {},
  computed: {},
  methods: {
    toggleEmployee(id) {
      this.expandedId = this.expandedId === id ? null : id;
    },
  },
  async beforeMount() {

  },
  head() {
    return {
      title: "Welfare System",
    };
  },
};


</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}
.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>
