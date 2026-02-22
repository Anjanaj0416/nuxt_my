<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-24">
    <div class="text-2xl uppercase mb-6"> Special Working Arrangement</div>

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <div class="col-span-3 bg-white ">

        <!-- Load Button -->
        <div class="flex mb-4 rounded-xl shadow-sm border p-4">
          <holidayloader @click="loadholidays" />
        </div>

      <!-- Table -->
      <div class="overflow-hidden border rounded-xl">

        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold">
          <div class="grid grid-cols-3 px-6 py-3 text-sm text-center">
            <div>Date</div>
            <div>Description</div>
            <div>Action</div>
          </div>
        </div>

        <!-- Body -->
        <div class="divide-y max-h-[500px] overflow-y-auto bg-white">

          <div
            v-for="holiday in swaStore.arrSWA"
            :key="holiday.id"
            class="grid grid-cols-3 px-6 py-4 text-sm text-center items-center hover:bg-blue-50 transition"
          >
            <!-- Date -->
            <div class="font-semibold text-gray-700">
              {{ holiday.date }}
            </div>

            <!-- Description -->
            <div class="text-gray-600">
              {{ holiday.description }}
            </div>

            <!-- Action -->
            <div class="flex justify-center gap-2">
              <button class="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md shadow">
                Delete
              </button>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="!swaStore.arrSWA.length"
            class="text-center py-10 text-gray-400"
          >
            No special working arrangements found
          </div>

        </div>
      </div>
    </div>

    <div class="col-span-2 bg-white border shadow-xl rounded-2xl p-6 space-y-2">
      <div class="border-b pb-4">
        <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
          Special Work Assignment
        </h2>
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
          Assignment Date
        </label>
        <input
          type="date"
          v-model="swa.date"
          class="w-full md:w-80 border rounded-lg px-3 py-2 text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                outline-none transition shadow-sm"
        />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700 flex items-center gap-1">
          Description
        </label>
        <textarea
          type="text"
          v-model="swa.description"
          placeholder="Example: Night shift support / Emergency duty"
          class="w-full md:w-80 border rounded-lg px-3 py-2 text-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                outline-none transition shadow-sm"
        />
      </div>
      <div class="border rounded-xl p-5 bg-gradient-to-br from-gray-50 to-gray-100 space-y-4">

        <div class="flex items-center justify-between">
          <label class="text-sm font-semibold text-gray-800 flex items-center gap-2">
            👥 Employee Assignment
          </label>
        </div>

        <!-- Toggle -->
        <div class="flex items-center justify-between bg-white border rounded-lg px-4 py-3 shadow-sm hover:shadow transition">
          <div>
            <p class="text-sm font-medium text-gray-700">
              Apply to all employees
            </p>
          </div>

          <toggleoption v-model="swa.isToApplyAll" label="" @click="changeATAL" />
        </div>

        <!-- Employee Selector -->
        <transition name="fade">
          <div v-show="!swa.isToApplyAll" class="space-y-2">
            <div class="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition">
              <label class="text-xs font-medium text-gray-500">
                Select specific employees
              </label>
              <!-- <inputtags_search
                class="w-full"
                :arrSelectedIDs="swa.empIds"
                :arrItems="arrEmp"
                ref="compits"
              /> -->
              <serachInput
                  :arr-items="reportStore.initData.initReport.arrEmp"
                  v-model="employeList"
                  @selectItem="setEmployee"
              />
            </div>

          </div>
        </transition>

      </div>
      <div class="flex justify-end gap-3 mt-8 border-t pt-4 ">
        <button
          @click="getClear"
          class="px-4 py-1.5 text-sm bg-white text-black border border-gray-300
                rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          @click="getProceed"
          class="px-5 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white border border-gray-300
                rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          Save
        </button>
      </div>

    </div>
  </div>

  </section>
</template>

<script>
import holidayloader from '~/components/customcontrol/hr/yearMonthSearch.vue'
import btnhr_Save from '~/components/hr/btnhr_button'
import toggleoption from '~/components/customcontrol/toggleoption'
import serachInput from "~/components/customcontrol/hr/SearchInput";
import * as Global from '@/assets/js/Global'
import { useHolidayStore } from '~/stores/modules/hr/holidayStore'
import { useSwaStore } from '~/stores/modules/hr/swaStore'
import { useReportStore } from "~/stores/modules/hr/reportStore";

//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    holidayloader,
    btnhr_Save,
    toggleoption,
    serachInput,
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

    this.reportStore = useReportStore();
    await this.reportStore.getReportInitData();

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
