<template>
    <section>
        <div class="grid grid-cols-1 lg:grid-cols-4 bg-white text-black p-2 rounded mt-1 text-xs whitespace-pre-line ">
            <!-- MovementDetails -->
            <div v-if="dayInfo.movementDetails"
                class="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-gray-400 mr-2">
                <div class="flex-1 space-y-3">
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">StartTime</div>
                        <div class="text-left">: {{ formatTime(dayInfo.movementDetails.StartTime) }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">EndTime</div>
                        <div class="text-left">: {{ formatTime(dayInfo.movementDetails.EndTime) }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">FromLocation</div>
                        <div class="text-left">: {{ dayInfo.movementDetails.FromLocation }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">ToLocation</div>
                        <div class="text-left">: {{ dayInfo.movementDetails.ToLocation }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">Vehicle</div>
                        <div class="text-left">: {{ dayInfo.movementDetails.Vehicle }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">Distance</div>
                        <div class="text-left">: {{ dayInfo.movementDetails.Distance }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">Status</div>
                        <div class="text-left">
                            : <span class="p-1 rounded" :class="{
                                'bg-green-300': dayInfo?.movementDetails?.ApprovalStatus === 'Approved',
                                'bg-yellow-300': dayInfo?.movementDetails?.ApprovalStatus === 'Pending',
                                'bg-gray-300': dayInfo?.movementDetails?.ApprovalStatus && dayInfo.movementDetails.ApprovalStatus !== 'Approved' && dayInfo.movementDetails.ApprovalStatus !== 'Pending'
                            }">
                                {{ dayInfo.movementDetails.ApprovalStatus }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>

            <!-- OTDetails -->
            <div v-if="dayInfo.OTDetails"
                class="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-gray-400 mr-2 space-y-2">
                <div class="flex-1 space-y-3">
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">OverTimeFrom</div>
                        <div class="text-left">: {{ formatTime(dayInfo.OTDetails.OverTimeFrom) }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">OverTimeTo</div>
                        <div class="text-left">: {{ formatTime(dayInfo.OTDetails.OverTimeTo) }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">OTHours</div>
                        <div class="text-left">: {{ dayInfo.OTDetails.OTHours }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">NatureOfWork</div>
                        <div class="text-left">: {{ dayInfo.OTDetails.NatureOfWork }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">Status</div>
                        <div class="text-left">
                            : <span class="p-1 rounded" :class="{
                                'bg-green-300': dayInfo?.OTDetails?.Status === 'Approved',
                                'bg-yellow-300': dayInfo?.OTDetails?.Status === 'Pending',
                                'bg-gray-300': dayInfo?.OTDetails?.Status && dayInfo.OTDetails.Status !== 'Approved' && dayInfo.OTDetails.Status !== 'Pending'
                            }">
                                {{ dayInfo.OTDetails.Status }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>

            <!-- LeaveDetails -->
            <div v-show="dayInfo.LeaveDetails"
                class="flex flex-col h-full border-b lg:border-b-0 lg:border-r border-gray-400 mr-2 space-y-2">
                <div class="flex-1 space-y-3">
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">EndDate</div>
                        <div class="text-left">: {{ dayInfo.LeaveDetails.EndDate }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">AbsenceType</div>
                        <div class="text-left">: {{ dayInfo.LeaveDetails.AbsenceType }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">DurationDays</div>
                        <div class="text-left">: {{ dayInfo.LeaveDetails.DurationDays }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">DurationHours</div>
                        <div class="text-left">: {{ dayInfo.LeaveDetails.DurationHours }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">Attachment</div>
                        <div class="text-left">: {{ dayInfo.LeaveDetails.Attachment }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">Status</div>
                        <div class="text-left">
                            : <span class="p-1 rounded" :class="{
                                'bg-green-300': dayInfo?.LeaveDetails?.ApprovalStatus === 'Approved',
                                'bg-yellow-300': dayInfo?.LeaveDetails?.ApprovalStatus === 'Pending',
                                'bg-gray-300': dayInfo?.LeaveDetails?.ApprovalStatus && dayInfo.LeaveDetails.ApprovalStatus !== 'Approved' && dayInfo.LeaveDetails.ApprovalStatus !== 'Pending'
                            }">
                                {{ dayInfo.LeaveDetails.ApprovalStatus }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>

            <!-- RectificationDetails -->
            <div v-show="dayInfo.RectificationDetails" class="flex flex-col h-full mr-2 space-y-2">
                <div class="flex-1 space-y-3">
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">BeforeRectify</div>
                        <div class="text-left">: {{ formatTime(dayInfo.RectificationDetails.BeforeRectify) }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">AfterRectify</div>
                        <div class="text-left">: {{ formatTime(dayInfo.RectificationDetails.AfterRectify) }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">In or Out</div>
                        <div class="text-left">: {{ dayInfo.RectificationDetails.InorOut }}</div>
                    </div>
                    <div class="grid grid-cols-2 space-x-4 text-center">
                        <div class="text-left w-32">Status</div>
                        <div class="text-left">
                            : <span class="p-1 rounded" :class="{
                                'bg-green-300': dayInfo?.RectificationDetails?.ApprovalStatus === 'Approved',
                                'bg-yellow-300': dayInfo?.RectificationDetails?.ApprovalStatus === 'Pending',
                                'bg-gray-300': dayInfo?.RectificationDetails?.ApprovalStatus && dayInfo.RectificationDetails.ApprovalStatus !== 'Approved' && dayInfo.RectificationDetails.ApprovalStatus !== 'Pending'
                            }">
                                {{ dayInfo.RectificationDetails.ApprovalStatus }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ["dayInfo"],

    methods: {
        formatTime(timeString) {
            if (!timeString) return 'N/A';
            try {
                const date = new Date(timeString);
                if (isNaN(date.getTime())) throw new Error('Invalid time');
                const hours = date.getHours();
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const ampm = hours >= 12 ? 'PM' : 'AM';
                const hours12 = hours % 12 || 12; // Convert 0 to 12 for midnight
                return `${String(hours12).padStart(2, '0')}:${minutes} ${ampm}`;
            } catch (error) {
                console.error('Invalid time format:', timeString, error);
                return timeString || 'N/A';
            }
        },
    }
}

</script>