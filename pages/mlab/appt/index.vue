<template>
  <section class="mt-12 ml-1 lg:m-16">
    <!-- Header Section -->
    <div class="cssHeading flex-none lg:flex justify-between py-2 px-2 lg:px-2">
      <div class="text-sm lg:text-base mb-2 uppercase">Appt</div>
      <div class="header_right">
        <input
          type="text"
          maxlength="20"
          v-model="searchval"
          @keydown.enter="getSearchAppt"
          placeholder="Search"
          title="Press Enter for Search"
          class="rounded bg-EF-white text-black px-2 pt-1 w-32 text-sm"
        />

        <div class="flex gap-x-2 items-center">
          <selectinput2
            class="w-10 text-white"
            v-model="cur_page"
            :cur_item="cur_page"
            :selections="apptresult.alpages"
            cssclass="cssPages"
            @changed="pagechanged"
          />
          <div>/ {{ apptresult.totalpages }}</div>
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

    <!-- Appointment Rows -->
    <div class="cssRows" v-for="(appt_obj, idx) in alappt" :key="appt_obj.id || idx">
      <apptrow
        :appt="appt_obj"
        :editlevel="loggeduser.usergroup"
        @sort="sort_col"
        @delete="setDelete"
        @SaveAppt="getSaveAppt"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as Global from '@/assets/js/Global'
import apptrow from '~/components/mlab/crud/appt_row'
import textInput from '~/components/customcontrol/textinput'
import selectinput2 from '~/components/customcontrol/selectinput2'

export default {
  layout: 'default',
  components: { apptrow, textInput, selectinput2 },
  data() {
    return {
      cur_page: 1,
      searchval: '',
      sort_Desc_Settings: [
        { PatientID: true },
        { Token: true },
        { ApptType: true },
        { ApptDate: true },
        { Status: true },
      ],
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      apptresult: state => state.appt.apptresult,
      alappt: state => state.appt.alappt,
      appt: state => state.appt.appt,
      initData: state => state.appt.initData,
    }),
  },
  methods: {
    ...mapActions({
      getInitData: 'appt/getInitData',
      getSave: 'appt/getSave',
      getDelete: 'appt/getDelete',
      getSearch: 'appt/getSearch',
      getSaveImage: 'appt/getSaveImage',
    }),
    ...mapMutations({
      setEditMode: 'appt/SET_EDITMODE',
      setAppt: 'appt/SET_APPT',
      clearAppt: 'appt/CLEAR_APPT',
      setFiltered: 'appt/SET_FILTERED',
      setorganizedlistdata: 'appt/SET_ORGANIZEDLISTDATA',
      setpage: 'appt/SET_PAGE',
      clear_alappt: 'appt/CLEAR_AL_APPT',
    }),

    pagechanged(page_num) {
      this.cur_page = page_num
      this.setpage(this.cur_page)
    },

    async getRefresh() {
      this.clear_alappt()
      await this.getSearch({ searchval: this.searchval, userid: this.loggeduser.id })
      this.searchval = ''
    },

    async getSearchAppt() {
      await this.getSearch({ searchval: this.searchval, userid: this.loggeduser.id })
    },

    sort_col(val) {
      this.setFiltered(
        this.alappt.sort(Global.compareValues(val, this.sort_Desc_Settings[val] ? 'desc' : 'asc'))
      )
      this.sort_Desc_Settings[val] = !this.sort_Desc_Settings[val]
    },

    async getSaveAppt(appt) {
      await this.getSave(appt)
    },

    async setDelete(appt) {
      if (appt.id === 0) {
        this.getRefresh()
        return
      }
      await this.getDelete(appt)
    },

    addnew() {
      this.clearAppt()
      this.alappt.unshift(this.appt)
      this.setFiltered(this.alappt)
    },

    getclose() {
      this.$router.push('/')
    },
  },
  async beforeMount() {
    await this.getSearch({ searchval: '', userid: -1 })
  },
  head() {
    return { title: 'Appt' }
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

.cssRows:nth-child(odd) {
  @apply bg-green-700;
}

.cssRows:nth-child(even) {
  @apply bg-blue-700;
}
</style>
