<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />
      <div class="p-6 mb-8">
        <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

  <!-- Graph Section -->
  <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 ">
          <Chart />
          <Chart />
          <Chart />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Dashboard Widgets or Cards -->
          <div class="bg-white p-6 shadow-md rounded-lg">
            <div class="text-lg font-semibold">Total Sales</div>
            <div class="text-2xl">$4,200</div>
          </div>
          <div class="bg-white p-6 shadow-md rounded-lg">
            <div class="text-lg font-semibold">Active Users</div>
            <div class="text-2xl">1,245</div>
          </div>
          <div class="bg-white p-6 shadow-md rounded-lg">
            <div class="text-lg font-semibold">Pending Tasks</div>
            <div class="text-2xl">23</div>
          </div>
          <div class="bg-white p-6 shadow-md rounded-lg">
            <div class="text-lg font-semibold">Monthly Collection</div>
            <div class="text-2xl">$12,500</div>
          </div>
          <div class="bg-white p-6 shadow-md rounded-lg">
            <div class="text-lg font-semibold">Monthly Revenue</div>
            <div class="text-2xl">$18,200</div>
          </div>
          <div class="bg-white p-6 shadow-md rounded-lg">
            <div class="text-lg font-semibold">Best Collector of the Month</div>
            <div class="text-2xl">Shane</div>
          </div>
        </div>

      
      </div>
    </div>
  </div>
</template>



<script>
import changelogin from '~/components/auth/changelogin'
import login from '~/components/auth/login'
import chart from '~/components/chart/chart.vue'

//import { useApiStore } from '@/stores/useApiStore' 
import { onMounted } from 'vue'
//import { mapState, mapGetters, mapActions, mapMutations } from 'pinia'
//import { useSampleControllerStore } from '~/store/index';
definePageMeta({
    layout: 'default',
    middleware: 'auth',
   });

export default {
  
  components: {login,changelogin,chart},
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
      title: "Sign Up - AWS",
    };
  },
};
</script>

<style scoped>
  /* .btn{
    background-color: #ed9135; 
  } */
</style>
