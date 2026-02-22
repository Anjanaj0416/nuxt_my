<template>
    <section>
        <div class="mb-3 flex gap-2">
            <span 
                @click="togglePanel(dayInfo.id, 'isOtApply')"
                class="text-xs px-3 py-1 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-50 cursor-pointer transition duration-200"
            >
                {{ activePanel.rowId === dayInfo.id && activePanel.type === 'isOtApply' ? 'Close Apply OT' : 'Apply OT' }}
            </span>

            <span 
                @click="togglePanel(dayInfo.id, 'isLeaveApply'); loadAbsenceInitData(); loadLeaveBalance()" 
                class="text-xs px-3 py-1 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-50 cursor-pointer transition duration-200"
            >
                {{ activePanel.rowId === dayInfo.id && activePanel.type === 'isLeaveApply' ? 'Close Apply Leave' : 'Apply Leave' }}
            </span>

            <span 
                @click="togglePanel(dayInfo.id, 'isMovementApply'); loadMovementInitData()" 
                class="text-xs px-3 py-1 rounded-lg border-2 border-gray-500 text-gray-500 hover:bg-gray-50 cursor-pointer transition duration-200"
            >
                    {{ activePanel.rowId === dayInfo.id && activePanel.type === 'isMovementApply' ? 'Close Apply Movement' : 'Apply Movement' }}
            </span>
        </div>
        <div v-show="activePanel.rowId === dayInfo.id && activePanel.type === 'isOtApply'" class="col-span-12 mt-2 mx-4 text-left p-2 bg-white rounded-lg shadow-sm">
            <OtApply @is-ot-apply="togglePanel(dayInfo.id, 'isOtApply')" :empno="empno" :dtFrom="dtFrom" :rowId="dayInfo.id"/>
        </div>
        <div v-show="activePanel.rowId === dayInfo.id && activePanel.type === 'isLeaveApply'" class="mt-5">
            <LeaveApply @is-leave-apply="togglePanel(dayInfo.id, 'isLeaveApply')" :empno="empno" :fromDate="dtFrom" :leaveyear="leaveYear"/>
        </div>
        <div v-show="activePanel.rowId === dayInfo.id && activePanel.type === 'isMovementApply'" class="mt-5">
            <MovementApply @is-movement-apply="togglePanel(dayInfo.id, 'isMovementApply')" :empno="empno" :dtFrom="dtFrom" :leaveyear="leaveYear"/>
        </div>

        <DailyPanel   v-show="!(
    activePanel.rowId === dayInfo.id &&
    ['isOtApply', 'isLeaveApply', 'isMovementApply'].includes(activePanel.type)
  )" :dayInfo="dayInfo" :empno="empno" :dtFrom="dtFrom"/>

    </section>
</template>

<script>

import OtApply from "~/components/hr/0.1_hr/otApply";
import MovementApply from "~/components/hr/0.1_hr/movementApply";
import LeaveApply from "~/components/hr/0.1_hr/leaveApply";
import DailyPanel from "~/components/hr/0.1_hr/dailyPanel";

import { useMovementStore } from "~/stores/modules/hr/movementStore";
import { useLeaveStore } from "~/stores/modules/hr/leaveStore";

export default {
    props: ["dayInfo","dayType","empno","dtFrom"],
    components: {
        OtApply,
        MovementApply,
        LeaveApply,
        DailyPanel
    },

    data() {
        return {
            showLoading: null,
            isOtApply: false,
            isLeaveApply: false,
            isMovementApply: false,
            leaveYear: "",

            movementStore: null,
            leaveStore: null,

                  activePanel: {
        rowId: null,
        type: null, // 'rectify' or 'view'
      },
        }
    },

    async created() {

        this.movementStore = useMovementStore();
        this.leaveStore = useLeaveStore();
        this.leaveYear = new Date().getFullYear()
        this.showLoading = this.$showLoading;
    },

    methods: {

        togglePanel(rowId, type) {
            // Close if clicking same panel, else open new one
            if (this.activePanel.rowId === rowId && this.activePanel.type === type) {
                this.activePanel = { rowId: null, type: null };
            } else {
                this.activePanel = { rowId, type };
            }
        },

        async loadMovementInitData() { 
            await this.movementStore.getMovementInitData(this.showLoading)
        },

        async loadAbsenceInitData() { 
            await this.leaveStore.getAbsenceInitData()
        },

        async loadLeaveBalance() { 
            let req = {
                empNo: this.empno,
                year: this.leaveYear,
            }
            await this.leaveStore.getLeaveBalance(req, this.showLoading)
        },

        async deleteRecord(id, type) {
            await this.$emit("test", { id, type });
        },

        formatTime(timeString) {
            if (!timeString) return 'N/A';

            try {
                // Check if the input matches HH:MM format
                const timeRegex = /^(\d{1,2}):(\d{2})$/;
                const match = timeString.match(timeRegex);

                if (!match) throw new Error('Invalid time format');

                let [_, hours, minutes] = match;
                hours = parseInt(hours);
                minutes = parseInt(minutes);

                // Validate hours and minutes
                if (hours > 23 || minutes > 59) throw new Error('Invalid time values');

                const ampm = hours >= 12 ? 'PM' : 'AM';
                const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
                return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
            } catch (error) {
                console.error('Invalid time format:', timeString, error);
                return timeString || 'N/A';
            }

            // if (!timeString) return 'N/A';
            // try {
            //     const date = new Date(timeString);
            //     console.log("date:", date);

            //     if (isNaN(date.getTime())) throw new Error('Invalid time');
            //     const hours = date.getHours();
            //     const minutes = String(date.getMinutes()).padStart(2, '0');
            //     const ampm = hours >= 12 ? 'PM' : 'AM';
            //     const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
            //     return `${String(hours12).padStart(2, '0')}:${minutes} ${ampm}`;
            // } catch (error) {
            //     console.error('Invalid time format:', timeString, error);
            //     return timeString || 'N/A';
            // }
        },
    }
}

</script>