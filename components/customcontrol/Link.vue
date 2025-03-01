<template>
    <a  @click="onClick" 
        :href="href"
        :target="target"
        :rel="target === '_blank' ? 'noopener noreferrer' : ''"

        class="px-4 py-2 text-sm font-medium text-gray-900 rounded-md hover:text-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
    >
        <slot>{{ label }}</slot>
    </a>
            <!-- class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700" -->
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Click here'
        },
        href: {
            type: String,
            default: '#'
        },
        target: {
            type: String,
            default: '_self'
        }
    },
    methods: {
        onClick() {
            this.$emit('onClick')
        }
    }
}
</script>

<style scoped>
/* Styling is fully managed by Tailwind CSS in the template */
</style>
