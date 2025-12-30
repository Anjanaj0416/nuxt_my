<template>
    <section>
        <div>
            <!-- Top-level link or menu -->
            <div @click="toggleSubmenu('Help')"
                class="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:text-gray-600 hover:bg-white">
                <div class="flex items-center">
                    <!-- <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg> -->
                    <span>Help</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['Help'] }" class="w-4 h-4 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>


            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen['Help']" class="pl-4 mt-1 space-y-1">
                <router-link to=""
                    class="block px-3 py-2 text-white rounded hover:bg-white hover:text-gray-600"
                    @click="$emit('close-sidebar')">
                    <span>Appoinments</span>
                </router-link>

                
            </div>
        </div>
    </section>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from '~/stores/modules/userStore';

export default {
    props: ['isOpen'],

    setup() {
        const isSubmenuOpen = ref({}); // Object to track submenu states

        const toggleSubmenu = (name) => {
            isSubmenuOpen.value = {
                ...isSubmenuOpen.value,
                [name]: !isSubmenuOpen.value[name],
            };
        };

        return {
            isSubmenuOpen,
            toggleSubmenu,
        };
    },

    async created() {
        this.userStore = useUserStore();

    },
}

</script>