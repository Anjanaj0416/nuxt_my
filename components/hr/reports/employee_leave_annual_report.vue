<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
        <div class="text-2xl uppercase">Employee Leave Annual Report</div>
        <div
            class="bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-600 shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block mb-1 font-medium">Department</label>
                    <div class="relative">
                        <selectinput2 v-model="selectedDepartment"
                            :selections="hrStore.initData.initReport.listDepartments" :isReport=true
                            placeholder="Select Department" @change="logSelectedDates"
                            class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
                <div>
                    <label class="block mb-1 font-medium">Year</label>
                    <div class="relative">
                        <selectinput2 v-model="selectedYear" :selections="hrStore.initData.initReport.listYears"
                            placeholder="Select Employee" @change="logSelectedDates"
                            class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
            </div>
        </div>

        <p v-if="!selectedYear || !selectedDepartment" class="text-sm text-gray-500 italic text-center">
            Please select a Department and Year..
        </p>
    </section>
</template>


<script>
import { useHrStore } from "~/stores/modules/hrStore";

import selectinput2 from "~/components/customcontrol/selectinput2";

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
            selectedDepartment: '',
            selectedYear: '',
        }
    },
    async mounted() {

    },
    async created() {
        this.hrStore = useHrStore();
        this.showLoading = this.$showLoading;

        await this.hrStore.getReportInitData();

    },
    watch: {},
    computed: {},
    methods: {

        async logSelectedDates() {
            if (!this.selectedYear || !this.selectedDepartment) {
                this.$showToast('Please select a Department and Year', 'warning');
                return;
            }

            const req = {
                departmentId: this.selectedDepartment,
                year: this.selectedYear,
            };
            await this.hrStore.getEmployeeLeaveAnnualReport(req, this.$showLoading);
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