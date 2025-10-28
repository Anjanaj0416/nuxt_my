<template>
    <section class="justify-center">
        <div class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800">
            <div class="flex items-center justify-between mb-6">
                <div class="text-2xl uppercase mb-6">
                    Store 
                </div>
                <!-- Button Section (Right) -->
                <div class="w-full md:w-auto">
                    <div class="mr-2" >
                        <Button
                            class="w-26 px-4 py-1.5 mt-2 rounded-full text-xs transition"
                            label="Create"
                            variant="primary"
                            v-if="
                                (status !== 'Canceled' && status !== 'FullPaid') &&
                                (userStore.loggedUser.granted.includes('su') ||
                                userStore.loggedUser.granted.includes('accdept') )
                            "
                            @click="GoToAddNew"
                        />
                    </div>
                </div>
            </div>

            <!-- Payment History Section -->
            <div v-if="listKpi.length === 0" class="text-center text-gray-900 mt-5 text-sm font-medium">
            <p>No KPI available...</p>
            </div>

            <!-- KPI Leads -->
            <div
                v-for="(lead, index) in listKpi"
                :key="index"
            >
                <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between px-2">
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Job</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.job || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Company</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.companyName || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Completed Date</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.completedDate || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Assign By</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.kpiAssignTo || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Reported By</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.reportedBy || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Status</h1>
                        <span
                        :class="{
                            'bg-gray-100 text-gray-700': !lead.status,
                            'bg-yellow-100 text-yellow-800': lead.status === 'Pending',
                            'bg-red-100 text-red-800': lead.status === 'Cancelled',
                            'bg-orange-100 text-orange-800': lead.status === 'Hold',
                            'bg-green-100 text-green-800': lead.status === 'Completed',
                        }"
                        class="text-[12px] font-medium px-2.5 py-0.5 rounded-full"
                        >
                        {{ lead.status || 'Unknown' }}
                        </span>
                    </div>
                    <div class="flex flex-col items-center  mt-1 mb-2 sm:flex-row sm:justify-end sm:mb-0 sm:mt-0 sm:-my-3">
                        <button
                            class="text-black dark:bg-transparent text-xs font-medium dark:text-blue-900 cursor-pointer px-4 py-2 text-sm font-medium text-blue-900 rounded-md hover:font-bold underline"
                            @click="toggleKpiView(lead.id, index)"
                        >
                            More Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <assigDtp :orderId="selectedOrderId" v-if="isaAssig" @close="isaAssig = false" />
    </section>
</template>
  
<script>
    import { useRoute } from 'vue-router'
    import { useUserStore } from "~/stores/modules/userStore";
    import imagepicker1 from "~/components/customcontrol/imagepickermultiple.vue";
    import LinkBtn from "~/components/customcontrol/Link";
    import Button from "~/components/customcontrol/Button";
    import assigDtp from '../workFlow/assigDtp.vue';


 
    definePageMeta({
        layout: "default",
        middleware: "auth",
    });

    export default {
        components:{imagepicker1,assigDtp,Button,LinkBtn,imagepicker1},
    data() {
        return {
        isaAssig: false,
        expandedRow: null, 
        listKpi: [
            {
            id: "wf001",
            job: "New Category",
            assignDate: "2025.09.12",
            completedDate: "2025.09.15",
            kpiAssignTo: "Sandari",
            status: "Pending",
            noofDaysPending: 3,
            contactPhoneNo: "077-1234567",
            isActive: true,
            },
            

        ],
        };
    },

    async created() {
        this.userStore = useUserStore();
        this.imageroot = this.userStore.loggedUser.resourceURLRoot;
        this.showLoading = this.$showLoading;
    },

    mounted() {
        const queryId = this.$route.query.id;
        this.openFromRoute(queryId);
    },

    methods: {

        GoToAddNew() {
        this.isaAssig = true;
        },
        
        handleSelectedImages(files) {
            console.log('Selected Files:', files);
        },

        handleDeleteExistingImage(index) {
            mageroots.value.splice(index, 1);
        },

        openFromRoute(queryId) {
        if (!queryId) {
            this.expandedRow = null;
            this.filteredKpiId = null;
            return;
        }
        const foundIndex = this.listKpi.findIndex(v => v.id === queryId);
        if (foundIndex !== -1) {
            this.expandedRow = foundIndex;
            this.filteredKpiId = this.listKpi[foundIndex].id;
        }
        },

        toggleKpiView(id, index) {
        if (this.expandedRow === index) {
            this.expandedRow = null;
            this.filteredKpiId = null;
            this.$router.replace({ path: this.$route.path, query: {} });
        } else {
            this.expandedRow = index;
            this.filteredKpiId = id;
            this.$router.replace({ path: this.$route.path, query: { id } });
        }
        }

    },
    
    };
</script>
  
<style scoped>
    .csscmd{
        @apply p-2 text-center bg-blue-200 rounded;
    }
    .csscmd:hover{
        @apply bg-blue-200 cursor-pointer;
    }

    .cssBox {
        border: 1px solid;
        @apply border-gray-500 rounded p-2;
    }

    @keyframes glow {
    0% {
        box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
    }
    50% {
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
    }
    100% {
        box-shadow: 0 0 0px rgba(255, 0, 0, 0.5);
    }
    }

    .animate-glow {
        animation: glow 1.5s infinite ease-in-out;
    }
</style>
  
  
  