<template>
    <section>
        <div class="relative min-h-screen text-sm py-8 ">
            <div class="w-full lg:w-5/6 bg-white  rounded-xl border p-4 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <!-- Employee -->
                    <div>
                        <label class="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                            Employee
                        </label>
                        <div class="relative">
                            <serachInput
                                :arr-items="reportStore.initData.initReport.arrEmp"
                                v-model="employeList"
                                @selectItem="setEmployee"
                            />
                        </div>
                    </div>
                    <!-- Date Range -->
                    <div>
                        <datediff @date-change="GetAttendence" />
                    </div>
                    <!-- Refresh Button -->
                    <div v-if="empNo && dtto && dtfrom" class="flex md:justify-end">
                        <btnhr_load name="🔄 Refresh Attendance" @click="getRefreshAttendance" />
                    </div>
                </div>
            </div>

            <div class="absolute top-0 right-0 hidden px-4 mt-36 sm:hidden md:block">
                <atten_colorbox />
            </div>

            <div class="block md:hidden">
                <atten_colorbox />
            </div>

            <div class="w-full lg:w-5/6 mt-6 bg-white shadow-lg rounded-xl overflow-hidden border">

                <!-- TABLE HEADER -->
                <div class="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold">
                    <div class="grid grid-cols-7 gap-2 px-4 py-3 text-sm text-center">
                        <div>Emp No</div>
                        <div>Date</div>
                        <div>In Time</div>
                        <div>Out Time</div>
                        <div>Over Time</div>
                        <div>Day Type</div>
                        <div>Action</div>
                    </div>
                </div>

                <!-- TABLE BODY -->
                <div class="divide-y max-h-[550px] overflow-y-auto">

                    <div v-for="dayatt in attendanceStore.attendence.alattendences"
                        :key="dayatt.id"
                        class="grid grid-cols-7 gap-2  py-3 text-center text-gray-700 text-sm items-center hover:bg-blue-50 transition duration-200"
                        :class="[getAttRowColor(dayatt)]">

                        <!-- Emp -->
                        <div class="font-medium">{{ dayatt.empNo }}</div>

                        <!-- Date -->
                        <div>{{ $options.filters.toReadableDate(dayatt.date) }}</div>

                        <!-- In Time -->
                        <div class="flex justify-center gap-2 items-center">
                            <input v-if="editingRowId === dayatt.id && editingField === 'intime'"
                                v-model="editedIntime"
                                type="time"
                                class="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"/>

                            <span v-else class="font-medium">{{ dayatt.inTime }}</span>

                            <button
                                @click="editingRowId === dayatt.id && editingField === 'intime'
                                    ? SetManualInOut(dayatt.date, editedIntime, dayatt.outTime)
                                    : isEditChange(dayatt.id, 'intime', dayatt.inTime)"
                                class="px-2 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow">
                                {{ editingRowId === dayatt.id && editingField === 'intime' ? 'Save' : 'Edit' }}
                            </button>

                            <button v-if="editingRowId === dayatt.id && editingField === 'intime'"
                                @click="getCancel()"
                                class="px-2 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white shadow">
                                Cancel
                            </button>
                        </div>

                        <!-- Out Time -->
                        <div class="flex justify-center gap-2 items-center">
                            <input v-if="editingRowId === dayatt.id && editingField === 'outtime'"
                                v-model="editedOuttime"
                                type="time"
                                class="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400"/>

                            <span v-else class="font-medium">{{ dayatt.outTime }}</span>

                            <button
                                @click="editingRowId === dayatt.id && editingField === 'outtime'
                                    ? SetManualInOut(dayatt.date, dayatt.inTime, editedOuttime)
                                    : isEditChange(dayatt.id, 'outtime', dayatt.outTime)"
                                class="px-2 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white shadow">
                                {{ editingRowId === dayatt.id && editingField === 'outtime' ? 'Save' : 'Edit' }}
                            </button>

                            <button v-if="editingRowId === dayatt.id && editingField === 'outtime'"
                                @click="getCancel()"
                                class="px-2 py-1 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white shadow">
                                Cancel
                            </button>
                        </div>

                        <!-- OT -->
                        <div class="font-semibold text-indigo-600">
                            {{ dayatt.overTime }}
                        </div>

                        <!-- Day Type -->
                        <div>
                            <span class="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200"
                                    :title="getDayTypeName(dayatt)">
                                {{ getDayTypeName(dayatt) }}
                            </span>
                        </div>

                        <!-- Action -->
                        <div>
                            <button
                                v-show="userStore.loggedUser.userGroup === 'Supervisor'
                                    || userStore.loggedUser.granted === 'hradmin'
                                    || userStore.loggedUser.granted === 'admin'"
                                @click="getReCalcOT(dayatt.id)"
                                class="px-3 py-1 text-xs rounded-md bg-emerald-600 hover:bg-emerald-700 text-white shadow">
                                ReCalc OT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import btnhr_print from '~/components/hr/btnhr_print'
import btnhr_rectify from '~/components/hr/btnhr_rectify'
import atten_colorbox from '~/components/hr/atten_colorbox'
import attnrectify from '~/components/hr/attnrectify'
import selectinput2 from '~/components/customcontrol/selectinput2'
import serachInput from "~/components/customcontrol/hr/SearchInput";

import btnhr_load from '~/components/customcontrol/hr/btn.vue'

import swipes from "~/components/hr/swipes";
import datediff from '~/components/customcontrol/hr/dateRange.vue'
import { useUserStore } from '~/stores/modules/userStore'
import { useAttendanceStore } from '~/stores/modules/hr/attendanceStore'
import { useReportStore } from "~/stores/modules/hr/reportStore";

// import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    props: ['empno', 'empname', 'isOTEntitled', 'cur_item'],
    components: {
        btnhr_print,
        btnhr_rectify,
        atten_colorbox,
        datediff,
        swipes,
        attnrectify,
        selectinput2,
        btnhr_load,
        serachInput
    },
    data() {
        return {
            // arr_employee: [
            //     "dev",
            //     "D1001",
            //     "D1002",
            //     "D1004"
            // ],
            employeList: '',
            dtfrom: '',
            dtto: '',
            empNo: '',
            curItem: '',
            isEdit: false,
            editingRowId: null, // Tracks which row is being edited
            editedIntime: '',
            editedOuttime: '',
            editedOvertime: '',
            isOTAppling: false,
            otApplingRow: -1,
            showLoading: null,
            editingField: null,
            myUtility: null,
            attendanceStore: null,
        }
    },

    async created() {
        this.attendanceStore = useAttendanceStore();
        this.userStore = useUserStore();
        this.showLoading = this.$showLoading;

        this.reportStore = useReportStore();
        await this.reportStore.getReportInitData();


        const { $myUtility } = useNuxtApp();
        this.myUtility = $myUtility;

        var date = new Date();
        this.dtfrom = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), 1));
        this.dtto = this.$myUtility.toInputTypeDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));

        this.empNo = this.userStore.loggedUser.userName

        let req = {
            FromDate: this.dtfrom,
            ToDate: this.dtto,
            EmpNo: this.userStore.loggedUser.userName,
        }

        this.attendanceStore.getAttendenceByEmp(req, this.showLoading);
    },

    computed: {

        getAttRowColor() {
            return (dayatt) => {
                try {
                    let rowclass =
                        dayatt.daytype == 503 ||
                            dayatt.daytype == 503.1 ||
                            dayatt.daytype == 503.5 ||
                            dayatt.daytype == 503.3
                            ? 'cssShortLeave'
                            : dayatt.daytype == 504 ||
                                dayatt.daytype == 504.1 ||
                                dayatt.daytype == 504.5 ||
                                dayatt.daytype == 504.3
                                ? 'cssHalfday'

                                : dayatt.daytype == 505 ||
                                    dayatt.daytype == 505.1 ||
                                    dayatt.daytype == 505.5 ||
                                    dayatt.daytype == 505.3
                                    ? 'cssInComplete'
                                    : dayatt.daytype == 506
                                        ? 'cssHoliday'
                                        : (dayatt.daytype == 507 ||
                                            dayatt.daytype == 507.1 ||
                                            dayatt.daytype == 507.5 ||
                                            dayatt.daytype == 507.3)
                                            ? 'cssMovement'
                                            : dayatt.daytype ==
                                                (dayatt.daytype == 508 ||
                                                    dayatt.daytype == 508.1 ||
                                                    dayatt.daytype == 508.5 ||
                                                    dayatt.daytype == 508.3)
                                                ? 'cssLeave'
                                                : dayatt.weektype == 501
                                                    ? 'cssSaturday'
                                                    : dayatt.weektype == 502
                                                        ? 'cssSunday'
                                                        : dayatt.daytype == 510
                                                            ? 'cssSWA'
                                                            : dayatt.daytype == 511
                                                                ? 'cssTransport'
                                                                : 'cssDefault'

                    // : dayatt.daytype == 509
                    //       ? 'cssNoPay'
                    return rowclass
                } catch {
                    return ''
                }
            }
        },

    getDayTypeName() {
      return (dayatt) => {
        try {
          // return this.wgInitdata.alusersInUsergroups
          //   .map((usr) => usr.usergroup)
          //   .filter((v, i, a) => a.indexOf(v) === i)
          //   .sort()

          let dayname =
            dayatt.dayType == 503
              ? "ShortLeave"
              : dayatt.dayType == 504
                ? "Halfday"
                : dayatt.dayType == 504.1
                  ? "Halfday-Apprv. Pending"
                  : dayatt.dayType == 504.5
                    ? "HFA"
                    : dayatt.dayType == 504.3
                      ? "Halfday-Apprv. Rejected"
                      : dayatt.dayType == 509
                        ? "No-Pay"
                        : dayatt.dayType == 505.1
                          ? "Rect. Apprv. Pending"
                          : dayatt.dayType == 505.5
                            ? "Rect. Approved"
                            : dayatt.dayType == 505.3
                              ? "Rectt. Apprv. Rejected"
                              : dayatt.dayType == 507
                                ? "Movement"
                                : dayatt.dayType == 507.1
                                  ? "Movement-Apprv.Pending"
                                  : dayatt.dayType == 507.5
                                    ? "MA"
                                    : dayatt.dayType == 507.3
                                      ? "Movement Apprv. Rejected"
                                      : dayatt.dayType == 508
                                        ? "Leave"
                                        : dayatt.dayType == 508.1
                                          ? "Leave Apprv. Pending"
                                          : dayatt.dayType == 508.5
                                            ? "LA"
                                            : dayatt.dayType == 508.3
                                              ? "Leave Apprv. Rejected"
                                              : dayatt.weekType == 501
                                                ? "Saturday"
                                                : dayatt.weekType == 502
                                                  ? "Sunday"
                                                  : dayatt.dayType == 510
                                                    ? dayatt.comment
                                                    : dayatt.dayType == 511
                                                      ? "Transport"
                                                      : dayatt.dayType == 100.1
                                                        ? "OT Apprv. Pending"
                                                        : dayatt.dayType == 100.5
                                                          ? "OTA"
                                                          : dayatt.dayType == 100.3
                                                            ? "OT Apprv. Rejected"
                                                            : dayatt.dayType == 506
                                                              ? "Holiday"
                                                              : dayatt.dayType == 505
                                                                ? "InComplete"
                                                                : ""

          return dayname;
        } catch {
          return "";
        }
      };
    },
    },

    methods: {

        isEditChange(rowId, field, value) {
            if (this.editingRowId === rowId && this.editingField === field) {
                // Save the edited value
                // this.rectifyAttendance({
                //     rowId,
                //     [field]: this[`edited${field.charAt(0).toUpperCase() + field.slice(1)}`],
                // });
                this.editingRowId = null;
                this.editingField = null;
                this.editedIntime = '';
                this.editedOuttime = '';
                this.editedOvertime = '';
            } else {
                // Enter edit mode
                this.editingRowId = rowId;
                this.editingField = field;
                this.editedIntime = field === 'intime' ? value : '';
                this.editedOuttime = field === 'outtime' ? value : '';
                this.editedOvertime = field === 'overtime' ? value : '';
            }
        },

        setEmployee(empNo) {
            this.employeList = empNo.id;
            console.log(empNo);
        },

        async GetAttendence(req) {
            console.log("this.dtfrom:", req.dtfrom);
            console.log("this.dtto:", req.dtto);

            this.dtfrom = req.dtfrom
            this.dtto = req.dtto
            // this.reset();

            await this.attendanceStore.getAttendenceByEmp({
                FromDate: this.dtfrom,
                ToDate: this.dtto,
                EmpNo: this.employeList,
            }, this.showLoading)
        },

        async SetManualInOut(date, inn, out) {
            const req = {
                empNo: this.empNo,
                dtAtten: date,
                In: inn,
                Out: out,
            }

            this.$showConfirm("Sure to edit this in-out time?", "warning")
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await this.attendanceStore.setManualInOut(req, this.showLoading);

                        const attendanceReq = {
                            FromDate: this.dtfrom,
                            ToDate: this.dtto,
                            EmpNo: this.empNo
                        }

                        await this.attendanceStore.getAttendenceByEmp(attendanceReq, this.showLoading);

                        this.editingRowId = null;
                        this.editingField = null;

                    }
                });
        },

        async SetOTManual(date, otHours) {
            const req = {
                empNo: this.empNo,
                dtOT: date,
                OTHours: otHours,
            }

            this.$showConfirm("Sure to edit this OT time?", "warning")
                .then(async (result) => {
                    if (result.isConfirmed) {
                        await this.attendanceStore.setOTManual(req, this.showLoading);

                        const attendanceReq = {
                            FromDate: this.dtfrom,
                            ToDate: this.dtto,
                            EmpNo: this.empNo
                        }

                        await this.attendanceStore.getAttendenceByEmp(attendanceReq, this.showLoading);

                        this.editingRowId = null;
                        this.editingField = null;

                    }
                });
        },

        async getReCalcOT(attn) {
            console.log("attn:", attn);

            if (attn.intime == '00:00' || attn.intime == '00:00') {
                this.show_error('Invalid In or Out Time')
            }
            else {
                await this.attendanceStore.getRecalcOTByHR(attn, this.showLoading)
                await this.attendanceStore.getAttendenceByEmp({
                    FromDate: this.dtfrom,
                    ToDate: this.dtto,
                    EmpNo: this.empNo,
                }, this.showLoading);
            }
        },

        async getCancel() {
            this.editingRowId = null;
            this.editingField = null;
            this.editedIntime = '';
            this.editedOuttime = '';
            this.editedOvertime = '';
        },

        async getRefreshAttendance() {
           
            const req = {
                dtFrom: this.dtfrom,
                dtTo: this.dtto,
                empNo: this.empNo,
            }
            await this.attendanceStore.getRefreshAttendance(req, this.showLoading)
        },
    },

    filters: {
        toReadableDate(date) {
            if (!date) return 'N/A';
            // Extract YYYY-MM-DD from ISO string (e.g., 2025-07-01T00:00:00)
            return date.split('T')[0];
        },
    },
}
</script>