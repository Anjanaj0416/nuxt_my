<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
        <div class="text-2xl uppercase">Employee Attendance Correction</div>
        <div class=" shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-bold text-gray-600">Employee</label>
                    <div class="relative">
                        <select v-model="selectedEmployee" @change="nanualAdd" required
                            class="w-full p-2 mt-2 text-sm border text-gray-900 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-900">
                            <option value="">Select an Employee</option>
                            <option value="Nimal">D1001</option>
                            <option value="Sikuru">D1002</option>
                        </select>
                    </div>
                </div>
                <div>
                    <datediff ref="datediffRef" @date-change="LoadAbsence" class="text-gray-600 mb-2 sm:mb-0" />
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded shadow border mt-6">
            <h2 class="text-lg font-semibold mb-4">Attendance</h2>
            <ul class="space-y-4 text-gray-800 text-sm">
                <li v-if="selectedEmployee">Employee: <strong>{{ selectedEmployee }}</strong></li>
                <li v-if="selectedTimeType && selectedTimeValue">
                    Selected Time: <strong>{{ selectedTimeType }} - {{ selectedTimeValue }}</strong>
                </li>
                <li v-if="!selectedEmployee || !selectedTimeType" class="text-gray-400 italic">
                    Please select employee and time.
                </li>
            </ul>
        </div>
    </section>
</template>


<script>

import datediff from '~/components/hr/datediff'
import { useHrStore } from '~/stores/modules/hrStore';

definePageMeta({
    layout: 'default',
    middleware: 'auth',
});

export default {
    components: {
        datediff
    },

    data() {
        return {
            selectedEmployee: '',
            selectedTimeType: '',
            dtfrom: '',
            dtto: '',
            myUtility: null,
            showLoading: null,
        }
    },

    async created() {
        this.hrStore = useHrStore();
        // this.userStore = useUserStore();
        this.showLoading = this.$showLoading;

        const { $myUtility } = useNuxtApp();
        this.myUtility = $myUtility;
    },

    methods: {
        async LoadAbsence() {
            this.dtfrom = this.$refs.datediffRef.dtfrom;
            this.dtto = this.$refs.datediffRef.dtto;

            const fromDate = this.$refs.datediffRef.dtfrom;
            const toDate = this.$refs.datediffRef.dtto;

            let req = {
                empNo: this.selectedEmployee,
                fromDate: fromDate,
                toDate: toDate,
            }
            await this.hrStore.getViewAbsences(req, this.showLoading);
        },
    }

}

</script>