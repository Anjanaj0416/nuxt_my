import { useLoading } from "~/composables/useLoading";
import { useUserStore } from "~/stores/modules/userStore";

// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {

     try {
    const loading = useLoading()
    const userStore = useUserStore();
    loading.value = true
    console.log("Loading state:", loading.value)

    if (!userStore.token) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    }

    loading.value = false

  } catch (err) {
    console.error('❌ useLoading crashed:', err)
  }
//   const user = useState('user')  // example state
//   const loading = useLoading()   // we'll define this next

//   loading.value = true
//   console.log("loading:",loading);
  

//   if (!user.value) {
//     // Simulate a fetch or auth check
//     await new Promise(resolve => setTimeout(resolve, 1000))
//     user.value = { name: 'Guest' }
//   }

//   loading.value = false
})
