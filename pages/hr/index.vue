<template>
  <section>
    <!-- Start Top Header -->

    <div
      class="flex flex-col items-center justify-between h-24 px-4 pt-6 my-10 bg-gray-300 cssTop lg:flex-row md:flex-row">
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

          <div class="flex items-center justify-center md:ml-8"
            v-show="userStore.loggedUser.granted.includes('hradmin') || userStore.loggedUser.granted.includes('su')">

            <search_dashboard placeholder="Search Employee" :arrsections="arrsections_DBSerach"
              @getsearch="search_begin_DBSerach" />
            <div class="bg-white p-1 -ml-2 rounded">
              <Button class="w-24 -py-4 ml-2 border-white border-0 bg-blue-800 text-white font-bold" label="New"
                variant="primary" @click="GoToAddNew" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex-col items-center hidden -my-4 lg:pt-4 lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4 lg:gap-x-8 md:pt-4 md:flex-row lg:flex">
        <!-- Hide on mobile -->
        <div class="mr-8" v-show="userStore.loggedUser.userGroup === 'Supervisor'">
          <!-- HRAdmin -->
          <btnwgstatus name="workgroup" :wgjobcount="hrStore.dashboard.workgroupjobcount" @click="getviewwg" />
        </div>

      </div>
    </div>




    <!-- End  Top Header -->

    <div class="px-2 mt-4 lg:px-12">

      <div class="csscontent">
        <div
          class="grid grid-cols-1 gap-2 py-1 font-bold text-center text-white border border-gray-300 bg-blue-950 cssheader lg:grid-cols-8 rounded-t-md">
          <div class="hidden cursor-pointer lg:block hover:text-white" title="Sort - Employee Name">
            Employee Name
          </div>
          <div class="hidden cursor-pointer hover:text-white lg:block" title="Sort - Emp. No">
            Emp. No
          </div>

          <div class="hidden cursor-pointer hover:text-white lg:block" title="Sort - Contact">
            Contact
          </div>

          <div class="hidden cursor-pointer hover:text-white lg:block" title="Sort - Email">
            Email
          </div>

          <div class="hidden cursor-pointer hover:text-white lg:block" title="Sort - Designation">
            Designation
          </div>

          <div class="hidden cursor-pointer hover:text-white lg:block" title="Sort - Supervisor">
            Supervisor
          </div>

          <div class="hidden cursor-pointer hover:text-white lg:block" title="Sort - Department">
            Department
          </div>

          <!-- <div class="flex flex-col sm:flex-row sm:justify-end sm:px-4 sm:items-center gap-x-1 lg:justify-end lg:pr-6"
            v-show="dashboard.entireresultset.totalpages > 0">
            <div class="flex items-center">
              <selectinput2 class="w-12 text-white" v-model="cur_page" :cur_item="cur_page"
                :selections="dashboard.entireresultset.alpages" label="" cssclass="cssPages" @changed="pagechanged" />
            </div>

            <div class="hidden sm:block"> 
              / {{ dashboard.entireresultset.totalpages }}
            </div>
          </div> -->
          <div class="flex flex-col items-center md:pt-4 md:flex-row sm:gap-y-0 lg:hidden sm:justify-start">
            <div v-show="userStore.loggedUser.userGroup === 'Supervisor'">
              <btnwgstatus name="workgroup" :wgjobcount="hrStore.dashboard.workgroupjobcount" @click="getviewwg" />
            </div>
          </div>
        </div>


        <!-- Employees List  -->
        <div class="cssemplist" v-for="(emp, index) in hrStore.alempdetails" :key="emp">

          <div class="mt-1 text-sm rounded-md cursor-pointer hover:text-white text-white-300 hover:bg-gray-500"
            :class="emp.isresigned ? 'bg-red-500' : 'bg-gray-400'">

            <div class="rounded-md">
              <div class="grid grid-cols-1 text-center cssdatarow lg:grid-cols-8">
                <div class="cssdatarowitem lg:border-0">
                  <span class="lg:hidden ">Employee Name</span>
                  <div class="flex gap-x-2">


                    <img class="w-16 h-16 transform rounded hover:scale-125"
                      :src="userStore.loggedUser.resourceURLRoot + emp.image" alt="" />
                    {{ emp.empName }}
                  </div>
                </div>

                <div class="cssdatarowitem lg:border-0">
                  <span class="lg:hidden">Emp No</span>

                  {{ emp.empNo }}
                </div>
                <div class="cssdatarowitem lg:border-0">
                  <span class="lg:hidden">Contact</span>
                  {{ emp.contact }}
                </div>

                <div class="cssdatarowitem lg:border-0">
                  <span class="lg:hidden">Email</span>
                  {{ emp.email }}
                </div>

                <div class="cssdatarowitem lg:border-0">
                  <span class="lg:hidden">Designation</span>
                  {{ emp.designation }}
                </div>

                <div class="cssdatarowitem lg:border-0">
                  <span class="lg:hidden">Supervisor</span>
                  {{ emp.supervisor }}
                </div>
                <div class="cssdatarowitem lg:border-0">
                  <span class="lg:hidden">Department</span>
                  {{ emp.department }}
                </div>
                <!-- <div class="flex gap-2 cursor-pointer cssdatarowitem lg:border-0" @click="gotoUserguide">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>User Guide</div>
                </div> -->
              </div>
              <!-- {{userStore.loggedUser}} -->
              <div class="flex flex-wrap justify-end gap-4 px-4 pb-2">
                <!-- Employee Details -->
                <div @click="init_employee(emp.id)" class="p-2 border-2 rounded-lg cursor-pointer hover:text-blue-200">
                  Emp. Details
                </div>

                <!-- Attendance -->
                <div @click="init_attendence(emp.empNo, emp.id);//, FromDate: $refs.atten.$refs.datediffRef.dtfrom, ToDate: $refs.atten.$refs.datediffRef.dtto
                " class="p-2 border-2 rounded-lg cursor-pointer hover:text-blue-200">
                  Attendance
                </div>

                <!-- Apply OT -->
                <div
                  v-show="!emp.isOTAllow && (userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.userGroup === 'Supervisor' || userStore.loggedUser.userGroup?.toLowerCase() === 'admin')"
                  title="OT Apply"
                  @click="init_otapply(index, emp.empNo); cur_sec = 'otapply'; selectedrow = emp.id; isSecClose = false;"
                  class="p-2 border-2 rounded-lg cursor-pointer hover:text-blue-200">

                  Apply OT
                </div>

                <!-- Leave Details -->
                <div v-show="userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.userGroup === 'hradmin' || userStore.loggedUser.userGroup === 'su' || userStore.loggedUser.userGroup === 'Supervisor' ||
                  userStore.loggedUser.userGroup?.toLowerCase() === 'admin'
                  " title="Leave Details" @click="
                    init_absense(emp.empNo, emp.id);
                  cur_sec = 'absense';
                  selectedrow = emp.id;
                  isSecClose = false;
                  " class="p-2 border-2 rounded-lg cursor-pointer hover:text-blue-200">
                  Leave
                </div>

                <!-- Rectify Details -->
                <div v-show="userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.userGroup === 'hradmin' || userStore.loggedUser.granted.includes('hradmin') ||
                  userStore.loggedUser.userGroup?.toLowerCase() === 'admin'
                  " title="Leave Details" @click="
                    init_rectify(emp.empNo, emp.id);
                  cur_sec = 'rectify';
                  selectedrow = emp.id;
                  isSecClose = false;
                  " class="p-2 border-2 rounded-lg cursor-pointer hover:text-blue-200">
                  Rectify
                </div>

                <!-- Movement Details -->
                <div v-show="userStore.loggedUser.userName === emp.empNo || userStore.loggedUser.userGroup === 'Supervisor' || userStore.loggedUser.userGroup === 'su' ||
                  userStore.loggedUser?.userGroup?.toLowerCase() === 'admin'
                  " title="Movement Details" @click="
                    init_movement(emp.empNo, emp.id);//index
                  cur_sec = 'movement';
                  selectedrow = emp.id;
                  isSecClose = false;
                  " class="p-2 border-2 rounded-lg cursor-pointer hover:text-blue-200">
                  Movement
                </div>

                <!-- Time Card Details -->
                <div title="Time Card Details" @click="
                  init_timecard(emp.empNo, index);
                cur_sec = 'timecard';
                selectedrow = emp.id;
                isSecClose = false;
                " class="p-2 border-2 rounded-lg cursor-pointer hover:text-blue-200">
                  Time Card
                </div>
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
                  :isOTEntitled="isOTEntitled" @exit="exit" />
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
              <div v-show="cur_sec.toLowerCase() === 'rectify' &&
                selectedrow == emp.id &&
                !isSecClose
                ">
                <rectifylist v-if="!isLoading" ref="atten" :empno="emp.empNo" :empname="emp.empName"
                  :isOTEntitled="isOTEntitled" @exit="exit" />
              </div>
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

import { useHrStore } from "~/stores/modules/hrStore";
import { useUserStore } from "~/stores/modules/userStore";

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
      hrStore: null,
      isAddEdit: false,
    }
  },

  async created() {
    try {
      this.hrStore = useHrStore();
      this.userStore = useUserStore();
      this.showLoading = this.$showLoading;
      await this.hrStore.loadInitEmployee(this.showLoading);
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
    const req = {
      searchval: this.userStore.loggedUser.userName,
      searchby: 101,
    }

    this.search_begin_DBSerach(req);
    this.assetsBaseUrl = localStorage.getItem("assetsBaseUrl");
  },

  methods: {
    async exit() {
      this.isSecClose = true
      this.cur_sec = ''

      await this.hrStore.clearAll();

    },

    GoToAddNew() {
      this.hrStore.clearEmployee();
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
      const hrStore = useHrStore();

      this.cur_sec = 'viewemployee'
      this.isSecClose = true
      this.selectedrow = id
      this.isSecClose = false
      await hrStore.getEmployeeByID({ empid: id }, this.showLoading)
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
      this.cur_sec = 'attendence';
      this.selectedrow = rowId;
      this.isSecClose = false;
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
      await this.hrStore.getViewMovement(req, this.showLoading);
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
      await this.hrStore.getTimeCards(req, this.showLoading);
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
      await this.hrStore.getViewAbsences(req, this.showLoading);
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
      // await this.hrStore.getViewAbsences(req, this.showLoading);
    },

    async goto_absenseapply(req) {
      this.leaveYear = req.leaveYear;
      await this.hrStore.getLeaveBalance(req, this.showLoading)
      await this.hrStore.getAbsenceInitData()
      this.cur_sec = 'absenseapply'
    },

    async init_otapply(row_no, empno) {
      let req = {
        empNo: empno,
        fromDate: this.dtfrom,
        toDate: this.dtto,
      }

      await this.hrStore.getOTApprovals(req, this.showLoading);
    },

    async goto_movementapply() {
      this.cur_sec = 'movementapply'

      await this.hrStore.getMovementInitData(this.showLoading);
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
      await this.hrStore.searchEmployees({
        keyword: req.searchval,
        searchby: req.searchby,
      }, this.showLoading)

      //get workgroup count
      await this.hrStore.getWorkLoadCount(this.showLoading);
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
  @apply p-2 relative font-semibold;
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