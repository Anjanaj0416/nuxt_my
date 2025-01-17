<template>
    <button 
        @click="onClick"
        :type="type"
        :class="[
            'inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-all duration-300',
            'rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2',
            buttonStyles
        ]"
    >
        <slot name="iconLeft"></slot>
        <span class="mx-2">{{ label }}</span>
        <slot name="iconRight"></slot>
    </button>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'button'
        },
        variant: {
            type: String,
            default: 'primary', // primary, secondary, danger
        }
    },
    computed: {
        buttonStyles() {
            switch (this.variant) {
                case 'primary':
                    return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400';
                case 'secondary':
                    return 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-400';
                case 'danger':
                    return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-400';
                default:
                    return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400';
            }
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
/* All styles managed via Tailwind CSS */
</style>
