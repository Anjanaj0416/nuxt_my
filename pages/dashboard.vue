<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />

      <section class="px-4 py-10 mt-20 lg:px-24">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Attendance Card -->
          <div class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <!-- <div class="bg-blue-100 p-2 rounded-full">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div> -->
                <h2 class="text-xl font-semibold text-gray-800">Today's Attendance</h2>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-1">Status: <span class="font-semibold text-green-600">Present</span></p>
            <p class="text-sm text-gray-600 mb-1">In Time: <span class="font-medium">8:00 AM</span></p>
            <p class="text-sm text-gray-600">Out Time: <span class="font-medium text-yellow-500">Pending</span></p>
          </div>

          <!-- Leave Balance Card -->
          <div class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-6">
              <!-- <div class="bg-blue-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
                </svg>
              </div> -->
              <h2 class="text-xl font-semibold text-gray-800">Leave Balance</h2>
            </div>

            <!-- Grid for 3 columns -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Casual Leave -->
              <div class="p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
                <h3 class="text-sm font-semibold text-gray-700 mb-1">Avalable Casual</h3>
                <p class="text-2xl font-bold text-indigo-700">14</p>
                <span class="inline-block mt-2 px-3 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  Full Balance: <span class="font-semibold text-gray-700">24</span>
                </span>
              </div>

              <!-- Annual Leave -->
              <div class="p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
                <h3 class="text-sm font-semibold text-gray-700 mb-1">Avalable Annual</h3>
                <p class="text-2xl font-bold text-indigo-700">12</p>
                <span class="inline-block mt-2 px-3 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  Full Balance: <span class="font-semibold text-gray-700">24</span>
                </span>
              </div>

              <!-- Medical Leave -->
              <div class="p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
                <h3 class="text-sm font-semibold text-gray-700 mb-1">Avalable Medical</h3>
                <p class="text-2xl font-bold text-indigo-700">7</p>
                <span class="inline-block mt-2 px-3 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  Full Balance: <span class="font-semibold text-gray-700">24</span>
                </span>
              </div>
            </div>
          </div>


          <!-- Employees Present Card -->
          <div class="bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-4">
              <!-- <div class="bg-blue-100 p-2 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6-5.63a4 4 0 11-8 0 4 4 0 018 0zm6 4a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div> -->
              <h2 class="text-xl font-semibold text-gray-800">Employees Present</h2>
            </div>

            <ul class="text-sm text-gray-700 max-h-32 overflow-y-auto pr-1 space-y-1">
              <li class="flex justify-between px-2 py-1 hover:bg-gray-100 rounded">
                <span>Nimal (Accounter)</span><span class="text-green-600 font-semibold">Present</span>
              </li>
              <li class="flex justify-between px-2 py-1 hover:bg-gray-100 rounded">
                <span>Sunil</span><span class="text-green-600 font-semibold">Present</span>
              </li>
              <li class="flex justify-between px-2 py-1 hover:bg-gray-100 rounded">
                <span>Kamal</span><span class="text-green-600 font-semibold">Present</span>
              </li>
              <li class="flex justify-between px-2 py-1 hover:bg-gray-100 rounded">
                <span>Chamara</span><span class="text-green-600 font-semibold">Present</span>
              </li>
              <li class="flex justify-between px-2 py-1 hover:bg-gray-100 rounded">
                <span>Roshan</span><span class="text-green-600 font-semibold">Present</span>
              </li>
            </ul>

          </div>
        </div>
        <div class="mt-6">
          <dash/>
        </div>
        

      </section>
    </div>
  </div>
</template>





<script>
import changelogin from '~/components/auth/changelogin'
import login from '~/components/auth/login'
import chart from '~/components/chart/chart.vue'
import dash from '~/components/dashboard/hr.vue'

//import { useApiStore } from '@/stores/useApiStore' 
import { onMounted } from 'vue'
//import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
//import { useSampleControllerStore } from '~/store/index';
definePageMeta({
    layout: 'default',
    middleware: 'auth',
   });

export default {
  components: {login,changelogin,chart,dash},
  props:[''],
  data() {
    return {
      loggedUser:{},
      email: "",
      accountName: "",
    };
  },
  async mounted() {
  
  
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
