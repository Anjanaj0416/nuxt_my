<template>
  <section class="mt-10 h-screen font-sans login bg-cover">
    <div class="container mx-auto h-full flex flex-1 justify-center items-center">
      <div class="w-full max-w-lg">
        <div class="leading-loose">
          <form class="max-w-xl m-4 p-10 bg-white shadow-xl rounded">
            <p class="text-gray-800 font-medium text-center text-lg font-bold uppercase">
              System Expiration Warning
            </p>            

            <div class="text-center my-4">
              {{ login_resp.login_msg }}            
            </div> 

            <div 
              v-if="loggeduser.usergroup === 'poweruser' || loggeduser.usergroup === 'admin'" 
              class="text-center cursor-pointer text-sm px-4 py-2 bg-gray-200 rounded shadow hover:bg-blue-300 my-4"
              @click="goto_payments"
            >
              View Payments
            </div>

            <div class="mt-4 flex justify-center">
              <button
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded hover:bg-gray-700"
                type="button"
                @click="getContinue"
              >
                Continue
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as Global from '@/assets/js/Global'

export default {
  layout: 'home',
  computed: {
    ...mapState({
      loggeduser: state => state.loggeduser,
      login_resp: state => state.auth.login_resp,
    }),
    getFormatDate() {
      return (dt) => {
        if (!dt) return ''
        return Global.getDateFormat1(new Date(dt))
      }
    },
  },
  methods: {
    ...mapMutations({
      setMenuLock: 'SETMENULOCKING',
    }),
    goto_payments() {
      this.$router.push('/mgt_reports/payments')
    },
    getContinue() {
      this.$router.push('/labappt')
      this.setMenuLock(false)
    },
  },
  beforeMount() {
    this.setMenuLock(true)
  },
  head() {
    return { title: 'System Expiration' }
  },
}
</script>

<style scoped>
/* You can add custom styles if needed */
</style>
