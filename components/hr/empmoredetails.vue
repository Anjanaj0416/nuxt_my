<template>
  <section class="empdetails">

    <div class="relative min-h-screen px-4 pt-2 text-sm" v-show="hrStore.empdetails.id">
      <div class="absolute top-0 right-0 flex mt-8 mr-8 gap-x-4">
        <!-- <div v-show="this.loggeduser.granted.indexOf('hradmin') > -1" class="btn" @click="setEdit">Edit</div>-->
        <div v-show="userStore.loggedUser.granted.indexOf('hradmin') > -1" class="btn" @click="setdelete">Delete</div>

        <div class="cursor-pointer text-gray-500 hover:text-gray-800" title="Exit Employee Details" @click="getclose">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="space-y-12">


        <div class="p-6 mt-4 bg-white rounded-lg shadow-md">
          <div>
            <h2 class="mb-5 text-base font-semibold leading-7 text-gray-900">Employee Details</h2>
            <div class="flex -space-x-1 overflow-hidden">
              <div class="pt-4">
                <!-- <a :href="imageroot + '/user/' + hrStore.empdetails.image" target="_blank">
                  <img class="w-16 h-16 border-2 border-white rounded"
                    :src="imageroot + '/user/' + hrStore.empdetails.image" alt="" />
                </a> -->
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="Emp. Number" :value="hrStore.empdetails.empNo" />
            </div>

            <div class="col-span-1">
              <hr_item item="Emp. Name" :value="hrStore.empdetails.name" />
            </div>

            <div class="col-span-1">
              <hr_item item="EPF Number" :value="hrStore.empdetails.epfNo" />
            </div>

            <div class="col-span-1">
              <hr_item item="Calling Name" :value="hrStore.empdetails.callingname" />
            </div>

            <div class="col-span-1">
              <hr_item item="NIC" :value="hrStore.empdetails.nic" />
            </div>

            <div class="col-span-1">
              <hr_item item="Address" :value="hrStore.empdetails.address" />
            </div>

            <div class="col-span-1">
              <hr_item item="Contact" :value="hrStore.empdetails.contact1" />
            </div>

            <div class="col-span-1">
              <hr_item item="Email 1" :value="hrStore.empdetails.email1" />
            </div>

            <div class="col-span-1">
              <hr_item item="Email 2" :value="hrStore.empdetails.email2" />
            </div>

            <div class="col-span-1">
              <hr_item item="Home Phone" :value="hrStore.empdetails.homePhoneNo" />
            </div>

            <div class="col-span-1">
              <hr_item item="Emergency Contact" :value="hrStore.empdetails.emergencyContact" />
            </div>

            <div class="col-span-1">
              <hr_item item="Gender" :value="hrStore.empdetails.gender" />
            </div>

            <div class="col-span-1">
              <hr_item item="Date Of Birth" :value="hrStore.empdetails.dob" />
              <!-- <hr_item item="Date Of Birth" :value="$options.filters.toShortDate(hrStore.empdetails.dob)" /> -->
            </div>
          </div>

          <hr>

          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="Department" :value="hrStore.empdetails.deptNo" />
            </div>
            <div class="col-span-1">
              <hr_item item="Staff Type" :value="hrStore.empdetails.staffType" />
            </div>
            <div class="col-span-1">
              <hr_item item="Designation" :value="hrStore.empdetails.designation" />
            </div>
            <div class="col-span-1">
              <hr_item item="Employee Type" :value="hrStore.empdetails.empType" />
            </div>
            <div class="col-span-1">
              <hr_item item="Date Of Join" :value="hrStore.empdetails.dateOfJoin" />
              <!-- <hr_item item="Date Of Join" :value="$options.filters.toShortDate(hrStore.empdetails.dateOfJoin)" /> -->
            </div>
            <div class="col-span-1">
              <hr_item item="Category" :value="hrStore.empdetails.category" />
            </div>
            <div class="col-span-1">
              <hr_item item="Is Executive" :value="(hrStore.empdetails.isExecutive) ? 'Yes' : 'No'" />
            </div>
            <div class="col-span-1">
              <hr_item item="His/Her Supervisor" :value="hrStore.empdetails.supervisor" />
            </div>
          </div>

          <hr>

          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="Annual Leave" :value="hrStore.empdetails.annualLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Casual Leave" :value="hrStore.empdetails.casualLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Sick Leave" :value="hrStore.empdetails.sickLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Other Leave" :value="hrStore.empdetails.otherLeave" />
            </div>
            <div class="col-span-1">
              <hr_item item="Over Time" :value="hrStore.empdetails.isOTAllow ? 'Yes' : 'No'" />
            </div>
            <div class="col-span-1">
              <hr_item item="Regular OnTime" :value="hrStore.empdetails.onTime" />
            </div>
            <div class="col-span-1">
              <hr_item item="Regular OFF Time" :value="hrStore.empdetails.offTime" />
            </div>
          </div>

          <hr>

          <div class="grid grid-cols-1 mt-2 sm:grid-cols-5 sm:gap-x-6">
            <div class="col-span-1">
              <hr_item item="User Name" :value="hrStore.empdetails.username" />
            </div>
            <div class="col-span-1">
              <hr_item item="Has Resigned" :value="hrStore.empdetails.isResign ? 'Yes' : 'No'" />
            </div>
            <div class="col-span-1">
              <hr_item item="Date Of Resigned" :value="hrStore.empdetails.dateOfResign" />
              <!-- <hr_item item="Date Of Resigned" :value="$options.filters.toShortDate(hrStore.empdetails.dateOfResign)" /> -->
            </div>
            <div class="col-span-1">
              <hr_item item="Reson For Resign" :value="hrStore.empdetails.reasonForResign" />
            </div>
          </div>

          <div class="grid grid-cols-1 mt-2 gap-y-4 sm:grid-cols-5 sm:gap-x-6">
            <div class="pt-4">
              <!-- <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Signature</label> -->
              <div class="mt-2">
                <!-- <a :href="imageroot + '/Resource/HR/signature/' + hrStore.empdetails.signature + '.png'"
                  target="_blank">
                  <img class="w-16 h-16 border-2 border-white rounded"
                    :src="imageroot + '/Resource/HR/signature/' + hrStore.empdetails.signature + '.png'" alt="" />
                </a> -->
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useHrStore } from "~/stores/modules/hrStore";
import { useUserStore } from "~/stores/modules/userStore";
import hr_item from '~/components/hr/hr_item'
//import { mapState } from "vuex";


export default {
  props: ['empid'],
  components: { hr_item },
  data() {
    return {
      imageroot: process.env.Assets_83,
    }
  },

  beforeMount() {
    this.hrStore = useHrStore();
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
    this.hrStore = useHrStore();
  },
  methods: {
    getclose() {
      this.$emit('exit')
    },
    setdelete() {
      this.$emit('setDeleteEmployee', this.employee.empNo)
    },
    setEdit() {
      this.$emit('setEmployee', this.employee.empNo)
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
