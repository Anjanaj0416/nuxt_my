<template>
  <section>
      <div class="cssmenuitems text-sm">
          <div  @click="clickmenuitem('updateemployee')">New Employee</div>     
          <div  @click="clickmenuitem('holiday')">Holidays</div>           
          <div  @click="clickmenuitem('special_work_arrangement')">Special Work Arrangement</div>           
          <div> 
              Reports
              <div class="cssSubMenu mt-2" @click="clickmenuitem('dailyPresenceReport')">Daily Presence Report</div>                
              <div class="cssSubMenu" @click="clickmenuitem('employeerectificationreport')">Employee Rectification Report</div>                                            
              
              <div class="cssSubMenu" @click="clickmenuitem('overtime_individual_summery_report')">OT Individual Report</div>                                            
              <div class="cssSubMenu" @click="clickmenuitem('overtime_month_end_summery_report')">OT Month End Summery Report</div>                                                          
              
              <div class="cssSubMenu" @click="clickmenuitem('employee_leave_annual_report')">Employee leave Annual Report</div>  
              <div class="cssSubMenu" @click="clickmenuitem('annual_summery_report')">Annual Summery Report</div>  
              <!-- <div class="cssSubMenu" @click="clickmenuitem('timecard_summery_report')">TimeCard Summery Report</div>                 -->
              
              <div class="cssSubMenu" @click="clickmenuitem('no_pay_summery_report')">No Pay Summery Report</div>  
              <div class="cssSubMenu" @click="clickmenuitem('no_pay_monthly_report')">No Pay Monthly Report</div>  
              <hr>
              <div class="cssSubMenu" @click="clickmenuitem('GetSupervisorPendingsReport')">Supervisor Approval Pending Summery</div>  
               <div class="cssSubMenu" @click="clickmenuitem('GetHRMonthEndReport')">HR - Month End Report Summery</div>  
              
          </div>           
          
      </div>
  </section>
</template>

<script>
export default {
methods: {
    clickmenuitem(sec){
        this.$emit('click',sec)    
    },

},
}
</script>

<style scoped>
.cssmenuitems{
  @apply rounded-md bg-blue-500 w-48   text-white;
  min-height: 300px;
}

.cssmenuitems>div{
    @apply py-2 px-2 border-b-2 border-blue-800 cursor-pointer  rounded-md;
    
}

.cssmenuitems>div:hover{
    @apply bg-blue-700;
}

.cssSubMenu{
    @apply ml-4 border-b-2 border-blue-800 text-xs mb-2;
}

.cssSubMenu:hover{
    @apply text-orange-500;
}

</style>