<template>
    <section class="p-4 mt-20 max-w-2xl mx-auto">
        <h2 class="text-xl font-bold mb-4 ">Document Register</h2>
        <TreeView :items="dtlStore.treeData" />
    </section>
</template>

<script>

import TreeView from "~/components/customcontrol/TreeView.vue";
import LinkBtn from "~/components/customcontrol/Link";
import Button from "~/components/customcontrol/Button";
import selectinput2 from "~/components/customcontrol/selectinput2";
import { useDtlStore } from "~/stores/modules/dtlStore";
import { useUserStore } from "~/stores/modules/userStore";

definePageMeta({
    layout: "default",
    middleware: "auth",
});

export default {
    components: { LinkBtn, Button, selectinput2, TreeView },
    props: [""],
    data() {
        return {
            imageroot: "",
            showLoading: null,
        };
    },

    async mounted() { },
    async created() {
        this.showLoading = this.$showLoading;

        this.userStore = useUserStore();
        this.dtlStore = useDtlStore();
        this.dtlStore.getDocumentRegistry(this.showLoading);

        this.imageroot = this.userStore.loggedUser.resourceURLRoot;

    },
    methods: {

    },
    head() {
        return {
            title: "Intranet - Digital Tech Labs",
        };
    },
};
</script>

<style scoped>
.csscmd {
    @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
    @apply bg-blue-200 cursor-pointer;
}

.cssBox {
    border: 1px solid;
    @apply border-gray-500 rounded p-2;
}
</style>
