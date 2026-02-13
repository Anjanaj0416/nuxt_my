<template>
  <article class="w-screen min-h-full h-auto absolute top-0 left-0 z-30 bg-EF-blue">
    <div class="w-full flex justify-center flex-wrap text-white">
      <div class="csscard mx-auto rounded mt-4 w-full lg:w-1/2 h-auto p-4">
        <!-- Header -->
        <div class="flex justify-between">
          <div class="font-bold uppercase">Appointment Details</div>
          <div class="hover:text-red-700 cursor-pointer" title="Close" @click="getClose">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>

        <!-- Form -->
        <div class="cssform grid grid-cols-1 gap-2 lg:grid-cols-2 text-blue-400 mt-4">
          <!-- Mobile -->
          <div>
            <div class="text-sm">Mobile</div>
            <input
              class="p-2 rounded w-full"
              type="text"
              v-model="patient.smsnumber"
              @input="numericOnly('smsnumber')"
              @keyup="changeValidation('Mobile')"
              @blur="changeValidation('Mobile')"
              maxlength="12"
              placeholder="Mobile"
            />
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.smsnumber }}</p>
          </div>

          <!-- Name -->
          <div>
            <div class="text-sm">Name</div>
            <input
              class="p-2 rounded w-full"
              type="text"
              v-model="patient.name"
              @keyup="changeValidation('Name')"
              @blur="changeValidation('Name')"
              maxlength="80"
              placeholder="Name"
            />
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.name }}</p>
          </div>

          <!-- Title -->
          <div>
            <selectinput2
              cssclass="cssApptForm"
              v-model="patient.title"
              :cur_item="patient.title"
              :selections="initData.arrTitle"
              label="Title"
              @changed="TitleChanged"
            />
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.title }}</p>
          </div>

          <!-- Gender -->
          <div>
            <selectinput2
              cssclass="cssApptForm"
              v-model="patient.gender"
              :cur_item="patient.gender"
              :selections="initData.arrGender"
              label="Gender"
              @changed="TitleChanged"
            />
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.gender }}</p>
          </div>

          <!-- Age -->
          <div>
            <div class="text-sm">Age</div>
            <div class="flex gap-x-4 items-center">
              <div>Yrs.</div>
              <input
                class="p-2 rounded w-full"
                type="text"
                v-model="age.years"
                @input="numericOnly('years')"
                @keyup="changeValidation('Age')"
                @blur="changeValidation('Age')"
                maxlength="3"
                placeholder="Years"
              />
              <div>Mos.</div>
              <input
                class="p-2 rounded w-full"
                type="text"
                v-model="age.months"
                @input="numericOnly('months')"
                @keyup="changeValidation('Age')"
                @blur="changeValidation('Age')"
                maxlength="2"
                placeholder="Months"
              />
            </div>
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.age }}</p>
          </div>

          <!-- NIC -->
          <div>
            <div class="text-sm">NIC</div>
            <input
              class="p-2 rounded w-full"
              type="text"
              v-model="patient.nic"
              @keyup="changeValidation('NIC')"
              @blur="changeValidation('NIC')"
              maxlength="15"
              placeholder="NIC"
            />
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.nic }}</p>
          </div>

          <!-- Whatsapp -->
          <div>
            <div class="text-sm">Whatsapp Number</div>
            <input
              class="p-2 rounded w-full"
              type="text"
              v-model="patient.whatsappnumber"
              @input="numericOnly('whatsappnumber')"
              @keyup="changeValidation('Whatsapp')"
              @blur="changeValidation('Whatsapp')"
              maxlength="10"
              placeholder="Whatsapp Number"
            />
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.whatsappnumber }}</p>
          </div>

          <!-- Email -->
          <div class="cssEmail">
            <div class="text-sm">Email</div>
            <input
              class="p-2 rounded w-full"
              type="text"
              v-model="patient.email"
              @keyup="changeValidation('Email')"
              @blur="changeValidation('Email')"
              maxlength="80"
              placeholder="Email"
            />
            <p class="text-xs ml-1 my-2 text-white italic">{{ err.email }}</p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="grid grid-cols-2 lg:grid-cols-4 mt-4 w-full gap-y-2 ml-2">
          <button_mlab text="Clear" title="Clear Report" @click="getClear" />
          <button_mlab text="Create Appt" title="Create New Appointment" @click="getCreate_Appt" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import button_mlab from '~/components/mlab/mlab_btn'
import selectinput2 from '~/components/customcontrol/selectinput2'

export default {
  components: { button_mlab, selectinput2 },
  data() {
    return {
      err: {
        smsnumber: '',
        name: '',
        nic: '',
        age: '',
        whatsappnumber: '',
        email: '',
      },
      age: { years: '', months: '' },
    }
  },
  computed: {
    ...mapState({
      initData: (state) => state.patient.initData,
      patient: (state) => state.patient.patient,
      loggeduser: (state) => state.loggeduser,
    }),
    computedAge() {
      return `${this.age.years ? this.age.years + 'yrs ' : ''}${this.age.months ? this.age.months + 'mos' : ''}`
    },
  },
  methods: {
    ...mapActions({
      getInitData: 'patient/getInitData',
      getCreateAppt: 'labappt/getCreateAppt',
    }),
    ...mapMutations({ showMessage: 'PUSH_NOTIFICATION' }),

    numericOnly(field) {
      if (['smsnumber', 'whatsappnumber'].includes(field)) {
        this.patient[field] = this.patient[field].replace(/[^0-9]/g, '')
        if (field === 'smsnumber') this.patient.whatsappnumber = this.patient.smsnumber.substring(0, 10)
      } else {
        this.age[field] = this.age[field].replace(/[^0-9]/g, '')
      }
    },

    getClear() {
      this.patient.smsnumber = ''
      this.patient.name = ''
      this.patient.nic = ''
      this.patient.age = ''
      this.patient.whatsappnumber = ''
      this.patient.email = ''
      this.age.years = ''
      this.age.months = ''
      Object.keys(this.err).forEach((k) => (this.err[k] = ''))
    },

    getCreate_Appt() {
      if (this.formValidate()) {
        if (confirm('Sure to create this appointment?')) {
          this.patient.age = this.computedAge
          this.getCreateAppt({ patient: this.patient, user: this.loggeduser })
          this.$emit('getexitform')
        }
      } else {
        this.showMessage({ type: 'Failed', message: 'Invalid Data Found..' })
      }
    },

    getClose() {
      this.$emit('getexitform')
    },

    formValidate() {
      let isformvalid = true

      // Mobile
      if (isNaN(this.patient.smsnumber) || this.patient.smsnumber.length < 10) {
        this.err.smsnumber = 'Invalid Mobile'
        isformvalid = false
      } else this.err.smsnumber = ''

      // Name
      if (!this.patient.name) {
        this.err.name = 'Invalid Name'
        isformvalid = false
      } else this.err.name = ''

      // Age
      if (!this.age.years && !this.age.months) {
        this.err.age = 'Invalid age'
        isformvalid = false
      } else {
        this.err.age = ''
        this.patient.age = this.computedAge
      }

      return isformvalid
    },

    changeValidation(lbl) {
      switch (lbl) {
        case 'Mobile':
          this.err.smsnumber =
            isNaN(this.patient.smsnumber) || this.patient.smsnumber.length < 10
              ? 'Invalid Mobile'
              : ''
          this.patient.whatsappnumber = this.patient.smsnumber.substring(0, 10)
          break
        case 'Name':
          this.err.name = !this.patient.name ? 'Invalid Name' : ''
          break
        case 'NIC':
          this.err.nic = !this.patient.nic ? 'Invalid NIC' : ''
          break
        case 'Age':
          this.err.age = !this.age.years && !this.age.months ? 'Invalid age' : ''
          this.patient.age = this.computedAge
          break
        case 'Whatsapp':
          this.err.whatsappnumber =
            isNaN(this.patient.whatsappnumber) || this.patient.whatsappnumber.length < 10
              ? 'Invalid Whatsapp Number'
              : ''
          break
        case 'Email':
          this.err.email =
            this.patient.email.length > 3 && this.patient.email.includes('@')
              ? ''
              : 'Invalid Email'
          break
      }
    },
  },
  async beforeMount() {
    this.getClear()
    await this.getInitData({ param: '', clientcode: this.loggeduser.clientcode })
  },
}
</script>

<style scoped>
.cssform input {
  @apply text-EF-blue;
}
.cssEmail .csslable {
  width: 85px;
}
</style>
