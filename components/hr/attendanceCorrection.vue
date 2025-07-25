<template>
    <section class="p-2">
        <div class="relative min-h-screen px-4 text-sm">
            <div class="flex">
                <!-- v-model="absense_apply.absence_type" :cur_item="absense_apply.absence_type" -->
                <div class="flex mt-5">
                    <div class="mr-3">Employee</div>
                    <div>
                        <selectinput2 :selections="arr_employee" @changed="setEmployee" :cur_item="curItem" />
                    </div>
                </div>
                <div class="flex flex-col gap-4 mb-4 sm:flex-row sm:justify-between ml-2">
                    <datediff @date-change="GetAttendence" class="mb-2 mt-5 sm:mb-0" />
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
                class="grid w-full grid-cols-1 p-2 text-center text-white bg-blue-800 lg:grid-cols-12 lg:w-5/6 rounded-t-md">
                <div class="hidden lg:block">Emp No</div>
                <div class="hidden lg:block">Date</div>
                <div class="hidden lg:block">In Time</div>
                <div class="hidden lg:block">Out Time</div>
                <div class="hidden lg:block">Over Time</div>
                <div class="hidden lg:block">Day Type</div>

                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
            </div>

            <div v-for="dayatt in hrStore.attendence.alattendences" :key="dayatt">

                <!-- {{dayatt}} <br>
         {{ getDayTypeName(dayatt) }} -->
                <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md lg:w-5/6"
                    v-bind:class="[getAttRowColor(dayatt)]">
                    <div class="grid grid-cols-1 text-center lg:grid-cols-12">
                        <div>{{ dayatt.empno }}</div>
                        <!-- <div>{{ $options.filters.toReadableDate(dayatt.date) }}</div> -->
                        <div class="mx-auto">
                            <div class="flex gap-x-2 justify-center items-center">
                                <div v-if="editingRowId === dayatt.id && editingField === 'intime'">
                                    <input v-model="editedIntime" type="text"
                                        class="w-20 p-1 text-sm text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-300"
                                        placeholder="HH:MM" />
                                </div>
                                <div v-else>{{ dayatt.intime }}</div>
                                <button type="button" @click="
                                    editingRowId === dayatt.id && editingField === 'intime'
                                        ? SetManualInOut(dayatt.date, editedIntime, dayatt.outtime)
                                        : isEditChange(dayatt.id, 'intime', editedIntime)
                                    "
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1">
                                    {{ editingRowId === dayatt.id && editingField === 'intime' ? 'Save' : 'Edit' }}
                                </button>
                                <!-- <swipes v-show="dayatt.swipesin.length > 0" :swipes="dayatt.swipesin"
                                    :cssbg="getAttRowColor(dayatt)" /> -->
                            </div>
                        </div>
                        <div class="mx-auto">
                            <div class="flex gap-x-2 justify-center items-center">
                                <div v-if="editingRowId === dayatt.id && editingField === 'outtime'">
                                    <input v-model="editedOuttime" type="text"
                                        class="w-20 p-1 text-sm text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-300"
                                        placeholder="HH:MM" />
                                </div>
                                <div v-else>{{ dayatt.outtime }}</div>
                                <button type="button" @click="
                                    editingRowId === dayatt.id && editingField === 'outtime'
                                        ? SetManualInOut(dayatt.date, dayatt.intime, editedOuttime)
                                        : isEditChange(dayatt.id, 'outtime', editedOuttime)
                                    "
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1">
                                    {{ editingRowId === dayatt.id && editingField === 'outtime' ? 'Save' : 'Edit' }}
                                </button>
                                <!-- <swipes v-show="dayatt.swipesout.length > 0" :swipes="dayatt.swipesout"
                                    :cssbg="getAttRowColor(dayatt)" /> -->
                            </div>
                        </div>
                        <div class="mx-auto">
                            <div class="flex gap-x-2 justify-center items-center">
                                <div v-if="editingRowId === dayatt.id && editingField === 'overtime'">
                                    <input v-model="editedOvertime" type="text"
                                        class="w-20 p-1 text-sm text-gray-800 border rounded-md focus:ring-2 focus:ring-blue-300"
                                        placeholder="Hrs" />
                                </div>
                                <div v-else>{{ dayatt.overtime }}</div>
                                <button type="button" @click="
                                    editingRowId === dayatt.id && editingField === 'overtime'
                                        ? SetOTManualSetOT(dayatt.date, editedOvertime)
                                        : isEditChange(dayatt.id, 'overtime', editedOvertime)
                                    "
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1">
                                    {{ editingRowId === dayatt.id && editingField === 'overtime' ? 'Save' : 'Edit' }}
                                </button>
                            </div>
                        </div>
                        <div>{{ getDayTypeName(dayatt) }}</div>
                        <div></div>
                        <!-- <div>
                            <div v-show="hrStore.loggeduser.granted.indexOf('hradmin') > -1 || hrStore.loggeduser.granted.indexOf('admin') > -1"
                                class="w-4/5 p-1 p-2 font-bold text-center border-gray-500 rounded rounded-md cursor-pointer gap-x-1 hover:bg-blue-500 hover:text-white"
                                @click="getReCalcOT(dayatt)">
                                ReCalc.OT
                            </div>
                        </div> -->
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
import btnhr_load from '~/components/hr/btnhr_load'

import swipes from "~/components/hr/swipes";
import datediff from '~/components/hr/datediff'
import { useHrStore } from '~/stores/modules/hrStore'

// import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    // layout: 'default',
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
    },
    data() {
        return {
            arr_employee: [
                "D1001",
                "D1002",
                "D1004"
            ],
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
            myUtility: null,
        }
    },

    async created() {
        this.hrStore = useHrStore();
        // this.userStore = useUserStore();
        this.showLoading = this.$showLoading;

        const { $myUtility } = useNuxtApp();
        this.myUtility = $myUtility;
    },

    computed: {

        // ...mapState({
        //     loggeduser: (state) => state.loggeduser,
        //     attendence: (state) => state.hr.attendencedetails.attendence,
        //     OTApllyDetails: (state) => state.hr.OTApllyDetails,
        // }),

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

                                                                                                                                : dayatt.comment

                    return dayname
                } catch {
                    return ''
                }
            }
        },
    },



    methods: {
        // ...mapActions({
        //     getAttendence: 'hr/getAttendence',
        //     setManualInOut: 'hr/setManualInOut',
        //     setOTManualSetOT: 'hr/setOTManualSetOT',
        //     getOTHours: 'hr/getOTHours',
        //     GetRecalcOTByHR: 'hr/getRecalcOTByHR',
        //     GetRefreshAttendance: 'hr/getRefreshAttendance',
        // }),
        // ...mapMutations({
        //     showMessage: 'PUSH_NOTIFICATION',
        //     reset: 'hr/RESET_ATTENDENCE',
        // }),

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

        async setEmployee(empNo) {
            this.empNo = empNo
        },

        async GetAttendence(req) {
            console.log("this.dtfrom:", req.dtfrom);
            console.log("this.dtto:", req.dtto);

            this.dtfrom = req.dtfrom
            this.dtto = req.dtto
            // this.reset();

            await this.hrStore.getViewAbsences({
                from_date: this.dtfrom,
                to_date: this.dtto,
                empNo: this.empNo,
            }, this.showLoading)
        },

        async SetManualInOut(date, inn, out) {
            const req = {
                empNo: this.empNo,
                dtAtten: date,
                in: inn,
                out: out,
                user: { "name": "testname", "username": "Test" }
            }

            await this.setManualInOut(req);

            const attendanceReq = {
                from_date: this.dtfrom,
                to_date: this.dtto,
                empno: this.empNo
            }

            await this.getAttendence(attendanceReq);

            this.editingRowId = null;
            this.editingField = null;
        },

        async SetOTManualSetOT(date, otHours) {
            const req = {
                empNo: this.empNo,
                dtOT: date,
                OTHours: otHours,
                user: { "name": "testname", "username": "Test" }
            }

            await this.setOTManualSetOT(req);

            const attendanceReq = {
                from_date: this.dtfrom,
                to_date: this.dtto,
                empno: this.empNo
            }

            // await this.getAttendence(attendanceReq);

            // this.editingRowId = null;
            // this.editingField = null;
        },

        async getReCalcOT(attn) {
            console.log("attn:", attn);

            if (attn.intime == '00:00' || attn.intime == '00:00') {
                this.show_error('Invalid In or Out Time')
            }
            else {
                await this.GetRecalcOTByHR(attn)
                await this.getAttendence({
                    from_date: this.dtfrom,
                    to_date: this.dtto,
                    empNo: this.empNo,
                });
            }
        },

        async getRefreshAttendance() {
            const req = {
                dtFrom: this.dtfrom,
                dtTo: this.dtto,
                empno: this.empNo,
            }
            await this.GetRefreshAttendance(req)
        },
    },
}
</script>