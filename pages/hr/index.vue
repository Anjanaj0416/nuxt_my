<template>
  <section>
    <!-- Start Top Header -->

    <div
      class="flex flex-col items-center justify-between h-24 px-4 pt-6 my-10 bg-gray-100 cssTop lg:flex-row md:flex-row">
      <div class="my-2 text-lg font-bold capitalize lg:text-xl lg:my-0">
        <div class="flex gap-x-4 lg:gap-x-8">
          <div class="relative cssmenu_sec" v-show="userStore.loggedUser.granted.indexOf('hradmin') > -1 ||
            userStore.loggedUser.granted.indexOf('hr_mgr') > -1
            ">

            <!-- <div class="cursor-pointer" @click="ismenuopen = !ismenuopen">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <hr_menu v-show="ismenuopen" class="absolute top-0 left-0 z-50 mt-12 ml-2" @click="clickmenuitem" /> -->
          </div>

          <div class="flex items-center justify-center " v-show="userStore.loggedUser.granted.includes('hradmin')">

            <search_dashboard placeholder="Search Employee" :arrsections="arrsections_DBSerach"
              @getsearch="search_begin_DBSerach" @goToAddNew="GoToAddNew" @goToClear="GoToClear" />
          </div>
        </div>
      </div>

      <div
        class="flex-col items-center hidden -my-4 lg:pt-4 lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4 lg:gap-x-8 md:pt-4 md:flex-row lg:flex">
        <!-- Hide on mobile -->
        <div class="mr-8" v-show="userStore.loggedUser.userGroup === 'Supervisor'">
          <!-- HRAdmin -->
          <btnwgstatus name="workgroup" :wgjobcount="workLoadStore.dashboard.workgroupjobcount" @click="getviewwg" />
        </div>

      </div>
    </div>
    <!-- End  Top Header -->

    <div class="px-2 mt-4 lg:px-12">

      <div class="csscontent">
        <div
          class="grid grid-cols-1 gap-2  font-bold text-center text-gray-700 border border-gray-300 bg-white cssheader lg:hidden lg:grid-cols-8 rounded-t-md">

          <div class="flex flex-col items-center md:pt-4 md:flex-row sm:gap-y-0 lg:hidden sm:justify-start">
            <div v-show="userStore.loggedUser.userGroup === 'Supervisor'">
              <btnwgstatus name="workgroup" :wgjobcount="workLoadStore.dashboard.workgroupjobcount"
                @click="getviewwg" />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mb-4">
          <!-- Title -->
          <h2 class="text-2xl font-bold uppercase text-gray-800">
            Employees List
          </h2>

          <!-- Optional: Add a small subtitle or count -->
          <span class="text-sm text-gray-500">
            {{ employeeStore.alempdetails.length }} Employees
          </span>
        </div>


        <!-- Employees List  -->
        <div class="mb-4">
          <div class="mt-1 text-sm rounded-md cursor-pointer hover:text-gray-700 hover:bg-gray-100 border-2"
            :class="emp.isresigned ? 'border-red-500' : 'border-gray-300'"
            v-for="(emp, index) in employeeStore.alempdetails" :key="emp">

            <div class="rounded-md">
              <!-- Employee Header -->
              <div class="flex items-center justify-between px-4 mt-2">
                <!-- Left: Name & Emp No -->
                <div>
                  <h2 class="text-normal font-semibold text-gray-800">{{ emp.empName }}</h2>
                  <p class="text-sm text-gray-500">#{{ emp.empNo }}</p>
                  <span v-if="emp.isresigned"
                    class="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Resigned
                  </span>
                </div>

                <!-- Right: Small Image -->
                <img class="w-12 h-12 rounded-full object-cover border hover:scale-105 transition"
                  :src="userStore.loggedUser.resourceURLRoot + emp.image" alt="Employee" />
              </div>


              <!-- Employee Info -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 px-4 mt-1 text-sm text-gray-700">
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-500">Contact</span>
                  <span>{{ emp.contact }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-500">Email</span>
                  <span>{{ emp.email }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-500">Designation</span>
                  <span>{{ emp.designation }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-500">Supervisor</span>
                  <span>{{ emp.supervisor }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-semibold text-gray-500">Department</span>
                  <span>{{ emp.department }}</span>
                </div>
              </div>

              <!-- {{userStore.loggedUser}} -->
              <div class="flex flex-wrap justify-end gap-4 px-4 pb-2 mt-2">
                <!-- Employee Details -->
                <button @click="init_employee(emp.id)"
                  class="px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 text-sm">
                  👤 Details
                </button>
                <button @click.stop="init_attendence(emp.empNo, emp.id)"
                  class="px-3 py-1 rounded-lg bg-green-100 hover:bg-green-200 text-green-600 text-sm">
                  🕒 Attendance
                </button>
                <button
                  v-show="!emp.isOTAllow && (userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.granted.includes('hradmin'))"
                  @click="init_otapply(index, emp.empNo); cur_sec = 'otapply'; selectedrow = emp.id; isSecClose = false;"
                  class="px-3 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-600 text-sm">
                  ➕ Apply OT
                </button>
                <button
                  v-show="userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.granted.includes('hradmin')"
                  @click="init_absense(emp.empNo, emp.id); cur_sec = 'absense'; selectedrow = emp.id; isSecClose = false;"
                  class="px-3 py-1 rounded-lg bg-yellow-100 hover:bg-yellow-200 text-yellow-600 text-sm">
                  📅 Leave
                </button>
                <button
                  v-show="userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.granted.includes('hradmin')"
                  @click="init_movement(emp.empNo, emp.id); cur_sec = 'movement'; selectedrow = emp.id; isSecClose = false;"
                  class="px-3 py-1 rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-600 text-sm">
                  🚶 Movement
                </button>
                <button
                  v-show="userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.granted.includes('hradmin')"
                  @click="init_timecard(emp.empNo, index); cur_sec = 'timecard'; selectedrow = emp.id; isSecClose = false;"
                  class="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">
                  ⏱️ Time Card
                </button>
              </div>


              <!-- Card Sections -->
              <!-- View Emplyee  Details -->

              <div v-show="cur_sec.toLowerCase() === 'viewemployee' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <empmoredetails :empid="emp.id" @exit="exit" @setDeleteEmployee="setDeleteEmployee"
                  @setEmployee="setEmployee" />
              </div>

              <!-- view Attendence -->
              <div v-show="cur_sec.toLowerCase() === 'attendence' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <attendence v-if="!isLoading" ref="atten" :empno="emp.empNo" :empname="emp.empName"
                  :isOTEntitled="isOTEntitled"
                  @hook:created="console.log('attendence component created for empno:', emp.empNo)" @exit="exit" />
              </div>

              <!-- view Absense -->
              <div v-show="cur_sec.toLowerCase() === 'absense' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <absenselist ref="absense" :empno="emp.empNo" @exit="exit" @absenseapply="goto_absenseapply" />
              </div>
              <!-- End view Absense -->

              <!-- view Absense Create -->
              <div v-show="cur_sec.toLowerCase() === 'absenseapply' &&
                selectedrow == emp.id &&
                !isSecClose
                ">

                <absencecreate ref="absenseapply" :empno="emp.empNo" :leaveyear="leaveYear" :fromDate="dtfrom"
                  :toDate="dtto" @goto_absenceview="goto_absenceview" />
              </div>
              <!-- End view Absense Create -->

              <!-- view Rectify -->
              <!-- <div v-show="cur_sec.toLowerCase() === 'rectify' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <rectifylist v-if="!isLoading" ref="atten" :empno="emp.empNo" :empname="emp.empName"
                  :isOTEntitled="isOTEntitled" @exit="exit" />
              </div> -->
              <!-- End view Rectify -->

              <!-- view movement -->
              <div v-show="cur_sec.toLowerCase() === 'movement' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <movementlist ref="movement" :empno="emp.empNo" @exit="exit" @movementapply="goto_movementapply" />
              </div>

              <div v-show="cur_sec.toLowerCase() === 'movementapply' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <movementcreate ref="movementapply" :empno="emp.empNo" :dtFrom=dtfrom :dtTo=dtto
                  @goto_movementview="goto_movementview" />
              </div>
              <!-- End view movement -->

              <!-- Start OT Apply -->
              <div v-show="cur_sec.toLowerCase() == 'otapply' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <Ot_apply_list :empno="emp.empNo" ref="otapply" @exit="exit" />
              </div>
              <!-- End OT Apply -->

              <!-- Job Card Details   -->

              <div v-show="cur_sec.toLowerCase() == 'timecard' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <timecarddetails ref="timecardcomp" :empno="emp.empNo" @exit="exit" />
              </div>
              <!-- End Job Card Details   -->
            </div>

            <!--End  Employees List -->
          </div>
        </div>
      </div>
      <!--  Holiday  -->
      <div>
        <!-- <holidaylist v-show="cur_sec.toLowerCase() == 'holiday'" ref="compholiday" @exitpopup="exitpopup" /> -->
      </div>
      <!-- End  Holiday  -->

      <!--  Special Work Arrangemnt  -->
      <div>
        <!-- <special_work_arrangement v-show="cur_sec.toLowerCase() == 'special_work_arrangement'"
          ref="comp_special_work_arrangement" @exitpopup="exitpopup" /> -->
      </div>
      <!-- End  Special Work Arrangemnt  -->

      <!--  Employee Update  -->
      <div>
        <empupdate ref="empupdatecomp" v-show="cur_sec.toLowerCase() == 'updateemployee'" @exitpopup="exitpopup"
          @empSaveCompletion="empSaveCompletion" />
      </div>
      <!-- End Employee Update   -->
    </div>

    <AddEdit v-if="isAddEdit" ref="compAddEdit" @close="isAddEdit = false" />


  </section>
</template>

<script>
//// import * as Global from '@/assets/js/Global'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import selectinput2 from '~/components/customcontrol/selectinput2'
import search_dashboard from '~/components/customcontrol/search_bysections_ver2'
import btnwgstatus from '~/components/hr/btnwgstatus'

import empmoredetails from '~/components/hr/empmoredetails'
import attendence from '~/components/hr/attendence'

import absenselist from '~/components/hr/absenselist'
import absencecreate from '~/components/hr/absencecreate'

import rectifylist from '~/components/hr/rectifylist'

import movementlist from '~/components/hr/movementlist'
import movementcreate from '~/components/hr/movementcreate'

//import hr_menu from '~/components/hr/hr_menu'
import holidaylist from '~/components/hr/holidaylist'

import special_work_arrangement from '~/components/hr/special_work_arrangement'

import empupdate from '~/components/hr/empupdate'
import Ot_apply_list from '~/components/hr/ot_apply_list.vue'
import timecarddetails from '~/components/hr/timecarddetails.vue'
import Button from "~/components/customcontrol/Button";
import SearchComp from "~/components/customcontrol/SearchComp";
import AddEdit from "~/components/hr/addEditEmp.vue"

import { useEmployeeStore } from "~/stores/modules/hr/employeeStore";
import { useWorkLoadStore } from "~/stores/modules/hr/workLoadStore";
import { useMovementStore } from '~/stores/modules/hr/movementStore'
import { useTimeCardStore } from '~/stores/modules/hr/timeCardStore'
import { useLeaveStore } from '~/stores/modules/hr/leaveStore'
import { useAttendanceStore } from '~/stores/modules/hr/attendanceStore'
import { useUserStore } from '~/stores/modules/userStore'



definePageMeta({
  layout: 'default',
  middleware: 'auth',
  ssr: false,
});
export default {
  layout: 'default',
  components: {
    search_dashboard,
    btnwgstatus,
    selectinput2,
    empmoredetails,
    attendence,
    absenselist,
    rectifylist,
    absencecreate,
    movementlist,
    movementcreate,
    ///hr_menu,
    holidaylist,
    empupdate,
    Ot_apply_list,
    timecarddetails,
    special_work_arrangement,
    Button,
    SearchComp,
    AddEdit,
  },
  data() {
    return {

      arrsections_DBSerach: [
        { name: 'Emp.Name', code: 100, selected: false },
        { name: 'Emp.No', code: 101, selected: false },
        { name: 'Contact', code: 102, selected: false },
        { name: 'Designation', code: 103, selected: false },
        { name: 'Supervisor', code: 104, selected: false },
        { name: 'Department', code: 105, selected: false },
        { name: 'Calling Name', code: 106, selected: true },
        { name: 'Resigned', code: 107, selected: false },
      ],

      cur_page: 1,
      cur_sec: '',
      isSecClose: false,
      ismenuopen: false,
      isOTEntitled: true,
      leaveYear: -1,
      assetsBaseUrl: null,
      dtfrom: null,
      dtto: null,
      isLoading: false,
      showLoading: null,
      isAddEdit: false,
    }
  },

  async created() {
    try {
      this.userStore = useUserStore();
      this.employeeStore = useEmployeeStore();
      this.workLoadStore = useWorkLoadStore();
      this.movementStore = useMovementStore();
      this.timeCardStore = useTimeCardStore();
      this.leaveStore = useLeaveStore();
      this.attendanceStore = useAttendanceStore();
      this.showLoading = this.$showLoading;

      await this.employeeStore.loadInitEmployee(this.showLoading);

    } catch (error) {
      console.error("error:", error)
    }
  },

  async mounted() {
    const date = new Date();
    this.dtfrom = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1));
    this.dtto = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  },

  computed: {
  },
  async beforeMount() {
    this.cur_sec = '';
    this.selectedrow = null;

    let isHrAdmin = this.userStore.loggedUser.granted.includes('hradmin');

    if (isHrAdmin) {
      const req = {
        searchval: "",
        searchby: 101,
      }

      this.search_begin_DBSerach(req);
    } else {
      const req = {
        searchval: this.userStore.loggedUser.userName,
        searchby: 101,
      }
      this.search_begin_DBSerach(req);
    }

    this.assetsBaseUrl = localStorage.getItem("assetsBaseUrl");
  },

  methods: {
    async exit() {
      this.isSecClose = true
      this.cur_sec = ''

      await this.employeeStore.clearAll();

    },

    async GoToClear() {
      const req = {
        keyword: "",
        searchby: 101,
      }
      await this.employeeStore.searchEmployees(req, this.showLoading)
    },

    GoToAddNew() {
      this.employeeStore.clearEmployee();
      this.isAddEdit = true;
    },

    exitpopup() {
      this.cur_sec = ''
    },
    gotoUserguide() {
      this.$router.push('/hr/userguide')
    },

    //  organizelistdata() {
    //     var clonedArray = JSON.parse(JSON.stringify(this.alempdetails))
    // clonedArray.forEach((element) => {
    //   element.customerid = this.getcustomer(element.customerid)
    //   element.salesrepid = this.getrso(element.salesrepid)
    //   element.dtpid = this.getdtp(element.dtpid)
    //   element.pendingat = this.getusername(element.pendingat)
    // })

    //   this.setorganizedlistdata(clonedArray)
    // },

    async init_employee(id) {

      this.cur_sec = 'viewemployee'
      this.isSecClose = true
      this.selectedrow = id
      this.isSecClose = false
      await this.employeeStore.getEmployeeByID({ empid: id }, this.showLoading)
    },

    async setDeleteEmployee(empNo) {
      await this.deleteEmployee({ empNo: empNo, user: this.loggeduser })
      await this.searchEmployees({
        keyword: empNo,
        searchby: 101,
        user: this.loggeduser,
      })
    },

    async setEmployee() {
      this.isAddEdit = true;
    },

    async empSaveCompletion(empNo) {
      this.cur_sec = ''

      await this.searchEmployees({
        keyword: empNo,
        searchby: 101,
        user: this.loggeduser,
      })
    },

    async init_attendence(empId, rowId) {
      console.log(`init_attendence called for empId: ${empId}, rowId: ${rowId}`);
      this.isSecClose = true
      this.cur_sec = 'attendence';
      this.selectedrow = rowId;
      this.isSecClose = false;

      let req = {
        EmpNo: empId,
        FromDate: this.dtfrom,
        ToDate: this.dtto
      }
      await this.attendanceStore.getAttendenceByEmp(req, this.showLoading);
    },

    async init_movement(empId, rowId) {
      // await this.$refs.movement[row_no].init()

      this.cur_sec = 'movement'
      this.isSecClose = true
      this.selectedrow = rowId
      this.isSecClose = false

      let req = {
        empNo: empId,
        fromDate: this.dtfrom,
        toDate: this.dtto,
      }
      await this.movementStore.getViewMovement(req, this.showLoading);
    },

    async init_timecard(empId, row_no) {
      // await this.$refs.timecardcomp[row_no].init()

      this.cur_sec = 'timecard'
      this.isSecClose = true
      this.selectedrow = row_no
      this.isSecClose = false

      let req = {
        empNo: empId,
      }
      await this.timeCardStore.getTimeCards(req, this.showLoading);
    },

    async init_absense(empNo, rowId) {
      // await this.$refs.absense[row_no].init()
      this.cur_sec = 'absense'
      this.isSecClose = true
      this.selectedrow = rowId
      this.isSecClose = false

      let req = {
        empNo: empNo,
        fromDate: this.dtfrom,
        toDate: this.dtto,
      }
      await this.leaveStore.getViewAbsences(req, this.showLoading);
    },

    async init_rectify(empNo, rowId) {
      this.cur_sec = 'rectify'
      this.isSecClose = true
      this.selectedrow = rowId
      this.isSecClose = false

      let req = {
        empNo: empNo,
        fromDate: this.dtfrom,
        toDate: this.dtto,
      }
    },

    async goto_absenseapply(req) {
      this.leaveYear = req.leaveYear;
      await this.leaveStore.getLeaveBalance(req, this.showLoading)
      await this.leaveStore.getAbsenceInitData()
      this.cur_sec = 'absenseapply'
    },

    async init_otapply(rowId, empno) {
      this.isSecClose = true
      this.selectedrow = rowId
      this.isSecClose = false

      let req = {
        empNo: empno,
        fromDate: this.dtfrom,
        toDate: this.dtto,
      }

      await this.attendanceStore.getOTApprovals(req, this.showLoading);
    },

    async goto_movementapply() {
      this.cur_sec = 'movementapply'

      await this.movementStore.getMovementInitData(this.showLoading);
    },

    goto_absenceview() {
      this.cur_sec = 'absense'
    },

    goto_movementview() {
      this.cur_sec = 'movement'
    },

    goto_holidayapply() { },

    async clickmenuitem(sec) {
      this.ismenuopen = false
      this.cur_sec = sec

      if (this.cur_sec == 'holiday') {
        await this.$refs.compholiday.init()
      }
      if (this.cur_sec == 'special_work_arrangement') {
        //await this.$refs.compholiday.init()
      } else if (this.cur_sec == 'updateemployee') {
        this.setClearEmployee()
      } else if (sec == 'timecard_summery_report') {
        this.$router.push('/hr/reports/timecard_summery_report')
      } else if (sec == 'overtime_month_end_summery_report') {
        this.$router.push('/hr/reports/overtime_month_end_summery_report')
      } else if (sec == 'overtime_individual_summery_report') {
        this.$router.push('/hr/reports/overtime_individual_summery_report')
      } else if (sec == 'employee_leave_annual_report') {
        this.$router.push('/hr/reports/employee_leave_annual_report')
      } else if (sec == 'annual_summery_report') {
        this.$router.push('/hr/reports/annual_summery_report')
      } else if (sec == 'no_pay_summery_report') {
        this.$router.push('/hr/reports/no_pay_summery_report')
      } else if (sec == 'dailyPresenceReport') {
        this.$router.push('/hr/reports/dailyPresenceReport')
      } else if (sec == 'employeerectificationreport') {
        this.$router.push('/hr/reports/employeerectificationreport')
      }
      else if (sec == 'no_pay_monthly_report') {
        this.$router.push('/hr/reports/no_pay_monthly_report')
      }
      else if (sec == 'GetSupervisorPendingsReport') {
        window.open(this.apiUrl + '/HRReport/GetSupervisorPendingsReport', '_blank');
      }
      else if (sec == 'GetHRMonthEndReport') {
        let year = prompt('Year?')
        let month = prompt('month?')
        window.open(this.apiUrl + '/HRReport/GetHRMonthEndReport?month=' + month + '&year=' + year, '_blank');
      }


    },

    async search_begin_DBSerach(req) {
      this.cur_sec = '';
      this.selectedrow = null;
      console.log('search_begin_DBSerach called with:', req);

      await this.employeeStore.searchEmployees({
        keyword: req.searchval,
        searchby: req.searchby,
      }, this.showLoading)

      //get workgroup count
      await this.workLoadStore.getWorkLoadCount(this.showLoading);
    },

    getviewwg() {
      this.$router.push('/hr/workgroup')
    },

    pagechanged(page_num) {
      this.cur_page = page_num
      this.setpage(this.cur_page)
      //this.organizelistdata()
    },
  },

  head() {
    return {
      title: 'HR System - DTL',
    }
  },
}
</script>

<style scoped>
.cssmenu {
  @apply text-gray-700 text-xl p-2 text-center cursor-pointer rounded;
}

.cssmenu:hover {
  @apply bg-blue-500 text-white;
}

.cssemplist .cssdatarow {}

.cssemplist .cssdatarow:hover {}

.cssemplist .cssdatarowitem {
  @apply p-2 overflow-hidden font-semibold;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cssemplist input {
  @apply font-bold w-40 border-none bg-transparent px-2;
}

.cssemplist input:focus {
  @apply outline-none;
}

.cssemplist span {
  @apply absolute left-0 top-0 pt-2 pl-2;
}

.cssemplist .csscontrol {
  @apply cursor-pointer;
}

.cssemplist .csscontrol:hover {
  @apply text-gray-600;
}

.cssCardLinks {
  @apply text-blue-900 font-bold;
}

.cssCardLinks:hover {}

.cssCardLinks>div {
  @apply border-gray-500 rounded p-2 rounded-md py-1 px-2;
}

.cssCardLinks>div:hover {
  @apply bg-blue-600 text-white;
}
</style>