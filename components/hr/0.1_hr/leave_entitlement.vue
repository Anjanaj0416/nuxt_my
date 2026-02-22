<template>

    <div class="overflow-hidden border rounded-xl">

        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold">
          <div class="grid grid-cols-4 px-6 py-3 text-sm text-center">
            <div>Leave Type</div>
            <div>Out Of</div>
            <div>Approved</div>
            <div>Balance</div>
          </div>
        </div>

        <!-- Body -->
        <div class="divide-y max-h-[500px] overflow-y-auto bg-white">
          <div
            class="grid grid-cols-4 px-6 py-2 text-sm text-center items-center hover:bg-blue-50 transition"
            v-for="lb in leaveBalances" :key="lb"
          >
            <div class="font-semibold text-gray-700">
              {{lb.leaveType}}
            </div>
            <div class="text-gray-600">
              {{lb.outOf}}
            </div>
            <div class="text-gray-600">
                {{lb.approved }}
            </div>
            <div class="text-gray-600">
                {{lb.available}}
            </div>
          </div>
          <!-- <div
            v-if="!holidayStore.holiday.arrholidays.length"
            class="text-center py-10 text-gray-400"
          >
            No holidays found
          </div> -->

        </div>
      </div>

</template>

<script scoped>
export default {
  props:['leaveBalances','year'],
  components: {},
  methods: {},
}
</script>

<style scoped>
.cssLEItem{
  @apply  bg-gray-600 p-1 rounded ;
}

.cssLeaveEntitlement{
width: 350px;

}
.cssLE{
  width: 330px;
}

.cssLE div{
  @apply text-center;
}

.cssheading{
  @apply border-b-2 border-gray-700 bg-blue-600 p-1 rounded;
}
</style>
