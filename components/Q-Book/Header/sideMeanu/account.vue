<template>
    <section>
        <div>
            <!-- Top-level link or menu -->
            <div @click="toggleSubmenu('Invoice')"
                class="flex items-center justify-between px-4 py-2 text-black rounded cursor-pointer hover:text-black hover:bg-white">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                        d="M3 7h18v4H3V7zM3 11h18v7H3v-7zM7 15h4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        />
                    </svg>
                    <span>Accounts</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['Invoice'] }" class="w-4 h-4 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            <!-- Level 2 submenu -->
            <div v-show="isSubmenuOpen['Invoice']" class="pl-4 mt-1 space-y-1">
                <router-link to="/qbook/account"
                    class="block px-3 py-2 rounded text-black hover:text-black  hover:bg-white"
                    @click="$emit('close-sidebar')">
                    <span>Chart Of Account</span>
                </router-link>

                <!-- <router-link to="/Invoice/banner"
                    class="block px-3 py-2 rounded text-black hover:text-black hover:bg-white"
                    @click="$emit('close-sidebar')">
                    <span>Invoice Banner</span>
                </router-link> -->

 
            </div>
        </div>
    </section>
</template>


<script>
import { ref, computed, onMounted } from "vue";

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
        

    },
}

</script>