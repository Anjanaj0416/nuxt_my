<template>
  <section class="empdetails">

    <div class="relative min-h-screen px-4 pt-2 text-sm" v-show="employeeStore?.empdetails?.id">
      <div class="absolute top-0 right-0 flex mt-8 mr-8 gap-x-4">
        <div v-show="userStore.loggedUser.granted.includes('hradmin') || userStore.loggedUser.granted.includes('su')"
          class="btn" @click="setEdit">Edit</div>
        <!-- <div v-show="userStore.loggedUser.granted.includes('hradmin') || userStore.loggedUser.granted.includes('su')"
          class="btn" @click="setdelete">Delete</div> -->


        <div class="cursor-pointer text-gray-500 hover:text-gray-800" title="Exit Employee Details" @click="getclose">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="space-y-12">


        <div class="p-6 mt-4 bg-white rounded-lg shadow-md mb-4">
          <div>
            <h2 class=" text-base font-semibold leading-7 text-gray-900">Employee Details</h2>
            <div class="flex -space-x-1 overflow-hidden">
              <div v-if="employeeStore?.empdetails?.imageUr">
                <a :href="userStore.assetsBaseUrl + employeeStore?.empdetails?.imageUrl" target="_blank">
                  <!-- :href="imageroot + '/user/' + employeeStore?.empdetails?.image" -->
                  <img class="w-16 h-16 border-2 border-white rounded"
                    :src="userStore.assetsBaseUrl + employeeStore?.empdetails?.imageUrl" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="Emp. Number" :value="employeeStore?.empdetails?.empNo" />
            </div>

            <div class="col-span-1">
              <hr_item item="Emp. Name" :value="employeeStore?.empdetails?.empName" />
            </div>

            <div class="col-span-1">
              <hr_item item="EPF Number" :value="employeeStore?.empdetails?.epfNo" />
            </div>

            <div class="col-span-1">
              <hr_item item="Calling Name" :value="employeeStore?.empdetails?.callingName" />
            </div>

            <div class="col-span-1">
              <hr_item item="CSO No" :value="employeeStore?.empdetails?.csoNo" />
            </div>

            <div class="col-span-1">
              <hr_item item="Address" :value="employeeStore?.empdetails?.address" />
            </div>

            <div class="col-span-1">
              <hr_item item="Contact"
                :value="employeeStore?.empdetails?.contact1 + ',' + employeeStore?.empdetails?.contact2" />
            </div>

            <div class="col-span-1">
              <hr_item item="Email 1" :value="employeeStore?.empdetails?.email1" />
            </div>

            <div class="col-span-1">
              <hr_item item="Email 2" :value="employeeStore?.empdetails?.email2" />
            </div>

            <div class="col-span-1">
              <hr_item item="Emergency Contact" :value="employeeStore?.empdetails?.emergencyContact" />
            </div>

            <div class="col-span-1">
              <hr_item item="Gender" :value="employeeStore?.empdetails?.gender" />
            </div>

            <div class="col-span-1">
              <hr_item item="Date Of Birth" :value="employeeStore?.empdetails?.dob" />
              <!-- <hr_item item="Date Of Birth" :value="$options.filters.toShortDate(employeeStore?.empdetails?.dob)" /> -->
            </div>
          </div>

          <hr>

          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="Department" :value="employeeStore?.empdetails?.department.value" />
            </div>
            <div class="col-span-1">
              <hr_item item="Staff Type" :value="employeeStore?.empdetails?.staffType.value" />
            </div>
            <div class="col-span-1">
              <hr_item item="Designation" :value="employeeStore?.empdetails?.designation" />
            </div>
            <div class="col-span-1">
              <hr_item item="Employee Type" :value="employeeStore?.empdetails?.empType.value" />
            </div>
            <div class="col-span-1">
              <hr_item item="Date Of Join" :value="employeeStore?.empdetails?.dateOfJoinDisplay" />
              <!-- <hr_item item="Date Of Join" :value="$options.filters.toShortDate(employeeStore?.empdetails?.dateOfJoin)" /> -->
            </div>
            <div class="col-span-1">
              <hr_item item="Category" :value="employeeStore?.empdetails?.category.value" />
            </div>
            <div class="col-span-1">
              <hr_item item="Is Executive" :value="(employeeStore?.empdetails?.isExecutive) ? 'Yes' : 'No'" />
            </div>
            <div class="col-span-1">
              <hr_item item="His/Her Supervisor" :value="employeeStore?.empdetails?.managerEmployee?.value" />
            </div>
          </div>

          <hr>

          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="Annual Leave" :value="employeeStore?.empdetails?.annualLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Casual Leave" :value="employeeStore?.empdetails?.casualLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Sick Leave" :value="employeeStore?.empdetails?.sickLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Other Leave" :value="employeeStore?.empdetails?.otherLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Over Time" :value="employeeStore?.empdetails?.isOtAllow ? 'Yes' : 'No'" />
            </div>
            <div class="col-span-1">
              <hr_item item="Regular OnTime" :value="employeeStore?.empdetails?.onTimeDisplay" />
            </div>
            <div class="col-span-1">
              <hr_item item="Regular OFF Time" :value="employeeStore?.empdetails?.offTimeDisplay" />
            </div>
          </div>

          <hr>

          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="User Name" :value="employeeStore?.empdetails?.callingName" />
            </div>
            <div class="col-span-1">
              <hr_item item="Has Resigned" :value="employeeStore?.empdetails?.isResign ? 'Yes' : 'No'" />
            </div>
            <div class="col-span-1">
              <hr_item item="Date Of Resigned" :value="employeeStore?.empdetails?.dateOfResignDisplay" />
              <!-- <hr_item item="Date Of Resigned" :value="$options.filters.toShortDate(employeeStore?.empdetails?.dateOfResign)" /> -->
            </div>
            <div class="col-span-1">
              <hr_item item="Reson For Resign" :value="employeeStore?.empdetails?.reasonForResign" />
            </div>
            <div class="col-span-1">
              <hr_item item="Activation" :value="employeeStore?.empdetails?.isActive ? 'Active' : 'In active'" />
            </div>
          </div>

          <div class="grid grid-cols-1 mt-2 gap-y-4 sm:grid-cols-5 sm:gap-x-6">


            <!-- <div class="col-span-1">
              <hr_item item="Status"   :value="employeeStore?.empdetails?.employeeStatus" />
            </div> -->
            <div class="col-span-1">
              <hr_item item="Feature  Granting" :value="employeeStore?.empdetails?.granted" />
            </div>
            <div class="col-span-1">
              <hr_item item="Morning OT Allowed" :value="employeeStore?.empdetails?.isMorningOtAllowed" />
            </div>
            <div class="col-span-1">
              <hr_item item="Role" :value="employeeStore?.empdetails?.role.value" />
            </div>
          </div>

          <div class="grid grid-cols-1 mt-2 gap-y-4 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="Secret Code" :value="employeeStore?.empdetails?.secretCode" />
            </div>

            <div class="col-span-1">
              <hr_item item="UserCode" :value="employeeStore?.empdetails?.userCode" />
            </div>

            <div class="col-span-1">
              <hr_item item="User Group" :value="employeeStore?.empdetails?.userGroup" />
            </div>

            <div class="col-span-1">
              <hr_item item="User Name" :value="employeeStore?.empdetails?.username" />
            </div>
            <div class="col-span-1">
              <hr_item item="Gender" :value="employeeStore?.empdetails?.gender" />
            </div>

          </div>

          <div class="grid grid-cols-1 mt-2 gap-y-4 sm:grid-cols-5 sm:gap-x-6">



            <div class="col-span-1">
              <hr_item item="NIC" :value="employeeStore?.empdetails?.nic" />
            </div>
            <div v-if="employeeStore?.empdetails?.nicUrl" class="pt-4">
              <label for="price" class="block text-sm font-medium leading-6 text-gray-900">NIC Image</label>
              <div class="mt-2">
                <a :href="userStore.assetsBaseUrl + employeeStore?.empdetails?.nicUrl" target="_blank">
                  <img class="w-16 h-16 border-2 border-white rounded"
                    :src="userStore.assetsBaseUrl + employeeStore?.empdetails?.nicUrl" alt="" />
                </a>
              </div>
            </div>
            <div v-if="employeeStore?.empdetails?.signatureUrl" class="pt-4">
              <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Signature</label>
              <div class="mt-2">
                <!-- <a :href="imageroot + '/Resource/HR/signature/' + employeeStore?.empdetails?.signature + '.png'"
                  target="_blank">
                  <img class="w-16 h-16 border-2 border-white rounded"
                    :src="imageroot + '/Resource/HR/signature/' + employeeStore?.empdetails?.signature + '.png'" alt="" />
                </a> -->
                <a :href="userStore.assetsBaseUrl + employeeStore?.empdetails?.signatureUrl" target="_blank">
                  <img class="w-16 h-16 border-2 border-white rounded"
                    :src="userStore.assetsBaseUrl + employeeStore?.empdetails?.signatureUrl" alt="" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import hr_item from '~/components/hr/hr_item'

import { useUserStore } from "~/stores/modules/userStore";
import { useEmployeeStore } from "~/stores/modules/hr/employeeStore";


export default {
  props: ['empid'],
  components: { hr_item },
  data() {
    return {
      imageroot: process.env.Assets_83,
    }
  },

  beforeMount() {
    this.employeeStore = useEmployeeStore();
    this.userStore = useUserStore();
  },

  computed: {
    //   ...mapState({
    //     // employee: (state) => state.hr.dashboard.employee,
    //     // loggeduser: (state) => state.loggeduser,
    //     initData: (state) => state.initData,
    //   }),

    // getSupervisorName() {
    //   return (supno) => {
    //     try {
    //       let detSup = this.initData.arrManagers.filter((sup) => {
    //         return sup.id.indexOf(supno) > -1
    //       })[0]

    //       return detSup.value;
    //     }
    //     catch { return '' }

    //   }
    // },
  },

  async created() {
    this.employeeStore = useEmployeeStore();
  },
  methods: {
    getclose() {
      this.$emit('exit')
    },
    setdelete() {
      this.$emit('setDeleteEmployee')
    },
    setEdit() {
      this.employeeStore?.empdetails = this.employeeStore.curEmployee;
      this.$emit('setEmployee')
    },
  },
}
</script>

<style scoped>
.empdetails .cssdsec>div {
  @apply my-4;
}

.btn {
  @apply border-2 border-gray-500 rounded p-2 rounded-md py-1 w-16 text-center text-gray-600 font-bold px-2;
}

.btn:hover {
  @apply bg-blue-600 text-white;
}
</style>
