<template>
    <section>
        <div>
            <!-- Top-level link or menu -->
            <div @click="toggleSubmenu('Tender')"
                class="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                        d="M9 12h6M9 16h6M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-7-7z"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </svg>
                    <span>Tender</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['Tender'] }" class="w-4 h-4 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>


            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen['Tender']" class="pl-4 mt-1 space-y-1">
                <router-link to="/Tender/allTender"
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>All Tenders</span>
                </router-link>

                <router-link to="/Tender/banner"
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Tender Banner</span>
                </router-link>

                <!-- <router-link to=""
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso')  ||  userStore.loggedUser.granted.includes('accdept')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800 disabled"
                    disabled
                    @click="$emit('close-sidebar')">
                    <span>Report</span>
                </router-link> -->
 
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