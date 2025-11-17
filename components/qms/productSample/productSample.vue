<template>
    <section class="justify-center">
        <div class="bg-white border rounded-lg shadow-md p-6 text-sm text-gray-800">
            <div class="flex items-center justify-between mb-6">
                <div class="text-2xl uppercase mb-6">
                    Product Sample 
                </div>
                <!-- Button Section (Right) -->
                <div class="w-full md:w-auto">
                    <div class="mr-2" >
                        <Button
                            class="w-26 px-4 py-1.5 mt-2 rounded-full text-xs transition"
                            label="Create"
                            variant="primary"
                            v-if="
                                (status !== '' && status !== '') &&
                                (userStore.loggedUser.granted.includes('su') ||
                                userStore.loggedUser.granted.includes('sso') )
                            "
                            @click="GoToAddNew"
                        />
                    </div>
                </div>
            </div>
            <!-- {{ taskhubStore.taskDetailsList }} -->
            <!-- Payment History Section -->
      

            <!-- KPI Leads -->
            <div
                v-for="(lead, index) in taskhubStore.taskDetailsList"
                :key="index"
            >
                <div class="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between px-2">
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Job</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.jobType || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Pendin gWork Group</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.pendingWorkGroup || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Company</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.clientName || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Description</h1>
                        <p class="text-sm text-gray-500 mt-0.5">{{ lead.jobDescription || 'No Data' }}</p>
                    </div>
                    <div>
                        <h1 class="text-[12px] font-semibold text-gray-600">Status</h1>
                        <span
                        :class="{
                            'bg-gray-100 text-gray-700': !lead.jobStatus,
                            'bg-yellow-100 text-yellow-800': lead.jobStatus === 'Pending',
                            'bg-red-100 text-red-800': lead.jobStatus === 'Cancelled',
                            'bg-orange-100 text-orange-800': lead.jobStatus === 'Hold',
                            'bg-green-100 text-green-800': lead.jobStatus === 'Completed',
                        }"
                        class="text-[12px] font-medium px-2.5 py-0.5 rounded-full"
                        >
                        {{ lead.jobStatus || 'Unknown' }}
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
        <addProductSample  :vendorId="vendorId" v-if="isaAssig" @close="isaAssig = false" />
    </section>
</template>
  
<script>
    import { useRoute } from 'vue-router'
    import { useUserStore } from "~/stores/modules/userStore";
    import { useTaskhubStore } from '~/stores/modules/taskHub/taskhubStore';
    import imagepicker1 from "~/components/customcontrol/imagepickermultiple.vue";
    import LinkBtn from "~/components/customcontrol/Link";
    import Button from "~/components/customcontrol/Button";
    import addProductSample from '../productSample/addProductSample.vue';


 
    definePageMeta({
        layout: "default",
        middleware: "auth",
    });

    export default {
        components:{imagepicker1,addProductSample,Button,LinkBtn,imagepicker1},
        props: ['id', 'vendorId'],

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
        this.taskhubStore = useTaskhubStore();

        const req = {
            taskType: "DtlBannerMgt",
            searchValue : "BD86C93A-37CD-4D12-4DE1-08DE0AD24517",
            searchBy : "100"
        }
        await this.taskhubStore.TaskDetailsList(req, this.showLoading);

        this.taskDetailsList = this.taskhubStore.taskDetailsList

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
  
  
  