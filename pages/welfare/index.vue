<template>
    <div class="m-4 mt-20 lg:m-12 lg:mt-20">
      <section class="px-4 py-8 mt-14 lg:px-24">
        <div class="my-4">        
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class=" p-5 sm:p-6">
              <div class="relative">
                <input
                  type="search"
                  v-model="keyWord"
                  :placeholder="t('searchPlaceholderMember')"
                  class="w-full rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-800
                        focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <button
                  @click="searchMembers"
                  class="absolute right-2 top-1/2 -translate-y-1/2
                        bg-gray-600 hover:bg-gray-700
                        text-white px-6 py-2 rounded-full text-sm font-medium"
                >
                   {{ t('search') }}
                </button>
              </div>
              <div class="flex gap-2 mt-4 overflow-x-auto items-center whitespace-nowrap">
                <button
                  v-for="category in translatedCategories"
                  :key="category.id"
                  @click="toggleCategory(category)"
                  :class="[
                    'relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 border',
                    activeCategoryId === category.id
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  {{ category.value }}
                </button>
              </div>




            </div>
          </div>
        </div>

        <!-- <pre>{{ JSON.stringify(dashbordStore.salesDashboardList, null, 2) }}</pre> -->

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
          <!-- 🧍 Total Members -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium opacity-90">{{ t('totalMembers') }}</h2>
              <i class="fa-solid fa-users text-white/70 text-xl"></i>
            </div>
            <p class="text-4xl font-extrabold mt-3">
              {{ dashbordStore.salesDashboardList.totalMembers || 0 }}
            </p>
            <p class="text-sm opacity-80 mt-1">
              {{ t('activeM') }}: {{ dashbordStore.salesDashboardList.suspendedMemberships }} 
              ({{ dashbordStore.salesDashboardList.dSuspendedMemberships_Percentage}})
              
              |
              {{ t('inactiveM') }}: {{ dashbordStore.salesDashboardList.inactiveMembers }}
              ({{ dashbordStore.salesDashboardList.dueMembershipsMorthan3Months_Percentage}})

            </p>
          </div>

          <!-- 💰 Bank Balance -->
          <div
            class="relative overflow-hidden rounded-2xl p-6 text-black shadow-lg 
              bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
            <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-black opacity-10 rounded-full"></div>
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium text-gray-800">{{ t('bankBalance') }}</h2>
              <i class="fa-solid fa-piggy-bank text-gray-700 text-xl"></i>
            </div>
            <p class="text-4xl font-extrabold mt-3">
              {{ dashbordStore.salesDashboardList.bankBalanceUpToNow?.toLocaleString() || 0 }}
            </p>
            <p class="text-sm text-gray-700 mt-2">Up to now</p>
          </div>

          <!-- 📉 Total Expense -->
          <div
            class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg 
                    bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700"
          >
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium opacity-90">{{ t('expanees') }}</h2>
              <i class="fa-solid fa-arrow-trend-down text-white/70 text-xl"></i>
            </div>
            <p class="text-4xl font-extrabold mt-3">
              {{ dashbordStore.salesDashboardList.totalExpense || 0 }}
            </p>
            <p class="text-sm opacity-80 mt-2">Expenses recorded</p>
          </div>

          <!-- ⚰️ Total Deaths -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-black">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium opacity-90">{{ t('totalDeaths') }}</h2>
              <i class="fa-solid fa-skull-crossbones text-white/70 text-xl"></i>
            </div>
            <p class="text-4xl font-extrabold mt-3">
              {{ dashbordStore.salesDashboardList.totalDeaths || 0 }}
            </p>
            <p class="text-sm opacity-80 mt-2">Members reported</p>
          </div>

          <!-- 🎁 Benefits Given -->
          <div
            class="relative overflow-hidden rounded-2xl p-6 text-black shadow-lg 
              bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
            <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-black opacity-10 rounded-full"></div>
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium opacity-90">{{ t('benefitsGiven') }}</h2>
              <i class="fa-solid fa-hand-holding-heart text-white/70 text-xl"></i>
            </div>
            <p class="text-4xl font-extrabold mt-3">
              {{ dashbordStore.salesDashboardList.totalBenifitsGiven || 0 }}
            </p>
            <p class="text-sm opacity-80 mt-2">
              ({{ dashbordStore.salesDashboardList.totalBenifitsGiven_Percentage}})
            </p>
          </div>

        </div>

      </section>

      <section class="px-4 py-2 lg:px-24">
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
          <ol class="relative border-s border-gray-200 0 m-8 h-64 overflow-y-auto">                  
              <li v-for="(item, index) in dashbordStore.salesDashboardList.monthWiseDetails" class="mb-10 ms-4">
                <div class="absolute w-3 h-3 bg-gray-800 rounded-full mt-1.5 -start-1.5 border border-white "></div>
                <time class="mb-1 text-sm font-normal leading-none text-gray-400"> {{ item.month }}</time>
                <div class="overflow-x-auto p-4">
                  <div class="bg-white rounded-2xl border border-gray-200  overflow-hidden">
                    <!-- Table -->
                    <table class="w-full text-sm text-left text-gray-600  rounded-2xl overflow-hidden">
                      <thead>
                        <tr class="text-gray-700 text-xs">
                          <th class="px-6 py-3"></th>
                          <th class="px-6 py-3">{{ t('openingBankBalance') }}</th>
                          <th class="px-6 py-3">{{ t('monthlyMemberShipFeePerMember') }}</th>
                          <th class="px-6 py-3">{{ t('totalMemberShipFeeCollection') }}</th>
                          <th class="px-6 py-3 text-right">{{ t('benifitsPerDeath') }}</th>
                          <th class="px-6 py-3">{{ t('totalDeaths') }}</th>
                          <th class="px-6 py-3">{{ t('totalBenifitsGiven') }}</th>
                          <th class="px-6 py-3">{{ t('totalIncomeByGoodIssuing') }}</th>
                          <th class="px-6 py-3 text-right">{{ t('expenses') }}</th>
                          <th class="px-6 py-3 text-right">{{ t('closingBankBalance') }}</th>
                        </tr>

                      </thead>
                      <tbody class="divide-y divide-gray-100 dark:divide-gray-800">

                        <!-- Debit Row -->
                        <tr class="hover:bg-gray-800 hover:text-white  transition-all">
                          <td class="px-6 py-4 font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> {{ t('debit') }}
                          </td>
                          <td class="px-6 py-3">LKR:{{ item.openingBankBalance }}</td>
                          <td class="px-6 py-3">LKR:{{ item.monthlyMemberShipFeePerMember }}</td>
                          <td class="px-6 py-3">LKR:{{ item.totalMemberShipFeeCollection }}</td>
                          <td class="px-6 py-3">LKR:{{ item.benifitsPerDeath }}</td>
                          <td class="px-6 py-3">LKR:{{ item.totalDeaths }}</td>
                          <td class="px-6 py-3">LKR:{{ item.totalBenifitsGiven }}</td>
                          <td class="px-6 py-3">LKR:{{ item.totalIncomeByGoodIssuing }}</td>
                          <td class="px-6 py-3">LKR:{{ item.expenses }}</td>
                          <td class="px-6 py-3">LKR:{{ item.closingBankBalance }}</td>
                        </tr>
                        <!-- Credit Row -->
                        <tr class="hover:bg-gray-800 hover:text-white  transition-all">
                          <td class="px-6 py-4 font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span> {{ t('credit') }}
                          </td>
                          <!-- <td class="px-6 py-3">LKR:{{ item.expenses }}</td> -->
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
          </ol>
        </div>
      </section>
      <!-- <div>{{ nameTranslated.name }}</div> -->
     
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
      middleware: "auth",

  });
    
    export default {
      components: {  },//headercomp, footercomp
      data() {
        return {
          selectedYear: "",
          currentYear: new Date().getFullYear(),
          keyWord: '',
          activeCategoryId: 190,
          categories: [
            { id: 190, value: this.$t('all') },
            { id: 100, value: this.$t('BookId') },
            { id: 110, value: this.$t('Name') },
            { id: 120, value: this.$t('Mobile')},
            { id: 130, value: this.$t('Address') },
            { id: 140, value: this.$t('Nic')},
          ],
        };
      },
      async created() {
      try {
        this.userStore = useUserStore();
        this.dashbordStore = useDashboardStore();

        await this.dashbordStore.GetInitDashBoard(this.showLoading);

        await this.dashbordStore.welfaredashBoard(this.showLoading);

        //translations
        const dashboardData = await this.dashbordStore.test(this.showLoading);
        await this.translateDashboardData(dashboardData);
        
        if(this.dashbordStore.dashBoardInitDetails?.listYears?.length){
          if (this.dashbordStore.dashBoardInitDetails.listYears.includes(this.currentYear.toString())) {
            this.selectedYear = this.currentYear.toString();
          } else {
            // fallback: use first year in list
            this.selectedYear = this.dashbordStore.dashBoardInitDetails.listYears[0];
          }
          this.setYearInStore();
        }
        this.$watch(
          () => this.$i18n.locale,
          async () => {
            await this.translateDashboardData(this.dashbordStore.salesDashboardList);
          }
        );

      }
      catch { }
    },
    computed: {
      translatedCategories() {
        return [
          { id: 190, value: this.$t('all') },
          { id: 100, value: this.$t('BookId') },
          { id: 110, value: this.$t('Name') },
          { id: 120, value: this.$t('Mobile') },
          { id: 130, value: this.$t('Address') },
          { id: 140, value: this.$t('Nic') },
        ]
      }
    },

    methods: {
      setYearInStore() {
        this.dashbordStore.selectedYear = this.selectedYear;
        this.dashbordStore.welfaredashBoard(this.selectedYear, this.showLoading);
      },

      // Example translations
      async translateDashboardData(data) {
        const { autoTranslate } = useAutoTranslate();
        if (!data) return;

        data.nameTranslated = await autoTranslate(data.name?.toString() || "0");
        data.adreesTranslated = await autoTranslate(data.adrees?.toString() || "0");
        data.subjectTranslated = await autoTranslate(data.subject?.toString() || "0");
        data.districtTranslated = await autoTranslate(data.district?.toString() || "0");
      },

      toggleCategory(category) {
        if (this.activeCategoryId === category.id) {
          this.activeCategoryId = null;
        } else {
          this.activeCategoryId = category.id;
        }
        // console.log('Active Category ID:', this.activeCategoryId);
      },

      searchMembers() {
        const query = {
          keyWord: this.keyWord || '',
          category: this.activeCategoryId || '',
        };
        this.$router.push({ path: '/welfare/member', query });
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
  