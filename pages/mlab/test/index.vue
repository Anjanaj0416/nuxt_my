<template>
  <section class="mt-12 ml-1 lg:m-16">
    <!-- Header -->
    <div class="cssHeading flex-none lg:flex justify-between py-2 px-2 lg:px-2">
      <div class="text-sm lg:text-base mb-2 uppercase">Medical Tests</div>
      <div class="header_right">
        <div>
          <input
            type="text"
            maxlength="20"
            @keydown.enter="getSearchTest()"
            v-model="searchval"
            placeholder="Search"
            title="Press Enter for Search"
            class="rounded bg-EF-white text-black px-2 pt-1 w-32 text-sm"
          />
        </div>

        <div class="flex gap-x-2">
          <div>
            <selectinput2
              class="w-10 text-white"
              v-model="cur_page"
              :cur_item="cur_page"
              :selections="testresult.alpages"
              label=""
              cssclass="cssPages"
              @changed="pagechanged"
            />
          </div>
          <div>/ {{ testresult.totalpages }}</div>
        </div>

        <div class="clickable" title="Refresh" @click="getRefresh()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>

        <div class="clickable" title="Exit" @click="getclose()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Test Rows -->
    <div class="cssRows" v-for="test_obj in altest" :key="test_obj.id">
      <testrow
        :test="test_obj"
        :editlevel="loggeduser.usergroup"
        @sort="sort_col"
        @delete="setDelete"
        @SaveTest="getSaveTest"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import testrow from '~/components/mlab/crud/test_row'
import selectinput2 from '~/components/customcontrol/selectinput2'

export default {
  layout: 'default',
  components: { testrow, selectinput2 },
  data() {
    return {
      cur_page: 1,
      searchval: '',
      sort_Desc_Settings: {
        TestType: true,
        TestName: true,
        TestClassName: true,
        Description: true,
        Parameter: true,
        Formula: true,
        ReportTemplate: true,
        Price: true,
        Discount: true,
        Status: true,
      },
    }
  },
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      testresult: state => state.test.testresult,
      altest: state => state.test.altest,
      test: state => state.test.test,
      initData: state => state.test.initData,
    }),
  },
  methods: {
    ...mapActions({
      getInitData: 'test/getInitData',
      getSave: 'test/getSave',
      getDelete: 'test/getDelete',
      getSearch: 'test/getSearch',
      getSaveImage: 'test/getSaveImage',
    }),
    ...mapMutations({
      showMessage: 'PUSH_NOTIFICATION',
      setEditMode: 'test/SET_EDITMODE',
      setTest: 'test/SET_TEST',
      clearTest: 'test/CLEAR_TEST',
      setorganizedlistdata: 'test/SET_ORGANIZEDLISTDATA',
      setpage: 'test/SET_PAGE',
      clear_altest: 'test/CLEAR_AL_TEST',
    }),

    pagechanged(page_num) {
      this.cur_page = page_num
      this.setpage(this.cur_page)
    },

    async getRefresh() {
      this.clear_altest()
      await this.getSearch({
        searchval: this.searchval,
        userid: this.loggeduser.id,
        clientcode: this.loggeduser.clientcode,
      })
      this.searchval = ''
    },

    async getSearchTest() {
      await this.getSearch({
        searchval: this.searchval,
        userid: this.loggeduser.id,
        clientcode: this.loggeduser.clientcode,
      })
    },

    clearErrlabels() {
      this.err = {} // reset all error labels
    },

    async getSaveTest(test) {
      await this.getSave({ test, user: this.loggeduser })
    },

    async setDelete(test) {
      if (test.id === 0) {
        await this.getRefresh()
        return
      }
      await this.getDelete(test)
    },

    addnew() {
      this.clearTest()
      this.altest.unshift(this.test)
    },

    getclose() {
      this.$router.push('/')
    },

    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },

  async beforeMount() {
    if (this.loggeduser.usergroup === 'user' || !this.loggeduser.usergroup) {
      this.showMessage({ type: 'Failed', message: 'Not Allowed to access this page' })
      this.$router.push('/')
    } else {
      await this.getSearch({ searchval: '', userid: -1, clientcode: this.loggeduser.clientcode })
    }
  },

  head() {
    return { title: 'Medical Tests' }
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
</style>
