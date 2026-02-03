<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
        <div class="text-2xl uppercase">Get Month-End Attendance Sheet Type 02</div>
        <div
            class="bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-600 shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block mb-1 font-medium">Employee</label>
                    <selectinput2 v-model="selectedEmployee" :selections="reportStore.initData.initReport.arrEmp"
                        :isReport=true @change="logSelectedDates" placeholder="Select Employee"
                        class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label class="block mb-1 font-medium">Year</label>
                    <div class="relative">
                        <selectinput2 v-model="selectedYear" :selections="reportStore.initData.initReport.listYears"
                            placeholder="Select Employee" @change="logSelectedDates"
                            class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
                <div>
                    <label class="block mb-1 font-medium">Month</label>
                    <div class="relative">
                        <selectinput2 v-model="selectedMonth" :selections="reportStore.initData.initReport.listMonths"
                            :isReport=true placeholder="Select Employee" @change="logSelectedDates"
                            class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
            </div>
        </div>

        <p v-if="!selectedYear || !selectedMonth" class="text-sm text-gray-500 italic text-center">
            Please select a Year and Month..
        </p>
    </section>
</template>



<script>

import selectinput2 from "~/components/customcontrol/selectinput2";
import { useReportStore } from "~/stores/modules/hr/reportStore";

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
            selectedYear: '',
            selectedMonth: '',
            selectedEmployee: '',
        }
    },
    async mounted() {

    },
    async created() {
        this.reportStore = useReportStore();
        this.showLoading = this.$showLoading;

        await this.reportStore.getReportInitData();

        this.reportStore.initData.initReport.arrEmp.unshift({ id: "0", value: "All" });



    },
    watch: {},
    computed: {},
    methods: {

        async logSelectedDates() {
            if (!this.selectedEmployee || !this.selectedYear || !this.selectedMonth) {
                this.$showToast('Please select an Employee, Year and Month', 'warning');
                return;
            }

            this.$showConfirm("Take some time to process..Do you wish to continue?", "warning")
                .then(async (result) => {
                    if (result.isConfirmed) {
                        const req = {
                            EmpNo: this.selectedEmployee,
                            Year: this.selectedYear,
                            Month: this.selectedMonth,
                        };
                        await this.reportStore.getMonthEndAttendanceSheetType2(req, this.$showLoading);

                        await this.clearAll();
                    }
                });


        },

        async clearAll() {
            this.selectedEmployee = ""
            this.selectedYear = ""
            this.selectedMonth = ""
        },
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