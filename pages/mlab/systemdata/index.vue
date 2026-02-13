<template>
  <section class="mt-12 ml-1 lg:m-16">
    <!-- Header -->
    <div class="cssHeading flex-none lg:flex justify-between py-2 px-2 lg:px-2">
      <div class="text-sm lg:text-base mb-2 uppercase">System Data</div>
      <div class="header_right notToPrint">
        <div>
          <input
            type="text"
            maxlength="20"
            @keydown.enter="getSearchSystemdata()"
            v-model="searchval"
            placeholder="Search"
            title="Press Enter for Search"
            class="rounded bg-EF-white text-black px-2 pt-1 w-32 text-sm"
          />
        </div>

        <div class="flex gap-x-1">
          <div>
            <selectinput2
              class="w-10 text-white"
              v-model="cur_page"
              :cur_item="cur_page"
              :selections="systemdataresult.alpages"
              label=""
              cssclass="cssPages"
              @changed="pagechanged"
            />
          </div>
          <div>/{{ systemdataresult.totalpages }}</div>
        </div>

        <div class="clickable" title="Refresh" @click="getRefresh()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>

        <div class="clickable" title="Exit" @click="getclose()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- System Data Rows -->
    <div class="cssRows" v-for="systemdata_obj in alsystemdata" :key="systemdata_obj.id">
      <systemdatarow
        :systemdata="systemdata_obj"
        :initData="initData"
        :editlevel="loggeduser.usergroup"
        @sort="sort_col"
        @delete="setDelete"
        @SaveSystemdata="getSaveSystemdata"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import systemdatarow from '~/components/mlab/crud/systemdata_row'
import selectinput2 from '~/components/customcontrol/selectinput2'

export default {
  layout: 'default',
  components: { systemdatarow, selectinput2 },
  data() {
    return {
      cur_page: 1,
      searchval: '',
      sort_Desc_Settings: {
        dtype: true,
        dvalue: true,
        status: true,
      },
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      systemdataresult: state => state.systemdata.systemdataresult,
      alsystemdata: state => state.systemdata.alsystemdata,
      systemdata: state => state.systemdata.systemdata,
      initData: state => state.systemdata.initData,
    }),
  },
  methods: {
    ...mapActions({
      getInitData: 'systemdata/getInitData',
      getSave: 'systemdata/getSave',
      getDelete: 'systemdata/getDelete',
      getSearch: 'systemdata/getSearch',
      getSaveImage: 'systemdata/getSaveImage',
    }),
    ...mapMutations({
      setEditMode: 'systemdata/SET_EDITMODE',
      setSystemdata: 'systemdata/SET_SYSTEMDATA',
      clearSystemdata: 'systemdata/CLEAR_SYSTEMDATA',
      setFiltered: 'systemdata/SET_FILTERED',
      setorganizedlistdata: 'systemdata/SET_ORGANIZEDLISTDATA',
      setpage: 'systemdata/SET_PAGE',
      clear_alsystemdata: 'systemdata/CLEAR_AL_SYSTEMDATA',
    }),

    pagechanged(page_num) {
      this.cur_page = page_num
      this.setpage(this.cur_page)
    },

    async getRefresh() {
      await this.getSearch({ searchval: this.searchval, user: this.loggeduser })
      this.searchval = ''
    },

    async getSearchSystemdata() {
      this.clear_alsystemdata()
      await this.getSearch({ searchval: this.searchval, user: this.loggeduser })
    },

    sort_col(val) {
      this.setFiltered(
        this.alsystemdata.sort((a, b) =>
          Global.compareValues(val, this.sort_Desc_Settings[val] ? 'desc' : 'asc')(a, b)
        )
      )
      this.sort_Desc_Settings[val] = !this.sort_Desc_Settings[val]
    },

    async getSaveSystemdata(systemdata) {
      await this.getSave({ systemdata, user: this.loggeduser })
    },

    async setDelete(systemdata) {
      if (systemdata.id === 0) {
        await this.getRefresh()
        return
      }
      await this.getDelete({ systemdata, user: this.loggeduser })
    },

    addnew() {
      this.clearSystemdata()
      this.alsystemdata.unshift(this.systemdata)
      this.setFiltered(this.alsystemdata)
    },

    getclose() {
      this.$router.push('/')
    },

    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
  async beforeMount() {
    await this.getInitData({ clientcode: this.loggeduser.clientcode, param: '' })
    await this.getSearch({ searchval: '', user: this.loggeduser })
  },
  head() {
    return {
      title: 'System Data',
    }
  },
}
</script>

<style scoped>
.cssHeading {
  @apply bg-EF-blue text-lg text-white rounded-t-lg flex-wrap content-center;
}
.header_right {
  @apply flex gap-x-3 cursor-pointer;
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
@media print {
  .notToPrint {
    visibility: hidden;
  }
}
</style>
