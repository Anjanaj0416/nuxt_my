<template>
    <section>
        <div>
            <!-- Sales Orders — replaces Invoice as top-level nav item -->
            <div @click="toggleSubmenu('SalesOrders')"
                class="flex items-center justify-between px-4 py-2 text-black rounded cursor-pointer hover:text-black hover:bg-white">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        />
                    </svg>
                    <span>Sales Orders</span>
                </div>
                <svg :class="{ 'rotate-90': isSubmenuOpen['SalesOrders'] }"
                     class="w-4 h-4 transition-transform duration-200"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            <!-- Submenu -->
            <div v-show="isSubmenuOpen['SalesOrders']" class="pl-4 mt-1 space-y-1">

                <router-link
                    to="/qbook/salesOrders"
                    class="flex items-center gap-2 px-3 py-2 rounded text-black hover:text-black hover:bg-white transition"
                    @click="$emit('close-sidebar')"
                >
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                    </svg>
                    <span>All Orders</span>
                </router-link>

                <router-link
                    to="/qbook/Invoices"
                    class="flex items-center gap-2 px-3 py-2 rounded text-black hover:text-black hover:bg-white transition"
                    @click="$emit('close-sidebar')"
                >
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 12h6M9 16h6M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"/>
                    </svg>
                    <span>All Invoices</span>
                </router-link>

            </div>
        </div>
    </section>
</template>

<script>
import { ref } from "vue";

export default {
    props: ['isOpen'],

    setup() {
        const isSubmenuOpen = ref({});

        const toggleSubmenu = (name) => {
            isSubmenuOpen.value = {
                ...isSubmenuOpen.value,
                [name]: !isSubmenuOpen.value[name],
            };
        };

        return { isSubmenuOpen, toggleSubmenu };
    },
};
</script>