import { useUserStore } from "../stores/modules/userStore";

export default defineNuxtPlugin(() => {
    const userStore = useUserStore();
    userStore.loadFromStorage();
  });