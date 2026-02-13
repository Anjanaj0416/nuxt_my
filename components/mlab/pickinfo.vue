<template>
  <article class="w-screen min-h-full h-auto absolute top-0 left-0 z-30">
    <div class="w-full flex justify-center flex-wrap">
      <div class="csscard mx-auto rounded mt-16 w-full lg:w-1/3 h-auto p-4">
        <div class="relative bg-EF-blue p-2 rounded-xl">
          <!-- Close Button -->
          <div
            class="text-blue-400 cursor-pointer absolute top-0 right-0 -m-2 bg-EF-blue rounded-full"
            title="Close"
            @click="getClose"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Mobile Input & NEXT Button -->
          <div class="flex gap-x-2 p-2 justify-center text-blue-400">
            <div>
              <div class="text-sm">Mobile</div>
              <div>
                <input
                  class="rounded text-lg px-2 py-1 shadow-outline"
                  type="text"
                  maxlength="10"
                  v-model="mobile"
                  @input="validateMobile"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <p v-if="err.value" class="text-xs text-red-500 mt-1">{{ err.value }}</p>
            </div>

            <div
              class="bg-blue-400 h-8 w-32 rounded text-center mt-6 pt-1 cursor-pointer shadow-outline text-white"
              title="Go to Appointment"
              @click="loadApptForm"
            >
              NEXT
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PickInfo',
  props: ['text', 'value'],
  data() {
    return {
      mobile: this.value || '',
      err: {
        value: '',
      },
    }
  },
  methods: {
    ...mapMutations({
      showMessage: 'PUSH_NOTIFICATION',
    }),
    getClose() {
      this.$emit('getexitform')
    },
    validateMobile() {
      this.err.value =
        isNaN(this.mobile) || this.mobile.length !== 10
          ? 'Invalid mobile'
          : ''
    },
    formValidate() {
      return !isNaN(this.mobile) && this.mobile.length === 10
    },
    loadApptForm() {
      if (this.formValidate()) {
        this.$emit('loadApptForm', this.mobile)
      } else {
        this.showMessage({
          type: 'Failed',
          message: 'Invalid Mobile Number.',
        })
      }
    },
  },
  watch: {
    value(val) {
      this.mobile = val
    },
  },
}
</script>

<style scoped>
</style>
