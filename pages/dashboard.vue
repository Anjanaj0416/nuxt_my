<template>
  <div class="flex min-h-screen ">
    <!-- <Sidebar /> -->
    <div class="flex-1 flex flex-col">
      <!-- <Navbar /> -->

      <section class="px-4 py-8 mt-14 lg:px-24">
        <!-- <h1 class="text-2xl font-bold mb-4">Dashboard</h1> -->
        <div v-if="userStore.loggedUser.granted.includes('hradmin')" class="flex flex-row-reverse p-2">
          <router-link
            to="hr/workgroup"
            class="relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white rounded-lg shadow-md"
          >
            <h2 class="text-sm  font-semibold text-gray-700">
              Work Group
            </h2>
            <span
              class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-[10px] sm:text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full animate-bounce"
            >
              {{ workLoadStore.dashboard.workgroupjobcount || 0 }}
            </span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 mt-2">
          <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-indigo-600 to-blue-500">
            <img
              :src="backgroundImage"
              class="absolute inset-0 object-cover w-full h-full opacity-20"
              alt="Greeting Background"
            />
            <div class="">
              <h1 class="text-3xl font-bold mb-2">Hi, {{ userStore.loggedUser.name }}</h1>
              <h2 class="text-lg">{{ greetingMessage }} </h2>
              <div v-if="weatherInfo" class="mt-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg text-sm text-white/90 shadow ring-1 ring-white/10">
                📍 <strong>{{ weatherInfo.locationName }}</strong><br>
                🌡️ {{ weatherInfo.temp }}°C — {{ weatherInfo.description }}
              </div>
              <div v-if="locationError" class="text-sm text-red-400">
                ⚠️ {{ locationError }}
              </div>
            </div>
          </div>
          <!-- Attendance Card -->
          <div
            class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-md mx-auto"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-800">Today's Attendance</h2>
              <span
                :class="[
                  'px-3 py-1 text-xs font-semibold rounded-full',
                  status === 'Present'
                    ? 'text-green-700 bg-green-100'
                    : 'text-red-600 bg-red-100',
                ]"
              >
                {{ status }}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p class="mb-1">🕒 <span class="font-semibold">In Time:</span></p>
                <p class="text-gray-800 font-medium">
                  {{ inTime ? formatTime(inTime) : 'Not Marked' }}
                </p>
              </div>
              <div>
                <p class="mb-1">⏳ <span class="font-semibold">Out Time:</span></p>
                <p
                  :class="[
                    outTime ? 'text-gray-800' : 'text-yellow-600',
                    'font-medium',
                  ]"
                >
                  {{ outTime ? formatTime(outTime) : 'Pending' }}
                </p>
              </div>

              <div>
                <p class="mb-1">⌛ <span class="font-semibold">Worked:</span></p>
                <p class="text-blue-600 font-semibold">
                  {{ status === 'Present' ? workedHours : '00:00:00' }}
                </p>
              </div>

              <div>
                <p class="mb-1">💼 <span class="font-semibold">OT Hours:</span></p>
                <p class="text-purple-600 font-semibold">
                  {{ status === 'Present' ? otHours : '00:00:00' }}
                </p>
              </div>
            </div>

            <div class="mt-4">
              <p
                v-if="status === 'Absent'"
                class="text-sm font-semibold text-red-600"
              >
                Absent Today
              </p>
              
              <p v-else-if="isHalfDay" class="text-sm font-semibold text-red-600">
                Half Day 
              </p>
     
              <p v-else>
                <span v-if="isMorningShortLeave" class="block text-sm font-semibold text-orange-600">
                  Morning Short Leave (In after 9:00 AM - before 10.00 AM) 
                </span>
                <span v-if="isEveningShortLeave" class="block text-sm font-semibold text-orange-600">
                  Evening Short Leave (Left  after 3:30 PM - before 5:00 PM)
                </span>
                <span v-if="!isMorningShortLeave && !isEveningShortLeave" class="text-sm text-gray-500">
                  Full Day Attendance
                </span>
              </p>
            </div>
          </div>
          <!-- Leave Balance Card -->
          <div class="border border-blue-200 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-2 mb-4">
              <h2 class="text-xl font-bold text-gray-800">{{ userStore.loggedUser.name }} Leave Balance</h2>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <!-- Annual Leave -->
              <div class="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-center hover:shadow-md transition">
                <h3 class="font-semibold text-gray-600 mb-1">Annual</h3>
                <p class="text-2xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.leaveBalance.annualBalance }}</p>
                <p class="text-[15px] text-gray-500">of {{ dashboardStore.hrDashboardList.leaveBalance.annualEntitle }}</p>
              </div>
              <!-- Casual Leave -->
              <div class="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-center hover:shadow-md transition">
                <h3 class="font-semibold text-gray-600 mb-1">Casual</h3>
                <p class="text-2xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.leaveBalance.casualBalance }}</p>
                <p class="text-[15px] text-gray-500">of {{ dashboardStore.hrDashboardList.leaveBalance.casualEntitle }}</p>
              </div>
              <!-- Medical Leave -->
              <div class="p-3 bg-white border border-gray-200 rounded-xl shadow-sm text-center hover:shadow-md transition">
                <h3 class="font-semibold text-gray-600 mb-1">Sick</h3>
                <p class="text-2xl font-extrabold text-blue-800">{{ dashboardStore.hrDashboardList.leaveBalance.sickBalance }}</p>
                <p class="text-[15px] text-gray-500">of {{ dashboardStore.hrDashboardList.leaveBalance.sickEntitle }}</p>
              </div>
            </div>
          </div>
        </div>

<!-- {{ dashboardStore.hrDashboardList }} -->

        
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'HRAdmin'">
          <hrDash />
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'Supervisor'">
          <supervisor/>
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'Freelance'">
          <freelance/>
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'INTERN'">
          
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'executive'">
          
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'Finance'">
          <financeDash />
        </div>
        <div class="mt-6" v-if="userStore.loggedUser.userGroup === 'Sales'">
          <saleDash/>
        </div>

      <!-- {{ userStore.loggedUser }} -->
      <!-- {{ dashboardStore.hrDashboardList }} -->
      </section>
    </div>
  </div>
</template>





<script>
import changelogin from '~/components/auth/changelogin'
import login from '~/components/auth/login'
import chart from '~/components/chart/chart.vue'
import hrDash from '~/components/hr/dashboard/hr.vue'
import financeDash from '~/components/qms/dashboard/finance.vue'
import saleDash from '~/components/qms/dashboard/sales.vue'
import supervisor from '~/components/qms/dashboard/supervisor.vue'
import freelance from '~/components/qms/dashboard/freelance.vue'
import { useUserStore } from '~/stores/modules/userStore';
import { useDashboardStore  } from "~/stores/modules/dashboardStore";
import { useWorkLoadStore } from "~/stores/modules/hr/workLoadStore";

import { ref, computed, onMounted } from 'vue'




//import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
//import { useSampleControllerStore } from '~/store/index';
definePageMeta({
    layout: 'default',
    middleware: 'auth',
   });

export default {
  components: {
    login,
    changelogin,
    chart,
    hrDash,
    financeDash,
    saleDash,
    supervisor,
    freelance,
  },
  props:[''],
  data() {
    return {
      loggedUser:{},
      email: "",
      accountName: "",
      currentHour: new Date().getHours(),
      currentTime: new Date(),
      userLocation: {
        latitude: null,
        longitude: null
      },
      weatherInfo: null,
      locationError: '',
      inTime: null, 
      // outTime: new Date('2025-06-25T17:30:00') ,
      outTime: null  
    };
  },
  async created() {
    this.dashboardStore  = useDashboardStore();
    this.userStore = useUserStore();
    this.workLoadStore = useWorkLoadStore();
    this.showLoading = this.$showLoading;

    await this.dashboardStore.hrDashboard(this.showLoading);
    this.dashboardList = this.dashboardStore.hrDashboardList;

    const todayAttendance = this.dashboardList.todayAttendance;

    if (todayAttendance) {
      // 👇 Helper to merge today’s date + HH:mm
      const makeDate = (timeStr) => {
        if (!timeStr) return null;
        const [h, m] = timeStr.split(":").map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
      };

      this.inTime = makeDate(todayAttendance.inTime);
      this.outTime = makeDate(todayAttendance.outTime);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
    this.fetchWeather()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  computed: {
    greetingMessage() {
      const h = this.currentHour
      if (h >= 5 && h < 12) {
        return 'Good morning! Have a wonderful start to your day 🌅'
      } else if (h >= 12 && h < 17) {
        return 'Good afternoon! Keep up the great work ☀️'
      } else if (h >= 17 && h < 21) {
        return 'Good evening! Hope you had a productive day 🌇'
      } else {
        return 'Good night! Time to relax and recharge 🌙'
      }
    },
    backgroundImage() {
      const h = this.currentHour
      if (h >= 5 && h < 12) {
        return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80' // morning sunrise
      } else if (h >= 12 && h < 17) {
        return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80' // sunny afternoon
      } else if (h >= 17 && h < 21) {
        return 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1600&q=80' // sunset evening
      } else {
        return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80' // night stars
      }
    },
    status() {
      return this.inTime ? 'Present' : 'Absent'
    },
    workedHours() {
      if (!this.inTime) return '00:00:00'

      const endTime = this.outTime ? this.outTime : this.currentTime
      const ms = endTime - this.inTime
      if (ms <= 0) return '00:00:00'

      const totalSec = Math.floor(ms / 1000)
      const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0')
      const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')
      const secs = String(totalSec % 60).padStart(2, '0')

      return `${hrs}:${mins}:${secs}`
    },
    otHours() {
      if (!this.inTime) return '00:00:00'

      const standardEndTime = new Date(this.inTime.getTime() + 9 * 60 * 60 * 1000)
      const end = this.outTime ? this.outTime : this.currentTime

      const otMs = end - standardEndTime
      if (otMs <= 0) return '00:00:00'

      const totalSec = Math.floor(otMs / 1000)
      const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0')
      const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0')
      const secs = String(totalSec % 60).padStart(2, '0')

      return `${hrs}:${mins}:${secs}`
    },
    isHalfDay() {
      if (!this.inTime) return false;

      const hour = this.inTime.getHours();
      const min = this.inTime.getMinutes();

      const totalMinutes = hour * 60 + min;

      // 10:00 AM = 600 minutes
      // 12:30 PM = 750 minutes
      // Half-day is only between 10:00 and **before** 12:30
      return totalMinutes >= 600 && totalMinutes < 750;
    },

    isMorningShortLeave() {
      if (!this.inTime) return false;
      const minutes = this.inTime.getHours() * 60 + this.inTime.getMinutes();
      return minutes > 540 && minutes <= 600; // 9:00 AM to 10:00 AM
    },
    isEveningShortLeave() {
      const out = this.outTime ?? this.currentTime;
      if (!this.inTime || !out) return false;
      const minutes = out.getHours() * 60 + out.getMinutes();
      return minutes >= 930 && minutes <= 1020; // 3:30 PM to 5:00 PM
    },

    formattedInTime() {
      return this.formatTime(this.inTime)
    },
    formattedOutTime() {
      return this.formatTime(this.outTime)
    }
  },

  methods: {
    goToLogin() {
      this.$router.push('/user/login');
    },
    goToChangeLogin() {
      this.$router.push('/user/changelogin');
    },
    goToSignin() {
      this.$router.push("/signin");
    },
    formatTime(date) {
      if (!date) return '';
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    },
    fetchWeather() {
      fetch('https://wttr.in/?format=j1')
        .then(response => response.json())
        .then(data => {
          const current = data.current_condition[0];
          const area = data.nearest_area[0];

          this.weatherInfo = {
            temp: current.temp_C,
            description: current.weatherDesc[0].value,
            locationName: area.areaName[0].value
          };
        })
        .catch(error => {
          console.error("Weather fetch failed:", error);
          this.locationError = 'Failed to fetch weather data.';
        });
    }
  },
  
  head() {
    return {
      title: "Dashboard-Intranet",
    };
  },
};
</script>

<style scoped>
  /* .btn{
    background-color: #ed9135; 
  } */
</style>
