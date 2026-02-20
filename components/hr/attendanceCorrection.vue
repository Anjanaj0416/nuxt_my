<template>
    <section class="p-2">
        <div class="relative min-h-screen px-4 text-sm">
            <div class="flex">
                <div class="">
                    <label class="block text-[13px] font-bold text-gray-600">
                        Employee 
                    </label>
                    <div class="relative w-full">
                        <!-- <selectinput2 :selections="reportStore.initData.initReport.arrEmp" @changed="setEmployee" :cur_item="empNo" /> -->
                        <serachInput
                            :arr-items="reportStore.initData.initReport.arrEmp"
                             v-model="employeList"
                            @selectItem="setEmployee"
                        />
                    </div>
                </div>
                <div class="">
                    <datediff @date-change="GetAttendence" class="" />
                </div>

                <div v-if="empNo && dtto && dtfrom"
                    class="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between mt-5">
                    <btnhr_load name="Refresh" @click="getRefreshAttendance" />
                </div>
            </div>

            <div class="absolute top-0 right-0 hidden px-4 mt-16 sm:hidden md:block">
                <atten_colorbox />
            </div>

            <div class="block md:hidden">
                <atten_colorbox />
            </div>

            <div
                class="grid w-full grid-cols-1 p-2 text-center text-white bg-blue-800 lg:grid-cols-10 lg:w-5/6 rounded-t-md">
                <div class="hidden lg:block">Emp No</div>
                <div class="hidden lg:block">Date</div>
                <div class="hidden lg:block">In Time</div>
                <div class="hidden lg:block">Out Time</div>
                <div class="hidden lg:block">Over Time</div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block">Day Type</div>

                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
            </div>

            <div v-for="dayatt in attendanceStore.attendence.alattendences" :key="dayatt">

                <!-- {{dayatt}} <br>
                {{ getDayTypeName(dayatt) }} -->
                <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md lg:w-5/6"
                    v-bind:class="[getAttRowColor(dayatt)]">
                    <div class="grid grid-cols-1 text-center lg:grid-cols-10">
                        <div>{{ dayatt.empNo }}</div>
                        <div class="mr-4">{{ $options.filters.toReadableDate(dayatt.date) }}</div>
                        <div class="ml-4 mr-4">
                            <div class="flex gap-x-2 justify-center items-center">
                                <div v-if="editingRowId === dayatt.id && editingField === 'intime'">
                                    <input v-model="editedIntime" type="time"
                                        class=" p-1 text-sm text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-300" />
                                </div>
                                <div v-else>{{ dayatt.inTime }}</div>
                                <button type="button" @click="
                                    editingRowId === dayatt.id && editingField === 'intime'
                                        ? SetManualInOut(dayatt.date, editedIntime, dayatt.outTime)
                                        : isEditChange(dayatt.id, 'intime', dayatt.inTime)
                                    "
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1">
                                    {{ editingRowId === dayatt.id && editingField === 'intime' ? 'Save' : 'Edit' }}
                                </button>
                                <!-- <swipes v-show="dayatt.swipesin.length > 0" :swipes="dayatt.swipesin"
                                    :cssbg="getAttRowColor(dayatt)" /> -->
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="flex gap-x-2 justify-center items-center">
                                <div v-if="editingRowId === dayatt.id && editingField === 'outtime'">
                                    <input v-model="editedOuttime" type="time"
                                        class=" p-1 text-sm text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-300" />
                                </div>
                                <div v-else>{{ dayatt.outTime }}</div>
                                <button type="button" @click="
                                    editingRowId === dayatt.id && editingField === 'outtime'
                                        ? SetManualInOut(dayatt.date, dayatt.inTime, editedOuttime)
                                        : isEditChange(dayatt.id, 'outtime', dayatt.outTime)
                                    "
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1 ">
                                    {{ editingRowId === dayatt.id && editingField === 'outtime' ? 'Save' : 'Edit' }}
                                </button>
                                <!-- <swipes v-show="dayatt.swipesout.length > 0" :swipes="dayatt.swipesout"
                                    :cssbg="getAttRowColor(dayatt)" /> -->
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="flex gap-x-2 justify-center items-center">
                                <div v-if="editingRowId === dayatt.id && editingField === 'overtime'">
                                    <input v-model="editedOvertime" type="text"
                                        class="w-20 p-1 text-sm text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-300"
                                        placeholder="Hrs" />
                                </div>
                                <div v-else>{{ dayatt.overTime }}</div>
                                <button type="button" @click="
                                    editingRowId === dayatt.id && editingField === 'overtime'
                                        ? SetOTManual(dayatt.date, editedOvertime)
                                        : isEditChange(dayatt.id, 'overtime', editedOvertime)
                                    "
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-1">
                                    {{ editingRowId === dayatt.id && editingField === 'overtime' ? 'Save' : 'Edit' }}
                                </button>
                            </div>
                        </div>
                        <div>
                            <button v-if="editingRowId === dayatt.id && editingField" type="button" @click="getCancel()"
                                class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg w-20 text-sm px-1 py-1 ml-2">
                                Cancel
                            </button>
                        </div>
                        <div>{{ getDayTypeName(dayatt.dayType) }}</div>
                        <div></div>
                        <div></div>
                        <div>
                            <div v-show="userStore.loggedUser.userGroup === 'Supervisor' || userStore.loggedUser.granted === 'hradmin' || userStore.loggedUser.granted === 'admin'"
                                class="w-4/5 p-1 p-2 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer gap-x-1 hover:bg-blue-500 hover:text-white"
                                @click="getReCalcOT(dayatt.id)">
                                ReCalc.OT
                            </div>
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

import btnhr_load from '~/components/hr/btnhr_load'

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

                        dayatt.daytype == 503
                            ? 'ShortLeave'
                            : dayatt.daytype == 504
                                ? 'Halfday'
                                : dayatt.daytype == 504.1
                                    ? 'Halfday-Apprv. Pending'
                                    : dayatt.daytype == 504.5
                                        ? 'HFA'
                                        : dayatt.daytype == 504.3
                                            ? 'Halfday-Apprv. Rejected'
                                            : dayatt.daytype == 509
                                                ? 'No-Pay'
                                                : dayatt.daytype == 505.1
                                                    ? 'Rect. Apprv. Pending'
                                                    : dayatt.daytype == 505.5
                                                        ? 'Rect. Approved'
                                                        : dayatt.daytype == 505.3
                                                            ? 'Rectt. Apprv. Rejected'
                                                            : dayatt.daytype == 507
                                                                ? 'Movement'
                                                                : dayatt.daytype == 507.1
                                                                    ? 'Movement-Apprv.Pending'
                                                                    : dayatt.daytype == 507.5
                                                                        ? 'MA'
                                                                        : dayatt.daytype == 507.3
                                                                            ? 'Movement Apprv. Rejected'
                                                                            : dayatt.daytype == 508
                                                                                ? 'Leave'
                                                                                : dayatt.daytype == 508.1
                                                                                    ? 'Leave Apprv. Pending'
                                                                                    : dayatt.daytype == 508.5
                                                                                        ? 'LA'
                                                                                        : dayatt.daytype == 508.3
                                                                                            ? 'Leave Apprv. Rejected'
                                                                                            : dayatt.weektype == 501
                                                                                                ? 'Saturday'
                                                                                                : dayatt.weektype == 502
                                                                                                    ? 'Sunday'
                                                                                                    : dayatt.daytype == 510
                                                                                                        ? dayatt.comment
                                                                                                        : dayatt.daytype == 511
                                                                                                            ? 'Transport'
                                                                                                            : dayatt.daytype == 100.1
                                                                                                                ? 'OT Apprv. Pending'
                                                                                                                : dayatt.daytype == 100.5
                                                                                                                    ? 'OTA'
                                                                                                                    : dayatt.daytype == 100.3
                                                                                                                        ? 'OT Apprv. Rejected'
                                                                                                                        : dayatt.daytype == 506
                                                                                                                            ? 'Holiday'
                                                                                                                            : dayatt.daytype == 505
                                                                                                                                ? 'InComplete'

                                                                                                                                : ""

                    return dayname
                } catch {
                    return ''
                }
            }
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