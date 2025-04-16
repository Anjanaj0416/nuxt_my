// import moment from "moment"

// export default defineNuxtPlugin((nuxtApp) => {
//     const myUtility = {
//       timeAgo(time) {
//         const between = Date.now() / 1000 - Number(time)
//         if (between < 3600) {
//             return pluralize(~~(between / 60), ' minute')
//         } else if (between < 86400) {
//             return pluralize(~~(between / 3600), ' hour')
//         } else {
//             return pluralize(~~(between / 86400), ' day')
//         }
//       },

//       toFullDate(date) {
//           if (date) {
//               return moment(String(date)).format('MM/DD/YYYY hh:mm')
//           }
//       },

//       toShortDate(date) {
//           if (date) {
//               return moment(String(date)).format('MM/DD/YY')
//           }
//       },

//       toInputTypeDate(date) {
//           if (date) {
//               var formated = moment(String(date)).format('YYYY-MM-DD')
//               return (formated == '1900-01-01') ? '' : formated
//           }
//       },

//       toReadableDate(date) {

//         try {
//             return date.split("T")[0];
//         }
//         catch { return ''; }
    
//       },

//       toLKR(value) {
//         var pricestr = ''
//         try {
//             pricestr = `Rs.${ (parseFloat(value.toFixed(2))).toLocaleString()}`;
//         }
//         catch { }
//         return pricestr
//       },

//       toLKR1(value) {
//         var pricestr = ''
//         try {
//             pricestr = (parseFloat(value.toFixed(2))).toLocaleString();
//         }
//         catch { }
//         return pricestr
//       },
//     }
  
//     // Provide globally
//     return {
//       provide: {
//         myUtility
//       }
//     }
//   })
  