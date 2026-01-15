<template>
    <section>
        <!-- dayInfo?.movementDetails?.id === `00000000-0000-0000-0000-000000000000` &&
            dayInfo?.otDetails?.id === `00000000-0000-0000-0000-000000000000` &&
            dayInfo?.leaveDetails?.id === `00000000-0000-0000-0000-000000000000` &&
            dayInfo?.rectificationDetails?.id === `00000000-0000-0000-0000-000000000000` -->
        <div class="mb-3">
            <span @click="isOtApply= !isOtApply" class="border rounded p-2 mr-2 ">Apply OT</span>
            <span  class="border rounded p-2 mr-2">Apply Leave</span>
            <span @click="isMovementApply= !isMovementApply" class="border rounded p-2 mr-2">Apply Movement</span>
        </div>
        <div v-show="isOtApply" class="mt-5">
            <OtApply @is-ot-apply="isOtApply= !isOtApply"/>
        </div>
        <div v-show="isMovementApply" class="mt-5">
            <MovementApply @is-movement-apply="isMovementApply= !isMovementApply"/>
        </div>
        <div v-if="dayType !== `No-Pay`"
            class="text-center bg-white text-black p-2 rounded mt-1 text-xs whitespace-pre-line">
            No details found..
        </div>
        <div v-else 
            class="grid grid-cols-1 lg:grid-cols-4 bg-white text-black p-2 rounded mt-1 text-xs whitespace-pre-line">
            <!-- MovementDetails -->
            <div
                class="flex flex-col h-full border border-b rounded border-gray-400 mr-2">
                <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold text-center underline border-b border-gray-400">Movement {{ dayInfo?.movementDetails?.type }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">StartTime</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.movementDetails?.startTime) ?
                                formatTime(dayInfo?.movementDetails?.startTime) : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400" >
                            <div class="text-left w-32">EndTime</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.movementDetails?.endTime) ?
                                formatTime(dayInfo?.movementDetails?.endTime) : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">FromLocation</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.fromLocation ?
                                dayInfo?.movementDetails?.fromLocation : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">ToLocation</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.toLocation ?
                                dayInfo?.movementDetails?.toLocation : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">Vehicle</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.vehicle ?
                                dayInfo?.movementDetails?.vehicle : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">Distance</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.distance ?
                                dayInfo?.movementDetails?.distance : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.movementDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.movementDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.movementDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.movementDetails?.status && dayInfo?.movementDetails?.status !== 'Approved' && dayInfo?.movementDetails?.status !== 'Pending' && dayInfo?.movementDetails?.status === 'Deleted'
                                }">
                                    {{ dayInfo?.movementDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end m-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.movementDetails?.id, dayInfo?.movementDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <!-- <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold underline">{{ dayInfo?.movementDetails?.type }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">StartTime</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.movementDetails?.startTime) ?
                                formatTime(dayInfo?.movementDetails?.startTime) : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">EndTime</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.movementDetails?.endTime) ?
                                formatTime(dayInfo?.movementDetails?.endTime) : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">FromLocation</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.fromLocation ?
                                dayInfo?.movementDetails?.fromLocation : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">ToLocation</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.toLocation ?
                                dayInfo?.movementDetails?.toLocation : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">Vehicle</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.vehicle ?
                                dayInfo?.movementDetails?.vehicle : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">Distance</div>
                            <div class="text-left">: {{ dayInfo?.movementDetails?.distance ?
                                dayInfo?.movementDetails?.distance : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.movementDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.movementDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.movementDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.movementDetails?.status && dayInfo?.movementDetails?.status !== 'Approved' && dayInfo?.movementDetails?.status !== 'Pending' && dayInfo?.movementDetails?.status === 'Deleted'
                                }">
                                    {{ dayInfo?.movementDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.movementDetails?.id, dayInfo?.movementDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div> -->
            </div>

            <!-- OTDetails -->
            <div
                class="flex flex-col h-full border border-b rounded border-gray-400 mr-2 space-y-2">
                <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold text-center underline border-b border-gray-400">OT {{ dayInfo?.otDetails?.type }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">OverTimeFrom</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.otDetails?.overTimeStart) ?
                                formatTime(dayInfo?.otDetails?.overTimeStart) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">OverTimeTo</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.otDetails?.overTimeEnd) ?
                                formatTime(dayInfo?.otDetails?.overTimeEnd) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">OTHours</div>
                            <div class="text-left">: {{ dayInfo?.otDetails?.otRequestedHours ?
                                dayInfo?.otDetails?.otRequestedHours : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">NatureOfWork</div>
                            <div class="text-left">: {{ dayInfo?.otDetails?.natureOfWork ?
                                dayInfo?.otDetails?.natureOfWork : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.otDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.otDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.otDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.otDetails?.status && dayInfo?.otDetails?.status !== 'Approved' && dayInfo?.otDetails?.status !== 'Pending' && dayInfo?.otDetails?.status !== 'Deleted'
                                }">
                                    {{ dayInfo?.otDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end m-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.otDetails?.id, dayInfo?.otDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <!-- <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold underline">{{ dayInfo?.otDetails?.type }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">OverTimeFrom</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.otDetails?.overTimeStart) ?
                                formatTime(dayInfo?.otDetails?.overTimeStart) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">OverTimeTo</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.otDetails?.overTimeEnd) ?
                                formatTime(dayInfo?.otDetails?.overTimeEnd) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">OTHours</div>
                            <div class="text-left">: {{ dayInfo?.otDetails?.otRequestedHours ?
                                dayInfo?.otDetails?.otRequestedHours : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">NatureOfWork</div>
                            <div class="text-left">: {{ dayInfo?.otDetails?.natureOfWork ?
                                dayInfo?.otDetails?.natureOfWork : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.otDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.otDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.otDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.otDetails?.status && dayInfo?.otDetails?.status !== 'Approved' && dayInfo?.otDetails?.status !== 'Pending' && dayInfo?.otDetails?.status !== 'Deleted'
                                }">
                                    {{ dayInfo?.otDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.otDetails?.id, dayInfo?.otDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div> -->
            </div>

            <!-- LeaveDetails -->
            <div
                class="flex flex-col h-full border border-b rounded border-gray-400 mr-2 space-y-2">
                <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold text-center underline border-b border-gray-400">Leave {{ dayInfo?.leaveDetails?.type ?
                            dayInfo?.leaveDetails?.type : "N/A" }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">EndDate</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.endDate ?
                                dayInfo?.leaveDetails?.endDate : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">AbsenceType</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.absenceType ?
                                dayInfo?.leaveDetails?.absenceType : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">DurationDays</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.durationDays ?
                                dayInfo?.leaveDetails?.durationDays : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">DurationHours</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.durationHours ?
                                dayInfo?.leaveDetails?.durationHours : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">Attachment</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.attachment ?
                                dayInfo.leaveDetails.attachment
                                : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.leaveDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.leaveDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.leaveDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.leaveDetails?.status && dayInfo?.leaveDetails?.status !== 'Approved' && dayInfo?.leaveDetails?.status !== 'Pending' && dayInfo?.leaveDetails?.status === 'Deleted'
                                }">
                                    {{ dayInfo?.leaveDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end m-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.leaveDetails?.id, dayInfo?.leaveDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <!-- <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold underline">{{ dayInfo?.leaveDetails?.type ?
                            dayInfo?.leaveDetails?.type : "N/A" }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">EndDate</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.endDate ?
                                dayInfo?.leaveDetails?.endDate : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">AbsenceType</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.absenceType ?
                                dayInfo?.leaveDetails?.absenceType : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">DurationDays</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.durationDays ?
                                dayInfo?.leaveDetails?.durationDays : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">DurationHours</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.durationHours ?
                                dayInfo?.leaveDetails?.durationHours : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">Attachment</div>
                            <div class="text-left">: {{ dayInfo?.leaveDetails?.attachment ?
                                dayInfo.leaveDetails.attachment
                                : 'N/A' }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.leaveDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.leaveDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.leaveDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.leaveDetails?.status && dayInfo?.leaveDetails?.status !== 'Approved' && dayInfo?.leaveDetails?.status !== 'Pending' && dayInfo?.leaveDetails?.status === 'Deleted'
                                }">
                                    {{ dayInfo?.leaveDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.leaveDetails?.id, dayInfo?.leaveDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div> -->
            </div>

            <!-- RectificationDetails -->
            <div
                class="flex flex-col h-full border border-b rounded border-gray-400 mr-2 space-y-2">
                <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold text-center underline border-b border-gray-400">Rectification{{ dayInfo?.rectificationDetails?.type ?
                            dayInfo?.rectificationDetails?.type : "N/A" }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">BeforeRectify</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.rectificationDetails?.beforeRectify) ?
                                formatTime(dayInfo?.rectificationDetails?.beforeRectify) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">AfterRectify</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.rectificationDetails?.afterRectify) ?
                                formatTime(dayInfo?.rectificationDetails?.afterRectify) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">In or Out</div>
                            <div class="text-left">: {{ dayInfo?.rectificationDetails?.inorOut ?
                                dayInfo?.rectificationDetails?.inorOut : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center p-2 border-b border-gray-400">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.rectificationDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.rectificationDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.rectificationDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.rectificationDetails?.status && dayInfo?.rectificationDetails?.status !== 'Approved' && dayInfo?.rectificationDetails?.status !== 'Pending' && dayInfo?.rectificationDetails?.status === 'Deleted'
                                }">
                                    {{ dayInfo?.rectificationDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end m-2">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.rectificationDetails?.id, dayInfo?.rectificationDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div>
                <!-- <div>
                    <div class="flex-1 space-y-3">
                        <div class="text-lg text-bold underline">{{ dayInfo?.rectificationDetails?.type ?
                            dayInfo?.rectificationDetails?.type : "N/A" }}</div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">BeforeRectify</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.rectificationDetails?.beforeRectify) ?
                                formatTime(dayInfo?.rectificationDetails?.beforeRectify) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">AfterRectify</div>
                            <div class="text-left">: {{ formatTime(dayInfo?.rectificationDetails?.afterRectify) ?
                                formatTime(dayInfo?.rectificationDetails?.afterRectify) : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">In or Out</div>
                            <div class="text-left">: {{ dayInfo?.rectificationDetails?.inorOut ?
                                dayInfo?.rectificationDetails?.inorOut : "N/A" }}</div>
                        </div>
                        <div class="grid grid-cols-2 space-x-4 text-center">
                            <div class="text-left w-32">Status</div>
                            <div class="text-left">
                                : <span class="p-1 rounded" :class="{
                                    'bg-green-300': dayInfo?.rectificationDetails?.status === 'Approved',
                                    'bg-yellow-300': dayInfo?.rectificationDetails?.status === 'Pending',
                                    'bg-red-300': dayInfo?.rectificationDetails?.status === 'Deleted',
                                    'bg-gray-300': dayInfo?.rectificationDetails?.status && dayInfo?.rectificationDetails?.status !== 'Approved' && dayInfo?.rectificationDetails?.status !== 'Pending' && dayInfo?.rectificationDetails?.status === 'Deleted'
                                }">
                                    {{ dayInfo?.rectificationDetails?.status }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 p-1 rounded bg-red-500 hover:bg-red-600 text-white mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            @click="deleteRecord(dayInfo?.rectificationDetails?.id, dayInfo?.rectificationDetails?.type)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script>

import OtApply from "~/components/hr/otApply";
import MovementApply from "~/components/hr/movementcreate";

export default {
    props: ["dayInfo","dayType"],
    components: {
        OtApply,
        MovementApply
    },

    data() {
        return {
            showLoading: null,
            isOtApply: false,
            isMovementApply: false,
        }
    },

    async created() {
        this.showLoading = this.$showLoading;
    },

    methods: {
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