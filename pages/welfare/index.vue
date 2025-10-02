<template>
    <div class="m-4 mt-20 lg:m-12 lg:mt-20">
      <section class="px-4 py-8 mt-14 lg:px-24">
        <div class="flex flex-row-reverse p-2">
          <router-link
            to="/welfare/member"
            class="relative flex items-center gap-2 px-4 py-2 bg-[#232B37]
                  text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 
                  transition-all duration-300 ease-in-out"
          >

            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" stroke-width="2" 
                stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span class="text-sm sm:text-base font-semibold tracking-wide">
              {{ t('AddMembersbtn') }}
            </span>
          </router-link>
        </div>

        {{ dashbordStore.salesDashboardList.totalMembers}}

        <!-- Dashboard Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <!-- Total Members -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg 
            bg-gradient-to-r from-gray-700 via-gray-800 to-black">
  <!-- Decorative circle -->
  <div class="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>

  <!-- Content -->
  <h2 class="text-sm font-medium opacity-90">{{ t('totalMembers') }}</h2>
  <p class="text-3xl font-bold mt-2">{{ dashbordStore.salesDashboardList.totalMembers }}</p>
  <p class="text-sm opacity-80 mt-1">
    {{ t('activeM') }}: {{ dashbordStore.salesDashboardList.suspendedMemberships }} 
    ({{ dashbordStore.salesDashboardList.dSuspendedMemberships_Percentage}})
    
    |
    {{ t('inactiveM') }}: {{ dashbordStore.salesDashboardList.inactiveMembers }}
    ({{ ((dashbordStore.salesDashboardList.inactiveMembers / dashbordStore.salesDashboardList.totalMembers) * 100).toFixed(1) }}%)
  </p>
</div>



          <!-- Pending Payments -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-black shadow-lg 
            bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-black opacity-10 rounded-full"></div>
            <h2 class="text-sm font-medium text-gray-600">{{ t('pendingPayment') }}</h2>
            <p class="text-3xl font-bold mt-2">15</p>
            <p class="text-sm text-gray-700 mt-1">Due this month</p>
          </div>


          <!-- Upcoming Events -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg 
            bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
            <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <h2 class="text-sm font-medium opacity-90">Upcoming Events</h2>
            <p class="text-3xl font-bold mt-2">3</p>
            <p class="text-sm opacity-80 mt-1">Next: Welfare Meetup</p>
          </div>
        </div>
      </section>

      <section class="px-4 py-8 lg:px-24">
        <div class="border-2 rounded-2xl">
          <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center m-8">
          <div class="text-2xl uppercase">{{ t('monthlyStatus') }}</div>
            <div class="w-full md:w-auto">
              <div class="mr-2">
                <select
                  v-model="selectedYear"
                  @change="setYearInStore"
                  class="mt-1 w-full p-2 text-xs border rounded-md bg-white focus:ring-2 focus:ring-indigo-400 overflow"
                >
                  <option disabled value="">{{ t('selectYear') }}</option>
                  <option
                    v-for="list in dashbordStore.dashBoardInitDetails.listYears"
                    :key="list"
                    :value="list"
                  >
                    {{ list }}
                  </option>
                </select>
              </div>
            </div>
        </div>
          <ol class="relative border-s border-gray-200 dark:border-gray-700 m-8 h-64 overflow-y-auto">                  
              <li v-for="(item, index) in monthlyData" class="mb-10 ms-4">
                <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"> {{ item.month }}</time>
                <div class="overflow-x-auto p-4">
                  <div class="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <!-- Table -->
                    <table class="w-full text-sm text-left text-gray-600 dark:text-gray-300 rounded-2xl overflow-hidden">
                      <thead>
                        <tr class="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-400 uppercase text-xs">
                          <th class="px-6 py-3">Type</th>
                          <th class="px-6 py-3">Color</th>
                          <th class="px-6 py-3">Category</th>
                          <th class="px-6 py-3 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100 dark:divide-gray-800">

                        <!-- Debit Row -->
                        <tr class="hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-red-900 dark:hover:to-orange-900 transition-all">
                          <td class="px-6 py-4 font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> Debit
                          </td>
                          <td class="px-6 py-4">
                            <span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800">Silver</span>
                          </td>
                          <td class="px-6 py-4">Laptop</td>
                          <td class="px-6 py-4 font-bold text-right">$2999</td>
                        </tr>

                        <!-- Credit Row -->
                        <tr class="hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 dark:hover:from-green-900 dark:hover:to-teal-900 transition-all">
                          <td class="px-6 py-4 font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span> Credit
                          </td>
                          <td class="px-6 py-4">
                            <span class="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800">White</span>
                          </td>
                          <td class="px-6 py-4">Laptop PC</td>
                          <td class="px-6 py-4 font-bold text-right">$1999</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
          </ol>
        </div>
      </section>

     
    </div>
  </template>
  
  <script setup>
    import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  </script>

  <script >

  import { useUserStore } from '~/stores/modules/userStore';
  import { useDashboardStore } from '~/stores/modules/welfare/dashboardStore';


  definePageMeta({
    layout: "society",
    middleware: "",
  });
    
    export default {
      components: {  },//headercomp, footercomp
      data() {
        return {
          selectedYear: "",
          monthlyData: [
            {
              month: "January 2025",
              expenses: "LKR 1,000,000.00",
              debts: "LKR 500,000.00",
              attendance: 45,
              view: "View"
            },
            {
              month: "February 2025",
              expenses: "LKR 1,200,000.00",
              debts: "LKR 600,000.00",
              attendance: 50,
              view: "View"
            },
            {
              month: "March 2025",
              expenses: "LKR 1,300,000.00",
              debts: "LKR 550,000.00",
              attendance: 55,
              view: "View"
            },
            {
              month: "April 2025",
              expenses: "LKR 1,150,000.00",
              debts: "LKR 400,000.00",
              attendance: 52,
              view: "View"
            },
            {
              month: "May 2025",
              expenses: "LKR 1,250,000.00",
              debts: "LKR 480,000.00",
              attendance: 57,
              view: "View"
            },
            {
              month: "June 2025",
              expenses: "LKR 1,100,000.00",
              debts: "LKR 450,000.00",
              attendance: 53,
              view: "View"
            },
            {
              month: "July 2025",
              expenses: "LKR 1,300,000.00",
              debts: "LKR 470,000.00",
              attendance: 60,
              view: "View"
            },
            {
              month: "August 2025",
              expenses: "LKR 1,400,000.00",
              debts: "LKR 500,000.00",
              attendance: 58,
              view: "View"
            },
            {
              month: "September 2025",
              expenses: "LKR 1,350,000.00",
              debts: "LKR 520,000.00",
              attendance: 62,
              view: "View"
            },
            {
              month: "October 2025",
              expenses: "LKR 1,450,000.00",
              debts: "LKR 530,000.00",
              attendance: 65,
              view: "View"
            },
            {
              month: "November 2025",
              expenses: "LKR 1,600,000.00",
              debts: "LKR 550,000.00",
              attendance: 70,
              view: "View"
            },
            {
              month: "December 2025",
              expenses: "LKR 1,700,000.00",
              debts: "LKR 600,000.00",
              attendance: 75,
              view: "View"
            }
          ],

        };
      },
      async created() {
      try {
        this.userStore = useUserStore();
        this.dashbordStore = useDashboardStore();

        await this.dashbordStore.GetInitDashBoard(this.showLoading);

        await this.dashbordStore.welfaredashBoard(this.showLoading);

        
        if(this.dashbordStore.dashBoardInitDetails?.listYears?.length){
          this.selectedYear = this.dashbordStore.dashBoardInitDetails.listYears[0] ;
          this.setYearInStore();
        }

      }
      catch { }
    },
    computed: {

    },
    methods: {
      setYearInStore() {
        // update store's selectedYear
        this.dashbordStore.selectedYear = this.selectedYear;

        // call the action with selectedYear
        this.dashbordStore.welfaredashBoard(this.selectedYear, this.showLoading);

        console.log(
          "Selected year updated in store:",
          this.dashbordStore.selectedYear
        );
      },
    }

    };
  </script>
  
  <style scoped>
  .btn {
    background-color: #072556;
  }
  /* common */
.ribbon {

 
  
}

.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: #3498db;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font: 700 18px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}

/* top left*/
.ribbon-top-left {
  top: -10px;
  left: -10px;
}
.ribbon-top-left::before,
.ribbon-top-left::after {
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon-top-left::before {
  top: 0;
  right: 0;
}
.ribbon-top-left::after {
  bottom: 0;
  left: 0;
}
.ribbon-top-left span {
  right: -25px;
  top: 30px;
  transform: rotate(-45deg);
}

/* top right*/
.ribbon-top-right {
  top: -10px;
  right: -10px;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 0;
}
.ribbon-top-right::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-right span {
  left: -25px;
  top: 30px;
  transform: rotate(45deg);
}




  </style>
  