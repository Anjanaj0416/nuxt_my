<template>
  <section>
    <div class="cssholidayview w-screen absolute mt-10 left-0 bg-white">
      <div class="w-3/4 bg-gray-500 mx-auto mt-16 rounded-md p-8 relative">
        <div class="cursor-pointer absolute top-0 right-0 m-8 flex gap-x-8">
          <holidayloader @click="loadSWA" />
          <div title="Exit Holiday View" class="text-gray-600 transform hover:scale-125 delay-75" @click="getclose">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div class="
            text-sm
            font-semibold
            uppercase
            bg-blue-600
            text-white
            px-4
            w-1/4
            text-center
            p-1
            rounded-md
          ">
          Special Working Arrangement
        </div>

        <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 w-full lg:gap-x-16">
          <div class="">
            <!-- Start Heading  -->
            <div class="
                grid grid-cols-3
                lg:grid-cols-3
                text-center
                w-full
                text-white
                bg-blue-800
                rounded-t-md
                p-2
              ">
              <div>Applied To All</div>
              <div>Date</div>
              <div>Description</div>
            </div>
            <!-- End Heading  -->

            <!-- start rows  -->
            <div v-if="swaStore.arrSWA.length > 0">
              <div class="cssrows overflow-y-scroll">
                <div v-for="swa in swaStore.arrSWA" :key="swa" :index="index"
                  class="text-white bg-gray-600 rounded-md p-2 mt-1">

                  <div class="grid grid-cols-3 lg:grid-cols-3 w-full">
                    <div class="text-center">
                      {{ swa.appliedToAll ? 'Yes' : 'No' }}
                    </div>
                    <div>{{ getFormatDate(swa.date) }}</div>
                    <div class="flex justify-between">
                      <div> {{ swa.description }}</div>
                      <div title="Delete record" class="cursor-pointer hover:text-red-800"
                        @click="deleteRecord(swa.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>

                    </div>

                  </div>

                  <div class="flex gap-2 p-2 ">
                    <div v-for="id in swa.empIds" :key="id" class="bg-gray-800 text-sm text-gray-500 p-1 rounded">
                      {{ getEmployee(id) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-sm pt-2 text-gray-200">
              No special work arrangements for selected month..
            </div>

            <!-- End rows  -->
          </div>
          <div class="bg-gray-600 rounded-md p-2 relative">
            <!-- Insert -->
            <div class="
                text-sm
                font-semibold
                uppercase
                bg-blue-600
                text-white
                w-32
                px-2
                p-1
                rounded-md
              ">
              Apply SWA
            </div>

            <div class="flex mt-2 gap-y-2 ml-2">
              <div class="text-white text-sm w-24">Date</div>
              <div>
                <input class="text-gray-600 rounded p-1 w-64" type="date" v-model="swa.date" />
              </div>
            </div>

            <div class="flex mt-2 gap-y-2 ml-2">
              <div class="text-white text-sm w-24">Description</div>
              <div>
                <input class="text-gray-600 rounded p-1 w-64" v-model="swa.description" type="text" />
              </div>
            </div>

            <div class="my-2">
              <div class="cssEmps border-gray-500 rounded p-2 p-2 rounded">
                <div class="text-white text-sm w-24">Employee/s</div>
                <div class="w-64 bg-gray-100 p-2 rounded" @click="changeATAL">
                  <toggleoption v-model="swa.isToApplyAll" label="Apply To All Employees" />
                </div>

                <div v-show="!swa.isToApplyAll">
                  <inputtags_search class="w-full" :arrSelectedIDs="swa.empIds" :arrItems="arrEmp" ref="compits" />
                </div>
              </div>
            </div>

            <div class="absolute bottom-0 right-0 m-4 flex gap-x-4">
              <btnhr_Save class="w-20 text-white" name="Clear" @click="getClear" />
              <btnhr_Save class="w-20 text-white" name="Proceed" @click="getProceed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import holidayloader from '~/components/hr/holidayloader'
import btnhr_Save from '~/components/hr/btnhr_button'

import toggleoption from '~/components/customcontrol/toggleoption'
import inputtags_search from '~/components/customcontrol/inputtags_search'

import * as Global from '@/assets/js/Global'
import { useHolidayStore } from '~/stores/modules/hr/holidayStore'
import { useSwaStore } from '~/stores/modules/hr/swaStore'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    holidayloader,
    btnhr_Save,
    toggleoption,
    inputtags_search,
  },
  data() {
    return {
      swa: {
        empIds: [],
        isToApplyAll: false,
        date: '',
        description: '',
      },
      selectedYear: null,
      selectedMonth: null,
      swaStore: null,
      showLoading: null,
    }
  },

  async created() {
    this.swaStore = useSwaStore();
    this.holidayStore = useHolidayStore();
    this.showLoading = this.$showLoading;

    this.init();
  },

  computed: {
    getEmployee() {
      return (empid) => {
        try {
          return this.arrEmp.filter((emp) => {
            return emp.id == empid
          })[0].value
        } catch {
          return ''
        }
      }
    },

    getFormatDate() {
      return (dt) => {
        if (dt == '' || dt == undefined) return ''
        return Global.getDateFormat1(new Date(dt))
      }
    },
  },
  methods: {
    getclose() {
      this.$emit('exitpopup')
    },

    // selectEmployee(empid) {
    //   let employee = this.arrEmp.filter((emp) => {
    //     return emp.id == empid
    //   })[0]
    //   this.swa.empIds.push(employee.id)
    //   this.arremployees.push(employee.value)
    // },

    async loadSWA(param) {
      this.selectedYear = param.year;
      this.selectedMonth = param.month;

      let req = { month: param.month, year: param.year }
      await this.swaStore.getSpecialWorkArrangement(req, this.showLoading)
    },

    async init() {
      var date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let req = { month: month, year: year };
      await this.holidayStore.getAssignedHolidays(req, this.showLoading);
    },

    async deleteRecord(id) {
      console.log("selectedYear:", this.selectedYear);
      console.log("selectedMonth:", this.selectedMonth);

      this.$showConfirm("Sure to delete this record?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = { id: id, user: this.loggeduser }
            await this.swaStore.deleteSpecialWorkArrangement(req, this.showLoading)
          }
        });
    },

    async getProceed() {
      if (!this.validate()) {
        return
      }

      this.$showConfirm("Sure to Proceed this SWA for the Employee/s?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = { swa: this.swa, user: this.loggeduser }
            //console.log( JSON.stringify(req))
            await this.swaStore.setSpecialWorkArrangement(req, this.showLoading)
          }
        });
    },

    changeATAL() {
      this.swa.empIds = []
      this.$refs.compits.resetItems()
    },

    getClear() {
      this.swa.description = ''
      this.swa.date = ''
      this.swa.isToApplyAll = false
      this.swa.empIds = []
      this.$refs.compits.resetItems()
    },

    validate() {
      if (this.swa.date == '') {
        this.show_error('Invalid Date')
        return false
      }

      if (this.swa.isToApplyAll == false && this.swa.empIds.length == 0) {
        this.show_error('No Employees Selected')
        return false
      }

      return true
    },
    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },
  },
  async beforeMount() {
    try {
    } catch (e) { }
  },
}
</script>

<style scoped>
.cssholidayview {
  min-height: 1500px;
}

.cssholidayview>div {
  min-height: 100vh;
}

.cssrows {
  height: 500px;
  scrollbar-width: thin;
}

.cssEmps>div {
  @apply py-2;
}
</style>
