<template>
    <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60">
      <div class="text-2xl uppercase">Overtime Month-End Report</div>
      <div class="bg-gradient-to-r from-blue-900 via-indigo-700 to-blue-600 shadow-md rounded-lg p-6 mt-10 mb-10 border text-white">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-medium">Year</label>
            <div class="relative">
              <selectinput2
            v-model="selectedYear"
            :selections="hrStore.initData.initReport.listYears"
            placeholder="Select Employee"
            @change="logSelectedDates"
            class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
            </div>
          </div>
          <div>
            <label class="block mb-1 font-medium">Month</label>
            <div class="relative">
              <selectinput2
            v-model="selectedMonth"
            :selections="hrStore.initData.initReport.listMonths"
            :isReport=true
            placeholder="Select Employee"
            @change="logSelectedDates"
            class=" text-gray-900 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
            </div>
          </div>
        </div>
      </div>

      <p 
        v-if="!selectedYear || !selectedMonth" 
        class="text-sm text-gray-500 italic text-center"
      >
        Please select a Year and Month..
      </p>
    </section>
</template>


  
<script>

    import { useUserStore } from "~/stores/modules/userStore";
    import { useHrStore } from "~/stores/modules/hrStore";
    
    import LinkBtn from "~/components/customcontrol/Link";
    import Button from "~/components/customcontrol/Button";
    import selectinput2 from "~/components/customcontrol/selectinput2";
    import SearchInput from '~/components/customcontrol/SearchInput.vue';

    definePageMeta({
    layout: 'default',   
    middleware: 'auth',
    });

    export default {

    components: {
        LinkBtn,
        Button,
        selectinput2,
        SearchInput
    },
    props:[''],
    data() {
        return {
        imageroot: "",
        showLoading: null,
        isReport: false,
        selectedYear: '',
        selectedMonth: ''
        }
    },
    async mounted() {
        
    },
    async created() {
        this.hrStore = useHrStore();
        this.userStore = useUserStore();
        this.showLoading = this.$showLoading;
        this.imageroot = this.userStore.loggedUser.resourceURLRoot;

        await this.hrStore.getReportInitData();

    },
    watch: {},
    computed: {},
    methods: {

        async logSelectedDates() {
        if (!this.selectedYear || !this.selectedMonth) {
            this.$showToast('Please select a Year and Month', 'warning');
            return;
        }

        const req = {
            Year: this.selectedYear,
            Month: this.selectedMonth,
        };
        await this.hrStore.getOTPeriodSummeryMonthEnd(req, this.$showLoading);
        }

        //this.$showToast('Login successful!', 'success'); //success ,error ,warning,info
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
        title: 'Intranet - Digital Tech Labs',
        }
    },
    }
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
</style>
  
  
  