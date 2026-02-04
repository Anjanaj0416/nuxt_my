<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
        <div class="text-2xl uppercase">Daily Attendance Status Update</div>
        <div
            class="bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-600 shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block mb-1 font-medium">Date From</label>
                    <div>
                        <div class="relative">
                            <input v-model="selectedFromDate" type="date"
                                class="w-full p-1 text-base text-gray-900 bg-white border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                </div>
                <div>
                    <label class="block mb-1 font-medium">Date To</label>
                    <div>
                        <div class="relative">
                            <input v-model="selectedToDate" type="date"
                                class="w-full p-1 text-base text-gray-900 bg-white border-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <button type="button" @click="logSelectedDates"
                    class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2">
                    Submit
                </button>
            </div>
        </div>

        <p v-if="!selectedFromDate || !selectedToDate" class="text-sm text-gray-500 italic text-center">
            Please select a date range..
        </p>

       
        <dailyAttendance v-if="attendanceStore.dailyEmpsInOutDetails?.length > 0"/>
        
    </section>
</template>



<script>

import dailyAttendance from "~/components/hr/dailyAttendance";
import { useAttendanceStore } from "~/stores/modules/hr/attendanceStore";


definePageMeta({
    layout: 'default',
    middleware: 'auth',
});

export default {

    components: {
        dailyAttendance
    },

    props: [''],
    data() {
        return {
            showLoading: null,
            isReport: false,
            selectedToDate: '',
            selectedFromDate: '',
        }
    },
    async mounted() {

    },
    async created() {
        this.attendanceStore = useAttendanceStore();
        this.showLoading = this.$showLoading;

        await this.attendanceStore.clearDailyAttendanceInOut();
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

<style scoped>
.csscmd {
    @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
    @apply bg-blue-200 cursor-pointer;
}

.cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
}
</style>