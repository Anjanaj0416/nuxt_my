<template>
    <section>
        <div>
            <!-- Top-level link or menu -->
            <div @click="toggleSubmenu('CRM')"
                class="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zM12 14c-4.42 0-8 2.79-8 6v2h16v-2c0-3.21-3.58-6-8-6z"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                    <span>CRM</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['CRM'] }" class="w-4 h-4 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>


            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen['CRM']" class="pl-4 mt-1 space-y-1">
                <router-link to="/qms/vendor/leads"
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('cso')  ||  userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso') || userStore.loggedUser.granted.includes('accdept')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Leads</span>
                </router-link>
                <!-- <router-link to="/qms/vendor"
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('accdept') || userStore.loggedUser.granted.includes('sso') || userStore.loggedUser.granted.includes('cso')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Vendors</span>
                </router-link> -->
                <div>
                    <div @click="toggleSubmenu('Vendor')"
                        v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso')|| userStore.loggedUser.granted.includes('cso') || userStore.loggedUser.granted.includes('accdept')"
                        class="flex items-center justify-between px-3 py-2 text-gray-300 rounded cursor-pointer hover:bg-blue-800">
                       <span>Vendors</span>
                        <svg :class="{ 'rotate-90': isSubmenuOpen['Vendor'] }"
                            class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <!-- Level 3 submenu -->
                    <div v-show="isSubmenuOpen['Vendor']" class="pl-4 space-y-1">
                        <router-link to="/qms/vendor"
                            v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('accdept') || userStore.loggedUser.granted.includes('sso') || userStore.loggedUser.granted.includes('cso') ||  userStore.loggedUser.granted.includes('flo')"
                            class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                            @click="$emit('close-sidebar')">
                            <span>Vendors</span>
                        </router-link>
                        <router-link to="/qms/vendor/manualPI"
                            class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                            @click="$emit('close-sidebar')">
                            Manual PI
                        </router-link>
                    </div>
                </div>

                <router-link to="/qms/commission"
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso')  ||  userStore.loggedUser.granted.includes('accdept')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Commission</span>
                </router-link>

                <!-- <router-link to="/qms/availableBanner"
                    v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('cso') || userStore.loggedUser.granted.includes('sso') || userStore.loggedUser.granted.includes('cso')"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>Available Banner</span>
                </router-link> -->

                <div>
                    <div @click="toggleSubmenu('Banners')"
                        v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('flo') || userStore.loggedUser.granted.includes('sso')|| userStore.loggedUser.granted.includes('cso') ||  userStore.loggedUser.granted.includes('accdept')"
                        class="flex items-center justify-between px-3 py-2 text-gray-300 rounded cursor-pointer hover:bg-blue-800">
                       <span>Banners</span>
                        <svg :class="{ 'rotate-90': isSubmenuOpen['Banners'] }"
                            class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <!-- Level 3 submenu -->
                    <div v-show="isSubmenuOpen['Banners']" class="pl-4 space-y-1">
                        <router-link to="/qms/banners/availableBanner"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Available Banners
                        </router-link>
                        <router-link to="/qms/banners/allBanner"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            All Banners
                        </router-link>
                    </div>
                </div>

                <div>
                    <div @click="toggleSubmenu('Reports')"
                        v-if="userStore.loggedUser.granted.includes('su') || userStore.loggedUser.granted.includes('sso') "
                        class="flex items-center justify-between px-3 py-2 text-gray-300 rounded cursor-pointer hover:bg-blue-800">
                        <span>Reports</span>
                        <svg :class="{ 'rotate-90': isSubmenuOpen['Reports'] }"
                            class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <!-- Level 3 submenu -->
                    <div v-show="isSubmenuOpen['Reports']" class="pl-4 space-y-1">
                        <router-link to="/qms/reports?p=R901"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Invoice Data Summary Report
                        </router-link>
                        <router-link to="/qms/reports?p=R902"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Receipt Data Summary Report
                        </router-link>
                        <router-link to="/qms/reports?p=R903"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Unsettled Advances
                        </router-link>
                        <router-link to="/qms/reports?p=R904"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Debtor OS Report
                        </router-link>
                        <router-link to="/qms/reports?p=R905"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Commission Calculation Report
                        </router-link>
                        <router-link to="/qms/reports?p=R906"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Collection Sheet Report
                        </router-link>
                        <router-link to="/qms/reports?p=R907"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            Sales KPI Report
                        </router-link>
                        <router-link to="/qms/reports?p=R908"
                            class="block px-3 py-1 text-sm text-gray-400 rounded hover:text-white hover:bg-blue-700"
                            @click="$emit('close-sidebar')">
                            All Commision Payment Report
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