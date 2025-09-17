<template>
  <section class="min-h-screen">
    <div class="flex justify-between items-center p-2">
      <h1 class="text-2xl font-bold text-gray-800">
        Sales Dashboard
      </h1>
      <div class="flex flex-row-reverse gap-4 items-start">
        <div
          v-if="userStore.loggedUser.granted.includes('')"
          class="inline-flex rounded-md shadow-xs relative"
          role="group"
          ref="dropdownWrapper"
        >
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
            @click="hideDropdown"
          >
            All
          </button>

          <button
            type="button"
            class="px-4 py-2 text-sm font-medium rounded-r-lg text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
            @click="toggleDropdown"
          >
            CSO
          </button>

          <!-- Dropdown Toggle -->
          <button
            v-if="showDropdown"
            @click="toggleMenu"
            class="w-36 p-2 text-xs border rounded-r-lg bg-white focus:ring-2 focus:ring-indigo-400 flex justify-between items-center"
          >
            {{ selectedOption || "Select CSO" }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <ul
            v-if="menuOpen"
            class="absolute top-full mt-1 w-full border rounded-lg bg-white shadow-lg z-10"
          >
            <li
              v-for="option in options"
              :key="option"
              @click="selectOption(option)"
              class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {{ option }}
            </li>
          </ul>
        </div>

        <!-- Period Dropdown -->
        <div class="relative w-36">
          <button
            v-if="userStore.loggedUser.granted.includes('su')"
            @click="togglePeriodMenu"
            class="w-full p-2 text-xs border rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 flex justify-between items-center"
          >
            {{ periodSelectedOption || "Select Period" }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <ul
            v-if="periodMenuOpen"
            class="absolute left-0 top-full mt-1 w-36 border rounded-lg bg-white shadow-lg z-10"
          >
            <li
              v-for="option in periodOptions"
              :key="option"
              @click="selectPeriod(option)"
              class="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="lg:col-span-2 py-4">
      <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            📊 Sales Summary
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-blue-50 to-blue-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-blue-200 text-blue-800 rounded-full">🎯</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Target Visit</h3>
            <p class="text-3xl font-extrabold text-blue-800">
              {{ dashboardStore.monthlySalesSummary.totalSales }}
            </p>
          </div>

          <!-- Visit Gap -->
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-red-50 to-red-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-red-200 text-red-800 rounded-full">⏳</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Visit Gap</h3>
            <p class="text-3xl font-extrabold text-red-800">
              {{ dashboardStore.monthlySalesSummary.pendingSales }}
            </p>
          </div>

          <!-- Visited -->
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-green-50 to-green-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-green-200 text-green-800 rounded-full">✅</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Visited</h3>
            <p class="text-3xl font-extrabold text-green-800">
              {{ dashboardStore.monthlySalesSummary.pendingSales }}
            </p>
          </div>

          <!-- Cancelled -->
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-gray-50 to-gray-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-gray-300 text-gray-700 rounded-full">❌</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Cancelled</h3>
            <p class="text-3xl font-extrabold text-gray-800">
              {{ dashboardStore.monthlySalesSummary.completedSales }}
            </p>
          </div>

          <!-- Cash Target -->
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-yellow-50 to-yellow-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-yellow-200 text-yellow-800 rounded-full">💰</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Cash Target</h3>
            <p class="text-3xl font-extrabold text-yellow-800">
              {{ dashboardStore.monthlySalesSummary.rejectedSales }}
            </p>
          </div>

          <!-- Cash Gap -->
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-pink-50 to-pink-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-pink-200 text-pink-800 rounded-full">📉</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Cash Gap</h3>
            <p class="text-3xl font-extrabold text-pink-800">
              {{ dashboardStore.monthlySalesSummary.refundedSales }}
            </p>
          </div>

          <!-- Cash Collect -->
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-indigo-50 to-indigo-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-indigo-200 text-indigo-800 rounded-full">📦</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Cash Collect</h3>
            <p class="text-3xl font-extrabold text-indigo-800">
              {{ dashboardStore.monthlySalesSummary.refundedSales }}
            </p>
          </div>

          <!-- Assigned -->
          <div
            class="p-5 rounded-xl text-center shadow-sm hover:shadow-md transition bg-gradient-to-r from-purple-50 to-purple-100"
          >
            <div class="flex justify-center mb-2">
              <span class="p-2 bg-purple-200 text-purple-800 rounded-full">📌</span>
            </div>
            <h3 class="text-sm font-semibold text-gray-600 mb-1">Assigned</h3>
            <p class="text-3xl font-extrabold text-purple-800">
              {{ dashboardStore.monthlySalesSummary.inProgress }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      
      <div class="lg:col-span-1">
        <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              📅 Today Sales Summary
            </h2>
          </div>

          <div class="space-y-4">
            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.todaySalesSummary.totalSales }}</p>
            </div>
            <div class="p-4 bg-yellow-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Pending Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.todaySalesSummary.pendingSales }}</p>
            </div>

            <div class="p-4 bg-green-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Completed Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.todaySalesSummary.completedSales }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              📊 Monthly Sales Summary
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.totalSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Pending Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.pendingSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Completed Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.completedSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Rejected Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.rejectedSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Refunded Sales</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.refundedSales }}</p>
            </div>

            <div class="p-4 bg-blue-50 rounded-xl text-center shadow-sm hover:shadow-md transition">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">In Progress</h3>
              <p class="text-3xl font-extrabold text-blue-800">{{ dashboardStore.monthlySalesSummary.inProgress }}</p>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Future Section: Add Charts, Tables, or Sales by Category -->
    <div class="mt-10">
      <!-- Placeholder for Sales Chart, Sales Table, etc. -->
      <p class="text-center text-gray-500 italic">More sales analytics coming soon...</p>
    </div>
  </section>
</template>



  
<script>

  import { useRoute } from 'vue-router'

  import { ref, onMounted, onBeforeUnmount } from "vue";
  //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
  import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
  import { useDashboardStore  } from "~/stores/modules/dashboardStore";
  import { useUserStore } from "~/stores/modules/userStore";

 definePageMeta({
    layout: 'default',   
    middleware: 'auth',
   });


   
  export default {
    
    components: {LinkBtn,Button,selectinput2},
    props:[''],
    data() {
      return {
        imageroot: "",
        showLoading: null,
        showDropdown: false,
        menuOpen: false, 
        selectedOption: null,
        options: ["Tania", "Amar", "Dinushika", "Sandari"],
        // period
        periodMenuOpen: false,
        periodSelectedOption: null,
        periodOptions: ["Daily", "Weekly", "Monthly", "Yearly"],
      }
    },

    async mounted() {
     
    },
    async created() {
      this.dashboardStore  = useDashboardStore();
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    },
    watch: {},
    computed: {
  
    },
     methods: {
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
        this.menuOpen = false;
      },
      hideDropdown() {
        this.showDropdown = false;
        this.menuOpen = false;
        this.selectedOption = null;
      },
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      selectOption(option) {
        this.selectedOption = option;
        this.menuOpen = false;
      },
togglePeriodMenu() {
    this.periodMenuOpen = !this.periodMenuOpen;
  },
  selectPeriod(option) {
    this.periodSelectedOption = option;
    this.periodMenuOpen = false;
  }
    },
    async beforeMount() {},
    head() {
      return {
        title: 'Intranet - Digital Tech Labs',
      }
    },
  }


  </script>
  
  <style scoped>

  </style>
  
  
  