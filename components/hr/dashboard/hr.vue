<template>
  <section class="">
      <div class="flex flex-col lg:flex-row gap-8 py-2">
        <!-- Attendance Overview -->
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex-1">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Today Attendance Overview
            </h2>
          </div>

          <!-- <p class="text-md font-medium text-gray-600 mb-6">
              Overall Count Employees:
              <span class="font-bold text-blue-700">{{ dashboardStore.hrDashboardList.todayEmployeeSummary.totalEmployees }}</span>
          </p> -->

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1"> Overall Count Employees</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.todayEmployeeSummary.totalEmployees }}</p>
            </div>
            <!-- Present -->
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Today Present Count</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.todayEmployeeSummary.todayPresent }}</p>
            </div>
            <!-- Absent -->
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Today Absent Count</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.todayEmployeeSummary.todayAbsent }}</p>
            </div>
          </div>
        </div>
        <!-- Management Card -->
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full lg:max-w-sm">
          <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
              </svg>
              Management
              </h2>
          </div>

          <h3 class="text-lg font-semibold text-gray-700 mb-4">Today's Managers</h3>

          <ul class="space-y-2 text-sm text-gray-600">
              <li
              v-for="(manager, index) in dashboardStore.hrDashboardList.todayManagers"
              :key="manager.id"
              class="flex items-center justify-between px-3 py-2 bg-white border border-gray-100 rounded-md shadow-sm hover:bg-gray-50"
              >
              <span>{{ index + 1 }}. {{ manager.name }}</span>
              <span
                  class="text-green-600 font-medium text-xs"
              >{{ manager.status }}</span>
              </li>
          </ul>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 py-2">
        <div class=" border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 class="text-xl font-bold text-gray-600 mb-4 flex items-center gap-2">
                🎂 Upcoming Birthdays
            </h2>
            <ul class="space-y-2 text-sm text-gray-600">
              <li
                v-for="(manager, index) in dashboardStore.hrDashboardList.todayManagers"
                :key="manager.id"
                class="flex items-center justify-between px-3 py-2 bg-white border border-gray-100 rounded-md shadow-sm hover:bg-gray-50"
              >
                <span>{{ index + 1 }}. {{ manager.name }}</span>
                <span class="text-green-600 font-medium text-xs">{{ manager.status }}</span>
              </li>
            </ul>
        </div>
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <h2 class="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              🕒 Approval Status
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1"> Leaves</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.approvalStatus.leaves }}</p>
            </div>
    
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">OT Request</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.approvalStatus.otRequest }}</p>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Movements</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.approvalStatus.movements }}</p>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Rectifications</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.approvalStatus.rectifications }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 py-2">
        <div class="border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          <h2 class="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            📊 Monthly Workforce Insights
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-6 gap-4">
            
            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Unpaid Leave</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.monthNoOfNoPays }}</p>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Overtime Hours</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.monthTotalOverTimes }}</p>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Leave Days Taken</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.monthTotalLeave }}</p>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Work Movements</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.monthTotalMovement }}</p>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Corrections Made</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.monthTotalRectification }}</p>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
              <h3 class="text-sm font-semibold text-gray-600 mb-1">Total Worked Hours</h3>
              <p class="text-4xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.monthTotalWorkedHours }}</p>
            </div>

          </div>
        </div>
      </div>

  </section>
</template>


  
  <script>
 import { useRoute } from 'vue-router'
 import { useDashboardStore  } from "~/stores/modules/dashboardStore";

 //import { useQuotationStore } from "~/stores/modules/qms/quotationStore";
 
 import LinkBtn from "~/components/customcontrol/Link";
  import Button from "~/components/customcontrol/Button";
  import selectinput2 from "~/components/customcontrol/selectinput2";
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
       
      }
    },
    async mounted() {
     
    },
    async created() {
      this.dashboardStore  = useDashboardStore();
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      this.imageroot = this.userStore.loggedUser.resourceURLRoot;

      await this.dashboardStore.hrDashboard(this.showLoading);
      this.dashboardList = this.dashboardStore.hrDashboardList;
    },
    watch: {},
    computed: {
  
    },
    methods: {
     
    
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
  </style>
  
  
  