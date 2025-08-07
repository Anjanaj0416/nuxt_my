import { defineNuxtPlugin } from '#app'
import Vue3Select from 'vue3-select'
import 'vue3-select/dist/vue3-select.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Vue3Select', Vue3Select)
})
