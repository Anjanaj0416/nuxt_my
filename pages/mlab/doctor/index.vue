<template>
  <section class="mt-12 ml-1 lg:m-16">
    <!-- Header -->
    <div class="cssHeading flex-none lg:flex justify-between py-2 px-2 lg:px-2">
      <div class="text-sm lg:text-base mb-2 uppercase">Doctor</div>
      <div class="header_right">
        <input
          type="text"
          maxlength="20"
          v-model="searchval"
          @keydown.enter="getSearchDoctor"
          placeholder="Search"
          title="Press Enter for Search"
          class="rounded bg-EF-white text-black px-2 pt-1 w-32 text-sm"
        />

        <div class="flex gap-x-1 items-center">
          <selectinput2
            class="w-10 text-white"
            v-model="cur_page"
            :cur_item="cur_page"
            :selections="doctorresult.alpages"
            cssclass="cssPages"
            @changed="pagechanged"
          />
          <div>/ {{ doctorresult.totalpages }}</div>
        </div>

        <div class="clickable" title="New" @click="addnew">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
          </svg>
        </div>

        <div class="clickable" title="Refresh" @click="getRefresh">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>

        <div class="clickable" title="Exit" @click="getclose">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Doctor Rows -->
    <div class="cssRows" v-for="(doctor_obj, idx) in aldoctor" :key="doctor_obj.id || idx">
      <doctorrow
        :doctor="doctor_obj"
        :initData="initData"
        :editlevel="loggeduser.usergroup"
        @sort="sort_col"
        @delete="setDelete"
        @SaveDoctor="getSaveDoctor"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as Global from '@/assets/js/Global'
import doctorrow from '~/components/mlab/crud/doctor_row'
import textInput from '~/components/customcontrol/textinput'
import selectinput2 from '~/components/customcontrol/selectinput2'

export default {
  layout: 'default',
  components: { doctorrow, textInput, selectinput2 },

  data() {
    return {
      cur_page: 1,
      searchval: '',
      sort_Desc_Settings: [
        { firstname: true },
        { lastname: true },
        { fullname: true },
        { speciality: true },
        { mobile: true },
        { email: true },
        { sex: true },
        { title: true },
        { signature: true },
        { status: true },
      ],
    }
  },

  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      doctorresult: state => state.doctor.doctorresult,
      aldoctor: state => state.doctor.aldoctor,
      doctor: state => state.doctor.doctor,
      initData: state => state.doctor.initData,
    }),
  },

  methods: {
    ...mapActions({
      getInitData: 'doctor/getInitData',
      getSave: 'doctor/getSave',
      getDelete: 'doctor/getDelete',
      getSearch: 'doctor/getSearchForCRUD',
      getSaveImage: 'doctor/getSaveImage',
    }),
    ...mapMutations({
      setEditMode: 'doctor/SET_EDITMODE',
      setDoctor: 'doctor/SET_DOCTOR',
      clearDoctor: 'doctor/CLEAR_DOCTOR',
      setFiltered: 'doctor/SET_FILTERED',
      setorganizedlistdata: 'doctor/SET_ORGANIZEDLISTDATA',
      setpage: 'doctor/SET_PAGE',
      clear_aldoctor: 'doctor/CLEAR_AL_DOCTOR',
    }),

    pagechanged(page_num) {
      this.cur_page = page_num
      this.setpage(this.cur_page)
    },

    async getRefresh() {
      this.clear_aldoctor()
      await this.getSearch({ searchval: this.searchval, user: this.loggeduser })
      this.searchval = ''
    },

    async getSearchDoctor() {
      await this.getSearch({ searchval: this.searchval, user: this.loggeduser })
    },

    sort_col(val) {
      this.setFiltered(
        this.aldoctor.sort(Global.compareValues(val, this.sort_Desc_Settings[val] ? 'desc' : 'asc'))
      )
      this.sort_Desc_Settings[val] = !this.sort_Desc_Settings[val]
    },

    async getSaveDoctor(doctor) {
      await this.getSave({ doctor, user: this.loggeduser })
    },

    async setDelete(doctor) {
      if (doctor.id === 0) {
        this.getRefresh()
        return
      }
      await this.getDelete({ doctor, user: this.loggeduser })
    },

    addnew() {
      this.clearDoctor()
      this.aldoctor.unshift(this.doctor)
      this.setFiltered(this.aldoctor)
    },

    getclose() {
      this.$router.push('/')
    },

    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },

  async beforeMount() {
    await this.getInitData()
    await this.getSearch({ searchval: '', user: this.loggeduser })
  },

  head() {
    return { title: 'Doctor' }
  },
}
</script>

<style scoped>
.cssHeading {
  @apply bg-EF-blue text-lg text-white rounded-t-lg flex-wrap content-center;
}
.header_right {
  @apply flex gap-x-3 cursor-pointer items-center;
}
.clickable {
  @apply cursor-pointer uppercase;
}
.clickable:hover {
  @apply text-green-500 font-bold;
}
.cssRows {
  @apply rounded shadow-outline mt-4;
}
</style>
