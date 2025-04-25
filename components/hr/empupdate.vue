<template>
  <section>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut dolor modi, iste repellat molestiae quasi,
    necessitatibus quisquam rerum error nisi voluptate aspernatur est facilis soluta ratione tenetur, assumenda eius
    excepturi.

  </section>
</template>

<script>
//import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import selectinput2 from '~/components/customcontrol/selectinput2'
import serachInput from '~/components/customcontrol/SearchInput'
// import imagecomp from '~/components/customcontrol/fupload'


//select * from EmployeeType     - Permenent,Contract			arrEmployeeStatus		empType
//      select * from StaffType        - SLTDIS,SLT					arrStaffTypes			staffType
//    select * from EmployeeCategory - Supervisor,HRAdmin,CEO		arrEmpCategories		category

export default {
  components: { selectinput2, serachInput },

  data() {
    return {
      // employee:{},

      imageroot: process.env.Assets_83,
      arrOTAllow: [
        { id: true, value: 'Yes' },
        { id: false, value: 'No' },
      ],
      arrIsResigned: [
        { id: true, value: 'Yes' },
        { id: false, value: 'No' },
      ],
      empImageDetails: {
        imagechanged: false,
        Uploading_file_details: {
          file: '',
          destpath: '\\user\\temp.png',
        },
      },
      empSignatureDetails: {
        imagechanged: false,
        Uploading_file_details: {
          file: '',
          destpath: '\\Resource\\HR\\signature\\temp.png',
        },
      },
    }
  },
  computed: {
    // ...mapState({
    //   employee: (state) => state.hr.dashboard.employee,
    //   initData: (state) => state.hr.dashboard.initData,
    //   loggeduser: (state) => state.loggeduser,
    // }),
  },
  async beforeMount() {

  },
  methods: {
    // ...mapActions({

    //   SetEmployee: 'hr/SetEmployee',
    //   setEmployeeImage: 'hr/setEmployeeImage',
    //   setEmployeeSignature: 'hr/setEmployeeSignature',
    // }),
    // ...mapMutations({
    //   showMessage: 'PUSH_NOTIFICATION',
    //   //setpage: 'hr/SET_PAGE',
    // }),

    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },


    initUpdateEmployee() {

      this.$refs.stafftypecomp.initItem(this.employee.staffType)
      this.$refs.deptcomp.initItem(this.employee.deptNo)

      this.$refs.EmpStatuscomp.initItem(this.employee.empType)
      this.$refs.EmpCategorycomp.initItem(this.employee.category)
      this.$refs.EmpSupervisorcomp.initItem(this.employee.supervisor)

      this.$refs.OTAllowcomp.initItem(this.employee.isOTAllow)
      this.$refs.HasResignedcomp.initItem(this.employee.isResign)

    },

    getclose() {
      this.$emit('exitpopup')
    },

    isValidate() {
      let isvalid = true;

      if (this.employee.staffType == "") {
        isvalid = false
        this.show_error('Invalid Staff Type')
      } else { this.employee.staffType = parseInt(this.employee.staffType) }

      if (this.employee.empType == "") {
        isvalid = false
        this.show_error('Invalid Employee Type')
      } else { this.employee.empType = parseInt(this.employee.empType) }

      if (this.employee.category == "") {
        isvalid = false
        this.show_error('Invalid Employee Category')
      } else { this.employee.category = parseInt(this.employee.category) }

      if (this.employee.supervisor == "") {
        isvalid = false
        this.show_error('Invalid Employee Supervisor')
      }

      if (this.employee.deptNo == "") {
        isvalid = false
        this.show_error('Invalid Department')
      }



      return isvalid;
    },
    async setSave() {

      if (this.isValidate() && confirm('Sure to update this employee details?')) {
        //Save Img
        if (this.empImageDetails.imagechanged) {
          await this.setEmployeeImage(
            this.empImageDetails.Uploading_file_details
          )

        }

        if (this.empSignatureDetails.imagechanged) {
          await this.setEmployeeSignature(
            this.empSignatureDetails.Uploading_file_details
          )

        }

        //state.dashboard.employee.image
        //save Emp

        this.employee.annualLeave = parseInt(this.employee.annualLeave)
        this.employee.casualLeave = parseInt(this.employee.casualLeave)
        this.employee.sickLeave = parseInt(this.employee.sickLeave)
        this.employee.otherLeave = parseInt(this.employee.otherLeave)



        await this.SetEmployee({ employee: this.employee, user: this.loggeduser })
        this.$emit('empSaveCompletion', this.employee.empNo)
      }
    },
    ImageChanged() {
      this.empImageDetails.imagechanged = true
    },

    signaturechanged() {
      this.empSignatureDetails.imagechanged = true
    },
  },
}
</script>

<style scoped>
.cssempupdate {
  min-height: 1500px;
}

.cssempupdate>div {
  min-height: 100vh;
}

divs {
  @apply border-gray-500 rounded p-2;
}

.cssUpdateItem {
  @apply px-2 pt-1 w-full;
}

.cssUpdateItem>div:nth-child(1) {
  @apply text-gray-600 mb-2 text-sm;
}

.cssUpdateItem>div:nth-child(2) {}

.cssUpdateItem>div:nth-child(2) input {
  @apply p-1 w-full rounded-md;
}

.btn {
  @apply border-gray-500 rounded p-2 rounded-md py-1 h-8 w-16 text-center text-gray-600 font-bold cursor-pointer px-2;
}

.btn:hover {
  @apply bg-blue-600 text-white;
}

/* @apply text-gray-600 mb-2  text-sm; */
</style>
