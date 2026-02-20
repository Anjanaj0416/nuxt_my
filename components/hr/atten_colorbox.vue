<template>
<section class="w-full max-w-xs bg-white border shadow-md rounded-xl p-4">

  <!-- Title -->
  <h3 class="text-sm font-semibold text-gray-700 mb-3 border-b pb-2">
    Attendance Legend
  </h3>

  <!-- MOBILE = horizontal scroll | DESKTOP = grid -->
  <div class="flex md:grid md:grid-cols-1 gap-2 text-xs overflow-x-auto md:overflow-visible whitespace-nowrap">

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-gray-800"></span> Saturday
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-gray-800"></span> Sunday
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-green-600"></span> Short Leave
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-yellow-500"></span> Movement
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-blue-700"></span> Half Day
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-pink-600"></span> Leave
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-orange-500"></span> Incomplete
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-indigo-600"></span> Holiday
    </div>

    <div class="legend-item min-w-max">
      <span class="legend-dot bg-green-400"></span> SWA
    </div>

  </div>

</section>


</template>

<script>

export default { 
  components: {

  },
  methods:{
     
  }
}
</script>

<style>
.legend-item{
  display:flex;
  align-items:center;
  gap:6px;
  padding:6px 10px;
  border-radius:8px;
  background:#f9fafb;
}

.legend-dot{
  width:12px;
  height:12px;
  border-radius:9999px;
}
</style>

