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
                                (orderStatus !== 'Cancelled' && status !== 'FullPaid') &&
                                (userStore.loggedUser.granted.includes('su') ||
                                userStore.loggedUser.granted.includes('sso') )
                            "
                            @click="GoToAddNew"
                        />
                    </div>
                </div>
            </div>

            <!-- {{ taskhubStore.storeMateriallList }} -->

            <!-- Payment History Section -->
            <div v-if="taskhubStore.storeMateriallList  === 0" class="text-center text-gray-900 mt-5 text-sm font-medium">
                <p>No KPI available...</p>
            </div>

            <!-- KPI Leads -->
             {{  }}
            <div
                v-for="(lead, index) in taskhubStore.storeMateriallList"
                :key="index"
                class="bg-white border rounded-xl shadow-sm p-5 mb-4 hover:shadow-md transition-all duration-300"
            >

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                    <div class="space-y-1">
                        <h1 class="text-[12px] font-semibold text-gray-600">Job</h1>
                        <p class="text-sm text-gray-500">{{ lead.taskType || 'No Data' }}</p>
                    </div>
                    <div class="space-y-1">
                        <h1 class="text-[12px] font-semibold text-gray-600">No Of Days Pending</h1>
                        <p class="text-sm text-gray-500">{{ lead.noOfDaysPending || 'No Data' }}</p>
                    </div>
                    <div class="space-y-1">
                        <h1 class="text-[12px] font-semibold text-gray-600">Task Created Date</h1>
                        <p class="text-sm text-gray-500">{{ lead.taskCreatedDate || 'No Data' }}</p>
                    </div>
                    <div class="space-y-1">
                        <h1 class="text-[12px] font-semibold text-gray-600">Description</h1>
                        <p class="text-sm text-gray-500 line-clamp-2">{{ lead.description || 'No Data' }}</p>
                    </div>
                    <div class="space-y-1">
                        <h1 class="text-[12px] font-semibold text-gray-600">Status</h1>
                        <span
                            :class="{
                            'bg-gray-100 text-gray-700': !lead.status,
                            'bg-yellow-100 text-yellow-800': lead.status === 'Pending',
                            'bg-red-100 text-red-800': lead.status === 'Cancelled',
                            'bg-orange-100 text-orange-800': lead.status === 'Hold',
                            'bg-green-100 text-green-800': lead.status === 'Completed',
                            }"
                            class="text-[12px] font-medium px-3 py-1 rounded-full inline-block shadow-sm"
                        >
                            {{ lead.status || 'Unknown' }}
                        </span>
                    </div>
                    <div class="flex items-end">
                    <!-- <a
                        :href="lead.moreDetailsUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        View More →
                    </a> -->
                    
                    <button  @click="viewTaskDetails(lead.taskId)"  class="px-3 py-1.5 text-xs bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                        font-semibold transition text-white rounded-full shadow">View More →</button>

                    </div>
                   
                </div>
                 <!-- {{ lead }} -->
            </div>
        </div>
        <assigDtp :orderId="selectedOrderId" :vendorId="clientId" v-if="isaAssig" @close="isaAssig = false" />
    </section>
</template>
  
<script>
    import { useRoute } from 'vue-router'
    import { useUserStore } from "~/stores/modules/userStore";
    import { useTaskhubStore } from '~/stores/modules/taskHub/taskhubStore';
    import imagepicker1 from "~/components/customcontrol/imagepickermultiple.vue";
    import LinkBtn from "~/components/customcontrol/Link";
    import Button from "~/components/customcontrol/Button";
    import assigDtp from '~/components/taskHub/bannerMgt/assigDtp.vue';


 
    definePageMeta({
        layout: "default",
        middleware: "auth",
    });

    export default {
        components:{imagepicker1,assigDtp,Button,LinkBtn,imagepicker1},
        props: ['id', 'clientId', 'orderStatus'],

        data() {
            return {
            isaAssig: false,
            expandedRow: null, 
            };
        },

    async created() {
        this.userStore = useUserStore();
        this.imageroot = this.userStore.loggedUser.resourceURLRoot;
        this.showLoading = this.$showLoading;
        this.taskhubStore = useTaskhubStore();

        await this.taskhubStore.StoreMaterialTasks(this.clientId, this.showLoading);

        this.storeMateriallList = this.taskhubStore.storeMateriallList
    },

    mounted() {
        // const queryId = this.$route.query.id;
        // this.openFromRoute(queryId);
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

        viewTaskDetails(taskId)  {
            navigateTo({
                path: '/Taskhub',
                query: {
                    id: taskId,
                    // searchBy: '101'
                }
            })
        },

        // openFromRoute(queryId) {
        // if (!queryId) {
        //     this.expandedRow = null;
        //     this.filteredKpiId = null;
        //     return;
        // }
        // const foundIndex = this.taskhubStore.storeMateriallList.findIndex(v => v.taskId === queryId);
        // if (foundIndex !== -1) {
        //     this.expandedRow = foundIndex;
        //     this.filteredKpiId = this.taskhubStore.storeMateriallList[foundIndex].taskIdid;
        // }
        // },

        // toggleKpiView(taskId, index) {
        // if (this.expandedRow === index) {
        //     this.expandedRow = null;
        //     this.filteredKpiId = null;
        //     this.$router.replace({ path: this.$route.path, query: {} });
        // } else {
        //     this.expandedRow = index;
        //     this.filteredKpiId = taskId;
        //     this.$router.replace({ path: this.$route.path, query: { taskId } });
        // }
        // }

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
  
  
  