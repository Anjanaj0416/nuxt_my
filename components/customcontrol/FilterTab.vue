<!-- usage
-->
<template>
    <section>
        <div class="flex flex-wrap items-center gap-4 mt-5">

            <div class="flex items-center space-x-2" v-for="(filter, index) in arrFilter" :key="index">
                <div class="-mt-4" @click="onClick(filter)">
                    <input :id="'radio-' + index" type="radio" value="" name="default-radio"
                        class="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <Label :for="'radio-' + index"
                        class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300 cursor-pointer">
                        {{ filter }}
                    </Label>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
export default {
    props: ['arrFilter'],
    computed: {

    },
    data() {
        return {
            selectedFilter: '',
        }
    },
    methods: {
        onClick(filter) {
            this.selectedFilter = filter;
            this.$emit('selected', filter)
            this.$emit('click', filter)
        }
    }
}
</script>

<style scoped>
/* All styles managed via Tailwind CSS */
</style>
