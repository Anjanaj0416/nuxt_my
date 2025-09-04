<template>
    <section>
        <div>
            <!-- Top-level link or menu -->
            <div @click="toggleSubmenu('Document Registry')"
                class="flex items-center justify-between px-4 py-2 rounded cursor-pointer hover:bg-blue-800">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.732 16.5q.212 0 .356-.144T8.23 16v-5q0-.213-.144-.356q-.144-.144-.357-.144t-.356.144T7.23 11v5q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144T12 16V8q0-.213-.144-.356t-.357-.144t-.356.144T11 8v8q0 .213.144.356t.357.144m3.769 0q.213 0 .356-.144t.143-.356v-2q0-.213-.144-.356t-.356-.144t-.356.144t-.144.356v2q0 .213.144.356q.144.144.357.144M18 8q-.213 0-.357-.144T17.5 7.5V6H16q-.213 0-.356-.144t-.144-.357t.144-.356T16 5h1.5V3.5q0-.213.144-.356T18.001 3t.356.144t.143.356V5H20q.213 0 .356.144t.144.357t-.144.356T20 6h-1.5v1.5q0 .213-.144.356T17.999 8M5.116 20q-.691 0-1.153-.462T3.5 18.384V5.616q0-.691.463-1.153T5.115 4h8.808q.213 0 .356.144t.144.356v2.962q0 .666.475 1.14t1.14.475H19q.213 0 .356.144t.144.356v8.808q0 .69-.462 1.153T17.884 20z"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                    <span>Document Registry</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['Document Registry'] }"
                    class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen['Document Registry']" class="pl-4 mt-1 space-y-1">
                <router-link to="/forms"
                    class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    <span>View Registry</span>
                </router-link>
                <router-link to="#" class="block px-3 py-2 text-gray-300 rounded hover:text-white hover:bg-blue-800"
                    @click="$emit('close-sidebar')">
                    Upload Documents
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
        const userStore = useUserStore();
    },
}

</script>