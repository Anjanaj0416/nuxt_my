<template>
    <a  @click="onClick" 
        :href="href"
        :target="target"
        :rel="target === '_blank' ? 'noopener noreferrer' : ''"
        class="text-blue-600 font-medium transition-all duration-300  text-sm
               hover:text-blue-800 hover:underline focus:outline-none 
               focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 cursor-pointer "
    >
        <slot>{{ label }}</slot>
    </a>
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
