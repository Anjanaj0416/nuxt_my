<template>
    <section>
        <div v-if="attendanceStore.dailyEmpsInOutDetails?.length > 0">
            <div v-for="attend in attendanceStore.dailyEmpsInOutDetails">
                <div class="my-5">
                    <span class="border p-2 ">Date : {{attend.date}}</span>
                    <button type="button" class="ml-2" @click="toggleAttend(attend.date)">
                        <svg v-if="!isAttendOpen[attend.date]" width="16" height="16" viewBox="0 0 16 16" fill="none" class="mr-3"
                            xmlns="http://www.w3.org/2000/svg">
                            <path class="down-arrow" d="M2 5L8 11L14 5" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none"
                            class="mr-3" xmlns="http://www.w3.org/2000/svg">
                            <path class="up-arrow" d="M2 11L8 5L14 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div v-if="attendanceStore.dailyEmpsInOutDetails?.length > 0 && isAttendOpen[attend.date]">
                   
                    <div class="grid w-full grid-cols-1 p-2 text-center text-white bg-blue-800 lg:grid-cols-6 rounded-t-md">
                        
                        <div class="hidden lg:block">Emp No</div>
                        <div class="hidden lg:block">In Time</div>
                        <div class="hidden lg:block">Out Time</div>
                        <div class="hidden lg:block">In Location</div>
                        <div class="hidden lg:block">Out Location</div>
                        <div class="hidden lg:block">Leave Status</div>
                    </div>

                    <div v-for="data in attend?.listEmpInOutDetails">
                        <div class="w-full p-2 mt-1 text-white bg-gray-600 rounded-md">
                    
                            <div class="grid grid-cols-1 text-center lg:grid-cols-6">
                                <div>{{ data.empNo }}</div>
                                <div>{{ data.inTime }}</div>
                                <div>{{ data.outTime }}</div>
                                <div>{{ data.inLocation }}</div>
                                <div>{{ data.outLocation }}</div>
                                <div>
                                 
                                   <SearchInput                                           
                                          :arrItems="attendanceStore.initDailyEmpsInOut"
                                            ref="campLeaveStatus"
                                            label=""                                          
                                            v-model="data.leaveStatus"
                                            :exisitngId="data.leaveStatus"
                                            @selectItem="SetAtendanceStatus"
                                            @click = "curRowId=data.id"
                                             />
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="statusArr.length > 0 && isAttendOpen[attend.date]" class="text-right">
                    <button type="button" @click="setDailyEmpsInOutDetails()"
                        class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2">
                        Submit
                    </button>
                </div>
           
            </div>
        </div>
        <div v-else>
            No data found..
        </div>
    </section>
</template>


<script>

import SearchInput from "~/components/customcontrol/SearchInput";
import { useAttendanceStore } from "~/stores/modules/hr/attendanceStore";

definePageMeta({
    layout: 'default',
    middleware: 'auth',
});

export default {

    components: {
        SearchInput,
    },

    props: [''],
    data() {
        return {
            showLoading: null,
            isReport: false,
            selectedToDate: '',
            selectedFromDate: '',
            statusMap: {},
            statusArr:[],
            isAttendOpen:{},
            selectedLeaveStatus:-1,
            curRowId:'',
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
        toggleAttend(date) {
            this.isAttendOpen[date] = !this.isAttendOpen[date]
        },

       
        SetAtendanceStatus(item){                 
            let statusObj = {
                Id:this.curRowId ,
                StatusId: item.id
            }
         
            this.statusArr.push(statusObj);
        },

        async setDailyEmpsInOutDetails(){
            await this.attendanceStore.setDailyEmpsInOutDetails(this.statusArr,this.$showLoading);
            this.statusArr = [];
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