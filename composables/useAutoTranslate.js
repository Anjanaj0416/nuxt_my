// composables/useAutoTranslate.js
import axios from 'axios'
import { useI18n } from 'vue-i18n'

// Cache translations to avoid repeated API calls
const translationCache = {}

export function useAutoTranslate() {
  const { locale } = useI18n()

  const autoTranslate = async (text) => {
    if (!text) return ''
    const lang = locale.value || 'en'

    // Return cached translation if exists
    const cacheKey = `${text}_${lang}`
    if (translationCache[cacheKey]) return translationCache[cacheKey]

    // If language is English, no translation needed
    if (lang === 'en') return text

    try {
      const response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: text,
            target: lang,
            key: 'https://cloud.google.com/translate/docs/reference/rest/?apix=true',
          },
        }
      )

      const translatedText = response.data.data.translations[0].translatedText
      translationCache[cacheKey] = translatedText
      return translatedText
    } catch (error) {
      console.error('Translation failed:', error)
      return text
    }
  }

  return { autoTranslate }
}
