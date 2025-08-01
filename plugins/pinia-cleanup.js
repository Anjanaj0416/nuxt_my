// // plugins/pinia-cleanup.js
// export default defineNuxtPlugin((nuxtApp) => {
//   const pinia = nuxtApp.$pinia;
//   pinia.use(({ store }) => {
//     Object.keys(store.$state).forEach((key) => {
//       if (store.$state[key] === null || store.$state[key] === undefined) {
//         store.$state[key] = {}; // Replace with a safe default
//       }
//     });
//   });
// });