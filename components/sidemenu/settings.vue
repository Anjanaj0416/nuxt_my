<template>
    <section>
        <div>
            <!-- Top-level link or menu -->
            <div @click="toggleSubmenu('Settings')"
                class="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                    <span>Settings</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['Settings'] }"
                    class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen['Settings']" class="pl-4 mt-1 space-y-1">
                <div>
                    <div @click="toggleSubmenu('QMS')"
                        v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('sso')"
                        class="flex items-center justify-between px-3 py-2 text-gray-300 rounded cursor-pointer hover:bg-blue-800">
                        <span>QMS</span>
                        <svg :class="{ 'rotate-90': isSubmenuOpen['QMS'] }"
                            class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <!-- Level 3 submenu -->
                    <div v-show="isSubmenuOpen['QMS']" class="pl-4 space-y-1">
                        <router-link to="/qms/system?ps=801"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Add Packages
                        </router-link>
                        <router-link to="/qms/system?ps=802"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Add Cities
                        </router-link>
                        <router-link to="/qms/system?ps=803"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Add Commision Rate
                        </router-link>
                    </div>
                </div>
                <div>
                    <div @click="toggleSubmenu('HR')"
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('hradmin')"
                        class="flex items-center justify-between px-3 py-2 text-gray-300 rounded cursor-pointer hover:bg-blue-800">
                        <span>HR</span>
                        <svg :class="{ 'rotate-90': isSubmenuOpen['HR'] }"
                            class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <!-- Level 3 submenu -->
                    <div v-show="isSubmenuOpen['HR']" class="pl-4 space-y-1">
                        <router-link to="/hr/system?ps=701"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Upload Employee Details
                        </router-link>
                        <router-link to="/hr/system?ps=702"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Set Holidays
                        </router-link>
                        <router-link to="/hr/system?ps=703"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Set Special Work Arrangement
                        </router-link>
                    </div>
                </div>
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