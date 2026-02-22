<template>
    <section>
        <div>
            <!-- Top-level link or menu -->
            <div @click="toggleSubmenu('HR System')"
                class="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.732 16.5q.212 0 .356-.144T8.23 16v-5q0-.213-.144-.356q-.144-.144-.357-.144t-.356.144T7.23 11v5q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144T12 16V8q0-.213-.144-.356t-.357-.144t-.356.144T11 8v8q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144t.143-.356v-2q0-.213-.144-.356t-.356-.144t-.356.144t-.144.356v2q0 .213.144.356q.144.144.357.144M18 8q-.213 0-.357-.144T17.5 7.5V6H16q-.213 0-.356-.144t-.144-.357t.144-.356T16 5h1.5V3.5q0-.213.144-.356T18.001 3t.356.144t.143.356V5H20q.213 0 .356.144t.144.357t-.144.356T20 6h-1.5v1.5q0 .213-.144.356T17.999 8M5.116 20q-.691 0-1.153-.462T3.5 18.384V5.616q0-.691.463-1.153T5.115 4h8.808q.213 0 .356.144t.144.356v2.962q0 .666.475 1.14t1.14.475H19q.213 0 .356.144t.144.356v8.808q0 .69-.462 1.153T17.884 20z"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                    <span>HR System</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['HR System'] }"
                    class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen['HR System']" class="pl-4 mt-1 space-y-1">
                <router-link to="/hr" class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Employee Details</span>
                </router-link>
                <!-- <router-link to="/hr/manualAttendance" v-show="userStore.loggedUser.granted.includes('hradmin')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Manual Attendance</span>
                </router-link> -->
                <router-link to="/hr/attendanceCorrection" v-show="userStore.loggedUser.granted.includes('hradmin')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Attendance Correction</span>
                </router-link>
                <!-- <router-link to="/hr/attendenceLogs" v-show="userStore.loggedUser.granted.includes('hradmin')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Process Attendance Logs</span>
                </router-link> -->
                <router-link to="/hr/holiday" v-show="userStore.loggedUser.granted.includes('hradmin')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Holidays</span>
                </router-link>
                <router-link to="/hr/specialWorkArrangement" v-show="userStore.loggedUser.granted.includes('hradmin')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Special Work Arrangement</span>
                </router-link>
                <router-link to="/hr/dailyAttendanceStatusUpdate" v-show="userStore.loggedUser.granted.includes('hradmin')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Daily Atten. Status Update</span>
                </router-link>

                <div v-show="userStore.loggedUser.granted.includes('hradmin')">
                    <div @click="toggleSubmenu('Reports')"
                        class="flex items-center justify-between px-3 py-2 text-gray-300 rounded cursor-pointer hover:bg-blue-800">
                        <span>Reports</span>
                        <svg :class="{ 'rotate-90': isSubmenuOpen['Reports'] }"
                            class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <!-- Level 3 submenu -->
                    <div v-show="isSubmenuOpen['Reports']" class="pl-4 space-y-1">
                        <router-link to="/hr/reports?p=R1001"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            All Staff OT Reports for the Duration
                        </router-link>
                        <router-link to="/hr/reports?p=R1002"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            OT Month End Summery Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1003"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Daily Attendance Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1004"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Employee Rectification Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1005"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Employee leave Annual Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1006"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Annual Summery Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1007"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            TimeCard Summery Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1008"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            No Pay Summery Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1009"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            No Pay Monthly Report
                        </router-link>
                        <router-link to="/hr/reports?p=R1010"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Supervisor Approval Pending Summery
                        </router-link>
                        <router-link to="/hr/reports?p=R1011"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            HR - Month End Report Summery
                        </router-link>
                        <router-link to="/hr/reports?p=R1012"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Month End Attendance Report Type 1
                        </router-link>
                         <router-link to="/hr/reports?p=R1013"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Month End Attendance Report Type 2
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from '~/stores/modules/userStore';

export default {
    props: ['isOpen'],

    data() {
        return {
            userStore: null,
        }
    },

    setup() {
        const isSubmenuOpen = ref({}); // Object to track submenu states

        const toggleSubmenu = (name) => {
            isSubmenuOpen.value = {
                ...isSubmenuOpen.value,
                [name]: !isSubmenuOpen.value[name],
            };
        };

        return {
            isSubmenuOpen,
            toggleSubmenu,
        };
    },

    async created() {
        this.userStore = useUserStore();
    },
}

</script>