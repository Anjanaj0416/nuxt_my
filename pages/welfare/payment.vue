<!-- https://flowbite.com/docs/components/avatar/ -->

<template>
  <section class="px-4 py-8 mt-14 lg:px-24">

    <div class="flex flex-col items-center justify-between mt-2 mb-2 md:flex-row">
      <div class="w-full mb-4 md:mb-0">
        <div class="text-2xl uppercase">{{ t('membershipPayments') }}</div>
      </div>
      <div class="w-full md:w-auto flex items-center gap-2">
        <div class="relative">
          <div class="w-full md:w-96">
            <input
              type="search"
              v-model="searchVal"
              :placeholder="t('searchPlaceholderMember')"
              class="w-full rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-800
                    focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              @click="GetSearch(searchVal)"
              class="absolute right-2 top-1/2 -translate-y-1/2
                    bg-gray-600 hover:bg-gray-700
                    text-white px-6 py-2 rounded-full text-sm font-medium"
            >
                {{ t('search') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8 items-start">
      <div 
        v-for="emp in  welfareStore.paymentListView"
        :key="emp.id"
        class="bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300"
      >
        <div class="flex items-center justify-between p-4">

          <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
            <img
              :src="imageroot + emp.logoUrl "
              alt="image"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>

            <div>
              <h3 class="text-sm font-semibold text-gray-800">
                {{ emp.name }}
              </h3>
              <p class="text-xs text-gray-600">
                {{ t('empNo') }} : {{ emp.bookId || t('empNotFound') }}
              </p>
              <p class="text-xs text-gray-500">
                {{ t('phone') }} : {{ emp.contact || t('noContactNumber') }}
              </p>
            </div>
          </div>

          <button
            @click="toggleEmployee(emp.id)"
            class="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            {{ expandedId === emp.id ? t('close') : t('view') }}
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
                  {{ t('memberDetails') }}
                </h4>

                <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                  #{{ emp.bookId }}
                </span>
              </div>

              <!-- Info -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">

                <div class="flex items-start gap-2">
                  <span class="text-gray-400">📍</span>
                  <span class="text-gray-700 leading-tight">
                    {{ emp.address || t('noAddress')}}
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-gray-400">📞</span>
                  <span class="text-gray-700">
                    {{ emp.contact || t('noContactNumber')}}
                  </span>
                </div>

                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-4 h-4 text-green-500"
                    fill="currentColor"
                  >
                    <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.894.754 5.72 2.184 8.216L0 32l7.616-2.148A15.933 15.933 0 0016 31.604c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.148a13.15 13.15 0 01-6.72-1.86l-.48-.288-4.512 1.272 1.204-4.392-.312-.504A13.094 13.094 0 012.852 16c0-7.28 5.868-13.148 13.148-13.148S29.148 8.72 29.148 16 23.28 29.544 16 29.544zm7.284-9.816c-.396-.204-2.34-1.152-2.7-1.284-.36-.132-.624-.204-.888.204-.264.396-1.02 1.284-1.248 1.548-.228.264-.456.3-.852.096-.396-.204-1.668-.612-3.18-1.944-1.176-1.044-1.968-2.328-2.196-2.724-.228-.396-.024-.612.168-.816.168-.168.396-.456.6-.684.204-.228.264-.396.396-.66.132-.264.066-.492-.03-.696-.096-.204-.888-2.136-1.212-2.928-.324-.78-.648-.672-.888-.684-.228-.012-.492-.012-.756-.012s-.696.096-1.056.492c-.36.396-1.38 1.344-1.38 3.276 0 1.932 1.416 3.804 1.608 4.068.204.264 2.784 4.248 6.756 5.952.948.408 1.692.648 2.268.828.948.3 1.812.264 2.496.156.762-.12 2.34-.96 2.676-1.884.336-.924.336-1.716.24-1.884-.096-.168-.36-.264-.756-.468z"/>
                  </svg>
                  <span class="text-gray-700">
                    {{ emp.whatsapp || t('noWhatsappNumber')}}
                  </span>
                </div>

              </div>

              <!-- Payment Status -->
              <div class="flex flex-wrap gap-2 pt-2 border-t border-gray-200 text-xs">

                <!-- Due Payment -->
                <span class="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  {{ t('due') }}: {{ t('rs') }} {{ emp.duePayment }}
                </span>

                <!-- Fine Payment -->
                <span class="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                  {{ t('fine') }}: {{ t('rs') }} {{ emp.finePayment }}
                </span>

                <!-- Total (Optional) -->
                <span class="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  {{ t('total') }}: {{ t('rs') }} {{ emp.duePayment + emp.finePayment }}
                </span>

              </div>

            </div>
          
            <div class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">

              <label class="text-xs font-semibold text-gray-700 tracking-wide">
                💳 {{ t('addMembersPaymentAmount') }}
              </label>

              <div class="flex items-center gap-2">

                <span class="text-xs text-gray-500">
                  {{ t('initialProcess') }}
                </span>

                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :id="'initialProcess' + emp.id"
                    v-model="emp.isInitialProcess"
                    @change="handleInitialProcess(emp)"
                    class="sr-only peer"
                  />

                  <div
                    class="w-9 h-5 bg-gray-300 rounded-full peer 
                          peer-checked:bg-green-500
                          transition-all duration-300">
                  </div>

                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md
                          transition-all duration-300
                          peer-checked:translate-x-4">
                  </div>

                </label>
              </div>
            </div>

            <div v-if="!emp.isInitialProcess" class="flex flex-col sm:flex-row sm:items-end gap-3">
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-600 mb-1">
                  {{ t('addPaymentAmount') }}
                </label>
                <input
                  type="number"
                  :placeholder="t('enteramount')"
                  class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  v-model="paymentAmount"
                />
              </div>
              <div>
                <button
                  @click="addPayment(emp)"
                  class="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  {{ t('process') }}
                </button>
              </div>
            </div>

            <div v-if="emp.isInitialProcess" class="flex flex-col sm:flex-row sm:items-end gap-3">

              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-600 mb-1">
                  {{ t('lastPaidYear') }}
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2100"
                  maxlength="4"
                  placeholder="YYYY"
                  v-model="lastPaidYear"
                  @input="clearErrorOnInput('lastPaidYear')"
                  class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <p v-if="err.lastPaidYearerror" class="mt-2 text-sm text-red-600">
                  {{ err.lastPaidYearerror }}
                </p>
              </div>

              <!-- Month Only -->
              <div class="flex-1">
                <label class="block text-xs font-medium text-gray-600 mb-1">
                  {{ t('lastPaidMonth') }}
                </label>
                <select
                  v-model="lastPaidMonth"
                  @input="clearErrorOnInput('lastPaidMonth')"
                  class="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                >
                  <option disabled value="">Select Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <p v-if="err.lastPaidMontherror" class="mt-2 text-sm text-red-600">
                  {{ err.lastPaidMontherror }}
                </p>
              </div>

              <!-- Button -->
              <div>
                <button
                  @click="processInitialPayment(emp)"
                  class="px-3 py-1.5 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  {{ t('process') }}
                </button>
              </div>

            </div>

            <!-- Payment List Section -->
            <div class="border-t pt-3">

              <h5 class="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                {{ t('paymentHistory') }}
              </h5>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div
                  v-for="pay in emp.payments"
                  :key="pay.id"
                  class="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm"
                >
                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500">{{ t('paidDate') }}:</span>
                    <span class="font-medium">{{ pay.date }}</span>
                  </div>

                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500">{{ t('paymentmonth') }}:</span>
                    <span class="font-medium">{{ pay.date }}</span>
                  </div>

                  <div class="flex justify-between text-xs">
                    <span class="text-gray-500">{{ t('feeGivenForDate') }}:</span>
                    <span class="font-medium">{{ pay.date }}</span>
                  </div>

                  <div class="flex justify-between text-xs mt-1">
                    <span class="text-gray-500">{{ t('amount') }}:</span>
                    <span class="font-semibold text-green-600">
                      Rs. {{ pay.amount }}
                    </span>
                  </div>

                  <!-- <div class="flex justify-between text-xs mt-1">
                    <span class="text-gray-500">{{ t('month') }}:</span>
                    <span class="font-medium">
                      {{ pay.month }}
                    </span>
                  </div> -->
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
import { useWelfareStore } from "~/stores/modules/welfare/welfareStore";
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

      lastPaidMonth:"",

          err: {
      lastPaidYearerror: '',
      lastPaidMontherror: ''
    }

    };
  },
  async mounted() {},
  async created() {
    this.userStore = useUserStore();
    this.welfareStore = useWelfareStore();

    this.showLoading = this.$showLoading;

    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    this.id = this.userStore.loggedUser.id;

    await this.welfareStore.paymentViewInit(this.searchval,this.showLoading);

    this.employees = this.welfareStore.paymentListView;

  },
  watch: {},
  computed: {},
  methods: {
    toggleEmployee(id) {
      this.expandedId = this.expandedId === id ? null : id;
    },
    handleInitialProcess(emp) {
      if (emp.isInitialProcess) {
        emp.lastPayDate = new Date().toISOString().split("T")[0];
      } else {
        emp.lastPayDate = null;
      }
    },
        
    async GetSearch(searchVal) {
      if (searchVal) {
        this.searchval = searchVal;
      } else {
        this.searchval = "";
      }
      // await this.leadStore.GetInitLeads(this.showLoading);
      await this.hh.paymentList({ searchval: this.searchval },this.showLoading);

      this.searchval = "";

    },

    async processInitialPayment(emp) {
      if (!this.IsValidate()) return;

      const confirmed = await this.$showConfirmbqbook(
        "Are you sure to Process Initial Payment?",
        null,
        "warning"
      );

      if (!confirmed.isConfirmed) return;

      req = {
        bookId: emp.bookId,
        lastPaidYear: this.lastPaidYear,
        lastPaidMonth: this.lastPaidMonth,
      };

      console.log(req);

      await this.welfareStore.ProcessInitialPayment(req, this.showLoading);
    
    },

    IsValidate() {
      this.clearErr();
      let isValid = true;

      if (!this.lastPaidYear ) {
        this.err.lastPaidYearerror = "Please select Partner";
        isValid = false;
      }

      if (!this.lastPaidMonth) {
        this.err.lastPaidMontherror = "Please enter Invoice No";
        isValid = false;
      }

      return isValid;
    },

    
    clearErr() {
      Object.keys(this.err).forEach(key => {
        this.err[key] = "";
      });
    },

    clearErrorOnInput(field) {
      if (this.err[field]) {
        this.err[field] = "";
      }
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
