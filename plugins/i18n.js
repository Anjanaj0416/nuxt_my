import { createI18n } from 'vue-i18n'
import en from '~/i18n/locales/en.json'
import si from '~/i18n/locales/si.json'
import ta from '~/i18n/locales/ta.json'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en', // default language
    fallbackLocale: 'en',
    messages: { en, si, ta }
  })

  nuxtApp.vueApp.use(i18n)
})
