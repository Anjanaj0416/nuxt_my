<template>
    <section>
        <div>
            <div class="mb-2">
                <span class="border p-2 ">Date : 2025.01.01</span>
                <button type="button" class="ml-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-3"
                        xmlns="http://www.w3.org/2000/svg" @click="changeView(dayatt.id); getDayAppliedRecords(dayatt.date)">
                        <path class="down-arrow" d="M2 5L8 11L14 5" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <!-- <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        class="mr-3" xmlns="http://www.w3.org/2000/svg" @click="getClose()">
                        <path class="up-arrow" d="M2 11L8 5L14 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg> -->
              </button>
            </div>
            <div v-if="attendanceStore.dailyEmpsInOutDetails?.length !=0">
                <div class="grid w-full grid-cols-1 p-2 text-center text-white bg-blue-800 lg:grid-cols-6 rounded-t-md">
                    
                    <div class="hidden lg:block">Emp No</div>
                    <div class="hidden lg:block">In Time</div>
                    <div class="hidden lg:block">Out Time</div>
                    <div class="hidden lg:block">In Location</div>
                    <div class="hidden lg:block">Out Location</div>
                    <div class="hidden lg:block">Leave Status</div>
                </div>

                <div>
                    <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md">
                        <div class="grid grid-cols-1 text-center lg:grid-cols-6">
                            <div>D0003</div>
                            <div>08:00</div>
                            <div>05:00</div>
                            <div>Office</div>
                            <div>Office</div>
                             <div>
                                <selectinput2 :selections="leaveStatuses" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md">
                        <div class="grid grid-cols-1 text-center lg:grid-cols-6">
                            <div>D0003</div>
                            <div>08:00</div>
                            <div>05:00</div>
                            <div>Office</div>
                            <div>Office</div>
                             <div>
                                <selectinput2 :selections="leaveStatuses" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md">
                        <div class="grid grid-cols-1 text-center lg:grid-cols-6">
                            <div>D0003</div>
                            <div>08:00</div>
                            <div>05:00</div>
                            <div>Office</div>
                            <div>Office</div>
                             <div>
                                <selectinput2 :selections="leaveStatuses" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md">
                        <div class="grid grid-cols-1 text-center lg:grid-cols-6">
                            <div>D0003</div>
                            <div>08:00</div>
                            <div>05:00</div>
                            <div>Office</div>
                            <div>Office</div>
                            <div>
                                <selectinput2 :selections="leaveStatuses" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>

import selectinput2 from "~/components/customcontrol/selectinput2";
import { useAttendanceStore } from "~/stores/modules/hr/attendanceStore";

definePageMeta({
    layout: 'default',
    middleware: 'auth',
});

export default {

    components: {
        selectinput2,
    },

    props: [''],
    data() {
        return {
            showLoading: null,
            isReport: false,
            selectedToDate: '',
            selectedFromDate: '',
            leaveStatuses:[
                'Holiday','FulDayLeave','HalfDay'
            ]
        }
    },
    async mounted() {

    },
    async created() {
        this.attendanceStore = useAttendanceStore();
        this.showLoading = this.$showLoading;

        await this.attendanceStore.getDailyEmpsInOutDetailsInit(this.$showLoading);

    },
    watch: {},
    computed: {},
    methods: {

        async logSelectedDates() {
            if (!this.selectedFromDate || !this.selectedToDate) {
                this.$showToast('Please select a date range', 'warning');
                return;
            }

            const req = {
                dateFrom: this.selectedFromDate,
                dateTo: this.selectedToDate,
            };
            await this.attendanceStore.getDailyEmpsInOutDetails(req, this.$showLoading);
        }
    },

    async beforeMount() {

    },
    head() {
        return {
            title: 'Intranet - Digital Tech Labs',
        }
    },
}
</script>