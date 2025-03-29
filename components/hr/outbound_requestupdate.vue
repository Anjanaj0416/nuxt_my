<template>
  <section>

    <div class="mb-2">
      <div class=" p-1 cssbox hover:text-blue-300 rounded cursor-pointer underline hover:font-bold"
        @click="isApplyOutbound = !isApplyOutbound">Apply Outbound</div>



      <div v-if="isApplyOutbound">
        <hr class="my-4">
        <addoutbound :arrParams=arrParams @RefreshOutBound="Refresh" />

      </div>
      <hr class="my-4">
      <div class="underline my-2"> Applied Outbound Requests</div>

      <hr_serachInput v-if="outBoundDetails.initData.alStaff.length > 0" class="w-full md:w-64 my-2"
        :arrItems="outBoundDetails.initData.alStaff" ref="catcomp" label="Employee" v-model="cur_emp"
        @selectItem="EmpChanged" />
      <datediff @click="LoadOutBound" />
    </div>

    <div v-if="outBoundDetails.listOutBoundDetails.length > 0">
      <div class="my-2" v-for="ob in outBoundDetails.listOutBoundDetails" :key="ob">

        <div class="">
          <div class="flex content-center bg-gray-200 p-2 rounded-t-md">

            <div class="mx-auto text-center ">

              <img :src="'http://intranet.sltds.lk/SLTDS/user/' + ob.logoName" class="w-16 h-16 rounded"
                :alt="ob.empName" />
              <div class="text-blue-800 text-sm font-bold">{{ ob.empName }}</div>

            </div>
          </div>

          <div class="">
            <div class="cssRow">
              <div>Out Time</div>
              <div class="cssValue"> {{ ob.outTime }}</div>
            </div>
            <div class="cssRow">
              <div>Requested Time</div>
              <div class="cssValue">{{ ob.requredTime }} Hrs</div>
            </div>
            <div class="bg-gray-200 p-2">
              <div class="text-gray-800">Reason</div>
              <div class="text-sm cssValue">{{ ob.reason }}</div>
            </div>
            <div class="cssRow">
              <div>Out Time</div>
              <div class="cssValue">{{ ob.appliedDate }}</div>
            </div>
            <div class="cssRow">
              <div>In Time</div>
              <div class="cssValue">{{ ob.returnedTime }}</div>
            </div>
            <div class="cssRow">
              <div>Time Spend</div>
              <div class="cssValue">{{ ob.spendTime }}</div>
            </div>

            <div class="cssRow"
              :class="(ob.approvalStatus == 'Pending') ? 'cssPending' : (ob.approvalStatus == 'Approved') ? 'cssApproved' : (ob.approvalStatus == 'Rejected') ? 'cssRejected' : ''">
              <div>Approved Status</div>
              <div class="font-bold tracking-wider">{{ ob.approvalStatus }}</div>
            </div>
          </div>
        </div>

        <div class="flex content-center  bg-gray-200 p-2 rounded-b-md">
          <div class="mx-auto" v-if="arrParams[1] == 'approval' && ob.approvalStatus == 'Pending'">
            <button class="cssbox cssbtn" title="Click to Approve the request"
              @click="ApprovalSend(ob.id)">Approve</button>
            <button class="cssbox cssbtnreject" title="Click to Reject the request"
              @click="ApprovalReject(ob.id)">Reject</button>
          </div>


          <div class="mx-auto" v-if="arrParams[1] == 'update' && ob.returnedTime == '0001 Jan 01 00:00'">
            <button class="cssbox cssbtn" title="Click to update Returned Time" @click="setRetuned(ob.id)">Returned to
              Office</button>
          </div>
        </div>


      </div>
    </div>
  </section>
  <!-- <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" > -->
</template>

<script>
import addoutbound from '~/components/hr/outbound_add'
import datediff from '~/components/hr/datediff'
import hr_serachInput from "~/components/hr/hr_serachInput";
// import * as Global from '@/assets/js/Global'
//import * as myfilter from '@/plugins/myfilter'
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  layout: 'default',
  components: { datediff, hr_serachInput, addoutbound },
  props: ['param'],
  data() {
    return {
      imageroot: process.env.Assets_83,
      arrParams: [],
      outbounddatediff: {
        dtFrom: '',
        dtTo: '',
      },
      root_Emp: '',
      cur_emp: '',
      isApplyOutbound: false,
    }
  },
  async mounted() {

    this.Init();
    var encodedStringBtoA = atob(this.param);


    //125548#approval#objOB.Id#supervisor.EmpNo#emp.EmpNo"
    this.arrParams = encodedStringBtoA.split('#');
    this.root_Emp = (this.arrParams == "approval") ? this.arrParams[3] : this.arrParams[4];
    this.getOutBoundDetails({ rootemployee: this.root_Emp, supervisor: this.arrParams[3], employee: this.arrParams[4], outboundId: this.arrParams[2], dtFrom: this.outbounddatediff.dtFrom, dtTo: this.outbounddatediff.dtTo });
  },
  watch: {},
  computed: {
    // ...mapState({
    //   loggeduser: (state) => state.loggeduser,
    //   outBoundDetails: (state) => state.hr.outBoundDetails,
    // }),
  },
  methods: {
    // ...mapActions({
    //   setOutBoundRequest: 'hr/setOutBoundRequest',
    //   getOutBoundDetails: 'hr/getOutBoundDetails',
    //   getUpdateOutBound: 'hr/getUpdateOutBound',

    // }),
    // ...mapMutations({
    //   //resetEmail: 'office/RESET_EMAIL',
    //   showMessage: 'PUSH_NOTIFICATION',
    // }),
    //  this.processing_year = new Date().getFullYear()
    //this.$emit('Load_MonthlyBrakeDown',req)
    //this.$refs.catcomp.initCategoryItem(-1)
    //this.$emit('input', this.selected_item.trim());
    EmpChanged(emp) {

      this.cur_emp = emp;
    },
    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },
    show_msg(msg) {
      this.showMessage({
        type: 'success',
        message: msg,
      })
    },
    async ApprovalSend(outboundId) {
      if (confirm('Sure to Approve this request?')) {
        await this.getUpdateOutBound({ UpdateType: "Approved", outboundId: outboundId });
        this.Refresh();
      }
    },

    async ApprovalReject(outboundId) {
      if (confirm('Sure to Reject this request?')) {
        await this.getUpdateOutBound({ UpdateType: "Rejected", outboundId: outboundId });
        this.Refresh();
      }
    },

    async setRetuned(outboundId) {
      if (confirm('Have you Returned to Office Now?')) {
        await this.getUpdateOutBound({ UpdateType: "RetunedOffice", outboundId: outboundId });
        this.Refresh();
      }
    },





    async LoadOutBound(req) {

      this.outbounddatediff.dtFrom = req.dtfrom;
      this.outbounddatediff.dtTo = req.dtto;
      this.Refresh();
    },

    async Refresh() {
      if (this.cur_emp == '') {
        this.cur_emp = this.arrParams[4]
      }
      await this.getOutBoundDetails({ rootemployee: this.root_Emp, supervisor: this.arrParams[3], employee: this.cur_emp, outboundId: -1, dtFrom: this.outbounddatediff.dtFrom, dtTo: this.outbounddatediff.dtTo });
    },

    Init() {
      console.log('Init-outbound_requestupdate')
      var date = new Date()

      this.outbounddatediff.dtFrom = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), 1)
      )
      this.outbounddatediff.dtTo = myfilter.toInputTypeDate(
        new Date(date.getFullYear(), date.getMonth(), date.getDate())
      )

    },

    // async copyContent(value) {
    //   try {
    //      await navigator.clipboard.writeText(value)
    //      this.show_msg('Content copied to clipboard')

    //   } catch (err) {
    //     this.show_msg('Failed to copy :'+err)
    //   }
    // },
    //     async copyContent(value) {
    //   try {
    //      await navigator.clipboard.writeText(value)
    //      this.show_msg('Content copied to clipboard')

    //   } catch (err) {
    //     this.show_msg('Failed to copy :'+err)
    //   }
    // },
    //  async downloadReportKotukole(){
    //   if(confirm('Do you want to Download?')){
    //      await this.get_DownloadKotukole({book:this.book});
    //      window.open(this.csv_root+'/reports/'+this.csv_name, '_blank');
    //   }
    // },
  },
  async beforeMount() {
    // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
    // } else {
    //   this.show_error('Not Allowed to access this page')
    //   this.$router.push('/')
    // }

  },
  head() {
    return {
      title: 'Digital Services - SLTDS',
    }
  },
}

//Validation
//-------------------------------------------------
// async cmdSearchOrg(){
//       if(this.isAtleasetOneExisitsForSearch()){
//      await this.getOrganizationData(this.organizationSearch);
//       }
//     },

// 	-------------------


//  isAtleasetOneExisitsForSearch(){
//  let isAtleasetOneExisitsForSearch = false;


//  if(this.organizationSearch.person.trim()!='' ){
//         if( this.organizationSearch.person.trim().length  <= 3 ){
//             this.show_error('Invalid person , More than three Letters Requied for search');
//         }
//         else{ isAtleasetOneExisitsForSearch = true;}

//       }
// 	  return isAtleasetOneExisitsForSearch;
// 	  }
</script>

<style scoped>
.cssRow {
  @apply flex justify-between bg-gray-200 my-1 rounded p-1;
}

.cssRow>div {}

.cssbox {
  border: 1px solid;
  @apply border-gray-600 rounded;
}

.cssboxMin {
  border: 1px solid;
  @apply border-gray-600 rounded;
}

.cssbtn {
  @apply cursor-pointer text-center bg-gray-100 p-1;
}

.cssbtnreject {
  @apply cursor-pointer text-center bg-red-600 text-white p-1;
}

.cssbtn:hover {
  @apply bg-gray-600;
}

.cssbtnreject:hover {
  @apply bg-red-500;
}

input[type=time]::-webkit-datetime-edit-ampm-field {
  display: none;
}

.cssTitle {
  @apply text-gray-700 text-sm;
}

.cssApproved {
  @apply bg-green-400;
}

.cssPending {
  @apply bg-yellow-400;
}

.cssRejected {
  @apply bg-red-400;
}

.cssValue {
  @apply bg-blue-400 rounded text-white font-bold p-1;
}
</style>
