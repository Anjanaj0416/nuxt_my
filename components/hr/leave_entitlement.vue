<template>
  <section class="border-gray-500 rounded p-2 p-2  rounded-lg cssLeaveEntitlement">
    <div class="my-2"> Leave Entitlement - {{year}}</div>
    <div class="cssheading grid grid-cols-4 cssLE mb-1">
       <div>Leave Type</div>
       <div>Entitled</div>
       <div>Approved</div>
       <div>Balance</div>
    </div>



    <div class="w-48 text-white text-sm "  v-for="lb in leaveBalances" :key="lb">

      <div class="grid grid-cols-4 text-center mb-1 cssLE cssLEItem">
       <div>{{lb.leaveType}}</div>
       <div>{{lb.outOf}}</div>
       <div>{{lb.approved }}</div>
       <div>{{lb.available}}</div>
    </div>

    </div>

  </section>
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
