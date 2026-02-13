<template>
  <section>
    <div class="relative">
      <!-- Close Button -->
      <div class="absolute top-0 right-0 m-2 cursor-pointer" @click="exit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <!-- Mobile Recipients Input -->
      <div class="mt-8">
        <inputtags
          class="cssemailinputtags w-full"
          :list="arrRecipients"
          lable="Mobile Recipients"
          type="number"
          title="Input Recipient Mobile Numbers"
        />
      </div>

      <!-- Send Button -->
      <div
        class="px-2 py-1 my-4 w-24 bg-blue-500 text-white text-center rounded cursor-pointer hover:bg-blue-600"
        @click="sendReports"
      >
        Send
      </div>
    </div>
  </section>
</template>

<script>
import inputtags from '~/components/customcontrol/inputtags'
import { mapMutations } from 'vuex'

export default {
  name: 'PickMobileReportRecipients',
  components: { inputtags },
  props: ['appt', 'arrRecipients'],
  data() {
    return {
      imageroot: process.env.Assets_83,
    }
  },
  methods: {
    ...mapMutations({
      showMessage: 'PUSH_NOTIFICATION',
    }),
    exit() {
      this.$emit('exit')
    },
    sendReports() {
      this.$emit('sendReportsToClient', {
        appt: this.appt,
        arrRecipients: this.arrRecipients,
        type: 'sms',
      })
    },
    showError(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },
  },
  head() {
    return { title: 'EasyAppts' }
  },
}
</script>

<style scoped>
.cssemailinputtags {
  width: 100%;
}
</style>
