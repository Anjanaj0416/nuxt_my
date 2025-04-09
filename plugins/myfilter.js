import moment from "moment"

export default defineNuxtPlugin((nuxtApp) => {
    const myUtility = {
        toInputTypeDate(date) {
            if (date) {
                var formated = moment(String(date)).format('YYYY-MM-DD')
                return (formated == '1900-01-01') ? '' : formated
            }
        },
    }
  
    // Provide globally
    return {
      provide: {
        myUtility
      }
    }
  })
  