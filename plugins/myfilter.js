//import moment from "moment";

export default defineNuxtPlugin(() => {
//   function pluralize(time, label) {
//     return time + label + (time === 1 ? "" : "s");
//   }

//   export function timeAgo(time) {
//     const between = Date.now() / 1000 - Number(time);
//     if (between < 3600) {
//       return pluralize(~~(between / 60), " minute");
//     } else if (between < 86400) {
//       return pluralize(~~(between / 3600), " hour");
//     } else {
//       return pluralize(~~(between / 86400), " day");
//     }
//   }

// const   toFullDate = (date) => {
//     if (date) {
//       return moment(String(date)).format("MM/DD/YYYY hh:mm");
//     }
//     return "";
//   }

//   export function toShortDate(date) {
//     if (date) {
//       return moment(String(date)).format("MM/DD/YY");
//     }
//     return "";
//   }

// const   toInputTypeDate= (date) => {
//    console.log(date)
//     if (date) {
//       const formatted = moment(String(date)).format("YYYY-MM-DD");
//       console.log(formatted)
//       return formatted === "1900-01-01" ? "" : formatted;
//     }
//     return "";
//   }

//   export function toReadableDate(date) {
//     try {
//       return date.split("T")[0];
//     } catch {
//       return "";
//     }
//   }

//   export function toLKR(value) {
//     try {
//       return `Rs.${parseFloat(value.toFixed(2)).toLocaleString()}`;
//     } catch {
//       return "";
//     }
//   }

//   export function toLKR1(value) {
//     try {
//       return parseFloat(value.toFixed(2)).toLocaleString();
//     } catch {
//       return "";
//     }
//   }

// return {
//     provide: {
//       myfilter: {
//         toInputTypeDate,
//        // toFullDate
//       }
//     }
//   }

});

// const filters = { timeAgo, toLKR,toLKR1, toFullDate, toShortDate, toInputTypeDate, toReadableDate}

// Object.keys(filters).forEach(key => {
//     Vue.filter(key, filters[key])
// })
