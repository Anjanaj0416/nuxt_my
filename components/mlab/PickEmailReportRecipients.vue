<template>
  <section class="relative w-full">
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

    <!-- Email Input Tags -->
    <div class="mt-8">
      <inputtags
        class="cssemailinputtages"
        v-model="recipients"
        :list="recipients"
        label="Email Recipients"
        type="text"
        title="Input Recipient Email Addresses"
      />
    </div>

    <!-- Send Button -->
    <div
      class="px-3 py-1 mt-2 w-20 text-center cursor-pointer bg-EF-green-300 rounded font-semibold text-white"
      @click="sendReports"
    >
      Send
    </div>
  </section>
</template>

<script>
import inputtags from '~/components/customcontrol/inputtags'

export default {
  name: 'PickEmailReportRecipients',
  components: { inputtags },
  props: {
    appt: { type: Object, required: true },
    arrRecipients: { type: Array, default: () => [] },
  },
  data() {
    return {
      recipients: [...this.arrRecipients], // local copy for v-model
    }
  },
  methods: {
    sendReports() {
      // emit recipients back to parent
      this.$emit('sendReportsToClient', {
        appt: this.appt,
        arrRecipients: this.recipients,
        type: 'email',
      })
    },
    exit() {
      this.$emit('exit')
    },
  },
}
</script>

<style scoped>
.cssemailinputtages {
  width: 100%;
  max-width: 700px;
}
</style>
